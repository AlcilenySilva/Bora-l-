const express = require('express');
const { criarUsuario, buscarTodosUsuarios, editarUsuario, excluirUsuario } = require('../services/usuarioService');

const router = express.Router(); 


router.post('/cadastro', async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        const usuarioExistente = await prisma.usuario.findUnique({ where: { email } });
        if (usuarioExistente) {
            return res.status(400).json({ error: 'E-mail já cadastrado.' });
        }

        
        const senhaHash = await bcrypt.hash(senha, 10);

        const novoUsuario = await prisma.usuario.create({
            data: { nome, email, senha: senhaHash },
        });

        res.status(201).json({ id: novoUsuario.id, nome: novoUsuario.nome, email: novoUsuario.email });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
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