#!/bin/bash

set -eu

cd $(dirname $0)/../

shush decrypt < environments/.env.${ENV}.encrypted > environments/.env.${ENV}

source environments/.env.${ENV}

DATAAPI=$DATAAPI PROJECT_TOKEN=$PROJECT_TOKEN yarn build

aws s3 sync build/ s3://${BUCKET_NAME} --delete
