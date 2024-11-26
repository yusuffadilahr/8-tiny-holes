/*
  Warnings:

  - Added the required column `size` to the `cartProduct` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cartProduct" ADD COLUMN     "size" TEXT NOT NULL;
