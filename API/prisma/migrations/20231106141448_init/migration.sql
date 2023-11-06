-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "refresh_token" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "distance" DOUBLE PRECISION NOT NULL,
    "elapsed_time" DOUBLE PRECISION NOT NULL,
    "start_date" TEXT NOT NULL,
    "summary_polyline" TEXT NOT NULL,
    "average_cadence" DOUBLE PRECISION NOT NULL,
    "average_heartrate" DOUBLE PRECISION NOT NULL,
    "week" INTEGER NOT NULL,
    "zone" INTEGER NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Activity_userId_key" ON "Activity"("userId");

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
