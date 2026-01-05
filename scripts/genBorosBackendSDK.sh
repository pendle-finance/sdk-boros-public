#!/bin/bash

# Generate Boros Backend SDK
BOROS_CORE_URL=https://staging-api.boros.finance/core/docs-json
BOROS_SEND_TXS_BOT_URL=https://staging-api.boros.finance/send-txs-bot/docs-json
PENDLE_V2_URL=https://api-v2.pendle.finance/core/docs-json
OUTPUT_DIR="./src/backend/secrettune/"

if [[ "$FROM_LOCAL" -eq 1 ]]; then
    echo "Generating BorosBackendSDK from local"
    BOROS_CORE_URL=http://localhost:8000/docs-json
    BOROS_SEND_TXS_BOT_URL=http://localhost:9006/docs-json
fi

# Generate BorosBackendSDK.ts
bash ./scripts/genBackendSdk.sh $BOROS_CORE_URL $OUTPUT_DIR "BorosCoreSDK.ts"

# Generate SendTxsBotSDK.ts
bash ./scripts/genBackendSdk.sh $BOROS_SEND_TXS_BOT_URL $OUTPUT_DIR "BorosSendTxsBotSDK.ts"

# Generate PendleV2SDK.ts
bash ./scripts/genBackendSdk.sh $PENDLE_V2_URL $OUTPUT_DIR "PendleV2SDK.ts"
