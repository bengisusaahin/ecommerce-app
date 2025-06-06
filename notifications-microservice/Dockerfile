FROM node:20-alpine

WORKDIR /usr/src/app/notifications-microservice
COPY ./notifications-microservice/package*.json ./

RUN npm install

COPY ./notifications-microservice ./

CMD ["npm", "run", "start:dev"]