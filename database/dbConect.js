const dotenv = require('dotenv').config();
const env = dotenv.parsed;

const Seq = require('sequelize');

console.log(process.env.DB_DIALECT);  // Imprima o valor de DB_DIALECT para depuração
console.log(process.env.DB_HOST);  // Imprima o valor de DB_HOST para depuração
console.log(process.env.DB_NAME);  // Imprima o valor de DB_NAME para depuração
console.log(process.env.DB_USER);  // Imprima o valor de DB_USER para depuração

const db = new Seq(env.DB_NAME, env.DB_USER, env.DB_PASSWORD, {
    host: env.DB_HOST,
    dialect: env.DB_DIALECT,
    logging: false
});

db.authenticate().then(() => {
    console.log('Conectado com sucesso!');
}).catch(err => {
    console.error('Falha na conexão: ', err);
});

module.exports = {
    db,
    Seq
}