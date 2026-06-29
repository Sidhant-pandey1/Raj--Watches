import React from "react";
import Link from "next/link";
import { Instagram, Linkedin, Phone } from "lucide-react";

const quickLinks = [
  { name: "Men", href: "/watches/category/men" },
  { name: "Women", href: "/watches/category/women" },
  { name: "Wall Clocks", href: "/watches/category/wallclocks" },
  { name: "New Arrivals", href: "/watches/category/all" },
  { name: "Sale", href: "/watches/category/all" },
];

const Heading = ({ children }) => (
  <h2 className="text-sm font-semibold text-white tracking-[0.12em] uppercase mb-5" style={{ fontFamily: "'Outfit', sans-serif" }}>
    {children}
  </h2>
);

const Footer = () => (
  <footer className="bg-[#1a1a2e] text-[#a3a3b8] py-16 px-5 sm:px-12 relative">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
      {/* Brand Info */}
      <div className="space-y-4">
        <Heading>Raj Watches</Heading>
        <p className="text-sm font-normal tracking-wide text-[#a3a3b8] max-w-sm leading-relaxed">
          Premium timepieces combining timeless style, unmatched quality, and precision craftsmanship. Discover the watch that defines you.
        </p>
      </div>

      {/* Quick Links */}
      <div>
        <Heading>Quick Links</Heading>
        <ul className="flex flex-col gap-3 text-sm tracking-wide">
          {quickLinks.map(({ name, href }) => (
            <li key={name}>
              <Link
                href={href}
                className="hover:text-[#c9a84c] transition-colors duration-300"
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Contact Info */}
      <div>
        <Heading>Get in Touch</Heading>
        <ul className="flex flex-col gap-3 text-sm tracking-wide">
          <li className="flex items-center gap-3.5">
            <Phone className="w-4 h-4 text-[#c9a84c] stroke-[1.5px]" />
            <span className="hover:text-white transition-colors duration-300">
              +91 89845 09091
            </span>
          </li>
        </ul>
      </div>

      {/* Social Links */}
      <div>
        <Heading>Follow Us</Heading>
        <div className="flex gap-5">
          <a
            href="https://www.instagram.com/rajwatch_rourkela?igsh=dTIwdDRydmN5Nm1x"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-[#a3a3b8] hover:text-[#c9a84c] transition-colors duration-300"
          >
            <Instagram className="w-5 h-5 stroke-[1.5px]" />
          </a>
          <a
            href="https://wa.me/8984509091"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Phone"
            className="text-[#a3a3b8] hover:text-[#c9a84c] transition-colors duration-300"
          >
            <Phone className="w-5 h-5 stroke-[1.5px]" />
          </a>
        </div>
      </div>
    </div>

    {/* Bottom Copyright Section */}
    <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-xs tracking-wide text-[#6b6b80] gap-4">
      <p>&copy; {new Date().getFullYear()} Raj Watches. All rights reserved.</p>
      <p className="flex gap-4">
        <Link href="https://maps.app.goo.gl/ZUGYkbpv7xYgei8a7" className="hover:text-[#c9a84c] transition">Store Locator</Link>
        <span>&middot;</span>
        <Link href="https://wa.me/8984509091" className="hover:text-[#c9a84c] transition">Customer Service</Link>
      </p>
    </div>
  </footer>
);

export default Footer;