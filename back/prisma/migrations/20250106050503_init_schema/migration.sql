/*
  Warnings:

  - The primary key for the `consume` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `billets` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "billets" DROP CONSTRAINT "billets_userId_fkey";

-- DropForeignKey
ALTER TABLE "consume" DROP CONSTRAINT "consume_billetId_fkey";

-- DropForeignKey
ALTER TABLE "refresh_token" DROP CONSTRAINT "refresh_token_userId_fkey";

-- DropIndex
DROP INDEX "consume_id_key";

-- DropIndex
DROP INDEX "refresh_token_id_key";

-- DropIndex
DROP INDEX "refresh_token_userId_key";

-- AlterTable
ALTER TABLE "consume" DROP CONSTRAINT "consume_pkey",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "billetId" SET DATA TYPE TEXT,
ADD CONSTRAINT "consume_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "consume_id_seq";

-- AlterTable
ALTER TABLE "refresh_token" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "billets";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Billet" (
    "id" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "clientNumber" TEXT,
    "month" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Billet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "refresh_token" ADD CONSTRAINT "refresh_token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Billet" ADD CONSTRAINT "Billet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consume" ADD CONSTRAINT "consume_billetId_fkey" FOREIGN KEY ("billetId") REFERENCES "Billet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
