const Futuros = require('./database/modelos/futuros');

const dados = [
    { frase: 'O futuro pertence àqueles que acreditam na beleza de seus sonhos.', numero: Math.floor(Math.random() * 100) },
    { frase: 'O futuro começa hoje, não amanhã.', numero: Math.floor(Math.random() * 100) },
    { frase: 'O futuro depende do que fazemos no presente.', numero: Math.floor(Math.random() * 100) },
    { frase: 'O futuro é criado por aquilo que você faz hoje, não amanhã.', numero: Math.floor(Math.random() * 100) },
    { frase: 'O futuro tem muitos nomes. Para os fracos, é o inatingível. Para os temerosos, o desconhecido. Para os valentes é a oportunidade.', numero: Math.floor(Math.random() * 100) }
];

async function adicionarDados() {
    try {
        await Futuros.bulkCreate(dados);
        console.log('Dados adicionados com sucesso!');
    } catch (error) {
        console.error('Erro ao adicionar dados:', error);
    }
}

module.exports = adicionarDados; 
