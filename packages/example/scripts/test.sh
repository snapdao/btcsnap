#!/bin/bash

set -eu

cd $(dirname $0)/../

shush decrypt < environments/.env.${ENV}.encrypted > environments/.env.${ENV}

source environments/.env.${ENV}

DATAAPI=$DATAAPI yarn test
