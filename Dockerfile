# syntax=docker/dockerfile:1

FROM node:12.18.1
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . /app

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]
