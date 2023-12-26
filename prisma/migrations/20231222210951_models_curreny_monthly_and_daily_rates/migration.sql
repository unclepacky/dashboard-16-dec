-- AlterTable
ALTER TABLE "Unit" ADD COLUMN     "currenyId" TEXT,
ADD COLUMN     "defaultDailyRate" INTEGER,
ADD COLUMN     "defaultMonthlyRate" INTEGER;

-- CreateTable
CREATE TABLE "Currency" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "Currency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CurrencyConversionRate" (
    "id" TEXT NOT NULL,
    "currencyId" TEXT NOT NULL,
    "rate" INTEGER NOT NULL,
    "recordedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CurrencyConversionRate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnitDefaultMonthlyRateHistory" (
    "id" TEXT NOT NULL,
    "Rate" INTEGER NOT NULL,
    "recordedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "unitId" TEXT NOT NULL,
    "currencyId" TEXT,

    CONSTRAINT "UnitDefaultMonthlyRateHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnitDefaultDailyRateHistory" (
    "id" TEXT NOT NULL,
    "rate" INTEGER NOT NULL,
    "recordedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "unitId" TEXT NOT NULL,
    "currencyId" TEXT,

    CONSTRAINT "UnitDefaultDailyRateHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Currency_code_key" ON "Currency"("code");

-- AddForeignKey
ALTER TABLE "CurrencyConversionRate" ADD CONSTRAINT "CurrencyConversionRate_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Unit" ADD CONSTRAINT "Unit_currenyId_fkey" FOREIGN KEY ("currenyId") REFERENCES "Currency"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnitDefaultMonthlyRateHistory" ADD CONSTRAINT "UnitDefaultMonthlyRateHistory_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnitDefaultMonthlyRateHistory" ADD CONSTRAINT "UnitDefaultMonthlyRateHistory_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnitDefaultDailyRateHistory" ADD CONSTRAINT "UnitDefaultDailyRateHistory_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnitDefaultDailyRateHistory" ADD CONSTRAINT "UnitDefaultDailyRateHistory_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE SET NULL ON UPDATE CASCADE;
