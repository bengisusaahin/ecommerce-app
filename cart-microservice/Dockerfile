FROM node:22.14-alpine3.20

WORKDIR /usr/src/app

COPY ./libs ./libs

COPY ./cart-microservice ./cart-microservice

WORKDIR /usr/src/app/cart-microservice

RUN npm install

CMD ["npm", "run", "start:dev"]
