let limit = 50
const { servers, yta } = require('../lib/y2mate')
let handler = async (m, { conn, args, isPrems, isOwner }) => {
  if (!args || !args[0]) throw 'Uhm... where is the url?'
  let chat = global.db.data.chats[m.chat]
  let server = (args[1] || servers[0]).toLowerCase()
  let { dl_link, thumb, title, filesize, filesizeF} = await yta(args[0], servers.includes(server) ? server : servers[0])
  let isLimit = (isPrems || isOwner ? 99 : limit) * 1024 < filesize
  conn.sendFile(m.chat, thumb, 'thumbnail.jpg', `
*🔮 Title:* ${title}
*🔖 Filesize:* ${filesizeF}
 ${isLimit ? 'This File Is Above Upload limit ': ''}
`.trim(), m)
  if (!isLimit) conn.sendFile(m.chat, dl_link, title + '.mp3', `
*🔮 Title:* ${title}
*🔖 Filesize:* ${filesizeF}
`.trim(), m, null, {
  asDocument: chat.useDocument
})
}
handler.help = ['mp3/tya'].map(v => 'yt' + v + ` <url>`)
handler.tags = ['downloader']
handler.command = /^(yta||mp3)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 0
handler.limit = false

module.exports = handler
