import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";


export async function GET(req:NextRequest){
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token");

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

        const users= await prisma.user.findMany({
            orderBy:{
                id:"desc"
            }
        })

        return Response.json({message:"User received successfully",users})

    } catch (error) {
       console.log(error)
       return Response.json({ status: "Server Error" }, { status: 500 });
    }
}