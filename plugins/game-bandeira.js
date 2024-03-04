let handler = async (m, { conn, args, usedPrefix, command }) => {
    conn.flags = conn.flags ? conn.flags : {}
    
    let te = `
🚩 *Jogo de Adivinhação de Bandeiras:* 
    
${Object.keys(flags).join(' | ')} 
  
*📌 Exemplo de uso:* _${usedPrefix+command}_
  
*Adivinhe de qual país é esta bandeira! Digite o nome do país para responder.*`
    
    let id = m.chat
    if (id in conn.flags) return conn.reply(m.chat, `⚠️ ${mssg.gameOn}`, conn.flags[id][0])
    let flag = pickRandomFlag()
    conn.flags[id] = [
        await conn.sendFile(m.chat, flag.image, 'flag.png', `Adivinhe a bandeira deste país!`, m),
        flag,
        setTimeout(() => {
            if (conn.flags[id]) conn.reply(m.chat, `⏳ O tempo acabou! A bandeira era do ${flag.name}.`, conn.flags[id][0])
            delete conn.flags[id]
        }, 60000) // 60 segundos para adivinhar
    ]
    conn.reply(m.chat, te, m)
}
handler.help = ['adivinha']
handler.tags = ['game']
handler.command = ['adivinha', 'bandeira', 'guess', 'flag'] 

let flags = {
    brasil: { name: 'Brasil', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/1280px-Flag_of_Brazil.svg.png' },
    estadosunidos: { name: 'Estados Unidos', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/1280px-Flag_of_the_United_States.svg.png' },
    canada: { name: 'Canadá', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flag_of_Canada_%28Pantone%29.svg/1280px-Flag_of_Canada_%28Pantone%29.svg.png' },
    india: { name: 'Índia', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Flag_of_India.svg/1280px-Flag_of_India.svg.png' },
    china: { name: 'China', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/1280px-Flag_of_the_People%27s_Republic_of_China.svg.png' }
}

function pickRandomFlag() {
    let countries = Object.keys(flags)
    let randomCountry = countries[Math.floor(Math.random() * countries.length)]
    return flags[randomCountry]
}

handler.flags = flags

export default handler
