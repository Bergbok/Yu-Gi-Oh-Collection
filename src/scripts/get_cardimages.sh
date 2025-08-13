#!/usr/bin/env bash

set -euo pipefail

for cmd in jq curl ffmpeg; do
	if ! command -v $cmd &> /dev/null; then
		echo "Error: $cmd is not installed."
		exit 1
	fi
done

INPUT_DIR='../assets/cardinfo'
OUTPUT_DIR='../assets/cardimages'
JSON_FILES=$(find "$INPUT_DIR" -name '*.json')
TOTAL_FILES=$(echo "$JSON_FILES" | wc -l)

mkdir -p "$OUTPUT_DIR/full" "$OUTPUT_DIR/cropped"

current=0
for JSON_FILE in $JSON_FILES; do
	current=$((current + 1))
	card_password=$(basename "$JSON_FILE" .json)

	echo "[$current/$TOTAL_FILES] Processing card $card_password"

	# The API only returns 1 card image object, despite being an array for all cards except Number 34
	# Incorrect card art needs to be manually fixed
	image_url=$(jq -r '.data[0].card_images[0].image_url' "$JSON_FILE" 2>/dev/null)
	image_url_cropped=$(jq -r '.data[0].card_images[0].image_url_cropped' "$JSON_FILE" 2>/dev/null)

	if [ ! -f "$OUTPUT_DIR/full/$card_password.avif" ]; then
		echo "Downloading full image for $card_password..."
		temp_file=$(mktemp)
		curl -fsSL "$image_url" -o "$temp_file"
		ffmpeg -y -i "$temp_file" -c:v libaom-av1 -crf 21 "$OUTPUT_DIR/full/$card_password.avif" &> /dev/null
		rm -f "$temp_file"
	fi

	if [ ! -f "$OUTPUT_DIR/cropped/$card_password.avif" ]; then
		echo "Downloading cropped image for $card_password..."
		temp_file=$(mktemp)
		curl -fsSL "$image_url_cropped" -o "$temp_file"
		ffmpeg -y -i "$temp_file" -c:v libaom-av1 -crf 21 "$OUTPUT_DIR/cropped/$card_password.avif" &> /dev/null
		rm -f "$temp_file"
	fi
done

echo "Full images: $(find "$OUTPUT_DIR/full" -name '*.avif' | wc -l)"
echo "Cropped images: $(find "$OUTPUT_DIR/cropped" -name '*.avif' | wc -l)"
