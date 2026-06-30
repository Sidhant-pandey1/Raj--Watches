import prisma from "@/lib/prisma";
import LuxeButtons from "../../../../components/LuxeButtons";
import Gallery from "../../../../components/Gallery";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import BackButton from "../../../../components/BackButton";
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
      className={`relative min-h-screen bg-gray-50 overflow-x-hidden ${montserrat.className}`}
    >
      <Navbar />

      <main className="relative z-10 max-w-[1400px] mx-auto px-6 py-10 lg:py-16 flex flex-col lg:flex-row items-start gap-12">
        {/* Left Side: Back Button & Gallery */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6 lg:sticky lg:top-32">
          <div className="self-start">
            <BackButton fallbackUrl="/watches/category/all" label="Back to Collection" />
          </div>
          
          <div className="w-full max-w-[600px] mx-auto lg:mx-0 rounded-3xl overflow-hidden shadow-lg bg-white">
            <Gallery images={galleryImages} productName={product.name} />
          </div>
        </div>

        {/* Right Side: Details */}
        <div className="w-full lg:w-1/2 flex flex-col justify-start pt-2 lg:pt-14">
          {/* Brand */}
          <span className="uppercase text-[0.75rem] tracking-[0.3em] font-bold text-[#c9a84c] mb-3">
            {product.brand}
          </span>

          {/* Title */}
          <h1
            className={`${cinzel.className} text-[2.2rem] sm:text-[3rem] lg:text-[3.5rem] leading-tight font-bold text-[#1a1a2e]`}
          >
            {product.name}
          </h1>

          {/* Price */}
          <p
            className={`${cinzel.className} mt-4 text-[1.8rem] font-bold text-[#1a1a2e]`}
          >
            {formatPrice(product.price)}
          </p>

          {/* Divider */}
          <div className="my-8 h-px w-24 bg-[#e5e7eb]" />

          {/* Highlights */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-6 mb-10">
            {highlights.slice(0, 8).map((h, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-[0.7rem] uppercase tracking-widest text-[#6b7280] font-semibold mb-1">
                  {h.label}
                </span>
                <span className="text-sm font-medium text-[#1a1a2e]">
                  {h.value}
                </span>
              </div>
            ))}
          </div>

          {/* Description (Optional if you want it) */}
          {product.description && (
            <div className="mb-10 text-sm text-[#4b5563] leading-relaxed">
              <p className="font-semibold text-[#1a1a2e] mb-2 uppercase text-xs tracking-wider">About this watch</p>
              <div className="whitespace-pre-line">{product.description.replace(/\*/g, '')}</div>
            </div>
          )}

          {/* CTA */}
          <div className="pt-2">
            <LuxeButtons product={product} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}