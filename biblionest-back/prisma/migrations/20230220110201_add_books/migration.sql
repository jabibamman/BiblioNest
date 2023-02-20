/*
  Warnings:

  - Added the required column `author` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imgUrl` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nbPages` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publishedDate` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `readCount` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `books` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "books" ADD COLUMN     "author" TEXT NOT NULL,
ADD COLUMN     "imgUrl" TEXT NOT NULL,
ADD COLUMN     "nbPages" INTEGER NOT NULL,
ADD COLUMN     "publishedDate" TEXT NOT NULL,
ADD COLUMN     "readCount" INTEGER NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL;
