/*
  Warnings:

  - A unique constraint covering the columns `[problemNo]` on the table `Problem` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `problemNo` to the `Problem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Problem" ADD COLUMN     "problemNo" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Problem_problemNo_key" ON "Problem"("problemNo");
