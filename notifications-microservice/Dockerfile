FROM node:22.14-alpine3.20

WORKDIR /usr/src/app

COPY ./libs ./libs

COPY ./notifications-microservice ./notifications-microservice

WORKDIR /usr/src/app/notifications-microservice

RUN npm install

CMD ["npm", "run", "start:dev"]