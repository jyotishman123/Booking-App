import { NextRequest,NextResponse } from "next/server";
import axios from "axios";
import {prisma} from "@/lib/db";
import jwt from 'jsonwebtoken'
import { cookies } from "next/headers";


export async function GET(req: NextRequest, res: NextResponse) {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');

    const jwtSecret = process.env.JWT_SECRET  as string

    try {
        const  { data } = await axios.post('https://oauth2.googleapis.com/token', {
          client_id: process.env.GOOGLE_CLIENT_ID ,
          client_secret: process.env.GOOGLE_SECRET,
          code,
          redirect_uri: process.env.REDIRECT_URI,
          grant_type: 'authorization_code',
        });
  
        const { access_token, id_token } = data;
         
        const { data: profile } = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
        headers: { Authorization: `Bearer ${access_token}` },
        });


        console.log("PROFILE", profile)
 
        const checkUser = await prisma.user.findMany({
           where:{
             email:profile?.email
           }
        })
 
 
         if(checkUser.length > 0){
           const token  = jwt.sign(checkUser[0], jwtSecret,{expiresIn:'30d'})
           ;(await cookies()).set('token',token,{secure:true,httpOnly:true,expires:new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)})
           return NextResponse.redirect(new URL('/dashboard', req.url))
         }
 
         const userCreated = await prisma.user.create({data:{
           name:profile?.email,
           email:profile?.email,
           profileImage:profile?.picture
        }})
 
        const token  = jwt.sign(userCreated, jwtSecret,{expiresIn:'1d'})
         ;(await cookies()).set('token',token,{secure:true,httpOnly:true})
         return NextResponse.redirect(new URL('/dashboard', req.url))
        
        
     } catch(error) {
       console.log(error)
       return Response.json({ status:'failed to retrive data' })
 
     }
}