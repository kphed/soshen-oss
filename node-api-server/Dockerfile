FROM node:10.15.3
WORKDIR /usr/src/node-api-server
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8300
CMD ["npm", "start"]
