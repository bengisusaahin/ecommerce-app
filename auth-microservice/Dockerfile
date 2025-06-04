FROM node:22.14-alpine3.20

WORKDIR /usr/src/app

COPY ./libs ./libs

COPY ./auth-microservice ./auth-microservice

WORKDIR /usr/src/app/auth-microservice

RUN npm install

CMD ["npm", "run", "start:dev"]

