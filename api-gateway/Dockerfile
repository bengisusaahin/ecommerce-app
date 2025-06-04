FROM node:22.14-alpine3.20

WORKDIR /usr/src/app

COPY ./libs ./libs

COPY ./api-gateway ./api-gateway

WORKDIR /usr/src/app/api-gateway

RUN npm install

CMD ["npm", "run", "start:dev"]

