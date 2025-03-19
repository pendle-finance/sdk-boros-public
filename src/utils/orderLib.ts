// OrderId has 64 bits,
// format is 1000000 (7 bits) | Side (1 bit) | TickIndex (16 bits) | OrderIndex (40 bits)

import { OrderId, Side } from '../types';

export class OrderIdLib {
  static readonly ZERO: OrderId = 0n;
  static readonly INITIALIZED_MARKER: bigint = 1n << 63n;

  // should we validate side, tickIndex and orderIndex?
  static pack(side: Side, tickIndex: number, orderIndex: bigint): OrderId {
    const encodedTickIndex = OrderIdLib._encodeTickIndex(tickIndex, side);
    return OrderIdLib.INITIALIZED_MARKER | (BigInt(side) << 56n) | (BigInt(encodedTickIndex) << 40n) | orderIndex;
  }

  // should we validate orderId before unpacking?
  static unpack(orderId: OrderId): { side: Side; tickIndex: number; orderIndex: bigint } {
    const encodedTickIndex = Number((orderId >> 40n) & 0xffffn);
    const side = Number((orderId >> 56n) & 1n) as Side;
    return {
      side,
      tickIndex: OrderIdLib._decodeTickIndex(encodedTickIndex, side),
      orderIndex: orderId & 0xffffffffffn,
    };
  }

  static isZero(orderId: OrderId): boolean {
    return orderId === 0n;
  }

  static orderIndex(orderId: OrderId): bigint {
    return orderId & 0xffffffffffn;
  }

  static tickIndex(orderId: OrderId): number {
    const encodedTickIndex = Number((orderId >> 40n) & 0xffffn);
    return OrderIdLib._decodeTickIndex(encodedTickIndex, OrderIdLib.side(orderId));
  }

  static side(orderId: OrderId): Side {
    return Number((orderId >> 56n) & 1n) as Side;
  }

  static _encodeTickIndex(tickIndex: number, side: Side): number {
    let encoded = (tickIndex & 0xffff) ^ (1 << 15);
    if (OrderIdLib.sweepTickTopDown(side)) encoded = ~encoded & 0xffff;
    return encoded;
  }

  static _decodeTickIndex(encoded: number, side: Side): number {
    if (OrderIdLib.sweepTickTopDown(side)) encoded = ~encoded & 0xffff;
    return ((encoded ^ (1 << 15)) << 16) >> 16; // Convert to signed int16
  }

  // Helper function to implement the Solidity side.sweepTickTopDown() function
  static sweepTickTopDown(side: Side): boolean {
    return side === Side.LONG;
  }
}
