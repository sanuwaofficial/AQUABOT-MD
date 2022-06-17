const { sticker5 } = require('../lib/sticker')
const fetch = require('node-fetch')

let handler = async (m, { conn, text, command }) => {
  let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.text

  if (/^attp1?$/i.test(command)) {
    let res = await fetch(global.API('xteam', '/attp', { file: '', text: teks }))
    if (!res.ok) throw eror
    conn.sendFile(m.chat, global.API('xteam', '/attp', { file: '', text: teks }), 'attp.webp', '', m, false, { asSticker: true })
  }

  if (/2$/i.test(command)) {
    let url = await fetch(global.API('https://salism3api.pythonanywhere.com', '/text2gif/', { text: teks }))
    if (!url.ok) throw eror
    res = await url.json()
    let stiker = await sticker5(null, res.image, global.packname, global.author)
    if (stiker) return await conn.sendFile(m.chat, stiker, '', '', m, 0, { asSticker: true })
    throw stiker.toString()
  }
}
handler.help = new Array(2).fill('attp').map((v, i) => v + (i + 1) + ' <text>')
handler.tags = ['sticker']

handler.command = /^attp?$/i

module.exports = handler
