/*
  Warnings:

  - You are about to drop the column `Address` on the `Show` table. All the data in the column will be lost.
  - You are about to drop the column `Description` on the `Show` table. All the data in the column will be lost.
  - You are about to drop the column `ImageUrl` on the `Show` table. All the data in the column will be lost.
  - You are about to drop the column `Time` on the `Show` table. All the data in the column will be lost.
  - Added the required column `address` to the `Show` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Show` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `Show` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Show` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Show" DROP COLUMN "Address",
DROP COLUMN "Description",
DROP COLUMN "ImageUrl",
DROP COLUMN "Time",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "imageUrl" TEXT NOT NULL,
ADD COLUMN     "time" TEXT NOT NULL;
