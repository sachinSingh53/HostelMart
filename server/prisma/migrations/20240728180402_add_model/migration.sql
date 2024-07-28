-- CreateEnum
CREATE TYPE "locationEnum" AS ENUM ('BH', 'GH', 'ISH');

-- CreateTable
CREATE TABLE "Add" (
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

    CONSTRAINT "Add_pkey" PRIMARY KEY ("id")
);
