/*
  Warnings:

  - You are about to alter the column `quantity` on the `consume` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- DropForeignKey
ALTER TABLE "consume" DROP CONSTRAINT "consume_billetId_fkey";

-- AlterTable
ALTER TABLE "consume" ALTER COLUMN "quantity" DROP NOT NULL,
ALTER COLUMN "quantity" SET DATA TYPE INTEGER,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "consume" ADD CONSTRAINT "consume_billetId_fkey" FOREIGN KEY ("billetId") REFERENCES "Billet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
