// import { Button } from "@/components/ui/button";
// import { db } from "@/service/firebaseConfig";
// import { doc, getDoc } from "firebase/firestore";
// import { LogIn } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout } from "@react-oauth/google";

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <div className="p-1 shadow-sm flex items-center justify-between px-2.5">
      <img src="/logoimg.png" className="h-20 w-44" alt="logo" />
      <div>
        {user ? (
          <div className="flex items-center gap-2.5">
            <Button variant="outline" className="rounded-full">
              My Trip
            </Button>
            <Popover>
              <PopoverTrigger>
                <img
                  src={user.picture}
                  alt="profile"
                  className="h-[35px] w-[35px] rounded-full "
                />
              </PopoverTrigger>
              <PopoverContent>
                <h2
                  className="cursor-pointer hover:bg-gray-500 transition-all duration-200"
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  LogOut
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button variant="default" className="!bg-black text-white">
            Sign In
          </Button>
        )}

        {/* <h3 className="text-right my-2.5">
          UserName: <span className="font-bold">{trip.userName}</span>
        </h3> */}
      </div>
    </div>
  );
}

export default Header;
