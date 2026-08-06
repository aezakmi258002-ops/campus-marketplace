"use client";

import Link from "next/link";
import { Store, ShoppingBag, ArrowRight } from "lucide-react";

export default function SplashScreen() {
  return (
    <main className="min-h-screen flex flex-col justify-between items-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 dark:from-slate-900 dark:via-purple-950 dark:to-slate-900 text-white p-6 select-none">
      <div className="w-full flex justify-end">
        <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold tracking-wide">
          v1.0 Campus Only
        </span>
      </div>

      <div className="flex flex-col items-center text-center my-auto space-y-6">
        <div className="relative">
          <div className="w-24 h-24 bg-white/20 dark:bg-white/10 backdrop-blur-xl rounded-3xl flex items-center justify-center shadow-2xl border border-white/30 animate-pulse">
            <Store className="w-12 h-12 text-white" />
          </div>
          <div className="absolute -top-1 -right-1 bg-amber-400 p-2 rounded-full shadow-lg">
            <ShoppingBag className="w-4 h-4 text-slate-900" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Campus Market
          </h1>
          <p className="text-sm sm:text-base text-white/80 max-w-xs mx-auto">
            แหล่งซื้อ-ขาย เปลี่ยนมือสินค้าของนักศึกษาในวิทยาลัย ง่าย ปลอดภัย รับของในมอ
          </p>
        </div>
      </div>

      <div className="w-full max-w-sm space-y-4">
        <Link
          href="/home"
          className="w-full bg-white text-slate-900 hover:bg-slate-100 dark:bg-emerald-500 dark:text-white dark:hover:bg-emerald-600 font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-xl transition-all active:scale-95"
        >
          <span>เข้าสู่ตลาดนักศึกษา</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
        <p className="text-center text-xs text-white/60">
          เฉพาะนักศึกษาและบุคลากรในสถาบันเท่านั้น
        </p>
      </div>
    </main>
  );
}