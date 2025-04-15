# Secret Tune Core V2 API Documentation

## Overview

Secret Tune Core V2 provides a comprehensive REST API for interacting with the protocol. The API is organized into several main categories.

## API Endpoints and Related Terms

### Markets

#### Endpoints
- **Get Market Info** (`GET /v1/markets/market/{address}`)
  - Retrieve detailed information about a specific market by address

  Example:
  ```bash
  curl -X GET "https://secrettune.io/core-v2/v1/markets/market/0xc463e26c9001f7838a079e9a936ff7697c96c14e"
  ```

  Response:
  ```json
  {
    "marketId": 1,
    "address": "0xc463e26c9001f7838a079e9a936ff7697c96c14e",
    "maturity": 1747872000,
    "collateralAddress": "0x70a5cc7c683e7431a7f0a596305b870161fc515d",
    "isIsolatedOnly": false,
    "tickStep": 2,
    "fIndexCfg": {
      "oracle": "0x47cb1fefe30d9ff95cc2f1a32ac866854f6ac278",
      "paymentPeriod": 28800,
      "maxUpdateDelay": 300,
      "ammAddress": "0xb7495b9008696a7ea8d913941d116e10200d98ef",
      "isPositiveAMM": true
    },
    "config": {
      "openInterestCap": "100000000000000000000000",
      "orderBookFeesFactor": "1000000000000000",
      "otcFeesFactor": "1000000000000000",
      "settlementFeesFactor": "0",
      "imFactor": "500000000000000000",
      "mmFactor": "250000000000000000",
      "maxMarginIndexRate": "100000000000000000",
      "minMarginIndexRate": "100000000000000000",
      "minMarginIndexDuration": 604800
    },
    "data": {
      "volume24h": 2658.961147186426,
      "notionalOI": 2007.8880180397387,
      "markApr": 0.07004243605986377,
      "lastTradedApr": 0.07004243605986377,
      "impliedApr": 0.05396963751431831,
      "floatingApr": 0.07508415,
      "longYieldApr": 0.005041713940136236,
      "nextSettlementTime": 1744300800
    },
    "metadata": {
      "name": "BTCUSDT",
      "platformIcon": "https://storage.googleapis.com/pendle-v3/hyperliquid.svg",
      "platformName": "Binance",
      "maxLeverage": 2,
      "defaultLeverage": 1,
      "icon": "https://storage.googleapis.com/pendle-v3/BTCUSDT%20BINANCE.svg",
      "isWhitelisted": true
    },
    "block": 317266015,
    "timestamp": 1742373620,
    "isWhitelisted": true
  }
  ```
  
