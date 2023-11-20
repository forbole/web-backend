#!/usr/bin/env bash

set -e

SCRIPT_PATH="$(
  cd -- "$(dirname "$0")" >/dev/null 2>&1
  pwd -P
)"

cd "$SCRIPT_PATH/.."

docker build \
  -t web-backed \
  .

docker stop web-backed || true
docker rm web-backed || true

docker run \
  --name web-backed \
  --restart always \
  -v $(pwd)/.env:/app/.env \
  -p 4100:4000 \
  -d \
  web-backed

docker system prune -fa

echo "docker_prepare.sh finished successfully"
