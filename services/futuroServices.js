const futurosController = require('../controllers/futurosController');
const tryCatchWrapper = require('./tryCatch');

const criarFuturo = async (req, res) => {
    const { body } = req;
    await tryCatchWrapper(async () => {
        await futurosController.criarFuturo(body);
    },
        'Futuro criado com sucesso',
        'Erro ao criar futuro',
        req
    );
    res.redirect('/futuros');
}

const listarFuturos = async (req, res) => {
    await tryCatchWrapper(async () => {
        const futuros = await futurosController.listarFuturos();
        return res.render('futuros', { futuros });
    },
        'Futuros listados com sucesso',
        'Erro ao listar futuros',
        req
    );
    res.redirect('/futuros');
}

const buscarFuturoPorId = async (req, res) => {
    const { id } = req.params;
    await tryCatchWrapper(async () => {
        const futuro = await futurosController.buscarFuturoPorId(id);
        return res.render('futuro', { futuro });
    },
        'Futuro encontrado com sucesso',
        'Erro ao encontrar futuro',
        req
    );
    res.redirect('/futuros');
}

const atualizarFuturo = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    await tryCatchWrapper(async () => {
        await futurosController.atualizarFuturo(id, body);
    },
        'Futuro atualizado com sucesso',
        'Erro ao atualizar futuro',
        req
    );
    res.redirect('/futuros');
}

const deletarFuturo = async (req, res) => {
    const { id } = req.params;
    await tryCatchWrapper(async () => {
        await futurosController.deletarFuturo(id);
    },
        'Futuro deletado com sucesso',
        'Erro ao deletar futuro',
        req
    );
    res.redirect('/futuros');
}

module.exports = {
    criarFuturo,
    listarFuturos,
    buscarFuturoPorId,
    atualizarFuturo,
    deletarFuturo
}
