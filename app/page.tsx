'use client';

import React, { useState, useEffect } from 'react';

// ข้อมูลสินค้าจำลองเริ่มต้น
const initialProducts = [
  {
    id: 1,
    title: 'หนังสือเรียน Calculus 1 สภาพ 95%',
    price: 180,
    category: 'หนังสือ / เอกสารเรียน',
    seller: 'พี่เบสท์ ปี 3',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&q=80',
    location: 'ตึกวิศวะ',
    badge: 'HOT',
  },
  {
    id: 2,
    title: 'พัดลมไอเย็น Midea สภาพดี พร้อมรีโมท',
    price: 650,
    category: 'เครื่องใช้ไฟฟ้า',
    seller: 'มายด์ หอพัก A',
    image: 'https://images.unsplash.com/photo-1618961734760-466979ce35b0?w=500&q=80',
    location: 'โซนหอใน',
    badge: 'POPULAR',
  },
  {
    id: 3,
    title: 'จักรยานปั่นในมหาลัย สีฟ้ามีตะกร้าหน้า',
    price: 1200,
    category: 'ยานพาหนะ',
    seller: 'กอล์ฟ วิศวะ',
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=500&q=80',
    location: 'ลานกลม',
    badge: 'RECOMMEND',
  },
  {
    id: 4,
    title: 'เก้าอี้ทำงานสเปกนั่งสบาย ไม่ปวดหลัง',
    price: 890,
    category: 'เฟอร์นิเจอร์',
    seller: 'เจมส์ หอพัก B',
    image: 'https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?w=500&q=80',
    location: 'โซนหอนอก',
    badge: 'NEW',
  },
];

const locationOptions = ['ตึกวิศวะ', 'โซนหอใน', 'โซนหอนอก', 'ลานกลม', 'โรงอาหารกลาง'];

