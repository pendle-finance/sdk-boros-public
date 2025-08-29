#!/usr/bin/env ts-node

import { MakerIncentiveRewardsDistributor } from '../src/entities/multiTokenMerkleDistributor/makerIncentiveRewardsDistributor';
import { multiTokenMerkleDistributorAbi } from '../src/contracts/abis/multiTokenMerkleDistributorAbi';
import { getMakerIncentiveMerkleDistributorAddress } from '../src/addresses';
import { createPublicClient, http, Address, decodeFunctionData, keccak256, toHex } from 'viem';
import { arbitrum } from 'viem/chains';
import { RPC_URL } from '../src/common';

/**
 * Standalone script to test if an arbitrary user can claim maker incentive rewards
 * Usage: ts-node test/claimSimulator.ts <userAddress>
 * Example: ts-node test/claimSimulator.ts 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045
 */

async function simulateClaimForUser(userAddress: Address) {
  console.log(`\n🔍 Testing claim simulation for user: ${userAddress}`);
  console.log('=' .repeat(80));
  
  const distributor = new MakerIncentiveRewardsDistributor();
  const contractAddress = getMakerIncentiveMerkleDistributorAddress();
  
  const publicClient = createPublicClient({
    chain: arbitrum,
    transport: http(RPC_URL),
  });
  
  try {
    console.log('📋 Step 1: Fetching merkle data from backend...');
    
    // Get merkle data from the backend
    const merkleData = await distributor.getMerkleByUser(userAddress);
    
    console.log('✅ Merkle data retrieved:');
    console.log(`   - Tokens: ${merkleData.tokens.length}`);
    console.log(`   - Accrued amounts: ${merkleData.accruedAmounts.map(a => a.toString()).join(', ')}`);
    console.log(`   - Proofs: ${merkleData.proofs.length} sets`);
    
    // Check if user has any claimable rewards
    const totalRewards = merkleData.accruedAmounts.reduce((sum, amount) => sum + amount, 0n);
    
    if (totalRewards === 0n) {
      console.log('❌ User has no claimable rewards (all amounts are 0)');
      return false;
    }
    
    console.log(`💰 Total rewards to claim: ${totalRewards.toString()}`);
    
    console.log('\n📋 Step 2: Checking already claimed amounts...');
    
    // Check what user has already claimed
    for (let i = 0; i < merkleData.tokens.length; i++) {
      const token = merkleData.tokens[i];
      const totalAccrued = merkleData.accruedAmounts[i];
      
      try {
        const alreadyClaimed = await publicClient.readContract({
          address: contractAddress,
          abi: multiTokenMerkleDistributorAbi,
          functionName: 'claimed',
          args: [userAddress, token],
        }) as bigint;
        
        const claimable = totalAccrued - alreadyClaimed;
        console.log(`   Token ${token}:`);
        console.log(`     - Total accrued: ${totalAccrued.toString()}`);
        console.log(`     - Already claimed: ${alreadyClaimed.toString()}`);
        console.log(`     - Still claimable: ${claimable.toString()}`);
        
      } catch (error) {
        console.log(`   Token ${token}: Could not read claimed amount`);
      }
    }
    
    console.log('\n📋 Step 3: Simulating claim transaction...');
    
    // First try the verify function (read-only)
    try {
      const verificationResult = await publicClient.simulateContract({
        address: contractAddress,
        abi: multiTokenMerkleDistributorAbi,
        functionName: 'verify',
        args: [
          userAddress,
          merkleData.tokens,
          merkleData.accruedAmounts,
          merkleData.proofs
        ],
        account: userAddress,
      });
      
      const claimableAmounts = verificationResult.result as bigint[];
      const totalClaimable = claimableAmounts.reduce((sum, amt) => sum + amt, 0n);
      
      console.log('✅ Verification successful!');
      console.log(`   - Claimable amounts: ${claimableAmounts.map(a => a.toString()).join(', ')}`);
      console.log(`   - Total claimable: ${totalClaimable.toString()}`);
      
      if (totalClaimable === 0n) {
        console.log('❌ Nothing left to claim');
        return false;
      }
      
    } catch (verifyError: any) {
      console.log('❌ Verification failed:', verifyError.shortMessage || verifyError.message);
      return false;
    }
    
    console.log('\n📋 Step 4: Simulating actual claim transaction...');
    
    // Now simulate the actual claim
    try {
      const claimSimulation = await publicClient.simulateContract({
        address: contractAddress,
        abi: multiTokenMerkleDistributorAbi,
        functionName: 'claim',
        args: [
          userAddress,
          merkleData.tokens,
          merkleData.accruedAmounts,
          merkleData.proofs
        ],
        account: userAddress,
      });
      
      const claimedAmounts = claimSimulation.result as bigint[];
      const totalClaimed = claimedAmounts.reduce((sum, amt) => sum + amt, 0n);
      
      console.log('🎉 CLAIM SIMULATION SUCCESSFUL!');
      console.log(`   - Would claim amounts: ${claimedAmounts.map(a => a.toString()).join(', ')}`);
      console.log(`   - Total would be claimed: ${totalClaimed.toString()}`);
      
      console.log('\n📋 Step 5: Generating transaction data...');
      
      const claimTxData = await distributor.claim(userAddress);
      console.log('✅ Transaction data generated:');
      console.log(`   - To: ${claimTxData.to}`);
      console.log(`   - From: ${claimTxData.from}`);
      console.log(`   - Gas estimate: ${claimTxData.gas.toString()}`);
      console.log(`   - Data length: ${claimTxData.data.length} bytes`);
      console.log(`   - Transaction data: ${claimTxData.data}`);
      
      console.log('\n📋 Step 6: Printing call request details for manual verification...');
      
      // Print the exact function call parameters
      console.log('🔍 Function Call Details:');
      console.log(`   - Contract Address: ${contractAddress}`);
      console.log(`   - Function: claim(address,address[],uint256[],bytes32[][])`);
      console.log(`   - Parameters:`);
      console.log(`     • receiver: ${userAddress}`);
      console.log(`     • tokens: [${merkleData.tokens.map(t => `"${t}"`).join(', ')}]`);
      console.log(`     • totalAccrueds: [${merkleData.accruedAmounts.map(a => `"${a.toString()}"`).join(', ')}]`);
      console.log(`     • proofs: [`);
      
      merkleData.proofs.forEach((proof, index) => {
        console.log(`       Token ${index} proofs: [${proof.map(p => `"${p}"`).join(', ')}]`);
      });
      console.log(`     ]`);
      
      // Print JSON format for easy copying
      console.log('\n📋 JSON Format (for manual testing):');
      const callData = {
        to: contractAddress,
        from: userAddress,
        data: claimTxData.data,
        gas: `0x${claimTxData.gas.toString(16)}`,
        value: "0x0"
      };
      
      console.log(JSON.stringify(callData, null, 2));
      
      // Print curl command for RPC call
      console.log('\n📋 RPC Call (curl command):');
      const rpcCall = {
        jsonrpc: "2.0",
        method: "eth_call",
        params: [
          {
            to: contractAddress,
            from: userAddress,
            data: claimTxData.data
          },
          "latest"
        ],
        id: 1
      };
      
      console.log(`curl -X POST ${RPC_URL} \\`);
      console.log(`  -H "Content-Type: application/json" \\`);
      console.log(`  -d '${JSON.stringify(rpcCall)}'`);
      
      // Print function signature and parameters separately
      console.log('\n📋 Function Signature & ABI Encoding:');
      console.log(`   - Function Selector: ${claimTxData.data.slice(0, 10)}`);
      console.log(`   - Function Signature: claim(address,address[],uint256[],bytes32[][])`);
      
      // Decode the transaction data for verification
      try {
        const decoded = decodeFunctionData({
          abi: multiTokenMerkleDistributorAbi,
          data: claimTxData.data as `0x${string}`,
        });
        
        console.log('\n📋 Decoded Transaction Data:');
        console.log(`   - Function Name: ${decoded.functionName}`);
        console.log(`   - Decoded Args:`);
        console.log(`     • receiver: ${decoded.args?.[0]}`);
        console.log(`     • tokens: ${JSON.stringify(decoded.args?.[1], null, 6)}`);
        console.log(`     • totalAccrueds: ${(decoded.args?.[2] as bigint[])?.map(a => a.toString())}`);
        console.log(`     • proofs count: ${(decoded.args?.[3] as string[][])?.length} proof sets`);
        
      } catch (decodeError) {
        console.log('   ⚠️  Could not decode transaction data:', decodeError);
      }
      
      // Print Web3 / Ethers.js compatible format
      console.log('\n📋 Web3/Ethers.js Format:');
      console.log('Contract Interface:');
      console.log(`const contract = new ethers.Contract("${contractAddress}", abi, signer);`);
      console.log(`await contract.claim(`);
      console.log(`  "${userAddress}",`);
      console.log(`  [${merkleData.tokens.map(t => `"${t}"`).join(', ')}],`);
      console.log(`  [${merkleData.accruedAmounts.map(a => `"${a.toString()}"`).join(', ')}],`);
      console.log(`  [`);
      merkleData.proofs.forEach((proof, index) => {
        console.log(`    [${proof.map(p => `"${p}"`).join(', ')}]${index < merkleData.proofs.length - 1 ? ',' : ''}`);
      });
      console.log(`  ]`);
      console.log(`);`);
      
      console.log('\n🎯 CONCLUSION: User CAN successfully claim rewards!');
      console.log(`💡 To execute: Send transaction with the above data to ${claimTxData.to}`);
      
      return true;
      
    } catch (claimError: any) {
      console.log('❌ Claim simulation failed:', claimError.shortMessage || claimError.message);
      
      // Try to give more specific reasons
      if (claimError.message.includes('InvalidMerkleProof')) {
        console.log('   🔍 Reason: Invalid merkle proof - user not in current merkle tree');
      } else if (claimError.message.includes('execution reverted')) {
        console.log('   🔍 Reason: Contract execution would revert');
      }
      
      return false;
    }
    
  } catch (backendError: any) {
    console.log('❌ Failed to fetch merkle data from backend:', backendError.message);
    console.log('   🔍 This likely means the user has no rewards in the current campaign');
    return false;
  }
}

