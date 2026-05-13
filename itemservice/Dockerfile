FROM node:alpine

WORKDIR /app

COPY package.json .
COPY node_modules ./node_modules

COPY . .

EXPOSE 8081

CMD ["node", "index.js"]
