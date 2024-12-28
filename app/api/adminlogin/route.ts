import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { prisma } from "@/lib/db";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const secret = process.env.JWT_SECRET;

  try {
    const admin = await prisma.admin.findUnique({
      where: {
        email: data?.email,
      },
    });

    // If no admin is found, return an error response
    if (!admin) {
      return Response.json(
        { loginSuccess: false, message: "Admin not found" },
        { status: 401 }
      );
    }

    // Compare the entered password with the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(
      data?.password,
      admin.password
    );

    if (!isPasswordValid) {
      return Response.json(
        { loginSuccess: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = jwt.sign({ id: admin.id, role: admin?.role }, secret!, {
      expiresIn: "1h", // You can adjust the token expiration as needed
    });

    (await cookies()).set("admin_token", token, { secure: true, httpOnly: true });
    return NextResponse.redirect(new URL("/", req.url));
  } catch (error) {
    console.log(error);
    return Response.json(
      { loginSuccess: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}

 
