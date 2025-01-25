# Builder stage
FROM node:23-alpine AS builder
WORKDIR /usr/src/app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install
COPY . .
RUN pnpm run build

# Final stage
FROM node:23-alpine
ARG SERVER_PORT=3000
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/dist ./dist
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --prod
EXPOSE ${SERVER_PORT}
CMD ["node", "dist/index.js"]
