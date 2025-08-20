/*
  Warnings:

  - The values [EASY,MEDIUM,HARD] on the enum `Difficulty` will be removed. If these variants are still used in the database, this will fail.
  - The values [TODO,ATTEMPTED,SOLVED] on the enum `SolvedStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `output` on the `Testcase` table. All the data in the column will be lost.
  - You are about to drop the `CategoryTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `expected_output` to the `Testcase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Difficulty_new" AS ENUM ('Easy', 'Medium', 'Hard');
ALTER TABLE "Problem" ALTER COLUMN "difficulty" TYPE "Difficulty_new" USING ("difficulty"::text::"Difficulty_new");
ALTER TYPE "Difficulty" RENAME TO "Difficulty_old";
ALTER TYPE "Difficulty_new" RENAME TO "Difficulty";
DROP TYPE "Difficulty_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "SolvedStatus_new" AS ENUM ('Todo', 'Attempted', 'Solved');
ALTER TABLE "ProblemSolved" ALTER COLUMN "status" TYPE "SolvedStatus_new" USING ("status"::text::"SolvedStatus_new");
ALTER TYPE "SolvedStatus" RENAME TO "SolvedStatus_old";
ALTER TYPE "SolvedStatus_new" RENAME TO "SolvedStatus";
DROP TYPE "SolvedStatus_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "CategoryTag" DROP CONSTRAINT "CategoryTag_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_problemId_fkey";

-- AlterTable
CREATE SEQUENCE problem_problemno_seq;
ALTER TABLE "Problem" ADD COLUMN     "tags" TEXT[],
ALTER COLUMN "problemNo" SET DEFAULT nextval('problem_problemno_seq'),
ALTER COLUMN "dislikes" SET DEFAULT 0,
ALTER COLUMN "likes" SET DEFAULT 0,
ALTER COLUMN "submissions" SET DEFAULT 0;
ALTER SEQUENCE problem_problemno_seq OWNED BY "Problem"."problemNo";

-- AlterTable
ALTER TABLE "ProblemCategory" ADD COLUMN     "tags" TEXT[];

-- AlterTable
ALTER TABLE "ProblemSolved" ALTER COLUMN "status" SET DEFAULT 'Todo';

-- AlterTable
ALTER TABLE "Testcase" DROP COLUMN "output",
ADD COLUMN     "expected_output" TEXT NOT NULL;

-- DropTable
DROP TABLE "CategoryTag";

-- DropTable
DROP TABLE "Tag";

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
