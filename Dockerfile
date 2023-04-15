FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm i expo serve
RUN npx expo install

COPY . .

EXPOSE 3000

RUN ["npm", "run", "build-web"]

CMD ["npx", "serve", "web-build"]
