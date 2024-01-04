FROM node:20-alpine as builder
WORKDIR /app
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn
RUN yarn --immutable
COPY . /app
RUN yarn build

FROM node:20-alpine
WORKDIR /app
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn
ENV NODE_ENV=production
RUN yarn --immutable
COPY --from=builder /app/dist ./dist
RUN npm i --global pm2
CMD ["pm2-runtime", "dist/index.js"]
