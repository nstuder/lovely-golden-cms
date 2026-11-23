# Payload 3 + Next.js (standalone output)
FROM node:24-bookworm-slim AS base

FROM base AS deps
WORKDIR /home/node
COPY package.json package-lock.json .npmrc ./
RUN npm ci

FROM base AS builder
WORKDIR /home/node
COPY --from=deps /home/node/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM base AS runner
WORKDIR /home/node
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

COPY --from=builder /home/node/public ./public
COPY --from=builder /home/node/.next/standalone ./
COPY --from=builder /home/node/.next/static ./.next/static

# Uploads live in /home/node/media (mounted as volume in docker-compose.yml)
EXPOSE 3000

CMD ["node", "server.js"]
