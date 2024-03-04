let handler = async (m, { conn, text }) => {
    conn.flags = conn.flags ? conn.flags : {}
    
    // Registrar a função checkAnswer como um listener de eventos para mensagens recebidas
    conn.on('chat-update', checkAnswer)
    
    let id = m.chat
    if (id in conn.flags) return conn.reply(m.chat, `⚠️ ${mssg.gameOn}`, conn.flags[id][0])
    let flag = pickRandomFlag()
    conn.flags[id] = [
        await conn.sendFile(m.chat, flag.image, 'flag.png', `Adivinhe a bandeira deste país!`, m),
        flag,
        setTimeout(() => {
            if (conn.flags[id]) conn.reply(m.chat, `⏳ O tempo acabou! A bandeira era do ${flag.name}.`, conn.flags[id][0])
            delete conn.flags[id]
        }, 30000) // 30 segundos para adivinhar
    ]
}

handler.checkAnswer = async (m, { conn, text }) => {
    let id = m.chat
    if (m.chat == id && conn.flags[id]) {
        let answer = text.toLowerCase().replace(/[^\w\s]/gi, '') // Remover caracteres especiais
        let correctAnswer = conn.flags[id][1].name.toLowerCase().replace(/[^\w\s]/gi, '') // Remover caracteres especiais
        if (answer.trim() === correctAnswer.trim()) {
            conn.reply(m.chat, `✅ Parabéns! Você acertou! A bandeira era do ${conn.flags[id][1].name}.`, conn.flags[id][0])
            clearTimeout(conn.flags[id][2])
            delete conn.flags[id]
        } else {
            conn.reply(m.chat, `❌ Resposta incorreta. Tente novamente!`, conn.flags[id][0])
        }
    }
}

handler.help = ['bandeiras']
handler.tags = ['game', 'prime']
handler.command = ['adivinha', 'bandeira', 'bandeiras, 'flag'] 

let flags = {
  brasil: { name: 'Brasil', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/1280px-Flag_of_Brazil.svg.png' },
  estadosunidos: { name: 'Estados Unidos', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/1280px-Flag_of_the_United_States.svg.png' },
  canada: { name: 'Canadá', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flag_of_Canada_%28Pantone%29.svg/1280px-Flag_of_Canada_%28Pantone%29.svg.png' },
  india: { name: 'Índia', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Flag_of_India.svg/1280px-Flag_of_India.svg.png' },
  china: { name: 'China', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/1280px-Flag_of_the_People%27s_Republic_of_China.svg.png' },
  alemanha: { name: 'Alemanha', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/1280px-Flag_of_Germany.svg.png' },
  franca: { name: 'França', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/1280px-Flag_of_France.svg.png' },
  italia: { name: 'Itália', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Flag_of_Italy.svg/1280px-Flag_of_Italy.svg.png' },
  espanha: { name: 'Espanha', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Spain.svg/1280px-Flag_of_Spain.svg.png' },
  australia: { name: 'Austrália', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Flag_of_Australia.svg/1280px-Flag_of_Australia.svg.png' },
  reinosunidos: { name: 'Reino Unido', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Flag_of_the_United_Kingdom.svg/1280px-Flag_of_the_United_Kingdom.svg.png' },
  russiam: { name: 'Rússia', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Flag_of_Russia.svg/1280px-Flag_of_Russia.svg.png' },
  argentina: { name: 'Argentina', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/1280px-Flag_of_Argentina.svg.png' },
  mexico: { name: 'México', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Flag_of_Mexico.svg/1280px-Flag_of_Mexico.svg.png' },
  africa_do_sul: { name: 'África do Sul', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Flag_of_South_Africa.svg/1280px-Flag_of_South_Africa.svg.png' },
  nigeria: { name: 'Nigéria', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Flag_of_Nigeria.svg/1280px-Flag_of_Nigeria.svg.png' },
  coreia_do_sul: { name: 'Coreia do Sul', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/1280px-Flag_of_South_Korea.svg.png' },
  suecia: { name: 'Suécia', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Flag_of_Sweden.svg/1280px-Flag_of_Sweden.svg.png' },
  suica: { name: 'Suíça', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Flag_of_Switzerland.svg/1280px-Flag_of_Switzerland.svg.png' },
  dinamarca: { name: 'Dinamarca', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Flag_of_Denmark.svg/1280px-Flag_of_Denmark.svg.png' },
  noruega: { name: 'Noruega', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flag_of_Norway.svg/1280px-Flag_of_Norway.svg.png' },
  holanda: { name: 'Holanda', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Flag_of_the_Netherlands.svg/1280px-Flag_of_the_Netherlands.svg.png' },
  finlandia: { name: 'Finlândia', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_Finland.svg/1280px-Flag_of_Finland.svg.png' },
  nova_zelandia: { name: 'Nova Zelândia', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Flag_of_New_Zealand.svg/1280px-Flag_of_New_Zealand.svg.png' },
  portugal: { name: 'Portugal', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Portugal.svg/1280px-Flag_of_Portugal.svg.png' },
  polonia: { name: 'Polônia', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Flag_of_Poland.svg/1280px-Flag_of_Poland.svg.png' },
  indonesia: { name: 'Indonésia', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Flag_of_Indonesia.svg/1280px-Flag_of_Indonesia.svg.png' },
  turquia: { name: 'Turquia', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Flag_of_Turkey.svg/1280px-Flag_of_Turkey.svg.png' },
  ira: { name: 'Irã', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Flag_of_Iran.svg/1280px-Flag_of_Iran.svg.png' },
  irlanda: { name: 'Irlanda', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Flag_of_Ireland.svg/1280px-Flag_of_Ireland.svg.png' },
}
function pickRandomFlag() {
    let countries = Object.keys(flags)
    let randomCountry = countries[Math.floor(Math.random() * countries.length)]
    return flags[randomCountry]
}

handler.flags = flags

export default handler
