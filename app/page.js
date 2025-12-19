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
    // { name: "solar", logo: Solarlogo },
  ];

  return (
    <div className="bg-gray-50 w-full min-h-screen relative">
      <Navbar />

      <main>
        {/* HERO */}
        <div className="relative h-[400px] md:h-[550px] lg:h-[700px] w-full overflow-hidden">
          <HeroSlideshow />
        </div>

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

// import Image from "next/image";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import TestimonialSection from "../components/TestimonialSection";
// import WhyChooseUs from "../components/WhyChooseUs";
// import StorySection from "../components/StorySection";
// import Contact from "@/components/Contact";
// import HeroSlideshow from "@/components/HeroSlideshow";
// import CollectionCircles from "@/components/CollectionCircles";

// const KennethColelogo = "https://ik.imagekit.io/rajstorage2/store_frontend/Logos/kenneth-cole-logo.png";
// const Tommylogo = "https://ik.imagekit.io/rajstorage2/store_frontend/Logos/Tommy_Hilfiger_Logo.png";
// const Ajantalogo = "https://ik.imagekit.io/rajstorage2/store_frontend/Logos/ajanta-logo.jpg";
// const Sonatalogo = "https://ik.imagekit.io/rajstorage2/store_frontend/Logos/sonata_logo.jpg";
// const Titanlogo = "https://ik.imagekit.io/rajstorage2/store_frontend/Logos/titan.png";
// const Fastracklogo = "https://ik.imagekit.io/rajstorage2/store_frontend/Logos/Fastrack_logo.svg.png";
// const Casiologo = "https://ik.imagekit.io/rajstorage2/store_frontend/Logos/casio_logo.webp";
// const Policelogo = "https://ik.imagekit.io/rajstorage2/store_frontend/Logos/police_logo.png";
// const Solarlogo = "/Solar-logo.jpeg";

// // const Solarlogo = "https://ik.imagekit.io/rajstorage2/store_frontend/Logos/solar_logo.png"; // <-- Add your actual Solar logo here

// const Menswatch = "https://ik.imagekit.io/rajstorage2/RAJ_WATCHES_Brand_2/4Kenneth%20Cole%20%20Fossil%20Tommy%20Police/images/32-NTTH_1792112/2_32-NTTH_1792112.jpg";
// const Womenswatch = "https://ik.imagekit.io/rajstorage2/RAJ_WATCHES_Brand_2/5Poze/images/125-70039_KM05/3_125-70039_KM05.jpg";
// const wallclock = "https://ik.imagekit.io/rajstorage2/RAJ_WATCHES_Brand_2/7Ajanta_images/15-2377/1_15-2377.jpg";

// export default async function HomePage() {
//   const brands = [
//     { name: "Tommy Hilfiger", logo: Tommylogo },
//     { name: "Kenneth Cole", logo: KennethColelogo },
//     { name: "Police", logo: Policelogo },
//     { name: "Casio", logo: Casiologo },
//     { name: "Titan", logo: Titanlogo },
//     { name: "Fastrack", logo: Fastracklogo },
//     { name: "Sonata", logo: Sonatalogo },
//     { name: "Ajanta", logo: Ajantalogo },
//     { name: "Solar", logo: Solarlogo },
//   ];

//   const categoryData = [
//     { name: "Gents Collection", image: Menswatch, link: "/watches/category/men" },
//     { name: "Ladies Collection", image: Womenswatch, link: "/watches/category/women" },
//     { name: "Wall Clocks", image: wallclock, link: "/watches/category/wallclocks" },
//   ];

//   return (
//     <div className="bg-gray-50 w-full min-h-screen relative">
//       <Navbar />

//       <main>
//         {/* HERO */}
//         <div className="relative h-[400px] md:h-[550px] lg:h-[700px] w-full overflow-hidden">
//           <HeroSlideshow />
//         </div>

//         {/* New luxurious circular collections */}
//         <CollectionCircles />

//         {/* Our Top Brands - luxurious design */}
//         <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-20 bg-white rounded-3xl shadow-[0_15px_40px_rgba(194,171,114,0.3)]">
//           <h2 className="text-5xl font-serif font-extrabold text-[#b89f56] mb-14 text-center drop-shadow-md tracking-wide uppercase">
//             Our Top Brands
//           </h2>

//           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-16 place-items-center">
//             {brands.map((brand) => (
//               <div
//                 key={brand.name}
//                 className="relative w-full max-w-[280px] h-[240px] bg-gradient-to-tr from-[#fefcf6] via-[#f6ecd1] to-[#e9d8a6] rounded-3xl border-4 border-[#b89f56] shadow-[0_12px_32px_rgba(184,159,86,0.25)] hover:shadow-[0_16px_48px_rgba(184,159,86,0.45)] transition-shadow duration-300 flex flex-col items-center justify-center overflow-hidden group cursor-pointer px-6"
//               >
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/[0.01] to-transparent opacity-20 group-hover:opacity-60 transition-opacity duration-300 rounded-3xl" />
//                 <Image
//                   src={brand.logo}
//                   alt={`${brand.name} Logo`}
//                   width={180}
//                   height={90}
//                   priority
//                   className="object-contain mb-4 group-hover:scale-110 transition-transform duration-500"
//                 />
//                 <h3
//                   className="text-2xl font-serif font-semibold text-[#3c3c3c] group-hover:text-[#b89f56] transition-colors tracking-wide select-none text-center truncate w-full"
//                   title={brand.name}
//                 >
//                   {brand.name}
//                 </h3>
//               </div>
//             ))}
//           </div>
//         </section>

//         <StorySection />
//         <TestimonialSection />
//         <WhyChooseUs />
//         <Contact />
//       </main>

//       <Footer />
//     </div>
//   );
// }

// // import Image from "next/image";
// // import Navbar from "../components/Navbar";
// // import Footer from "../components/Footer";
// // import TestimonialSection from "../components/TestimonialSection";
// // import WhyChooseUs from "../components/WhyChooseUs";
// // import StorySection from "../components/StorySection";
// // import Contact from "@/components/Contact";
// // import HeroSlideshow from "@/components/HeroSlideshow";
// // import CollectionCircles from "@/components/CollectionCircles"; // Import new collections circles component

// // const KennethColelogo = "https://ik.imagekit.io/rajstorage2/store_frontend/Logos/kenneth-cole-logo.png";
// // const Tommylogo = "https://ik.imagekit.io/rajstorage2/store_frontend/Logos/Tommy_Hilfiger_Logo.png";
// // const Ajantalogo = "https://ik.imagekit.io/rajstorage2/store_frontend/Logos/ajanta-logo.jpg";
// // const Sonatalogo = "https://ik.imagekit.io/rajstorage2/store_frontend/Logos/sonata_logo.jpg";
// // const Titanlogo = "https://ik.imagekit.io/rajstorage2/store_frontend/Logos/titan.png";
// // const Fastracklogo = "https://ik.imagekit.io/rajstorage2/store_frontend/Logos/Fastrack_logo.svg.png";
// // const Casiologo = "https://ik.imagekit.io/rajstorage2/store_frontend/Logos/casio_logo.webp";
// // const Policelogo = "https://ik.imagekit.io/rajstorage2/store_frontend/Logos/police_logo.png";
// // const Sflogo = "https://ik.imagekit.io/rajstorage2/store_frontend/Logos/sf_logo.png";

// // const Menswatch = "https://ik.imagekit.io/rajstorage2/RAJ_WATCHES_Brand_2/4Kenneth%20Cole%20%20Fossil%20Tommy%20Police/images/32-NTTH_1792112/2_32-NTTH_1792112.jpg";
// // const Womenswatch = "https://ik.imagekit.io/rajstorage2/RAJ_WATCHES_Brand_2/5Poze/images/125-70039_KM05/3_125-70039_KM05.jpg";
// // const wallclock = "https://ik.imagekit.io/rajstorage2/RAJ_WATCHES_Brand_2/7Ajanta_images/15-2377/1_15-2377.jpg";

// // export default async function HomePage() {
// //   const brands = [
// //     { name: "Fastrack", logo: Fastracklogo },
// //     { name: "Titan", logo: Titanlogo },
// //     { name: "Sonata", logo: Sonatalogo },
// //     { name: "Kenneth Cole", logo: KennethColelogo },
// //     { name: "Ajanta", logo: Ajantalogo },
// //     { name: "SF", logo: Sflogo },
// //     { name: "Tommy Hilfiger", logo: Tommylogo },
// //     { name: "Police", logo: Policelogo },
// //     { name: "Casio", logo: Casiologo },
// //   ];

// //   const categoryData = [
// //     { name: "Gents Collection", image: Menswatch, link: "/watches/category/men" },
// //     { name: "Ladies Collection", image: Womenswatch, link: "/watches/category/women" },
// //     { name: "Wall Clocks", image: wallclock, link: "/watches/category/wallclocks" },
// //   ];

// //   return (
// //     <div className="bg-gray-50 w-full min-h-screen relative">
// //       <Navbar />

// //       <main>
// //         {/* HERO */}
// //         <div className="relative h-[400px] md:h-[550px] lg:h-[700px] w-full overflow-hidden">
// //           <HeroSlideshow />
// //         </div>

// //         {/* New luxurious circular collections */}
// //         <CollectionCircles />

// //         {/* Our Top Brands - luxurious design */}
// //         <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-20 bg-white rounded-3xl shadow-[0_15px_40px_rgba(194,171,114,0.3)]">
// //           <h2 className="text-5xl font-serif font-extrabold text-[#b89f56] mb-14 text-center drop-shadow-md tracking-wide uppercase">
// //             Our Top Brands
// //           </h2>

// //           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-16 place-items-center">
// //             {brands.map((brand) => (
// //               <div
// //                 key={brand.name}
// //                 className="relative w-full max-w-[280px] h-[240px] bg-gradient-to-tr from-[#fefcf6] via-[#f6ecd1] to-[#e9d8a6] rounded-3xl border-4 border-[#b89f56] shadow-[0_12px_32px_rgba(184,159,86,0.25)] hover:shadow-[0_16px_48px_rgba(184,159,86,0.45)] transition-shadow duration-300 flex flex-col items-center justify-center overflow-hidden group cursor-pointer px-6"
// //               >
// //                 <div className="absolute inset-0 bg-gradient-to-t from-black/[0.01] to-transparent opacity-20 group-hover:opacity-60 transition-opacity duration-300 rounded-3xl" />
// //                 <Image
// //                   src={brand.logo}
// //                   alt={`${brand.name} Logo`}
// //                   width={180}
// //                   height={90}
// //                   priority
// //                   className="object-contain mb-4 group-hover:scale-110 transition-transform duration-500"
// //                 />
// //                 <h3
// //                   className="text-2xl font-serif font-semibold text-[#3c3c3c] group-hover:text-[#b89f56] transition-colors tracking-wide select-none text-center truncate w-full"
// //                   title={brand.name}
// //                 >
// //                   {brand.name}
// //                 </h3>
// //               </div>
// //             ))}
// //           </div>
// //         </section>

// //         <StorySection />
// //         <TestimonialSection />
// //         <WhyChooseUs />
// //         <Contact />
// //       </main>

// //       <Footer />
// //     </div>
// //   );
// // }

// // import Image from "next/image";
// // import Navbar from "../components/Navbar";
// // import Footer from "../components/Footer";
// // import TestimonialSection from "../components/TestimonialSection";
// // import WhyChooseUs from "../components/WhyChooseUs";
// // import StorySection from "../components/StorySection";
// // import Contact from "@/components/Contact";
// // import HeroSlideshow from "@/components/HeroSlideshow";
// // import CollectionCircles from "@/components/CollectionCircles"; // Import new collections circles component

// // const KennethColelogo = "https://ik.imagekit.io/rajstorage2/store_frontend/Logos/kenneth-cole-logo.png";
// // const Tommylogo = "https://ik.imagekit.io/rajstorage2/store_frontend/Logos/Tommy_Hilfiger_Logo.png";
// // const Ajantalogo = "https://ik.imagekit.io/rajstorage2/store_frontend/Logos/ajanta-logo.jpg";
// // const Sonatalogo = "https://ik.imagekit.io/rajstorage2/store_frontend/Logos/sonata_logo.jpg";
// // const Titanlogo = "https://ik.imagekit.io/rajstorage2/store_frontend/Logos/titan.png";
// // const Fastracklogo = "https://ik.imagekit.io/rajstorage2/store_frontend/Logos/Fastrack_logo.svg.png";
// // const Casiologo = "https://ik.imagekit.io/rajstorage2/store_frontend/Logos/casio_logo.webp";
// // const Policelogo = "https://ik.imagekit.io/rajstorage2/store_frontend/Logos/police_logo.png";
// // const Sflogo = "https://ik.imagekit.io/rajstorage2/store_frontend/Logos/sf_logo.png";

// // const Menswatch = "https://ik.imagekit.io/rajstorage2/RAJ_WATCHES_Brand_2/4Kenneth%20Cole%20%20Fossil%20Tommy%20Police/images/32-NTTH_1792112/2_32-NTTH_1792112.jpg";
// // const Womenswatch = "https://ik.imagekit.io/rajstorage2/RAJ_WATCHES_Brand_2/5Poze/images/125-70039_KM05/3_125-70039_KM05.jpg";
// // const wallclock = "https://ik.imagekit.io/rajstorage2/RAJ_WATCHES_Brand_2/7Ajanta_images/15-2377/1_15-2377.jpg";

// // export default async function HomePage() {
// //   const brands = [
// //     { name: "Fastrack", logo: Fastracklogo },
// //     { name: "Titan", logo: Titanlogo },
// //     { name: "Sonata", logo: Sonatalogo },
// //     { name: "Kenneth Cole", logo: KennethColelogo },
// //     { name: "Ajanta", logo: Ajantalogo },
// //     { name: "SF", logo: Sflogo },
// //     { name: "Tommy Hilfiger", logo: Tommylogo },
// //     { name: "Police", logo: Policelogo },
// //     { name: "Casio", logo: Casiologo },
// //   ];

// //   const categoryData = [
// //     { name: "Gents Collection", image: Menswatch, link: "/watches/category/men" },
// //     { name: "Ladies Collection", image: Womenswatch, link: "/watches/category/women" },
// //     { name: "Wall Clocks", image: wallclock, link: "/watches/category/wallclocks" },
// //   ];

// //   return (
// //     <div className="bg-gray-50 w-full min-h-screen relative">
// //       <Navbar />

// //       <main>
// //         {/* HERO */}
// //         <div className="relative h-[400px] md:h-[550px] lg:h-[700px] w-full overflow-hidden">
// //           <HeroSlideshow />
// //         </div>

// //         {/* New luxurious circular collections */}
// //         <CollectionCircles />

// //         {/* Our Top Brands - luxurious design */}
// //         <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-20 bg-white rounded-3xl shadow-[0_15px_40px_rgba(194,171,114,0.3)]">
// //           <h2 className="text-5xl font-serif font-extrabold text-[#b89f56] mb-14 text-center drop-shadow-md tracking-widest uppercase">
// //             Our Top Brands
// //           </h2>

// //           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-16 place-items-center">
// //             {brands.map((brand) => (
// //               <div
// //                 key={brand.name}
// //                 className="relative w-full max-w-[300px] h-[240px] bg-gradient-to-tr from-[#fefcf6] via-[#f6ecd1] to-[#e9d8a6] rounded-3xl border-4 border-[#b89f56] shadow-[0_12px_32px_rgba(184,159,86,0.25)] hover:shadow-[0_16px_48px_rgba(184,159,86,0.45)] transition-shadow duration-300 flex flex-col items-center justify-center overflow-hidden group cursor-pointer"
// //               >
// //                 <div className="absolute inset-0 bg-gradient-to-t from-black/[0.01] to-transparent opacity-20 group-hover:opacity-60 transition-opacity duration-300 rounded-3xl" />
// //                 <Image
// //                   src={brand.logo}
// //                   alt={`${brand.name} Logo`}
// //                   width={200}
// //                   height={100}
// //                   priority
// //                   className="object-contain mb-6 group-hover:scale-110 transition-transform duration-500"
// //                 />
// //                 <h3 className="text-2xl font-serif font-semibold text-[#3c3c3c] group-hover:text-[#b89f56] transition-colors tracking-wide select-none">
// //                   {brand.name}
// //                 </h3>
// //               </div>
// //             ))}
// //           </div>
// //         </section>

// //         <StorySection />
// //         <TestimonialSection />
// //         <WhyChooseUs />
// //         <Contact />
// //       </main>

// //       <Footer />
// //     </div>
// //   );
// // }

// // // import Image from "next/image";
// // // import Navbar from "../components/Navbar";
// // // import Footer from "../components/Footer";
// // // import TestimonialSection from "../components/TestimonialSection";
// // // import WhyChooseUs from "../components/WhyChooseUs";
// // // import StorySection from "../components/StorySection";
// // // import Contact from "@/components/Contact";
// // // import HeroSlideshow from "@/components/HeroSlideshow";
// // // import CollectionCircles from "@/components/CollectionCircles"; // Import new collections circles component

// // // const KennethColelogo = "https://ik.imagekit.io/rajstorage2/store_frontend/Logos/kenneth-cole-logo.png";
// // // const Tommylogo = "https://ik.imagekit.io/rajstorage2/store_frontend/Logos/Tommy_Hilfiger_Logo.png";
// // // const Ajantalogo = "https://ik.imagekit.io/rajstorage2/store_frontend/Logos/ajanta-logo.jpg";
// // // const Sonatalogo = "https://ik.imagekit.io/rajstorage2/store_frontend/Logos/sonata_logo.jpg";
// // // const Titanlogo = "https://ik.imagekit.io/rajstorage2/store_frontend/Logos/titan.png";
// // // const Fastracklogo = "https://ik.imagekit.io/rajstorage2/store_frontend/Logos/Fastrack_logo.svg.png";
// // // const Casiologo = "https://ik.imagekit.io/rajstorage2/store_frontend/Logos/casio_logo.webp";
// // // const Policelogo = "https://ik.imagekit.io/rajstorage2/store_frontend/Logos/police_logo.png";
// // // const Sflogo = "https://ik.imagekit.io/rajstorage2/store_frontend/Logos/sf_logo.png";

// // // const Menswatch = "https://ik.imagekit.io/rajstorage2/RAJ_WATCHES_Brand_2/4Kenneth%20Cole%20%20Fossil%20Tommy%20Police/images/32-NTTH_1792112/2_32-NTTH_1792112.jpg";
// // // const Womenswatch = "https://ik.imagekit.io/rajstorage2/RAJ_WATCHES_Brand_2/5Poze/images/125-70039_KM05/3_125-70039_KM05.jpg";
// // // const wallclock = "https://ik.imagekit.io/rajstorage2/RAJ_WATCHES_Brand_2/7Ajanta_images/15-2377/1_15-2377.jpg";

// // // export default async function HomePage() {
// // //   const brands = [
// // //     { name: "Fastrack", logo: Fastracklogo },
// // //     { name: "Titan", logo: Titanlogo },
// // //     { name: "Sonata", logo: Sonatalogo },
// // //     { name: "Kenneth Cole", logo: KennethColelogo },
// // //     { name: "Ajanta", logo: Ajantalogo },
// // //     { name: "SF", logo: Sflogo },
// // //     { name: "Tommy Hilfiger", logo: Tommylogo },
// // //     { name: "Police", logo: Policelogo },
// // //     { name: "Casio", logo: Casiologo },
// // //   ];

// // //   const categoryData = [
// // //     { name: "Gents Collection", image: Menswatch, link: "/watches/category/men" },
// // //     { name: "Ladies Collection", image: Womenswatch, link: "/watches/category/women" },
// // //     { name: "Wall Clocks", image: wallclock, link: "/watches/category/wallclocks" },
// // //   ];

// // //   return (
// // //     <div className="bg-gray-50 w-full min-h-screen relative">
// // //       <Navbar />

// // //       <main>
// // //         {/* HERO */}
// // //         <div className="relative h-[400px] md:h-[550px] lg:h-[700px] w-full overflow-hidden">
// // //           <HeroSlideshow />
// // //         </div>

// // //         {/* New luxurious circular collections */}
// // //         <CollectionCircles />

// // //         {/* Our Top Brands - luxurious design */}
// // //         <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-0 bg-white rounded-3xl shadow-[0_10px_30px_rgba(194,171,114,0.15)]">
// // //           <h2 className="text-4xl font-serif font-extrabold text-[#c2ab72] mb-12 text-center drop-shadow-lg tracking-tight">
// // //             Our Top Brands
// // //           </h2>

// // //           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-12 place-items-center">
// // //             {brands.map((brand) => (
// // //               <div
// // //                 key={brand.name}
// // //                 className="relative w-full max-w-[280px] h-[220px] bg-gradient-to-tr from-[#fcf7f3] via-[#f7e9c0] to-[#ead9b6] rounded-3xl border-2 border-[#c2ab72] shadow-[0_8px_24px_rgba(194,171,114,0.2)] hover:shadow-[0_12px_40px_rgba(194,171,114,0.4)] transition-shadow duration-300 flex flex-col items-center justify-center overflow-hidden group"
// // //               >
// // //                 <div className="absolute inset-0 bg-gradient-to-t from-black/[0.02] to-transparent opacity-30 group-hover:opacity-50 transition-opacity duration-300 rounded-3xl" />
// // //                 <Image
// // //                   src={brand.logo}
// // //                   alt={`${brand.name} Logo`}
// // //                   width={180}
// // //                   height={90}
// // //                   className="object-contain mb-4 group-hover:scale-110 transition-transform duration-500"
// // //                 />
// // //                 <h3 className="text-xl font-serif font-semibold text-[#232323] group-hover:text-[#c2ab72] transition-colors tracking-wide select-none">
// // //                   {brand.name}
// // //                 </h3>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         </section>

// // //         <StorySection />
// // //         <TestimonialSection />
// // //         <WhyChooseUs />
// // //         <Contact />
// // //       </main>

// // //       <Footer />
// // //     </div>
// // //   );
// // // }

// // // // import Image from "next/image";
// // // // import Navbar from "../components/Navbar";
// // // // import Footer from "../components/Footer";
// // // // import TestimonialSection from "../components/TestimonialSection";
// // // // import WhyChooseUs from "../components/WhyChooseUs";
// // // // import StorySection from "../components/StorySection";
// // // // import Contact from "@/components/Contact";
// // // // import HeroSlideshow from "@/components/HeroSlideshow";
// // // // import CollectionCircles from "@/components/CollectionCircles"; // Import new collections circles component

// // // // const KennethColelogo = "https://ik.imagekit.io/rajstorage2/store_frontend/Logos/kenneth-cole-logo.png";
// // // // const Tommylogo = "https://ik.imagekit.io/rajstorage2/store_frontend/Logos/Tommy_Hilfiger_Logo.png";
// // // // const Ajantalogo = "https://ik.imagekit.io/rajstorage2/store_frontend/Logos/ajanta-logo.jpg";
// // // // const Sonatalogo = "https://ik.imagekit.io/rajstorage2/store_frontend/Logos/sonata_logo.jpg";
// // // // const Titanlogo = "https://ik.imagekit.io/rajstorage2/store_frontend/Logos/titan.png";
// // // // const Fastracklogo = "https://ik.imagekit.io/rajstorage2/store_frontend/Logos/Fastrack_logo.svg.png";
// // // // const Casiologo = "https://ik.imagekit.io/rajstorage2/store_frontend/Logos/casio_logo.webp";
// // // // const Policelogo = "https://ik.imagekit.io/rajstorage2/store_frontend/Logos/police_logo.png";
// // // // const Sflogo = "https://ik.imagekit.io/rajstorage2/store_frontend/Logos/sf_logo.png";

// // // // const Menswatch = "https://ik.imagekit.io/rajstorage2/RAJ_WATCHES_Brand_2/4Kenneth%20Cole%20%20Fossil%20Tommy%20Police/images/32-NTTH_1792112/2_32-NTTH_1792112.jpg";
// // // // const Womenswatch = "https://ik.imagekit.io/rajstorage2/RAJ_WATCHES_Brand_2/5Poze/images/125-70039_KM05/3_125-70039_KM05.jpg";
// // // // const wallclock = "https://ik.imagekit.io/rajstorage2/RAJ_WATCHES_Brand_2/7Ajanta_images/15-2377/1_15-2377.jpg";

// // // // export default async function HomePage() {
// // // //   const brands = [
// // // //     { name: "Fastrack", logo: Fastracklogo },
// // // //     { name: "Titan", logo: Titanlogo },
// // // //     { name: "Sonata", logo: Sonatalogo },
// // // //     { name: "Kenneth Cole", logo: KennethColelogo },
// // // //     { name: "Ajanta", logo: Ajantalogo },
// // // //     { name: "SF", logo: Sflogo },
// // // //     { name: "Tommy Hilfiger", logo: Tommylogo },
// // // //     { name: "Police", logo: Policelogo },
// // // //     { name: "Casio", logo: Casiologo },
// // // //   ];

// // // //   const categoryData = [
// // // //     { name: "Gents Collection", image: Menswatch, link: "/watches/category/men" },
// // // //     { name: "Ladies Collection", image: Womenswatch, link: "/watches/category/women" },
// // // //     { name: "Wall Clocks", image: wallclock, link: "/watches/category/wallclocks" },
// // // //   ];

// // // //   return (
// // // //     <div className="bg-gray-50 w-full min-h-screen relative">
// // // //       <Navbar />

// // // //       <main>
// // // //         {/* HERO */}
// // // //         <div className="relative h-[400px] md:h-[550px] lg:h-[700px] w-full overflow-hidden">
// // // //           <HeroSlideshow />
// // // //         </div>

// // // //         {/* New luxurious circular collections */}
// // // //         <CollectionCircles />

// // // //         {/* BRANDS (static beautiful grid) */}
// // // //         <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-0">
// // // //           <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
// // // //             Our Top Brands
// // // //           </h2>

// // // //           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 place-items-center">
// // // //             {brands.map((brand) => (
// // // //               <div
// // // //                 key={brand.name}
// // // //                 className="relative w-full max-w-[260px] h-[200px] bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center overflow-hidden group"
// // // //               >
// // // //                 <div className="absolute inset-0 bg-gradient-to-t from-black/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
// // // //                 <Image
// // // //                   src={brand.logo}
// // // //                   alt={`${brand.name} Logo`}
// // // //                   width={160}
// // // //                   height={80}
// // // //                   className="object-contain mb-3 group-hover:scale-105 transition-transform duration-500"
// // // //                 />
// // // //                 <h3 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
// // // //                   {brand.name}
// // // //                 </h3>
// // // //               </div>
// // // //             ))}
// // // //           </div>
// // // //         </section>

// // // //         <StorySection />
// // // //         <TestimonialSection />
// // // //         <WhyChooseUs />
// // // //         <Contact />
// // // //       </main>

// // // //       <Footer />
// // // //     </div>
// // // //   );
// // // // }

// // // // // import Image from "next/image";
// // // // // import Navbar from "../components/Navbar";
// // // // // import Footer from "../components/Footer";
// // // // // import TestimonialSection from "../components/TestimonialSection";
// // // // // import WhyChooseUs from "../components/WhyChooseUs";
// // // // // import StorySection from "../components/StorySection";
// // // // // import Contact from "@/components/Contact";
// // // // // import HeroSlideshow from "@/components/HeroSlideshow";

// // // // // const KennethColelogo = "https://ik.imagekit.io/rajstorage2/store_frontend/Logos/kenneth-cole-logo.png";
// // // // // const Tommylogo = "https://ik.imagekit.io/rajstorage2/store_frontend/Logos/Tommy_Hilfiger_Logo.png";
// // // // // const Ajantalogo = "https://ik.imagekit.io/rajstorage2/store_frontend/Logos/ajanta-logo.jpg";
// // // // // const Sonatalogo = "https://ik.imagekit.io/rajstorage2/store_frontend/Logos/sonata_logo.jpg";
// // // // // const Titanlogo = "https://ik.imagekit.io/rajstorage2/store_frontend/Logos/titan.png";
// // // // // const Fastracklogo = "https://ik.imagekit.io/rajstorage2/store_frontend/Logos/Fastrack_logo.svg.png";
// // // // // const Casiologo = "https://ik.imagekit.io/rajstorage2/store_frontend/Logos/casio_logo.webp";
// // // // // const Policelogo = "https://ik.imagekit.io/rajstorage2/store_frontend/Logos/police_logo.png";
// // // // // const Sflogo = "https://ik.imagekit.io/rajstorage2/store_frontend/Logos/sf_logo.png";

// // // // // const Menswatch = "https://ik.imagekit.io/rajstorage2/RAJ_WATCHES_Brand_2/4Kenneth%20Cole%20%20Fossil%20Tommy%20Police/images/32-NTTH_1792112/2_32-NTTH_1792112.jpg";
// // // // // const Womenswatch = "https://ik.imagekit.io/rajstorage2/RAJ_WATCHES_Brand_2/5Poze/images/125-70039_KM05/3_125-70039_KM05.jpg";
// // // // // const wallclock = "https://ik.imagekit.io/rajstorage2/RAJ_WATCHES_Brand_2/7Ajanta_images/15-2377/1_15-2377.jpg";

// // // // // export default async function HomePage() {
// // // // //   const brands = [
// // // // //     { name: "Fastrack", logo: Fastracklogo },
// // // // //     { name: "Titan", logo: Titanlogo },
// // // // //     { name: "Sonata", logo: Sonatalogo },
// // // // //     { name: "Kenneth Cole", logo: KennethColelogo },
// // // // //     { name: "Ajanta", logo: Ajantalogo },
// // // // //     { name: "SF", logo: Sflogo },
// // // // //     { name: "Tommy Hilfiger", logo: Tommylogo },
// // // // //     { name: "Police", logo: Policelogo },
// // // // //     { name: "Casio", logo: Casiologo },
// // // // //   ];

// // // // //   const categoryData = [
// // // // //     { name: "Gents Collection", image: Menswatch, link: "/watches/category/men" },
// // // // //     { name: "Ladies Collection", image: Womenswatch, link: "/watches/category/women" },
// // // // //     { name: "Wall Clocks", image: wallclock, link: "/watches/category/wallclocks" },
// // // // //   ];

// // // // //   return (
// // // // //     <div className="bg-gray-50 w-full min-h-screen relative">
// // // // //       <Navbar />

// // // // //       <main>
// // // // //         {/* HERO */}
// // // // //         <div className="relative h-[400px] md:h-[550px] lg:h-[700px] w-full overflow-hidden">
// // // // //           <HeroSlideshow />
// // // // //         </div>
// // // // //         <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
// // // // //   <h2 className="text-4xl font-serif font-extrabold text-[#c2ab72] mb-10 text-center drop-shadow-lg tracking-tight">
// // // // //     Shop by Collection
// // // // //   </h2>
// // // // //   <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
// // // // //     {categoryData.map((category) => (
// // // // //       <div
// // // // //         key={category.name}
// // // // //         className="relative h-[320px] rounded-3xl overflow-hidden group cursor-pointer shadow-[0_8px_32px_rgba(60,40,10,0.13)] hover:shadow-[0_14px_48px_rgba(194,171,114,0.2)] transition-all duration-500 border border-[#c2ab72]/80 bg-gradient-to-br from-[#fffff9] via-[#f7e9c0]/80 to-[#ead9b6]/60"
// // // // //         style={{ boxShadow: '0 8px 32px rgba(194,171,114,0.19)' }}
// // // // //       >
// // // // //         <a href={category.link} className="block w-full h-full">
// // // // //           <Image
// // // // //             src={category.image}
// // // // //             alt={category.name}
// // // // //             fill
// // // // //             className="object-cover transition-transform duration-700 group-hover:scale-110"
// // // // //             sizes="(max-width: 640px) 100vw, (max-width: 1200px) 33vw, 33vw"
// // // // //             priority={category.name === "Gents Collection"}
// // // // //           />
// // // // //           <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent flex items-end p-7 z-10">
// // // // //             <h3 className="text-3xl md:text-4xl font-serif font-extrabold text-[#c2ab72] drop-shadow-lg group-hover:text-white transition-all duration-300">
// // // // //               {category.name}
// // // // //             </h3>
// // // // //           </div>
// // // // //         </a>
// // // // //       </div>
// // // // //     ))}
// // // // //   </div>
// // // // // </section>

// // // // //         {/* CATEGORY */}
// // // // //         {/* <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
// // // // //           <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
// // // // //             Shop by Collection
// // // // //           </h2>
// // // // //           <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
// // // // //             {categoryData.map((category) => (
// // // // //               <div
// // // // //                 key={category.name}
// // // // //                 className="relative h-[280px] rounded-xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
// // // // //               >
// // // // //                 <a href={category.link} className="block w-full h-full">
// // // // //                   <Image
// // // // //                     src={category.image}
// // // // //                     alt={category.name}
// // // // //                     fill
// // // // //                     className="object-cover transition-transform duration-500 group-hover:scale-105"
// // // // //                     sizes="(max-width: 640px) 100vw, (max-width: 1200px) 33vw, 33vw"
// // // // //                     priority={category.name === "Gents Collection"}
// // // // //                   />
// // // // //                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6 z-10">
// // // // //                     <h3 className="text-3xl font-extrabold text-white">{category.name}</h3>
// // // // //                   </div>
// // // // //                 </a>
// // // // //               </div>
// // // // //             ))}
// // // // //           </div>
// // // // //         </section> */}

// // // // //         {/* BRANDS (static beautiful grid) */}
// // // // //         <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-0">
// // // // //           <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
// // // // //             Our Top Brands
// // // // //           </h2>

// // // // //           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 place-items-center">
// // // // //             {brands.map((brand) => (
// // // // //               <div
// // // // //                 key={brand.name}
// // // // //                 className="relative w-full max-w-[260px] h-[200px] bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center overflow-hidden group"
// // // // //               >
// // // // //                 <div className="absolute inset-0 bg-gradient-to-t from-black/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
// // // // //                 <Image
// // // // //                   src={brand.logo}
// // // // //                   alt={`${brand.name} Logo`}
// // // // //                   width={160}
// // // // //                   height={80}
// // // // //                   className="object-contain mb-3 group-hover:scale-105 transition-transform duration-500"
// // // // //                 />
// // // // //                 <h3 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
// // // // //                   {brand.name}
// // // // //                 </h3>
// // // // //               </div>
// // // // //             ))}
// // // // //           </div>
// // // // //         </section>

// // // // //         <StorySection />
// // // // //         <TestimonialSection />
// // // // //         <WhyChooseUs />
// // // // //         <Contact />
// // // // //       </main>

// // // // //       <Footer />
// // // // //     </div>
// // // // //   );
// // // // // }
