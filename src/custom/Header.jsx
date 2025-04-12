import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import React from "react";

function Header() {
  return (
    <div className="p-3 shadow-sm flex items-center justify-between px-2.5">
      <img src="./logo.svg" alt="logo" />
      <div>
        <Button variant="default" className="!bg-black text-white">
          Sign In
        </Button>
      </div>
    </div>
  );
}

export default Header;
