import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function DELETE(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token");
  const idParam = req.nextUrl.searchParams.get('id');
  const id = idParam ? parseInt(idParam) : 0;
 

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

    await prisma.show.delete({where: {id:id}})

    return Response.json({message:"show deleted successfully"},{status:200})

  } catch (error) {
    console.log(error);
    return Response.json({ status: "Server Error" }, { status: 500 });
  }
}
