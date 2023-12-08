-- DropForeignKey
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_weekId_fkey";

-- AlterTable
ALTER TABLE "Activity" ALTER COLUMN "weekId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_weekId_fkey" FOREIGN KEY ("weekId") REFERENCES "Week"("id") ON DELETE SET NULL ON UPDATE CASCADE;
