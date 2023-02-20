/*
  Warnings:

  - The primary key for the `books` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `books` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "books" DROP CONSTRAINT "books_pkey",
DROP COLUMN "id",
ADD COLUMN     "isbn" SERIAL NOT NULL,
ADD CONSTRAINT "books_pkey" PRIMARY KEY ("isbn");
