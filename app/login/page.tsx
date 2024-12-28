import React from "react";
import Link from "next/link";

const Page = () => {

 
    const clientid = process.env.GOOGLE_CLIENT_ID 
    const redirect_uri = process.env.REDIRECT_URI



  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">Welcome Back</h1>
          <p className="mt-4 text-lg text-gray-600">Sign in to continue to your account</p>
        </div>

        <div className="mt-8 space-y-4">
          {/* Google Sign-In Button */}
          <Link href={`https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientid}&redirect_uri=${redirect_uri}&response_type=code&scope=profile email`}> 
          <button className="w-full flex items-center justify-center px-6 py-3 bg-slate-900 text-white font-semibold text-lg rounded-lg shadow-md hover:bg-slate-600 transition duration-200">
            <span>Sign in with Google</span>
          </button>
          </Link>

          {/* Privacy Policy Text */}
          <div className="mt-4 text-center text-sm text-gray-500">
            <p>
              By signing in, you agree to our{" "}
              <Link href="/privacy-policy" className="text-slate-900 font-semibold hover:underline">
                Privacy Policy
              </Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
