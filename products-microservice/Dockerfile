FROM node:22.14-alpine3.20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm", "run", "start:dev"]
