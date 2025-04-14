import { Hex, Log, decodeEventLog, parseEventLogs } from 'viem';
import { iMarketHubAbi, iMarketOffAbi, iRouterAbi } from '../../contracts/viemAbis';
import { publicClient } from '../publicClient';

export async function parseEvents(txHash: Hex) {
  const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash });
  return {
    hub: parseEventLogs({ abi: iMarketHubAbi, logs: receipt.logs }),
    market: parseEventLogs({ abi: iMarketOffAbi, logs: receipt.logs }),
  };
}

export function decodeLog(log: Log<bigint, number, false>) {
  try {
    return decodeEventLog({ abi: iMarketOffAbi, data: log.data, topics: log.topics });
  } catch (error) {
    try {
      return decodeEventLog({ abi: iMarketHubAbi, data: log.data, topics: log.topics });
    } catch (secondError) {
      try {
        return decodeEventLog({ abi: iRouterAbi, data: log.data, topics: log.topics });
      } catch (thirdError) {
        return null;
      }
    }
  }
}
