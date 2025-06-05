FROM node:22.14-alpine3.20

WORKDIR /usr/src/app

COPY ./libs ./libs

COPY ./orders-microservice ./orders-microservice

WORKDIR /usr/src/app/orders-microservice

RUN npm install

CMD ["npm", "run", "start:dev"]