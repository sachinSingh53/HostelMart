/*
  Warnings:

  - You are about to drop the `Add` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Add";

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "photos" TEXT[],
    "location" "locationEnum" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "year_of_purchase" INTEGER,
    "brand_name" TEXT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
