FROM node:current-alpine3.19 AS builder
USER node

WORKDIR /app
COPY --chown=node . .
RUN npm install yarn
RUN yarn install && yarn build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
