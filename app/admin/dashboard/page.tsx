import React from "react";
import Logoutbutton from "@/components/admin/Logoutbutton";

const page = () => {
  return (
    <div className="m-6 p-6">
      <div className="flex items-center justify-between p-4">
        <h1 className="text-3xl font-bold sm:text-2xl md:text-3xl lg:text-4xl">
          Admin Dashboard
        </h1>
        <Logoutbutton />
      </div>
    </div>
  );
};

export default page;
