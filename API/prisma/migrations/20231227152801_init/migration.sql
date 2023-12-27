/*
  Warnings:

  - Added the required column `activityCount` to the `Week` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Week" ADD COLUMN     "activityCount" INTEGER NOT NULL;
