const router = require('express').Router();

const futuroService = require('../services/futuroServices');
const usuarioService = require('../services/usuarioServices');

router.get('/', usuarioService.userLogado , futuroService.associarFuturo);
router.post('/criar', futuroService.criarFuturo);




module.exports = router;