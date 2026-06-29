"use client";

import React, { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const availableBrands = [
  "tommy hilfiger",
  "kenneth cole",
  "police",
  "casio",
  "titan",
  "fastrack",
  "sonata",
  "ajanta",
  "solar",
];

const wallclockBrands = ["ajanta", "titan", "solar"];

const availableCollections = [
  { label: "Men", value: "Guys Watch" },
  { label: "Women", value: "Girls Watch" },
  { label: "Couple", value: "couple watch" },
  {
    label: "Smartwatches",
    value: ["smart-guys watch", "smart-girls watch", "smart-unisex watch"],
  },
  { label: "Wall Clocks", value: "Wall clock" },
];

const genderOptions = ["Men", "Women", "Unisex"];

const sortOptions = [
  { value: "asc", label: "Price: Low to High" },
  { value: "relevance", label: "Relevance" },
  { value: "desc", label: "Price: High to Low" },
];

export default function FilterSidebar({
  slug,
  filters = {},
  setFilters,
  setPage,
  onClearAll,
  setPage,
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getArray = (arr) => (Array.isArray(arr) ? arr : []);

  const normalize = (s = "") =>
    String(s).toLowerCase().replace(/[\s-_]+/g, "");

  const isWallClockSelectedFromFilters = () => {
    const cols = getArray(filters.collections);
    return cols.some((c) => normalize(c).includes("wall"));
  };

  function arraysEqual(a = [], b = []) {
    if (a.length !== b.length) return false;
    const sa = [...a].sort();
    const sb = [...b].sort();
    return sa.every((v, i) => v === sb[i]);
  }

  // Preselect collection based on URL
  useEffect(() => {
    const collQuery = searchParams?.get("collection");
    const path = pathname || "";

    const findCollectionLabel = (candidate) => {
      if (!candidate) return null;
      const norm = normalize(candidate);
      const found = availableCollections.find(
        (c) => normalize(c.label) === norm
      );
      if (found) return found.label;
      if (norm.includes("wall")) return "Wall Clocks";
      return null;
    };

    const candidateFromQuery = findCollectionLabel(collQuery);
    const pathParts = path.split("/").filter(Boolean);
    const lastPart = pathParts[pathParts.length - 1] || "";
    const candidateFromPath = findCollectionLabel(lastPart);

    const candidate = candidateFromQuery || candidateFromPath;
    if (!candidate) return;

    const prevCols = getArray(filters.collections);
    if (prevCols.includes(candidate)) {
      if (
        normalize(candidate).includes("wall") &&
        !arraysEqual(
          getArray(filters.brands),
          getArray(filters.brands).filter((b) => wallclockBrands.includes(b))
        )
      ) {
        setFilters((prev = {}) => ({
          ...prev,
          brands: getArray(prev.brands).filter((b) =>
            wallclockBrands.includes(b)
          ),
        }));
      }
      return;
    }

    setFilters((prev = {}) => {
      const nextCollections = [...getArray(prev.collections), candidate];
      const isWall = normalize(candidate).includes("wall");
      const nextBrands = isWall
        ? getArray(prev.brands).filter((b) => wallclockBrands.includes(b))
        : prev.brands;

      return {
        ...prev,
        collections: nextCollections,
        brands: nextBrands,
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams?.toString()]);

  const isChecked = (group, value) => {
    const grp = filters[group];
    if (Array.isArray(grp)) return grp.includes(value);
    return grp === value;
  };

  const toggleCheckbox = (group, value) => {
    setFilters((prev = {}) => {
      const prevGroup = Array.isArray(prev[group]) ? prev[group] : [];
      const exists = prevGroup.includes(value);
      const nextGroup = exists
        ? prevGroup.filter((v) => v !== value)
        : [...prevGroup, value];

      setPage?.(1);

      if (group === "collections") {
        const wallSelected = nextGroup.some((c) =>
          normalize(c).includes("wall")
        );
        const nextBrands = wallSelected
          ? getArray(prev.brands).filter((b) => wallclockBrands.includes(b))
          : prev.brands;
        return {
          ...prev,
          collections: nextGroup,
          brands: nextBrands,
        };
      }

      return {
        ...prev,
        [group]: nextGroup,
      };
    });
    if (setPage) setPage(1);
  };

  const handlePrice = (e) => {
    const val = Number(e.target.value || 0);
    setFilters((prev = {}) => ({
      ...prev,
      price: val,
    }));
    setPage?.(1);
  };

  const handleSort = (e) => {
    setFilters((prev = {}) => ({
      ...prev,
      sortBy: e.target.value,
    }));
    setPage?.(1);
  };

  const activeWall = isWallClockSelectedFromFilters();
  const brandsToShow = activeWall ? wallclockBrands : availableBrands;

  const currentPrice =
    typeof filters.price === "number" ? filters.price : 50000;
  const currentSort = filters.sortBy || "relevance";

  const titleSlug = slug || "all";
  const title =
    titleSlug === "all"
      ? "All Watches"
      : `${titleSlug[0].toUpperCase()}${titleSlug.slice(1)} Watches`;

  return (
    <div className="w-full bg-white rounded-xl border border-[#e5e7eb] p-5 md:p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-xs font-semibold tracking-[0.15em] text-[#6b7280] uppercase">
            FILTER BY
          </p>
          <p className="text-sm text-[#9ca3af] mt-1">{title}</p>
        </div>
        <button
          onClick={onClearAll}
          className="px-3.5 py-1.5 rounded-lg bg-[#1a1a2e] text-white text-xs font-semibold hover:bg-[#c9a84c] transition-colors duration-300"
        >
          Clear All
        </button>
      </div>

      <div className="mb-6">
        <p className="text-xs font-semibold text-[#1a1a2e] mb-2">Sort By</p>
        <select
          value={currentSort}
          onChange={handleSort}
          className="w-full border border-[#e5e7eb] rounded-lg text-[#1a1a2e] px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-[#c9a84c] focus:border-[#c9a84c] transition-all"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <p className="text-xs font-semibold text-[#1a1a2e] mb-2">Brands</p>
        <div className="space-y-2 max-h-40 overflow-y-auto pr-1 custom-scrollbar">
          {brandsToShow.map((brand) => (
            <label
              key={brand}
              className="flex items-center gap-2.5 text-sm text-[#4b5563] cursor-pointer hover:text-[#1a1a2e] transition-colors"
            >
              <input
                type="checkbox"
                checked={isChecked("brands", brand)}
                onChange={() => toggleCheckbox("brands", brand)}
                className="h-4 w-4 rounded border-[#d1d5db] text-[#c9a84c] accent-[#c9a84c]"
              />
              <span className="capitalize">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Collections */}
      <div className="mb-6">
        <p className="text-xs font-semibold text-[#1a1a2e] mb-2">Collection</p>
        <div className="space-y-2">
          {availableCollections.map((c) => (
            <label
              key={c.label}
              className="flex items-center gap-2.5 text-sm text-[#4b5563] cursor-pointer hover:text-[#1a1a2e] transition-colors"
            >
              <input
                type="checkbox"
                checked={isChecked("collections", c.label)}
                onChange={() => toggleCheckbox("collections", c.label)}
                className="h-4 w-4 rounded border-[#d1d5db] text-[#c9a84c] accent-[#c9a84c]"
              />
              <span>{c.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Gender */}
      <div className="mb-6">
        <p className="text-xs font-semibold text-[#1a1a2e] mb-2">Gender</p>
        <div className="space-y-2">
          {genderOptions.map((g) => (
            <label
              key={g}
              className="flex items-center gap-2.5 text-sm text-[#4b5563] cursor-pointer hover:text-[#1a1a2e] transition-colors"
            >
              <input
                type="checkbox"
                checked={isChecked("gender", g)}
                onChange={() => toggleCheckbox("gender", g)}
                className="h-4 w-4 rounded border-[#d1d5db] text-[#c9a84c] accent-[#c9a84c]"
              />
              <span>{g}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold text-[#1a1a2e] mb-2">Max Price</p>
        <input
          type="range"
          min={1000}
          max={50000}
          step={500}
          value={currentPrice}
          onChange={handlePrice}
          className="w-full accent-[#c9a84c]"
        />
        <p className="mt-1.5 text-sm text-[#4b5563]">
          Up to{" "}
          <span className="font-semibold text-[#1a1a2e]">
            ₹{currentPrice.toLocaleString("en-IN")}
          </span>
        </p>
      </div>
    </div>
  );
}
