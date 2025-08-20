/*
  Warnings:

  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DefaultCode` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProblemStatus` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TestCase` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TestCaseInput` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TestCaseOutput` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoryId` to the `Problem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dislikes` to the `Problem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `likes` to the `Problem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `submissions` to the `Problem` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `difficulty` on the `Problem` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "SolvedStatus" AS ENUM ('TODO', 'ATTEMPTED', 'SOLVED');

-- CreateEnum
CREATE TYPE "SubmissionStatus" AS ENUM ('ACCEPTED', 'WRONG_ANSWER', 'TIME_LIMIT_EXCEEDED', 'MEMORY_LIMIT_EXCEEDED', 'RUNTIME_ERROR', 'COMPILATION_ERROR');

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

-- AlterTable
ALTER TABLE "Problem" ADD COLUMN     "categoryId" TEXT NOT NULL,
ADD COLUMN     "dislikes" INTEGER NOT NULL,
ADD COLUMN     "likes" INTEGER NOT NULL,
ADD COLUMN     "submissions" INTEGER NOT NULL,
DROP COLUMN "difficulty",
ADD COLUMN     "difficulty" "Difficulty" NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE "Admin";

-- DropTable
DROP TABLE "DefaultCode";

-- DropTable
DROP TABLE "ProblemStatus";

-- DropTable
DROP TABLE "TestCase";

-- DropTable
DROP TABLE "TestCaseInput";

-- DropTable
DROP TABLE "TestCaseOutput";

-- CreateTable
CREATE TABLE "Streak" (
    "id" TEXT NOT NULL,
    "current" INTEGER NOT NULL DEFAULT 0,
    "longest" INTEGER NOT NULL DEFAULT 0,
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Streak_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivityLog" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ActivityLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProblemCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "imgUrl" TEXT NOT NULL,

    CONSTRAINT "ProblemCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoryTag" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "CategoryTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "lable" TEXT NOT NULL,
    "problemId" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TemplateCode" (
    "id" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "full_template" TEXT NOT NULL,
    "boiler_code" TEXT NOT NULL,
    "problemId" TEXT NOT NULL,

    CONSTRAINT "TemplateCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Testcase" (
    "id" TEXT NOT NULL,
    "input" TEXT NOT NULL,
    "output" TEXT NOT NULL,
    "isSample" BOOLEAN NOT NULL,
    "problemId" TEXT NOT NULL,

    CONSTRAINT "Testcase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Progress" (
    "id" TEXT NOT NULL,
    "easySolved" INTEGER NOT NULL DEFAULT 0,
    "mediumSolved" INTEGER NOT NULL DEFAULT 0,
    "hardSolved" INTEGER NOT NULL DEFAULT 0,
    "totalSolved" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoryProgress" (
    "id" TEXT NOT NULL,
    "progressId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "totalSolved" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "CategoryProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProblemSolved" (
    "id" TEXT NOT NULL,
    "status" "SolvedStatus" NOT NULL,
    "userId" TEXT NOT NULL,
    "problemId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "solvedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProblemSolved_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Submission" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "memory" TEXT NOT NULL,
    "status" "SubmissionStatus" NOT NULL,
    "userId" TEXT NOT NULL,
    "problemId" TEXT NOT NULL,
    "languageId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Streak_userId_key" ON "Streak"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ActivityLog_userId_date_key" ON "ActivityLog"("userId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "ProblemCategory_name_key" ON "ProblemCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "TemplateCode_language_key" ON "TemplateCode"("language");

-- CreateIndex
CREATE UNIQUE INDEX "Progress_userId_key" ON "Progress"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CategoryProgress_progressId_categoryId_key" ON "CategoryProgress"("progressId", "categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "ProblemSolved_problemId_userId_key" ON "ProblemSolved"("problemId", "userId");

-- CreateIndex
CREATE INDEX "Problem_categoryId_idx" ON "Problem"("categoryId");

-- CreateIndex
CREATE INDEX "Problem_difficulty_idx" ON "Problem"("difficulty");

-- AddForeignKey
ALTER TABLE "Streak" ADD CONSTRAINT "Streak_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityLog" ADD CONSTRAINT "ActivityLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryTag" ADD CONSTRAINT "CategoryTag_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "ProblemCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Problem" ADD CONSTRAINT "Problem_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "ProblemCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemplateCode" ADD CONSTRAINT "TemplateCode_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Testcase" ADD CONSTRAINT "Testcase_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Progress" ADD CONSTRAINT "Progress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryProgress" ADD CONSTRAINT "CategoryProgress_progressId_fkey" FOREIGN KEY ("progressId") REFERENCES "Progress"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryProgress" ADD CONSTRAINT "CategoryProgress_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "ProblemCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProblemSolved" ADD CONSTRAINT "ProblemSolved_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProblemSolved" ADD CONSTRAINT "ProblemSolved_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProblemSolved" ADD CONSTRAINT "ProblemSolved_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "ProblemCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
