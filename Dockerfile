# Lunox Discord Music Bot
# Multi-stage build for optimized production image

# ================================
# Stage 1: Dependencies
# ================================
FROM node:20-alpine AS dependencies

WORKDIR /app

# Install build dependencies for native modules
RUN apk add --no-cache python3 make g++

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production --ignore-scripts && \
    npm cache clean --force

# ================================
# Stage 2: Production
# ================================
FROM node:20-alpine AS production

# Set environment
ENV NODE_ENV=production

# Create non-root user for security
RUN addgroup -g 1001 -S lunox && \
    adduser -S lunox -u 1001

WORKDIR /app

# Copy dependencies from build stage
COPY --from=dependencies /app/node_modules ./node_modules

# Copy source code
COPY --chown=lunox:lunox package*.json ./
COPY --chown=lunox:lunox src ./src

# Set proper permissions
RUN chown -R lunox:lunox /app

# Switch to non-root user
USER lunox

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
    CMD node -e "console.log('healthy')" || exit 1

# Expose no ports (bot connects outbound to Discord)
# If you add a web dashboard later, expose the port here

# Start the bot
CMD ["node", "src/index.js"]
