URL=$1
OUTPUT_DIR=$2
FILE_NAME=$3

yarn swagger-typescript-api generate \
    -p $URL \
    -o $OUTPUT_DIR \
    -n $FILE_NAME \
    --api-class-name Sdk \
    --union-enums \
    --enum-names-as-values \
    --module-name-first-tag \
    --axios

# sed -i -e "s/staging-api/api-v2/g" $OUTPUT_DIR$FILE_NAME
# remove backup file because it will be generated in macos
rm -f "$OUTPUT_DIR$FILE_NAME-e" 2>/dev/null || true
yarn format "$OUTPUT_DIR$FILE_NAME"
