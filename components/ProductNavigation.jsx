"use client";

import { Heart, User, ShoppingBag } from "lucide-react";
import BackButton from "./BackButton";

export default function ProductNavigation() {
    return (
        <div className="flex items-center justify-between w-full mb-6">
            {/* Back Button - Primary Navigation */}
            <BackButton
                fallbackUrl="/watches"
                label="Back to Collection"
            />

            {/* Quick Action Icons */}
            <div className="flex items-center gap-3">
                <a
                    href="/wishlist"
                    className="flex items-center justify-center w-10 h-10 text-[#1a1a2e] hover:text-[#c9a84c] bg-white border border-[#e5e7eb] hover:border-[#c9a84c] rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                    aria-label="Wishlist"
                >
                    <Heart size={20} />
                </a>
                <a
                    href="/account"
                    className="flex items-center justify-center w-10 h-10 text-[#1a1a2e] hover:text-[#c9a84c] bg-white border border-[#e5e7eb] hover:border-[#c9a84c] rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                    aria-label="User Account"
                >
                    <User size={20} />
                </a>
                <a
                    href="/cart"
                    className="flex items-center justify-center w-10 h-10 text-[#1a1a2e] hover:text-[#c9a84c] bg-white border border-[#e5e7eb] hover:border-[#c9a84c] rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                    aria-label="Shopping Cart"
                >
                    <ShoppingBag size={20} />
                </a>
            </div>
        </div>
    );
}
