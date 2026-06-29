"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
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
      <span className="text-lg font-bold text-[#1a1a2e]">
        {formatPrice(price)}
      </span>
    </div>
  );
};

export default function CategoryPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const initialSlug = params?.slug || "all";

  const [isMounted, setIsMounted] = useState(false);
  const [slug, setSlug] = useState(initialSlug);

  const [filters, setFilters] = useState({
    brands: [],
    gender: [],
    collections: [],
    sortBy: "relevance",
    price: 50000,
  });

  const [page, setPage] = useState(1);

  // Load from sessionStorage post-mount to avoid hydration mismatch
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const savedFilters = sessionStorage.getItem(`rw-filters-${initialSlug}`);
        if (savedFilters) setFilters(JSON.parse(savedFilters));

        const savedPage = sessionStorage.getItem(`rw-page-${initialSlug}`);
        if (savedPage) setPage(parseInt(savedPage, 10) || 1);
      } catch (e) {}
    }
  }, [initialSlug]);

  const [watches, setWatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit] = useState(12);
  const [totalPages, setTotalPages] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Update slug when URL param changes
  useEffect(() => {
    setSlug(params?.slug || "all");
  }, [params]);

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

  // Save to sessionStorage whenever filters or page changes
  useEffect(() => {
    if (isMounted) {
      sessionStorage.setItem(`rw-filters-${slug}`, JSON.stringify(filters));
      sessionStorage.setItem(`rw-page-${slug}`, page.toString());
    }
  }, [filters, page, slug, isMounted]);

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

      const searchQuery = searchParams.get("search");
      if (searchQuery) paramsObj.append("search", searchQuery);

      filters.collections.forEach((selectedLabel) => {
        const collection = availableCollections.find(
          (col) => col.label === selectedLabel
        );
        if (collection) {
          if (Array.isArray(collection.value)) {
            collection.value.forEach((v) => paramsObj.append("category", v));
          } else {
            paramsObj.append("category", collection.value);
          }
        }
      });

      const categoryMap = {
        men: "Guys Watch",
        women: "Girls Watch",
        wallclocks: "Wall clock",
        unisex: "unisex watch",
        couple: "couple watch",
        smartwatches: [
          "smart-guys watch",
          "smart-girls watch",
          "smart-unisex watch",
        ],
        all: "all",
      };
      const dbCategory = categoryMap[slug?.toLowerCase()] || "all";

      if (dbCategory !== "all") {
        if (Array.isArray(dbCategory)) {
          dbCategory.forEach((cat) => paramsObj.append("category", cat));
        } else {
          paramsObj.append("category", dbCategory);
        }
      }

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
  }, [slug, page, filters, searchParams.get("search")]);

  const handleReset = () => {
    setFilters({
      brands: [],
      gender: [],
      collections: [],
      sortBy: "relevance",
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
    <section className="bg-[#faf9f6] min-h-screen w-full py-6 md:py-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Back Button - Always visible at top */}
        <div className="mb-6">
          <BackButton fallbackUrl="/" label="Back to Home" />
        </div>

        {/* Mobile header with title and Filters button */}
        <div className="mb-4 flex items-center justify-between lg:hidden">
          <h1 className="text-lg font-semibold text-[#1a1a2e]">{title}</h1>
          <button
            onClick={() => setFiltersOpen(true)}
            className="px-4 py-2 rounded-lg bg-[#1a1a2e] text-white text-sm font-semibold shadow-sm hover:bg-[#c9a84c] transition-colors duration-300"
          >
            Filters
          </button>
        </div>

        {/* Desktop title */}
        <div className="hidden lg:block mb-6">
          <h1 className="text-2xl font-bold text-[#1a1a2e]">{title}</h1>
        </div>

        <div className="flex gap-6">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <FilterSidebar
              slug={slug}
              filters={filters}
              setFilters={setFilters}
              onClearAll={handleReset}
              setPage={setPage}
            />
          </aside>

          {/* Product grid */}
          <div className="flex-1">
            {loading ? (
              <div className="text-center py-16 text-[#6b7280]">
                <div className="luxury-spinner mx-auto mb-4"></div>
                Loading watches...
              </div>
            ) : watches.length === 0 ? (
              <div className="text-center py-16 text-[#6b7280]">
                No products found for selected filters.
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
                  {watches.map((watch) => (
                    <Link
                      key={watch.id}
                      href={`/watches/product/${watch.id}`}
                      className="group block bg-white p-3 md:p-4 rounded-xl border border-[#e5e7eb] hover:border-[#c9a84c] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-400"
                    >
                      <div className="relative w-full aspect-[4/5] mb-3 md:mb-4 overflow-hidden rounded-lg bg-[#faf9f6]">
                        <Image
                          src={
                            Array.isArray(watch.images)
                              ? watch.images[0]
                              : watch.images?.split(",")[0]
                          }
                          alt={watch.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      <p className="text-[11px] md:text-xs text-[#c9a84c] font-semibold uppercase tracking-wide">
                        {watch.brand}
                      </p>
                      <h2 className="text-sm md:text-base font-bold text-[#1a1a2e] truncate mt-0.5">
                        {watch.name}
                      </h2>

                      <PriceDisplay price={Number(watch.price ?? 0)} />
                    </Link>
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center items-center gap-3 mt-10">
                  <button
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    disabled={page === 1}
                    className="px-4 py-2 border border-[#e5e7eb] rounded-lg hover:border-[#c9a84c] hover:text-[#c9a84c] disabled:opacity-40 text-[#1a1a2e] text-sm font-medium transition-all duration-300"
                  >
                    Previous
                  </button>
                  <span className="text-[#1a1a2e] text-sm font-medium">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                    disabled={page === totalPages}
                    className="px-4 py-2 border border-[#e5e7eb] rounded-lg hover:border-[#c9a84c] hover:text-[#c9a84c] disabled:opacity-40 text-[#1a1a2e] text-sm font-medium transition-all duration-300"
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
          <div className="w-80 max-w-[80%] h-full bg-white shadow-xl p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-[#1a1a2e]">Filters</h2>
              <button
                onClick={() => setFiltersOpen(false)}
                className="text-sm text-[#6b7280] hover:text-[#1a1a2e] transition-colors"
              >
                Close
              </button>
            </div>
            <FilterSidebar
              slug={slug}
              filters={filters}
              setFilters={setFilters}
              onClearAll={handleReset}
              setPage={setPage}
            />
          </div>
        </div>
      )}
    </section>
  );
}