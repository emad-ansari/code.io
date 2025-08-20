/*
  Warnings:

  - A unique constraint covering the columns `[testcaseId]` on the table `TestCaseOutput` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TestCaseOutput_testcaseId_key" ON "TestCaseOutput"("testcaseId");
