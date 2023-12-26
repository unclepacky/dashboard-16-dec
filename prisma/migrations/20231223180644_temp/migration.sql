/*
  Warnings:

  - Made the column `defaultDailyRate` on table `Unit` required. This step will fail if there are existing NULL values in that column.
  - Made the column `defaultMonthlyRate` on table `Unit` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Unit" ALTER COLUMN "defaultDailyRate" SET NOT NULL,
ALTER COLUMN "defaultDailyRate" SET DEFAULT 0,
ALTER COLUMN "defaultMonthlyRate" SET NOT NULL,
ALTER COLUMN "defaultMonthlyRate" SET DEFAULT 0;
