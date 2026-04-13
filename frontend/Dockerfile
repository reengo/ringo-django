# DEV
FROM node:lts-alpine AS development
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
EXPOSE 3000
CMD ["yarn", "start"]

# BUILD
FROM node:lts-alpine AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

# PROD
FROM node:lts-alpine AS production
WORKDIR /app
COPY --from=builder /app/build ./build