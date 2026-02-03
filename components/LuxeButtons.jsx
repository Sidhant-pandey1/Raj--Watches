"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LuxeButtons({ product }) {
  const [added, setAdded] = useState(false);
  const router = useRouter();

  const handleAddToCart = () => {
    const prev = JSON.parse(localStorage.getItem("cart") || "[]");
    // Check if already in cart; update quantity if present
    const found = prev.find(item => item.id === product.id);
    if (found) {
      const newCart = prev.map(item =>
        item.id === product.id ? { ...item, qty: item.qty + 1 } : item
      );
      localStorage.setItem("cart", JSON.stringify(newCart));
    } else {
      localStorage.setItem("cart", JSON.stringify([...prev, { id: product.id, qty: 1 }]));
    }
    setAdded(true);
  };

  const handleBuyNow = () => {
    // Save only current product to localStorage and go to checkout
    localStorage.setItem("cart", JSON.stringify([{ id: product.id, qty: 1 }]));
    router.push(`/checkout?productId=${product.id}&buyNow=1`);
  };

  return (
  <div className="flex flex-col sm:flex-row gap-4 w-full mt-1">
    {/* Add to Cart */}
    <button
      className="
        relative
        bg-gradient-to-br from-[#b89f56] to-[#968144]
        text-white
        font-medium text-[0.9rem] sm:text-[0.95rem]
        py-3 px-8
        rounded-2xl
        shadow-[0_10px_20px_-5px_rgba(184,159,86,0.5),inset_0_1px_0_rgba(255,255,255,0.2)]
        border-none
        transition-all duration-300 ease-out
        uppercase tracking-[0.2em]
        hover:scale-[1.02] hover:shadow-[0_15px_30px_-5px_rgba(184,159,86,0.6),inset_0_1px_0_rgba(255,255,255,0.4)]
        active:scale-[0.98] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]
        disabled:opacity-70 disabled:grayscale
        flex-1
        overflow-hidden
        group
      "
      onClick={handleAddToCart}
      disabled={added}
    >
      <span className="relative z-10 drop-shadow-md">{added ? "Added" : "Add to Cart"}</span>
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </button>

    {/* Buy Now */}
    <button
      onClick={handleBuyNow}
      className="
        relative
        bg-gradient-to-br from-[#1a1a1a] to-[#000000]
        text-white
        font-medium text-[0.9rem] sm:text-[0.95rem]
        py-3 px-8
        rounded-2xl
        shadow-[0_10px_20px_-5px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.15)]
        border-none
        transition-all duration-300 ease-out
        uppercase tracking-[0.2em]
        hover:scale-[1.02] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.3)]
        active:scale-[0.98] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]
        flex items-center justify-center
        flex-1
        group
        overflow-hidden
      "
    >
      <span className="relative z-10 drop-shadow-md">Buy Now</span>
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </button>

    {/* Back to Shop */}
    <Link
      href={`/watches/category/all`}
      className="
        relative
        bg-white/40 backdrop-blur-md text-[#6e6856]
        border border-[#c2ab72]/40
        font-medium text-[0.85rem] sm:text-[0.9rem]
        py-3 px-6
        rounded-2xl
        shadow-[0_4px_15px_-3px_rgba(194,171,114,0.15)]
        transition-all duration-300 ease-out
        uppercase tracking-[0.2em]
        hover:bg-white/80 hover:text-[#4a4537] hover:border-[#b89f56] hover:shadow-[0_8px_20px_-3px_rgba(194,171,114,0.3)]
        active:scale-[0.98]
        flex items-center justify-center
        flex-1
      "
    >
      Back
    </Link>
  </div>
);
}