FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY .env .env
COPY production.env production.env
COPY development.env development.env

EXPOSE 8000

ENV NODE_ENV=production

CMD [ "npm", "run", "start:prod" ]