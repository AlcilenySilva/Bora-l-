const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function criarUsuario(nome, email, senha) {
    try {
       
        const usuarioExistente = await prisma.usuario.findUnique({ where: { email } });
        if (usuarioExistente) {
            throw new Error('Usuário com esse e-mail já existe');
        }

       
        const senhaCriptografada = await bcrypt.hash(senha, 10);

        
        const novoUsuario = await prisma.usuario.create({
            data: { nome, email, senha: senhaCriptografada }
        });

        return novoUsuario;
    } catch (error) {
        throw new Error(error.message);
    }
}

async function buscarTodosUsuarios() {
    try {
        return await prisma.usuario.findMany();
    } catch (error) {
        throw new Error(error.message);
    }
}

async function editarUsuario(id, dados) {
    try {
        id = Number(id);

        const usuarioExistente = await prisma.usuario.findUnique({ where: { id } });
        if (!usuarioExistente) {
            throw new Error('Usuário não encontrado');
        }

        if (dados.email && dados.email !== usuarioExistente.email) {
            const emailExistente = await prisma.usuario.findUnique({ where: { email: dados.email } });
            if (emailExistente) {
                throw new Error('E-mail já está em uso por outro usuário');
            }
        }

        if (dados.senha) {
            dados.senha = await bcrypt.hash(dados.senha, 10);
        }

        return await prisma.usuario.update({
            where: { id },
            data: dados
        });
    } catch (error) {
        throw new Error(error.message);
    }
}

async function excluirUsuario(id) {
    try {
        id = Number(id);

        const usuarioExistente = await prisma.usuario.findUnique({ where: { id } });
        if (!usuarioExistente) {
            throw new Error('Usuário não encontrado');
        }

        await prisma.usuario.delete({ where: { id } });

        return { message: 'Usuário excluído com sucesso' };
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = { criarUsuario, buscarTodosUsuarios, editarUsuario, excluirUsuario };
