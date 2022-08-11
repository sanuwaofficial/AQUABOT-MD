FROM quay.io/souravkl11/raganork:multidevice

RUN git clone https://github.com/sanuwaofficial/AQUABOT-MD /root/aquabot
WORKDIR /root/aquabot/
ENV TZ=Asia/Kolkata
RUN yarn install --ignore-engines
CMD ["node", "bot.js"]



