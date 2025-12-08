"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const HERO_IMAGE = {
  src: "/RajWatches.png", // Ensure this file is in your /public folder
  alt: "Rajwatches banner with multiple luxury watches, logo and tagline",
};

export default function HeroSlideshow() {
  return (
    <section className="relative h-[280px] sm:h-[420px] md:h-[520px] lg:h-[580px] w-full overflow-hidden">
      {/* Banner image - different sizing for mobile vs desktop */}
      {/* Mobile: contain to show full banner, Desktop: cover for full width */}
      <div
        className="absolute inset-0 w-full h-full hidden sm:block"
        style={{
          backgroundImage: `url('${HERO_IMAGE.src}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        aria-label={HERO_IMAGE.alt}
        role="img"
      >
        <div className="absolute inset-0 bg-black/10" />
      </div>
      
      {/* Mobile version - show full banner without cropping */}
      <div
        className="absolute inset-0 w-full h-full sm:hidden bg-gradient-to-b from-[#f5f0e6] to-[#e8dcc8]"
        aria-label={HERO_IMAGE.alt}
        role="img"
      >
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `url('${HERO_IMAGE.src}')`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      </div>
      
      {/* Button positioned - centered on mobile, bottom-right on desktop */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:bottom-22 sm:right-74 z-10">
        <Link
          href="/watches/category/all"
          className="inline-flex items-center justify-center px-5 py-2 sm:px-8 sm:py-3 rounded-full border-2 border-[#c2ab72] bg-[#c2ab72]/90 text-sm sm:text-lg font-semibold text-[#232323] shadow-lg hover:bg-[#c2ab72] transition-transform hover:scale-105"
        >
          EXPLORE NOW
          <ChevronRight className="ml-1 sm:ml-2 w-4 h-4 sm:w-5 sm:h-5" />
        </Link>
      </div>
    </section>
  );
}


// "use client";

// import React from "react";

// // The static path for your uploaded banner image (public/generated-image.jpg or direct URL)
// const HERO_IMAGE = {
//   src: "/generated-image.png", // Use this if you put the file in your public folder
//   alt: "Rajwatches banner with multiple luxury watches, logo and tagline",
// };

// export default function HeroSlideshow() {
//   return (
//     <section className="relative h-[420px] md:h-[520px] lg:h-[580px] w-full overflow-hidden">
//       {/* Banner image as hero background */}
//       <div
//         className="absolute inset-0 w-full h-full"
//         style={{
//           backgroundImage: `url('${HERO_IMAGE.src}')`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundRepeat: "no-repeat",
//         }}
//         aria-label={HERO_IMAGE.alt}
//         role="img"
//       >
//         {/* Optional: subtle overlay if needed */}
//         <div className="absolute inset-0 bg-black/10" />
//       </div>
//       {/* No extra overlays, buttons, or lines */}
//     </section>
//   );
// }


// "use client";

// import React from "react";
// import Link from "next/link";
// import { ChevronRight } from "lucide-react";

// // Use ONLY the perfect-fit banner generated for RajWatches
// const HERO_IMAGE = {
//   src: "https://user-gen-media-assets.s3.amazonaws.com/gemini_images/ebac2d71-d325-42c2-a2e6-3c58bc28adca.png",
//   alt: "RajWatches luxury hero banner, perfectly centered branding and watch",
// };

// export default function HeroSlideshow() {
//   return (
//     <section className="relative h-[420px] md:h-[520px] lg:h-[580px] w-full overflow-hidden">
//       {/* Full banner image as background */}
//       <div
//         className="absolute inset-0 w-full h-full"
//         style={{
//           backgroundImage: `url('${HERO_IMAGE.src}')`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundRepeat: "no-repeat",
//         }}
//         aria-label={HERO_IMAGE.alt}
//         role="img"
//       >
//         {/* OPTIONAL: subtle overlay for contrast */}
//         <div className="absolute inset-0 bg-black/20" />
//       </div>
      
//       {/* Overlay content if you still want a button or extra tagline */}
//       <div className="relative z-10 flex flex-col items-start px-6 md:px-28 py-16 h-full justify-center max-w-[700px]">
//         <p className="text-xl md:text-2xl text-[#ffd986] mb-8 font-light drop-shadow">
//           Crafted for those who appreciate elegance and precision.
//         </p>
//         <Link
//           href="/watches/category/all"
//           className="inline-flex items-center justify-center px-8 py-3 rounded-full border-2 border-[#c2ab72] bg-[#c2ab72]/90 text-lg font-semibold text-[#232323] shadow-lg hover:bg-[#c2ab72] transition-transform hover:scale-105"
//         >
//           EXPLORE NOW
//           <ChevronRight className="ml-2 w-5 h-5" />
//         </Link>
//       </div>
//     </section>
//   );
// }


// "use client";

// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import { ChevronRight } from "lucide-react";

// // Replace these URLs with your own luxury banner images if you host them elsewhere!
// const IMAGE_ARRAY = [
//   {
//      src: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=1200&q=80",
//     alt: "Luxury watch macro shot",
//     headline: (
//       <>
//         TITAN STELLAR
//         <br />
//         <span className="block text-3xl font-light tracking-wide leading-snug" style={{ letterSpacing: '0.04em' }}>
//           INSPIRED BY <span className="text-[#bfa666]">THE INFINITE</span>
//         </span>
//       </>
//     ),
//     subtext: "Wandering Hours – An automatic, celestial-inspired masterpiece.",
//     btnText: "EXPLORE NOW",
//     btnHref: "/watches/category/all",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1465101178521-c1e8ac2a7080?auto=format&fit=crop&w=1200&q=80",
//     alt: "Wall clocks and luxury home",
//     headline: (
//       <>
//         A Symphony of <span className="text-[#bfa666]">Style and Time</span>
//       </>
//     ),
//     subtext: "Fine wall clocks and decor for the elegant home.",
//     btnText: "EXPLORE NOW",
//     btnHref: "/watches/category/wallclocks",
//   },
// ];

// const ACCENT_OVERLAY = "rgba(194,171,114,0.13)";

// export default function HeroSlideshow({
//   imageArr = IMAGE_ARRAY,
//   interval = 6000, // 6 seconds for slow, elegant transitions
// }) {
//   const images = Array.isArray(imageArr) && imageArr.length > 0 ? imageArr : [];
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   // Carousel auto-transition effect
//   useEffect(() => {
//     if (images.length <= 1) return;
//     const slideInterval = setInterval(() => {
//       setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, interval);
//     return () => clearInterval(slideInterval);
//   }, [images, interval]);

//   if (!images.length) {
//     return (
//       <div className="relative h-[400px] md:h-[550px] lg:h-[700px] w-full bg-gray-200 flex items-center justify-center">
//         <p className="text-gray-600">Loading...</p>
//       </div>
//     );
//   }

//   const current = images[currentImageIndex];

//   return (
//     <section className="relative h-[520px] md:h-[650px] w-full overflow-hidden">
//       {/* Slide images with fade transitions */}
//       {images.map((item, idx) => (
//         <div
//           key={idx}
//           className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
//             idx === currentImageIndex ? "opacity-100 z-10" : "opacity-0 pointer-events-none z-0"
//           }`}
//         >
//           <div
//             className="absolute inset-0"
//             style={{
//               backgroundImage: `url('${item.src}')`,
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//               filter: "brightness(0.74)",
//             }}
//             aria-label={item.alt}
//             role="img"
//           />
//           {/* Gradient overlay */}
//           <div
//             className="absolute inset-0"
//             style={{
//               background: `linear-gradient(110deg, ${ACCENT_OVERLAY} 10%, #2d2d2dc3 90%)`,
//             }}
//           ></div>
//         </div>
//       ))}

//       {/* Slide navigation (dots/arrows) */}
//       <div className="absolute left-7 top-1/2 transform -translate-y-1/2 z-30 flex flex-col gap-3">
//         {images.length > 1 &&
//           images.map((_, idx) => (
//             <button
//               key={idx}
//               aria-label={`Go to slide ${idx + 1}`}
//               className={`w-4 h-4 rounded-full border-2 border-[#e6bb6a] transition ${
//                 idx === currentImageIndex
//                   ? "bg-[#e6bb6a] shadow-lg scale-125"
//                   : "bg-transparent"
//               }`}
//               onClick={() => setCurrentImageIndex(idx)}
//             ></button>
//           ))}
//       </div>

//       {/* Hero text overlay */}
//       <div className="relative z-20 flex flex-col items-start px-6 md:px-28 py-16 h-full justify-center max-w-[700px]">
//         <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-lg mb-7 leading-tight tracking-tight font-serif">
//           {current.headline}
//         </h1>
//         <p className="text-xl md:text-2xl text-[#ffd986] mb-8 max-w-2xl font-light drop-shadow">
//           {current.subtext}
//         </p>
//         <Link
//           href={current.btnHref}
//           className="inline-flex items-center justify-center px-8 py-3 rounded-full border-2 border-[#c2ab72] bg-[#c2ab72]/90 text-lg font-semibold text-[#232323] shadow-lg hover:bg-[#c2ab72] transition-transform hover:scale-105"
//         >
//           {current.btnText}
//           <ChevronRight className="ml-2 w-5 h-5" />
//         </Link>
//       </div>
//     </section>
//   );
// }














// // "use client";

// // import React, { useState, useEffect, useMemo } from "react";
// // import Link from "next/link";
// // import { ChevronRight } from "lucide-react";

// // const IMAGE_ARRAY = [
// //   { src: "https://ik.imagekit.io/rajstorage2/store_frontend/6.HEIC?tr=f-webp", alt: "Luxury Watch Image 1" },
// //   { src: "https://ik.imagekit.io/rajstorage2/store_frontend/1.HEIC?tr=f-webp", alt: "Luxury Watch Image 2" },
// //   { src: "https://ik.imagekit.io/rajstorage2/store_frontend/4.HEIC?tr=f-webp", alt: "Luxury Watch Image 3" },
// //   { src: "https://ik.imagekit.io/rajstorage2/store_frontend/5.HEIC?tr=f-webp", alt: "Luxury Watch Image 4" },
// //   { src: "https://ik.imagekit.io/rajstorage2/store_frontend/7.HEIC?tr=f-webp", alt: "Luxury Watch Image 5" },
// // ];

// // const ACCENT_OVERLAY = "rgba(194,171,114,0.15)";

// // export default function HeroSlideshow({ imageArr = IMAGE_ARRAY, interval = 5000 }) {
// //   const images = useMemo(() => Array.isArray(imageArr) && imageArr.length > 0 ? imageArr : [], [imageArr]);

// //   const [currentImageIndex, setCurrentImageIndex] = useState(0);

// //   useEffect(() => {
// //     if (images.length <= 1) return;

// //     const slideInterval = setInterval(() => {
// //       setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
// //     }, interval);

// //     return () => clearInterval(slideInterval);
// //   }, [images, interval]);

// //   if (images.length === 0) {
// //     return (
// //       <div className="relative h-[400px] md:h-[550px] lg:h-[700px] w-full bg-gray-200 flex items-center justify-center">
// //         <p className="text-gray-600">Loading...</p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="relative h-[400px] md:h-[550px] lg:h-[700px] w-full bg-gradient-to-br from-[#f5f6fa] to-[#ede6da] overflow-hidden flex items-center justify-center">
// //       {/* Background Slideshow Layer */}
// //       <div className="absolute inset-0 z-0">
// //         {images.map((image, index) => (
// //           <div
// //             key={index}
// //             style={{
// //               backgroundImage: `url(${image.src})`,
// //               backgroundSize: "cover",
// //               backgroundPosition: "center",
// //             }}
// //             className={`absolute inset-0 transition-opacity duration-1000 ${
// //               index === currentImageIndex ? "opacity-80" : "opacity-0 pointer-events-none"
// //             }`}
// //             role="img"
// //             aria-label={image.alt}
// //           >
// //             <div
// //               className="absolute inset-0"
// //               style={{
// //                 background: `linear-gradient(120deg, ${ACCENT_OVERLAY}, #fae7c1d0 70%)`,
// //               }}
// //             />
// //             <div className="absolute inset-0 bg-black/30" />
// //           </div>
// //         ))}
// //       </div>

// //       {/* Content Layer */}
// //       <div className="relative z-10 text-center text-[#232323] p-8 max-w-3xl drop-shadow-xl">
// //         <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-4 font-serif">
// //           Timeless Style, Modern Precision.
// //         </h1>
// //         <p className="mt-4 text-2xl font-light font-serif text-[#8a8a8a]">
// //           Explore the Titan family's finest collections. Authenticity guaranteed.
// //         </p>

// //         <Link
// //           href="/watches/category/all"
// //           className="mt-8 inline-flex items-center justify-center px-8 py-3 border-2 border-[#c2ab72] text-base font-semibold rounded-full shadow-lg text-[#232323] bg-[#c2ab72]/90 hover:bg-[#c2ab72] transition transform hover:scale-105"
// //         >
// //           Explore Raj Watches
// //           <ChevronRight className="w-5 h-5 ml-2" />
// //         </Link>
// //       </div>
// //     </div>
// //   );
// // }


// // // // "use client"

// // // // import React, { useState, useEffect, useMemo } from 'react';
// // // // // Assuming Link is from Next.js and ChevronRight is from lucide-react (or similar)
// // // // import Link from 'next/link'; 
// // // // import { ChevronRight } from 'lucide-react'; 

// // // // // 1. Define the image array with ImageKit transformations for browser compatibility.
// // // // // .HEIC files are not universally supported, so we request ImageKit to convert them to WebP (tr=f-webp).
// // // // const IMAGE_ARRAY = [
// // // //   { src: "https://ik.imagekit.io/rajstorage2/store_frontend/6.HEIC?tr=f-webp", alt: "Luxury Watch Image 1" },
// // // //   { src: "https://ik.imagekit.io/rajstorage2/store_frontend/1.HEIC?tr=f-webp", alt: "Luxury Watch Image 2" },
// // // //   { src: "https://ik.imagekit.io/rajstorage2/store_frontend/4.HEIC?tr=f-webp", alt: "Luxury Watch Image 3" },
// // // //   { src: "https://ik.imagekit.io/rajstorage2/store_frontend/5.HEIC?tr=f-webp", alt: "Luxury Watch Image 4" },
// // // //   { src: "https://ik.imagekit.io/rajstorage2/store_frontend/7.HEIC?tr=f-webp", alt: "Luxury Watch Image 5" }
// // // // ];

// // // // /**
// // // //  * A Hero component featuring a background slideshow for a striking visual effect.
// // // //  * It automatically cycles through the images in the provided array.
// // // //  */
// // // // export default function HeroSlideshow({ imageArr = IMAGE_ARRAY, interval = 5000 }) {
    
// // // //     // Safety check and memoization of the image array
// // // //     const images = useMemo(() => Array.isArray(imageArr) && imageArr.length > 0 ? imageArr : [], [imageArr]);

// // // //     // State to track the index of the currently visible image
// // // //     const [currentImageIndex, setCurrentImageIndex] = useState(0);

// // // //     // Effect to manage the slideshow interval
// // // //     useEffect(() => {
// // // //         // Stop if there is zero or one image
// // // //         if (images.length <= 1) return; 

// // // //         // Set up the interval for cycling images
// // // //         const slideInterval = setInterval(() => {
// // // //             setCurrentImageIndex(prevIndex => 
// // // //                 (prevIndex + 1) % images.length // Cycles from 0 to N-1 and then back to 0
// // // //             );
// // // //         }, interval);

// // // //         // Cleanup function to clear the interval when the component unmounts
// // // //         return () => clearInterval(slideInterval);
// // // //     }, [images, interval]); 

// // // //     // Optional: Render a fallback if no images are available
// // // //     if (images.length === 0) {
// // // //         return (
// // // //             <div className="relative h-[400px] md:h-[550px] lg:h-[700px] w-full bg-gray-200 flex items-center justify-center">
// // // //                 <p className="text-gray-600">Loading...</p>
// // // //             </div>
// // // //         );
// // // //     }

// // // //     return (
// // // //         <div className="relative h-[400px] md:h-[550px] lg:h-[700px] w-full bg-gradient-to-br from-indigo-50 to-white overflow-hidden flex items-center justify-center">
            
// // // //             {/* Background Slideshow Layer */}
// // // //             <div className="absolute inset-0 z-0">
// // // //                 {images.map((image, index) => (
// // // //                     <div 
// // // //                         key={index}
// // // //                         // Set the background image and cover properties
// // // //                         style={{ 
// // // //                             backgroundImage: `url(${image.src})`, 
// // // //                             backgroundSize: 'cover', 
// // // //                             backgroundPosition: 'center',
// // // //                         }}
// // // //                         // Apply position, transition, and dynamic opacity
// // // //                         className={`
// // // //                             absolute inset-0 
// // // //                             transition-opacity duration-1000 ease-in-out 
// // // //                             ${index === currentImageIndex ? 'opacity-70' : 'opacity-0 pointer-events-none'}
// // // //                         `}
// // // //                         role="img"
// // // //                         aria-label={image.alt}
// // // //                     >
// // // //                         {/* Dark Overlay for better text readability */}
// // // //                         <div className="absolute inset-0 bg-black/40"></div>
// // // //                     </div>
// // // //                 ))}
// // // //             </div>

// // // //             {/* Content Layer (Remains unchanged) */}
// // // //             <div className="relative z-10 text-center text-white p-6 max-w-4xl">
// // // //                 <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight drop-shadow-lg leading-tight">
// // // //                     Timeless Style, Modern Precision.
// // // //                 </h1>
// // // //                 <p className="mt-4 text-lg sm:text-xl font-light drop-shadow-md">
// // // //                     Explore the Titan family's finest collections. Authenticity guaranteed.
// // // //                 </p>
// // // //                 <Link 
// // // //                     href="/watches/category/all" 
// // // //                     className="mt-8 inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-gray-600 hover:bg-gray-700 transition duration-300 transform hover:scale-[1.02]"
// // // //                 >
// // // //                     Explore Raj Watches
// // // //                     <ChevronRight className="w-5 h-5 ml-2" />
// // // //                 </Link>
// // // //             </div>
// // // //         </div>
// // // //     );
// // // // }

