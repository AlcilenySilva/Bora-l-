
const express = require('express');
const router = express.Router();
const eventoController = require('../controllers/eventoController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', eventoController.listarEventos);

router.post('/', authMiddleware, eventoController.criarEvento);


router.put('/:id', authMiddleware, eventoController.editarEvento); 
router.delete('/:id', authMiddleware, eventoController.excluirEvento);  

module.exports = router;
