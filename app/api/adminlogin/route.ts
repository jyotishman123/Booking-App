import { NextRequest } from "next/server";
import jwt, { JwtPayload } from 'jsonwebtoken'
import {prisma} from '@/lib/db'
import bcrypt from "bcrypt";

export async function POST(req:NextRequest){
    const data = await req.json()
    const secret = process.env.JWT_SECRET;

    try {
      
      // Encrypt the password using bcrypt
      const hashedPassword = await bcrypt.hash(data?.password, 10);

       await prisma.admin.create({
         data:{
             email:data?.email,
             password:hashedPassword
         }
      });
      return Response.json({ userAccountCreated: true, message: "User created successfully" }, { status: 200 });
    } catch (error){
        console.log(error)
        return Response.json({userAccountCreated:false,message:'Something went wrong'},{status:401})
    }
}