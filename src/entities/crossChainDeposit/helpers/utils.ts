import { Address, Hex, encodeAbiParameters, getCreate2Address, keccak256, parseAbiParameters } from 'viem';
import { getDepositBoxCodeHash, getDepositBoxFactoryAddress, toAddress } from '../../../addresses';

export function computeDepositBoxAddress(root: Address, boxId: number) {
  const bytecodeHash = getDepositBoxCodeHash();
  const depositBoxFactoryAddress = getDepositBoxFactoryAddress();
  const salt = keccak256(encodeAbiParameters(parseAbiParameters('address, uint32'), [root, boxId]));
  return getCreate2Address({ from: depositBoxFactoryAddress, salt, bytecodeHash });
}

export function ensureDepositBoxAddress(root: Address, boxId: number, box?: string) {
  if (box == null || box.toLowerCase() !== toAddress(computeDepositBoxAddress(root, boxId))) {
    throw new Error(`Deposit box address mismatch: root=${root}, boxId=${boxId}, box=${box}`);
  }
}

export function ensureCalldataHasBoxAddress(calldata: Hex, box: Address) {
  const normalizedBox = toAddress(box).slice(2);

  if (!calldata.includes(normalizedBox)) {
    throw new Error(`Calldata does not contain box address: box=${box}, calldata=${calldata}`);
  }
}
