"use client";

import Link from "next/link";
import { ArrowLeft, Upload } from "lucide-react";

export default function AddProductPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 max-w-md mx-auto">
      <div className="flex items-center gap-3 py-2 border-b border-slate-200 dark:border-slate-800 mb-6">
        <Link href="/home" className="p-2 rounded-xl bg-slate-200 dark:bg-slate-800">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="font-bold text-lg">ลงประกาศขายสินค้า</h1>
      </div>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-6 text-center flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-900 transition-all">
          <Upload className="w-8 h-8 text-indigo-500" />
          <span className="text-xs font-medium text-slate-500">อัปโหลดรูปภาพสินค้า</span>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-500">ชื่อสินค้า / หัวข้อ</label>
          <input
            type="text"
            placeholder="เช่น หนังสือเรียน Chem 1 สภาพใหม่"
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500">ราคา (บาท)</label>
            <input
              type="number"
              placeholder="0"
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500">หมวดหมู่</label>
            <select className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>หนังสือ</option>
              <option>เครื่องใช้ไฟฟ้า</option>
              <option>เสื้อผ้า</option>
              <option>อุปกรณ์ไอที</option>
              <option>ยานพาหนะ</option>
            </select>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-500">สถานที่นัดรับ (ภายในมอ)</label>
          <input
            type="text"
            placeholder="เช่น ใต้ตึกคณะวิทยาศาสตร์"
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-lg mt-6 active:scale-95 transition-all"
        >
          ลงประกาศขายเลย
        </button>
      </form>
    </div>
  );
}