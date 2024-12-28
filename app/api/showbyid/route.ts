import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {

    const idParam = req.nextUrl.searchParams.get('id');
    const id = idParam ? parseInt(idParam) : 0;   

    try {
       const show = await prisma.show.findUnique({
             where:{
                id:id
             }
       })
      return Response.json({status:"Show",show})
    } catch (error) {
        console.log(error);
        return Response.json({ status: "Server Error" }, { status: 500 });
    }

}