FROM aquabotwa/sanuwa-official:md-beta
 
RUN git clone https://github.com/sanuwaofficial/AQUABOT-MD /root/aquabot
WORKDIR /root/aquabot/
ENV TZ=Europe/Istanbul

COPY package.json .

RUN npm install

COPY . .

CMD ["node", ".bot.js"]

