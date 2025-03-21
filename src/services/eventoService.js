const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const listarEventos = async () => {
    return await prisma.evento.findMany();
};

const criarEvento = async (nome, data, descricao, userId) => {
    return await prisma.evento.create({
        data: {
            nome,
            data,
            descricao,
            userId,
        }
    });
};

const editarEvento = async (id, nome, data, descricao, userId) => {
    const eventoExistente = await prisma.evento.findUnique({
        where: { id: parseInt(id) },
    });

    if (!eventoExistente) {
        throw new Error('Evento não encontrado');
    }

    if (eventoExistente.userId !== userId) {
        throw new Error('Você não tem permissão para editar este evento');
    }

    return await prisma.evento.update({
        where: { id: parseInt(id) },
        data: { nome, data, descricao },
    });
};

const excluirEvento = async (id, userId) => {
    const eventoExistente = await prisma.evento.findUnique({
        where: { id: parseInt(id) },
    });

    if (!eventoExistente) {
        throw new Error('Evento não encontrado');
    }

    if (eventoExistente.userId !== userId) {
        throw new Error('Você não tem permissão para excluir este evento');
    }

    await prisma.evento.delete({
        where: { id: parseInt(id) },
    });
};

module.exports = {
    listarEventos,
    criarEvento,
    editarEvento,
    excluirEvento
};
