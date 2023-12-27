-- AlterEnum
ALTER TYPE "ContractType" ADD VALUE 'INACTIVE';

-- AlterTable
ALTER TABLE "Contract" ALTER COLUMN "type" SET DEFAULT 'ACTIVE';
