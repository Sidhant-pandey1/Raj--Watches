"use client";

import Image from "next/image";
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

const Menswatch =
  "https://ik.imagekit.io/rajstorage2/RAJ_WATCHES_Brand_2/4Kenneth%20Cole%20%20Fossil%20Tommy%20Police/images/32-NTTH_1792112/2_32-NTTH_1792112.jpg";
const Womenswatch =
  "https://ik.imagekit.io/rajstorage2/RAJ_WATCHES_Brand_2/5Poze/images/125-70039_KM05/3_125-70039_KM05.jpg";
const wallclock =
  "https://ik.imagekit.io/rajstorage2/RAJ_WATCHES_Brand_2/7Ajanta_images/15-2377/1_15-2377.jpg";

export default function HomePage() {
  const brands = [
    { name: "tommy hilfiger", logo: Tommylogo },
    { name: "kenneth cole", logo: KennethColelogo },
    { name: "police", logo: Policelogo },
    { name: "casio", logo: Casiologo },
    { name: "titan", logo: Titanlogo },
    { name: "fastrack", logo: Fastracklogo },
    { name: "sonata", logo: Sonatalogo },
    { name: "ajanta", logo: Ajantalogo },
  ];

  return (
    <div className="bg-gray-50 w-full min-h-screen relative">
      <Navbar />

      <main>
        {/* HERO */}
        <div className="relative h-[400px] md:h-[550px] lg:h-[700px] w-full overflow-hidden">
          <HeroSlideshow />
        </motion.div>

        {/* Category circles (existing component) */}
        <CollectionCircles />

        {/* Our Top Brands - logos only, centered and luxe */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-20">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-[#b89f56] mb-6 sm:mb-14 text-center drop-shadow-md tracking-wide uppercase">
            Our Top Brands
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-10 place-items-center">
            {brands.map((brand, idx) => (
              <a
                key={brand.logo || idx}
                href={`/watches/category/all?brand=${encodeURIComponent(
                  brand.name
                )}`}
                className="w-full max-w-[150px] sm:max-w-[200px] lg:max-w-[260px] h-[110px] sm:h-[170px] lg:h-[220px] rounded-xl sm:rounded-2xl lg:rounded-3xl border-2 sm:border-3 lg:border-4 border-[#b89f56] bg-gradient-to-tr from-[#fefcf6] via-[#f6ecd1] to-[#e9d8a6] shadow-[0_6px_16px_rgba(184,159,86,0.15)] sm:shadow-[0_12px_32px_rgba(184,159,86,0.18)] hover:shadow-[0_16px_48px_rgba(184,159,86,0.32)] transition-transform duration-300 transform hover:scale-105 flex items-center justify-center overflow-hidden p-3 sm:p-4 lg:p-6 cursor-pointer"
              >
                {/* subtle overlay for depth */}
                <div className="absolute inset-0 rounded-3xl pointer-events-none bg-gradient-to-b from-black/[0.01] to-transparent opacity-10" />

                {/* Centered logo container: logos are centered and maintain aspect ratio */}
                <div className="relative w-20 h-14 sm:w-28 sm:h-20 lg:w-40 lg:h-28 flex items-center justify-center">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={320}
                    height={160}
                    className="object-contain w-full h-full"
                    priority={false}
                  />
                </div>
              </a>
            ))}
          </div>
        </section>

        <StorySection />
        <TestimonialSection />
        <WhyChooseUs />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
