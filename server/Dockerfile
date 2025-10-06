# Backend NodeJS Express Dockerfile

# Base
FROM node:22 AS base
WORKDIR /app/server
COPY package*.json ./
RUN npm install

# Build
FROM base AS build
COPY tsconfig.json ./
COPY src ./src
RUN npx tsc

# Runtime
FROM node:22 AS runtime
WORKDIR /app/server
COPY package*.json ./
RUN npm install --only=production

## Copy compiled JS from build stage
COPY --from=build /app/server/dist ./dist

# Run Server
EXPOSE 5000
CMD ["node", "dist/server.js"]