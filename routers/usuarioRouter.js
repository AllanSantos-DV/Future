const router = require('express').Router();
const usuarioServices = require('../services/usuarioServices');



router.get('/', usuarioServices.home);
router.get('/login', usuarioServices.login);
router.get('/cadastro', usuarioServices.cadastro);
router.get('/usuarios', usuarioServices.userLogado, usuarioServices.userlogadoinicio);
router.get('/logout', usuarioServices.logout);

router.post('/cadastro', usuarioServices.usuarioExiste, usuarioServices.criarUsuario);
router.post('/login', usuarioServices.loginUsuario);









module.exports = router;
