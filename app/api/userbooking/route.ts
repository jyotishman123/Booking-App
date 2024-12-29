import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

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

    const userid = parseInt(decode?.id)

    const userBooking = await prisma.booking.findMany({
         where:{userId:userid},
         include:{
          bookedSeat:true,
          show:true
         },
         orderBy:{
           createdAt:"desc"
         }
    })

    return Response.json({status:"Show received successfully",userBooking})
    
  } catch (error) {
    console.log(error);
    return Response.json({ status: "Server Error" }, { status: 500 });
  }
}
