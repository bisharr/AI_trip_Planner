import { Button } from "@/components/ui/button";
import Footer from "@/view-trip/component/Footer";
import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="flex flex-col items-center mx-56 gap-9">
      <h2 className="font-extrabold mt-16 text-[55px] text-center">
        <span className="text-[#f56551]">
          {" "}
          Discover Your Next Adventure with AI:
        </span>
        <br /> Personalized Itineraries at Your Fingertips
      </h2>
      <p className="text-xl text-gray-500 text-center ">
        Your Personal trip planner and travel curator, creating custom
        Itineraries tailored to your interests and budget
      </p>
      <Link to="/create-trip">
        <Button className="d !bg-black">Get started its free</Button>
      </Link>
      <Footer />
    </div>
  );
}

export default Hero;
