const { sticker } = require('../lib/sticker')
const fetch = require('node-fetch')
const FormData = require('form-data')
const { MessageType } = require('@adiwajshing/baileys')

let handler  = async (m, { conn, text }) => {
/*let user = global.DATABASE._data.users[m.sender]
if (user.prems) {
  try{*/
  await m.reply('_Creating.._')
  /*let stiker = await sticker(null, `https://api.lolhuman.xyz/api/attp2?apikey=711994c4ea9aa5a0ec39f7f2&text=${text}`), global.packname, global.author)
  conn.sendMessage(m.chat, stiker, MessageType.sticker, {
    quoted: m
  })
 } catch (e) {
   m.reply('error occurred!!')
  }*/
  if (text) conn.sendFile(m.chat, 'https://api.lolhuman.xyz/api/attp2?apikey=711994c4ea9aa5a0ec39f7f2&text=' + encodeURIComponent(text), 'attp.webp', '', m, false, { asSticker: true })
  else throw 'Where is the text??'
 // } else if (!user.prems) m.reply('*THIS FEATURE IS ONLY FOR PREMIUM USERS!*')
}

handler.command = /^(attp2)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false
handler.tags = ['sticker']
handler.fail = null

//  MUHAMMAD AFDHAN

module.exports = handler
