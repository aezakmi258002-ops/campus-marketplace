"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, PlusCircle, Moon, Sun, MapPin, Tag } from "lucide-react";
import { MOCK_PRODUCTS } from "@/data/mockProducts";

export default function HomePage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ทั้งหมด");

  const categories = ["ทั้งหมด", "หนังสือ/ชีทเรียน", "ไอที/อิเล็กทรอนิกส์", "เครื่องใช้ไฟฟ้า", "เครื่องแต่งกาย"];

  const filteredProducts = MOCK_PRODUCTS.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "ทั้งหมด" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className={`min-h-screen transition-colors duration-200 ${isDarkMode ? "bg-slate-900 text-slate-100" : "bg-slate-50 text-slate-800"}`}>
      <div className="max-w-md mx-auto pb-24 border-x border-slate-200 dark:border-slate-800 min-h-screen">
        
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Campus Market
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">วิทยาลัยเทคโนโลยีแห่งเรียนรู้</p>
          </div>
          
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:opacity-80 transition"
            aria-label="Toggle Theme"
          >
            {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
          </button>
        </header>

        {/* Search & Filters */}
        <section className="p-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="ค้นหาสินค้า, ชีทเรียน, อุปกรณ์..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-sm border-none focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Categories Horizontal Scroll */}
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl whitespace-nowrap font-medium transition ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white"
                    : "bg-slate-200/60 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Product Feed Grid */}
        <section className="p-4 grid grid-cols-2 gap-3">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-700/60 shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div className="relative aspect-square bg-slate-100 dark:bg-slate-700">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-white text-[10px] px-2 py-0.5 rounded-full">
                  {product.condition}
                </span>
              </div>

              <div className="p-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-medium text-xs line-clamp-2 leading-snug mb-1">
                    {product.title}
                  </h3>
                  <div className="text-blue-600 dark:text-blue-400 font-bold text-sm">
                    ฿{product.price.toLocaleString()}
                  </div>
                </div>

                <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-700/50 space-y-1 text-[10px] text-slate-500 dark:text-slate-400">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3 text-red-400 shrink-0" />
                    <span className="truncate">{product.location}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>{product.seller}</span>
                    <span>{product.timeAgo}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Bottom Floating Post Button */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-md px-4 flex justify-center z-20">
          <Link
            href="/add-product"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full shadow-xl flex items-center space-x-2 transition active:scale-95 border border-blue-400/30"
          >
            <PlusCircle className="w-5 h-5" />
            <span className="text-sm">ลงประกาศขาย</span>
          </Link>
        </div>

      </div>
    </div>
  );
}