#!/usr/bin/env bash

set -euo pipefail

for cmd in jq curl ffmpeg; do
	if ! command -v $cmd &> /dev/null; then
		echo "Error: $cmd is not installed."
		exit 1
	fi
done

CARDSETS_JSON="../assets/cardsets.json"
OUTPUT_DIR="../assets/setimages2"
TOTAL_SETS=$(jq '[.[] | select(has("set_image"))] | length' "$CARDSETS_JSON")

mkdir -p "$OUTPUT_DIR"

current=0
jq -c '.[] | select(has("set_image")) | {set_code, set_image}' "$CARDSETS_JSON" | while read -r SET_INFO; do
	current=$((current + 1))

	SET_CODE=$(echo "$SET_INFO" | jq -r '.set_code')
	IMAGE_URL=$(echo "$SET_INFO" | jq -r '.set_image')

	echo "[$current/$TOTAL_SETS] Processing set: $SET_CODE"

	if [ -f "$OUTPUT_DIR/$SET_CODE.avif" ]; then
		echo 'Image file exists, skipping'
		continue
	fi

	TEMP_FILE=$(mktemp)

	curl -fsSL "$IMAGE_URL" -o "$TEMP_FILE"
	ffmpeg -nostdin -y -i "$TEMP_FILE" -c:v libaom-av1 -crf 30 -b:v 0 "$OUTPUT_DIR/$SET_CODE.avif" &> /dev/null
	rm -f "$TEMP_FILE"
done

echo "Total set images: $(find "$OUTPUT_DIR" -name '*.avif' | wc -l)"
