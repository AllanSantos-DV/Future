const usuarioControllers = require('../controllers/usuarioController');
const tryCatchWrapper = require('./tryCatch');

// funções auxiliares
const validarSenha = async (id, senha) => {
    if (!senha || senha.length === 0) {
        return false;
    }
    const usuario = await usuarioControllers.buscarUsuarioPorId(id);
    return usuarioControllers.validarSenha(senha, usuario.senha);
}

const userAtual = async (id) => {
    const user = await usuarioControllers.buscarUsuarioPorId(id);
    return { id: user.id, nomeAtual: user.nome, emailAtual: user.email };
}

// funções render
const home = (req, res) => {
    res.render('home');
}

const login = (req, res) => {
    res.render('login');
}

const cadastro = (req, res) => {
    res.render('cadastro');
}

const userlogadoinicio = async (req, res) => {
    const { id } = req.session.usuario;
    const user = await userAtual(id);
    res.render('userLogado', { usuario: user });
}

// funções de controle
const criarUsuario = async (req, res) => {
    const { body } = req;
    await tryCatchWrapper(async () => {
        await usuarioControllers.criarUsuario(body);
    },
        'Usuário criado com sucesso',
        'Erro ao criar usuário',
        req
    );
    res.redirect('/users/login');
}

const usuarioExiste = async (req, res, next) => {
    const { email } = req.body;
    const usuario = await usuarioControllers.buscarUsuarioPorEmail(email);
    if (usuario) {
        req.flash('error', 'Usuário já existe');
        return res.redirect('/users/login');
    }
    next();
}

const loginUsuario = async (req, res) => {
    const { email, senha } = req.body;
    const usuario = await usuarioControllers.buscarUsuarioPorEmail(email);
    if (!usuario) {
        req.flash('error', 'Usuário não encontrado');
        return res.redirect('/users/login');
    }
    if (!await validarSenha(usuario.id, senha)) {
        req.flash('error', 'Senha inválida');
        return res.redirect('/users/login');
    }
    req.session.usuario = usuario;
    res.redirect('usuarios');
}

const userLogado = (req, res, next) => {
    if (req.session.usuario) {
        return next();
    }
    req.flash('error', 'Usuário não logado');
    res.redirect('/users/login');
}

const logout = (req, res) => {
    req.session.destroy();
    res.redirect('/users/login');
}

const atualizarUsuario = async (req, res) => {
    const { id } = req.params;
    const { novoNome, senhaAtual, novaSenha } = req.body;
    if (!await validarSenha(id, senhaAtual)) {
        req.flash('error', 'Senha inválida');
        return res.redirect('/users/usuarios');
    }
    const user = {
        nome: novoNome,
        senha: (!novaSenha || novaSenha.length === 0) ? senhaAtual : novaSenha,
    };
    await tryCatchWrapper(async () => {
        await usuarioControllers.atualizarUsuario(id, user);
    },
        'Usuário atualizado com sucesso',
        'Erro ao atualizar usuário',
        req
    );
    res.redirect('/users/usuarios');
}

const deletarUsuario = async (req, res) => {
    const { id } = req.params;
    await tryCatchWrapper(async () => {
        await usuarioControllers.deletarUsuario(id);
    },
        'Usuário deletado com sucesso',
        'Erro ao deletar usuário',
        req
    );
    res.redirect('/usuarios');
}

module.exports = {
    home,
    login,
    cadastro,
    userlogadoinicio,
    criarUsuario,
    usuarioExiste,
    loginUsuario,
    userLogado,
    logout,
    atualizarUsuario,
    deletarUsuario
}
