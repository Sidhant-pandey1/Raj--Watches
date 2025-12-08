"use client";

import Link from "next/link";
import { ShoppingBag, Search, User, Heart, Menu, X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useWishlist from "./useWishlist"; // <- make sure this file exists (components/useWishlist.js)

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  // wishlist hook
  const { count } = useWishlist();

  // Updated nav links for your requested categories
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
    router.push(`/watches/category/all?modelNumber=${encodeURIComponent(query)}`);
    setSearchQuery("");
    if (menuOpen) setMenuOpen(false);
  };

  return (
    <header className="bg-white/90 sticky top-0 z-50 shadow-lg border-b border-gray-300 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center px-6 py-3 space-y-3 sm:space-y-0">
        {/* Left: Logo and Mobile Menu Toggle */}
        <div className="flex items-center justify-between w-full sm:w-auto">
          <div className="flex items-center space-x-4">
            <button
              className="sm:hidden text-gray-700 hover:text-gray-900 p-1 rounded-md transition"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            <Link
              href="/"
              className="text-3xl font-extrabold tracking-widest text-[#c2ab72] hover:text-[#bfa666] transition"
              aria-label="Raj & Raj Watches Logo"
            >
              RAJ WATCHES
            </Link>
          </div>
        </div>

        {/* Center: Search Bar - Redesigned with integrated button */}
        <form
          onSubmit={handleSearch}
          className="relative w-full sm:w-1/2 md:max-w-lg flex items-center"
          role="search"
        >
          <div className="relative w-full flex items-center bg-gray-100 rounded-full border border-gray-300 overflow-hidden focus-within:ring-2 focus-within:ring-[#c2ab72] transition">
            <input
              type="search"
              placeholder="Search watches by model number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-gray-900 py-2.5 pl-4 pr-2 text-sm focus:outline-none"
              aria-label="Search watches by model number"
            />
            <button
              type="submit"
              className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-[#c2ab72] text-[#232323] rounded-full mr-0.5 hover:bg-[#b89f56] transition"
              aria-label="Submit search"
            >
              <Search size={18} />
            </button>
          </div>
        </form>

        {/* Right: Icons for desktop */}
        <div className="hidden sm:flex items-center space-x-8 text-[#232323]">
          <Link href="/wishlist" className="relative inline-flex items-center hover:text-[#c2ab72]" aria-label="Wishlist">
            <Heart size={22} />
            {count > 0 && (
              <span className="absolute -top-2 -right-3 inline-flex items-center justify-center px-2 py-0.5 text-xs rounded-full bg-[#c2ab72] text-white font-semibold">
                {count}
              </span>
            )}
          </Link>

          {/* <Link href="/account" className="hover:text-[#c2ab72]" aria-label="User Account">
            <User size={22} />
          </Link> */}

          <Link href="/cart" className="hover:text-[#c2ab72]" aria-label="Shopping Cart">
            <ShoppingBag size={22} />
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="sm:hidden bg-white/95 backdrop-blur-md border-t border-gray-300 shadow-sm">
          <ul className="flex flex-col space-y-2 py-3 px-6 font-semibold text-gray-800">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="block px-3 py-2 rounded hover:bg-[#c2ab72] hover:text-white transition"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/wishlist"
                className="block px-3 py-2 rounded hover:bg-[#c2ab72] hover:text-white transition"
                onClick={() => setMenuOpen(false)}
              >
                Wishlist {count > 0 ? ` (${count})` : ""}
              </Link>
            </li>
          </ul>
        </nav>
      )}

      {/* Desktop Nav Links */}
      <div className="hidden sm:block bg-gray-100 border-t border-gray-300">
        <ul className="flex justify-center space-x-12 py-3 text-base font-semibold text-[#232323]">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className="hover:text-[#c2ab72] transition-colors border-b-2 border-transparent hover:border-[#c2ab72] pb-1"
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

export default Navbar;



// "use client";

