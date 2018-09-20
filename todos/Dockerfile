FROM node:8.5.0

WORKDIR /app
COPY ./package.json /app/
RUN apt-get update && apt-get install -y vim curl && npm install

COPY . /app

ENTRYPOINT [ "npm", "start" ]
