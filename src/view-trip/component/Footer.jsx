import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 py-10 px-6 md:px-20 mt-10">
      <div className="max-w-6xl mx-auto text-center space-y-6">
        <h2 className="text-xl md:text-2xl font-semibold">
          🌍 Travel Planner Project
        </h2>

        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
          This project was proudly created by{" "}
          <span className="font-semibold text-gray-800">
            Bishar Abdinur Mohamed
          </span>{" "}
          together with my amazing classmates:{" "}
          <span className="text-blue-600 font-medium">Mai</span> and{" "}
          <span className="text-green-600 font-medium">Trevor</span>.
        </p>

        <div className="flex justify-center gap-4 text-sm text-gray-500">
          <a href="#" className="hover:text-gray-800 transition">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-gray-800 transition">
            Terms of Service
          </a>
          <a href="#" className="hover:text-gray-800 transition">
            Contact
          </a>
        </div>

        <div className="text-xs text-gray-400 pt-6 border-t border-gray-300">
          &copy; {new Date().getFullYear()} Travel Planner. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
