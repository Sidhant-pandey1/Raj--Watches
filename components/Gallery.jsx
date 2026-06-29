"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function Gallery({ images = [], productName = "Product Image" }) {
  const [mainImage, setMainImage] = useState(images[0] || "/placeholder.jpg");

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

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto custom-scrollbar pb-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setMainImage(img)}
              className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                mainImage === img 
                  ? "border-[#c9a84c] shadow-md" 
                  : "border-[#e5e7eb] hover:border-[#a88b3a]"
              }`}
            >
              <Image
                src={img}
                alt={`${productName} thumbnail ${idx + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
