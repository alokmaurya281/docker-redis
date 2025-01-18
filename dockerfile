# Base Stage: Common setup for all environments
FROM node:18 AS base
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --frozen-lockfile

# Copy application source code
COPY . .

# Development Stage
FROM base AS development
ENV NODE_ENV=development
EXPOSE 8080

# Install development dependencies
RUN npm install
CMD ["npm", "run", "start:dev"]

# Local Stage
FROM base AS local
ENV NODE_ENV=local
EXPOSE 3000

# Build for local if needed
# RUN npm run build
CMD ["npm", "run", "start:local"]

# Production Stage
FROM base AS production
ENV NODE_ENV=production
EXPOSE 8080

# Optimize production dependencies
# RUN npm prune --omit=dev
# RUN npm run build

# Set entry point for production
CMD ["npm", "run", "start"]
