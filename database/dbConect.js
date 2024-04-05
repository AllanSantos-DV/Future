const dotenv = require('dotenv').config();
const env = dotenv.parsed;

const Seq = require('sequelize');

console.log(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, process.env.DB_HOST); // debug


const db = new Seq(env.DB_NAME, env.DB_USER, env.DB_PASSWORD, {
    host: env.DB_HOST,
    dialect: "mysql",
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