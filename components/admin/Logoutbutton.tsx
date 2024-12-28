"use client";

import React from "react";

const Logoutbutton = () => {
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/adminlogout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Redirect the user to the login page or any other page after logout
        window.location.href = "/";
      } else {
        console.error("Logout failed");
        alert("Failed to logout");
      }
    } catch (error) {
      console.log(error);
      alert("Some thing went Wrong");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-slate-900 py-2 px-4 rounded-md text-white font-semibold hover:bg-slate-600 
               sm:py-2 sm:px-4 md:py-2 md:px-6 lg:py-3 lg:px-8 text-base sm:text-sm md:text-lg"
    >
      Logout
    </button>
  );
};

export default Logoutbutton;
