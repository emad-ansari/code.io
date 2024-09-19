-- DropForeignKey
ALTER TABLE "DefaultCode" DROP CONSTRAINT "DefaultCode_problemId_fkey";

-- DropForeignKey
ALTER TABLE "Problem" DROP CONSTRAINT "Problem_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "ProblemStatus" DROP CONSTRAINT "ProblemStatus_problemId_fkey";

-- DropForeignKey
ALTER TABLE "ProblemStatus" DROP CONSTRAINT "ProblemStatus_userId_fkey";

-- DropForeignKey
ALTER TABLE "TestCase" DROP CONSTRAINT "TestCase_problemId_fkey";

-- DropForeignKey
ALTER TABLE "TestCaseInput" DROP CONSTRAINT "TestCaseInput_testcaseId_fkey";

-- DropForeignKey
ALTER TABLE "TestCaseOutput" DROP CONSTRAINT "TestCaseOutput_testcaseId_fkey";

-- AddForeignKey
ALTER TABLE "Problem" ADD CONSTRAINT "Problem_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DefaultCode" ADD CONSTRAINT "DefaultCode_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProblemStatus" ADD CONSTRAINT "ProblemStatus_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProblemStatus" ADD CONSTRAINT "ProblemStatus_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestCase" ADD CONSTRAINT "TestCase_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestCaseInput" ADD CONSTRAINT "TestCaseInput_testcaseId_fkey" FOREIGN KEY ("testcaseId") REFERENCES "TestCase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestCaseOutput" ADD CONSTRAINT "TestCaseOutput_testcaseId_fkey" FOREIGN KEY ("testcaseId") REFERENCES "TestCase"("id") ON DELETE CASCADE ON UPDATE CASCADE;
