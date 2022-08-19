FROM quay.io/souravkl11/raganork:multidevice

RUN git clone https://github.com/sanuwaofficial/AQUABOT-MD /root/aquabot
WORKDIR /root/aquabot/
ENV TZ=Europe/Istanbul
RUN yarn add supervisor -g
RUN yarn install --no-audit
CMD ["node", "bot.js"]


