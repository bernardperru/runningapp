-- CreateTable
CREATE TABLE "WeekGoal" (
    "id" INTEGER NOT NULL,
    "goalDistance" DOUBLE PRECISION NOT NULL,
    "currentDistance" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "WeekGoal_pkey" PRIMARY KEY ("id")
);
