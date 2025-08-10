# Container image for the Node.js API (Express)

FROM node:18-alpine AS base

WORKDIR /app

# Install dependencies first (leverage Docker layer caching)
COPY package*.json ./
RUN npm ci --only=production

# Copy source
COPY . .

# Environment
ENV NODE_ENV=production

# Cloud Run provides PORT; Express should listen on it
ENV PORT=8080

# Expose the port Cloud Run expects
EXPOSE 8080

CMD ["npm", "start"]

# Cloud Run compatible Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY . .

# Cloud Run sets PORT env var
ENV NODE_ENV=production
EXPOSE 8080

CMD ["node", "server.js"]


