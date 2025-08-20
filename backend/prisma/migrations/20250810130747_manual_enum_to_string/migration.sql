/*
  Warnings:

  - The `status` column on the `ProblemSolved` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `difficulty` on the `Problem` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `status` on the `Submission` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Problem" DROP COLUMN "difficulty",
ADD COLUMN     "difficulty" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ProblemSolved" DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'Todo';

-- AlterTable
ALTER TABLE "Submission" DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'User';

-- DropEnum
DROP TYPE "Difficulty";

-- DropEnum
DROP TYPE "SolvedStatus";

-- DropEnum
DROP TYPE "UserRole";

-- CreateIndex
CREATE INDEX "Problem_difficulty_idx" ON "Problem"("difficulty");
