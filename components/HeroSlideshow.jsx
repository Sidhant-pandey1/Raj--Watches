"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

// Using local assets for the slideshow from the public directory
const slides = [
  {
    id: 1,
    title: "Mariner Collection",
    subtitle: "Built for the deep.",
    src: "/assets/slideshow/marinerWatch.jpg",
    textPosition: "items-start justify-center pl-4 md:pl-8 md:pl-12",
    textAlign: "text-left",
  },
  {
    id: 2,
    title: "Field Watch",
    subtitle: "Ready for any adventure.",
    src: "/assets/slideshow/fieldWatch.jpg",
    textPosition: "items-end justify-end pr-8 md:pr-16 lg:pr-32 pb-32",
    textAlign: "text-right",
  },
  {
    id: 3,
    title: "Mechanical Mastery",
    subtitle: "The art of precision.",
    src: "/assets/slideshow/mechanicalWatch.jpg",
    textPosition: "items-center justify-center pt-10 px-4",
    textAlign: "text-center",
  },
  {
    id: 4,
    title: "Automatic Elegance",
    subtitle: "Timeless mechanism.",
    src: "/assets/slideshow/automaticWatch.jpg",
    textPosition: "items-center justify-center pt-10 px-4",
    textAlign: "text-center",
  }
];

export default function HeroSlideshow() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 10000); // Increased to 10 seconds per slide as requested
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-full overflow-hidden bg-[#1a1a2e]">
      {/* Background Images Layer - All are rendered to preload instantly */}
      <div className="absolute inset-0 w-full h-full">
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-all duration-[2000ms] ease-in-out ${idx === current ? "opacity-100 scale-100 z-10" : "opacity-0 scale-105 z-0"
              }`}
            style={{
              backgroundImage: `url('${slide.src}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ))}
        {/* Elegant dark overlay to make white text pop on any background */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60 z-20 pointer-events-none" />
      </div>

      {/* Text Content Layer */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        {slides.map((slide, idx) => (
          <div
            key={`text-${slide.id}`}
            className={`absolute inset-0 flex flex-col transition-all duration-[1200ms] ease-in-out ${slide.textPosition
              } ${idx === current ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            <div className={`pointer-events-auto ${slide.textAlign}`}>
              <h2 className="text-sm md:text-base font-semibold tracking-[0.3em] !text-white uppercase mb-4 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                {slide.subtitle}
              </h2>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold !text-white mb-10 tracking-tight drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]" style={{ fontFamily: "'Outfit', sans-serif" }}>
                {slide.title}
              </h1>
              <Link
                href="/watches/category/all"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#c9a84c] text-white border-none hover:bg-white hover:text-[#1a1a2e] transition-all duration-400 text-sm font-bold tracking-[0.15em] uppercase rounded-sm cursor-pointer shadow-[0_4px_10px_rgba(0,0,0,0.5)] hover:-translate-y-1"
              >
                EXPLORE NOW
                <ChevronRight className="ml-2 w-4 h-4 stroke-[2px]" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-40">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-1 transition-all duration-500 rounded-full ${idx === current ? "w-10 bg-[#c9a84c]" : "w-3 bg-white/40 hover:bg-white/80"
              }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
