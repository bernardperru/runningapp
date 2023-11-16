/*
  Warnings:

  - Added the required column `average_pace` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "average_pace" DOUBLE PRECISION NOT NULL;
