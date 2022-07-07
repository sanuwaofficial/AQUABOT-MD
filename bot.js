const Config = require('./config');
const config = require('./config');

const {
	default: makeWASocket,
	useSingleFileAuthState,
	DisconnectReason,
	getContentType ,
	jidDecode
} = require('@adiwajshing/baileys')
const {  fetchLatestBaileysVersion, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage, makeInMemoryStore,  proto } = require("@adiwajshing/baileys")
const fs = require('fs')
const P = require('pino')
const qrcode = require('qrcode-terminal')
const simpleGit = require('simple-git');
const git = simpleGit();
const exec = require('child_process').exec;
const Heroku = require('heroku-client');
const { PassThrough } = require('stream');
const heroku = new Heroku({ token: Config.HEROKU.API_KEY })
var { File } = require("megajs")
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep } = require('./lib/functions')
const  { Boom } = require('@hapi/boom')
async function session(id) {
 console.log('📡checking session code...') 
const url = id.replace("AQUA=" ,  "https://mega.nz/file/") 
const file = await File.fromURL(url)
const data = await file.downloadBuffer() 
fs.writeFileSync('./tmp/session.json', data.toString())  
console.log('🪢session Code Verification Completed')
}
const { song ,  asong ,  dsong , getyt , video , yt720p , yt480p , yt360p}  = require('./plugins/youtube');
const { kick , add , promote , demote , mute , unmute } = require('./plugins/admin')
const { sticker , stic2img , stic2vid } = require('./plugins/sticker')
const menu = require('./plugins/menu')
const alive = require('./plugins/alive')
const ig = require('./plugins/instagram')
const dap = require('./plugins/test')
const ping = require('./plugins/web')
const gis = require('./plugins/image')
const emomix = require('./plugins/emomix')
const { apk_dl , s_apk  , dapk_dl , dapk_info} = require('./plugins/playstore')
const { bgrm , rasstic ,  rasdoc , rasimg} = require('./plugins/rbg')
const mfire = require('./plugins/mediafire')
const own = require('./plugins/owner')
const {pemoji , sticemoji} = require('./plugins/emoji')
const tag = require('./plugins/tagall')

const react_auto = require('./plugins/auto_react')
const { fb , sdfb ,hdfb } = require('./plugins/facebook')
const { setfilter , stop , filter } = require('./plugins/filter')
const { tik , wtik , nwtik } = require('./plugins/tiktok')
const axios = require('axios');
const prefix = '.'
const ownerNumber = ['94701629707']

async function  fetchJson(url, options)  {
    try {
        options ? options : {}
        const res = await axios({
            method: 'GET',
            url: url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
            },
            ...options
        })
        return res.data
    } catch (err) {
        return err
    }
}

async function ses2(ses2c) {
 try{
	const sesl = ses2c.replace( "AQUA-MD=" , "https://aquabot.up.railway.app/file/") + '.json'
	const sesf = await axios.get( sesl  )
	fs.writeFileSync('./tmp/session.json', JSON.stringify(sesf.data) )  
        console.log('🪢session Code Verification Completed')
	} 
		catch(e) {
		 console.log('err found! retrying.... error : ' + e)
		ses2(ses2c)	
		}
 }

 
const getVersionWaweb = () => {
    let version
    try {
        let a = fetchJson('https://web.whatsapp.com/check-update?version=1&platform=web')
        version = [a.currentVersion.replace(/[.]/g, ', ')]
    } catch {
        version = [2, 2204, 13]
    }
    return version
}

