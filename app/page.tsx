'use client';

import React, { useState, useEffect } from 'react';

// ตัวอย่างข้อมูลสินค้าจำลองเริ่มต้น
const initialProducts = [
  {
    id: 1,
    title: 'หนังสือเรียน Calculus 1 สภาพ 95%',
    price: 180,
    category: 'หนังสือ / เอกสารเรียน',
    seller: 'พี่เบสท์ ปี 3',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&q=80',
    location: 'ตึกวิศวะ',
  },
  {
    id: 2,
    title: 'พัดลมไอเย็น Midea สภาพดี พร้อมรีโมท',
    price: 650,
    category: 'เครื่องใช้ไฟฟ้า',
    seller: 'มายด์ หอพัก A',
    image: 'https://images.unsplash.com/photo-1618961734760-466979ce35b0?w=500&q=80',
    location: 'โซนหอใน',
  },
  {
    id: 3,
    title: 'จักรยานปั่นในมหาลัย สีฟ้ามีตะกร้าหน้า',
    price: 1200,
    category: 'ยานพาหนะ',
    seller: 'กอล์ฟ วิศวะ',
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=500&q=80',
    location: 'ลานกลม',
  },
  {
    id: 4,
    title: 'เก้าอี้ทำงานสเปกนั่งสบาย ไม่ปวดหลัง',
    price: 890,
    category: 'เฟอร์นิเจอร์',
    seller: 'เจมส์ หอพัก B',
    image: 'https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?w=500&q=80',
    location: 'โซนหอนอก',
  },
];

const locationOptions = ['ตึกวิศวะ', 'โซนหอใน', 'โซนหอนอก', 'ลานกลม', 'โรงอาหารกลาง'];

