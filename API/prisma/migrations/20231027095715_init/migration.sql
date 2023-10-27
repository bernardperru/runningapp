-- CreateTable
CREATE TABLE "Activity" (
    "id" SERIAL NOT NULL,
    "distance" DOUBLE PRECISION NOT NULL,
    "elapsed_time" DOUBLE PRECISION NOT NULL,
    "start_date" TEXT NOT NULL,
    "average_cadence" DOUBLE PRECISION NOT NULL,
    "average_heartrate" DOUBLE PRECISION NOT NULL,
    "week" INTEGER NOT NULL,
    "zone" INTEGER NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

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
