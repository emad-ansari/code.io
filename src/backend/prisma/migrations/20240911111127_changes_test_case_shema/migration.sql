/*
  Warnings:

  - You are about to drop the column `stdin` on the `TestCase` table. All the data in the column will be lost.
  - You are about to drop the column `stdout` on the `TestCase` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TestCase" DROP COLUMN "stdin",
DROP COLUMN "stdout",
ADD COLUMN     "title" TEXT;

-- CreateTable
CREATE TABLE "TestCaseInput" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "testcaseId" TEXT NOT NULL,

    CONSTRAINT "TestCaseInput_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestCaseOutput" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "testcaseId" TEXT NOT NULL,

    CONSTRAINT "TestCaseOutput_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TestCaseInput" ADD CONSTRAINT "TestCaseInput_testcaseId_fkey" FOREIGN KEY ("testcaseId") REFERENCES "TestCase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestCaseOutput" ADD CONSTRAINT "TestCaseOutput_testcaseId_fkey" FOREIGN KEY ("testcaseId") REFERENCES "TestCase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
