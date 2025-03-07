const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    const usuarios = await prisma.usuario.findMany();
    console.log('Usuários:', usuarios);
  } catch (error) {
    console.error('Erro ao conectar com o banco:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
