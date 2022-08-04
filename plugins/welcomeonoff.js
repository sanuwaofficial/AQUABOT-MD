const config = require('../config');
const prefix = '.'
var { File } = require("megajs")
const { Storage } = require('megajs')
       const storage =  await new Storage({
  email: 'apkdlaqua@gmail.com',
  password: 'sanuwa-official2022'
}).ready
const Heroku = require('heroku-client');
const heroku = new Heroku({
    token: config.HEROKU.API_KEY
});
const fs = require('fs')
let baseURI = '/apps/' + config.HEROKU.APP_NAME; 


var won =  ''
var woff = ''
var wnon = ''
var wnoff = ''
var wihe = ''
if (config.LANG == 'SI') {
 won =  '*🧜‍♀️💬 Welcome යෙදුම සාර්ථකව විවෘත කරන ලදී.*\n*වසා දැමීමට .welcome off යන විධානය භාවිත කරන්න*'
 woff = '*🧜‍♀️💬 Welcome යෙදුම සාර්ථකව වසා දමන ලදී.*\n*නැවත විවෘත කිරීමට .welcome on යන විධානය භාවිත කරන්න*'
 wnon = '*🧜‍♀️💬 ඔබ welcome message විවෘත කර නැත.*'
 wnoff = '*🧜‍♀️💬 ඔබ welcome message වසා දමා නැත.* '
 wihe = '*🧜‍♀️💬ඔබගේ HEROKU_API_KEY එක හා HEROKU_APP_NAME එක පරීක්ශා කරන්න.* '
    }
    if (config.LANG == 'EN') {
 won =  '*🧜‍♀️💬 Welcome Message turned on successfully !!*'
 woff = '*🧜‍♀️💬 Welcome Message turned off successfully !!*'
 wnon = '*🧜‍♀️💬You did not turned on Welcome Message*'
 wnoff = '*🧜‍♀️💬You did not turned off Welcome Message*'
 wihe = '*🧜‍♀️💬 Check your HEROKU_API_KEY or HEROKU_APP_NAME*'    
    }
var wait = ''
var err = ''
if (config.LANG == 'SI') {
       wait = '*🧜‍♀️💬රැදී සිටින්න...*'
       err = '*🧜‍♀️💬දෝශයක් හමුවිය.*' 
    }
    if (config.LANG == 'EN') {
       wait = '*🧜‍♀️💬Please wait...*'
       err = '*🧜‍♀️💬Error found.*'
    }



