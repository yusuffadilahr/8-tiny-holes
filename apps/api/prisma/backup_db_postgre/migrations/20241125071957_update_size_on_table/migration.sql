/*
  Warnings:

  - Added the required column `size` to the `sizeChart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sizeChart" ADD COLUMN     "size" TEXT NOT NULL;
