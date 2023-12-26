/*
  Warnings:

  - You are about to drop the `UnitDefaultDailyRateHistory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UnitDefaultMonthlyRateHistory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UnitDefaultDailyRateHistory" DROP CONSTRAINT "UnitDefaultDailyRateHistory_currencyId_fkey";

-- DropForeignKey
ALTER TABLE "UnitDefaultDailyRateHistory" DROP CONSTRAINT "UnitDefaultDailyRateHistory_unitId_fkey";

-- DropForeignKey
ALTER TABLE "UnitDefaultMonthlyRateHistory" DROP CONSTRAINT "UnitDefaultMonthlyRateHistory_currencyId_fkey";

-- DropForeignKey
ALTER TABLE "UnitDefaultMonthlyRateHistory" DROP CONSTRAINT "UnitDefaultMonthlyRateHistory_unitId_fkey";

-- AlterTable
ALTER TABLE "Unit" ADD COLUMN     "dailyRate" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
ADD COLUMN     "monthlyRate" DOUBLE PRECISION NOT NULL DEFAULT 0.0;

-- DropTable
DROP TABLE "UnitDefaultDailyRateHistory";

-- DropTable
DROP TABLE "UnitDefaultMonthlyRateHistory";

-- CreateTable
CREATE TABLE "MonthlyRateHistory" (
    "id" TEXT NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "recordedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "unitId" TEXT NOT NULL,
    "currencyId" TEXT NOT NULL,

    CONSTRAINT "MonthlyRateHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyRateHistory" (
    "id" TEXT NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "recordedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "unitId" TEXT NOT NULL,
    "currencyId" TEXT NOT NULL,

    CONSTRAINT "DailyRateHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MonthlyRateHistory" ADD CONSTRAINT "MonthlyRateHistory_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MonthlyRateHistory" ADD CONSTRAINT "MonthlyRateHistory_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyRateHistory" ADD CONSTRAINT "DailyRateHistory_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyRateHistory" ADD CONSTRAINT "DailyRateHistory_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
