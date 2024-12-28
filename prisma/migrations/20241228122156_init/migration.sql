-- CreateTable
CREATE TABLE "Show" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "Time" TEXT NOT NULL,
    "Address" TEXT NOT NULL,
    "ImageUrl" TEXT NOT NULL,

    CONSTRAINT "Show_pkey" PRIMARY KEY ("id")
);