// import { ShoppingBag, Search, User, Heart, Menu, X } from "lucide-react";
// import { useState } from "react";
// import { useRouter } from "next/navigation";

// function Navbar() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [menuOpen, setMenuOpen] = useState(false);
//   const router = useRouter();

//   // Updated nav links for your requested categories
//   const navLinks = [
//     { name: "Men", href: "/watches/category/men" },
//     { name: "Women", href: "/watches/category/women" },
//     { name: "Couple", href: "/watches/category/couple" },
//     { name: "Smartwatches", href: "/watches/category/smartwatches" },
//     { name: "Wall Clocks", href: "/watches/category/wallclocks" },
//   ];

//   const handleSearch = (e) => {
//     e.preventDefault();
//     const query = searchQuery.trim();
//     if (!query) return;
//     router.push(`/watches/category/all?modelNumber=${encodeURIComponent(query)}`);
//     setSearchQuery("");
//     if (menuOpen) setMenuOpen(false);
//   };

//   return (
//     <header className="bg-white/90 sticky top-0 z-50 shadow-lg border-b border-gray-300 backdrop-blur-md">
//       <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center px-6 py-3 space-y-3 sm:space-y-0">
//         {/* Left: Logo and Mobile Menu Toggle */}
//         <div className="flex items-center justify-between w-full sm:w-auto">
//           <div className="flex items-center space-x-4">
//             <button
//               className="sm:hidden text-gray-700 hover:text-gray-900 p-1 rounded-md transition"
//               onClick={() => setMenuOpen(!menuOpen)}
//               aria-label="Toggle menu"
//             >
//               {menuOpen ? <X size={28} /> : <Menu size={28} />}
//             </button>
//             <a
//               href="/"
//               className="text-3xl font-extrabold tracking-widest text-[#c2ab72] hover:text-[#bfa666] transition"
//               aria-label="Raj & Raj Watches Logo"
//             >
//               RAJ WATCHES
//             </a>
//           </div>
//         </div>

//         {/* Center: Search Bar */}
//         <form
//           onSubmit={handleSearch}
//           className="relative w-full sm:w-1/2 md:max-w-lg"
//           role="search"
//         >
//           <input
//             type="search"
//             placeholder="Search watches by model number..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full bg-gray-100 text-gray-900 rounded-full py-2 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-[#c2ab72] border border-gray-300 transition"
//             aria-label="Search watches by model number"
//           />
//           <button
//             type="submit"
//             className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-[#232323] transition"
//             aria-label="Submit search"
//           >
//             <Search size={18} />
//           </button>
//         </form>

//         {/* Right: Icons for desktop */}
//         <div className="hidden sm:flex items-center space-x-8 text-[#232323]">
//           <a href="/wishlist" className="hover:text-[#c2ab72]" aria-label="Wishlist">
//             <Heart size={22} />
//           </a>
//           <a href="/account" className="hover:text-[#c2ab72]" aria-label="User Account">
//             <User size={22} />
//           </a>
//           <a href="/cart" className="hover:text-[#c2ab72]" aria-label="Shopping Cart">
//             <ShoppingBag size={22} />
//           </a>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {menuOpen && (
//         <nav className="sm:hidden bg-white/95 backdrop-blur-md border-t border-gray-300 shadow-sm">
//           <ul className="flex flex-col space-y-2 py-3 px-6 font-semibold text-gray-800">
//             {navLinks.map((link) => (
//               <li key={link.name}>
//                 <a
//                   href={link.href}
//                   className="block px-3 py-2 rounded hover:bg-[#c2ab72] hover:text-white transition"
//                   onClick={() => setMenuOpen(false)}
//                 >
//                   {link.name}
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </nav>
//       )}

//       {/* Desktop Nav Links */}
//       <div className="hidden sm:block bg-gray-100 border-t border-gray-300">
//         <ul className="flex justify-center space-x-12 py-3 text-base font-semibold text-[#232323]">
//           {navLinks.map((link) => (
//             <li key={link.name}>
//               <a
//                 href={link.href}
//                 className="hover:text-[#c2ab72] transition-colors border-b-2 border-transparent hover:border-[#c2ab72] pb-1"
//               >
//                 {link.name}
//               </a>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </header>
//   );
// }

