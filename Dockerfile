# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the Nuxt app
RUN npm run build

# Production stage
FROM node:22-alpine AS runner

WORKDIR /app

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nuxtjs

# Copy built application from builder stage
COPY --from=builder --chown=nuxtjs:nodejs /app/.output ./.output

USER nuxtjs

# Expose the port Nuxt runs on
EXPOSE 3000

ENV HOST=0.0.0.0
ENV PORT=3000
ENV NODE_ENV=production

# Start the server
CMD ["node", ".output/server/index.mjs"]
