"use client";

import React, { useState, useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Start fading out after 4.5 seconds
    const timer1 = setTimeout(() => {
      setFading(true);
    }, 4500);

    // Remove component after 5.2 seconds (finish fade)
    const timer2 = setTimeout(() => {
      setLoading(false);
    }, 5200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#f5f6fa] transition-opacity duration-700 ease-in-out ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px]">
        <DotLottieReact
          src="https://lottie.host/08c9012e-368b-483b-b16a-64ec579e54c0/FdUldDJOoO.lottie"
          loop
          autoplay
        />
      </div>
    </div>
  );
}