// export default Navbar;

// "use client";

// import { ShoppingBag, Search, User, Heart, Menu, X } from "lucide-react";
// import { useState } from "react";
// import { useRouter } from "next/navigation";

// function Navbar() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [menuOpen, setMenuOpen] = useState(false);
//   const router = useRouter();

//   const navLinks = [
//     { name: "Men", href: "/watches/category/men" },
//     { name: "Women", href: "/watches/category/women" },
//     { name: "Wall Clocks", href: "/watches/category/wallclocks" },
//     { name: "Unisex", href: "/watches/category/unisex" },
//     { name: "Couple", href: "/watches/category/couple" },
//   ];

//   const handleSearch = (e) => {
//     e.preventDefault();
//     const query = searchQuery.trim();
//     if (!query) return;

//     router.push(`/watches/category/all?modelNumber=${encodeURIComponent(query)}`);
//     setSearchQuery("");
//     if (menuOpen) setMenuOpen(false);
//   };

//   return (
//     <header className="bg-white/90 sticky top-0 z-50 shadow-lg border-b border-gray-300 backdrop-blur-md">
//       <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center px-6 py-3 space-y-3 sm:space-y-0">
//         {/* Left: Logo and Mobile Menu Toggle */}
//         <div className="flex items-center justify-between w-full sm:w-auto">
//           <div className="flex items-center space-x-4">
//             <button
//               className="sm:hidden text-gray-700 hover:text-gray-900 p-1 rounded-md transition"
//               onClick={() => setMenuOpen(!menuOpen)}
//               aria-label="Toggle menu"
//             >
//               {menuOpen ? <X size={28} /> : <Menu size={28} />}
//             </button>

//             <a
//               href="/"
//               className="text-3xl font-extrabold tracking-widest text-[#c2ab72] hover:text-[#bfa666] transition"
//               aria-label="Raj & Raj Watches Logo"
//             >
//               RAJ WATCHES
//             </a>
//           </div>
//         </div>

//         {/* Center: Search Bar */}
//         <form
//           onSubmit={handleSearch}
//           className="relative w-full sm:w-1/2 md:max-w-lg"
//           role="search"
//         >
//           <input
//             type="search"
//             placeholder="Search watches by model number..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full bg-gray-100 text-gray-900 rounded-full py-2 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-[#c2ab72] border border-gray-300 transition"
//             aria-label="Search watches by model number"
//           />
//           <button
//             type="submit"
//             className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-[#232323] transition"
//             aria-label="Submit search"
//           >
//             <Search size={18} />
//           </button>
//         </form>

//         {/* Right: Icons for desktop */}
//         <div className="hidden sm:flex items-center space-x-8 text-[#232323]">
//           <a href="/wishlist" className="hover:text-[#c2ab72]" aria-label="Wishlist">
//             <Heart size={22} />
//           </a>
//           <a href="/account" className="hover:text-[#c2ab72]" aria-label="User Account">
//             <User size={22} />
//           </a>
//           <a href="/cart" className="hover:text-[#c2ab72]" aria-label="Shopping Cart">
//             <ShoppingBag size={22} />
//           </a>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {menuOpen && (
//         <nav className="sm:hidden bg-white/95 backdrop-blur-md border-t border-gray-300 shadow-sm">
//           <ul className="flex flex-col space-y-2 py-3 px-6 font-semibold text-gray-800">
//             {navLinks.map((link) => (
//               <li key={link.name}>
//                 <a
//                   href={link.href}
//                   className="block px-3 py-2 rounded hover:bg-[#c2ab72] hover:text-white transition"
//                   onClick={() => setMenuOpen(false)}
//                 >
//                   {link.name}
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </nav>
//       )}

