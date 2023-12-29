-- DropForeignKey
ALTER TABLE "RateHistory" DROP CONSTRAINT "RateHistory_unitId_fkey";

-- AddForeignKey
ALTER TABLE "RateHistory" ADD CONSTRAINT "RateHistory_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE CASCADE ON UPDATE CASCADE;
