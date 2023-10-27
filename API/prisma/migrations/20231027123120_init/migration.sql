/*
  Warnings:

  - You are about to drop the `Map` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `map` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Map" DROP CONSTRAINT "Map_activityId_fkey";

-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "map" TEXT NOT NULL;

-- DropTable
DROP TABLE "Map";
