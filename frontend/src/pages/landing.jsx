import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {

  return (
    <div className="flex-1 flex flex-col gap-4 items-center justify-center h-[calc(100vh-80px)] lg:px-0 px-2">
      <h1 className="text-4xl font-semibold text-center break-words">
        🩺Vigilant
        <span className="relative inline-block">
          <span className="relative z-10 px-2 text-gray-50">MED</span>
          <span className="absolute inset-0 bg-emerald-500/50 -rotate-2 rounded-lg transform -skew-y-1"></span>
        </span>
      </h1>
      <p className="text-muted-foreground text-center break-words">
        A platform for detecting fraudulent insurance claims in the healthcare
        industry.
      </p>
      <button className="btn btn-accent text-white">
        <Link to="/login">Get Started</Link>
      </button>
    </div>
  );
};

export default LandingPage;
