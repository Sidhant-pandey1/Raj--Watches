"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const reviews = [
  {
    text:
      "I’ve been wearing my RajWatches watch for over a year now, and it still looks as stunning as the day I bought it. The craftsmanship, attention to detail, and timeless design truly set it apart.",
    name: "Sidhant Pandey",
  },
  {
    text:
      "What drew me to RajWatches was their commitment to sustainability. Knowing my watch was made with eco-friendly materials makes it even more special. It’s stylish, durable, and aligns perfectly with my values.",
    name: "Soumya Ranjan Nanda",
  },
  {
    text:
      "Every time I wear my RajWatches watch, I get compliments. The weight, finish, and design scream luxury. It’s become my go-to accessory for both business meetings and evening events.",
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

export default function TestimonialSection() {
  const [index, setIndex] = useState(0);
  const autoplayRef = useRef(null);
  const INTERVAL = 5000;

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function startAutoplay() {
    stopAutoplay();
    autoplayRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % reviews.length);
    }, INTERVAL);
  }
  function stopAutoplay() {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }

  // On wide screens show 2 cards (index and next); on small screens show 1
  const visible = [reviews[index], reviews[(index + 1) % reviews.length]];

  const goPrev = () => {
    stopAutoplay();
    setIndex((i) => (i - 1 + reviews.length) % reviews.length);
  };
  const goNext = () => {
    stopAutoplay();
    setIndex((i) => (i + 1) % reviews.length);
  };

  // Calculate progress percentage for the bar
  const progressPercent = ((index + 1) / reviews.length) * 100;

  return (
    <section className="testimonial-section bg-[#fcf7f3] py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-extrabold text-[#23221d] mb-8 sm:mb-12 tracking-wide">
          TESTIMONIALS
        </h2>

        {/* Main testimonial container with external arrows */}
        <div className="relative flex items-center justify-center gap-3 sm:gap-6">
          {/* Left Arrow - Outside cards */}
          <button
            onClick={goPrev}
            aria-label="Previous testimonial"
            className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#c2ab72] shadow-lg flex items-center justify-center hover:bg-[#b89f56] hover:scale-110 transition-all duration-200"
            onFocus={stopAutoplay}
            onMouseEnter={stopAutoplay}
            onMouseLeave={startAutoplay}
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-[#232323]" />
          </button>

          {/* Cards container */}
          <div className="flex-1 max-w-4xl">
            <div className="flex gap-4 sm:gap-6 justify-center items-stretch">
              {visible.map((r, idx) => (
                <article
                  key={r.name + idx}
                  className={`testimonial-card bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-[#f0ebe3] flex-1 min-w-0 max-w-[500px] ${idx === 1 ? "hidden md:block" : ""
                    }`}
                >
                  {/* Quote icon */}
                  <div className="flex justify-start mb-4">
                    <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-[#c2ab72]" />
                  </div>

                  {/* Testimonial text */}
                  <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 text-left">
                    {r.text}
                  </p>

                  {/* Author name */}
                  <p className="text-right text-gray-800 font-semibold uppercase tracking-wider text-xs sm:text-sm">
                    — {r.name}
                  </p>
                </article>
              ))}
            </div>
          </div>

          {/* Right Arrow - Outside cards */}
          <button
            onClick={goNext}
            aria-label="Next testimonial"
            className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#c2ab72] shadow-lg flex items-center justify-center hover:bg-[#b89f56] hover:scale-110 transition-all duration-200"
            onFocus={stopAutoplay}
            onMouseEnter={stopAutoplay}
            onMouseLeave={startAutoplay}
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-[#232323]" />
          </button>
        </div>

        {/* Clean pagination - progress bar with counter */}
        <div className="mt-8 sm:mt-10 flex flex-col items-center gap-3">
          {/* Progress Bar */}
          <div className="w-32 sm:w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#c2ab72] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Review counter */}
          <p className="text-sm text-gray-500 font-medium">
            {index + 1} / {reviews.length}
          </p>
        </div>
      </div>
    </section>
  );
}



















// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

// /**
//  * TestimonialSection (client)
//  * - Two cards visible on wide screens, one on small screens
//  * - White circular arrow buttons overlapping cards area
//  * - Small white circular dots below, active indicator is a gold pill
//  */

// const reviews = [
//   {
//     text:
//       "I’ve been wearing my RajWatches watch for over a year now, and it still looks as stunning as the day I bought it. The craftsmanship, attention to detail, and timeless design truly set it apart.",
//     name: "Sidhant Pandey",
//   },
//   {
//     text:
//       "What drew me to RajWatches was their commitment to sustainability. Knowing my watch was made with eco-friendly materials makes it even more special. It’s stylish, durable, and aligns perfectly with my values.",
//     name: "Soumya Ranjan Nanda",
//   },
//   {
//     text:
//       "Every time I wear my RajWatches watch, I get compliments. The weight, finish, and design scream luxury. It’s become my go-to accessory for both business meetings and evening events.",
//     name: "Om Prakash Deo",
//   },
//   {
//     text:
//       "Excellent after-sales support and a fantastic warranty. I had a minor issue and they fixed it quickly. The watch still looks brand new after months of daily wear.",
//     name: "Anjali Mehta",
//   },
//   {
//     text:
//       "The attention to detail and the finishing on my RajWatches piece is exceptional. It feels premium and comfortable — perfect balance between elegance and utility.",
//     name: "Rahul Verma",
//   },
//   {
//     text:
//       "Quality packaging, fast delivery and the watch looks better in person than in photos. Overall a five-star buying experience.",
//     name: "Karthik Kumar",
//   },
// ];

// export default function TestimonialSection() {
//   const [index, setIndex] = useState(0);
//   const timerRef = useRef(null);

//   useEffect(() => {
//     // autoplay
//     timerRef.current = setInterval(() => {
//       setIndex((p) => (p + 1) % reviews.length);
//     }, 5000);
//     return () => clearInterval(timerRef.current);
//   }, []);

//   const prev = () => {
//     clearInterval(timerRef.current);
//     setIndex((v) => (v - 1 + reviews.length) % reviews.length);
//   };

//   const next = () => {
//     clearInterval(timerRef.current);
//     setIndex((v) => (v + 1) % reviews.length);
//   };

//   // two visible cards: index and index+1 (wrap)
//   const visible = [reviews[index], reviews[(index + 1) % reviews.length]];

//   return (
//     <section className="testimonial-section" aria-label="Customer testimonials">
//       <div className="testimonial-inner max-w-6xl mx-auto px-6">
//         <h2 className="testimonial-title">TESTIMONIALS</h2>

//         <div className="testimonial-stage relative">
//           {/* left arrow */}
//           <button
//             onClick={prev}
//             aria-label="Previous testimonial"
//             className="testimonial-arrow left"
//             title="Previous"
//           >
//             <ChevronLeft />
//           </button>

//           {/* cards */}
//           <div className="testimonial-cards">
//             {visible.map((r, idx) => (
//               <article key={r.name + idx} className="testimonial-card">
//                 <div className="testimonial-card-inner">
//                   <div className="quote-icon">
//                     <Quote />
//                   </div>
//                   <div className="testimonial-copy">
//                     <p className="testimonial-text">{r.text}</p>
//                     <p className="testimonial-name">{r.name}</p>
//                   </div>
//                 </div>
//               </article>
//             ))}
//           </div>

//           {/* right arrow */}
//           <button
//             onClick={next}
//             aria-label="Next testimonial"
//             className="testimonial-arrow right"
//             title="Next"
//           >
//             <ChevronRight />
//           </button>
//         </div>

//         {/* pagination: small white dots, active = gold pill */}
//         <nav className="testimonial-pagination" aria-label="Testimonials pagination">
//           {reviews.map((_, i) => (
//             <button
//               key={i}
//               aria-label={`Go to testimonial ${i + 1}`}
//               onClick={() => {
//                 clearInterval(timerRef.current);
//                 setIndex(i);
//               }}
//               className={`testimonial-dot ${i === index ? "active" : ""}`}
//             />
//           ))}
//         </nav>
//       </div>
//     </section>
//   );
// }



// // "use client";

// // import React, { useEffect, useRef, useState } from "react";
// // import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

// // /**
// //  * TestimonialSection
// //  * - Two cards visible on larger screens, one on small screens
// //  * - Small circular white arrows on left/right (overlapping cards area)
// //  * - Compact dot pagination centered below cards
// //  */

// // const reviews = [
// //   {
// //     text: "I’ve been wearing my RajWatches watch for over a year now, and it still looks as stunning as the day I bought it. The craftsmanship, attention to detail, and timeless design truly set it apart.",
// //     name: "Sidhant Pandey",
// //   },
// //   {
// //     text: "What drew me to RajWatches was their commitment to sustainability. Knowing my watch was made with eco-friendly materials makes it even more special. It’s stylish, durable, and aligns perfectly with my values.",
// //     name: "Soumya Ranjan Nanda",
// //   },
// //   {
// //     text: "Every time I wear my RajWatches watch, I get compliments. The weight, finish, and design scream luxury. It’s become my go-to accessory for both business meetings and evening events.",
// //     name: "Om Prakash Deo",
// //   },
// //   {
// //     text: "Excellent after-sales support and a fantastic warranty. I had a minor issue and they fixed it quickly. The watch still looks brand new after months of daily wear.",
// //     name: "Anjali Mehta",
// //   },
// //   {
// //     text: "The attention to detail and the finishing on my RajWatches piece is exceptional. It feels premium and comfortable — perfect balance between elegance and utility.",
// //     name: "Rahul Verma",
// //   },
// //   {
// //     text: "Quality packaging, fast delivery and the watch looks better in person than in photos. Overall a five-star buying experience.",
// //     name: "Karthik Kumar",
// //   },
// // ];

// // export default function TestimonialSection() {
// //   const [i, setI] = useState(0);
// //   const autoRef = useRef(null);

// //   useEffect(() => {
// //     autoRef.current = setInterval(() => {
// //       setI((prev) => (prev + 1) % reviews.length);
// //     }, 5000);
// //     return () => clearInterval(autoRef.current);
// //   }, []);

// //   // visible pair: i and i+1 (wrap)
// //   const visible = [reviews[i], reviews[(i + 1) % reviews.length]];

// //   const prev = () => {
// //     clearInterval(autoRef.current);
// //     setI((v) => (v - 1 + reviews.length) % reviews.length);
// //   };
// //   const next = () => {
// //     clearInterval(autoRef.current);
// //     setI((v) => (v + 1) % reviews.length);
// //   };

// //   return (
// //     <section className="testimonial-section bg-[#fcf7f3] py-16 px-4">
// //       <div className="max-w-6xl mx-auto relative text-center">
// //         <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-[#23221d] mb-10 tracking-wide">
// //           TESTIMONIALS
// //         </h2>

// //         <div className="relative flex items-center justify-center">
// //           {/* Left arrow */}
// //           <button
// //             aria-label="Previous testimonial"
// //             onClick={prev}
// //             className="testimonial-arrow left"
// //           >
// //             <ChevronLeft className="w-5 h-5" />
// //           </button>

// //           {/* Cards */}
// //           <div className="testimonial-cards-container w-full px-6">
// //             <div className="testimonial-cards flex gap-6 justify-center">
// //               {visible.map((r, idx) => (
// //                 <article
// //                   key={idx + "-" + r.name}
// //                   className="testimonial-card bg-[#fff6f0] rounded-2xl p-8 shadow-md flex-1 min-w-[260px] max-w-[540px]"
// //                 >
// //                   <div className="flex items-start gap-4">
// //                     <div className="quote-icon text-[#c2ab72]">
// //                       <Quote className="w-10 h-10" />
// //                     </div>
// //                     <div className="flex-1">
// //                       <p className="text-gray-700 text-[1.02rem] leading-relaxed mb-6 font-medium">
// //                         {r.text}
// //                       </p>
// //                       <p className="text-right text-gray-900 font-bold uppercase tracking-wide">
// //                         {r.name}
// //                       </p>
// //                     </div>
// //                   </div>
// //                 </article>
// //               ))}
// //             </div>
// //           </div>

// //           {/* Right arrow */}
// //           <button
// //             aria-label="Next testimonial"
// //             onClick={next}
// //             className="testimonial-arrow right"
// //           >
// //             <ChevronRight className="w-5 h-5" />
// //           </button>
// //         </div>

// //         {/* Dots */}
// //         <nav aria-label="Testimonials pagination" className="mt-8 flex justify-center gap-3">
// //           {reviews.map((_, idx) => (
// //             <button
// //               key={idx}
// //               onClick={() => {
// //                 clearInterval(autoRef.current);
// //                 setI(idx);
// //               }}
// //               className={`testimonial-dot ${idx === i ? "active" : ""}`}
// //               aria-label={`Go to testimonial ${idx + 1}`}
// //             />
// //           ))}
// //         </nav>
// //       </div>
// //     </section>
// //   );
// // }
















// // // "use client";

// // // import React, { useEffect, useRef, useState } from "react";
// // // import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

// // // const reviews = [
// // //   {
// // //     text:
// // //       "Excellent after-sales support and a fantastic warranty. I had a minor issue and they fixed it quickly. The watch still looks brand new after months of daily wear.",
// // //     name: "Anjali Mehta",
// // //   },
// // //   {
// // //     text:
// // //       "The attention to detail and the finishing on my RajWatches piece is exceptional. It feels premium and comfortable — perfect balance between elegance and utility.",
// // //     name: "Rahul Verma",
// // //   },
// // //   {
// // //     text:
// // //       "I’ve been wearing my RajWatches watch for over a year now, and it still looks as stunning as the day I bought it. The craftsmanship truly sets it apart.",
// // //     name: "Sidhant Pandey",
// // //   },
// // //   {
// // //     text:
// // //       "What drew me to RajWatches was their commitment to sustainability. Knowing my watch was made with eco-friendly materials makes it even more special.",
// // //     name: "Soumya Ranjan Nanda",
// // //   },
// // //   {
// // //     text:
// // //       "Every time I wear my RajWatches watch, I get compliments. The weight, finish, and design scream luxury. It’s my go-to accessory for events.",
// // //     name: "Om Prakash Deo",
// // //   },
// // //   {
// // //     text:
// // //       "Lovely designs and quick service. The store staff helped me pick the perfect watch for my father — he absolutely loves it.",
// // //     name: "Kavita Sharma",
// // //   },
// // // ];

// // // const GOLD = "#c2ab72";

// // // export default function TestimonialSection() {
// // //   const [pageSize, setPageSize] = useState(2);
// // //   const [page, setPage] = useState(0);
// // //   const autoplayRef = useRef(null);

// // //   // recompute pages
// // //   const pages = Math.max(1, Math.ceil(reviews.length / pageSize));

// // //   // set pageSize responsively
// // //   useEffect(() => {
// // //     function onResize() {
// // //       setPageSize(window.innerWidth < 640 ? 1 : 2);
// // //       // clamp page when pageSize changes
// // //       const newPages = Math.max(1, Math.ceil(reviews.length / (window.innerWidth < 640 ? 1 : 2)));
// // //       setPage((p) => Math.min(p, newPages - 1));
// // //     }
// // //     onResize();
// // //     window.addEventListener("resize", onResize);
// // //     return () => window.removeEventListener("resize", onResize);
// // //   }, []);

// // //   // autoplay
// // //   useEffect(() => {
// // //     startAutoplay();
// // //     return stopAutoplay;
// // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // //   }, [pageSize, page]);

// // //   function startAutoplay() {
// // //     stopAutoplay();
// // //     autoplayRef.current = setInterval(() => {
// // //       setPage((p) => (p + 1) % pages);
// // //     }, 5000);
// // //   }
// // //   function stopAutoplay() {
// // //     if (autoplayRef.current) {
// // //       clearInterval(autoplayRef.current);
// // //       autoplayRef.current = null;
// // //     }
// // //   }

// // //   // keyboard navigation
// // //   useEffect(() => {
// // //     const onKey = (e) => {
// // //       if (e.key === "ArrowLeft") prev();
// // //       if (e.key === "ArrowRight") next();
// // //     };
// // //     window.addEventListener("keydown", onKey);
// // //     return () => window.removeEventListener("keydown", onKey);
// // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // //   }, [pages]);

// // //   const prev = () => setPage((p) => (p - 1 + pages) % pages);
// // //   const next = () => setPage((p) => (p + 1) % pages);

// // //   const startIndex = page * pageSize;
// // //   const visible = reviews.slice(startIndex, startIndex + pageSize);

// // //   return (
// // //     <section
// // //       className="relative bg-[#fcf7f3] text-gray-900 py-16 px-4 overflow-visible"
// // //       onMouseEnter={stopAutoplay}
// // //       onMouseLeave={startAutoplay}
// // //       aria-label="Customer testimonials"
// // //     >
// // //       <div className="max-w-6xl mx-auto text-center">
// // //         <h2 className="text-4xl md:text-5xl font-serif font-extrabold mb-10 tracking-wide text-[#232323]">
// // //           TESTIMONIALS
// // //         </h2>

// // //         <div className="relative flex items-center justify-center">
// // //           {/* Left circular arrow (white) */}
// // //           <button
// // //             onClick={prev}
// // //             aria-label="Previous testimonials"
// // //             className="absolute left-0 md:-left-12 lg:-left-16 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-md hover:scale-105 transition"
// // //             style={{ boxShadow: "0 8px 28px rgba(0,0,0,0.08)" }}
// // //           >
// // //             <ChevronLeft className="w-6 h-6 text-gray-700" />
// // //           </button>

// // //           {/* Cards */}
// // //           <div className="flex gap-8 justify-center w-full px-8">
// // //             {visible.map((r, i) => (
// // //               <article
// // //                 key={startIndex + i}
// // //                 className="bg-[#fff6f0] rounded-2xl shadow-lg p-8 sm:p-10 w-full max-w-[720px] flex flex-col"
// // //                 role="group"
// // //               >
// // //                 <div className="flex items-start gap-4">
// // //                   <div
// // //                     className="rounded-full w-12 h-12 flex items-center justify-center"
// // //                     aria-hidden
// // //                     style={{ color: GOLD }}
// // //                   >
// // //                     <Quote className="w-8 h-8" />
// // //                   </div>
// // //                   <div className="text-left flex-1">
// // //                     <p className="text-gray-700 text-lg leading-relaxed mb-6">
// // //                       {r.text}
// // //                     </p>
// // //                     <div className="text-right mt-auto">
// // //                       <span className="font-bold uppercase text-sm text-[#111827]">
// // //                         {r.name}
// // //                       </span>
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               </article>
// // //             ))}

// // //             {/* invisible placeholder to keep center alignment on last page when mobile/one card */}
// // //             {visible.length < pageSize &&
// // //               Array.from({ length: pageSize - visible.length }).map((_, k) => (
// // //                 <div key={`gap-${k}`} className="hidden sm:block w-[46%]" aria-hidden />
// // //               ))}
// // //           </div>

// // //           {/* Right circular arrow (white) */}
// // //           <button
// // //             onClick={next}
// // //             aria-label="Next testimonials"
// // //             className="absolute right-0 md:-right-12 lg:-right-16 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-md hover:scale-105 transition"
// // //             style={{ boxShadow: "0 8px 28px rgba(0,0,0,0.08)" }}
// // //           >
// // //             <ChevronRight className="w-6 h-6 text-gray-700" />
// // //           </button>
// // //         </div>

// // //         {/* Numbered pills pagination (1,2,3...) */}
// // //         <div className="mt-10 flex justify-center gap-4">
// // //           {Array.from({ length: pages }).map((_, p) => (
// // //             <button
// // //               key={p}
// // //               onClick={() => setPage(p)}
// // //               aria-label={`Go to page ${p + 1}`}
// // //               className="focus:outline-none"
// // //             >
// // //               <span
// // //                 className={`inline-flex items-center justify-center px-5 py-2 rounded-full font-semibold transition-all`}
// // //                 style={{
// // //                   background: p === page ? GOLD : "rgba(194,171,114,0.25)",
// // //                   color: p === page ? "#111" : "#fff",
// // //                   boxShadow: p === page ? "0 6px 20px rgba(0,0,0,0.08)" : "none",
// // //                   minWidth: 44,
// // //                 }}
// // //               >
// // //                 {p + 1}
// // //               </span>
// // //             </button>
// // //           ))}
// // //         </div>
// // //       </div>
// // //     </section>
// // //   );
// // // }




// // // "use client";
// // // import React, { useEffect, useState } from "react";
// // // import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

// // // const reviews = [
// // //   {
// // //     text: "I’ve been wearing my RajWatches watch for over a year now, and it still looks as stunning as the day I bought it. The craftsmanship, attention to detail, and timeless design truly set it apart. It’s more than just a timepiece — it’s a statement of class.",
// // //     name: "Sidhant Pandey",
// // //   },
// // //   {
// // //     text: "What drew me to RajWatches was their commitment to sustainability. Knowing my watch was made with eco-friendly materials makes it even more special. It’s stylish, durable, and aligns perfectly with my values.",
// // //     name: "Soumya Ranjan Nanda",
// // //   },
// // //   {
// // //     text: "Every time I wear my RajWatches watch, I get compliments. The weight, finish, and design scream luxury. It’s become my go-to accessory for both business meetings and evening events.",
// // //     name: "Om Prakash Deo",
// // //   },
// // // ];

// // // const gold = "#c2ab72";

// // // const TestimonialSection = () => {
// // //   const [currentIndex, setCurrentIndex] = useState(0);

// // //   useEffect(() => {
// // //     const interval = setInterval(() => {
// // //       handleNext();
// // //     }, 5000);
// // //     return () => clearInterval(interval);
// // //   }, [currentIndex]);

// // //   const getVisibleReviews = () => [
// // //     reviews[currentIndex],
// // //     reviews[(currentIndex + 1) % reviews.length],
// // //   ];

// // //   const handlePrev = () => {
// // //     setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
// // //   };

// // //   const handleNext = () => {
// // //     setCurrentIndex((prev) => (prev + 1) % reviews.length);
// // //   };

// // //   return (
// // //     <section className="bg-[#fcf7f3] text-gray-800 py-16 px-4 overflow-hidden">
// // //       <div className="max-w-6xl mx-auto text-center">
// // //         <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-10 tracking-wide">
// // //           TESTIMONIALS
// // //         </h2>

// // //         <div className="flex items-center justify-center gap-4 mb-6">
// // //           <button
// // //             onClick={handlePrev}
// // //             aria-label="Previous testimonial"
// // //             className="bg-white shadow-lg rounded-full w-14 h-14 flex items-center justify-center hover:scale-110 transition-all"
// // //             style={{ boxShadow: "0 2px 15px rgba(80,80,80,0.07)" }}
// // //           >
// // //             <ChevronLeft className="w-8 h-8 text-gray-700" />
// // //           </button>
// // //           <div className="flex flex-col sm:flex-row gap-8 justify-center items-start transition-transform duration-700 ease-in-out">
// // //             {getVisibleReviews().map((review, i) => (
// // //               <div
// // //                 key={i}
// // //                 className="bg-[#fdf5ee] rounded-[2rem] shadow-lg p-8 w-full sm:w-[calc(50%-1rem)] md:w-[430px] relative flex flex-col items-start"
// // //               >
// // //                 <Quote
// // //                   className="w-12 h-12"
// // //                   style={{ color: gold }}
// // //                   aria-hidden="true"
// // //                 />
// // //                 <p className="text-gray-700 text-[1.06rem] leading-relaxed mt-6 mb-9 text-left font-[500]">
// // //                   {review.text}
// // //                 </p>
// // //                 <p className="mt-auto text-gray-900 font-bold text-right w-full uppercase tracking-wide">
// // //                   {review.name}
// // //                 </p>
// // //               </div>
// // //             ))}
// // //           </div>
// // //           <button
// // //             onClick={handleNext}
// // //             aria-label="Next testimonial"
// // //             className="bg-white shadow-lg rounded-full w-14 h-14 flex items-center justify-center hover:scale-110 transition-all"
// // //             style={{ boxShadow: "0 2px 15px rgba(80,80,80,0.07)" }}
// // //           >
// // //             <ChevronRight className="w-8 h-8 text-gray-700" />
// // //           </button>
// // //         </div>

// // //         <div className="flex justify-center mt-10 space-x-4">
// // //           {reviews.map((_, i) => (
// // //             <button
// // //               key={i}
// // //               onClick={() => setCurrentIndex(i)}
// // //               aria-label={`Go to testimonial ${i + 1}`}
// // //               className="focus:outline-none"
// // //             >
// // //               <span
// // //                 className={`block transition-all duration-300 ${
// // //                   i === currentIndex
// // //                     ? "w-12 h-8 bg-[#c2ab72]"
// // //                     : "w-12 h-8 bg-[#c2ab72]/60 opacity-60"
// // //                 }`}
// // //                 style={{
// // //                   borderRadius: "999px",
// // //                   display: "inline-block",
// // //                 }}
// // //               ></span>
// // //             </button>
// // //           ))}
// // //         </div>
// // //       </div>
// // //     </section>
// // //   );
// // // };

// // // export default TestimonialSection;


// // // // "use client";
// // // // import React, { useEffect, useState } from "react";
// // // // import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

// // // // const reviews = [
// // // //   {
// // // //     text: "I’ve been wearing my RajWatches watch for over a year now, and it still looks as stunning as the day I bought it. The craftsmanship, attention to detail, and timeless design truly set it apart. It’s more than just a timepiece — it’s a statement of class.",
// // // //     name: "Sidhant Pandey",
// // // //   },
// // // //   {
// // // //     text: "What drew me to RajWatches was their commitment to sustainability. Knowing my watch was made with eco-friendly materials makes it even more special. It’s stylish, durable, and aligns perfectly with my values.",
// // // //     name: "Soumya Ranjan Nanda",
// // // //   },
// // // //   {
// // // //     text: "Every time I wear my RajWatches watch, I get compliments. The weight, finish, and design scream luxury. It’s become my go-to accessory for both business meetings and evening events.",
// // // //     name: "Om Prakash Deo",
// // // //   },
// // // // ];

// // // // const gold = "#c2ab72"; // use as main gold accent

// // // // const TestimonialSection = () => {
// // // //   const [currentIndex, setCurrentIndex] = useState(0);

// // // //   useEffect(() => {
// // // //     const interval = setInterval(() => {
// // // //       setCurrentIndex((prev) => (prev + 1) % reviews.length);
// // // //     }, 5000);
// // // //     return () => clearInterval(interval);
// // // //   }, [reviews.length]);

// // // //   // Show 2 reviews at a time
// // // //   const getVisibleReviews = () => [
// // // //     reviews[currentIndex],
// // // //     reviews[(currentIndex + 1) % reviews.length],
// // // //   ];

// // // //   const handlePrev = () => {
// // // //     setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
// // // //   };

// // // //   const handleNext = () => {
// // // //     setCurrentIndex((prev) => (prev + 1) % reviews.length);
// // // //   };

// // // //   return (
// // // //     <section className="bg-[#fcf7f3] text-gray-800 py-16 px-4 overflow-hidden">
// // // //       <div className="max-w-6xl mx-auto text-center">
// // // //         <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-10 tracking-wide">
// // // //           TESTIMONIALS
// // // //         </h2>

// // // //         {/* Slider Navigation*/}
// // // //         <div className="flex items-center justify-center gap-4 mb-8">
// // // //           <button
// // // //             onClick={handlePrev}
// // // //             aria-label="Previous testimonial"
// // // //             className="bg-white shadow-lg rounded-full w-14 h-14 flex items-center justify-center hover:scale-110 transition-all"
// // // //             style={{
// // // //               boxShadow: "0 2px 15px rgba(80,80,80,0.07)",
// // // //             }}
// // // //           >
// // // //             <ChevronLeft className="w-8 h-8 text-gray-700" />
// // // //           </button>
// // // //           <div className="flex flex-col sm:flex-row gap-8 justify-center items-start transition-transform duration-700 ease-in-out">
// // // //             {getVisibleReviews().map((review, i) => (
// // // //               <div
// // // //                 key={i}
// // // //                 className="bg-[#fdf5ee] rounded-[2rem] shadow-lg p-8 w-full sm:w-[390px] md:w-[460px] relative flex flex-col items-start"
// // // //               >
// // // //                 <Quote className="w-12 h-12" style={{ color: gold }} />
// // // //                 <p className="text-gray-700 text-[1.06rem] leading-relaxed mt-6 mb-9 text-left font-[500]">
// // // //                   {review.text}
// // // //                 </p>
// // // //                 <p className="mt-auto text-gray-900 font-bold text-right w-full uppercase tracking-wide">
// // // //                   {review.name}
// // // //                 </p>
// // // //               </div>
// // // //             ))}
// // // //           </div>
// // // //           <button
// // // //             onClick={handleNext}
// // // //             aria-label="Next testimonial"
// // // //             className="bg-white shadow-lg rounded-full w-14 h-14 flex items-center justify-center hover:scale-110 transition-all"
// // // //             style={{
// // // //               boxShadow: "0 2px 15px rgba(80,80,80,0.07)",
// // // //             }}
// // // //           >
// // // //             <ChevronRight className="w-8 h-8 text-gray-700" />
// // // //           </button>
// // // //         </div>

// // // //         {/* Dots Indicator */}
// // // //         <div className="flex justify-center mt-10 space-x-4">
// // // //           {reviews.map((_, i) => (
// // // //             <button
// // // //               key={i}
// // // //               onClick={() => setCurrentIndex(i)}
// // // //               aria-label={`Go to testimonial ${i + 1}`}
// // // //               className="focus:outline-none"
// // // //             >
// // // //               <span
// // // //                 className={`block transition-all duration-300 ${
// // // //                   i === currentIndex
// // // //                     ? "w-12 h-8 bg-[#c2ab72]"
// // // //                     : "w-12 h-8 bg-[#c2ab72]/60 opacity-60"
// // // //                 }`}
// // // //                 style={{
// // // //                   borderRadius: "999px",
// // // //                   display: "inline-block",
// // // //                 }}
// // // //               ></span>
// // // //             </button>
// // // //           ))}
// // // //         </div>
// // // //       </div>
// // // //     </section>
// // // //   );
// // // // };

// // // // export default TestimonialSection;

// // // // // "use client";
// // // // // import React, { useEffect, useState } from "react";
// // // // // import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

// // // // // const reviews = [
// // // // //   {
// // // // //     text: "I’ve been wearing my RajWatches watch for over a year now, and it still looks as stunning as the day I bought it. The craftsmanship, attention to detail, and timeless design truly set it apart. It’s more than just a timepiece — it’s a statement of class.",
// // // // //     name: "Sidhant Pandey",
// // // // //   },
// // // // //   {
// // // // //     text: "What drew me to RajWatches was their commitment to sustainability. Knowing my watch was made with eco-friendly materials makes it even more special. It’s stylish, durable, and aligns perfectly with my values.",
// // // // //     name: "Soumya Ranjan Nanda",
// // // // //   },
// // // // //   {
// // // // //     text: "Every time I wear my RajWatches watch, I get compliments. The weight, finish, and design scream luxury. It’s become my go-to accessory for both business meetings and evening events.",
// // // // //     name: "Om Prakash Deo",
// // // // //   },
// // // // // ];

// // // // // const TestimonialSection = () => {
// // // // //   const [currentIndex, setCurrentIndex] = useState(0);

// // // // //   // Auto-slide every 5 seconds
// // // // //   useEffect(() => {
// // // // //     const interval = setInterval(() => {
// // // // //       handleNext();
// // // // //     }, 5000);
// // // // //     return () => clearInterval(interval);
// // // // //   }, [currentIndex]);

// // // // //   // Show 2 at a time
// // // // //   const getVisibleReviews = () => [
// // // // //     reviews[currentIndex],
// // // // //     reviews[(currentIndex + 1) % reviews.length],
// // // // //   ];

// // // // //   const handlePrev = () => {
// // // // //     setCurrentIndex(
// // // // //       (prev) => (prev - 1 + reviews.length) % reviews.length
// // // // //     );
// // // // //   };

// // // // //   const handleNext = () => {
// // // // //     setCurrentIndex((prev) => (prev + 1) % reviews.length);
// // // // //   };

// // // // //   return (
// // // // //     <section className="bg-[#fcf7f3] text-gray-800 py-16 px-4 overflow-hidden">
// // // // //       <div className="max-w-6xl mx-auto text-center">
// // // // //         <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-10 tracking-wide">
// // // // //           TESTIMONIALS
// // // // //         </h2>

// // // // //         {/* Slider Buttons */}
// // // // //         <div className="flex items-center justify-center gap-4 mb-6">
// // // // //           <button
// // // // //             onClick={handlePrev}
// // // // //             aria-label="Previous"
// // // // //             className="bg-white shadow-lg rounded-full w-12 h-12 flex items-center justify-center hover:scale-105 transition"
// // // // //           >
// // // // //             <ChevronLeft className="w-7 h-7 text-gray-700" />
// // // // //           </button>
// // // // //           <div className="flex flex-col sm:flex-row gap-8 justify-center items-start transition-transform duration-700 ease-in-out">
// // // // //             {getVisibleReviews().map((review, i) => (
// // // // //               <div
// // // // //                 key={i}
// // // // //                 className="bg-[#fdf5ee] rounded-[2rem] shadow-lg p-8 w-full sm:w-[calc(50%-1rem)] md:w-[430px] relative flex flex-col items-start"
// // // // //               >
// // // // //                 <Quote className="w-12 h-12 text-[#ecbe78] absolute top-8 left-8" />
// // // // //                 <p className="text-gray-700 text-lg leading-relaxed mt-12 text-left font-[500]">
// // // // //                   {review.text}
// // // // //                 </p>
// // // // //                 <p className="mt-8 text-gray-900 font-bold text-right w-full uppercase tracking-wide">
// // // // //                   {review.name}
// // // // //                 </p>
// // // // //               </div>
// // // // //             ))}
// // // // //           </div>
// // // // //           <button
// // // // //             onClick={handleNext}
// // // // //             aria-label="Next"
// // // // //             className="bg-white shadow-lg rounded-full w-12 h-12 flex items-center justify-center hover:scale-105 transition"
// // // // //           >
// // // // //             <ChevronRight className="w-7 h-7 text-gray-700" />
// // // // //           </button>
// // // // //         </div>

// // // // //         {/* Dots Indicator */}
// // // // //         <div className="flex justify-center mt-8 space-x-2">
// // // // //           {reviews.map((_, i) => (
// // // // //             <button
// // // // //               key={i}
// // // // //               onClick={() => setCurrentIndex(i)}
// // // // //               aria-label={`Go to testimonial ${i + 1}`}
// // // // //               className={`w-5 h-5 rounded-full ring-1 ring-gray-300 flex items-center justify-center bg-white shadow ${
// // // // //                 i === currentIndex ? "ring-gray-700" : ""
// // // // //               }`}
// // // // //             >
// // // // //               <span className={`w-2 h-2 rounded-full ${i === currentIndex ? "bg-gray-700" : "bg-gray-300"}`}></span>
// // // // //             </button>
// // // // //           ))}
// // // // //         </div>
// // // // //       </div>
// // // // //     </section>
// // // // //   );
// // // // // };

// // // // // export default TestimonialSection;

// // // // // // "use client";
// // // // // // import React, { useEffect, useState } from "react";
// // // // // // import { Quote } from "lucide-react";

// // // // // // const reviews = [
// // // // // //   {
// // // // // //     text: "I’ve been wearing my RajWatches watch for over a year now, and it still looks as stunning as the day I bought it. The craftsmanship, attention to detail, and timeless design truly set it apart. It’s more than just a timepiece — it’s a statement of class.",
// // // // // //     name: "Sidhant Pandey",
// // // // // //   },
// // // // // //   {
// // // // // //     text: "What drew me to RajWatches was their commitment to sustainability. Knowing my watch was made with eco-friendly materials makes it even more special. It’s stylish, durable, and aligns perfectly with my values.",
// // // // // //     name: "Soumya Ranjan Nanda",
// // // // // //   },
// // // // // //   {
// // // // // //     text: "Every time I wear my RajWatches watch, I get compliments. The weight, finish, and design scream luxury. It’s become my go-to accessory for both business meetings and evening events.",
// // // // // //     name: "Om Prakash Deo",
// // // // // //   },
// // // // // // ];

// // // // // // const TestimonialSection = () => {
// // // // // //   const [currentIndex, setCurrentIndex] = useState(0);

// // // // // //   // Auto-slide every 5 seconds
// // // // // //   useEffect(() => {
// // // // // //     const interval = setInterval(() => {
// // // // // //       setCurrentIndex((prev) => (prev + 1) % reviews.length);
// // // // // //     }, 5000);
// // // // // //     return () => clearInterval(interval);
// // // // // //   }, []);

// // // // // //   // Only show 2 at a time
// // // // // //   const getVisibleReviews = () => {
// // // // // //     return [
// // // // // //       reviews[currentIndex],
// // // // // //       reviews[(currentIndex + 1) % reviews.length],
// // // // // //     ];
// // // // // //   };

// // // // // //   return (
// // // // // //     <section className="bg-[#fcf7f3] text-gray-800 py-16 px-4 overflow-hidden">
// // // // // //       <div className="max-w-6xl mx-auto text-center">
// // // // // //         <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-10 tracking-wide">
// // // // // //           TESTIMONIALS
// // // // // //         </h2>

// // // // // //         {/* Slider Container */}
// // // // // //         <div className="flex flex-col sm:flex-row gap-8 justify-center items-start transition-transform duration-700 ease-in-out">
// // // // // //           {getVisibleReviews().map((review, i) => (
// // // // // //             <div
// // // // // //               key={i}
// // // // // //               className="bg-[#fdf5ee] rounded-[2rem] shadow-lg p-8 w-full sm:w-[calc(50%-1rem)] md:w-[430px] relative flex flex-col items-start"
// // // // // //             >
// // // // // //               <Quote className="w-12 h-12 text-[#ecbe78] absolute top-8 left-8" />
// // // // // //               <p className="text-gray-700 text-lg leading-relaxed mt-12 text-left font-[500]">
// // // // // //                 {review.text}
// // // // // //               </p>
// // // // // //               <p className="mt-8 text-gray-900 font-bold text-right w-full uppercase tracking-wide">
// // // // // //                 {review.name}
// // // // // //               </p>
// // // // // //             </div>
// // // // // //           ))}
// // // // // //         </div>

// // // // // //         {/* Dots Indicator */}
// // // // // //         <div className="flex justify-center mt-8 space-x-3">
// // // // // //           {reviews.map((_, i) => (
// // // // // //             <button
// // // // // //               key={i}
// // // // // //               onClick={() => setCurrentIndex(i)}
// // // // // //               aria-label={`Go to testimonial ${i + 1}`}
// // // // // //               className={`w-3 h-3 rounded-full transition-all duration-300 ${
// // // // // //                 i === currentIndex ? "bg-[#ecbe78] scale-110" : "bg-gray-300"
// // // // // //               }`}
// // // // // //             ></button>
// // // // // //           ))}
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </section>
// // // // // //   );
// // // // // // };

// // // // // // export default TestimonialSection;

// // // // // // // "use client"
// // // // // // // import React, { useEffect, useState } from "react";
// // // // // // // import { Quote } from "lucide-react";

// // // // // // // const reviews = [
// // // // // // //   {
// // // // // // //     text: "I’ve been wearing my RajWatches watch for over a year now, and it still looks as stunning as the day I bought it. The craftsmanship, attention to detail, and timeless design truly set it apart. It’s more than just a timepiece — it’s a statement of class.",
// // // // // // //     name: "— Sidhant Pandey",
// // // // // // //   },
// // // // // // //   {
// // // // // // //     text: "What drew me to RajWatches was their commitment to sustainability. Knowing my watch was made with eco-friendly materials makes it even more special. It’s stylish, durable, and aligns perfectly with my values.",
// // // // // // //     name: "— Soumya Ranjan Nanda",
// // // // // // //   },
// // // // // // //   {
// // // // // // //     text: "Every time I wear my RajWatches watch, I get compliments. The weight, finish, and design scream luxury. It’s become my go-to accessory for both business meetings and evening events.",
// // // // // // //     name: "— Om Prakash Deo",
// // // // // // //   },
// // // // // // // ];

// // // // // // // const TestimonialSection = () => {
// // // // // // //   const [currentIndex, setCurrentIndex] = useState(0);

// // // // // // //   // Auto-slide every 4 seconds
// // // // // // //   useEffect(() => {
// // // // // // //     const interval = setInterval(() => {
// // // // // // //       setCurrentIndex((prev) => (prev + 1) % reviews.length);
// // // // // // //     }, 4000);
// // // // // // //     return () => clearInterval(interval);
// // // // // // //   }, []);

// // // // // // //   // Function to calculate which 3 cards to show
// // // // // // //   const getVisibleReviews = () => {
// // // // // // //     return [
// // // // // // //       reviews[currentIndex],
// // // // // // //       reviews[(currentIndex + 1) % reviews.length],
// // // // // // //       reviews[(currentIndex + 2) % reviews.length],
// // // // // // //     ];
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <section className="bg-gray-100 text-gray-800 py-16 px-6 overflow-hidden">
// // // // // // //       <div className="max-w-7xl mx-auto text-center">
// // // // // // //         <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-10">
// // // // // // //           What Our Customers Say
// // // // // // //         </h2>

// // // // // // //         {/* Slider Container */}
// // // // // // //         <div className="flex gap-6 justify-center transition-transform duration-700 ease-in-out">
// // // // // // //           {getVisibleReviews().map((review, index) => (
// // // // // // //             <div
// // // // // // //               key={index}
// // // // // // //               className="bg-white rounded-2xl shadow-lg p-8 w-80 md:w-96 relative"
// // // // // // //             >
// // // // // // //               <Quote className="w-8 h-8 text-gray-300 absolute top-6 left-6" />
// // // // // // //               <p className="text-gray-700 text-base leading-relaxed mt-4">
// // // // // // //                 {review.text}
// // // // // // //               </p>
// // // // // // //               <p className="mt-6 text-gray-900 font-semibold text-right">
// // // // // // //                 {review.name}
// // // // // // //               </p>
// // // // // // //             </div>
// // // // // // //           ))}
// // // // // // //         </div>

// // // // // // //         {/* Dots Indicator */}
// // // // // // //         <div className="flex justify-center mt-8 space-x-2">
// // // // // // //           {reviews.map((_, i) => (
// // // // // // //             <button
// // // // // // //               key={i}
// // // // // // //               onClick={() => setCurrentIndex(i)}
// // // // // // //               className={`w-3 h-3 rounded-full transition-all duration-300 ${
// // // // // // //                 i === currentIndex ? "bg-gray-800 scale-110" : "bg-gray-400"
// // // // // // //               }`}
// // // // // // //             ></button>
// // // // // // //           ))}
// // // // // // //         </div>
// // // // // // //       </div>
// // // // // // //     </section>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default TestimonialSection;
