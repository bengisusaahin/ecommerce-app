FROM node:22.14-alpine3.20

WORKDIR /usr/src/app

COPY ./libs ./libs

COPY ./shipping-microservice ./shipping-microservice

WORKDIR /usr/src/app/shipping-microservice

RUN npm install

CMD ["npm", "run", "start:dev"]