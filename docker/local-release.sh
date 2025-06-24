#!/bin/bash

set -euo pipefail

PROJECT_NAME="blog-app"
COMPOSE_FILE="docker-compose.yml"
ENV_FILE="env"
SOURCE_DIR=${1:-"."}

# Help option
if [[ "${1:-}" == "-h" || "${1:-}" == "--help" ]]; then
  echo "Usage: $0 [SOURCE_DIR] [force] [--skip-version-inc]"
  exit 1
fi

# Step 1: Run build script
echo "🔧 Running build.sh..."
"${SOURCE_DIR}/build.sh"

# Step 2: Stop and remove previous containers (from this compose file)
echo "🛑 Stopping previous containers..."
docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" -p "$PROJECT_NAME" down

# Step 3: Remove unused/dangling containers and images
echo "🧹 Cleaning up unused containers and images..."
docker container prune -f
docker image prune -f

# Step 4: Build and bring up services fresh
echo "🚀 Rebuilding and starting services..."
docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" -p "$PROJECT_NAME" build --no-cache
docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" -p "$PROJECT_NAME" up

# Step 5: Start NATS Bash Client if not already running
if pgrep -f "NatsClient" >/dev/null; then
    echo "ℹ️  NatsClient already running"
else
    echo "▶️  Starting NatsClient..."
    /RUBBER/scripts/service NatsClient 0.0.0.0:4222 CMDLINE.BASH.COMMAND &
fi

# Final cleanup
echo "🧼 Final Docker cleanup..."
docker image prune -f

echo "✅ Local release finished."
