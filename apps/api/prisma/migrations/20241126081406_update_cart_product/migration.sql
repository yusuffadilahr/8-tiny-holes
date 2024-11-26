-- CreateTable
CREATE TABLE "cartProduct" (
    "id" SERIAL NOT NULL,
    "productId" TEXT NOT NULL,
    "userId" TEXT,
    "qty" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "cartProduct_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cartProduct" ADD CONSTRAINT "cartProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cartProduct" ADD CONSTRAINT "cartProduct_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
