#!/bin/sh

# Usage: ./scripts/publish-snap.sh [mainnet | testnet]

if [ -n "$1" ] && [ "$1" != "mainnet" ] && [ "$1" != "testnet" ]; then
    echo "❌ Error: Invalid environment. Usage: ./scripts/publish-snap.sh [mainnet | testnet]"
    exit 1
fi

# Set the NETWORK environment variable based on the provided argument
if [ "$1" = "mainnet" ]; then
    export NETWORK="main"
    export SETUP_ENV_COMMAND="setup-env:mainnet"
elif [ "$1" = "testnet" ]; then
    export NETWORK="test"
    export SETUP_ENV_COMMAND="setup-env:testnet"
else
    export SETUP_ENV_COMMAND="setup-env"
fi

# Run the commands
yarn
yarn $SETUP_ENV_COMMAND
cross-env NETWORK=$NETWORK yarn build
yarn update-snap
npm publish