// import { Button } from "@/components/ui/button";
// import { db } from "@/service/firebaseConfig";
// import { doc, getDoc } from "firebase/firestore";
// import { LogIn } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FaGoogle } from "react-icons/fa";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

function Header() {
  const [openDialog, setOpenDialog] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    console.log(user);
  }, [user]);
  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),

    onError: (error) => console.log("error detected in login", error),
  });
  const GetUserProfile = (tokenInfo) => {
    axios
      .get("https://www.googleapis.com/oauth2/v1/userinfo", {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: "application/json",
        },
      })
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data));
        console.log("User saved:", response.data);
        console.log(response.data);
        setOpenDialog(false);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  };
  return (
    <div className="p-1 shadow-sm flex items-center justify-between px-2.5">
      <img src="/logoimg.png" className="h-20 w-44" alt="logo" />
      <div>
        {user ? (
          <div className="flex items-center gap-2.5">
            <a href="my-Trips" className="inline">
              {" "}
              <Button variant="outline" className="rounded-full">
                My Trip
              </Button>
            </a>

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
                  className="cursor-pointer hover:bg-gray-200 uppercase font-semibold py-2.5 rounded-sm transition-all w-full h-full duration-200"
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
          <Button
            onClick={() => setOpenDialog(true)}
            variant="default"
            className="!bg-black text-white"
          >
            Sign In
          </Button>
        )}
        <Dialog open={openDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                <img
                  className="h-16 w-52 bg-cover"
                  src="/public/logoimg.png"
                  alt=""
                />
                <DialogTitle className="font-bold text-lg mt-7">
                  Sign in with Google
                </DialogTitle>
                <DialogDescription>
                  Sign in to the app with Google Authentication secuirity
                </DialogDescription>
                <Button
                  onClick={login}
                  className="!bg-black my-2 hover:text-green-50 text-gray-200 w-full flex items-center gap-4"
                >
                  <FaGoogle className="h-7 w-7" /> Sign in with google
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        {/* <h3 className="text-right my-2.5">
          UserName: <span className="font-bold">{trip.userName}</span>
        </h3> */}
      </div>
    </div>
  );
}

export default Header;
