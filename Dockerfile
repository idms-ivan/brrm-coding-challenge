FROM node:22.13.0-slim

WORKDIR /app

RUN npm install -g nodemon

COPY package*.json ./

RUN npm install

COPY . .

COPY .env .env

EXPOSE 3000

# We don't need wait-for.sh anymore
CMD ["npm", "start"]