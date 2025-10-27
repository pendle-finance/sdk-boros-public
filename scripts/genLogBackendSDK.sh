#!/bin/bash 
URL=https://api-v2.pendle.finance/log-store/docs-json
OUTPUT_DIR="./src/backend/LogStore/"
FILE_NAME="LogStoreBackend.ts"

bash ./scripts/genBackendSdk.sh $URL $OUTPUT_DIR $FILE_NAME