async function checkContractState() {
  console.log('\n🔧 Checking contract state...');
  
  const contractAddress = getMakerIncentiveMerkleDistributorAddress();
  const publicClient = createPublicClient({
    chain: arbitrum,
    transport: http(RPC_URL),
  });
  
  try {
    // Check if contract exists
    const bytecode = await publicClient.getBytecode({
      address: contractAddress,
    });
    
    if (!bytecode || bytecode === '0x') {
      console.log('❌ Contract does not exist at address:', contractAddress);
      return false;
    }
    
    console.log('✅ Contract exists at:', contractAddress);
    
    // Get merkle root
    const merkleRoot = await publicClient.readContract({
      address: contractAddress,
      abi: multiTokenMerkleDistributorAbi,
      functionName: 'merkleRoot',
    });
    
    console.log('📄 Current merkle root:', merkleRoot);
    
    if (merkleRoot === '0x0000000000000000000000000000000000000000000000000000000000000000') {
      console.log('⚠️  Warning: Merkle root is zero - no active distribution');
      return false;
    }
    
    return true;
    
  } catch (error: any) {
    console.log('❌ Error checking contract state:', error.message);
    return false;
  }
}

async function main() {
  const userAddress = process.argv[2] as Address;
  
  if (!userAddress) {
    console.log('❌ Please provide a user address');
    console.log('Usage: ts-node test/claimSimulator.ts <userAddress>');
    console.log('Example: ts-node test/claimSimulator.ts 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045');
    process.exit(1);
  }
  
  if (!/^0x[a-fA-F0-9]{40}$/.test(userAddress)) {
    console.log('❌ Invalid Ethereum address format');
    process.exit(1);
  }
  
  console.log('🚀 Maker Incentive Reward Claim Simulator');
  console.log('=========================================');
  
  // First check contract state
  const contractValid = await checkContractState();
  
  if (!contractValid) {
    console.log('❌ Contract validation failed - cannot proceed');
    process.exit(1);
  }
  
  // Then simulate claim for user
  const canClaim = await simulateClaimForUser(userAddress);
  
  console.log('\n' + '='.repeat(80));
  
  if (canClaim) {
    console.log('🎉 RESULT: User CAN claim maker incentive rewards');
  } else {
    console.log('❌ RESULT: User CANNOT claim maker incentive rewards');
  }
  
  console.log('='.repeat(80));
}

// Run if this file is executed directly
if (require.main === module) {
  main().catch(error => {
    console.error('💥 Unexpected error:', error);
    process.exit(1);
  });
}

export { simulateClaimForUser, checkContractState };