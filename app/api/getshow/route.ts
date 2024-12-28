import { NextRequest} from "next/server";
import { prisma } from "@/lib/db";


export async function GET(req:NextRequest) {
       
    try {
       const movies = await prisma.show.findMany()
       return Response.json({"message":"movies",movies})
    } catch (error){
        console.log(error)
        return Response.json({ status: "Server Error" }, { status: 500 });
    }

}