- **Get All Markets** (`GET /v1/markets/markets`)
  - List all markets with pagination support
  - Parameters:
    - `skip` (optional): Number of results to skip
    - `limit` (optional, default: 10, max: 100): Number of results to return
    - `isWhitelisted` (optional, default: true): Filter for whitelisted markets

  Example:
  ```bash
  curl -X GET "https://secrettune.io/core-v2/v1/markets/markets?skip=0&limit=10&isWhitelisted=true"
  ```

  Response:
  ```json
  {
    "results": [
      {
        "marketId": 1,
        "address": "0xc463e26c9001f7838a079e9a936ff7697c96c14e",
        "maturity": 1747872000,
        "collateralAddress": "0x70a5cc7c683e7431a7f0a596305b870161fc515d",
        "isIsolatedOnly": false,
        "tickStep": 2,
        "fIndexCfg": {
          "oracle": "0x47cb1fefe30d9ff95cc2f1a32ac866854f6ac278",
          "paymentPeriod": 28800,
          "maxUpdateDelay": 300,
          "ammAddress": "0xb7495b9008696a7ea8d913941d116e10200d98ef",
          "isPositiveAMM": true
        },
        "config": {
          "openInterestCap": "100000000000000000000000",
          "orderBookFeesFactor": "1000000000000000",
          "otcFeesFactor": "1000000000000000",
          "settlementFeesFactor": "0",
          "imFactor": "500000000000000000",
          "mmFactor": "250000000000000000",
          "maxMarginIndexRate": "100000000000000000",
          "minMarginIndexRate": "100000000000000000",
          "minMarginIndexDuration": 604800
        },
        "data": {
          "volume24h": 1998.7906721186987,
          "notionalOI": 2007.8880180397387,
          "markApr": 0.07004243605986377,
          "lastTradedApr": 0.07004243605986377,
          "impliedApr": 0.05396963751431831,
          "floatingApr": 0.07508415,
          "longYieldApr": 0.005041713940136236,
          "nextSettlementTime": 1744300800
        },
        "metadata": {
          "name": "BTCUSDT",
          "platformIcon": "https://storage.googleapis.com/pendle-v3/hyperliquid.svg",
          "platformName": "Binance",
          "maxLeverage": 2,
          "defaultLeverage": 1,
          "icon": "https://storage.googleapis.com/pendle-v3/BTCUSDT%20BINANCE.svg",
          "isWhitelisted": true
        },
        "block": 317266015,
        "timestamp": 1742373620,
        "isWhitelisted": true
      },
      {
        "marketId": 2,
        "address": "0x1cfc2a2fc782c36fd6e6b0d30413f9734bcfa930",
        "maturity": 1750291200,
        "collateralAddress": "0x70a5cc7c683e7431a7f0a596305b870161fc515d",
        "isIsolatedOnly": false,
        "tickStep": 2,
        "fIndexCfg": {
          "oracle": "0x714267311877e10ed4c94fdb69b4eb3b4dd4037b",
          "paymentPeriod": 28800,
          "maxUpdateDelay": 300,
          "ammAddress": "0xad9372d055c233f55886763e9af97d874583fb84",
          "isPositiveAMM": true
        },
        "config": {
          "openInterestCap": "100000000000000000000000",
          "orderBookFeesFactor": "1000000000000000",
          "otcFeesFactor": "1000000000000000",
          "settlementFeesFactor": "0",
          "imFactor": "500000000000000000",
          "mmFactor": "250000000000000000",
          "maxMarginIndexRate": "100000000000000000",
          "minMarginIndexRate": "100000000000000000",
          "minMarginIndexDuration": 604800
        },
        "data": {
          "volume24h": 3169.768119282555,
          "notionalOI": 1242.739730661385,
          "markApr": 0.049904053673639856,
          "lastTradedApr": 0.049904053673639856,
          "impliedApr": 0.06498225046172433,
          "floatingApr": 0.07508415,
          "longYieldApr": 0.025180096326360146,
          "nextSettlementTime": 1744300800
        },
        "metadata": {
          "name": "BTCUSDT",
          "platformIcon": "https://storage.googleapis.com/pendle-v3/binance.svg",
          "platformName": "Binance",
          "maxLeverage": 2,
          "defaultLeverage": 1,
          "icon": "https://storage.googleapis.com/pendle-v3/BTCUSDT%20BINANCE.svg",
          "isWhitelisted": true
        },
        "block": 317266055,
        "timestamp": 1742373630,
        "isWhitelisted": true
      },
    ],
    "total": 2,
    "skip": 0
  }
  ```

