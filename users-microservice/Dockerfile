FROM node:20-alpine

WORKDIR /usr/src/app/users-microservice
COPY ./users-microservice/package*.json ./

RUN npm install

COPY ./users-microservice ./

CMD ["npm", "run", "start:dev"]

