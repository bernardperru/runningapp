/*
  Warnings:

  - You are about to drop the column `week` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `Activity` table. All the data in the column will be lost.
  - Added the required column `weekId` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "week",
DROP COLUMN "year",
ADD COLUMN     "weekId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_weekId_fkey" FOREIGN KEY ("weekId") REFERENCES "Week"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
