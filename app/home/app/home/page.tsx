"use client";

import { useState } from "react";
import Link from "next/link";
import { MOCK_PRODUCTS } from "@/data/products";
import { Search, PlusCircle, MapPin, Moon, Sun, Tag } from "lucide-react";

export default function HomePage() {
  const [darkMode, setDarkMode] = useState(false);
  const [search, setSearch] = useState("");

  const filteredProducts = MOCK_PRODUCTS.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 pb-20">
        
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex items-center justify-between">
          <span className="font-bold text-lg text-indigo-600 dark:text-indigo-400">⚡ CampusMarket</span>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </header>

        {/* Search */}
        <div className="p-4 max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="ค้นหาสินค้า, หนังสือ, พัดลม..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
            />
          </div>
        </div>

        {/* Feed */}
        <main className="p-4 max-w-md mx-auto space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-base">รายการสินค้ามาใหม่</h2>
            <span className="text-xs text-slate-500">{filteredProducts.length} รายการ</span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm flex flex-row h-32 hover:border-indigo-500 transition-all"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-32 h-full object-cover"
                />
                <div className="p-3 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-medium text-sm line-clamp-2 leading-snug">
                      {product.title}
                    </h3>
                    <span className="inline-flex items-center gap-1 text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-full mt-1">
                      <Tag className="w-3 h-3" /> {product.category}
                    </span>
                  </div>

                  <div className="flex items-end justify-between mt-2">
                    <div>
                      <p className="text-xs text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {product.location}
                      </p>
                      <p className="font-bold text-indigo-600 dark:text-indigo-400 text-base">
                        ฿{product.price.toLocaleString()}
                      </p>
                    </div>
                    <span className="text-[10px] text-slate-400">{product.timeAgo}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* FAB ปุ่มลงขาย */}
        <Link
          href="/add-product"
          className="fixed bottom-6 right-6 bg-indigo-600 text-white dark:bg-indigo-500 p-4 rounded-full shadow-2xl flex items-center gap-2 hover:scale-105 transition-all"
        >
          <PlusCircle className="w-6 h-6" />
          <span className="font-bold text-sm pr-1">ลงขาย</span>
        </Link>
      </div>
    </div>
  );
}