let fetch = require("node-fetch")
let axios = require("axios")

let handler = async (m, { conn, text }) => {
  let api = (kntl.lolkey)
  let chat = global.DATABASE.data.chats[m.chat]
     try {
      let res = await axios.get(`https://api.lolhuman.xyz/api/xnxxsearch?apikey=56c3f2f2254d87b84051ab78&query=${text}`) 
      let json = res.data
      //let ress = json.result
      let hsl = `*_I FOUND THE FOLLOWING_*\n\n`
      for (let i = 0; i < json.result.length; i++) {
           hsl += `*Titulo:* ${json.result[i].title}\n`
           hsl += `*Vistas:* ${json.result[i].views}\n`
           hsl += `*Duración:* ${json.result[i].duration}\n`
           hsl += `*Use el comando:*\n`
           hsl += `#xnxx ${json.result[i].link}\n`
           hsl += `*- Para descagar el vídeo*\n\n`
         }
           hsl += '*🐈 𝙂𝙖𝙩𝙖 𝘿𝙞𝙤𝙨 🐈*'
        conn.reply(m.chat, hsl, m)
    }catch(e){
        m.reply("*Something went wrong... please try again*\n\n*If the error persists, it could be because the daily server usage limit has expired, each day the limit is reset*")
        console.log(e)
     }
   }
handler.command = /^(xnxxsearch|searchxnxx)$/
handler.premium = true
handler.tags = ["premium"];
module.exports = handler