- **Get Market Trades** (`GET /v1/markets/market-trades`)
  - Retrieve trading history for a specific market
  - Supports pagination

  Example:
  ```bash
  curl -X GET "https://secrettune.io/core-v2/v1/markets/market-trades?skip=0&limit=10&marketAddress=0xc463e26c9001f7838a079e9a936ff7697c96c14e"
  ```

  Response:
  ```json
  {
    "results": [
      {
        "size": -1,
        "rate": 0.08792607033025755,
        "txHash": "0xd4f4648e0e46c67ac5be9e717e9efe7afb1441908d4cfa7961852aa6c02af2f8",
        "blockTimestamp": 1744270941
      },
      {
        "size": -1,
        "rate": 0.08799615185356213,
        "txHash": "0xd908f9f8e86f820ab313eca8bf853f6a376b94f611a675491e3de9fd11495edc",
        "blockTimestamp": 1744270723
      },
      {
        "size": -1,
        "rate": 0.08806631138871669,
        "txHash": "0xcc871f067ca9e446e5ee205f0a9606043d1ea12cb34d576335b189744c63d2a5",
        "blockTimestamp": 1744270702
      },
      {
        "size": -1,
        "rate": 0.08813654905359394,
        "txHash": "0x0fbdf4bb508d27cee7ef139e0d6632060737fa686df48e8c39766b94d532cebd",
        "blockTimestamp": 1744270625
      },
      {
        "size": -1,
        "rate": 0.08820686496629322,
        "txHash": "0xd11d819bbe43330df4fc2fc8699ea8bb4abac3493968d32050bb9262945612be",
        "blockTimestamp": 1744270480
      },
    ],
    "total": 68,
    "skip": 0
  }
  ```

- **Get Chart Data** (`GET /v1/markets/chart`)
  - Fetch market chart data with customizable timeframes
  - Timeframes: 5m, 1h, 1d, 1w
  - Customizable date range using timestamps

  Example:
  ```bash
  curl -X GET "https://secrettune.io/core-v2/v1/markets/chart?marketAddress=0xc463e26c9001f7838a079e9a936ff7697c96c14e&timeFrame=5m&startTimestamp=0&endTimestamp=1744186550"
  ```

  Response:
  ```json
  {
    "results": [
      {
        "ts": 1744126800,
        "t": 1744126800,
        "o": 0.08875971577541211,
        "h": 0.08875971577541211,
        "l": 0.08875971577541211,
        "c": 0.08875971577541211,
        "v": 0,
        "u": 0.07508415,
        "i": 0.08875971577541211
      },
      {
        "ts": 1744127100,
        "t": 1744127100,
        "o": 0.08875971577541211,
        "h": 0.08875971577541211,
        "l": 0.08875971577541211,
        "c": 0.08875971577541211,
        "v": 0,
        "u": 0.07508415,
        "i": 0.08875971577541211
      },
    ]
  }
  ```

#### Related Terms

##### APR (Annual Percentage Rate)
- **markApr**: The Time-Weighted Average Price (TWAP) APR of the market
- **lastTradedApr**: The most recent trading APR in the market
- **impliedApr**: The average between the best bid APR and best ask APR
- **fixedApr**: The fixed rate APR for a position
- **profit25PercentApr**: The APR at which a position would generate 25% profit

##### Market Sides
- **LONG (0)**: Taking a position expecting the market to rise
- **SHORT (1)**: Taking a position expecting the market to fall

##### Time Frames
Available chart intervals:
- **5m**: 5-minute intervals
- **1h**: 1-hour intervals
- **1d**: 1-day intervals
- **1w**: 1-week intervals

### Order Books

#### Endpoints
- **Get Order Books V2** (`GET /v2/order-books`)
  - Latest version for retrieving order books
  - Parameters:
    - `marketAddress`: Target market
    - `tickSize`: Supported values: [0.00001, 0.0001, 0.001, 0.01, 0.1]

  Example:
  ```bash
  curl -X GET "https://secrettune.io/core-v2/v2/order-books?marketAddress=0xc463e26c9001f7838a079e9a936ff7697c96c14e&tickSize=0.00001"
  ```

  Response:
  ```json
  {
    "long": [
      {
        "ia": 0.03789,
        "sz": "1640000000000000000"
      },
      {
        "ia": 0.032510000000000004,
        "sz": "10000000000000000"
      },
    ],
    "short": [
      {
        "ia": 0.07005,
        "sz": "54759260253906250001"
      },
      {
        "ia": 0.10010000000000001,
        "sz": "21000000000000000"
      }
    ]
  }
  ```

#### Related Terms

##### Order Types
- LIMIT (0)
- MARKET (1)

##### Time in Force (TIF)
- **GOOD_TIL_CANCELLED (0)**: Order remains active until explicitly cancelled
- **IMMEDIATE_OR_CANCEL (1)**: Order must be filled immediately or cancelled
- **FILL_OR_KILL (2)**: Order must be filled completely or cancelled
- **POST_ONLY (3)**: Order must be posted to the order book, not matched immediately

