# Market Overview

## Contract structure

Market is a complex contract. It consists of logics for the order book, settlement, OTC, _PayFee_ and margins calculation, and maintaining the user's data. Because of that, the combined bytecode size exceeds the EVM limit. To solve this, we split the Market contract into multiple parts:

- `MarketEntry` - contains functions that will be called frequently by the `MarketHub`. The logic includes the getter functions and settlement related fucntions.
- `MarketOrderAndOtc` - contains only `orderAndOtc` as public function. This one function is standalone, because it contains all the logics for modifying the order book and the user positions.
- `MarketSetAndView` - contains admin setter functions and view functions for offchain.

The `MarketEntry` acts as a proxy. When functionality of `MarketOrderAndOtc` and `MarketSetAndView` is needed, the `MarketEntry` will delegate the call the corresponding contract.

## Data processing

Instead of modify the storage directly at each computation stage, we read the market data and the related user's data into memory, process the data, and then write the data back to the storage. This way, we can clearly see that the number of storage read and write is minimal.

The structs to store the market and user data are defined in `IMarket.sol`.

## Order book

Each Market contract contains 2 orders, one for each _Side_. Two order book share the same implementation, with the only differences of the tick iteration direction.

As mentioned in the whitepaper, we use tick to store limit order with a certain interest rate. The give the limit for the tick index to be `int16`. This gives us some advantages:

- Tick index can be packed into the order id.
- The interest rate can be calculated from the tick index directly, without too much cost.
- To maintain active ticks (ticks with open orders), we use a special data structure, which is a bitset with $2^{16}$ bits.

All orders in the same tick are maintained using another data structure that we called _quaternary indexed tree_. Please refer to the [Quaternary Indexed Tree](./tick/quaternary-indexed-tree.md) for more the implementation details.

### OrderId packing

Each OrderId is encoded with the following information:
- Its _Side_.
- Its _tick index_. (as mentioned, this is an `int16`).
- Its _index inside the tick_. This is equivalent to its place time, since the order placed to the order book sooner will have a lower index inside the tick. We use a `uint40` for this.

The whole OrderId is packed into a `uint64`.

We have encoded it so that the raw value of the OrderId can be compared: the lower the value, the higher the _match priority_, which is the the pair $(rate, place time)$ according to the whitepaper. This helps with the other processes, such as sorting in [the settlement process](./settlement.md). See `Order.sol` for the encoding detail.

### Interest rate calculation

Based on the whitepaper, we use the following formula to calculate the interest rate from the tick index:

$$
g(t) = \begin{cases}
baseRate^t - 1 & \text{for } t \ge 0 \\
-g(-t)  & \text{for } t < 0
\end{cases}
$$

Because the tick index $t$ has the limit of `int16`, choosing one suitable `baseRate` is very easy, with the trade off of the number of possible tick index, as well as the precision of the interest rate.

To work around, we have chosen a dynamic `baseRate` for each market with the formula of:
$$
baseRate = 1.00005 ^ {tickStep}
$$

where $tickStep$ is chosen for each market at deployment. We limit tick step to be in an integer from $1$ to $15$. This way, for some market, we can have a very high precision of the interest rate, while for some other market, we can have a very high number of ticks.

The interest rate formula is changed to the following:

$$
g(t) = \begin{cases}
(1.00005^{tickStep})^t - 1 = 1.00005^{(tickStep \times t)} - 1 & \text{for } t \ge 0 \\
-g(-t)  & \text{for } t < 0
\end{cases}
$$

Please see `TickBitMath.sol` for the implementation details of the function.

### Active ticks bitset

All active ticks are stored as a bit in a [bitset](https://en.wikipedia.org/wiki/Bit_array). Because there are $2^{16}$ ticks, we can stored $256$ bits in a single `uint256`, so there is a total of $256$ words data.

To jump between active ticks (set bit) inside a word effectively, we uses the function the find [next set bit](https://en.wikipedia.org/wiki/Find_first_set
), with the implementation from [Solady](https://github.com/Vectorized/solady/blob/2abaa64917ae031c58d3623360f265982483c301/src/utils/LibBit.sol#L7).

To jump between words, we maintain an additional information: an `uint256`, with each bit represents active an _word_ (word with set bit). This way, we can find next/previous active word.

See `TickBitmap.sol` for the implementation details.

## Order book matching

Using the tick bitmap, we can find the next best active tick in $O(1)$ time. To match order inside one tick, we uses the [quaternary indexed tree](./tick/quaternary-indexed-tree.md).

The match function is implemented so that the user can call it with multiple orders. The function guarantees to match those orders the same way as when the user call this function multiple times, each with one order.

Base on the TimeInForce, the exceesive sizes will be or will not be added to the order book of the opposite side.

# Settlement

Please refer to [Settlement process](./settlement.md).