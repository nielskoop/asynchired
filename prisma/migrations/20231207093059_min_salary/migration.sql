-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "minSalary" INTEGER;

-- CreateTable
CREATE TABLE "Search" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT,
    "location" TEXT,
    "company" TEXT,
    "jobDescription" TEXT,
    "salary" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Search_pkey" PRIMARY KEY ("id")
);
