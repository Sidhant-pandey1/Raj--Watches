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
    <div className="flex flex-col sm:flex-row gap-4 w-full">
      <button
        className="bg-[#c9a84c] text-white font-bold text-base py-3.5 px-8 rounded-lg shadow-sm hover:bg-[#a88b3a] transition-all duration-300 uppercase tracking-wider"
        onClick={handleAddToCart}
        disabled={added}
      >
        {added ? "Added to Cart" : "Add to Cart"}
      </button>
      <button
        onClick={handleBuyNow}
        className="bg-[#1a1a2e] text-white font-bold py-3.5 px-8 rounded-lg shadow-sm hover:bg-[#c9a84c] transition-all duration-300 uppercase tracking-wider flex items-center justify-center"
      >
        Buy Now
      </button>
      <Link
        href={`/watches/category/all`}
        className="bg-white text-[#1a1a2e] border-2 border-[#e5e7eb] font-bold py-3.5 px-8 rounded-lg hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all duration-300 uppercase tracking-wider flex items-center justify-center"
      >
        Back to Shop
      </Link>
    </div>
  );
}
