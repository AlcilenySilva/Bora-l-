const express = require('express');
const { criarEvento, buscarTodosEventos, buscarEventoPorId, atualizarEvento, excluirEvento } = require('../services/eventoService');

const router = express.Router();


router.post('/', async (req, res) => {
    try {
        const { user_id, category_id, nome, descricao, data, localizacao, image_url } = req.body;
        const novoEvento = await criarEvento(user_id, category_id, nome, descricao, data, localizacao, image_url);
        res.status(201).json(novoEvento);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


router.get('/', async (req, res) => {
    try {
        const eventos = await buscarTodosEventos();
        res.json(eventos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const evento = await buscarEventoPorId(parseInt(id));
        res.json(evento);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});


router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const dados = req.body;
        const eventoAtualizado = await atualizarEvento(parseInt(id), dados);
        res.json(eventoAtualizado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await excluirEvento(parseInt(id));
        res.json(resultado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
