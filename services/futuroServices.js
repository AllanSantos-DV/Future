const futurosController = require('../controllers/futuroController');
const usuarioControllers = require('../controllers/usuarioController');
const tryCatchWrapper = require('./tryCatch');

const criarFuturo = async (req, res) => {
    const future = {
        frase: req.body.frase,
        numero: Math.floor(Math.random() * 100)
    }
    await tryCatchWrapper(async () => {
        const novoFuturo = await futurosController.criarFuturo(future);
        const user = await usuarioControllers.buscarUsuarioPorId(req.session.usuario.id);
        await user.addFuturo(novoFuturo);
    },
        'Futuro criado e associado com sucesso',
        'Erro ao criar e associar futuro',
        req
    );
    await associarFuturo(req, res);
}

const associarFuturo = async (req, res) => {
    const { usuario } = req.session;
    const user = await usuarioControllers.buscarUsuarioPorId(usuario.id);
    const futuresUser = await user.getFuturos();
    const futuros = await futurosController.buscarFuturosSemaId(usuario.id, futuresUser.length > 0 ? futuresUser.map(futuro => futuro.id) : []);

    if (futuros.length > 0) {
        const futuroAleatorio = futuros[Math.floor(Math.random() * futuros.length)];
        await user.setFuturos(futuroAleatorio);
        req.flash('success', 'Futuro associado com sucesso');
    }else{
        req.flash('error', 'Não há futuros para associar');
    }
    res.redirect('/users/usuarios');
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
    associarFuturo,
    buscarFuturoPorId,
    atualizarFuturo,
    deletarFuturo
}
