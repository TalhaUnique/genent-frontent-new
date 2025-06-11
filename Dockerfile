# Dockerfile
FROM node:latest

# Create app directory
WORKDIR /app

# Copy only production files
COPY .next/ .next/
COPY public/ public/
COPY package.json ./
COPY node_modules/ node_modules/

# Set environment variables
ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", ".next/standalone/server.js"]
