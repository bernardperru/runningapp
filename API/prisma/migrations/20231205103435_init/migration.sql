/*
  Warnings:

  - You are about to alter the column `average_cadence` on the `Activity` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `average_heartrate` on the `Activity` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - Added the required column `year` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "year" INTEGER NOT NULL,
ALTER COLUMN "average_cadence" SET DATA TYPE INTEGER,
ALTER COLUMN "average_heartrate" SET DATA TYPE INTEGER;

-- CreateTable
CREATE TABLE "Week" (
    "id" INTEGER NOT NULL,
    "week" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "distance" DOUBLE PRECISION NOT NULL,
    "heartrate" INTEGER NOT NULL,
    "cadence" INTEGER NOT NULL,
    "time" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Week_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Week_id_key" ON "Week"("id");
