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
import { motion } from "framer-motion";

const KennethColelogo = "https://ik.imagekit.io/rajstorage2/store_frontend/Logos/kenneth-cole-logo.png";
const Tommylogo = "https://ik.imagekit.io/rajstorage2/store_frontend/Logos/Tommy_Hilfiger_Logo.png";
const Ajantalogo = "https://ik.imagekit.io/rajstorage2/store_frontend/Logos/ajanta-logo.jpg";
const Sonatalogo = "https://ik.imagekit.io/rajstorage2/store_frontend/Logos/sonata_logo.jpg";
const Titanlogo = "https://ik.imagekit.io/rajstorage2/store_frontend/Logos/titan.png";
const Fastracklogo = "https://ik.imagekit.io/rajstorage2/store_frontend/Logos/Fastrack_logo.svg.png";
const Casiologo = "https://ik.imagekit.io/rajstorage2/store_frontend/Logos/casio_logo.webp";
const Policelogo = "https://ik.imagekit.io/rajstorage2/store_frontend/Logos/police_logo.png";

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const brandItem = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" }
  },
};

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
    <div className="bg-[#f5f6fa] w-full min-h-screen relative overflow-hidden">
      <Navbar />

      <main>
        {/* HERO */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.8 }}
          className="relative h-[400px] md:h-[550px] lg:h-[700px] w-full overflow-hidden"
        >
          <HeroSlideshow />
        </motion.div>

        {/* Category circles */}
        <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            <CollectionCircles />
        </motion.div>

        {/* Our Top Brands */}
        <motion.section 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <motion.h2 
            variants={fadeInUp}
            className="text-2xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-[#b89f56] mb-6 sm:mb-14 text-center drop-shadow-md tracking-wide uppercase"
          >
            Our Top Brands
          </motion.h2>

          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-10 place-items-center"
            variants={staggerContainer}
          >
            {brands.map((brand, idx) => (
              <motion.a
                key={brand.logo || idx}
                href={`/watches/category/all?brand=${encodeURIComponent(brand.name)}`}
                variants={brandItem}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="w-full max-w-[150px] sm:max-w-[200px] lg:max-w-[260px] h-[110px] sm:h-[170px] lg:h-[220px] rounded-xl sm:rounded-2xl lg:rounded-3xl border-2 sm:border-3 lg:border-4 border-[#b89f56] bg-gradient-to-tr from-[#fefcf6] via-[#f6ecd1] to-[#e9d8a6] shadow-[0_6px_16px_rgba(184,159,86,0.15)] sm:shadow-[0_12px_32px_rgba(184,159,86,0.18)] transition-all duration-300 flex items-center justify-center overflow-hidden p-3 sm:p-4 lg:p-6 cursor-pointer relative"
              >
                {/* subtle overlay for depth */}
                <div className="absolute inset-0 rounded-3xl pointer-events-none bg-gradient-to-b from-black/[0.01] to-transparent opacity-10" />

                {/* Centered logo container */}
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
              </motion.a>
            ))}
          </motion.div>
        </motion.section>

        <motion.div
           variants={fadeInUp}
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true }}
        >
            <StorySection />
        </motion.div>

        <motion.div
           variants={fadeInUp}
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true }}
        >
            <TestimonialSection />
        </motion.div>

        <motion.div
           variants={fadeInUp}
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true }}
        >
            <WhyChooseUs />
        </motion.div>

        <motion.div
           variants={fadeInUp}
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true }}
        >
            <Contact />
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
