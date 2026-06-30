"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function Gallery({ images = [], productName = "Product Image" }) {
  const displayURLs = images.length > 0 ? images : ["/placeholder.jpg"];
  const [mainIdx, setMainIdx] = useState(0);
  const mainImage = displayURLs[mainIdx] || "/placeholder.jpg";

  return (
    <div className="w-full max-w-xl mx-auto xl:ml-auto">
      {/* Main Image */}
      <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-white border border-[#e5e7eb] shadow-sm mb-4 flex items-center justify-center">
        <Image
          src={mainImage}
          alt={productName}
          fill
          sizes="(max-width: 1280px) 100vw, 50vw"
          className="object-contain p-6"
          priority
        />
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
              width: 70,
              height: 70,
              display: "inline-flex",
              flex: "0 0 auto", // flex-none behavior
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              background: "transparent",
              borderRadius: "9999px",
              padding: 4,
              border: mainIdx === idx ? "2px solid #ac9247" : "1px solid rgba(0,0,0,0.04)",
              boxShadow: mainIdx === idx ? "0 6px 18px rgba(0,0,0,0.12)" : "0 4px 10px rgba(0,0,0,0.06)",
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
