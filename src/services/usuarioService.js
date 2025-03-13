const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = prisma;
async function criarUsuario(nome, email, senha) {
    try {
        const usuarioExistente = await prisma.usuario.findUnique({
            where: { email }
        });

        if (usuarioExistente) {
            throw new Error('Usuário com esse e-mail já existe');
        }

        const novoUsuario = await prisma.usuario.create({
            data: { nome, email, senha }
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

async function editarUsuario(id, nome, email, senha) {
    try {
        const usuarioExistente = await prisma.usuario.findUnique({ where: { id } });

        if (!usuarioExistente) {
            throw new Error('Usuário não encontrado');
        }

        return await prisma.usuario.update({
            where: { id },
            data: { nome, email, senha }
        });
    } catch (error) {
        throw new Error(error.message);
    }
}

async function excluirUsuario(id) {
    try {
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
