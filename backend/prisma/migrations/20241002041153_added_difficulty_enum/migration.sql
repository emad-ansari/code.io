/*
  Warnings:

  - The `difficulty` column on the `Problem` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- AlterTable
ALTER TABLE "Problem" DROP COLUMN "difficulty",
ADD COLUMN     "difficulty" "Difficulty" NOT NULL DEFAULT 'EASY';
