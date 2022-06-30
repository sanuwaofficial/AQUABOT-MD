const config = require('../config');
const prefix = '.'
const sql = require('../lib/greetings');
const Language = require('../language');
const Lang = Language.getString('greetings');

async function  welcome(conn , mek , q ) {
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
            if (!q ) {
	    var hg = await sql.getMessage(from);
    if (hg === false) {
        await conn.sendMessage(from, { text: Lang.NOT_SET_WELCOME }, { quoted: mek } ) 
    } else {
        await conn.sendMessage(from, { text: Lang.WELCOME_ALREADY_SETTED + hg.message + '```' }, { quoted: mek } ) 
    }
	    }  else {
	    if (q == 'delete' ) {
		await conn.sendMessage(from, { text: Lang.NO }, { quoted: mek } ) 
		return await sql.deleteMessage(from, 'welcome');
		}  else {
		await sql.setMessage(from, 'welcome', q.replace(/#/g, '\n'));
		return await conn.sendMessage(from, { text: Lang.WELCOME_SETTED }, { quoted: mek } )
		}
	    
	    
	    
	    }
	  
	  } catch(e) {
		console.log(e)  
	   await conn.sendMessage(from, { text: 'error' }, { quoted: mek } )
	  }
  }
 


module.exports = welcome  ;
