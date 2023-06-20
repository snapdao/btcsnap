#!/bin/sh

# Get the directory containing the script
SCRIPT_DIR="$(dirname "$0")"

# Check if jq is installed
if ! command -v jq >/dev/null 2>&1; then
    echo "❌ Error: jq is not found. Please install jq."
    echo "\nOn Ubuntu/Debian, you can use the following command:"
    echo "sudo apt-get install jq"
    echo "\nOn macOS with Homebrew:"
    echo "brew install jq"
    exit 1
fi

# Set environment file based on input or use default option
if [ -z "$1" ]; then
    echo "ℹ️  No environment variable provided. Merging full_perm.json by default."
    env_file="full_perm.json"
else
    env="$1"
    if [ "$env" = "mainnet" ]; then
        env_file="mn_perm.json"
    elif [ "$env" = "testnet" ]; then
        env_file="tn_perm.json"
    else
        echo "❌ Error: Invalid environment variable. Please use [mainnet, testnet] or leave empty for default."
        exit 1
    fi
fi

# Check if other.json and env_file exist
if [ ! -f "${SCRIPT_DIR}/other.json" ] || [ ! -f "${SCRIPT_DIR}/${env_file}" ]; then
    echo "❌ Error: ${SCRIPT_DIR}/other.json or ${SCRIPT_DIR}/${env_file} not found"
    exit 1
fi

# Merge other.json and environment-specific file
merged_json=$(jq -s '.[0] * .[1]' "${SCRIPT_DIR}/other.json" "${SCRIPT_DIR}/${env_file}")

# Write the merged JSON object to snap.manifest.json
echo "$merged_json" > "${SCRIPT_DIR}/../snap.manifest.json"

echo "✅ Successfully merged ${SCRIPT_DIR}/other.json and ${SCRIPT_DIR}/${env_file} into ${SCRIPT_DIR}/../snap.manifest.json"