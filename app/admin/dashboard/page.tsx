import React from "react";
import Logoutbutton from "@/components/admin/Logoutbutton";
import Link from "next/link";

const page = () => {
  return (
    <div className="m-4 p-4">
      <div className="flex items-center justify-between ">
        <h1 className="text-3xl font-bold sm:text-2xl md:text-3xl lg:text-4xl">
          Admin Dashboard
        </h1>
        <Logoutbutton />
      </div>
        
        <div className="my-2">
          <Link href={"/admin/dashboard/createshow"}> 
          <button className="bg-slate-900 py-2 px-4 rounded-md text-white font-semibold hover:bg-slate-600 
               sm:py-2 sm:px-4 md:py-2 md:px-6 lg:py-3 lg:px-8 text-base sm:text-sm md:text-lg">Create Show</button>
          </Link>
        </div>

    </div>
  );
};

export default page;
