'use client'

import { useState, useContext } from "react";
import Link from "next/link";
import { SessionProviderContex } from "@/provider/SessionProvider";
import CircularProgress from "@mui/material/CircularProgress";
import Avatar from '@mui/material/Avatar';

interface User {
  userlogin: boolean;
  data:{
    userlogin:boolean
  data: {
    profileImage: string;
    id: number;
    email: string;
    name: string;
  };
}
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Assuming you're correctly typing the context
  const user = useContext(SessionProviderContex) as User;

  // Extracting the user data
  const userdata = user?.data;
  const userlogin = user?.userlogin;
  
  console.log(user )

  return (
    <nav className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-white">
              Booking.com
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link
                href="/"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
              >
                Home
              </Link>
              <Link
                href="/show"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
              >
                Show
              </Link>
              {userdata === undefined ? (
                <Link href="/login">
                  <CircularProgress color="inherit" size={15} />
                </Link>
              ) :  user?.data?.userlogin  === false ? (
                <Link
                  href="/login"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
                >
                  Login
                </Link>
              ) : (
                <Link
                  href="/dashboard"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
                >
                  <div className="flex items-center gap-2"> 
                  <Avatar alt={user?.data?.data?.name} src={user?.data?.data?.profileImage}  sx={{ width: 24, height: 24 }} />
                  Dashboard
                  </div>
                </Link>
              )}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
  <div className="md:hidden">
    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
      <Link
        href="/"
        className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
      >
        Home
      </Link>
      <Link
        href="/show"
        className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
      >
        Show
      </Link>
      {userdata === undefined ? (
        <Link href="/login" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">
          <CircularProgress color="inherit" size={15} />
        </Link>
      ) : user?.data?.userlogin === false ? (
        <Link
          href="/login"
          className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
        >
          Login
        </Link>
      ) : (
        <Link
          href="/dashboard"
          className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
        >
          <div className="flex items-center gap-2">
            <Avatar
              alt={user?.data?.data?.name}
              src={user?.data?.data?.profileImage}
              sx={{ width: 24, height: 24 }}
            />
            <span>Dashboard</span>
          </div>
        </Link>
      )}
    </div>
  </div>
)}

    </nav>
  );
};

export default Navbar;
