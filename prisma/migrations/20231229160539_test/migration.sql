/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Contract` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Unit` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Contract" DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Unit" DROP COLUMN "updatedAt";
