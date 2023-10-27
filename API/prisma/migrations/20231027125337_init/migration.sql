/*
  Warnings:

  - You are about to drop the column `map` on the `Activity` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "map";

-- CreateTable
CREATE TABLE "Map" (
    "id" SERIAL NOT NULL,
    "summary_polyline" TEXT NOT NULL,
    "activityId" INTEGER NOT NULL,

    CONSTRAINT "Map_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Map_activityId_key" ON "Map"("activityId");

-- AddForeignKey
ALTER TABLE "Map" ADD CONSTRAINT "Map_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
