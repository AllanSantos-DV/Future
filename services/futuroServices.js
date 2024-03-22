const futurosController = require('../controllers/futurosController');

const criarFuturo = async (req, res) => {
    const { body } = req;
    try {
        const futuro = await futurosController.criarFuturo(body);
        req.flash('success', 'Futuro criado com sucesso');
    } catch (error) {
        req.flash('error', 'Erro ao criar futuro');
    }
    res.redirect('/futuros');
}

const listarFuturos = async (req, res) => {
    try {
        const futuros = await futurosController.listarFuturos();
        res.render('futuros', { futuros });
    } catch (error) {
        req.flash('error', 'Erro ao listar futuros');
        res.redirect('/futuros');
    }
}

const buscarFuturoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const futuro = await futurosController.buscarFuturoPorId(id);
        res.render('futuro', { futuro });
    } catch (error) {
        req.flash('error', 'Erro ao buscar futuro');
        res.redirect('/futuros');
    }
}

const atualizarFuturo = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
        await futurosController.atualizarFuturo(id, body);
        req.flash('success', 'Futuro atualizado com sucesso');
    } catch (error) {
        req.flash('error', 'Erro ao atualizar futuro');
    }
    res.redirect('/futuros');
}

const deletarFuturo = async (req, res) => {
    const { id } = req.params;
    try {
        await futurosController.deletarFuturo(id);
        req.flash('success', 'Futuro deletado com sucesso');
    } catch (error) {
        req.flash('error', 'Erro ao deletar futuro');
    }
    res.redirect('/futuros');
}

module.exports = {
    criarFuturo,
    listarFuturos,
    buscarFuturoPorId,
    atualizarFuturo,
    deletarFuturo
}