/*
  Warnings:

  - You are about to drop the column `clientFormId` on the `Unit` table. All the data in the column will be lost.
  - You are about to drop the `ClientForm` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ContractType" AS ENUM ('INQUIRY', 'ACTIVE', 'RELEASED', 'RESERVED');

-- DropForeignKey
ALTER TABLE "ClientForm" DROP CONSTRAINT "ClientForm_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Unit" DROP CONSTRAINT "Unit_clientFormId_fkey";

-- AlterTable
ALTER TABLE "Unit" DROP COLUMN "clientFormId";

-- DropTable
DROP TABLE "ClientForm";

-- DropEnum
DROP TYPE "FormType";

-- CreateTable
CREATE TABLE "Contract" (
    "id" TEXT NOT NULL,
    "type" "ContractType" NOT NULL DEFAULT 'INQUIRY',
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3) NOT NULL,
    "deposit" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "unitId" TEXT NOT NULL,
    "customerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Contract_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
