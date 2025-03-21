
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs'); 
const secretKey = process.env.WT_SECRET || 'default_secret_key';


const gerarToken = (usuario) => {
    return jwt.sign(
        { id: usuario.id, email: usuario.email },  
        secretKey,  
        { expiresIn: '1h' }  
    );
};

const registro = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

      
        const usuarioExistente = await prisma.usuario.findUnique({
            where: { email: email }
        });

        if (usuarioExistente) {
            return res.status(400).json({ error: "Usuário já existe" });
        }

       
        const senhaHash = await bcrypt.hash(senha, 10); 

        
        const novoUsuario = await prisma.usuario.create({
            data: {
                nome: nome,
                email: email,
                senha: senhaHash,  
            }
        });

        
        return res.status(201).json({ message: "Usuário cadastrado com sucesso", usuario: novoUsuario });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao cadastrar usuário" });
    }
};

const login = async (req, res) => {
    try {
        const { email, senha } = req.body;

       
        const usuario = await prisma.usuario.findUnique({
            where: { email: email }
        });

        if (!usuario) {
            return res.status(400).json({ error: "Usuário não encontrado" });
        }

      
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (!senhaCorreta) {
            return res.status(400).json({ error: "Senha incorreta" });
        }

        const token = gerarToken(usuario);  

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
