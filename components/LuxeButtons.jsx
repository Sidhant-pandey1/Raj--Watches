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
    <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm mt-2">
      <button
        className="flex-1 bg-white text-[#1a1a2e] border border-[#e5e7eb] text-[11px] sm:text-xs font-bold py-3 px-6 rounded-md hover:border-[#c9a84c] hover:text-[#c9a84c] hover:shadow-md transition-all duration-300 uppercase tracking-[0.15em] flex items-center justify-center text-center"
        onClick={handleAddToCart}
        disabled={added}
      >
        {added ? "Added" : "Add to Cart"}
      </button>
      <button
        onClick={handleBuyNow}
        className="flex-1 bg-[#1a1a2e] text-white text-[11px] sm:text-xs font-bold py-3 px-6 rounded-md shadow hover:shadow-lg hover:-translate-y-0.5 hover:bg-[#c9a84c] transition-all duration-400 uppercase tracking-[0.15em] flex items-center justify-center text-center"
      >
        Buy Now
      </button>
    </div>
  );
}