//       {/* Desktop Nav Links */}
//       <div className="hidden sm:block bg-gray-100 border-t border-gray-300">
//         <ul className="flex justify-center space-x-12 py-3 text-base font-semibold text-[#232323]">
//           {navLinks.map((link) => (
//             <li key={link.name}>
//               <a
//                 href={link.href}
//                 className="hover:text-[#c2ab72] transition-colors border-b-2 border-transparent hover:border-[#c2ab72] pb-1"
//               >
//                 {link.name}
//               </a>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </header>
//   );
// }

// export default Navbar;

































// // // import { ShoppingBag, Search, User, Menu, X } from 'lucide-react';
// // // import { useState } from 'react';
// // // import { useRouter } from 'next/navigation';

// // // function Navbar() {
// // //   const [searchQuery, setSearchQuery] = useState('');
// // //   const [menuOpen, setMenuOpen] = useState(false);
// // //   const router = useRouter();

// // //   const navLinks = [
// // //     { name: 'Men', href: '/watches/category/men' },
// // //     { name: 'Women', href: '/watches/category/women' },
// // //     { name: 'Wall Clocks', href: '/watches/category/wallclocks' },
// // //     { name: 'Unisex', href: '/watches/category/unisex' },
// // //     { name: 'Couple', href: '/watches/category/couple' },
// // //   ];

// // //   const handleSearch = (e) => {
// // //     e.preventDefault();
// // //     const query = searchQuery.trim();
// // //     if (!query) return;

// // //     // Navigate to watches category filtered by modelNumber (case-insensitive partial match)
// // //     router.push(`/watches/category/all?modelNumber=${encodeURIComponent(query)}`);
// // //     setSearchQuery('');
// // //   };

// // //   return (
// // //     <header className="bg-white sticky top-0 z-50 shadow-lg border-b border-gray-100">
// // //       <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 py-3 space-y-3 sm:space-y-0">
// // //         <div className="flex items-center justify-between w-full sm:w-auto">
// // //           <div className="flex items-center space-x-3">
// // //             <button
// // //               className="sm:hidden text-gray-700 hover:text-gray-900 p-1 rounded-md"
// // //               onClick={() => setMenuOpen(!menuOpen)}
// // //               aria-label="Toggle menu"
// // //             >
// // //               {menuOpen ? <X size={26} /> : <Menu size={26} />}
// // //             </button>

// // //             <a
// // //               href="/"
// // //               className="text-2xl font-extrabold tracking-widest text-black hover:text-gray-700"
// // //             >
// // //               RAJ & RAJ WATCHES
// // //             </a>
// // //           </div>
// // //         </div>

// // //         <form onSubmit={handleSearch} className="relative w-full sm:w-1/2 md:max-w-md">
// // //           <input
// // //             type="text"
// // //             placeholder="Search watches by model number..."
// // //             value={searchQuery}
// // //             onChange={(e) => setSearchQuery(e.target.value)}
// // //             className="w-full bg-gray-100 text-gray-900 rounded-full py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-black border border-gray-200"
// // //           />
// // //           <button
// // //             type="submit"
// // //             className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-black"
// // //           >
// // //             <Search size={18} />
// // //           </button>
// // //         </form>

// // //         <div className="hidden sm:flex items-center space-x-5">
// // //           {/* Optional account/cart icons */}
// // //         </div>
// // //       </div>

// // //       {/* Desktop Nav Links */}
// // //       <div className="bg-gray-50 border-t border-gray-200 hidden sm:block">
// // //         <ul className="flex justify-center space-x-10 py-3 text-sm font-semibold">
// // //           {navLinks.map((link) => (
// // //             <li key={link.name}>
// // //               <a
// // //                 href={link.href}
// // //                 className="text-gray-700 hover:text-black transition-colors"
// // //               >
// // //                 {link.name}
// // //               </a>
// // //             </li>
// // //           ))}
// // //         </ul>
// // //       </div>
// // //     </header>
// // //   );
// // // }

// // // export default Navbar;
