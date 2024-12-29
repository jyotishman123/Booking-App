import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token");

  try {
    if (!token?.value) {
        return Response.json(
          {
            message: "Admin is not logged int",
          },
          {
            status: 401,
          }
        );
      }

      const bookings = await prisma.booking.findMany({
         include:{
            user:true,
            show:true,
            bookedSeat:true
         },
         orderBy:{
             createdAt: "desc"
         }
      });
      return new Response(
        JSON.stringify({
          status: "success",
          bookings,
        }),
        { status: 200 }
      );
  } catch (error) {
     console.log(error)
     return Response.json({ status: "Server Error" }, { status: 500 });
  }
   
}
