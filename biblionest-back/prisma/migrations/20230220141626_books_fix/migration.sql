/*
  Warnings:

  - Added the required column `userId` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "userId" INTEGER NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "readCount" DROP NOT NULL,
ALTER COLUMN "publishedDate" DROP NOT NULL,
ALTER COLUMN "imgUrl" DROP NOT NULL;
