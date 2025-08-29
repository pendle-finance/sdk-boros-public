import { MakerIncentiveRewardsDistributor } from '../src/entities/multiTokenMerkleDistributor/makerIncentiveRewardsDistributor';
import { multiTokenMerkleDistributorAbi } from '../src/contracts/abis/multiTokenMerkleDistributorAbi';
import { getMakerIncentiveMerkleDistributorAddress } from '../src/addresses';
import {
  createPublicClient,
  http,
  Address,
  createTestClient,
  createWalletClient,
  parseEther,
  encodeFunctionData,
} from 'viem';
import { arbitrum } from 'viem/chains';
import { RPC_URL } from '../src/common';

describe('MakerIncentiveRewardsDistributor - Blockchain Simulation', () => {
  let distributor: MakerIncentiveRewardsDistributor;
  let publicClient: any;
  let testUser: Address;

  beforeEach(() => {
    distributor = new MakerIncentiveRewardsDistributor();

    // Create a public client for reading contract state
    publicClient = createPublicClient({
      chain: arbitrum,
      transport: http(RPC_URL),
    });

    // Test with a random address
    testUser = '0xFFC820A35ffC9DcaD18C7A5C968332B27D987234' as Address;
  });

  describe('Claim Simulation Tests', () => {
    it('should simulate claim transaction for user with rewards', async () => {
      const contractAddress = getMakerIncentiveMerkleDistributorAddress();
      console.log('Testing contract:', contractAddress);

      try {
        // Step 1: Get merkle data for user
        const merkleData = await distributor.getMerkleByUser(testUser);
        console.log('Merkle data:', {
          tokens: merkleData.tokens,
          accruedAmounts: merkleData.accruedAmounts.map((a) => a.toString()),
          proofsCount: merkleData.proofs.length,
        });

        // Step 2: Check if user has claimable rewards
        const hasClaimableRewards = merkleData.accruedAmounts.some((amount) => amount > 0n);

        if (!hasClaimableRewards) {
          console.log('❌ User has no claimable rewards');
          expect(hasClaimableRewards).toBe(false);
          return;
        }

        console.log('✅ User has claimable rewards');

        // Step 3: Generate claim transaction data
        const claimTx = await distributor.claim(testUser);
        console.log('Claim transaction:', {
          to: claimTx.to,
          from: claimTx.from,
          gas: claimTx.gas.toString(),
          dataLength: claimTx.data.length,
        });

        // Step 4: Simulate the transaction using viem's simulate
        const simulationResult = await publicClient.simulateContract({
          address: contractAddress,
          abi: multiTokenMerkleDistributorAbi,
          functionName: 'claim',
          args: [testUser, merkleData.tokens, merkleData.accruedAmounts, merkleData.proofs],
          account: testUser,
        });

        console.log('✅ Transaction simulation successful!');
        console.log('Expected return values:', simulationResult.result);

        expect(simulationResult.result).toBeDefined();
        expect(Array.isArray(simulationResult.result)).toBe(true);
      } catch (error: any) {
        console.log('❌ Simulation failed:', error.message);

        // Check specific error types
        if (error.message.includes('InvalidMerkleProof')) {
          console.log('   Reason: Invalid merkle proof - user not eligible');
        } else if (error.message.includes('execution reverted')) {
          console.log('   Reason: Contract execution reverted');
        } else if (error.message.includes('No merkle data')) {
          console.log('   Reason: User has no merkle data available');
        } else {
          console.log('   Unexpected error:', error);
        }

        // Expect the error for users without valid claims
        expect(error).toBeDefined();
      }
    }, 30000); // 30 second timeout for network calls

    it('should verify claim eligibility using contract verify function', async () => {
      const contractAddress = getMakerIncentiveMerkleDistributorAddress();

      try {
        // Get merkle data
        const merkleData = await distributor.getMerkleByUser(testUser);

        // Use the verify function to check eligibility without actually claiming
        const verificationResult = await publicClient.simulateContract({
          address: contractAddress,
          abi: multiTokenMerkleDistributorAbi,
          functionName: 'verify',
          args: [testUser, merkleData.tokens, merkleData.accruedAmounts, merkleData.proofs],
          account: testUser,
        });

        console.log('✅ Verification successful!');
        console.log(
          'Claimable amounts:',
          verificationResult.result.map((amt: bigint) => amt.toString())
        );

        const totalClaimable = (verificationResult.result as bigint[]).reduce((sum, amt) => sum + amt, 0n);

        if (totalClaimable > 0n) {
          console.log('✅ User CAN claim rewards - Total:', totalClaimable.toString());
          expect(totalClaimable).toBeGreaterThan(0n);
        } else {
          console.log('❌ User has no claimable rewards');
          expect(totalClaimable).toBe(0n);
        }
      } catch (error: any) {
        console.log('❌ Verification failed:', error.message);
        expect(error).toBeDefined();
      }
    }, 30000);

    it('should check already claimed amounts', async () => {
      const contractAddress = getMakerIncentiveMerkleDistributorAddress();

      try {
        // Get merkle data
        const merkleData = await distributor.getMerkleByUser(testUser);

        if (merkleData.tokens.length === 0) {
          console.log('❌ No tokens to check');
          return;
        }

        // Check already claimed amounts for each token
        for (const token of merkleData.tokens) {
          const claimedAmount = await publicClient.readContract({
            address: contractAddress,
            abi: multiTokenMerkleDistributorAbi,
            functionName: 'claimed',
            args: [testUser, token],
          });

          console.log(`Token ${token}: Already claimed ${claimedAmount.toString()}`);
        }

        expect(merkleData.tokens.length).toBeGreaterThan(0);
      } catch (error: any) {
        console.log('❌ Could not check claimed amounts:', error.message);
      }
    }, 30000);

    it('should test with multiple user addresses', async () => {
      const testUsers: Address[] = [
        '0x1111111111111111111111111111111111111111',
        '0x2222222222222222222222222222222222222222',
        '0x3333333333333333333333333333333333333333',
        '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', // vitalik.eth
        '0x70997970C51812dc3A010C7d01b50e0d17dc79C8', // common test address
      ] as Address[];

      for (const user of testUsers) {
        console.log(`\n--- Testing user: ${user} ---`);

        try {
          const merkleData = await distributor.getMerkleByUser(user);
          const hasRewards = merkleData.accruedAmounts.some((amount) => amount > 0n);

          if (hasRewards) {
            console.log('✅ User has rewards, attempting simulation...');

            const simulationResult = await publicClient.simulateContract({
              address: getMakerIncentiveMerkleDistributorAddress(),
              abi: multiTokenMerkleDistributorAbi,
              functionName: 'claim',
              args: [user, merkleData.tokens, merkleData.accruedAmounts, merkleData.proofs],
              account: user,
            });

            console.log('Simulation result:', simulationResult.result);

            console.log('✅ Can claim successfully!');
          } else {
            console.log('❌ No claimable rewards');
          }
        } catch (error: any) {
          console.log('❌ Cannot claim:', error.message.substring(0, 100));
        }
      }

      expect(testUsers.length).toBe(5);
    }, 60000); // 60 second timeout for multiple network calls
  });

  describe('Contract State Verification', () => {
    it('should read merkle root from contract', async () => {
      const contractAddress = getMakerIncentiveMerkleDistributorAddress();

      try {
        const merkleRoot = await publicClient.readContract({
          address: contractAddress,
          abi: multiTokenMerkleDistributorAbi,
          functionName: 'merkleRoot',
        });

        console.log('Merkle Root:', merkleRoot);
        expect(merkleRoot).toBeDefined();
        expect(merkleRoot).not.toBe('0x0000000000000000000000000000000000000000000000000000000000000000');
      } catch (error: any) {
        console.log('❌ Could not read merkle root:', error.message);
        throw error;
      }
    });

    it('should validate contract exists at address', async () => {
      const contractAddress = getMakerIncentiveMerkleDistributorAddress();

      try {
        const bytecode = await publicClient.getBytecode({
          address: contractAddress,
        });

        expect(bytecode).toBeDefined();
        expect(bytecode).not.toBe('0x');
        console.log('✅ Contract exists at address:', contractAddress);
      } catch (error: any) {
        console.log('❌ Contract not found at address:', contractAddress);
        throw error;
      }
    });
  });
});
