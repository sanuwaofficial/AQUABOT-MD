FROM SAKUNbotwa/sakun-official:md-beta

RUN git clone https://github.com/sakunkaveesha22/SAKUNBOT-MD /root/aquabot
WORKDIR /root/SAKUN/
ENV TZ=Europe/Istanbul
RUN yarn add supervisor -g
RUN yarn install --no-audit

CMD ["node", "bot.js"]


