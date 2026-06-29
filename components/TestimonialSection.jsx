"use client";

import React from "react";
import { Quote } from "lucide-react";

const reviews = [
  {
    text:
      "I've been wearing my RajWatches watch for over a year now, and it still looks as stunning as the day I bought it. The craftsmanship, attention to detail, and timeless design truly set it apart.",
    name: "Sidhant Pandey",
  },
  {
    text:
      "What drew me to RajWatches was their commitment to sustainability. Knowing my watch was made with eco-friendly materials makes it even more special. It's stylish, durable, and aligns perfectly with my values.",
    name: "Soumya Ranjan Nanda",
  },
  {
    text:
      "Every time I wear my RajWatches watch, I get compliments. The weight, finish, and design scream luxury. It's become my go-to accessory for both business meetings and evening events.",
    name: "Om Prakash Deo",
  },
  {
    text:
      "Excellent after-sales support and a fantastic warranty. I had a minor issue and they fixed it quickly. The watch still looks brand new after months of daily wear.",
    name: "Anjali Mehta",
  },
  {
    text:
      "The attention to detail and the finishing on my RajWatches piece is exceptional. It feels premium and comfortable — perfect balance between elegance and utility.",
    name: "Rahul Verma",
  },
  {
    text:
      "Quality packaging, fast delivery and the watch looks better in person than in photos. Overall a five-star buying experience.",
    name: "Karthik Kumar",
  },
];

// Duplicate the array to create a seamless infinite loop
const duplicatedReviews = [...reviews, ...reviews];

export default function TestimonialSection() {
  return (
    <section className="bg-white py-14 sm:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center mb-10 sm:mb-14">
        <h2 className="text-2xl sm:text-3xl font-semibold text-[#1a1a2e] tracking-tight">
          What Our Customers Say
        </h2>
      </div>

      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50%)); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: scroll-left 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Marquee Container */}
      <div className="w-full relative overflow-hidden group">
        {/* Gradient overlays for smooth fading edges */}
        <div className="absolute top-0 left-0 h-full w-16 sm:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 h-full w-16 sm:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee">
          {duplicatedReviews.map((r, idx) => (
            <div key={idx} className="w-[300px] sm:w-[400px] flex-shrink-0 px-3 sm:px-4">
              <article
                className="bg-[#faf9f6] border border-[#e5e7eb] rounded-xl p-6 sm:p-8 h-full flex flex-col justify-between hover:border-[#c9a84c] transition-all duration-300 hover:shadow-md cursor-grab active:cursor-grabbing"
              >
                <div>
                  <div className="flex justify-start mb-4">
                    <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-[#c9a84c]" />
                  </div>
                  <p className="text-[#4b5563] text-sm sm:text-base leading-relaxed mb-6 text-left whitespace-normal">
                    {r.text}
                  </p>
                </div>
                <p className="text-right text-[#1a1a2e] font-semibold uppercase tracking-wider text-xs sm:text-sm whitespace-normal">
                  — {r.name}
                </p>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
