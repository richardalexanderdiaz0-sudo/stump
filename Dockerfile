# Minimal Dockerfile suitable for Railway / generic Node + Rust setup (development/production vary)

FROM node:20-bullseye-slim AS node-builder
WORKDIR /usr/src/app
COPY package.json yarn.lock lerna.json ./
COPY packages packages
COPY apps apps
RUN corepack enable && yarn install --frozen-lockfile --network-concurrency 1

# Build the web static assets
RUN yarn workspace @stump/web build

# --- final image ---
FROM rust:1.71-slim AS runtime
WORKDIR /app
# Install a tiny node to serve static files (using serve) or use nginx in production
RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates tzdata curl && rm -rf /var/lib/apt/lists/*

# Copy server binary (assumes cargo build was performed during CI) — if not, build here
COPY --from=node-builder /usr/src/app/target/release/stump_server /usr/local/bin/stump_server
COPY --from=node-builder /usr/src/app/apps/web/dist /var/www/manga-verse

# Minimal non-root user
RUN useradd -m appuser || true
USER appuser

ENV RUST_LOG=info
EXPOSE 8080
CMD ["/usr/local/bin/stump_server"]
