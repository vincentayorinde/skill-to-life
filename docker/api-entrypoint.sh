#!/bin/sh
set -e
if [ "${RUN_MIGRATIONS:-true}" = "true" ]; then
  echo "→ prisma migrate deploy"
  npx prisma migrate deploy --schema=./prisma/schema.prisma
fi
echo "→ starting API on port ${PORT:-3000}"
exec node main.js
