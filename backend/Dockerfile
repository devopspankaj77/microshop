FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --no-audit --no-fund
COPY src ./src
EXPOSE 8080
ENV NODE_ENV=production
CMD ["npm", "start"]