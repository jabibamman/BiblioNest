/*
  Warnings:

  - Added the required column `isbn` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "isbn" TEXT NOT NULL;
