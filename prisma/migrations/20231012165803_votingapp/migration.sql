/*
  Warnings:

  - You are about to drop the column `title` on the `Submission` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "userId" INTEGER;


-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;