const app = require('./app');
const initDb = require('./init');
const adicionarDados = require('./futurosMaster');

const PORT = process.env.PORT || 3000;

// Inicializa o banco de dados e o servidor HTTP
initDb().then(() => {
    if (process.env.ADICIONAR_DADOS === 'true') {
        adicionarDados().then(() => {
            console.log('Dados adicionados com sucesso!');
            process.env.ADICIONAR_DADOS = 'false';
        }).catch(error => {
            console.error('Erro ao adicionar dados:', error);
        });
    }
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
        console.log(`http://localhost:${PORT}/users`);
    });
}).catch(error => {
    console.error('Erro ao inicializar o banco de dados:', error);
});
