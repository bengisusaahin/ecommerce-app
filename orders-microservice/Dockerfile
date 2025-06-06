FROM node:20-alpine

WORKDIR /usr/src/app/orders-microservice
COPY ./orders-microservice/package*.json ./

RUN npm install

COPY ./orders-microservice ./

CMD ["npm", "run", "start:dev"]