"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingBag, Heart } from "lucide-react";
import useWishlist from "@/components/useWishlist"; // adjust path if needed

const RupeeSign = ({ className = "text-sm" }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M7 11.5H5.5V13H7V14H5.5V15.5H7V17H8.5V15.5H12C13.6569 15.5 15 14.1569 15 12.5C15 10.8431 13.6569 9.5 12 9.5H8.5V8H15V6.5H8.5V5H7V6.5H5.5V8H7V9.5H12C12.8284 9.5 13.5 10.1716 13.5 11C13.5 11.8284 12.8284 12.5 12 12.5H8.5V14H7V14.5H8.5V15.5H7V17H5.5V15.5H7V14.5H5.5V13H7V11.5Z" />
  </svg>
);

function SingleWatch({ watch }) {
  const images = Array.isArray(watch.images) ? watch.images : [];
  const [currentIndex, setCurrentIndex] = useState(0);

  const { wishlist, toggleWishlist } = useWishlist();
  const isWishlisted = wishlist.some(item => item.id === watch.id);

  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [images]);

  const rating = Math.floor(Math.random() * 2 + 4); // Between 4-5 stars
  const formatPrice = (price) => new Intl.NumberFormat("en-IN").format(price);

  // ALWAYS use the original price (watch.price)
  const original = Number(watch.price ?? 0);

  return (
    <Link
      href={`/watches/product/${watch.id}`}
      className="group product-card bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.04] transition-all duration-500 overflow-hidden flex flex-col border-2 border-transparent hover:border-[#c2ab72] cursor-pointer relative"
    >
      {/* Wishlist Icon */}
      <button
        type="button"
        aria-label="Add to wishlist"
        className={`absolute top-3 right-3 z-20 p-2 rounded-full shadow-md transition ${
          isWishlisted
            ? "bg-[#c2ab72] text-white"
            : "bg-white text-[#c2ab72] hover:bg-[#c2ab72] hover:text-white"
        }`}
        onClick={(e) => {
          e.preventDefault(); // prevent link navigation
          toggleWishlist(watch);
        }}
      >
        <Heart
          size={18}
          fill={isWishlisted ? "#c2ab72" : "none"}
          color={isWishlisted ? "#fff" : "#c2ab72"}
        />
      </button>

      {/* Images with slider */}
      <div className="relative overflow-hidden h-64 rounded-t-2xl bg-[#c2ab72]/10">
        {images.map((img, index) => (
          <Image
            key={index}
            src={img || "/placeholder.jpg"}
            alt={watch.name}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              index === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          />
        ))}
      </div>

      {/* Product Info */}
      <div className="p-5 flex flex-col gap-2">
        <p className="text-xs font-semibold text-[#c2ab72] uppercase">{watch.brand}</p>
        <h3 className="text-lg font-bold text-[#232323] truncate">{watch.name}</h3>

        {/* Ratings */}
        <div className="flex items-center gap-1 mt-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < rating ? "text-[#c2ab72] fill-[#c2ab72]" : "text-gray-300"
              }`}
            />
          ))}
          <span className="text-xs text-gray-500 ml-1">{rating.toFixed(1)}</span>
        </div>

        {/* Price and Add to Cart button */}
        <div className="flex items-center justify-between mt-3">
          <span className="font-bold text-xl flex items-center text-[#232323]">
            <RupeeSign className="w-5 h-5 mr-1" />
            {formatPrice(original)}
          </span>

          <button
            onClick={(e) => {
              e.preventDefault();
              // Add to cart action
              console.log(`Added ${watch.id} to cart`);
            }}
            className="flex items-center bg-[#c2ab72] text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#232323] hover:text-[#c2ab72] hover:ring-2 hover:ring-[#c2ab72] transition shadow-md"
          >
            <ShoppingBag size={16} className="mr-2" /> Add
          </button>
        </div>
      </div>
    </Link>
  );
}

export default function RandomProductGrid({ watches = [] }) {
  if (!watches || watches.length === 0) return null;

  // Pick 4 random watches
  const shuffled = [...watches].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 4);

  return (
    <div className="py-12 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {selected.map((watch) => (
          <SingleWatch key={watch.id} watch={watch} />
        ))}
      </div>
    </div>
  );
}
