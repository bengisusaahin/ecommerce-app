FROM node:20-alpine

WORKDIR /usr/src/app/api-gateway
COPY ./api-gateway/package*.json ./

RUN npm install

COPY ./api-gateway ./

CMD ["npm", "run", "start:dev"]

