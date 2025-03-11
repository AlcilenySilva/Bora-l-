const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function criarEvento(user_id, category_id, nome, descricao, data, localizacao, image_url) {
    try {
        const novoEvento = await prisma.evento.create({
            data: {
                user_id,
                category_id,
                nome,
                descricao,
                data: new Date(data),  
                localizacao,
                image_url
            }
        });
        return novoEvento;
    } catch (error) {
        throw new Error(error.message);
    }
}

async function buscarTodosEventos() {
    try {
        const eventos = await prisma.evento.findMany({
            include: {
                organizador: true,  
                categoria: true      
            }
        });
        return eventos;
    } catch (error) {
        throw new Error(error.message);
    }
}

async function buscarEventoPorId(id) {
    try {
        const evento = await prisma.evento.findUnique({
            where: { id },
            include: {
                organizador: true,  
                categoria: true     
            }
        });

        if (!evento) {
            throw new Error('Evento não encontrado');
        }

        return evento;
    } catch (error) {
        throw new Error(error.message);
    }
}

async function atualizarEvento(id, dados) {
    try {
        const eventoExistente = await prisma.evento.findUnique({
            where: { id }
        });

        if (!eventoExistente) {
            throw new Error('Evento não encontrado');
        }

        const eventoAtualizado = await prisma.evento.update({
            where: { id },
            data: dados
        });

        return eventoAtualizado;
    } catch (error) {
        throw new Error(error.message);
    }
}

async function excluirEvento(id) {
    try {
        const eventoExistente = await prisma.evento.findUnique({
            where: { id }
        });

        if (!eventoExistente) {
            throw new Error('Evento não encontrado');
        }

        await prisma.evento.delete({
            where: { id }
        });

        return { message: 'Evento excluído com sucesso' };
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = { 
    criarEvento, 
    buscarTodosEventos, 
    buscarEventoPorId, 
    atualizarEvento, 
    excluirEvento 
};
