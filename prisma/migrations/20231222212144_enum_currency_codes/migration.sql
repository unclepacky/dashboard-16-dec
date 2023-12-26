/*
  Warnings:

  - Changed the type of `code` on the `Currency` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "CurrencyType" AS ENUM ('USD', 'LBP', 'EUR');

-- AlterTable
ALTER TABLE "Currency" DROP COLUMN "code",
ADD COLUMN     "code" "CurrencyType" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Currency_code_key" ON "Currency"("code");
