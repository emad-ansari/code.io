/*
  Warnings:

  - You are about to drop the `ProblemStaus` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProblemStaus" DROP CONSTRAINT "ProblemStaus_problemId_fkey";

-- DropForeignKey
ALTER TABLE "ProblemStaus" DROP CONSTRAINT "ProblemStaus_userId_fkey";

-- DropTable
DROP TABLE "ProblemStaus";

-- CreateTable
CREATE TABLE "ProblemStatus" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'todo',
    "userId" TEXT NOT NULL,
    "problemId" TEXT NOT NULL,

    CONSTRAINT "ProblemStatus_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProblemStatus_problemId_userId_key" ON "ProblemStatus"("problemId", "userId");

-- AddForeignKey
ALTER TABLE "ProblemStatus" ADD CONSTRAINT "ProblemStatus_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProblemStatus" ADD CONSTRAINT "ProblemStatus_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
