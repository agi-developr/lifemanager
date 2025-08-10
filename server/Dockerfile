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


