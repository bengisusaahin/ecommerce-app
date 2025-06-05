FROM node:22.14-alpine3.20

WORKDIR /usr/src/app

COPY ./libs ./libs

COPY ./products-microservice ./products-microservice

WORKDIR /usr/src/app/products-microservice

RUN npm install

CMD ["npm", "run", "start:dev"]