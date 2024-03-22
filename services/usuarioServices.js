const usuarioControllers = require('../controllers/usuarioController');

const criarUsuario = async (req, res) => {

    const { body } = req;
    try {
        await usuarioControllers.criarUsuario(body);
        req.flash('success', 'Usuário criado com sucesso');
    } catch (error) {
        req.flash('error', 'Erro ao criar usuário');
    }
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
    const senhaValida = usuarioControllers.validarSenha(senha, usuario.senha);
    if (!senhaValida) {
        req.flash('error', 'Senha inválida');
        return res.redirect('/users/login');
    }
    req.session.usuario = usuario;
    res.redirect('usuarios');
}

const home = (req, res) => {
    res.render('home');
}

const login = (req, res) => {
    res.render('login');
}

const cadastro = (req, res) => {
    res.render('cadastro');
}

const userLogado = (req, res, next) => {
    if (req.session.usuario) {
        return next();
    }
    req.flash('error', 'Usuário não logado');
    res.redirect('/users/login');
}

const userlogadoinicio = (req, res) => {
    res.render('userLogado', { usuario: req.session.usuario });
}

const logout = (req, res) => {
    req.session.destroy();
    res.redirect('/users/login');
}


const listarUsuarios = async (req, res) => {
    try {
        const usuarios = await usuarioControllers.listarUsuarios();
        res.render('usuarios', { usuarios });
    } catch (error) {
        req.flash('error', 'Erro ao listar usuários');
        res.redirect('/usuarios');
    }
}

const buscarUsuarioPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await usuarioControllers.buscarUsuarioPorId(id);
        res.render('usuario', { usuario });
    } catch (error) {
        req.flash('error', 'Erro ao buscar usuário');
        res.redirect('/usuarios');
    }
}

const atualizarUsuario = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
        await usuarioControllers.atualizarUsuario(id, body);
        req.flash('success', 'Usuário atualizado com sucesso');
    } catch (error) {
        req.flash('error', 'Erro ao atualizar usuário');
    }
    res.redirect('/usuarios');
}

const deletarUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        await usuarioControllers.deletarUsuario(id);
        req.flash('success', 'Usuário deletado com sucesso');
    } catch (error) {
        req.flash('error', 'Erro ao deletar usuário');
    }
    res.redirect('/usuarios');
}

module.exports = {
    home,
    login,
    cadastro,
    userLogado,
    logout,
    userlogadoinicio,
    loginUsuario,
    criarUsuario,
    usuarioExiste,
    listarUsuarios,
    buscarUsuarioPorId,
    atualizarUsuario,
    deletarUsuario
}

