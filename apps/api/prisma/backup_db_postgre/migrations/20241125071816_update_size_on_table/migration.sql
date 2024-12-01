/*
  Warnings:

  - You are about to drop the column `size` on the `product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "product" DROP COLUMN "size";

-- DropEnum
DROP TYPE "SizeChart";

-- CreateTable
CREATE TABLE "sizeChart" (
    "id" SERIAL NOT NULL,
    "productId" TEXT,

    CONSTRAINT "sizeChart_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "sizeChart" ADD CONSTRAINT "sizeChart_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