export default function Home() {
  const [products, setProducts] = useState(initialProducts);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [is3DMode, setIs3DMode] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // State สำหรับควบคุม Modal ลงขายสินค้า
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);

  // State สำหรับ Form ลงขาย
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('หนังสือ / เอกสารเรียน');
  const [seller, setSeller] = useState('');
  const [location, setLocation] = useState('ตึกวิศวะ');
  const [image, setImage] = useState('');

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 20;
    const y = (clientY / innerHeight - 0.5) * 20;
    setMousePos({ x, y });
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // ฟังก์ชันจัดการเมื่อกดลงขายสินค้า
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price) return;

    const newProduct = {
      id: Date.now(),
      title,
      price: Number(price),
      category,
      seller: seller || 'นักศึกษา',
      image: image || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&q=80',
      location,
    };

    setProducts([newProduct, ...products]);
    setIsSellModalOpen(false);

    // ล้างค่าข้อมูล Form
    setTitle('');
    setPrice('');
    setSeller('');
    setImage('');
    setLocation('ตึกวิศวะ');
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300 overflow-x-hidden"
    >
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 dark:from-blue-400 dark:to-indigo-300 bg-clip-text text-transparent">
              Campus Market {is3DMode && <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full font-normal">3D View</span>}
            </span>
          </div>

          <div className="flex-1 max-w-md mx-8 hidden sm:block">
            <input
              type="text"
              placeholder="ค้นหาสินค้า, หนังสือ, อุปกรณ์หอพัก..."
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full text-sm bg-white/90 dark:bg-gray-700/90 text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIs3DMode(!is3DMode)}
              type="button"
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-300 ${
                is3DMode
                  ? 'bg-indigo-600 text-white border-indigo-400 shadow-[0_0_15px_rgba(79,70,229,0.5)]'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600'
              }`}
            >
              {is3DMode ? '🎲 3D Mode: ON' : '🧊 3D Mode: OFF'}
            </button>

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

            {/* ปุ่มเปิด Modal ลงขายสินค้า */}
            <button 
              onClick={() => setIsSellModalOpen(true)}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 rounded-full shadow-lg hover:shadow-blue-500/30 transition active:scale-95"
            >
              + ลงขายสินค้า
            </button>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-blue-700 via-indigo-800 to-purple-900 dark:from-gray-900 dark:via-indigo-950 dark:to-slate-900 text-white py-16 px-4 text-center overflow-hidden perspective-1000">
        <div 
          className="absolute inset-0 pointer-events-none flex justify-between items-center px-12 opacity-40 transition-transform duration-200 ease-out"
          style={{
            transform: is3DMode 
              ? `rotateX(${-mousePos.y * 0.8}deg) rotateY(${mousePos.x * 0.8}deg)` 
              : 'none'
          }}
        >
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-cyan-400 to-blue-500 blur-sm shadow-2xl transform -rotate-12 translate-y-[-20px]" />
          <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 blur-sm shadow-2xl transform rotate-45 translate-y-[40px]" />
        </div>

        <div 
          className="max-w-7xl mx-auto relative z-10 transition-transform duration-200 ease-out"
          style={{
            transform: is3DMode 
              ? `rotateX(${-mousePos.y * 0.4}deg) rotateY(${mousePos.x * 0.4}deg)` 
              : 'none'
          }}
        >
          <span className="inline-block px-4 py-1 mb-4 text-xs font-semibold uppercase tracking-widest bg-white/10 dark:bg-white/5 border border-white/20 rounded-full backdrop-blur-md">
            🎓 Campus Interactive Marketplace
          </span>
          <h1 className="text-3xl sm:text-6xl font-black mb-4 drop-shadow-md">
            ศูนย์รวมซื้อ-ขายของมือสอง ส่งต่อรุ่นสู่รุ่น
          </h1>
          <p className="text-blue-100 dark:text-blue-200 text-lg max-w-2xl mx-auto">
            ซื้อง่าย ขายคล่อง ทั้งหนังสือเรียน อุปกรณ์หอพัก นัดรับได้ในมหาลัย
          </p>
        </div>
      </section>

      {/* Filter Zone */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md p-3 rounded-2xl border border-gray-200/80 dark:border-gray-700/80 shadow-xl flex items-center justify-between gap-2 overflow-x-auto">
          <span className="text-xs font-bold uppercase text-gray-400 dark:text-gray-500 px-3 whitespace-nowrap">
            📍 โซนนัดรับ:
          </span>
          <div className="flex gap-2">
            {['ทั้งหมด', ...locationOptions].map((zone, idx) => (
              <button
                key={idx}
                className={`px-4 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                  idx === 0
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30 scale-105'
                    : 'bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700'
                }`}
              >
                {zone}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Product List */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <span>สินค้าลงขายล่าสุด ({products.length})</span>
          {is3DMode && <span className="text-xs font-normal text-indigo-500 dark:text-indigo-400">(ลองเอาเมาส์ชี้ดูการ์ด 3D)</span>}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className={`group bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700/80 overflow-hidden transition-all duration-300 flex flex-col cursor-pointer ${
                is3DMode
                  ? 'hover:shadow-2xl hover:-translate-y-2 hover:rotate-1 hover:border-blue-400/50'
                  : 'hover:shadow-md'
              }`}
              style={{
                transformStyle: is3DMode ? 'preserve-3d' : 'flat',
              }}
            >
              <div className="h-48 bg-gray-100 dark:bg-gray-700 relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2 right-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded-md backdrop-blur-sm">
                  {product.category}
                </span>
                <span className="absolute bottom-2 left-2 bg-blue-600/90 text-white text-[10px] px-2 py-0.5 rounded-full backdrop-blur-sm font-medium">
                  📍 {product.location}
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-100 line-clamp-2 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                    ฿{product.price.toLocaleString()}
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-gray-100 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400 flex justify-between items-center">
                  <span>ผู้ขาย: {product.seller}</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">● พร้อมนัดรับ</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* 📦 Modal เพิ่มสินค้าใหม่ */}
      {isSellModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-200 dark:border-gray-700 relative">
            
            <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-700 mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                ➕ ลงขายสินค้าใหม่
              </h3>
              <button
                onClick={() => setIsSellModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xl font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  ชื่อสินค้า
                </label>
                <input
                  type="text"
                  required
                  placeholder="เช่น หนังสือ Physics 1, พัดลมมือถือ"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    ราคา (บาท)
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="200"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    หมวดหมู่
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="หนังสือ / เอกสารเรียน">หนังสือ / เอกสารเรียน</option>
                    <option value="เครื่องใช้ไฟฟ้า">เครื่องใช้ไฟฟ้า</option>
                    <option value="ยานพาหนะ">ยานพาหนะ</option>
                    <option value="เฟอร์นิเจอร์">เฟอร์นิเจอร์</option>
                  </select>
                </div>
              </div>

              {/* 📍 ปุ่มเลือกจุดนัดรับ (ตึกวิศวะ / โซนหอใน) */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  📍 เลือกจุดนัดรับ
                </label>
                <div className="flex flex-wrap gap-2">
                  {['ตึกวิศวะ', 'โซนหอใน', 'โซนหอนอก', 'ลานกลม'].map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => setLocation(loc)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                        location === loc
                          ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/30'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
                      }`}
                    >
                      {loc === 'ตึกวิศวะ' || loc === 'โซนหอใน' ? `★ ${loc}` : loc}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    ชื่อผู้ขาย
                  </label>
                  <input
                    type="text"
                    placeholder="เช่น พี่เบสท์ ปี 3"
                    value={seller}
                    onChange={(e) => setSeller(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    URL รูปภาพ (ถ้ามี)
                  </label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={() => setIsSellModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-lg shadow-blue-500/30"
                >
                  บันทึกและลงขาย
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}