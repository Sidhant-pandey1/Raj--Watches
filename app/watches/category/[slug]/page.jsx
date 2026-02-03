"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams, useRouter, usePathname } from "next/navigation";
import FilterSidebar from "@/components/FilterSidebar";
import BackButton from "@/components/BackButton";

const availableCollections = [
  { label: "Men", value: "Guys Watch" },
  { label: "Women", value: "Girls Watch" },
  { label: "Couple", value: "couple watch" },
  {
    label: "Smartwatches",
    value: ["smart-guys watch", "smart-girls watch", "smart-unisex watch"],
  },
  { label: "Wallclock", value: "Wall clock" },
];

const PriceDisplay = ({ price }) => {
  const formatPrice = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <div className="mt-2 flex items-baseline gap-2">
      <span className="text-xl font-extrabold text-gray-900">
        {formatPrice(price)}
      </span>
    </div>
  );
};

export default function CategoryPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  const [slug, setSlug] = useState("");
  const [filters, setFilters] = useState({
    brands: [],
    gender: [],
    collections: [],
    sortBy: "relevance",
    price: 50000,
  });
  const [watches, setWatches] = useState([]);
  const [loading, setLoading] = useState(true);

  // Initialize page from URL, default to 1
  const initialPage = Number(searchParams.get("page")) || 1;
  const [page, setPage] = useState(initialPage);
  
  const [limit] = useState(12);
  const [totalPages, setTotalPages] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    setSlug(params?.slug || "all");
  }, [params]);

  // Sync state changes to URL
  useEffect(() => {
    const paramsObj = new URLSearchParams(searchParams.toString());
    
    // Only update if changed
    if (Number(paramsObj.get("page")) !== page) {
        if (page > 1) {
            paramsObj.set("page", page);
        } else {
            paramsObj.delete("page");
        }
        router.push(`${pathname}?${paramsObj.toString()}`, { scroll: false });
    }
  }, [page, pathname, router, searchParams]);

  // Handle brand from URL query params (e.g., ?brand=Titan)
  useEffect(() => {
    const brandFromUrl = searchParams?.get("brand");
    if (brandFromUrl && !filters.brands.includes(brandFromUrl)) {
      setFilters((prev) => ({
        ...prev,
        brands: [...prev.brands, brandFromUrl],
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const fetchWatches = async () => {
    if (!slug) return;
    setLoading(true);

    try {
      const paramsObj = new URLSearchParams();
      paramsObj.append("page", page);
      paramsObj.append("limit", limit);

      if (filters.price) paramsObj.append("price", filters.price);
      if (filters.brands.length > 0)
        paramsObj.append("brands", filters.brands.join(","));
      if (filters.gender.length > 0)
        paramsObj.append("gender", filters.gender.join(","));
      if (filters.sortBy) paramsObj.append("sort", filters.sortBy);

      const selectedLabels = filters.collections;
      const currentSlug = slug?.toLowerCase();

      // Helper to check active state
      const isActive = (label, slugKeys) => 
        selectedLabels.includes(label) || (Array.isArray(slugKeys) ? slugKeys.includes(currentSlug) : currentSlug === slugKeys);

      const menActive = isActive("Men", "men");
      const womenActive = isActive("Women", "women");
      const smartActive = isActive("Smartwatches", "smartwatches");
      const wallActive = isActive("Wallclock", "wallclocks");
      const coupleActive = isActive("Couple", "couple");

      let categoriesToFetch = new Set();

      // 1. Smartwatches Logic (Intersection with Gender)
      if (smartActive) {
        if (menActive && !womenActive) {
          categoriesToFetch.add("smart-guys watch");
          categoriesToFetch.add("smart-unisex watch");
        } else if (womenActive && !menActive) {
          categoriesToFetch.add("smart-girls watch");
          categoriesToFetch.add("smart-unisex watch");
        } else {
          // All Smartwatches (if no gender or both genders)
          categoriesToFetch.add("smart-guys watch");
          categoriesToFetch.add("smart-girls watch");
          categoriesToFetch.add("smart-unisex watch");
        }
      }

      // 2. Wall Clock Logic
      if (wallActive) {
        categoriesToFetch.add("Wall clock");
      }

      // 3. Standard Watch Logic (Only if NO specialized type is active)
      // If user wants "Men" + "Smart", we only show Smart. We check !smartActive before adding standard.
      if (!smartActive && !wallActive) {
        if (menActive) categoriesToFetch.add("Guys Watch");
        if (womenActive) categoriesToFetch.add("Girls Watch");
        if (coupleActive) categoriesToFetch.add("couple watch");
      }

      // 4. Default / Fallback Logic
      if (categoriesToFetch.size === 0) {
        // Handle specific slugs not covered by filters (e.g., 'unisex')
        const categoryMap = {
          unisex: "unisex watch",
          all: "all",
        };
        const mapped = categoryMap[currentSlug];
        if (mapped) {
          categoriesToFetch.add(mapped);
        } else {
          // If purely empty and not a known slug, default to 'all' or let backend handle empty query
           if (currentSlug === 'all') categoriesToFetch.add("all");
        }
      }

      // Append to params
      categoriesToFetch.forEach((cat) => paramsObj.append("category", cat));

      const res = await fetch(`/api/watches?${paramsObj.toString()}`);
      const data = await res.json();

      if (data?.status === "success") {
        setWatches(data.data || []);
        setTotalPages(data.totalPages || 1);
      } else {
        setWatches([]);
        setTotalPages(1);
      }
    } catch (err) {
      console.error("Error fetching watches:", err);
      setWatches([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWatches();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, page, filters]);

  const handleReset = () => {
    setFilters({
      brands: [],
      gender: [],
      collections: [],
      sortBy: "asc",
      price: 50000,
    });
    setPage(1);
  };

  const titleSlug = slug || "all";
  const title =
    titleSlug === "all"
      ? "All Watches"
      : `${titleSlug[0].toUpperCase()}${titleSlug.slice(1)} Watches`;

  return (
    <section className="bg-gray-50 min-h-screen w-full py-6 md:py-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Back Button - Always visible at top */}
        <div className="mb-6">
          <BackButton fallbackUrl="/" label="Back to Home" disableHistory={true} />
        </div>

        {/* Mobile header with title and Filters button */}
        <div className="mb-4 flex items-center justify-between lg:hidden">
          <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
          <button
            onClick={() => setFiltersOpen(true)}
            className="px-4 py-2 rounded-full bg-[--accent-gold] text-white text-sm font-semibold shadow-sm"
          >
            Filters
          </button>
        </div>

        {/* Desktop title */}
        <div className="hidden lg:block mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        </div>

        <div className="flex gap-6">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <FilterSidebar
              slug={slug}
              filters={filters}
              setFilters={setFilters}
              setPage={setPage}
              onClearAll={handleReset}
            />
          </aside>

          {/* Product grid */}
          <div className="flex-1">
            {loading ? (
              <div className="text-center py-16 text-gray-500">
                Loading watches...
              </div>
            ) : watches.length === 0 ? (
              <div className="text-center py-16 text-gray-500">
                No products found for selected filters.
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                  {watches.map((watch) => (
                    <Link
                      key={watch.id}
                      href={`/watches/product/${watch.id}`}
                      className="group block bg-white p-3 md:p-4 rounded-xl shadow hover:shadow-xl transition"
                    >
                      <div className="relative w-full aspect-[4/5] mb-3 md:mb-4 overflow-hidden rounded-lg bg-gray-100">
                        <Image
                          src={
                            Array.isArray(watch.images)
                              ? watch.images[0]
                              : watch.images?.split(",")[0]
                          }
                          alt={watch.name}
                          fill
                          className="object-cover group-hover:scale-105 transition"
                        />
                      </div>

                      <p className="text-[11px] md:text-xs text-gray-500 uppercase">
                        {watch.brand}
                      </p>
                      <h2 className="text-sm md:text-base font-bold text-gray-800 truncate">
                        {watch.name}
                      </h2>

                      <PriceDisplay price={Number(watch.price ?? 0)} />
                    </Link>
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center items-center gap-3 mt-8 md:mt-10">
                  <button
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    disabled={page === 1}
                    className="px-3 md:px-4 py-1 border rounded-md hover:bg-gray-100 disabled:opacity-50 text-black"
                  >
                    Previous
                  </button>
                  <span className="text-black text-sm md:text-base">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                    disabled={page === totalPages}
                    className="px-3 md:px-4 py-1 border rounded-md hover:bg-gray-100 disabled:opacity-50 text-black"
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {filtersOpen && (
        <div className="fixed inset-0 z-40 flex lg:hidden">
          <div
            className="flex-1 bg-black/40"
            onClick={() => setFiltersOpen(false)}
          />
          <div className="w-80 max-w-[80%] h-full bg-white dark:bg-neutral-900 shadow-xl p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold">Filters</h2>
              <button
                onClick={() => setFiltersOpen(false)}
                className="text-sm text-gray-500"
              >
                Close
              </button>
            </div>
            <FilterSidebar
              slug={slug}
              filters={filters}
              setFilters={setFilters}
              setPage={setPage}
              onClearAll={handleReset}
            />
          </div>
        </div>
      )}
    </section>
  );
}