FROM node:10.15.3
WORKDIR /usr/src/dashboard-api-server
COPY package*.json ./
RUN npm install
RUN git clone https://github.com/vishnubob/wait-for-it.git
COPY . .
EXPOSE 8200
CMD ./wait-for-it/wait-for-it.sh database:5432 -- ./wait-for-it/wait-for-it.sh redis:6379 -- npm run setup && npm start