export default function Home() {
  const [products, setProducts] = useState(initialProducts);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);

  // Form State
  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newCategory, setNewCategory] = useState('อุปกรณ์เรียน');
  const [newSeller, setNewSeller] = useState('');
  const [newLocation, setNewLocation] = useState('ตึกวิศวะ');
  const [newImage, setNewImage] = useState('');

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // ฟังก์ชันเพิ่มสินค้า
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newPrice) return;

    const newProduct = {
      id: Date.now(),
      title: newTitle,
      price: Number(newPrice),
      category: newCategory,
      seller: newSeller || 'นักศึกษา',
      image: newImage || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&q=80',
      location: newLocation,
      badge: 'JUST NOW',
    };

    setProducts([newProduct, ...products]);
    setIsSellModalOpen(false);

    // Reset Form
    setNewTitle('');
    setNewPrice('');
    setNewSeller('');
    setNewImage('');
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="relative min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-indigo-950 to-black text-gray-100 transition-colors duration-500 overflow-x-hidden selection:bg-cyan-500 selection:text-black"
    >
      {/* Light Track Follow Mouse */}
      <div
        className="pointer-events-none fixed -inset-px z-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(56, 189, 248, 0.12), transparent 80%)`,
        }}
      />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293712_1px,transparent_1px),linear-gradient(to_bottom,#1f293712_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-950/70 backdrop-blur-2xl border-b border-cyan-500/20 shadow-[0_4px_30px_rgba(0,191,255,0.1)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-fuchsia-500 p-[2px] shadow-[0_0_20px_rgba(6,182,212,0.5)] group-hover:rotate-12 transition-transform duration-300">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <span className="text-xl">🚀</span>
              </div>
            </div>
            <span className="text-2xl font-black tracking-wider bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-indigo-300 bg-clip-text text-transparent">
              CAMPUS<span className="font-thin text-cyan-400">.3D</span>
            </span>
          </div>

          <div className="flex-1 max-w-lg mx-8 hidden sm:block relative">
            <input
              type="text"
              placeholder="🔍 ค้นหาสินค้ามือสองในมิติล้ำสมัย..."
              className="w-full px-6 py-2.5 border border-cyan-500/30 rounded-full text-sm bg-slate-900/90 text-cyan-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 backdrop-blur-xl shadow-2xl transition-all"
            />
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              type="button"
              className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-700/60 hover:border-cyan-400/50 text-cyan-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all duration-300 text-xs font-mono"
            >
              {isDarkMode ? '☀️ LIGHT' : '🌙 DARK'}
            </button>

            {/* ปุ่มเปิด Modal เพิ่มสินค้า */}
            <button
              onClick={() => setIsSellModalOpen(true)}
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-semibold rounded-full group bg-gradient-to-br from-cyan-500 to-fuchsia-500 text-white shadow-[0_0_20px_rgba(217,70,239,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.8)] transition-all duration-300 active:scale-95"
            >
              <span className="relative px-5 py-2 transition-all ease-in duration-75 bg-slate-950 rounded-full group-hover:bg-opacity-0">
                + ลงขายสินค้า
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="relative py-16 px-4 text-center overflow-hidden">
        <div className="max-w-5xl mx-auto relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs font-mono uppercase tracking-widest backdrop-blur-xl shadow-[0_0_20px_rgba(6,182,212,0.2)]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            Next-Gen Student Marketplace
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
            ศูนย์รวมซื้อ-ขายของมือสอง <br />
            <span className="bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-indigo-400 bg-clip-text text-transparent">
              ส่งต่อรุ่นสู่รุ่น
            </span>
          </h1>
        </div>
      </section>

      {/* Spatial Zone Filter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-20">
        <div className="bg-slate-900/60 backdrop-blur-2xl p-4 rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-between gap-4 overflow-x-auto">
          <span className="text-xs font-mono text-cyan-400 tracking-wider px-2 whitespace-nowrap flex items-center gap-2">
            📍 SPATIAL ZONE:
          </span>
          <div className="flex gap-3">
            {['ทั้งหมด', ...locationOptions].map((zone, idx) => (
              <button
                key={idx}
                className={`px-5 py-2 rounded-2xl text-xs font-medium whitespace-nowrap transition-all duration-300 ${
                  idx === 0
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.6)] scale-105'
                    : 'bg-slate-800/50 text-slate-300 border border-slate-700/50 hover:border-cyan-400/50 hover:bg-slate-800'
                }`}
              >
                {zone}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <h2 className="text-2xl font-bold tracking-wide text-white flex items-center gap-3 mb-8">
          <span>สินค้าลงขายล่าสุด</span>
          <span className="text-xs font-mono px-3 py-1 bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30 rounded-md">
            LIVE FEED ({products.length})
          </span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative bg-slate-900/80 rounded-3xl p-3 border border-slate-800 hover:border-cyan-400/60 transition-all duration-500 ease-out hover:shadow-[0_20px_50px_rgba(6,182,212,0.3)] hover:-translate-y-3 cursor-pointer flex flex-col justify-between overflow-hidden"
            >
              <div className="h-52 bg-slate-950 rounded-2xl relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-translate-y-2"
                />
                <span className="absolute top-3 right-3 bg-black/70 border border-white/10 text-cyan-300 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full backdrop-blur-md shadow-lg z-10">
                  {product.badge}
                </span>
                <span className="absolute bottom-3 left-3 bg-slate-950/80 border border-cyan-500/30 text-cyan-300 text-[10px] font-mono px-3 py-1 rounded-full backdrop-blur-md z-10">
                  📍 {product.location}
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-semibold text-slate-100 line-clamp-2 mb-2 group-hover:text-cyan-300 transition-colors duration-300 text-base">
                    {product.title}
                  </h3>
                  <p className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-indigo-300 bg-clip-text text-transparent">
                    ฿{product.price.toLocaleString()}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 text-xs text-slate-400 flex justify-between items-center font-mono">
                  <span>ผู้ขาย: {product.seller}</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    พร้อมนัดรับ
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* 🛠️ MODAL หน้าลงขายสินค้าล้ำสมัย */}
      {isSellModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative w-full max-w-lg bg-slate-900 border border-cyan-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(6,182,212,0.3)] space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent flex items-center gap-2">
                <span>✨ ลงขายสินค้าใหม่ (3D Item)</span>
              </h3>
              <button
                onClick={() => setIsSellModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleAddProduct} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">ชื่อสินค้า / รายละเอียด</label>
                <input
                  type="text"
                  required
                  placeholder="เช่น หนังสือ Physics 1, พัดลมติดหน้าต่าง"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">ราคา (บาท)</label>
                  <input
                    type="number"
                    required
                    placeholder="250"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">หมวดหมู่</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-cyan-400"
                  >
                    <option value="หนังสือ / เอกสารเรียน">หนังสือเรียน</option>
                    <option value="เครื่องใช้ไฟฟ้า">เครื่องใช้ไฟฟ้า</option>
                    <option value="ยานพาหนะ">ยานพาหนะ</option>
                    <option value="เฟอร์นิเจอร์">เฟอร์นิเจอร์</option>
                  </select>
                </div>
              </div>

              {/* 📍 เลือกจุดนัดรับ (Highlight: ตึกวิศวะ / โซนหอใน) */}
              <div>
                <label className="block text-xs font-mono text-cyan-400 mb-2">📍 เลือกระบุจุดนัดรับในมหาลัย</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {['ตึกวิศวะ', 'โซนหอใน', 'โซนหอนอก', 'ลานกลม'].map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => setNewLocation(loc)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                        newLocation === loc
                          ? 'bg-cyan-500 text-black font-bold shadow-[0_0_15px_rgba(6,182,212,0.6)]'
                          : 'bg-slate-800 text-slate-300 border border-slate-700 hover:border-cyan-500/50'
                      }`}
                    >
                      {loc === 'ตึกวิศวะ' || loc === 'โซนหอใน' ? `★ ${loc}` : loc}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">ชื่อผู้ขาย / หอพัก</label>
                  <input
                    type="text"
                    placeholder="เช่น นัท ปี 2"
                    value={newSeller}
                    onChange={(e) => setNewSeller(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">ลิงก์รูปภาพ (Optional)</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={newImage}
                    onChange={(e) => setNewImage(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsSellModalOpen(false)}
                  className="flex-1 py-3 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 font-semibold"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-bold shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:shadow-[0_0_30px_rgba(6,182,212,0.8)] transition-all"
                >
                  ยืนยันลงขาย
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}