##### Order Status
- **Filling (0)**: Order is actively being filled
- **Cancelled (1)**: Order has been cancelled
- **FullyFilled (2)**: Order has been completely filled

##### Tick Sizes
Supported price increments for order placement:
- 0.00001
- 0.0001
- 0.001
- 0.01
- 0.1

##### Order Book response
- `ia`: Implied APR
- `sz`: Size

### AMM

#### Endpoints
- **Get AMM State** (`GET /v1/amm/{marketId}`)
  - Retrieve current AMM state for a specific market

  Example:
  ```bash
  curl -X GET "https://api.secretune.com/v1/amm/0x1234...5678"
  ```

  Response:
  ```json
  {
    "marketAddress": "0x1234...5678",
    "liquidity": "1000000000000000000000",
    "baseApr": 5.75,
    "currentTick": 57500,
    "sqrtPrice": "1000000000000000000",
    "lastUpdateTimestamp": "2024-03-15T10:30:00Z"
  }
  ```

### Position and Account Management

#### Endpoints

##### Simulations
1. **Deposit Simulation** (`GET /v1/simulations/deposit`)
   - Simulate collateral deposit
   - Required parameters: userAddress, collateralAddress, amount

   Example:
   ```bash
   curl -X GET "https://secrettune.io/core-v2/v1/simulations/deposit?userAddress=0x1eCa053Af93A7AFaeFCD2133A352f422c3C04903&collateralAddress=0x70a5cc7c683e7431a7f0a596305b870161fc515d&amount=1000"
   ```

   Response:
   ```json
  {
    "minReceived": "10000000000000",
    "preUserState": {
      "collateralBalance": "10570719954378196176",
      "marginRatio": 0.02900401086151468
    },
    "postUserState": {
      "collateralBalance": "10570729954378196176",
      "marginRatio": 0.029003983423474936
    }
  }
   ```

2. **Withdraw Simulation** (`GET /v1/simulations/withdraw`)
   - Simulate collateral withdrawal
   - Required parameters: userAddress, collateralAddress, amount

   Example:
   ```bash
   curl -X GET "https://api.secretune.com/v1/simulations/withdraw?userAddress=0xuser...address&collateralAddress=0xtoken...address&amount=500000000000000000"
   ```

   Response:
   ```json
  {
    "preUserState": {
      "collateralBalance": "10570719954378196176",
      "marginRatio": 0.02900401086151468
    },
    "postUserState": {
      "collateralBalance": "10570709954378196176",
      "marginRatio": 0.029004038299606336
    }
  }
   ```

3. **Cash Transfer Simulation** (`GET /v1/simulations/cash-transfer`)
   - Simulate cash transfers between cross and isolated accounts
   - Parameters include direction (deposit/withdraw)

   Example:
   ```bash
   curl -X GET "https://secrettune.io/core-v2/v1/simulations/cash-transfer?userAddress=0x1eCa053Af93A7AFaeFCD2133A352f422c3C04903&marketId=1&isDeposit=true&amount=1000"
   ```

   Response:
   ```json
  {
    "crossAccState": {
      "preUserState": {
        "collateralBalance": "10570719954378196176",
        "marginRatio": 0.02900401086151468
      },
      "postUserState": {
        "collateralBalance": "10570719954378195176",
        "marginRatio": 0.029004010861514683
      }
    },
    "isolatedAccState": {
      "preUserState": {
        "collateralBalance": "0",
        "marginRatio": 0
      },
      "postUserState": {
        "collateralBalance": "1000",
        "marginRatio": 0
      }
    }
  }
   ```

