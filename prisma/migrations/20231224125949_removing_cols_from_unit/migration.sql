/*
  Warnings:

  - You are about to drop the column `defaultDailyRate` on the `Unit` table. All the data in the column will be lost.
  - You are about to drop the column `defaultMonthlyRate` on the `Unit` table. All the data in the column will be lost.
  - You are about to drop the column `Rate` on the `UnitDefaultMonthlyRateHistory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Unit" DROP COLUMN "defaultDailyRate",
DROP COLUMN "defaultMonthlyRate";

-- AlterTable
ALTER TABLE "UnitDefaultDailyRateHistory" ALTER COLUMN "rate" SET DEFAULT 0.0;

-- AlterTable
ALTER TABLE "UnitDefaultMonthlyRateHistory" DROP COLUMN "Rate",
ADD COLUMN     "rate" DOUBLE PRECISION NOT NULL DEFAULT 0.0;
