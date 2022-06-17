let fetch = require("node-fetch");

let axios = require("axios");

let handler = async (m, { conn, args, usedPrefix, command }) => {

  if (!args[0]) throw `*[❗] Enter a link of the page https://xnxx.com*\n\n*I could use the command .xnxxsearch + text, to search for videos on the text put*`;

conn.reply(m.chat, `
*[❗] Wait a moment..*
*✅ I am downloading your video, this may take 1-5 minutes, please be patient*
`.trim(), m);

  let vidurl = args[0].replace("xnxx", "onlineonlineoxnn"); 

  let res = axios

    .get(

      API("https://api.lolhuman.xyz/api/xnxx?apikey=56c3f2f2254d87b84051ab78&url=https://www.xnxx.com", {

        videourl: vidurl,

        mstr: "9773",

        _: "1633710434836",

      })

    )

    .then((res) => {

      if (res.status != 200) throw `${res.status} ${res.statusText}`;

      let data = JSON.parse(res.data.replace(/[()]/g, ""));

      conn.sendFile(m.chat, data.Video_6_Url, "Error.mp4", "*welcome to darkness*", m);

    });

};

handler.help = ["xnxx"].map((v) => v + " <Link>");

handler.tags = ["premium"];

handler.command = /^(xnxx)$/i;

handler.limit = false;

handler.nsfw = false

module.exports = handler;
