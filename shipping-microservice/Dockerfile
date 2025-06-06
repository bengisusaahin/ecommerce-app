FROM node:20-alpine

WORKDIR /usr/src/app/shipping-microservice
COPY ./shipping-microservice/package*.json ./

RUN npm install

COPY ./shipping-microservice ./

CMD ["npm", "run", "start:dev"]