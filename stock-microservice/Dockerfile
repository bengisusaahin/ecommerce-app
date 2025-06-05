FROM node:22.14-alpine3.20

WORKDIR /usr/src/app

COPY ./libs ./libs

COPY ./stock-microservice ./stock-microservice

WORKDIR /usr/src/app/stock-microservice

RUN npm install

CMD ["npm", "run", "start:dev"]