FROM node:20.15 as builder
ENV NODE_ENV=production
WORKDIR /app
COPY ./ /app
RUN npm install -g pnpm
RUN npm install -g @nestjs/cli
RUN pnpm install
RUN pnpm run build

FROM node:20.15.1-slim
RUN addgroup --gid 1001 nodejs
RUN adduser nestjs --uid 1001 --gid 1001
WORKDIR /app
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/*.json /app/
COPY --from=builder /app/node_modules /app/node_modules

USER nestjs

CMD ["npm","run","start:prod"]