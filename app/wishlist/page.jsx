// app/wishlist/page.jsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import useWishlist from "@/components/useWishlist"; // adjust path if your components folder is elsewhere

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist(); // your hook that returns stored items
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Normalize wishlist to product objects. The hook may store full product objects
  // or (sometimes) only product ids — this code supports both.
  useEffect(() => {
    let mounted = true;
    async function loadProducts() {
      setLoading(true);
      try {
        const resolved = await Promise.all(
          (wishlist || []).map(async (entry) => {
            // if it's an object with id & name, assume it's a product object
            if (entry && typeof entry === "object" && entry.id) return entry;

            // if it's a string or number treat it as an id and attempt to fetch product details
            const id = String(entry);
            try {
              const res = await fetch(`/api/products/${encodeURIComponent(id)}`);
              if (!res.ok) return null;
              const data = await res.json();
              return data;
            } catch {
              return null;
            }
          })
        );

        if (!mounted) return;
        setProducts(resolved.filter(Boolean));
      } finally {
        if (mounted) setLoading(false);
      }
    }

    if ((wishlist || []).length) loadProducts();
    else setProducts([]);

    return () => {
      mounted = false;
    };
  }, [wishlist]);

  if (loading) {
    return (
      <main className="max-w-6xl mx-auto px-5 sm:px-8 py-10 bg-[#faf9f6] min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-[#1a1a2e]" style={{ fontFamily: "'Outfit', sans-serif" }}>Your Wishlist</h1>
        <div className="text-[#6b7280]">Loading wishlist…</div>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-5 sm:px-8 py-10 bg-[#faf9f6] min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-[#1a1a2e]" style={{ fontFamily: "'Outfit', sans-serif" }}>Your Wishlist</h1>

      {(!products || products.length === 0) ? (
        <div className="text-[#6b7280]">
          Your wishlist is empty. <Link href="/watches/category/all" className="text-[#c9a84c] underline hover:text-[#a88b3a] transition-colors">Browse watches</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {products.map((p) => (
            <article key={p.id} className="bg-white rounded-xl border border-[#e5e7eb] p-4 hover:border-[#c9a84c] hover:shadow-lg transition-all duration-300">
              <div className="h-48 flex items-center justify-center bg-[#faf9f6] rounded-lg overflow-hidden">
                <Image
                  src={p.images && p.images[0] ? p.images[0] : "/placeholder.jpg"}
                  alt={p.name || "Product image"}
                  width={220}
                  height={220}
                  className="object-contain"
                />
              </div>

              <div className="mt-3">
                <h2 className="text-base font-bold text-[#1a1a2e]">{p.name}</h2>
                <div className="text-[#c9a84c] font-bold mt-2 text-lg">₹{Math.round(p.price || 0).toLocaleString()}</div>

                <div className="mt-4 flex gap-3">
                  <Link href={`/watches/product/${p.id}`} className="px-4 py-2 bg-[#1a1a2e] text-white rounded-lg text-sm font-semibold hover:bg-[#c9a84c] transition-all duration-300">
                    View
                  </Link>
                  <button
                    onClick={() => removeFromWishlist(p.id)}
                    className="px-4 py-2 border border-[#e5e7eb] rounded-lg text-sm font-medium text-[#1a1a2e] hover:border-red-400 hover:text-red-500 transition-all duration-300"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
