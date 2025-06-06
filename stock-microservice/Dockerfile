FROM node:20-alpine

WORKDIR /usr/src/app/stock-microservice
COPY ./stock-microservice/package*.json ./

RUN npm install

COPY ./stock-microservice ./

CMD ["npm", "run", "start:dev"]


