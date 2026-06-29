import Image from "next/image";
import Link from "next/link";

const collections = [
  {
    name: "Men",
    imgSrc: "/images/men-watch.png",
    link: "/watches/category/men",
  },
  {
    name: "Women",
    imgSrc: "/images/woman-watch.png",
    link: "/watches/category/women",
  },
  {
    name: "Couple",
    imgSrc: "/images/Couple-watch.png",
    link: "/watches/category/couple",
  },
  {
    name: "Smartwatches",
    imgSrc: "/images/smart-watch.png",
    link: "/watches/category/smartwatches",
  },
  {
    name: "Wall Clocks",
    imgSrc: "/images/wall-clock.png",
    link: "/watches/category/wallclocks",
  },
];

export default function CollectionCircles() {
  return (
    <section className="bg-[#faf9f6] py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <h2 className="text-2xl sm:text-3xl font-semibold text-[#1a1a2e] mb-10 sm:mb-14 text-center tracking-tight">
          Shop by Collection
        </h2>
        
        {/* Minimal grid layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-6 justify-center">
          {collections.map(({ name, imgSrc, link }) => (
            <Link
              href={link}
              key={name}
              className="group flex flex-col items-center cursor-pointer text-center"
            >
              <div className="relative w-full aspect-square bg-[#faf9f6] border border-[#e5e7eb] rounded-full overflow-hidden transition-all duration-400 group-hover:border-[#c9a84c] group-hover:shadow-lg group-hover:-translate-y-1 flex items-center justify-center">
                <Image
                  src={imgSrc}
                  alt={name}
                  width={200}
                  height={200}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  priority
                />
              </div>
              <span className="mt-3.5 text-xs sm:text-[13px] font-semibold tracking-wide uppercase text-[#6b7280] group-hover:text-[#1a1a2e] transition-colors duration-300">
                {name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
