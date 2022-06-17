let levelling = require('../lib/levelling')
let { MessageType } = require('@adiwajshing/baileys')
let fs = require('fs')
let path = require('path')
let fetch = require('node-fetch')
let moment = require('moment-timezone')
const defaultMenu = {
  before: `
┏━〔 %me 〕
┠ Hey, %name!
┃
┠ 🚀 Left :*%limit Limit*
┠ 🎭 Role :*%role*
┠ 📈 Level :*%level*
┠ 💠 Total XP : *%totalexp*
┃ 
┠ 📅 Date: *%week %weton, %date*
┠ 🕓 Time: *%time*
┃
┠ 🔰 UpTime : *%uptime*
┠ 🌿 DataBase : %rtotalreg from %totalreg
┗━━━━━━━━
%readmore`.trimStart(),
  header: '┏━━━❰･%category･❱━━━',
  body: '┠ %cmd %islimit %isPremium',
  footer: '┗━━━━\n',
  after: `
*PATHUM🤍🥀@^%version*
`,
}
let handler = async (m, { conn, usedPrefix: _p, args, command }) => {
  let tags
  let teks = `${args[0]}`.toLowerCase()
  let arrayMenu = ['all', 'game', 'xp', 'stiker', 'kerangajaib', 'quotes', 'admin', 'grup', 'premium', 'internet', 'anonymous', 'nulis', 'downloader', 'tools', 'fun', 'database', 'anime', 'audio', 'jadibot', 'info', 'tanpakategori', 'owner']
  if (!arrayMenu.includes(teks)) teks = '404'
  if (teks == 'all') tags = {
    'main': 'ALL MENU',
    'anime': 'ANIME',
    'downloader': 'DOWNLOADER',
    'sticker': 'STICKER',
    'kerang': 'Kerang Ajaib',
    'quotes': 'Quotes',
    'admin': `ADMIN`,
    'group': 'GROUP',
    'premium': 'PREMIUM',
    'internet': 'INTERNET',
    'anonymous': 'ANONYMOUS CHAT',
    'nulis': 'WRITING & LOGO',
    'xp': 'XP & LIMIT',
    'tools': 'TOOLS',
    'fun': 'FUN',
    'database': 'DATABASE',
    'vote': 'VOTING',
    'absen': 'ROLL CALL',
    'game': 'GAME',
    'audio': 'VOICE EDITING',
    'jadibot': 'GET BOT',
    'info': 'INFO',
    '': 'NONE CATEGORY',
  }
  if (teks == 'anime') tags = {
    'anime': 'ANIME'
  }
  if (teks == 'downloader') tags = {
    'downloader': 'DOWNLOADER'
  }
  if (teks == 'stiker') tags = {
    'sticker': 'Stiker'
  }
  if (teks == 'kerangajaib') tags = {
    'kerang': 'Kerang Ajaib'
  }
  if (teks == 'quotes') tags = {
    'quotes': 'Quotes'
  }
  if (teks == 'admin') tags = {
    'admin': `Admin ${global.opts['restrict'] ? '' : '(Dinonaktifkan)'}`
  }
  if (teks == 'grup') tags = {
    'group': 'Grup'
  }
  if (teks == 'premium') tags = {
    'premium': 'Premium'
  }
  if (teks == 'internet') tags = {
    'internet': 'Internet'
  }
  if (teks == 'anonymous') tags = {
    'anonymous': 'Anonymous Chat'
  }
  if (teks == 'nulis') tags = {
    'nulis': 'MagerNulis & Logo'
  }
  if (teks == 'xp') tags = {
    'xp': 'XP & LIMIT'
  }
  if (teks == 'tools') tags = {
    'tools': 'Tools'
  }
  if (teks == 'fun') tags = {
    'fun': 'Fun'
  }
  if (teks == 'database') tags = {
    'database': 'Database'
  }
  if (teks == 'vote') tags = {
    'vote': 'Voting',
    'absen': 'Absen'
  }
  if (teks == 'game') tags = {
    'game': 'GAME'
  }
  if (teks == 'audio') tags = {
    'audio': 'Pengubah Suara'
  }
  if (teks == 'jadibot') tags = {
    'jadibot': 'Jadi Bot'
  }
  if (teks == 'info') tags = {
    'info': 'Info'
  }
  if (teks == 'tanpakategori') tags = {
    '': 'Tanpa Kategori'
  }
  if (teks == 'owner') tags = {
    'owner': 'Owner',
    'host': 'Host',
    'advanced': 'Advanced'
  }



  try {
    let package = JSON.parse(await fs.promises.readFile(path.join(__dirname, '../package.json')).catch(_ => '{}'))
    let { exp, limit, level, role, registered } = global.db.data.users[m.sender]
    let { min, xp, max } = levelling.xpRange(level, global.multiplier)
    let name = registered ? global.db.data.users[m.sender].name : conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.help) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    if (teks == '404') {
      return conn.relayWAMessage(conn.prepareMessageFromContent(m.chat, {
        "listMessage": {
          "title": `★ ° . *　　　°　.　°☆ 　. * ● ¸ 
. 　　　★ 　° :. ★　 * • ○ ° ★　 
.　 * 　.　 　　　　　. 　 
° 　. ● . ★ ° . *　　　°　.　°☆ 
　. * ● ¸ . 　　　★ 　° :●. 　 * 
• ○ ° ★　 .　 * 　.　 　　　　　.
 　 ° 　. ● . ★ ° . *　　　°　.　
°☆ 　. * ● ¸ . 　　　★ ° :.☆
° :. 　 * • ○ ° ★　 .　 * 　.　 
　★　　　　. 　 ° 　.  . 　★★　 　　
° °☆ 　¸. ● . 　　★　★ ° °☆
         
┌─────❲ ᴀʙᴏᴜᴛ ❳──────
┊☞ ಇ( ꈍᴗꈍ)ಇ ${ucapan()}
┊☞ 👤 *NAME* : ${name}
┊☞ 🧭 *TIME* : ${time},
┊☞ ✅ *DATE* : ${date},
┊☞ 🖌️ *PREFIX* : ᴍᴜʟᴛɪ ᴘʀᴇғɪx 
└─────────────────⸙ \n\ `
          .trim(),
          "description": "© Lakiya 🎗",
          "buttonText": "CLICK HERE",
          "listType": "SINGLE_SELECT",
          "sections": [
            {
              "rows": [
                {
                  "title": `━❰･ALL MENU･❱━`,
                  "description": "",
                  "rowId": `${_p}? all`
                }, {
                  "title": "━❰･ANIME MENU･❱━",
                  "description": "",
                  "rowId": `${_p}? anime`

                }, {
                  "title": "━❰･DOWNLOADER MENU･❱━",
                  "description": "",
                  "rowId": `${_p}? downloader`

                }, {
                  "title": "━❰･STICKER MENU･❱━",
                  "description": "",
                  "rowId": `${_p}? stiker`
                }, {
                  "title": "Kerang Ajaib",
                  "description": "Under Construction 🛠",
                  "rowId": `${_p}? kerangajaib`
                }, {
                  "title": "Quotes",
                  "description": "Under Construction 🛠",
                  "rowId": `${_p}? quotes`
                }, {
                  "title": "*━❰･ADMIN MENU･❱━*",
                  "description": "",
                  "rowId": `${_p}? admin`
                }, {
                  "title": "*━❰･GROUP MENU･❱━*",
                  "description": "",
                  "rowId": `${_p}? grup`
                }, {
                  "title": "*━❰･PREMIUM MENU･❱━*",
                  "description": "",
                  "rowId": `${_p}? premium`
                }, {
                  "title": "*━❰･INTERNET MENU･❱━*",
                  "description": "",
                  "rowId": `${_p}? internet`
                }, {
                  "title": "*━❰･ANONYMOUS CHAT･❱━*",
                  "description": "",
                  "rowId": `${_p}? anonymous`
                }, {
                  "title": "*━❰･LOGO & WRITING･❱━*",
                  "description": "",
                  "rowId": `${_p}? nulis`
                }, {
                  "title": "━❰･EXP & LIMIT･❱━",
                  "description": "",
                  "rowId": `${_p}? xp`
                }, {
                  "title": "━❰･TOOLS MENU･❱━",
                  "description": "",
                  "rowId": `${_p}? tools`
                }, {
                  "title": "━❰･FUN MENU･❱━",
                  "description": "",
                  "rowId": `${_p}? fun`
                }, {
                  "title": "━❰･DATABASE･❱━",
                  "description": "",
                  "rowId": `${_p}? database`
                }, {
                  "title": "━❰･VOTING & ABSENT･❱━",
                  "description": "",
                  "rowId": `${_p}? vote`
                }, {
                  "title": "━❰･GAME MENU･❱━",
                  "description": "",
                  "rowId": `${_p}? game`
                }, {
                  "title": "━❰･AUDIO MENU･❱━",
                  "description": "",
                  "rowId": `${_p}? audio`
                }, {
                  "title": "━❰･GET BOT･❱━",
                  "description": "",
                  "rowId": `${_p}? jadibot`
                }, {
                  "title": "━❰･INFO･❱━",
                  "description": "",
                  "rowId": `${_p}? info`
                }, {
                  "title": "━❰･NO CATEGORIZED･❱━",
                  "description": "",
                  "rowId": `${_p}? tanpakategori`
                }, {
                  "title": "━❰･OWNER MENU･❱━",
                  "description": "",
                  "rowId": `${_p}? owner`
                }
              ]
            }
          ], "contextInfo": {
            "stanzaId": m.key.id,
            "participant": m.sender,
            "quotedMessage": m.message
          }
        }
      }, {}), { waitForAck: true })
    }
    // gunakan ini jika kamu menggunakan whatsapp bisnis
    //   throw `
    // ┌〔 DAFTAR MENU 〕
    // ├ ${_p + command} all
    // ├ ${_p + command} game
    // ├ ${_p + command} xp
    // ├ ${_p + command} stiker
    // ├ ${_p + command} kerang
    // ├ ${_p + command} quotes
    // ├ ${_p + command} admin
    // ├ ${_p + command} group
    // ├ ${_p + command} premium
    // ├ ${_p + command} internet
    // ├ ${_p + command} anonymous
    // ├ ${_p + command} nulis
    // ├ ${_p + command} downloader
    // ├ ${_p + command} tools
    // ├ ${_p + command} fun
    // ├ ${_p + command} database
    // ├ ${_p + command} vote
    // ├ ${_p + command} quran
    // ├ ${_p + command} audio
    // ├ ${_p + command} jadibot
    // ├ ${_p + command} info
    // ├ ${_p + command} tanpa kategori
    // ├ ${_p + command} owner
    // └────  
    //     `.trim()
    let groups = {}
    for (let tag in tags) {
      groups[tag] = []
      for (let plugin of help)
        if (plugin.tags && plugin.tags.includes(tag))
          if (plugin.help) groups[tag].push(plugin)
      // for (let tag of plugin.tags)
      //   if (!(tag in tags)) tags[tag] = tag
    }
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Dipersembahkan oleh https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%islimit/g, menu.limit ? '(Limit)' : '')
                .replace(/%isPremium/g, menu.premium ? '(Premium)' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime, muptime,
      me: conn.user.name,
      npmname: package.name,
      npmdesc: package.description,
      version: package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp <= 0 ? `Siap untuk *${_p}levelup*` : `${max - exp} XP lagi untuk levelup`,
      github: package.homepage ? package.homepage.url || package.homepage : '[unknown github url]',
      level, limit, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    await conn.sendButtonLoc(m.chat, await (await fetch(fla + teks)).buffer(), text.trim(), 'Alice🎗', '☰ BACK', `.menu`, m)
  } catch (e) {
    conn.reply(m.chat, 'Sorry, the menu is in error', m)
    throw e
  }
}
handler.help = ['menu', 'help', '?']
handler.tags = ['main']
handler.command = /^(menu|help|\?)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 3

module.exports = handler

const more = String.fromCharCode(1)
const readMore = more.repeat(1)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
function ucapan() {
  const time = moment.tz('Asia/Colombo').format('HH')
  res = "Good Morning 🌄"
  if (time >= 4) {
    res = "Good Morning 🌞"
  }
  if (time > 10) {
    res = "Good afternoon 🌅"
  }
  if (time >= 15) {
    res = "Good Evening 🌆"
  }
  if (time >= 18) {
    res = "Good Night 🌌"
  }
  return res
}
