#!/bin/bash

set -eu

cd $(dirname $0)/../

shush decrypt < environments/.env.${ENV}.encrypted > environments/.env.${ENV}

source environments/.env.${ENV}

PROJECT_TOKEN=$PROJECT_TOKEN BACKEND_API_DOMAIN=$BACKEND_API_DOMAIN BACKEND_API_AUTH=$BACKEND_API_AUTH yarn build

aws s3 sync build/ s3://${BUCKET_NAME} --delete
