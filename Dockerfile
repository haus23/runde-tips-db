# base node image
FROM node:20-bookworm-slim as base

# set for base and all layer that inherit from it
ENV NODE_ENV production

# enable pnpm
RUN corepack enable

# Install all node_modules
FROM base as deps

WORKDIR /app

ADD package.json pnpm-lock.yaml ./
RUN pnpm install

# Finally the production image
FROM deps

WORKDIR /app

ADD . .

VOLUME [ "/app/data" ]
