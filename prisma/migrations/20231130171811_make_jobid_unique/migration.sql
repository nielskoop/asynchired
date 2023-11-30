/*
  Warnings:

  - A unique constraint covering the columns `[jobId]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Post_jobId_key" ON "Post"("jobId");