const store = makeInMemoryStore({ logger: P().child({ level: 'silent', stream: 'store' }) })
async function connectToWA()  {
	if (config.SESSION == '') return await console.log('🚫please enter the session code')
		if (config.SESSION.startsWith('AQUA=')){
	await session(config.SESSION)
	} else if (config.SESSION.startsWith('AQUA-MD=')) {
	await ses2(config.SESSION)
	} else { return await console.log('🚫invalid session code . only works with aquabot md session codes🚫') }
		
	

	const { state, saveState } = useSingleFileAuthState('./tmp/session.json')
	const conn = makeWASocket({
		logger: P({ level: 'silent' }),
		printQRInTerminal: true,
		browser: ['AQUABOT-MD','Safari','1.0.0'],
		auth: state,
		version: getVersionWaweb() || [2, 2222, 11]
	})
	 store.bind(conn.ev)
	conn.ev.on('connection.update', async(update) => {
		const { connection, lastDisconnect } = update
		if (connection === 'close') {
	     let reason = new Boom(lastDisconnect?.error)?.output?.statusCode
            if (reason === DisconnectReason.badSession) { console.log(`Bad Session File, Please Delete Session and Scan Again`); process.exit(); }
            else if (reason === DisconnectReason.connectionClosed) { console.log("Connection closed, Reconnecting...."); connectToWA(); }
            else if (reason === DisconnectReason.connectionLost) { console.log("Connection Lost from Server, Reconnecting..."); connectToWA(); }
            else if (reason === DisconnectReason.connectionReplaced) { console.log("Connection Replaced, Another New Session Opened, Please Close Current Session First"); process.exit(); }
            else if (reason === DisconnectReason.loggedOut) { console.log(`Device Logged Out, Please Delete Session And Scan Again.`); process.exit(); }
            else if (reason === DisconnectReason.restartRequired) { console.log("Restart Required, Restarting..."); connectToWA(); }
            else if (reason === DisconnectReason.timedOut) { console.log("Connection TimedOut, Reconnecting..."); connectToWA(); }
	    else if (reason === '503') { console.log(`Service unavaileble, Retrying...`); process.exit(); }
            else { console.log(`Unknown DisconnectReason: ${reason}|${connection}`) ; process.exit();}
			
		} else if (connection === 'open') {
			console.log('✅connected')
			var botmsg = ''
      if (config.WORKTYPE == 'private' && config.LANG == 'EN') botmsg = '*AQUABOT Working As Private!⛲*\n\n\n```Please do not try Commands here. This is your LOG number.```\n```You can use commands in any other chat :)```\n\n*⚙️Type .settings in any other chat to change your bot settings.*\n\n\nThanks For Using AQUABOT 🐳'
      if (config.WORKTYPE == 'public' && config.LANG == 'SI') botmsg = '*AQUABOT සැමට භාවිත කළ හැකි ආකාරයට ක්‍රියා කරයි!⛲*\n\n\n```කරුණාකර මෙහි විධාන භාවිත නොකරන්න.මෙය ඔබගේ ලොග් අංකයයි.```\n```(වෙනත් ඕනෑම චැට් එකක විධානයන් භාවිත කළ හැකිය.)```\n\n*⚙️BOT ගේ සැකසීම් වෙනස් කිරීම සදහා වෙනත් chat එකක .settings ලෙස ටයිප් කරන්න.*\n\n\nAQUABOT භාවිත කරනවාට ස්තූතියි🐳' 
      if (config.WORKTYPE == 'public' && config.LANG == 'EN') botmsg = '*AQUABOT Working As Public!⛲*\n\n\n```Please do not try Commands here. This is your LOG number.```\n```You can use commands in any other chat :)```\n\n*⚙️Type .settings in any other chat to change your bot settings.*\n\n\nThanks For Using AQUABOT 🐳'
      if (config.WORKTYPE == 'private' && config.LANG == 'SI') botmsg = '*AQUABOT ඔබට පමණක් භාවිත කළ හැකි ආකාරයට ක්‍රියා කරයි!⛲*\n\n\n```කරුණාකර මෙහි විධාන භාවිත නොකරන්න.මෙය ඔබගේ ලොග් අංකයයි.```\n```(වෙනත් ඕනෑම චැට් එකක විධානයන් භාවිත කළ හැකිය.)```\n\n*⚙️BOT ගේ සැකසීම් වෙනස් කිරීම සදහා වෙනත් chat එකක .settings ලෙස ටයිප් කරන්න.*\n\n\nAQUABOT භාවිත කරනවාට ස්තූතියි🐳'
		
			

const buttonMessage = {
    
    text : botmsg  }
await conn.sendMessage(conn.user.id, buttonMessage)
		}
	})
	
	conn.ev.on('creds.update', saveState)
	
	conn.ev.on('messages.upsert', async(mek) => {
		try {
			mek = mek.messages[0]
			if (!mek.message) return
			
			mek.message = (getContentType(mek.message) === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
			if (mek.key && mek.key.remoteJid === 'status@broadcast') return
			if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return
			const type = getContentType(mek.message)
			const content = JSON.stringify(mek.message)
			const from = mek.key.remoteJid
			
			const quoted = type == 'extendedTextMessage' && mek.message.extendedTextMessage.contextInfo != null ? mek.message.extendedTextMessage.contextInfo.quotedMessage || [] : []
			const body = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : ( type == 'listResponseMessage') && mek.message.listResponseMessage.singleSelectReply.selectedRowId? mek.message.listResponseMessage.singleSelectReply.selectedRowId : (type == 'buttonsResponseMessage') && mek.message.buttonsResponseMessage.selectedButtonId  ? mek.message.buttonsResponseMessage.selectedButtonId  : (type == "templateButtonReplyMessage") && mek.message.templateButtonReplyMessage.selectedId ? mek.message.templateButtonReplyMessage.selectedId  :  (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : ''
			
			const isCmd = body.startsWith(prefix)
			const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : ''
			
			const args = body.trim().split(/ +/).slice(1)
			const q = args.join(' ')
			const isGroup = from.endsWith('@g.us')
			const sender = mek.key.fromMe ? (conn.user.id.split(':')[0]+'@s.whatsapp.net' || conn.user.id) : (mek.key.participant || mek.key.remoteJid)
			const senderNumber = sender.split('@')[0]
			const botNumber = conn.user.id.split(':')[0]
			const pushname = mek.pushName || 'unknown'
			
			const isMe = botNumber.includes(senderNumber)
			const isOwner = ownerNumber.includes(senderNumber) || isMe
			       
			
			
			
			const reply = async(teks) => {
				await conn.sendMessage(from, { text: teks }, { quoted: mek })
			}
			
			
			
			

			
			const msg = mek
			
			// Block chat 
			
			if (config.BLOCKCHAT !== false) {     
            var abc = config.BLOCKCHAT.split(',');                            
            if(msg.key.remoteJid.includes('-') ? abc.includes(msg.key.remoteJid.split('@')[0]) : abc.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
        }
        if (config.SUPPORT == '393475528094-1415817281') {     
            var sup = config.SUPPORT.split(',');                            
            if(msg.key.remoteJid.includes('-') ? sup.includes(msg.key.remoteJid.split('@')[0]) : sup.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
        }
        if (config.SUPPORT2 == '96176912958-1458298055') {     
            var tsup = config.SUPPORT2.split(',');                            
            if(msg.key.remoteJid.includes('-') ? tsup.includes(msg.key.remoteJid.split('@')[0]) : tsup.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
        }
        if (config.SUPPORT3 == '393472769604-1446476993') {     
            var nsup = config.SUPPORT3.split(',');                            
            if(msg.key.remoteJid.includes('-') ? nsup.includes(msg.key.remoteJid.split('@')[0]) : nsup.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
        }
         if (config.Support4 == '94701629707-1630672792') {     
            var nsup = config.Support4.split(',');                            
            if(msg.key.remoteJid.includes('-') ? nsup.includes(msg.key.remoteJid.split('@')[0]) : nsup.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
        }
         if (config.AMDI_1 == '94757405652-1533638214') {     
            var sup = config.SUPPORT.split(',');                            
            if(msg.key.remoteJid.includes('-') ? sup.includes(msg.key.remoteJid.split('@')[0]) : sup.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
        }
       
         if (config.AMDI_3 == '94757405652-1631633729') {     
            var sup = config.SUPPORT.split(',');                            
            if(msg.key.remoteJid.includes('-') ? sup.includes(msg.key.remoteJid.split('@')[0]) : sup.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
        }
         if (config.AMDI_4 == '94757405652-1631905677') {     
            var sup = config.SUPPORT.split(',');                            
            if(msg.key.remoteJid.includes('-') ? sup.includes(msg.key.remoteJid.split('@')[0]) : sup.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
        }
         if (config.AMDI_5 == '94757405652-1636094186') {     
            var sup = config.SUPPORT.split(',');                            
            if(msg.key.remoteJid.includes('-') ? sup.includes(msg.key.remoteJid.split('@')[0]) : sup.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
        }
         if (config.AMDI_6 == '972542559113-1376904403') {     
            var sup = config.SUPPORT.split(',');                            
            if(msg.key.remoteJid.includes('-') ? sup.includes(msg.key.remoteJid.split('@')[0]) : sup.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
        }
         if (config.AMDI_7 == '94757405652-1636286090') {     
            var sup = config.SUPPORT.split(',');                            
            if(msg.key.remoteJid.includes('-') ? sup.includes(msg.key.remoteJid.split('@')[0]) : sup.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
        }
			
			
			
			
			if(config.AUTO_REACT == 'true'){
			if(!isCmd){
			react_auto(conn , mek , body)
			}}
			
			if(config.ANTILINK !== 'false') {
				
			if (body.includes('chat.whatsapp.com')) {
			const sender = mek.key.fromMe ? (conn.user.id.split(':')[0]+'@s.whatsapp.net' || conn.user.id) : (mek.key.participant || mek.key.remoteJid)
                        const senderNumber = sender.split('@')[0]
			const isGroup = from.endsWith('@g.us')
                        const groupMetadata = isGroup ? await conn.groupMetadata(from) : {}
                        const groupMembers = isGroup ? groupMetadata.participants : []
                        const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : false
			const isGroupAdmins = isGroup ? groupAdmins.includes(sender) : false
                        const isBotAdmin = isGroup ? groupAdmins.includes(botNumber + '@s.whatsapp.net') : false
			if(!isGroup)return
			if(isGroupAdmins)return	
			if(!isBotAdmin)return
			await conn.sendMessage(from , { text : '*link detected!*'} , { quoted: mek })
		        await conn.groupParticipantsUpdate(from, [sender] ,"remove" )
			}}
			
			if (config.INBOX_BLOCK == 'true') {
				
			const isGroup = from.endsWith('@g.us')
			if(!isGroup) {
			const sender = mek.key.fromMe ? (conn.user.id.split(':')[0]+'@s.whatsapp.net' || conn.user.id) : (mek.key.participant || mek.key.remoteJid)
                        const senderNumber = sender.split('@')[0]
			const issudo = config.SUDO !== false ? config.SUDO.includes(senderNumber) : ''
                        const isowner = config.OWN.includes(senderNumber)
                        const isMe = botNumber.includes(senderNumber)
			const isForme = isowner? isowner : isMe? isMe : issudo ? issudo : ''
			if (!isForme )  {
			if (config.INBOX_BLOCK_MSG !== 'default') {
			await conn.sendMessage(from , { text : config.INBOX_BLOCK_MSG } , { quoted: mek })
		        await conn.updateBlockStatus( sender , "block")
			
			} else{	
			var bmsg = " "
                        if (config.LANG = "EN") bmsg = "*🧜‍♀️💬ALL INBOX MESSAGES  ARE BLOCKED BY OWNER*"
                        if (config.LANG == "SI") bmsg ="🧜‍♀️💬 සියලුම INBOX MESSAGEES බොට් හිමිකරු විසින් අවහිර කර ඇත."
			await conn.sendMessage(from , { text : bmsg } , { quoted: mek })
		        await conn.updateBlockStatus( sender , "block")
			}
			}
			}
			
			
			
			}
			// commands
			
			switch (command) {

case 'alive':
if (config.SEND_READ == 'true') await conn.readMessages([mek.key])					
alive(conn ,mek )

break
					
					
					
				case 'owner' :
					if (config.SEND_READ == 'true') await conn.readMessages([mek.key])
					own(conn ,mek)
					
					break
				case 'update' :	
  			
  const issudo = config.SUDO !== false ? config.SUDO.includes(senderNumber) : ''
  const isowner = config.OWN.includes(senderNumber)
  const isForme = isowner? isowner : isMe? isMe : issudo ? issudo : ''
  if (!isForme ) return
	if (config.SEND_READ == 'true') await conn.readMessages([mek.key])					
					 await git.fetch();
    var commits = await git.log([Config.BRANCH + '..origin/' + Config.BRANCH]);
    if (commits.total === 0) {
        reply('no updates')    
    } else {
	    
    if (Config.HEROKU.HEROKU) {
            try {
		     reply('updating')
                var app = await heroku.get('/apps/' + Config.HEROKU.APP_NAME)
            } catch {
               reply('invalid heroku app name')
            }

            git.fetch('upstream', Config.BRANCH);
            git.reset('hard', ['FETCH_HEAD']);

            var git_url = app.git_url.replace(
                "https://", "https://api:" + Config.HEROKU.API_KEY + "@"
            )
            
            try {
                await git.addRemote('heroku', git_url);
            } catch { console.log('heroku remote ekli'); }
            await git.push('heroku', Config.BRANCH);

           reply('updated')
            
        } 
    }
	break				
				
				        case 'song' : 
					case 'ytmp3' : 
					if (config.SEND_READ == 'true') await conn.readMessages([mek.key])	
					song(  conn , mek , q)
					break
				        case 'dsong' :
					dsong(  conn , mek , q)
					break
					case 'asong' :
					asong(  conn , mek , q)
					break
					case 'getyt' : 
          case 'yts' : 
					getyt(conn , mek , q)
					break
				        case 'kick' :
					case 'ban' :
					kick(conn , mek , q)
					break
					case 'add' :
					add(conn , mek , q)
					break
				        case 'video' :
					video(conn , mek , q)
					break
					case 'vid360' :
					yt360p(conn , mek , q)
					break
					case 'vid480' :
					yt480p(conn , mek , q)
					break
					case 'vid720' :
					yt720p(conn , mek , q)
					break
				        case 'sticker' :
				        case 'stic' :
					sticker(conn ,mek )
					break
				      
				        case 'facebook' :
				        case 'fb' :
					fb(conn , mek ,q)
					break
				        case 'sdfb' :
					sdfb(conn , mek ,q)
					break
					case 'hdfb' :
					hdfb(conn , mek ,q)
					break
				        case 'tik' :
					case 'tiktok' :
					tik(conn , mek ,q)
					break
				        case 'nwtik' :
					nwtik(conn , mek ,q)
					break
					case 'wtik' :
					wtik(conn , mek ,q)
					break
					case 'promote' :
					promote(conn , mek ,q)
					break
					case 'demote' :
					demote(conn , mek ,q)
					break
					case 'photo' :
					case 'imagesticker' :
					case 'imgsticker' :
					stic2img(conn , mek ,q)
					break
				     
				        case 'ig' :
					case 'instagram' :
					ig(conn , mek ,q)
					break
				
				
				        case 'sticvid' :
					case 'vsticker' :
				        case 'vidsticker' :
					stic2vid(conn ,mek) 
					break
				        case 'mediafire' :
					 case 'mfire' :
					mfire(conn , mek ,q)
					break
				        case 'mute' :
					mute(conn ,mek) 
					break
					case 'unmute' :
					unmute(conn ,mek) 
					break
					case 'menu' :
					case 'panel' :
					case 'list' :
					if (config.SEND_READ == 'true') await conn.readMessages([mek.key])
					menu(conn ,mek) 
					break
					case 'tagall' :
					tag(conn ,mek ,q) 
					break
				        case 'pemoji' :
					pemoji(conn , mek ,q)
					break
				        case 'sticemoji' :
					case 'semoji' :
					case 'emojisticker' :
					case 'semo' :
					case 'sticemo' :
					sticemoji(conn ,mek ,q)
					break
					case 'ping' :
					ping(conn ,mek ,q)
					break
					case 'emomix' :
					case 'emojimix' :
					emomix(conn ,mek ,q)
					break
					case 'img' :
					case 'image' :
					gis(conn ,mek ,q)
					break
					case 'rbg' :
					case 'removebg' :
					case 'removebackground' :
					bgrm(conn ,mek)
					break
					case 'rasstic' :
					rasstic(conn ,mek , q)
					break
					case 'rasimg' :
					case 'dlimg' :
					rasimg(conn ,mek , q)
					break
					case 'rasdoc' :
					rasdoc(conn ,mek , q)
					break
					case 'apk' :
					case 'downapk' :
					apk_dl(conn ,mek , q)
					break
					case 'findapk' :
					case 'getapk' :
					case 'getpack' :
					case 'playstore' :
					s_apk(conn ,mek , q)
					break
					case 'dapkdl' :
				        dapk_dl(conn ,mek , q)
					break
					case 'inapk' :
					dapk_info(conn ,mek , q)
					break
					case 'dapdl' :
					dap(conn ,mek , q)
					break
			}
			
		} catch (e) {
			const isError = String(e)
			console.log( isError )
		
		}
	}
		  )
}

connectToWA()
