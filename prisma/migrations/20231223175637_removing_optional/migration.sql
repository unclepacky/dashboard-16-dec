/*
  Warnings:

  - Made the column `currencyId` on table `UnitDefaultDailyRateHistory` required. This step will fail if there are existing NULL values in that column.
  - Made the column `currencyId` on table `UnitDefaultMonthlyRateHistory` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "UnitDefaultDailyRateHistory" DROP CONSTRAINT "UnitDefaultDailyRateHistory_currencyId_fkey";

-- DropForeignKey
ALTER TABLE "UnitDefaultMonthlyRateHistory" DROP CONSTRAINT "UnitDefaultMonthlyRateHistory_currencyId_fkey";

-- AlterTable
ALTER TABLE "UnitDefaultDailyRateHistory" ALTER COLUMN "currencyId" SET NOT NULL;

-- AlterTable
ALTER TABLE "UnitDefaultMonthlyRateHistory" ALTER COLUMN "currencyId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "UnitDefaultMonthlyRateHistory" ADD CONSTRAINT "UnitDefaultMonthlyRateHistory_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnitDefaultDailyRateHistory" ADD CONSTRAINT "UnitDefaultDailyRateHistory_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
