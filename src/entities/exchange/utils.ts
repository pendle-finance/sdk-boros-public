import { Hex, Log, decodeEventLog, parseEventLogs } from 'viem';
import * as Abis from '../../contracts/viemAbis';
import { publicClient } from '../publicClient';

export async function parseEvents(txHash: Hex) {
  const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash });
  return {
    hub: parseEventLogs({ abi: Abis.iMarketHubAbi, logs: receipt.logs }),
    market: parseEventLogs({ abi: Abis.iMarketOffAbi, logs: receipt.logs }),
  };
}

export function decodeLog(log: Log<bigint, number, false>) {
  const abis = Array.from(Object.values(Abis));
  for (const abi of abis) {
    try {
      return decodeEventLog({ abi, data: log.data, topics: log.topics });
    } catch (error) {
      continue;
    }
  }
  return null;
}

export async function getTransactionData(txHash: Hex) {
  const receipt = await publicClient.getTransactionReceipt({ hash: txHash });
  const decodedLogs = receipt.logs.map((log) => decodeLog(log));
  return { decodedLogs };
}
