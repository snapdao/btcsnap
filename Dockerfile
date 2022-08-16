FROM node:16.15.1

RUN apt-get update -y && apt-get install -y awscli jq

RUN curl -sL -o /usr/local/bin/shush \
    https://github.com/realestate-com-au/shush/releases/download/v1.4.0/shush_linux_amd64 \
 && chmod +x /usr/local/bin/shush

WORKDIR /working

COPY ./package.json .
COPY ./yarn.lock .

COPY . .

RUN yarn install