async function  wstatus( conn ,mek , q) {
const from = mek.key.remoteJid
const sender = mek.key.fromMe ? (conn.user.id.split(':')[0]+'@s.whatsapp.net' || conn.user.id) : (mek.key.participant || mek.key.remoteJid)
            const senderNumber = sender.split('@')[0]
            const issudo = config.SUDO !== false ? config.SUDO.includes(senderNumber) : ''
            const isowner = config.OWN.includes(senderNumber)
            const botNumber = conn.user.id.split(':')[0]
            const isMe = botNumber.includes(senderNumber)
            const isForme = isowner? isowner : isMe? isMe : issudo ? issudo : ''
            if (!isForme ) return
            if (config.SEND_READ == 'true') await conn.readMessages([mek.key])
try {    
       if (q == 'on') {
const waitm = await conn.sendMessage(from , { text: wait }, { quoted: mek } )              
if (config.WELCOME_DB == 'default') {
const db = {
             "data" : {
          [from.split('@')[0]]  : {
    "welcome": "on",
    "type": "img",
    "msg" : "deafult" ,
    "img" : "deafult" ,
    "rules" : "not" 
  
  }
             }
}
fs.writeFileSync('welcome.json', JSON.stringify(db))
const file = await storage.upload( 'welcome' + senderNumber + '.json', fs.readFileSync('welcome.json')).complete
const link = await file.link()
try {
       await heroku.patch(baseURI + '/config-vars', { 
                    body: { 
                        ['DATABASE_GR']: link
                    } 
                });
      await conn.sendMessage(from , { text: won }, { quoted: mek } )
      await conn.sendMessage(from, { delete: waitm.key })
      } catch(e) {
      return  await conn.sendMessage(from , { text: err + '\n\n' + wihe }, { quoted: mek } )
      
      }

}   


 
              
   else{           
const url = config.WELCOME_DB.replace("AQUADBWL=" ,  "https://mega.nz/file/") 
const filea = await File.fromURL(url)
const data = await filea.downloadBuffer() 
const d = data.toString()
const db = JSON.parse(d) 

if (db.data[from.split('@')[0]]) {
if (db.data[from.split('@')[0]].welcome == 'on') return await console.log('already on')       
db.data[from.split('@')[0]] = { welcome : 'on' ,
                                "msg" : db.data[from.split('@')[0]].msg ,
                                "img" : db.data[from.split('@')[0]].img ,
                                "rules" : db.data[from.split('@')[0]].rules     }   
       
} else {
db.data[from.split('@')[0]] = { welcome : 'on'    ,
                                "msg" : "deafult" ,
                                "img" : "deafult" ,
                                "rules" : "not"      }
} 
 const file = File.fromURL(config.WELCOME_DB.replace("AQUADBWL=" ,  "https://mega.nz/file/") )
const fdata = await file.loadAttributes()
const fname = fdata.name
const file2 = Object.values(storage.files).find(file => file.name === fname )
await fs.writeFileSync('welcome.json', JSON.stringify(db))  
await file2.delete(true) 
const filed = await storage.upload( 'welcome' + senderNumber + '.json', fs.readFileSync('welcome.json')).complete
const link = await filed.link() 
try {
       await heroku.patch(baseURI + '/config-vars', { 
                    body: { 
                        ['DATABASE_GR']: link
                    } 
                });
      await conn.sendMessage(from , { text: won }, { quoted: mek } )
      await conn.sendMessage(from, { delete: waitm.key })
      } catch(e) {
      return  await conn.sendMessage(from , { text: err + '\n\n' + wihe }, { quoted: mek } )
      
      }
} 

} 
       if (q == 'off') { 
       if (config.WELCOME_DB == 'default') {
const r =   from.split('@')[0]     
const db = {
             "data" : {
          [from.split('@')[0]] : {
    "welcome": "off",
    "type": "img",
    "msg" : "deafult" ,
    "img" : "deafult" ,
    "rules" : "not" 
  
  }
             }
}
fs.writeFileSync('welcome.json', JSON.stringify(db))
const file = await storage.upload( 'welcome' + senderNumber + '.json', fs.readFileSync('welcome.json')).complete
const link = await file.link()
try {
       await heroku.patch(baseURI + '/config-vars', { 
                    body: { 
                        ['DATABASE_GR']: link
                    } 
                });
      await conn.sendMessage(from , { text: won }, { quoted: mek } )
      await conn.sendMessage(from, { delete: waitm.key })
      } catch(e) {
      return  await conn.sendMessage(from , { text: err + '\n\n' + wihe }, { quoted: mek } )
      
      }
}

              
   else {              
       const url = config.WELCOME_DB.replace("AQUADBWL=" ,  "https://mega.nz/file/") 
const file = await File.fromURL(url)
const data = await file.downloadBuffer() 
const d = data.toString()
const db = JSON.parse(d) 

if (db.data[from.split('@')[0]]) {
if (db.data[from.split('@')[0]].welcome == 'off') return await console.log('already off')       
db.data[from.split('@')[0]] = { welcome : 'off' ,
                                "msg" : db.data[from.split('@')[0]].msg ,
                                "img" : db.data[from.split('@')[0]].img ,
                                "rules" : db.data[from.split('@')[0]].rules     }
const file = File.fromURL(url)
const fdata = await file.loadAttributes()
const fname = fdata.name
const file2 = Object.values(storage.files).find(file => file.name === fname )
await fs.writeFileSync('welcome.json', JSON.stringify(db))  
await file2.delete(true) 
const filed = await storage.upload( 'welcome' + senderNumber + '.json', fs.readFileSync('welcome.json')).complete
const link = await filed.link()  
try {
       await heroku.patch(baseURI + '/config-vars', { 
                    body: { 
                        ['DATABASE_GR']: link
                    } 
                });
      await conn.sendMessage(from , { text: won }, { quoted: mek } )
      await conn.sendMessage(from, { delete: waitm.key })
      } catch(e) {
      return  await conn.sendMessage(from , { text: err + '\n\n' + wihe }, { quoted: mek } )
      
      }
} else{
return await console.log('already off') 
}
              
              }  }       
} catch(e) {
return await conn.sendMessage(from , { text: err + '\n\n' + e }, { quoted: mek } )
}  
}

module.exports =  wstatus ;
