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
            <div className="flex items-center gap-4">
                <a
                    href="/wishlist"
                    className="
            flex items-center justify-center
            w-10 h-10
            text-[#5a5545] hover:text-[#c2ab72]
            bg-white/60 hover:bg-white
            border border-[#e4dcc8] hover:border-[#c2ab72]
            rounded-full
            shadow-sm hover:shadow-md
            transition-all duration-300
            backdrop-blur-sm
          "
                    aria-label="Wishlist"
                >
                    <Heart size={20} />
                </a>
                <a
                    href="/account"
                    className="
            flex items-center justify-center
            w-10 h-10
            text-[#5a5545] hover:text-[#c2ab72]
            bg-white/60 hover:bg-white
            border border-[#e4dcc8] hover:border-[#c2ab72]
            rounded-full
            shadow-sm hover:shadow-md
            transition-all duration-300
            backdrop-blur-sm
          "
                    aria-label="User Account"
                >
                    <User size={20} />
                </a>
                <a
                    href="/cart"
                    className="
            flex items-center justify-center
            w-10 h-10
            text-[#5a5545] hover:text-[#c2ab72]
            bg-white/60 hover:bg-white
            border border-[#e4dcc8] hover:border-[#c2ab72]
            rounded-full
            shadow-sm hover:shadow-md
            transition-all duration-300
            backdrop-blur-sm
          "
                    aria-label="Shopping Cart"
                >
                    <ShoppingBag size={20} />
                </a>
            </div>
        </div>
    );
}
