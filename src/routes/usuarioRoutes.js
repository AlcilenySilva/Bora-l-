const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const express = require('express');
const { criarUsuario, buscarTodosUsuarios, editarUsuario, excluirUsuario } = require('../services/usuarioService');
;
const router = express.Router(); 


router.post('/usuarios', async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        const novoUsuario = await criarUsuario(nome, email, senha);
        res.status(201).json(novoUsuario);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


router.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await buscarTodosUsuarios();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.put('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, email, senha } = req.body;

    try {
        const usuarioAtualizado = await editarUsuario(Number(id), nome, email, senha);
        res.status(200).json(usuarioAtualizado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


router.delete('/usuarios/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const mensagem = await excluirUsuario(Number(id));
        res.status(200).json(mensagem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router; 