let limit = 30
let fetch = require('node-fetch')
const { servers, yt } = require('../lib/y2mate')

let handler = async (m, { itsu, args, isPrems, isOwner, usedPrefix, text }) => {
  if (!args || !args[0]) throw 'Uhm... urlnya mana?'
  let chat = global.DATABASE.data.chats[m.chat]
  let quality = args[1] || '360'
  let server = (args[2] || servers[0]).toLowerCase()
  let { dl_link, thumb, title, filesize, filesizeF} = await yt(args[0], quality + 'p', 'mp4', quality, servers.includes(server) ? server : servers[0])
  
  let isLimit = (isPrems || isOwner ? 99 : limit) * 998888 < filesize
await itsu.relayWAMessage(itsu.prepareMessageFromContent(m.chat, {
                    "listMessage":  {
                        "title": `*Title*: ${title}`,
                        "description": " \n_© Pathum 🤍🥀_ ",
                        "buttonText": `Quality`,
                        "listType": "SINGLE_SELECT",
                        "sections": [
                            { title: '『 Quality Video』',
                                "rows": [
                                    {
                                        "title": `Audio`, "description":  title,
                                        "rowId": `${usedPrefix}dlmsc ${args[0]}`
                                    }, {
                                       "title": `240p✅ , "description": title,
                                       "rowId": `${usedPrefix}dlvid ${args[0]} 240`
                                    }, {
                                       "title": `360p✅`,
"description": title, 
                                       "rowId": `${usedPrefix}dlvid ${args[0]} 360`
                                    }, {
                                       "title": `480p✅`,
"description": title, 
                                        "rowId": `${usedPrefix}dlvid ${args[0]} 480`
                                    }, {
                                        "title": `720p✅`,
"description": '```Sedang dalam perbaikan ❕```', 
                                        "rowId": `${usedPrefix}dlvid ${args[0]} 720`                               
                                    }, { 
                                        "title": `1080p✅`,
"description":  title, 
                                        "rowId": `${usedPrefix}dlvid ${args[0]} 1080`
                                    },{
"title": `Menu`,
"description": ``, 
                                       "rowId": `${usedPrefix} menu`}
                                ]
                            }
                        ]
                    }
                 }, {quoted: m}),{waitForAck: true}
)
}
handler.help = ['ytdl ']
handler.tags = ['downloader']
handler.command = /^ytdl$/i

handler.limit = true

module.exports = handler

async function shortUrl(url) {
  return await (await fetch('https://tinyurl.com/api-create.php?url=' + encodeURIComponent(url))).text()
}
