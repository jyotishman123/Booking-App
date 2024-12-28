/*
  Warnings:

  - You are about to drop the column `Seat` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the `_BookSeatToBooking` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `bookingId` to the `BookSeat` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_BookSeatToBooking" DROP CONSTRAINT "_BookSeatToBooking_A_fkey";

-- DropForeignKey
ALTER TABLE "_BookSeatToBooking" DROP CONSTRAINT "_BookSeatToBooking_B_fkey";

-- AlterTable
ALTER TABLE "BookSeat" ADD COLUMN     "bookingId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "Seat";

-- DropTable
DROP TABLE "_BookSeatToBooking";

-- AddForeignKey
ALTER TABLE "BookSeat" ADD CONSTRAINT "BookSeat_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
