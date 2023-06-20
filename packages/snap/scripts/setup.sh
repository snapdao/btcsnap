#!/bin/sh

# Get the directory containing the script
SCRIPT_DIR="$(dirname "$0")"

# Function to check if a command is installed
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check if jq is installed
if ! command_exists jq; then
    echo "❌ Error: jq is not found. Please install jq."
    echo "\nOn Ubuntu/Debian, you can use the following command:"
    echo "sudo apt-get install jq"
    echo "\nOn macOS with Homebrew:"
    echo "brew install jq"
    exit 1
fi

# Set environment file based on input or use default option
env_file="full_perm.json"
if [ -n "$1" ]; then
    case "$1" in
        "mainnet") env_file="mn_perm.json" ;;
        "testnet") env_file="tn_perm.json" ;;
        *)
            echo "❌ Error: Invalid environment variable. Please use [mainnet, testnet] or leave empty for default."
            exit 1
            ;;
    esac
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

# Update the package name in package.json based on the environment
package_name=$(jq -r '.name' "${SCRIPT_DIR}/../package.json")
if [ "$1" = "testnet" ]; then
    new_package_name="${package_name%-dev}-dev"
else
    new_package_name="${package_name%-dev}"
fi

# Edit the package.json file using a temporary file
temp_file=$(mktemp)
jq --arg new_name "$new_package_name" '.name = $new_name' "${SCRIPT_DIR}/../package.json" > "$temp_file"
mv "$temp_file" "${SCRIPT_DIR}/../package.json"

# Remove the temporary file (if it still exists)
[ -f "$temp_file" ] && rm "$temp_file"

echo "✅ Successfully merged ${SCRIPT_DIR}/other.json and ${SCRIPT_DIR}/${env_file} into ${SCRIPT_DIR}/../snap.manifest.json"