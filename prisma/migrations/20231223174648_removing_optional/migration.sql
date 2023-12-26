/*
  Warnings:

  - Made the column `currencyId` on table `Unit` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Unit" DROP CONSTRAINT "Unit_currencyId_fkey";

-- AlterTable
ALTER TABLE "Unit" ALTER COLUMN "currencyId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Unit" ADD CONSTRAINT "Unit_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
