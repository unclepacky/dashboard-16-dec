-- CreateEnum
CREATE TYPE "Block" AS ENUM ('A', 'B', 'C', 'D');

-- AlterTable
ALTER TABLE "Unit" ADD COLUMN     "block" "Block" NOT NULL DEFAULT 'A';
