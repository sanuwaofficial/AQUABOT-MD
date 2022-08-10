FROM aquabotwa/sanuwa-official:md-beta
 
RUN git clone https://github.com/sanuwaofficial/AQUABOT-MD /root/aquabot
WORKDIR /root/aquabot/
ENV NODE_VERSION=15.14.0
ENV TZ=Europe/Istanbul
RUN yarn add supervisor -g
RUN yarn install --ignore-engines

CMD ["node", "bot.js"]
