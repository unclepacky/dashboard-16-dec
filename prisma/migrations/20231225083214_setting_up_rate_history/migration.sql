/*
  Warnings:

  - You are about to drop the `DailyRateHistory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MonthlyRateHistory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DailyRateHistory" DROP CONSTRAINT "DailyRateHistory_currencyId_fkey";

-- DropForeignKey
ALTER TABLE "DailyRateHistory" DROP CONSTRAINT "DailyRateHistory_unitId_fkey";

-- DropForeignKey
ALTER TABLE "MonthlyRateHistory" DROP CONSTRAINT "MonthlyRateHistory_currencyId_fkey";

-- DropForeignKey
ALTER TABLE "MonthlyRateHistory" DROP CONSTRAINT "MonthlyRateHistory_unitId_fkey";

-- DropTable
DROP TABLE "DailyRateHistory";

-- DropTable
DROP TABLE "MonthlyRateHistory";

-- CreateTable
CREATE TABLE "RateHistory" (
    "id" TEXT NOT NULL,
    "newMonthRate" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "newDailyRate" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "recordedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "unitId" TEXT NOT NULL,
    "currencyId" TEXT NOT NULL,

    CONSTRAINT "RateHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RateHistory" ADD CONSTRAINT "RateHistory_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RateHistory" ADD CONSTRAINT "RateHistory_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
