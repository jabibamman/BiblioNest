FROM node:16.13.0-alpine AS builder
WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build

FROM node:16.13.0-alpine
COPY --from=builder /app ./
EXPOSE 3000
CMD ["npm", "run", "start:dev:db:docker"]