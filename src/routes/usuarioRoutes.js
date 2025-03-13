const express = require('express');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();


router.post('/', async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        
        const usuarioExistente = await prisma.usuario.findUnique({ where: { email } });
        if (usuarioExistente) {
            return res.status(400).json({ error: "E-mail já cadastrado!" });
        }

      
        const senhaCriptografada = await bcrypt.hash(senha, 10);

        
        const novoUsuario = await prisma.usuario.create({
            data: { nome, email, senha: senhaCriptografada },
        });

        res.status(201).json(novoUsuario);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


router.get('/', async (req, res) => {
    try {
        const usuarios = await prisma.usuario.findMany();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const dados = req.body;
        const usuarioAtualizado = await editarUsuario(id, dados);
        res.json(usuarioAtualizado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await excluirUsuario(id);
        res.json(resultado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


module.exports = router;
