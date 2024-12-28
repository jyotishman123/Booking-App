import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";


export async function POST(req: NextRequest) {

    const response = NextResponse.json(
        { message: "Logged out successfully" },
        { status: 200 }
      );
    
      // Clear the JWT token cookie
      response.cookies.set("token", "", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        expires: new Date(0),
        path: "/" // Important to specify the path
      });
    
      return response;
}