"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

/**
 * BackButton - A beautifully styled back navigation button
 * Uses browser history when available, falls back to specified route
 * 
 * UI/UX Principles Applied:
 * - Clear visual affordance with arrow icon
 * - Consistent brand styling 
 * - Hover/active states for feedback
 * - Accessible with proper ARIA label
 * - Smooth transitions
 */
export default function BackButton({
    fallbackUrl = "/watches",
    label = "Back",
    className = "",
    disableHistory = false
}) {
    const router = useRouter();

    const handleBack = () => {
        // Check if there's history to go back to, unless disabled
        if (!disableHistory && typeof window !== "undefined" && window.history.length > 1) {
            router.back();
        } else {
            // Fallback to specified route if no history or history disabled
            router.push(fallbackUrl);
        }
    };

    return (
        <button
            onClick={handleBack}
            aria-label="Go back to previous page"
            className={`
        group
        inline-flex items-center gap-2
        px-4 py-2.5
        text-[#5a5545] hover:text-[#23221d]
        bg-white/60 hover:bg-white
        border border-[#e4dcc8] hover:border-[#c2ab72]
        rounded-full
        font-medium text-sm tracking-wide
        shadow-sm hover:shadow-md
        transition-all duration-300 ease-out
        backdrop-blur-sm
        focus:outline-none focus:ring-2 focus:ring-[#c2ab72]/50 focus:ring-offset-2
        active:scale-95
        ${className}
      `}
        >
            <ArrowLeft
                size={18}
                className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            <span>{label}</span>
        </button>
    );
}
