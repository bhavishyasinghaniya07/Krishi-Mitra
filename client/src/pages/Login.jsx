import React from "react";
import { assets } from "../assets/assets";
import { Star } from "lucide-react";
import { SignIn } from "@clerk/clerk-react";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Background image */}
      <img
        src={assets.bgImage}
        alt=""
        className="absolute top-0 left-0 -z-1 w-full h-full object-cover"
      />

      {/* left side */}
      <div className="flex-1 flex flex-col items-start justify-around p-6 md:p-10 lg:pl-40">
        <img src={assets.logo} alt="" className="h-28 object-contain" />
        <div>
          <div className="flex items-center gap-3 mb-4 max-md:mt-10">
            <img src={assets.group_users} alt="" className="h-8 md:h-10" />
            <div>
              <div className="flex">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Star
                      key={i}
                      className="size-4 md:size-4.5 text-transparent fill-amber-500"
                    />
                  ))}
              </div>
              <p>Used by 14k+ Farmers</p>
            </div>
          </div>
          <h1 className="text-3xl md:text-6xl md:pb-2 font-bold bg-gradient-to-r from-green-950 to-green-800 bg-clip-text text-transparent">
            More than just friends truly connect
          </h1>
          <p className="text-xl md:text-3xl text-green-700 max-w-72">
            connect with global community on Krishi Mitra.
          </p>
        </div>
        <span className="md:h-10"></span>
      </div>
      {/* right side : Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <SignIn />
      </div>
    </div>
  );
};

export default Login;
