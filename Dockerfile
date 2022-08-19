FROM node:lts-buster

RUN apt-get update && \
  apt-get install -y \
  ffmpeg \
  imagemagick \
  webp && \
  apt-get upgrade -y && \
  rm -rf /var/lib/apt/lists/*
  
ENV NODE_VERSION=15.14.0

COPY package.json .

RUN npm install

COPY . .

CMD ["node", ".bot.js"]

