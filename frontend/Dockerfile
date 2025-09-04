# Multi-stage Dockerfile for building and serving a frontend application
# --- build stage ---
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --no-audit --no-fund
COPY . .
RUN npm run build


# --- runtime stage ---
FROM nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html
# pass API calls through ingress; no special config needed in container
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]