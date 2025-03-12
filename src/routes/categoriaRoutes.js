const express = require('express');
const { criarCategoria, buscarTodasCategorias, excluirCategoria } = require('../services/categoriaService');

const router = express.Router();


router.post('/', async (req, res) => {
    try {
        const { nome } = req.body;
        const novaCategoria = await criarCategoria(nome);
        res.status(201).json(novaCategoria);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


router.get('/', async (req, res) => {
    try {
        const categorias = await buscarTodasCategorias();
        res.json(categorias);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await excluirCategoria(parseInt(id));
        res.json(resultado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
