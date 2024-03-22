const Futuros = require('../database/modelos/futuros');

const criarFuturo = async (futuro) => {
    return await Futuros.create(futuro);
}

const listarFuturos = async () => {
    return await Futuros.findAll();
}

const buscarFuturoPorId = async (id) => {
    return await Futuros.findByPk(id);
}

const atualizarFuturo = async (id, futuro) => {
    return await Futuros.update(futuro, { where: { id } });
}

const deletarFuturo = async (id) => {
    return await Futuros.destroy({ where: { id } });
}

module.exports = {
    criarFuturo,
    listarFuturos,
    buscarFuturoPorId,
    atualizarFuturo,
    deletarFuturo
}