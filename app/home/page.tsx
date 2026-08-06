"use client";

import Link from "next/link";
import { ShoppingBag, ArrowRight, ShieldCheck, Zap } from "lucide-react";

export default function SplashScreen() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-600 to-indigo-900 text-white flex flex-col justify-between p-6 max-w-md mx-auto relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute -top-20 -left-20 w-60 h-60 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-indigo-400/20 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Section */}
      <div className="flex-1 flex flex-col justify-center items-center text-center mt-12">
        <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center mb-6 shadow-2xl border border-white/20 animate-bounce">
          <ShoppingBag className="w-12 h-12 text-blue-200" />
        </div>
        
        <span className="text-xs uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full font-semibold mb-3">
          Campus Marketplace
        </span>
        
        <h1 className="text-3xl font-extrabold tracking-tight mb-2">
          ตลาดนัดเด็ก ม.
        </h1>
        <p className="text-blue-100 text-sm max-w-xs leading-relaxed">
          แหล่ง ซื้อ-ขาย-ส่งต่อ ของใช้ หนังสือ เครื่องใช้ไฟฟ้า ภายในวิทยาลัย ปลอดภัย นัดรับง่าย
        </p>
      </div>

      {/* Feature Highlights */}
      <div className="grid grid-cols-2 gap-3 my-8">
        <div className="bg-white/10 backdrop-blur-sm p-3 rounded-2xl border border-white/10 flex items-center space-x-2">
          <Zap className="w-5 h-5 text-yellow-300 shrink-0" />
          <span className="text-xs font-medium">ลงขายฟรีใน 1 นาที</span>
        </div>
        <div className="bg-white/10 backdrop-blur-sm p-3 rounded-2xl border border-white/10 flex items-center space-x-2">
          <ShieldCheck className="w-5 h-5 text-emerald-300 shrink-0" />
          <span className="text-xs font-medium">นัดรับใน ม. ปลอดภัย</span>
        </div>
      </div>

      {/* Call to Action */}
      <div className="space-y-3 mb-6">
        <Link
          href="/home"
          className="w-full bg-white text-blue-900 hover:bg-blue-50 font-bold py-4 px-6 rounded-2xl flex items-center justify-center space-x-2 transition-all shadow-lg active:scale-95"
        >
          <span>เข้าสู่ตลาดนัด</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
        <p className="text-center text-xs text-blue-200">
          สำหรับนักเรียนและบุคลากรในวิทยาลัยเท่านั้น
        </p>
      </div>
    </main>
  );
}