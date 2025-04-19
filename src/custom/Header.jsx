// import { Button } from "@/components/ui/button";
// import { db } from "@/service/firebaseConfig";
// import { doc, getDoc } from "firebase/firestore";
// import { LogIn } from "lucide-react";

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

function Header() {
  return (
    <div className="p-1 shadow-sm flex items-center justify-between px-2.5">
      <img src="/logoimg.png" className="h-20 w-44" alt="logo" />
      <div>
        {/* <Button variant="default" className="!bg-black text-white">
          Sign In
        </Button> */}
        {/* <h3 className="text-right my-2.5">
          UserName: <span className="font-bold">{trip.userName}</span>
        </h3> */}
      </div>
    </div>
  );
}

export default Header;
