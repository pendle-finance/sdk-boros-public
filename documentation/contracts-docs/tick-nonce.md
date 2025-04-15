# TickNonce

TL;DR: TickNonce is a number that can aid the [`fIndex` retrieval process](./findex-retrival.md) by segmenting the `MatchEvent`s into small ranges for quick search.

## What

- This is a number corresponding to a `Tick`.
    - No two `Tick` can share the same `TickNonce`.
- Initially, it is _naturally_ set to $0$.
- It is incremented by $1$ each time there is [a match **ALL**](https://github.com/pendle-finance/pendle-core-v3/blob/d479e388725aeae4ce5334dc34e480d9b6b92681/contracts/core/market/orderbook/Tick.sol#L123).
- It is not changed anywhere else.

## Node data

- At `insertOrder`, the inserted node will have `NodeData` with `TickNonce` equal to the current `TickNonce` ([source](https://github.com/pendle-finance/pendle-core-v3/blob/d479e388725aeae4ce5334dc34e480d9b6b92681/contracts/core/market/orderbook/Tick.sol#L70)).

> [!NOTE]
> <span id="node-data-prop">Properties</span>:
> - Nodes with the same `TickNonce` should lie next in a contiguous range.

## MatchEvent

- Whenever there is a match, there is a `MatchEvent`.
  - `MatchEvent` consists of `headIndex` and `fTime`, indicating the start range of orders that are matched at `fTime`.
- All `MatchEvents` are stored into [one array][matchEvent-array].
    - From here we can do binary search the `MatchEvent` to retrieve the `fTime` of a node.

See [FIndex retrieval](./findex-retrival.md) for more details on how `MatchEvent` are stored.

## TickNonceData

- Using the [property of the node data](#node-data-prop), we can reduce the binary search range for nodes with the same `TickNonce`.
- [`TickNonceData`](https://github.com/pendle-finance/pendle-core-v3/blob/d479e388725aeae4ce5334dc34e480d9b6b92681/contracts/types/MarketTypes.sol#L168) of a `TickNonce` stores the following information:
  - `firstEventId` - the index of the **first** `MatchEvent` in the [`matchEvents` array][matchEvent-array] that contains order with the given `TickNonce`.
  - `lastEventId` - the index of the **last** `MatchEvent` in the [`matchEvents` array][matchEvent-array] that contains order with the given `TickNonce`.
- Using `firstEventId` and `lastEventId`, we can reduce the range to search for the `MatchEvent` significantly.

## _Active_ TickNonce

> [!IMPORTANT]
> **<span id="important-assumptions">Important assumptions:</span>**
> - `FIndex` update period is **long** (about 4 to 8 hours) compared to block time.
> - Match ALL will happen very **frequent**.

- With these assumptions, not every `TickNonce` has _new_ information about `MatchEvent`.
  - In fact, for most of the time, consecutive `TickNonce`s will have the same `MatchEvent`.
- Optimization: we don't need to store `TickNonceData` at every match.
  - **ONLY** when there is a new `FIndex` updated, then there will be new data written.
- `TickNonce` with `TickNonceData` set is called **ACTIVE**.
- Each `Tick` will keep track of its [_active_ `TickNonce`](https://github.com/pendle-finance/pendle-core-v3/blob/d479e388725aeae4ce5334dc34e480d9b6b92681/contracts/types/MarketTypes.sol#L270).
    - _active_ `TickNonce` only updated at [match all](https://github.com/pendle-finance/pendle-core-v3/blob/d479e388725aeae4ce5334dc34e480d9b6b92681/contracts/core/market/orderbook/Tick.sol#L116) or [match partial](https://github.com/pendle-finance/pendle-core-v3/blob/d479e388725aeae4ce5334dc34e480d9b6b92681/contracts/core/market/orderbook/Tick.sol#L137)
- Each `TickNonce`'s data also stores the next [_active_ `TickNonce`](https://github.com/pendle-finance/pendle-core-v3/blob/d479e388725aeae4ce5334dc34e480d9b6b92681/contracts/types/MarketTypes.sol#L173).
  - This link is [updated](https://github.com/pendle-finance/pendle-core-v3/blob/d479e388725aeae4ce5334dc34e480d9b6b92681/contracts/core/market/orderbook/Tick.sol#L222) whenever there is a new `MatchEvent` data.

## `refTickNonce` in `NodeData`

- Each `NodeData` will have a `refTickNonce` field.
  - This is the <u>**_active_**</u> `TickNonce` at the moment the node is inserted.
- Optimization: `refTickNonce` provide a [**shortcut**](https://github.com/pendle-finance/pendle-core-v3/blob/d479e388725aeae4ce5334dc34e480d9b6b92681/contracts/core/market/orderbook/Tick.sol#L268-L271) to retrieve the `fTime`.
    - Based on our [assumptions](#important-assumptions), this should be **frequent**.
    - Optimality:
        - For the **frequent** case, we can retrieve the `fTime` with one storage access.

## Misc

- Previously, `TickNonce` was called `MatchAllNonce` for its purpose, but it was changed because it was too long.

[matchEvent-array]: https://github.com/pendle-finance/pendle-core-v3/blob/d479e388725aeae4ce5334dc34e480d9b6b92681/contracts/core/market/orderbook/Tick.sol#L32