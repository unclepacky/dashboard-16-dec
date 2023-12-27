-- CreateEnum
CREATE TYPE "FormType" AS ENUM ('INQUIRY', 'ACTIVE', 'RELEASED', 'RESERVED');

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Unit" ADD COLUMN     "customerId" TEXT;

-- DropEnum
DROP TYPE "ContractStatus";

-- CreateTable
CREATE TABLE "ClientForm" (
    "id" TEXT NOT NULL,
    "type" "FormType" NOT NULL DEFAULT 'INQUIRY',
    "customerId" TEXT,

    CONSTRAINT "ClientForm_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Unit" ADD CONSTRAINT "Unit_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientForm" ADD CONSTRAINT "ClientForm_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
