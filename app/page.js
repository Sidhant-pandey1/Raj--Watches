"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TestimonialSection from "../components/TestimonialSection";
import WhyChooseUs from "../components/WhyChooseUs";
import StorySection from "../components/StorySection";
import Contact from "../components/Contact";
import HeroSlideshow from "../components/HeroSlideshow";
import CollectionCircles from "../components/CollectionCircles";
import FadeIn from "../components/FadeIn";

const KennethColelogo =
  "https://ik.imagekit.io/rajstorage2/store_frontend/Logos/kenneth-cole-logo.png";
const Tommylogo =
  "https://ik.imagekit.io/rajstorage2/store_frontend/Logos/Tommy_Hilfiger_Logo.png";
const Ajantalogo =
  "https://ik.imagekit.io/rajstorage2/store_frontend/Logos/ajanta-logo.jpg";
const Sonatalogo =
  "https://ik.imagekit.io/rajstorage2/store_frontend/Logos/sonata_logo.jpg";
const Titanlogo =
  "https://ik.imagekit.io/rajstorage2/store_frontend/Logos/titan.png";
const Fastracklogo =
  "https://ik.imagekit.io/rajstorage2/store_frontend/Logos/Fastrack_logo.svg.png";
const Casiologo =
  "https://ik.imagekit.io/rajstorage2/store_frontend/Logos/casio_logo.webp";
const Policelogo =
  "https://ik.imagekit.io/rajstorage2/store_frontend/Logos/police_logo.png";
const Solarlogo = "/Solar-logo.jpeg";
const Guesslogo = "/Logos/guess-logo.png";
const AXlogo = "/Logos/armani-exchange-logo.png";
const Diesellogo = "/Logos/diesel-logo.jpg";
const MKlogo = "/Logos/michael-kors-logo.png";
const Ducatilogo = "/Logos/ducati-logo.png";

const Menswatch =
  "https://ik.imagekit.io/rajstorage2/RAJ_WATCHES_Brand_2/4Kenneth%20Cole%20%20Fossil%20Tommy%20Police/images/32-NTTH_1792112/2_32-NTTH_1792112.jpg";
const Womenswatch =
  "https://ik.imagekit.io/rajstorage2/RAJ_WATCHES_Brand_2/5Poze/images/125-70039_KM05/3_125-70039_KM05.jpg";
const wallclock =
  "https://ik.imagekit.io/rajstorage2/RAJ_WATCHES_Brand_2/7Ajanta_images/15-2377/1_15-2377.jpg";

export default function HomePage() {
  // Clear sticky brand filters when user returns to homepage
  // so the next brand click from "Our Top Brands" starts fresh
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (key && key.startsWith("rw-filters-")) {
          const saved = JSON.parse(sessionStorage.getItem(key));
          if (saved && Array.isArray(saved.brands) && saved.brands.length > 0) {
            saved.brands = [];
            sessionStorage.setItem(key, JSON.stringify(saved));
          }
        }
      }
    } catch (e) {}
  }, []);

  const brands = [
    { name: "tommy hilfiger", logo: Tommylogo },
    { name: "kenneth cole", logo: KennethColelogo },
    { name: "police", logo: Policelogo },
    { name: "casio", logo: Casiologo },
    { name: "titan", logo: Titanlogo },
    { name: "fastrack", logo: Fastracklogo },
    { name: "sonata", logo: Sonatalogo },
    { name: "ajanta", logo: Ajantalogo },
    { name: "guess", logo: Guesslogo },
    { name: "armani exchange", logo: AXlogo },
    { name: "diesel", logo: Diesellogo },
    { name: "michael kors", logo: MKlogo },
    { name: "ducati", logo: Ducatilogo },
  ];

  return (
    <div className="bg-gray-50 w-full min-h-screen relative">
      <Navbar />

      <main>
        {/* HERO */}
        <div className="relative h-screen w-full overflow-hidden">
          <HeroSlideshow />
        </div>

        {/* Category circles (existing component) */}
        <CollectionCircles />

        <FadeIn delay={0.2}>
          {/* Our Top Brands - logos only, centered and minimalist */}
          <section className="max-w-7xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#1a1a2e] mb-10 sm:mb-14 text-center tracking-tight">
              Our Top Brands
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6">
              {brands.map((brand, idx) => (
                <Link
                  key={brand.logo || idx}
                  href={`/watches/category/all?brand=${encodeURIComponent(
                    brand.name
                  )}`}
                  className="group w-full h-32 sm:h-40 flex items-center justify-center p-4 border border-[#e5e7eb] hover:border-[#c9a84c] transition-all duration-400 bg-white relative rounded-xl cursor-pointer hover:shadow-lg hover:-translate-y-0.5"
                >
                  {/* Centered logo container */}
                  <div className="relative w-24 h-12 sm:w-32 sm:h-16 flex items-center justify-center">
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      width={200}
                      height={100}
                      className="object-contain w-full h-full transition duration-500 group-hover:scale-[1.08]"
                      priority={false}
                    />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </FadeIn>

        <StorySection />
        <TestimonialSection />
        <WhyChooseUs />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
