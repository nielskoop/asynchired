-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "source" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "jobDescription" TEXT NOT NULL,
    "salary" TEXT,
    "datePosted" TIMESTAMP(3),
    "logo" TEXT,
    "url" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "job" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "techStack" TEXT NOT NULL,
    "education" TEXT NOT NULL,
    "profilePicture" TEXT NOT NULL DEFAULT '~/public/blank-profile-pic',
    "likedPosts" INTEGER[],
    "dislikedPosts" INTEGER[],
    "appliedPosts" INTEGER[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
