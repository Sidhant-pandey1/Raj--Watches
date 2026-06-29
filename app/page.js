// app/page.jsx
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
    <div className="bg-white w-full min-h-screen relative text-[#1a1a2e]">
      <Navbar />

      <main>
        {/* HERO */}
        <div className="relative w-full h-screen overflow-hidden">
          <HeroSlideshow />
        </div>

        <FadeIn delay={0.1}>
          {/* Category circles */}
          <CollectionCircles />
        </FadeIn>

        <FadeIn delay={0.2}>
          {/* Our Top Brands - logos only, centered and minimalist */}
          <section className="max-w-7xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#1a1a2e] mb-10 sm:mb-14 text-center tracking-tight">
              Our Top Brands
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6">
              {brands.map((brand, idx) => (
                <a
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
                </a>
              ))}
            </div>
          </section>
        </FadeIn>

        <FadeIn delay={0.2}>
          <StorySection />
        </FadeIn>
        
        <FadeIn delay={0.2}>
          <TestimonialSection />
        </FadeIn>
        
        <FadeIn delay={0.2}>
          <WhyChooseUs />
        </FadeIn>
        
        <FadeIn delay={0.2}>
          <Contact />
        </FadeIn>
      </main>

      <Footer />
    </div>
  );
}
