const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const listarEventos = async (req, res) => {
    try {
        const eventos = await prisma.evento.findMany();
        return res.status(200).json(eventos);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao listar eventos' });
    }
};

const criarEvento = async (req, res) => {
    const { nome, data, descricao } = req.body;
    try {
        const novoEvento = await prisma.evento.create({
            data: {
                nome,
                data,
                descricao,
                userId: req.user.id,  
            }
        });
        return res.status(201).json(novoEvento);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao criar evento' });
    }
};

const editarEvento = async (req, res) => {
    const { id } = req.params;
    const { nome, data, descricao } = req.body;
    try {
        const eventoExistente = await prisma.evento.findUnique({
            where: { id: parseInt(id) },
        });

        if (!eventoExistente) {
            return res.status(404).json({ error: 'Evento não encontrado' });
        }

        if (eventoExistente.userId !== req.user.id) {
            return res.status(403).json({ error: 'Você não tem permissão para editar este evento' });
        }

        const eventoEditado = await prisma.evento.update({
            where: { id: parseInt(id) },
            data: { nome, data, descricao },
        });

        return res.status(200).json(eventoEditado);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao editar evento' });
    }
};

const excluirEvento = async (req, res) => {
    const { id } = req.params;
    try {
        const eventoExistente = await prisma.evento.findUnique({
            where: { id: parseInt(id) },
        });

        if (!eventoExistente) {
            return res.status(404).json({ error: 'Evento não encontrado' });
        }

        if (eventoExistente.userId !== req.user.id) {
            return res.status(403).json({ error: 'Você não tem permissão para excluir este evento' });
        }

        await prisma.evento.delete({
            where: { id: parseInt(id) },
        });

        return res.status(200).json({ message: 'Evento excluído com sucesso' });
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao excluir evento' });
    }
};

module.exports = {
    listarEventos,
    criarEvento,
    editarEvento,
    excluirEvento
};