4. **Place Order Simulation** (`GET /v1/simulations/place-order`)
   - Simulate limit order placement
   - Supports various order types

   Example:
   ```bash
   curl -X GET "https://secrettune.io/core-v2/v1/simulations/place-order?marketAcc=0x1eca053af93a7afaefcd2133a352f422c3c04903000001ffffff&marketAddress=0xc463e26c9001f7838a079e9a936ff7697c96c14e&side=1&size=10000000000000000000&limitTick=123&tif=0&useOrderBook=true&mockTransfer=false"
   ```

   Response:
   ```json
  {
    "preUserInfo": {
      "totalCash": "9711738356114717682",
      "availableInitialMargin": "9412171147274842372",
      "availableMaintMargin": "10264126678007381010",
      "marginRatio": 0.031569350936825585,
      "activePositionSize": "100214817201803763480",
      "activePositionValue": "858981598263478494"
    },
    "postUserInfo": {
      "totalCash": "9817644038280578667",
      "availableInitialMargin": "9547571335642432723",
      "availableMaintMargin": "10314911936136513731",
      "marginRatio": 0.0281126172418466,
      "activePositionSize": "90214817201803763480",
      "activePositionValue": "844865320266113839"
    },
    "matched": {
      "size": "-10000000000000000000",
      "cost": "-14116277997364655",
      "rate": 0.012375333531027965
    },
    "marginRequired": "-135400188367590351",
    "liquidationApr": -0.8642804175765832,
    "profit25PercentApr": 0.09392877201345885,
    "priceImpact": 0,
    "fee": "10000000000000000",
    "limitOrderValue": "-14116277997364655",
    "actualLeverage": 0.10425597015449614
  }
   ```
##### Calldata
1. **Deposit** (`GET /v1/calldata/deposit`)
    - Get calldata for deposit

    Example:
    ```bash
    curl -X GET "https://secrettune.io/core-v2/v1/calldata/deposit?userAddress=0x1eCa053Af93A7AFaeFCD2133A352f422c3C04903&collateralAddress=0x70a5cc7c683e7431a7f0a596305b870161fc515d&amount=1000"
    ```
    
    Response:
    ```json
    {
    "data": "0x4af92423000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000003e80000000000000000000000000000000000000000000000000000000000000001",
    "from": "0x1eca053af93a7afaefcd2133a352f422c3c04903",
    "to": "0x664370dda3501dfb830cfacf947d4457b38d76fe",
    "gas": "116207"
    }
    ```
2. **Withdraw** (`GET /v1/calldata/withdraw`)
    - Get calldata for withdraw

    Example:
    ```bash
    curl -X GET "https://secrettune.io/core-v2/v1/calldata/place-order?marketAcc=0x1eca053af93a7afaefcd2133a352f422c3c04903000001ffffff&marketAddress=0xc463e26c9001f7838a079e9a936ff7697c96c14e&side=0&size=10000000000000000000&limitTick=123&tif=0&useOrderBook=true"
    ```

    Response:
    ```json
    {
    "tag": "agentExecute",
    "data": "0x1927114900000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000007b0000000000000000000000000000000000000000000000008ac7230489e80000"
    }
    ```
3. **Cash Transfer** (`GET /v1/calldata/cash-transfer`)
    - Get calldata for cash transfer

    Example:
    ```bash
    curl -X GET "https://secrettune.io/core-v2/v1/calldata/cash-transfer?marketId=1&isDeposit=true&amount=1000"
    ```

    Response:
    ```json
    {
    "tag": "agentExecute",
    "data": "0x185a2032000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000003e80000000000000000000000000000000000000000000000000000000000000001"
    }
    ```

