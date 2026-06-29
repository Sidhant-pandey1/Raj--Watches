"use client";

import Link from "next/link";
import { ShoppingBag, Search, Heart, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import useWishlist from "./useWishlist"; 

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  
  const [scrolled, setScrolled] = useState(false);

  // wishlist hook
  const { count } = useWishlist();

  const isHome = pathname === "/";
  const isSolid = !isHome || scrolled || menuOpen;

  useEffect(() => {
    // Scroll handler
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    // Clear filters from session storage when on home page
    if (pathname === "/") {
      try {
        Object.keys(sessionStorage).forEach((key) => {
          if (key.startsWith("rw-filters-") || key.startsWith("rw-page-")) {
            sessionStorage.removeItem(key);
          }
        });
      } catch (e) {}
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const navLinks = [
    { name: "Men", href: "/watches/category/men" },
    { name: "Women", href: "/watches/category/women" },
    { name: "Couple", href: "/watches/category/couple" },
    { name: "Smartwatches", href: "/watches/category/smartwatches" },
    { name: "Wall Clocks", href: "/watches/category/wallclocks" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;
    router.push(`/watches/category/all?search=${encodeURIComponent(query)}`);
    setSearchQuery("");
    if (menuOpen) setMenuOpen(false);
  };

  return (
    <header className={`${isHome ? "fixed" : "sticky"} top-0 z-50 w-full transition-colors duration-300 ${isSolid ? "bg-white shadow-sm" : "bg-gradient-to-b from-black/60 to-transparent"}`}>
      {/* Top bar: Logo + Search + Icons */}
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 sm:px-8 py-3.5 gap-4">
        {/* Left: Hamburger + Logo */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            className={`lg:hidden p-1.5 transition-colors duration-200 cursor-pointer ${isSolid ? "text-[#1a1a2e] hover:text-[#c9a84c]" : "text-white hover:text-[#c9a84c]"}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <Link
            href="/"
            className={`text-xl sm:text-2xl font-semibold tracking-[0.15em] transition-colors duration-300 uppercase ${isSolid ? "text-[#1a1a2e] hover:text-[#c9a84c]" : "text-white hover:text-[#c9a84c] drop-shadow-md"}`}
            style={{ fontFamily: "'Outfit', sans-serif" }}
            aria-label="Raj Watches Logo"
          >
            RAJ WATCHES
          </Link>
        </div>

        {/* Center: Search Bar */}
        <form
          onSubmit={handleSearch}
          className="relative flex-1 max-w-lg hidden sm:flex items-center"
          role="search"
        >
          <div className={`relative w-full flex items-center border rounded-lg overflow-hidden transition-all duration-300 ${isSolid ? "bg-[#faf9f6] border-[#e5e7eb] focus-within:border-[#c9a84c] focus-within:ring-1 focus-within:ring-[#c9a84c]/30" : "bg-white/10 border-white/20 focus-within:border-white focus-within:bg-white/20 backdrop-blur-sm"}`}>
            <input
              type="search"
              placeholder="Search by model number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`flex-1 bg-transparent py-2.5 px-4 text-sm font-normal tracking-wide focus:outline-none ${isSolid ? "text-[#1a1a2e] placeholder-[#9ca3af]" : "text-white placeholder-white/70"}`}
              aria-label="Search watches by model number"
            />
            <button
              type="submit"
              className={`flex-shrink-0 w-10 h-10 flex items-center justify-center transition-colors duration-200 cursor-pointer ${isSolid ? "text-[#6b7280] hover:text-[#c9a84c]" : "text-white hover:text-[#c9a84c]"}`}
              aria-label="Submit search"
            >
              <Search size={18} />
            </button>
          </div>
        </form>

        {/* Right: Icons */}
        <div className="flex items-center gap-5 flex-shrink-0">
          <Link href="/wishlist" className={`relative inline-flex items-center transition-colors duration-200 ${isSolid ? "text-[#1a1a2e] hover:text-[#c9a84c]" : "text-white hover:text-[#c9a84c]"}`} aria-label="Wishlist">
            <Heart size={21} className="stroke-[1.5px]" />
            {count > 0 && (
              <span className={`absolute -top-2 -right-2.5 inline-flex items-center justify-center w-[18px] h-[18px] text-[10px] rounded-full font-semibold ${isSolid ? "bg-[#c9a84c] text-white" : "bg-white text-[#1a1a2e]"}`}>
                {count}
              </span>
            )}
          </Link>

          <Link href="/cart" className={`transition-colors duration-200 ${isSolid ? "text-[#1a1a2e] hover:text-[#c9a84c]" : "text-white hover:text-[#c9a84c]"}`} aria-label="Shopping Cart">
            <ShoppingBag size={21} className="stroke-[1.5px]" />
          </Link>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className={`sm:hidden px-5 pb-3 transition-opacity duration-300 ${!isSolid ? "hidden" : "block"}`}>
        <form onSubmit={handleSearch} role="search">
          <div className="relative w-full flex items-center bg-[#faf9f6] border border-[#e5e7eb] rounded-lg overflow-hidden focus-within:border-[#c9a84c] transition-all duration-300">
            <input
              type="search"
              placeholder="Search brand or model..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-[#1a1a2e] py-2.5 px-4 text-sm font-normal tracking-wide focus:outline-none placeholder-[#9ca3af]"
              aria-label="Search watches by brand or model number"
            />
            <button
              type="submit"
              className="flex-shrink-0 w-10 h-10 flex items-center justify-center text-[#6b7280] hover:text-[#c9a84c] transition-colors duration-200 cursor-pointer"
              aria-label="Submit search"
            >
              <Search size={18} />
            </button>
          </div>
        </form>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="lg:hidden bg-white border-t border-[#e5e7eb]">
          <ul className="flex flex-col py-2 px-5">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="block py-3 text-sm font-medium tracking-wide text-[#1a1a2e] hover:text-[#c9a84c] transition-colors duration-200 border-b border-[#f3f4f6]"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/wishlist"
                className="block py-3 text-sm font-medium tracking-wide text-[#1a1a2e] hover:text-[#c9a84c] transition-colors duration-200"
                onClick={() => setMenuOpen(false)}
              >
                Wishlist {count > 0 ? ` (${count})` : ""}
              </Link>
            </li>
          </ul>
        </nav>
      )}

      {/* Desktop Nav Links */}
      <div className={`hidden lg:block transition-colors duration-300 ${isSolid ? "bg-[#faf9f6] border-t border-[#e5e7eb]" : "bg-transparent border-t border-white/20"}`}>
        <ul className="flex justify-center gap-10 py-3 max-w-7xl mx-auto">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className={`relative text-[13px] font-semibold tracking-[0.1em] uppercase transition-colors duration-300 pb-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#c9a84c] after:transition-all after:duration-300 hover:after:w-full ${isSolid ? "text-[#4b5563] hover:text-[#1a1a2e]" : "text-white/90 hover:text-white drop-shadow-sm"}`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}