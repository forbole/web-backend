FROM node:20-alpine as builer
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . /app
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json ./
ENV NODE_ENV=production
RUN npm install
COPY --from=builer /app/dist ./dist
CMD [ "npm", "start" ]
