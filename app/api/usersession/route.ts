import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
    const token = req.cookies.get('token');
    if(!token?.value){
      return Response.json({
          userlogin:false,
          data:null,
          message:'Token is missing'
        }, {
          status: 401,
        })
      }
    
  
      try {
  
        const secret = process.env.JWT_SECRET
        
        const decode = jwt.verify(token?.value, secret as string) as JwtPayload;
         
       const userSession = await prisma.user.findUnique({
    where: {
      id: decode?.id  
    }
    
  });
  
         
         
        return Response.json({userlogin:true,data:userSession,message:'User session retrieve'},{status:200})
         
      } catch (error) {
          console.log(error);
          return Response.json({userlogin:false,data:null,message:'Something went wrong'},{status:401})
      }
}