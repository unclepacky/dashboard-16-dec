/*
  Warnings:

  - You are about to drop the column `customerId` on the `Unit` table. All the data in the column will be lost.
  - Added the required column `endDate` to the `ClientForm` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Unit" DROP CONSTRAINT "Unit_customerId_fkey";

-- AlterTable
ALTER TABLE "ClientForm" ADD COLUMN     "deposit" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Unit" DROP COLUMN "customerId",
ADD COLUMN     "clientFormId" TEXT;

-- AddForeignKey
ALTER TABLE "Unit" ADD CONSTRAINT "Unit_clientFormId_fkey" FOREIGN KEY ("clientFormId") REFERENCES "ClientForm"("id") ON DELETE SET NULL ON UPDATE CASCADE;
