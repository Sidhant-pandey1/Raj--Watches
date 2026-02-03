// /components/Gallery.jsx
"use client";
import { useState } from "react";
import Image from "next/image";

export default function Gallery({ images = [], productName = "product" }) {
  const [mainIdx, setMainIdx] = useState(0);
  const imageURLs = (Array.isArray(images) ? images : []).filter(Boolean);

  // local debug fallback (optional)
  const DEBUG_LOCAL_IMAGE = "/mnt/data/Screenshot 2025-11-24 at 15.32.07.png";
  const displayURLs = imageURLs.length ? imageURLs : [DEBUG_LOCAL_IMAGE];

  return (
    <div className="flex flex-col items-center">
      {/* Main image (unchanged) */}
      <div
        className="bg-white shadow-xl rounded-3xl mb-6 p-6 flex items-center justify-center overflow-hidden w-full max-w-[400px] aspect-[4/5] relative"
      >
        <div className="relative w-full h-full">
          <Image
            src={displayURLs[mainIdx]}
            alt={`${productName} - ${mainIdx + 1}`}
            fill
            sizes="(max-width: 640px) 90vw, 420px"
            className="rounded-xl object-contain"
            unoptimized={false}
          />
        </div>
      </div>

      {/* Thumbnails: button is a fixed flex-none box, image has min/max width */}
      <div className="flex gap-4">
        {displayURLs.map((url, idx) => (
          <button
            key={idx}
            onClick={() => setMainIdx(idx)}
            aria-label={`Show image ${idx + 1}`}
            type="button"
            // enforce fixed footprint on the button (avoid parent's flex resizing)
            style={{
              width: 60,
              height: 60,
              display: "inline-flex",
              flex: "0 0 auto", 
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              background: "transparent",
              borderRadius: "50%",
              padding: 3,
              border: mainIdx === idx ? "2px solid #ac9247" : "1px solid rgba(0,0,0,0.05)",
              boxShadow: mainIdx === idx ? "0 4px 12px rgba(172, 146, 71, 0.3)" : "none",
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
          >
            <img
              src={url}
              alt={`${productName} thumb ${idx + 1}`}
              width={62}
              height={62}
              // force min/max width so stylesheet can't collapse it to 0
              style={{
                width: "62px",
                minWidth: "62px",
                maxWidth: "62px",
                height: "62px",
                objectFit: "cover",
                borderRadius: "9999px",
                display: "block",
                background: "transparent",
                opacity: 1,
                filter: "none",
                mixBlendMode: "normal",
                // ensure image paints even if stylesheet used width:0 !important
                // (inline styles here should win unless stylesheet used !important)
              }}
              loading="lazy"
              decoding="async"
              onError={(e) => {
                console.error("Thumbnail failed to load:", url);
                e.currentTarget.style.background = "#f3f0ea";
                e.currentTarget.src = ""; // remove broken src to avoid broken icon
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}


// // /components/Gallery.jsx
// "use client";
// import { useState } from "react";
// import Image from "next/image";

// /**
//  * Gallery - client component
//  * - images: array of string URLs
//  * - productName: string
//  *
//  * Thumbnails use plain <img> for robust rendering and easier debugging.
//  * Main image uses next/image with fixed container to avoid width/height warnings.
//  */
// export default function Gallery({ images = [], productName = "product" }) {
//   const [mainIdx, setMainIdx] = useState(0);

//   // Ensure images is an array of strings and filter out falsy
//   const imageURLs = (Array.isArray(images) ? images : []).filter(Boolean);

//   // If no images, for debugging use the uploaded screenshot path (developer-provided)
//   // Note: in your environment this path may or may not be served by Next.
//   // It's only a temporary debug fallback.
//   const DEBUG_LOCAL_IMAGE = "/mnt/data/Screenshot 2025-11-24 at 15.32.07.png";
//   const displayURLs = imageURLs.length ? imageURLs : [DEBUG_LOCAL_IMAGE];

//   return (
//     <div className="flex flex-col items-center">
//       {/* Main image container (fixed size for consistent layout) */}
//       <div
//         className="bg-white shadow-lg rounded-3xl mb-6 p-4 flex items-center justify-center overflow-hidden"
//         style={{ width: 420, height: 480 }}
//       >
//         <div className="relative w-full h-full">
//           {/* Use next/image to benefit from optimization for supported hosts */}
//           <Image
//             src={displayURLs[mainIdx]}
//             alt={`${productName} - ${mainIdx + 1}`}
//             fill
//             sizes="(max-width: 640px) 90vw, 420px"
//             className="rounded-xl object-contain"
//             // Remove priority to avoid preload warnings
//             // If Next complains about remote host, ensure next.config.js allows the host
//             onError={(e) => {
//               // next/image doesn't expose a direct onError in some Next versions;
//               // this will log to the console for debugging in dev builds
//               // (browsers won't show anything here).
//               console.error("Main image load error:", displayURLs[mainIdx]);
//             }}
//             unoptimized={false}
//           />
//         </div>
//       </div>

//       {/* Thumbnails */}
//       <div className="flex gap-4">
//         {displayURLs.map((url, idx) => (
//           <button
//             key={idx}
//             onClick={() => setMainIdx(idx)}
//             aria-label={`Show image ${idx + 1}`}
//             type="button"
//             className={`rounded-full p-1 transition-all focus:outline-none ${
//               mainIdx === idx ? "ring-2 ring-[#ac9247] shadow-lg" : "ring-1 ring-transparent hover:shadow-md"
//             }`}
//             style={{
//               width: 70,
//               height: 70,
//               display: "inline-flex",
//               alignItems: "center",
//               justifyContent: "center",
//               overflow: "hidden",
//               background: "#fff",
//             }}
//           >
//             {/* Plain img for thumbnails (explicit width/height + objectFit) */}
//             <img
//               src={url}
//               alt={`${productName} thumb ${idx + 1}`}
//               width={62}
//               height={62}
//               style={{
//                 width: "62px",
//                 height: "62px",
//                 objectFit: "cover",
//                 borderRadius: "9999px",
//                 display: "block",
//                 background: "#fff",
//               }}
//               onError={(e) => {
//                 // visually indicate broken thumbnail during debugging
//                 e.currentTarget.style.background = "#f3f0ea";
//                 e.currentTarget.src = ""; // remove broken src to avoid browser broken image icon
//                 console.error("Thumbnail failed to load:", url);
//               }}
//             />
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import Image from "next/image";

// export default function Gallery({ images, productName }) {
//   const [mainIdx, setMainIdx] = useState(0);
//   const imageURLs = (images || []).filter(Boolean);

//   return (
//     <div className="flex flex-col items-center">
//       {/* Main image stays as Next.js Image for optimization */}
//       <div className="bg-white shadow-lg rounded-3xl mb-6 p-4 w-[420px] h-[480px] flex items-center justify-center">
//         {imageURLs.length > 0 ? (
//           <Image
//             src={imageURLs[mainIdx]}
//             alt={productName}
//             width={370}
//             height={420}
//             className="rounded-xl object-contain transition-shadow"
//           />
//         ) : (
//           <div className="w-[360px] h-[410px] flex items-center justify-center text-gray-400 text-lg bg-gray-100 rounded-xl">
//             No Image
//           </div>
//         )}
//       </div>

//       {/* Thumbnails as plain img tags */}
//       <div className="flex gap-4">
//         {imageURLs.map((img, idx) => (
//           <button
//             key={idx}
//             onClick={() => setMainIdx(idx)}
//             className={`bg-white border rounded-full p-1 shadow transition-all ${
//               mainIdx === idx
//                 ? "border-[#ac9247] shadow-lg"
//                 : "border-[#ece6d4] opacity-80 hover:shadow-md"
//             }`}
//             style={{ width: 70, height: 70, overflow: "hidden" }}
//             aria-label={`Show image ${idx + 1}`}
//             type="button"
//           >
//             <img
//               src={img}
//               alt={productName + " thumb " + idx}
//               width={62}
//               height={62}
//               style={{
//                 width: "62px",
//                 height: "62px",
//                 objectFit: "cover",
//                 borderRadius: "9999px",
//                 background: "#fff",
//                 display: "block",
//               }}
//             />
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import Image from "next/image";

// /**
//  * Gallery component
//  * - Accepts `images` (array of strings) and `productName`
//  * - Auto-converts ImageKit HEIC URLs to webp by appending `?tr=f-webp`
//  * - Uses next/image fill for the main image to avoid Next warnings
//  * - Uses plain <img> for thumbnails (explicit width/height) for robust fallback
//  *
//  * Usage:
//  * <Gallery images={imageUrls} productName={product.name} />
//  *
//  * Debug tip: enable the console.log below to inspect final URLs.
//  */
// export default function Gallery({ images = [], productName = "product" }) {
//   const [mainIdx, setMainIdx] = useState(0);

//   // normalize input to array of strings
//   const raw = Array.isArray(images) ? images : [];
//   const imageURLs = raw
//     .filter(Boolean)
//     .map((u) => {
//       if (typeof u !== "string") return String(u);
//       try {
//         // If ImageKit URL and source file is HEIC, append conversion parameter
//         // (ImageKit supports tr=f-webp). This makes HEIC images viewable in browsers.
//         const stripped = u.split("?")[0];
//         if (/ik\.imagekit\.io/i.test(u) && /\.heic$/i.test(stripped)) {
//           // preserve existing querystring if present
//           return u.includes("?") ? `${u}&tr=f-webp` : `${u}?tr=f-webp`;
//         }
//         // Some hosts may already return a browser friendly format - return as-is
//         return u;
//       } catch (err) {
//         return u;
//       }
//     });

// // Debug: enable to inspect final URLs in browser console
// // console.log("Gallery final imageURLs:", imageURLs);

//   // if nothing to show, render a neat placeholder
//   if (!imageURLs.length) {
//     return (
//       <div className="flex flex-col items-center">
//         <div
//           className="bg-white shadow-lg rounded-3xl mb-6 p-4 flex items-center justify-center"
//           style={{ width: 420, height: 480 }}
//         >
//           <div className="w-[360px] h-[410px] flex items-center justify-center text-gray-400 text-lg bg-gray-100 rounded-xl">
//             No Image
//           </div>
//         </div>

//         <div className="flex gap-4">
//           {/* helpful hint for manual testing */}
//           <div className="text-sm text-gray-500">No thumbnails available</div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col items-center">
//       {/* Main image container: fixed size box with relative for next/image fill */}
//       <div
//         className="bg-white shadow-lg rounded-3xl mb-6 p-4 flex items-center justify-center"
//         style={{ width: 420, height: 480 }}
//       >
//         <div className="relative w-full h-full">
//           <Image
//             src={imageURLs[mainIdx]}
//             alt={`${productName} - ${mainIdx + 1}`}
//             fill
//             sizes="(max-width: 640px) 90vw, 420px"
//             className="rounded-xl object-contain"
//             priority
//             // If you still have trouble with a particular host while debugging,
//             // you can add the `unoptimized` prop temporarily:
//             // unoptimized
//           />
//         </div>
//       </div>

//       {/* Thumbnails (use plain <img> for easier diagnostics) */}
//       <div className="flex gap-4">
//         {imageURLs.map((img, idx) => (
//           <button
//             key={idx}
//             onClick={() => setMainIdx(idx)}
//             aria-label={`Show image ${idx + 1}`}
//             type="button"
//             className={`rounded-full p-1 transition-all focus:outline-none ${
//               mainIdx === idx ? "ring-2 ring-[#ac9247] shadow-lg" : "ring-1 ring-transparent hover:shadow-md"
//             }`}
//             style={{
//               width: 70,
//               height: 70,
//               display: "inline-flex",
//               alignItems: "center",
//               justifyContent: "center",
//               overflow: "hidden",
//               background: "#fff",
//             }}
//           >
//             <img
//               src={img}
//               alt={`${productName} thumb ${idx + 1}`}
//               width={62}
//               height={62}
//               style={{
//                 width: "62px",
//                 height: "62px",
//                 objectFit: "cover",
//                 borderRadius: "9999px",
//                 display: "block",
//                 background: "#fff",
//               }}
//               onError={(e) => {
//                 // helpful fallback: show a light placeholder if thumbnail fails
//                 e.currentTarget.style.background = "#f3f0ea";
//                 e.currentTarget.src = ""; // remove broken src
//               }}
//             />
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }


// "use client";
// import { useState } from "react";
// import Image from "next/image";

// export default function Gallery({ images, productName }) {
//   const [mainIdx, setMainIdx] = useState(0);
//   const imageURLs = (images || []).filter(Boolean);

//   return (
//     <div className="flex flex-col items-center">
//       {/* Main image stays as Next.js Image for optimization */}
//       <div className="bg-white shadow-lg rounded-3xl mb-6 p-4 w-[420px] h-[480px] flex items-center justify-center">
//         {imageURLs.length > 0 ? (
//           <Image
//             src={imageURLs[mainIdx]}
//             alt={productName}
//             width={370}
//             height={420}
//             className="rounded-xl object-contain transition-shadow"
//             priority
//           />
//         ) : (
//           <div className="w-[360px] h-[410px] flex items-center justify-center text-gray-400 text-lg bg-gray-100 rounded-xl">
//             No Image
//           </div>
//         )}
//       </div>
//       {/* Thumbnails as plain img tags */}
//       <div className="flex gap-4">
//         {imageURLs.map((img, idx) => (
//           <button
//             key={img || idx}
//             onClick={() => setMainIdx(idx)}
//             className={`bg-white border rounded-full p-1 shadow transition-all ${
//               mainIdx === idx
//                 ? "border-[#ac9247] shadow-lg"
//                 : "border-[#ece6d4] opacity-80 hover:shadow-md"
//             }`}
//             style={{ width: 70, height: 70, overflow: "hidden" }}
//             aria-label={`Show image ${idx + 1}`}
//             type="button"
//           >
//             <img
//               src={img}
//               alt={productName + " thumb " + idx}
//               width={62}
//               height={62}
//               style={{
//                 width: "62px",
//                 height: "62px",
//                 objectFit: "cover",
//                 borderRadius: "9999px",
//                 background: "#fff",
//                 display: "block",
//               }}
//             />
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

// // "use client";
// // import { useState } from "react";
// // import Image from "next/image";

// // export default function Gallery({ images, productName }) {
// //   const [mainIdx, setMainIdx] = useState(0);
// //   const imageURLs = (images || []).filter(Boolean);

// //   return (
// //     <div className="flex flex-col items-center">
// //       <div className="bg-white shadow-lg rounded-3xl mb-6 p-4 w-[420px] h-[480px] flex items-center justify-center">
// //         {imageURLs.length > 0 ? (
// //           <Image
// //             src={imageURLs[mainIdx]}
// //             alt={productName}
// //             width={370}
// //             height={420}
// //             className="rounded-xl object-contain transition-shadow"
// //             priority
// //           />
// //         ) : (
// //           <div className="w-[360px] h-[410px] flex items-center justify-center text-gray-400 text-lg bg-gray-100 rounded-xl">
// //             No Image
// //           </div>
// //         )}
// //       </div>
// //       <div className="flex gap-4">
// //         {imageURLs.map((img, idx) => (
// //           <button
// //             key={img || idx}
// //             onClick={() => setMainIdx(idx)}
// //             className={`bg-white border rounded-full p-1 shadow transition-all ${
// //               mainIdx === idx
// //                 ? "border-[#ac9247] shadow-lg"
// //                 : "border-[#ece6d4] opacity-80 hover:shadow-md"
// //             }`}
// //             style={{ width: 70, height: 70, overflow: "hidden" }}
// //             aria-label={`Show image ${idx + 1}`}
// //             type="button"
// //           >
// //             {/* Use regular img for thumbnail debug */}
// //             <img
// //               src={img}
// //               alt={productName + " thumb " + idx}
// //               style={{
// //                 width: "62px",
// //                 height: "62px",
// //                 objectFit: "cover",
// //                 borderRadius: "9999px",
// //                 background: "#fff",
// //                 display: "block",
// //               }}
// //             />
// //           </button>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // // "use client";
// // // import { useState } from "react";
// // // import Image from "next/image";

// // // export default function Gallery({ images, productName }) {
// // //   const [mainIdx, setMainIdx] = useState(0);
// // //   const imageURLs = (images || []).filter(Boolean);

// // //   return (
// // //     <div className="flex flex-col items-center">
// // //       {/* Main product image */}
// // //       <div className="bg-white shadow-lg rounded-3xl mb-6 p-4 w-[420px] h-[480px] flex items-center justify-center">
// // //         {imageURLs.length > 0 ? (
// // //           <Image
// // //             src={imageURLs[mainIdx]}
// // //             alt={productName}
// // //             width={370}
// // //             height={420}
// // //             className="rounded-xl object-contain transition-shadow"
// // //             priority
// // //           />
// // //         ) : (
// // //           <div className="w-[360px] h-[410px] flex items-center justify-center text-gray-400 text-lg bg-gray-100 rounded-xl">
// // //             No Image
// // //           </div>
// // //         )}
// // //       </div>
// // //       {/* Thumbnails */}
// // //       <div className="flex gap-4">
// // //         {imageURLs.map((img, idx) => (
// // //           <button
// // //             key={img || idx}
// // //             onClick={() => setMainIdx(idx)}
// // //             className={`bg-white border rounded-full p-1 shadow transition-all ${
// // //               mainIdx === idx
// // //                 ? "border-[#ac9247] shadow-lg"
// // //                 : "border-[#ece6d4] opacity-80 hover:shadow-md"
// // //             }`}
// // //             style={{ width: 70, height: 70, overflow: "hidden" }}
// // //             aria-label={`Show image ${idx + 1}`}
// // //             type="button"
// // //           >
// // //             <Image
// // //               src={img}
// // //               alt={productName + " thumb " + idx}
// // //               width={62}
// // //               height={62}
// // //               className="object-cover rounded-full bg-white w-[62px] h-[62px]"
// // //               style={{ width: 62, height: 62, objectFit: "cover" }}
// // //             />
// // //           </button>
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // // "use client";
// // // // import { useState } from "react";
// // // // import Image from "next/image";

// // // // export default function Gallery({ images, productName }) {
// // // //   const [mainIdx, setMainIdx] = useState(0);
// // // //   const imageURLs = (images || []).filter(Boolean);

// // // //   return (
// // // //     <div className="flex flex-col items-center">
// // // //       <div className="bg-white shadow-lg rounded-3xl mb-6 p-4 w-[420px] h-[480px] flex items-center justify-center">
// // // //         {imageURLs.length > 0 ? (
// // // //           <Image
// // // //             src={imageURLs[mainIdx]}
// // // //             alt={productName}
// // // //             width={370}
// // // //             height={420}
// // // //             className="rounded-xl object-contain transition-shadow"
// // // //             priority
// // // //           />
// // // //         ) : (
// // // //           <div className="w-[360px] h-[410px] flex items-center justify-center text-gray-400 text-lg bg-gray-100 rounded-xl">
// // // //             No Image
// // // //           </div>
// // // //         )}
// // // //       </div>
// // // //       <div className="flex gap-4">
// // // //         {imageURLs.map((img, idx) => (
// // // //           <button
// // // //             key={img || idx}
// // // //             onClick={() => setMainIdx(idx)}
// // // //             className={`bg-white border rounded-full p-1 shadow transition-all ${
// // // //               mainIdx === idx
// // // //                 ? "border-[#ac9247] shadow-lg"
// // // //                 : "border-[#ece6d4] opacity-80 hover:shadow-md"
// // // //             }`}
// // // //             style={{ width: 70, height: 70 }}
// // // //             aria-label={`Show image ${idx + 1}`}
// // // //             type="button"
// // // //           >
// // // //             <Image
// // // //               src={img}
// // // //               alt={productName + " thumb " + idx}
// // // //               width={62}
// // // //               height={62}
// // // //               className="object-cover rounded-full bg-white"
// // // //               unoptimized={false}
// // // //             />
// // // //           </button>
// // // //         ))}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // "use client";
// // // // import { useState } from "react";
// // // // import Image from "next/image";

// // // // export default function Gallery({ images, productName }) {
// // // //   console.log("Gallery received images:", images);
// // // //   const [mainIdx, setMainIdx] = useState(0);
// // // //   const imageURLs = (images || []).filter(Boolean);

// // // //   return (
// // // //     <div className="flex flex-col items-center">
// // // //       <div className="bg-white shadow-lg rounded-3xl mb-6 p-4 w-[420px] h-[480px] flex items-center justify-center">
// // // //         {imageURLs.length > 0 ? (
// // // //           <Image
// // // //             src={imageURLs[mainIdx]}
// // // //             alt={productName}
// // // //             width={370}
// // // //             height={420}
// // // //             className="rounded-xl object-contain transition-shadow"
// // // //             priority
// // // //           />
// // // //         ) : (
// // // //           <div className="w-[360px] h-[410px] flex items-center justify-center text-gray-400 text-lg bg-gray-100 rounded-xl">
// // // //             No Image
// // // //           </div>
// // // //         )}
// // // //       </div>
// // // //       <div className="flex gap-4">
// // // //         {imageURLs.map((img, idx) => (
// // // //           <button
// // // //             key={img || idx}
// // // //             onClick={() => setMainIdx(idx)}
// // // //             className={`bg-white border rounded-full p-1 shadow transition-all ${
// // // //               mainIdx === idx
// // // //                 ? "border-[#ac9247] shadow-lg"
// // // //                 : "border-[#ece6d4] opacity-80 hover:shadow-md"
// // // //             }`}
// // // //             style={{ width: 70, height: 70 }}
// // // //             aria-label={`Show image ${idx + 1}`}
// // // //             type="button"
// // // //           >
// // // //             {img ? (
// // // //               <Image
// // // //                 src={img}
// // // //                 alt={productName + " thumb " + idx}
// // // //                 width={62}
// // // //                 height={62}
// // // //                 className="object-cover rounded-full"
// // // //               />
// // // //             ) : (
// // // //               <div className="w-[62px] h-[62px] bg-gray-200 rounded-full"></div>
// // // //             )}
// // // //           </button>
// // // //         ))}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }




// // // // "use client";
// // // // import { useState } from "react";
// // // // import Image from "next/image";

// // // // export default function Gallery({ images, productName }) {
// // // //   const [mainIdx, setMainIdx] = useState(0);
// // // //   return (
// // // //     <div className="flex flex-col items-center">
// // // //       <div className="bg-white shadow-lg rounded-3xl mb-6 p-4 w-[420px] h-[480px] flex items-center justify-center">
// // // //         {images && images.length ? (
// // // //           <Image
// // // //             src={images[mainIdx]}
// // // //             alt={productName}
// // // //             width={370}
// // // //             height={420}
// // // //             className="rounded-xl object-contain transition-shadow"
// // // //             priority
// // // //           />
// // // //         ) : (
// // // //           <div className="w-[360px] h-[410px] flex items-center justify-center text-gray-400 text-lg bg-gray-100 rounded-xl">
// // // //             No Image
// // // //           </div>
// // // //         )}
// // // //       </div>
// // // //       <div className="flex gap-4">
// // // //         {images.map((img, idx) => (
// // // //           <button
// // // //             key={idx}
// // // //             onClick={() => setMainIdx(idx)}
// // // //             className={`bg-white border rounded-xl p-1 shadow transition-all ${
// // // //               mainIdx === idx
// // // //                 ? "border-[#ac9247] shadow-lg"
// // // //                 : "border-[#ece6d4] opacity-80 hover:shadow-md"
// // // //             }`}
// // // //             style={{ width: 80, height: 80 }}
// // // //             aria-label={`Show image ${idx + 1}`}
// // // //           >
// // // //             <Image src={img} alt={productName + " thumb"} width={70} height={70} className="object-cover rounded-lg" />
// // // //           </button>
// // // //         ))}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }