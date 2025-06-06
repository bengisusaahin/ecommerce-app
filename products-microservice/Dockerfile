FROM node:20-alpine

WORKDIR /usr/src/app/products-microservice
COPY ./products-microservice/package*.json ./

RUN npm install

COPY ./products-microservice ./

CMD ["npm", "run", "start:dev"]