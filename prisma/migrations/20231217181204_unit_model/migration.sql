-- CreateEnum
CREATE TYPE "UnitStatus" AS ENUM ('VACANT', 'OCCUPIED', 'MAINTENANCE');

-- CreateEnum
CREATE TYPE "UnitType" AS ENUM ('STUDIO', 'SUITE');

-- AlterTable
ALTER TABLE "Unit" ADD COLUMN     "status" "UnitStatus" NOT NULL DEFAULT 'VACANT',
ADD COLUMN     "type" "UnitType" NOT NULL DEFAULT 'STUDIO';
