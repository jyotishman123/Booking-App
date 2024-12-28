import { NextRequest} from "next/server";
import { prisma } from "@/lib/db";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";


export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token");
  const data = await req.json()

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

    const secret = process.env.JWT_SECRET;

    const decode = jwt.verify(token?.value, secret as string) as JwtPayload;

    const createShow = await prisma.show.create({
      data:{
          name: data?.showName,
          description: data?.description,
          address:data?.address,
          time:data?.time,
          imageUrl:data?.imageUrl
      }
    })

    return Response.json({message:"show is created",show:createShow},{status:200})

  } catch (error) {
    console.log(error);
    return Response.json({ status: "Server Error" }, { status: 500 });
  }
}

// return Response.json({ status: "failed to retrive data" });
