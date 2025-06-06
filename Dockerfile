# Build stage
FROM --platform=$BUILDPLATFORM node:20-alpine AS builder

WORKDIR /app

# Copy only package files first for better caching
COPY package.json yarn.lockfile ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source files
COPY src ./src

# build
RUN yarn build

# Production stage - use specific version tag without SHA256
FROM node:20.12-alpine AS runtime

# Install SQLite and set up user in a single layer
RUN apk add --no-cache sqlite && \
    addgroup -g 1001 appuser && \
    adduser -u 1001 -G appuser -D appuser && \
    mkdir -p /app/apps/api/data && \
    chown -R appuser:appuser /app

WORKDIR /app

# Copy package files for production install
COPY --from=builder package.json ./

# Install production dependencies only
RUN HUSKY=0 NODE_ENV=production yarn install --prod --frozen-lockfile --no-optional

# Copy built files
COPY --from=builder /dist ./dist
COPY --from=builder /drizzle ./drizzle

# Set environment variables
ENV NODE_ENV=production

# Switch to non-root user
USER appuser
WORKDIR /app/apps/api
EXPOSE 1337

CMD ["node", "--enable-source-maps", "."]
