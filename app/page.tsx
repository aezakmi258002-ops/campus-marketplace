'use client';

import React, { useState, useEffect } from 'react';
import Spline from '@splinetool/react-spline';

// ตัวอย่างข้อมูลสินค้าจำลอง
const mockProducts = [
  {
    id: 1,
    title: 'หนังสือเรียน Calculus 1 สภาพ 95%',
    price: 180,
    category: 'หนังสือ / เอกสารเรียน',
    seller: 'พี่เบสท์ ปี 3',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&q=80',
  },
  {
    id: 2,
    title: 'พัดลมไอเย็น Midea สภาพดี พร้อมรีโมท',
    price: 650,
    category: 'เครื่องใช้ไฟฟ้า',
    seller: 'มายด์ หอพัก A',
    image: 'https://images.unsplash.com/photo-1618961734760-466979ce35b0?w=500&q=80',
  },
  {
    id: 3,
    title: 'จักรยานปั่นในมหาลัย สีฟ้ามีตะกร้าหน้า',
    price: 1200,
    category: 'ยานพาหนะ',
    seller: 'กอล์ฟ วิศวะ',
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=500&q=80',
  },
  {
    id: 4,
    title: 'เก้าอี้ทำงานสเปกนั่งสบาย ไม่ปวดหลัง',
    price: 890,
    category: 'เฟอร์นิเจอร์',
    seller: 'เจมส์ หอพัก B',
    image: 'https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?w=500&q=80',
  },
];

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              Campus Market 3D
            </span>
          </div>

          <div className="flex-1 max-w-md mx-8 hidden sm:block">
            <input
              type="text"
              placeholder="ค้นหาสินค้า, หนังสือ, อุปกรณ์หอพัก..."
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              type="button"
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-xl border border-gray-300 dark:border-gray-600"
              title={isDarkMode ? 'สลับเป็น Light Mode' : 'สลับเป็น Dark Mode'}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>

            <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition">
              เข้าสู่ระบบ
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 rounded-full shadow transition">
              + ลงขายสินค้า
            </button>
          </div>
        </div>
      </header>

      {/* 🔮 3D Immersive Hero Banner Section */}
      <section className="relative w-full h-[480px] bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white overflow-hidden flex items-center">
        {/* ข้อความฝั่งซ้าย */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4 text-left">
            <span className="px-3 py-1 bg-blue-500/20 text-blue-300 border border-blue-400/30 rounded-full text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
              ✨ 3D Interactive Experience
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight">
              ตลาดนัดเด็กหอ <br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                ในมิติใหม่ 3D
              </span>
            </h1>
            <p className="text-gray-300 text-lg max-w-lg">
              ลองใช้เมาส์หมุนและปฏิสัมพันธ์กับโมเดล 3D ฝั่งขวาดูสิ! ซื้อง่าย ขายคล่อง ส่งต่ออุปกรณ์เรียนให้น้องๆ
            </p>
            <div className="flex gap-4 pt-2">
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-full shadow-lg hover:shadow-blue-500/50 transition">
                สำรวจสินค้า
              </button>
            </div>
          </div>

          {/* 🧊 โมเดล 3D จาก Spline (หมุนและคลิกขยับตามเมาส์ได้จริง) */}
          <div className="h-[400px] w-full relative rounded-2xl overflow-hidden">
            <Spline scene="https://prod.spline.design/6Wq1Q7YGyM-mab6X/scene.splinecode" />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            สินค้าลงขายล่าสุด
          </h2>
        </div>

        {/* Product Cards พร้อม 3D Lift/Hover Effect */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mockProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transform hover:-translate-y-2 hover:rotate-1 hover:shadow-2xl transition-all duration-300 flex flex-col cursor-pointer"
            >
              <div className="h-48 bg-gray-100 dark:bg-gray-700 relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <span className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2.5 py-1 rounded-full backdrop-blur-md">
                  {product.category}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-100 line-clamp-2 mb-2 group-hover:text-blue-500 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-2xl font-black text-blue-600 dark:text-blue-400">
                    ฿{product.price.toLocaleString()}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400 flex justify-between items-center">
                  <span>ผู้ขาย: {product.seller}</span>
                  <span className="text-emerald-500 font-semibold">● พร้อมนัดรับ</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}