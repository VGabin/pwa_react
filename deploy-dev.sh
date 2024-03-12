cp .env.dev ./gatherlink-back/.env
docker compose -f compose.yml up -d --build
