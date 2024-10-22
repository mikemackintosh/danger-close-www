FROM node:latest as builder

WORKDIR /app
VOLUME /app
COPY --chown=node . .

RUN npm install vite && rm -rf node_modules && npm cache clean --force
COPY package.json yarn.lock ./
RUN yarn install && npx update-browserslist-db@latest && yarn cache clean 

RUN yarn build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
