import prisma from "@/lib/prisma";
import LuxeButtons from "@/components/LuxeButtons";
import Gallery from "@/components/Gallery";
import ProductNavigation from "@/components/ProductNavigation";
import { Cinzel, Montserrat } from "next/font/google";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

/**
 * ProductPage – Server Component
 */
export default async function ProductPage({ params }) {
  const { id: rawId } = await params;

  if (!rawId) throw new Error("Invalid product id");

  const product = await prisma.watch.findUnique({
    where: { id: rawId },
  });

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 font-semibold">
        Product not found.
      </div>
    );
  }

  const imageUrls = Array.isArray(product.images)
    ? product.images.filter(Boolean)
    : [];

  const galleryImages = imageUrls.length
    ? imageUrls
    : ["/mnt/data/Screenshot 2025-11-24 at 15.32.07.png"];

  function highlight(label, ...keys) {
    const desc = product?.description || "";
    for (let key of keys) {
      const regex = new RegExp(`${key}\\s*:?\\s*(.+)`, "i");
      const match = desc
        .split("*")
        .map((l) => l.trim())
        .find((l) => regex.test(l));
      if (match) return match.match(regex)?.[1]?.trim();
    }
    return null;
  }

  const highlights = [
    { label: "Brand", value: product.brand },
    { label: "Gender", value: highlight("Gender", "gender") },
    { label: "Strap Material", value: highlight("Strap Material", "strap material") },
    { label: "Strap Color", value: highlight("Strap Color", "strap color") },
    { label: "Glass", value: highlight("Glass Material", "glass material") },
    { label: "Warranty", value: highlight("Warranty", "warranty") },
    { label: "Dial", value: highlight("Dial Color", "dial color") },
    { label: "Movement", value: highlight("Movement", "movement") },
  ].filter((h) => h.value);

  const formatPrice = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <div
      className={`relative min-h-screen bg-[#f6f3ed] overflow-x-hidden ${montserrat.className}`}
    >
      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-[#b89f56]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[420px] h-[520px] bg-[#a88e45]/10 rounded-full blur-[120px]" />
      </div>

      {/* Navigation */}
      <div className="relative z-10 max-w-[1500px] mx-auto px-6 h-16 pt-4 flex items-center">
        <ProductNavigation />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-10 lg:py-0 lg:h-[calc(100vh-4rem)] flex flex-col lg:flex-row items-center gap-12">
        
        {/* Gallery */}
        <div className="w-full lg:w-[45%] flex justify-center lg:justify-end">
          <div className="w-full max-w-[520px] rounded-3xl overflow-hidden shadow-[0_30px_70px_-40px_rgba(0,0,0,0.35)]">
            <Gallery images={galleryImages} productName={product.name} />
          </div>
        </div>

        {/* Details */}
        <div className="w-full lg:w-[55%] flex flex-col justify-center max-h-[640px] lg:overflow-y-auto lg:pr-4 scrollbar-thin scrollbar-thumb-[#b89f56]/20">
          
          {/* Brand */}
          <span className="uppercase text-[0.7rem] tracking-[0.3em] font-semibold text-[#b89f56] mb-3">
            {product.brand}
          </span>

          {/* Title */}
          <h1
            className={`${cinzel.className} text-[2.7rem] lg:text-[3.8rem] leading-tight font-semibold text-[#23221d]`}
          >
            {product.name}
          </h1>

          {/* Price */}
          <p
            className={`${cinzel.className} mt-3 text-[1.6rem] font-semibold text-[#3a382f] opacity-90`}
          >
            {formatPrice(product.price)}
          </p>

          {/* Divider */}
          <div className="my-6 h-px w-20 bg-[#b89f56]/40" />

          {/* Highlights */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-8">
            {highlights.slice(0, 6).map((h, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-[0.65rem] uppercase tracking-widest text-[#9f946c] font-semibold">
                  {h.label}
                </span>
                <span className="text-sm font-medium text-[#23221d]">
                  {h.value}
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="pt-2">
            <LuxeButtons product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}