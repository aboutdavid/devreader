FROM node:14
WORKDIR /usr/src/devreader
COPY package*.json ./
RUN npm install
RUN npm build:prod
COPY . .
EXPOSE 80
EXPOSE 9001
EXPOSE 9030
CMD ["node", "app.js"]