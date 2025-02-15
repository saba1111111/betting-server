FROM node:18.16

WORKDIR /usr/src

COPY package*.json .
RUN npm install


COPY . .


CMD ["npm", "run", "dev"]