-- CreateEnum
CREATE TYPE "CustomerStatus" AS ENUM ('POTENTIAL_TENANT', 'TENANT', 'EX_TENANT');

-- CreateEnum
CREATE TYPE "ContractStatus" AS ENUM ('INQUIRY', 'ACTIVE', 'RELEASED');

-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccessPrivilege" (
    "id" TEXT NOT NULL,
    "privilege" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,

    CONSTRAINT "AccessPrivilege_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" "CustomerStatus" NOT NULL DEFAULT 'POTENTIAL_TENANT',

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_name_key" ON "Employee"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_name_key" ON "Customer"("name");

-- AddForeignKey
ALTER TABLE "AccessPrivilege" ADD CONSTRAINT "AccessPrivilege_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
