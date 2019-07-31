FROM node:10.15.3
WORKDIR /usr/src/dashboard
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8100
CMD npm run dev
