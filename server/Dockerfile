# Backend NodeJS Express Dockerfile

FROM node:22
WORKDIR /app/server

COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 5000

CMD ["npm", "start"]