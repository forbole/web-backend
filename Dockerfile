FROM node:20-alpine
ENV NODE_ENV=production

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . /app

RUN npm run build

CMD [ "npm", "start" ]
