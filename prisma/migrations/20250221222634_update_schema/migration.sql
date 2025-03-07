/*
  Warnings:

  - You are about to drop the column `descricao` on the `Categoria` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nome]` on the table `Categoria` will be added. If there are existing duplicate values, this will fail.
  - Made the column `descricao` on table `Evento` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Categoria" DROP COLUMN "descricao";

-- AlterTable
ALTER TABLE "Evento" ALTER COLUMN "descricao" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Categoria_nome_key" ON "Categoria"("nome");
