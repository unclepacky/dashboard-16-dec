/*
  Warnings:

  - You are about to drop the column `currenyId` on the `Unit` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Unit" DROP CONSTRAINT "Unit_currenyId_fkey";

-- AlterTable
ALTER TABLE "Unit" DROP COLUMN "currenyId",
ADD COLUMN     "currencyId" TEXT;

-- AddForeignKey
ALTER TABLE "Unit" ADD CONSTRAINT "Unit_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE SET NULL ON UPDATE CASCADE;
