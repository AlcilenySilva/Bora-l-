// src/controllers/authController.js
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs'); 
const secretKey = process.env.WT_SECRET || 'default_secret_key';

// Função para gerar o token JWT
const gerarToken = (usuario) => {
    return jwt.sign(
        { id: usuario.id, email: usuario.email },  // Payload com os dados do usuário
        secretKey,  // Chave secreta para assinar o token
        { expiresIn: '1h' }  // Expiração do token (1 hora)
    );
};

const registro = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        // 1. Verifica se o usuário já existe
        const usuarioExistente = await prisma.usuario.findUnique({
            where: { email: email }
        });

        if (usuarioExistente) {
            return res.status(400).json({ error: "Usuário já existe" });
        }

        // 2. Gera o hash da senha
        const senhaHash = await bcrypt.hash(senha, 10);  // 10 é o número de salt rounds

        // 3. Cria o novo usuário
        const novoUsuario = await prisma.usuario.create({
            data: {
                nome: nome,
                email: email,
                senha: senhaHash,  // Salva a senha hashada
            }
        });

        // 4. Retorna a resposta com o usuário cadastrado (ou informações relevantes)
        return res.status(201).json({ message: "Usuário cadastrado com sucesso", usuario: novoUsuario });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao cadastrar usuário" });
    }
};

const login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        // 1. Verifica se o usuário existe no banco de dados
        const usuario = await prisma.usuario.findUnique({
            where: { email: email }
        });

        if (!usuario) {
            return res.status(400).json({ error: "Usuário não encontrado" });
        }

        // 2. Compara a senha fornecida com o hash da senha armazenado
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (!senhaCorreta) {
            return res.status(400).json({ error: "Senha incorreta" });
        }

        // 3. Caso a senha esteja correta, continue com o login (geração de JWT)
        const token = gerarToken(usuario);  // Gerar o token JWT

        return res.status(200).json({ message: "Login bem-sucedido", token: token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro no servidor" });
    }
};

module.exports = {
    registro,
    login
};
