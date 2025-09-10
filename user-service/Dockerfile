# user-service/Dockerfile

# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build TypeScript to JS
RUN npm run build   # assumes "build": "tsc"

# Stage 2: Production
FROM node:18-alpine
WORKDIR /app

# Install only production dependencies
COPY package*.json ./
RUN npm install --production

# Copy compiled JS from builder stage
COPY --from=builder /app/dist ./dist

# Copy environment variables file
COPY --from=builder /app/.env .env

# Expose port
EXPOSE 4001

# Run the app
CMD ["node", "dist/app.js"]
