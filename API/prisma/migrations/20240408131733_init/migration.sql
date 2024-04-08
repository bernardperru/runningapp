/*
  Warnings:

  - Added the required column `userId` to the `WeekGoal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WeekGoal" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "WeekGoal" ADD CONSTRAINT "WeekGoal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
