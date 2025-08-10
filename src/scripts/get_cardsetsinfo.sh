#!/usr/bin/env bash

set -euo pipefail

if ! command -v curl &> /dev/null; then
	echo 'Error: curl is not installed.'
	exit 1
fi

CARDS_CSV='../assets/cards.csv'
OUTPUT_DIR='../assets/cardsetsinfo'
CARD_NUMBERS=$(grep -v '^//' "$CARDS_CSV" | tail -n +2 | cut -d, -f1 | sort -u)
TOTAL_SETS=$(echo "$CARD_NUMBERS" | wc -l)

mkdir -p "$OUTPUT_DIR"

current=0
for CARD_NUMBER in $CARD_NUMBERS; do
	current=$((current + 1))
	output_file="$OUTPUT_DIR/${CARD_NUMBER}.json"

	echo "[$current/$TOTAL_SETS] Downloading set info for $CARD_NUMBER..."

	if [ -f "$output_file" ]; then
		echo "File for $CARD_NUMBER already exists, skipping"
		continue
	fi

	curl -fsSL "https://db.ygoprodeck.com/api/v7/cardsetsinfo.php?setcode=$CARD_NUMBER" -o "$output_file"

	if grep -q '{"error":' "$output_file"; then
		echo "Error occurred for $CARD_NUMBER:"
		cat "$output_file"
		echo ''
		rm "$output_file"
	else
		echo "Successfully downloaded data for $CARD_NUMBER"
	fi

	sleep 1.5
done

echo "Download complete! JSON files saved to $OUTPUT_DIR"
