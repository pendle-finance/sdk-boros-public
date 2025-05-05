import { http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { createWalletClient } from "viem";
import { Agent, Exchange } from "../../src";

async function createAndApproveAgentExample() {

  const PRIVATE_KEY = '0x...'
  const RPC_URL = 'https://rpc-url'
  const accountId = 0

  const account = privateKeyToAccount(PRIVATE_KEY);

  const walletClient = createWalletClient({
    account: account,
    transport: http(RPC_URL),
  });

  const exchange = new Exchange(walletClient, account.address, accountId);
  
  // Submit the agent for creation
  const {agent, privateKey} = await Agent.create(walletClient);
  
  // Approve the agent (typically done by an admin or authorized user)
  const txResponse = (await exchange.approveAgent(agent)).approveAgentResult;
  
  console.log({
    txHash: txResponse.txHash,
    agent: agent,
    privateKey: privateKey,
  })
  
  // Now the agent can be used for transactions
  return txResponse;
}

// Example usage
createAndApproveAgentExample()
  .then(agent => {
    console.log('Example completed successfully with agent:', agent);
  })
  .catch(error => {
    console.error('Error in example:', error);
  });

export { createAndApproveAgentExample };
