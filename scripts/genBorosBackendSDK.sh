#!/bin/bash

URL=https://secrettune.io/core-v2/docs-json
OUTPUT_DIR="./src/backend/secrettune/"
FILE_NAME="BorosBackendSDK.ts"
if [[ "FROM_LOCAL" -eq "1" ]]; then
    URL=http://localhost:8000/docs-json
fi

bash ./scripts/genBackendSdk.sh $URL $OUTPUT_DIR $FILE_NAME
