/*
  Warnings:

  - You are about to drop the `WeekGoal` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `goalDistance` to the `Week` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "WeekGoal" DROP CONSTRAINT "WeekGoal_userId_fkey";

-- AlterTable
ALTER TABLE "Week" ADD COLUMN     "goalDistance" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "WeekGoal";
