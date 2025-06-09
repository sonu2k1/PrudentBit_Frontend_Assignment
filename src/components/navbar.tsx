"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavbarProps = {
  onSearchChange?: (search: string) => void;
  onSortChange?: (sort: string) => void;
  activeView: string;
  onViewChange?: (view: string) => void;
  filters?: string[];
  setFilters?: (filters: string[]) => void;
  totalPatients?: number;
};

export default function Navbar({
  onSearchChange,
  onSortChange,
  activeView,
  onViewChange,
  filters = [],
  setFilters = () => {},
  totalPatients = 0,
}: NavbarProps) {
  const pathname = usePathname();
  const [search, setSearch] = useState("");
  const [sortOptions] = useState(["Name", "Age", "Date", "Status"]);
  const [selectedSort, setSelectedSort] = useState("Name");
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const removeFilter = (option: string) => {
    setFilters(filters.filter((f) => f !== option));
  };

  const handleSortSelect = (option: string) => {
    setSelectedSort(option);
    setShowSortDropdown(false);
    onSortChange?.(option);
  };

  const handleViewChange = (view: string) => {
    onViewChange?.(view);
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      onSearchChange?.(search);
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [search]);

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-[#4285F4] text-white flex justify-between items-center px-6 py-4 relative overflow-hidden">
        <div>
          <h1 className="text-lg font-semibold">Patient Directory</h1>
          <p className="text-sm opacity-80">{totalPatients} Patients Found</p>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/2 opacity-40">
          <Image
            src="/image.png"
            alt="pattern"
            fill
            sizes="50vw"
            priority
            style={{ objectFit: "cover", objectPosition: "right" }}
          />
        </div>
      </section>

      {/* Main */}
      <div className="p-6 space-y-4">
        {/* Tabs */}
        <div className="flex space-x-4 border-b">
          <Link href="/tableview" onClick={() => handleViewChange("tableview")}>
            <button
              className={`pb-2 text-sm font-medium transition-colors ${
                activeView === "tableview"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Table View
            </button>
          </Link>

          <Link href="/cardview" onClick={() => handleViewChange("cardview")}>
            <button
              className={`pb-2 text-sm font-medium transition-colors ${
                activeView === "cardview"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Card View
            </button>
          </Link>
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            {/* Search Box */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border rounded-md pl-10 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute left-3 top-2.5 text-gray-400 text-sm">🔍</span>
              <span className="absolute right-3 top-2.5 text-blue-500 text-sm">⚙️</span>
            </div>

            {/* Filter Chips */}
            <div className="flex flex-wrap mt-2 gap-2">
              {filters.map((filter) => (
                <div key={filter} className="flex items-center border rounded px-3 py-1 text-sm bg-gray-50">
                  {filter}
                  <button onClick={() => removeFilter(filter)} className="ml-2 text-gray-500 hover:text-red-500">
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 relative">
            <span className="text-sm text-blue-600 font-medium">Sort by:</span>
            <div className="relative">
              <button
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="px-3 py-1 border rounded text-sm flex items-center gap-1 hover:bg-gray-100 min-w-[80px] justify-between"
              >
                {selectedSort}
                <span className={`transform transition-transform ${showSortDropdown ? "rotate-180" : ""}`}>
                  ⬇️
                </span>
              </button>

              {showSortDropdown && (
                <div className="absolute top-full left-0 mt-1 bg-white border rounded shadow-lg z-10 min-w-[120px]">
                  {sortOptions.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleSortSelect(option)}
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 ${
                        selectedSort === option ? "bg-blue-50 text-blue-600" : "text-gray-700"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Active Filters Count */}
        <div className="flex justify-end text-sm text-blue-500">
          <span className="flex items-center gap-1">⚙️ Active Filters: {filters.length}</span>
        </div>
      </div>
    </div>
  );
}
