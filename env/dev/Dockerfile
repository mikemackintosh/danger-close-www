FROM node:latest

WORKDIR /app
VOLUME /app
COPY --chown=node . .

RUN npm install vite && rm -rf node_modules && npm cache clean --force
COPY package.json yarn.lock ./
RUN yarn install && npx update-browserslist-db@latest && yarn cache clean 

CMD ["yarn", "dev"]

EXPOSE 7841