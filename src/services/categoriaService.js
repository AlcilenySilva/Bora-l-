const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function buscarTodasCategorias() {
    try {
        const categorias = await prisma.categoria.findMany();
        return categorias;
    } catch (error) {
        throw new Error(error.message);
    }
}

async function excluirCategoria(id) {
    try {
        const categoriaExistente = await prisma.categoria.findUnique({
            where: { id }
        });

        if (!categoriaExistente) {
            throw new Error('Categoria não encontrada');
        }

        await prisma.categoria.delete({
            where: { id }
        });

        return { message: 'Categoria excluída com sucesso' };
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = { buscarTodasCategorias, excluirCategoria };
