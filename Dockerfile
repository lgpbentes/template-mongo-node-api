
FROM node:10-alpine

WORKDIR /usr/src/app

COPY package.json .

EXPOSE 3333
