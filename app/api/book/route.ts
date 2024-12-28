import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  const data = await req.json();

  try {
    if (!token?.value) {
      return Response.json(
        {
          message: "User is not logged int",
        },
        {
          status: 401,
        }
      );
    }

    const secret = process.env.JWT_SECRET;

    const decode = jwt.verify(token?.value, secret as string) as JwtPayload;

    const userid = parseInt(decode?.id);
    const showid = parseInt(data?.id);

    console.log(decode)

    const existingBooking = await prisma.booking.findFirst({
      where: {
        userId: userid,
        showId: showid,
      },
    });

    if (existingBooking) {
      return Response.json(
        {
          message: "You have already booked this show.",
        },
        {
          status: 400,
        }
      );
    }

    console.log(data?.seats)

    const createBooking = await prisma.booking.create({
      data: {
        userId: userid,
        showId: showid,
      },
    });

    console.log(createBooking)

    const bookSeat = data?.seats.map((seat:number)=>{
       return {showId:showid,SeatNumber:seat,bookingId:createBooking?.id}
    })

    console.log(bookSeat)

    const updateSeats = await prisma.bookSeat.createMany({
        data:bookSeat
    });

    return Response.json(
      { status: "Show Booked Successfully" },
      { status: 200 }
    );
  } catch (error:any) {
    console.log(error);
    return Response.json({ status: "Server Error" }, { status: 500 });
  }
}
