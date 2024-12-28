/*
  Warnings:

  - Added the required column `Seat` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "Seat" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "BookSeat" (
    "id" SERIAL NOT NULL,
    "showId" INTEGER NOT NULL,
    "SeatNumber" TEXT NOT NULL,

    CONSTRAINT "BookSeat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BookSeatToBooking" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_BookSeatToBooking_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_BookSeatToBooking_B_index" ON "_BookSeatToBooking"("B");

-- AddForeignKey
ALTER TABLE "BookSeat" ADD CONSTRAINT "BookSeat_showId_fkey" FOREIGN KEY ("showId") REFERENCES "Show"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookSeatToBooking" ADD CONSTRAINT "_BookSeatToBooking_A_fkey" FOREIGN KEY ("A") REFERENCES "BookSeat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookSeatToBooking" ADD CONSTRAINT "_BookSeatToBooking_B_fkey" FOREIGN KEY ("B") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;
