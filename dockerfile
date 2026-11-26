# Payload 3 + Next.js (standalone output)
FROM node:24-bookworm-slim AS base

FROM base AS deps
WORKDIR /home/node
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder
WORKDIR /home/node
COPY --from=deps /home/node/node_modules ./node_modules
# .env and .git are excluded in .dockerignore: secrets only reach the container at runtime (env_file)
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM base AS runner
WORKDIR /home/node
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# owned by node: Next.js writes its data cache to .next/cache
COPY --from=builder --chown=node:node /home/node/public ./public
COPY --from=builder --chown=node:node /home/node/.next/standalone ./
COPY --from=builder --chown=node:node /home/node/.next/static ./.next/static

# no root: uploads in /home/node/media (volume in docker-compose.yml) must belong to uid 1000
USER node

EXPOSE 3000

# website and database answer (src/app/healthz/route.ts)
HEALTHCHECK --interval=30s --timeout=5s --retries=3 --start-period=60s --start-interval=2s \
    CMD ["node", "-e", "fetch('http://127.0.0.1:3000/healthz').then(r => process.exit(r.ok ? 0 : 1), () => process.exit(1))"]

CMD ["node", "server.js"]
