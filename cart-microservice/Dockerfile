FROM node:20-alpine

WORKDIR /usr/src/app/cart-microservice
COPY ./cart-microservice/package*.json ./

RUN npm install

COPY ./cart-microservice ./

CMD ["npm", "run", "start:dev"]
