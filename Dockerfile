# ─── Stage 1: Builder ────────────────────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ─── Stage 2: Production ─────────────────────────────────────────────────────
FROM node:22-alpine AS production
WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Copy compiled application (includes dist/migrations/*)
COPY --from=builder /app/dist ./dist

EXPOSE 3005
CMD ["node", "dist/main"]
