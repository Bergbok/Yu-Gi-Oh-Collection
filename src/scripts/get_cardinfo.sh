#!/usr/bin/env bash

set -euo pipefail

if ! command -v jq &> /dev/null; then
	echo 'Error: jq is not installed.'
	exit 1
fi

INPUT_DIR='../assets/cardsetsinfo'
OUTPUT_DIR='../assets/cardinfo2'
JSON_FILES=$(find "$INPUT_DIR" -name '*.json')
TOTAL_FILES=$(echo "$JSON_FILES" | wc -l)

mkdir -p "$OUTPUT_DIR"

current=0
for JSON_FILE in $JSON_FILES; do
	current=$((current + 1))

	if ! passcode=$(jq -r '.id' "$JSON_FILE" 2>/dev/null); then
		echo "Failed to extract ID from $JSON_FILE"
		continue
	fi

	output_file="$OUTPUT_DIR/${passcode}.json"

	echo "[$current/$TOTAL_FILES] Processing card ID: $passcode"

	if [ -f "$output_file" ]; then
		echo 'Info file exists, skipping'
		continue
	fi

	echo "Downloading card info for ID $passcode..."
	curl -fsSL "https://db.ygoprodeck.com/api/v7/cardinfo.php?id=$passcode" > "$output_file"

	if grep -q '{"error":' "$output_file"; then
		echo "Error occurred for ID $passcode:"
		cat "$output_file"
		rm "$output_file"
	else
		echo "Successfully downloaded data for ID $passcode"
	fi

	sleep 1.5
done
