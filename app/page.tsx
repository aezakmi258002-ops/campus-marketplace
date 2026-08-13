'use client';

import React, { useState } from 'react';

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

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
        
        {/* Navbar */}
        <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                Campus Market
              </span>
            </div>

            <div className="flex-1 max-w-md mx-8 hidden sm:block">
              <input
                type="text"
                placeholder="ค้นหาสินค้า, หนังสือ, อุปกรณ์หอพัก..."
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-3">
              {/* Dark / Light Toggle Button */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-lg"
                title={isDarkMode ? 'สลับเป็น Dark Mode' : 'สลับเป็น Light Mode'}
              >
                {isDarkMode ? '☀️' : '🌙'}
              </button>

              <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition">
                เข้าสู่ระบบ
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-full shadow transition">
                + ลงขายสินค้า
              </button>
            </div>
          </div>
        </header>

        {/* Hero Banner Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-900 dark:to-indigo-950 text-white py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-3xl sm:text-5xl font-extrabold mb-4">
              ศูนย์รวมซื้อ-ขายของมือสอง ส่งต่อรุ่นสู่รุ่น
            </h1>
            <p className="text-blue-100 dark:text-blue-200 text-lg max-w-2xl mx-auto mb-6">
              ซื้อง่าย ขายคล่อง ทั้งหนังสือเรียน อุปกรณ์หอพัก เครื่องใช้ไฟฟ้า นัดรับได้ในมหาลัย
            </p>
            <div className="sm:hidden max-w-md mx-auto">
              <input
                type="text"
                placeholder="ค้นหาสินค้า..."
                className="w-full px-4 py-2 border rounded-full text-gray-800 dark:bg-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-600 text-sm focus:outline-none"
              />
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Categories Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">หมวดหมู่ยอดนิยม</h2>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
              {['ทั้งหมด', 'หนังสือ/ชีทเรียน', 'เครื่องใช้ไฟฟ้า', 'เฟอร์นิเจอร์หอพัก', 'เสื้อผ้า/แฟชั่น', 'ยานพาหนะ'].map((category, idx) => (
                <button
                  key={idx}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
                    idx === 0
                      ? 'bg-blue-600 dark:bg-blue-500 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">สินค้าลงขายล่าสุด</h2>
              <a href="#" className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                ดูทั้งหมด →
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {mockProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-md transition group flex flex-col"
                >
                  <div className="h-48 overflow-hidden bg-gray-100 dark:bg-gray-700 relative">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm">
                      {product.category}
                    </span>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-gray-100 line-clamp-2 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {product.title}
                      </h3>
                      <p className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                        ฿{product.price.toLocaleString()}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                      <span>ผู้ขาย: {product.seller}</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-medium">● พร้อมนัดรับ</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}