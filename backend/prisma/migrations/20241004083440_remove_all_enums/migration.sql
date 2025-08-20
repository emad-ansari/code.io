/*
  Warnings:

  - The `difficulty` column on the `Problem` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `ProblemStatus` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Problem" DROP COLUMN "difficulty",
ADD COLUMN     "difficulty" TEXT NOT NULL DEFAULT 'Easy';

-- AlterTable
ALTER TABLE "ProblemStatus" DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'Todo';

-- DropEnum
DROP TYPE "Difficulty";

-- DropEnum
DROP TYPE "Role";

-- DropEnum
DROP TYPE "Status";
