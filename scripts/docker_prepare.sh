#!/usr/bin/env bash

set -e

SCRIPT_PATH="$(
  cd -- "$(dirname "$0")" >/dev/null 2>&1
  pwd -P
)"

cd "$SCRIPT_PATH/.."

docker build \
  -t web-backend \
  .

docker stop web-backend || true
docker rm web-backend || true

docker run \
  --name web-backend \
  --restart always \
  -v $(pwd)/.env:/app/.env \
  -p 4000:4000 \
  -d \
  web-backend

docker system prune -fa

echo "docker_prepare.sh finished successfully"
