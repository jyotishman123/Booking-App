/*
  Warnings:

  - Changed the type of `SeatNumber` on the `BookSeat` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "BookSeat" DROP COLUMN "SeatNumber",
ADD COLUMN     "SeatNumber" INTEGER NOT NULL;
