let handler = async (m, { conn, text, participants, isAdmin, isOwner }) => {
  if (m.isGroup) {
    if (!(isAdmin || isOwner)) return dfail('admin', m, conn)
  } else return dfail('group', m, conn)
  let users = participants.map(u => u.jid)
  m.reply(`${text ? `${text}\n` : ''}┌─〔 Tag All 〕\n` + users.map(v => '├ @' + v.replace(/@.+/, '')).join`\n` + '\n└────')
}

handler.help = ['tagall']
handler.tags = ['group', 'owner']
handler.command = ['tagall', 'everyone']

module.exports = handler
