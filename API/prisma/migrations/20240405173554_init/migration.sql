/*
  Warnings:

  - Changed the type of `average_pace` on the `Activity` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "average_pace",
ADD COLUMN     "average_pace" DOUBLE PRECISION NOT NULL;
