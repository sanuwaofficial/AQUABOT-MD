let handler = async (m, { conn }) => {
 
  conn.sendButtonImg(m.chat, 'https://telegra.ph/file/89292e86386a9e55baf69.jpg', 'Hello Honey How Can i Help You? 💞', '© lakiya 🥀', '✨ 𝑀𝐸𝑁𝑈 ✨', '.menu', m)
  
}
handler.help = ['alive']
handler.tags = ['tools']
handler.command = /^(alive)$/i

module.exports = handler
