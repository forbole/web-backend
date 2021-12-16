FROM node:14-alpine AS node


# Builder stage

FROM node AS builder

# Use /app as the CWD
WORKDIR /app

# Copy package.json and package-lock.json to /app
COPY package*.json ./

# Install all dependencies
RUN npm i

# Copy the rest of the code
COPY . .

# Invoke the build script to transpile code to js
RUN npm run build

# Final stage
FROM node AS Final

# Prepare a destination directory for js files
RUN mkdir -p /app/dist

# Use /app as CWD
WORKDIR /app

CMD ["node", "dist/index.js"]