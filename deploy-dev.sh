cp .env.dev ./back/.env
docker compose -f compose.yml up -d --build