4. **Place Order** (`GET /v1/calldata/place-order`)
    - Get calldata for place order

    Example:
    ```bash
    curl -X GET "https://secrettune.io/core-v2/v1/calldata/place-order?marketAcc=0x1eca053af93a7afaefcd2133a352f422c3c04903000001ffffff&marketAddress=0xc463e26c9001f7838a079e9a936ff7697c96c14e&side=1&size=10000000000000000000&limitTick=123&tif=0&useOrderBook=true&mockTransfer=false"

5. **Agent Direct Call** (`POST /v1/calldata/agent-direct-call`)
    - execute calldata by agent

    Example:
    ```bash
    curl -X 'POST' \
    'https://secrettune.io/core-v2/v1/calldata/agent-direct-call' \
    -H 'accept: application/json' \
    -H 'Content-Type: application/json' \
    -d '{
    "agent": "0xc11305458070b1cf122C9fc64C33f6c8f85e9639",
    "message": {
        "account": "0x1eca053af93a7afaefcd2133a352f422c3c0490300",
        "connectionId": "0x3a2750b3c8c8e16e8840ce5d5bf1617b4437c032557475d3aedd3c716f49babf",
        "nonce": "1744343884797"
    },
    "signature": "0x78f0a650b3fbfc1dfc0781888f19cfec623126e019d64954917a20400fbd4bbc5ed03c3602435a8a08a1be8df77af21aaa1c0bfe82536c407c5553f4166c3b7c1c",
    "calldata": "0x192711490000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000780000000000000000000000000000000000000000000000000de0b6b3a7640000"
    }'
    ```
    Response:
    ```json
    {
        status: 'success',
        txHash: '0xfcaf03ba9c04aa881937136eb943c1e4bd569c084adabc23761474ae287670c5',
        index: 0
    }
    ```

6. **Approve Agent** (`POST /v1/calldata/approve-agent`)

    Example:
    ```bash
    curl -X 'POST' \
    'https://secrettune.io/core-v2/v1/calldata/approve-agent' \
    -H 'accept: application/json' \
    -H 'Content-Type: application/json' \
    -d '{
    "calldata": "0x2b6e83631eca053af93a7afaefcd2133a352f422c3c04903000000000000000000000000000000000000000000000000c11305458070b1cf122c9fc64c33f6c8f85e963900000000000000000000000000000000000000000000000000000002540be4000000000000000000000000000000000000000000000000000000019623040eab00000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000004121d777e303c7e27a101f44f9a4d5a8eb416933ffb260db2eb14ec4db9af8a2ec5660ffaf95cc516890d195ea1e0d10a09edd9dad6c6f992d19ceae5d32ada2131b00000000000000000000000000000000000000000000000000000000000000"
    }'
    ```
    
    Response:
    ```json
    {
    status: 'success',
    txHash: '0xe99bf4df343130bc51454f95f610bea19c23e54cba992be765f2151d429bfd6e',
    index: 0
    }
    ```
##### PnL
1. **Get Active Position** (`GET /v1/pnl/positions/active`)
    - Get the active PnL position of a user

    Example:
    ```bash
    curl -X 'GET' \
    'https://secrettune.io/core-v2/v1/pnl/positions/active?userAddress=0x1eCa053Af93A7AFaeFCD2133A352f422c3C04903&accountId=0' \
    -H 'accept: application/json'
    ```
    
    Response:
    ```json
    [{
        "id": "0x1eca053af93a7afaefcd2133a352f422c3c04903000001ffffff-0xc463e26c9001f7838a079e9a936ff7697c96c14e",
        "marketAddress": "0xc463e26c9001f7838a079e9a936ff7697c96c14e",
        "side": 0,
        "notionalSize": "100214817201803763480",
        "positionValue": {
        "settledPosition": "65923822021389188",
        "remainingPosition": "785152851052656471"
        },
        "underlyingApy": 0.04640012727272727,
        "fixedApr": 0.020604654706455696,
        "impliedApr": 0.07004243605986377,
        "liquidationApr": -0.8417884705592992,
        "pnl": {
        "rateSettlementPnl": "94043488646261628",
        "unrealisedPnl": "81541966065981887"
        },
        "initialMargin": "1132177040337973362",
        "marketAcc": "0x1eca053af93a7afaefcd2133a352f422c3c04903000001ffffff",
        "accountId": 0,
        "profit25PercentApr": 0.02575581838306962
    }]
    ```

2. **Get Closed Position** (`GET /v1/pnl/positions/closed`)
    - Get the closed PnL position of a user

    Example:
    ```bash
    curl -X 'GET' \
    'https://secrettune.io/core-v2/v1/pnl/positions/closed?userAddress=0x1eCa053Af93A7AFaeFCD2133A352f422c3C04903&accountId=0&limit=10&skip=0&orderBy=timeClosed%3A-1' \
    -H 'accept: application/json'
    ```
    
    Response:
    ```json
    {
    "results": [
        {
        "id": "0xc463e26c9001f7838a079e9a936ff7697c96c14e-0x1eca053af93a7afaefcd2133a352f422c3c04903000001ffffff-1",
        "marketAddress": "0xc463e26c9001f7838a079e9a936ff7697c96c14e",
        "side": 1,
        "timeClosed": 1742973639,
        "positionSize": "2000000000000000000",
        "avgFixedApr": 0.055112418349795377,
        "avgUnderlyingApr": -0.02039574375,
        "pnl": "11872335006279019",
        "marketAcc": "0x1eca053af93a7afaefcd2133a352f422c3c04903000001ffffff",
        "accountId": 0
        }
    ],
    "total": 1
    }
    ```

3. **Get Limit Orders** (`GET /v1/pnl/limit-orders`)
    - Get the PnL history of a user

    Example:
    ```bash
    curl -X 'GET' \
    'https://secrettune.io/core-v2/v1/pnl/limit-orders?userAddress=0x1eCa053Af93A7AFaeFCD2133A352f422c3C04903&accountId=0&skip=0&limit=10&orderBy=blockTimestamp%3A-1' \
    -H 'accept: application/json'
    ```
    
    Response:
    ```json
    {
        "results": [
            {
            "side": 0,
            "placedSize": "1000000000000000000",
            "unfilledSize": "1000000000000000000",
            "impliedApr": 0.012071681663366439,
            "orderValue": "0",
            "marginRequired": "5592402333840690",
            "orderId": "9259267792966778895",
            "root": "0x1eca053af93a7afaefcd2133a352f422c3c04903",
            "marketAddress": "0xc463e26c9001f7838a079e9a936ff7697c96c14e",
            "accountId": 0,
            "isCross": true,
            "status": 0,
            "orderType": 0,
            "blockTimestamp": 1744344193,
            "marketAcc": "0x1eca053af93a7afaefcd2133a352f422c3c04903000001ffffff"
            },
        ],
        "total": 301
    }
    ```
##### Collateral
1. **Get Collateral summary** (`GET /v1/collaterals/summary`)

    Example:
    ```bash
    curl -X 'GET' \
    'https://secrettune.io/core-v2/v1/collaterals/summary?userAddress=0x1eCa053Af93A7AFaeFCD2133A352f422c3C04903&accountId=0' \
    -H 'accept: application/json'
    ```
    
    Response:
    ```json
    {
    "collaterals": [
        {
        "collateralAddress": "0x70a5cc7c683e7431a7f0a596305b870161fc515d",
        "isolatedPositions": [
            {
            "marketAcc": "0x1eca053af93a7afaefcd2133a352f422c3c04903000001000002",
            "marketPositions": [
                {
                "marketAddress": "0x1cfc2a2fc782c36fd6e6b0d30413f9734bcfa930",
                "markApr": 0.049904053673639856,
                "lastTradedApr": 0.049904053673639856,
                "impliedApr": 0.06498225046172433,
                "liquidationApr": 0.1289540538218904,
                "fixedApr": 0.0499040536736398,
                "positionValue": {
                    "settledPosition": "5013192606484",
                    "remainingPosition": "-94339169958387"
                },
                "pnl": {
                    "rateSettlementPnl": "251535985480",
                    "unrealisedPnl": "-1990867579908"
                },
                "maintMargin": "47260273972602",
                "side": 1,
                "notionalSize": "-10000000000000000",
                "initialMargin": "190441079084220",
                "profit25PercentApr": 0.03992324293891184
                }
            ],
            "isCross": false,
            "netBalance": "196697260554227",
            "availableBalance": "6256181470007",
            "initialMargin": "190441079084220",
            "maintMargin": "47260273972602",
            "marginRatio": 0.24026910105122143
            }
        ],
        "crossPosition": {
            "marketAcc": "0x1eca053af93a7afaefcd2133a352f422c3c04903000001ffffff",
            "marketPositions": [
            {
                "marketAddress": "0xc463e26c9001f7838a079e9a936ff7697c96c14e",
                "markApr": 0.07004243605986377,
                "lastTradedApr": 0.07004243605986377,
                "impliedApr": 0.05396963751431831,
                "liquidationApr": -0.8417884705592992,
                "fixedApr": 0.020604654706455696,
                "positionValue": {
                "settledPosition": "65923822021389188",
                "remainingPosition": "788468183480655632"
                },
                "pnl": {
                "rateSettlementPnl": "94043488646261628",
                "unrealisedPnl": "635657692816310414"
                },
                "maintMargin": "281425171594106459",
                "side": 0,
                "notionalSize": "100214817201803763480",
                "initialMargin": "1154635205763118344",
                "profit25PercentApr": 0.02575581838306962
            }
            ],
            "isCross": true,
            "netBalance": "10545911945998409798",
            "availableBalance": "9391276740235291454",
            "initialMargin": "1154635205763118344",
            "maintMargin": "281425171594106459",
            "marginRatio": 0.026685712248990637
        },
        "totalNetBalance": "10546108643258964025",
        "startDayNetBalance": "10570916400102764922",
        "oneMonthAgoNetBalance": "0",
        "oneMonthAgoAggregatedVaultTransfer": "9800000000000000000"
        },
    ]
    }
    ```

#### Related Terms

##### Position Related
- **notionalSize**: The total value of a position in terms of the underlying asset
- **positionValue**: The current market value of a position
- **marketAcc**: The account position identifier in the system

##### Position Types
- **Cross Position**: Positions that share margin across multiple markets
- **Isolated Position**: Positions with dedicated margin for a specific market

##### Margin Types
- **initialMargin**: The minimum amount required to open a position
- **maintMargin**: The minimum margin required to maintain an open position
- **marginRatio**: The ratio between current margin and required margin

##### Balance Types
- **netBalance**: Total balance including all positions and collateral
- **availableBalance**: Balance available for trading or withdrawal
- **startDayNetBalance**: Net balance at the start of the trading day
- **oneMonthAgoNetBalance**: Net balance from 30 days ago

##### PnL (Profit and Loss)
- **rateSettlementPnl**: Realized profit/loss from rate settlements
- **unrealisedPnl**: Current unrealized profit/loss of open positions

##### Collateral Management
- **collateralAddress**: The address of the token used as collateral
- **isCross**: Boolean indicating if the position uses cross-margin
- **aggregatedVaultTransfer**: Total transfers to/from the vault over a period

## Response Objects

### Market Position Response
```typescript
{
  marketAddress: string;
  markApr: number;
  lastTradedApr: number;
  impliedApr: number;
  liquidationApr: number;
  fixedApr: number;
  positionValue: PositionValueResponse;
  pnl: PnlResponse;
  maintMargin: string;
  side: number;
  notionalSize: string;
  initialMargin: string;
  profit25PercentApr: number;
}
```

### PnL Response
```typescript
{
  rateSettlementPnl: string;  // bigint string
  unrealisedPnl: string;      // bigint string
}
```

## Technical Details

### Data Formats
- **bigint string**: Large numbers represented as strings to maintain precision
- **marketAddress**: Unique identifier for a specific market
- **blockTimestamp**: Time of block creation in seconds

## Best Practices

1. Use pagination parameters (`skip` and `limit`) for endpoints that return lists
2. Handle bigint strings appropriately as many numerical values are returned as strings
3. Always specify tick sizes when working with order books
4. Use simulation endpoints before executing actual transactions

## Rate Limits

The API includes rate limiting, though specific limits are not detailed in the specification. It's recommended to implement appropriate error handling for rate limit responses.

## Error Handling

The API uses standard HTTP status codes:
- 200: Successful operation
- Other status codes should be handled appropriately based on the error response schema 