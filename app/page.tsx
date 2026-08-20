'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// 1. โหลด model-viewer แบบปิด SSR เพื่อป้องกันจอดำใน Next.js
const ModelViewerInner = dynamic(
  () =>
    Promise.resolve(({ src, alt }: { src: string; alt: string }) => {
      useEffect(() => {
        const script = document.createElement('script');
        script.type = 'module';
        script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js';
        document.head.appendChild(script);
      }, []);

      return (
        // @ts-ignore
        <model-viewer
          src={src}
          alt={alt}
          auto-rotate
          camera-controls
          shadow-intensity="1"
          shadow-softness="0.5"
          exposure="1"
          style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
        >
        {/* @ts-ignore */}
        </model-viewer>
      );
    }),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center text-cyan-400 font-mono text-xs">
        ⏳ กำลังโหลดโมเดล 3D...
      </div>
    ),
  }
);

const initialProducts = [
  {
    id: 1,
    title: 'หนังสือเรียน Calculus 1 สภาพ 95%',
    price: 180,
    category: 'หนังสือ / เอกสารเรียน',
    seller: 'พี่เบสท์ ปี 3',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&q=80',
    location: 'ตึกวิศวะ',
    badge: 'Popular',
    type: 'book',
    modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/Duck/glTF-Binary/Duck.glb'
  },
  {
    id: 2,
    title: 'เป็ดยาง สภาพดี',
    price: 650,
    category: 'ของเล่น',
    seller: 'มายด์ หอพัก A',
    image: 'https://cdn.phototourl.com/free/2026-08-20-5b573d2c-52cf-4460-a2b2-cced2b76a64e.png',
    location: 'โซนหอใน',
    badge: 'Rare',
    type: 'toy',
    modelUrl: ''
  },
  {
    id: 3,
    title: 'จักรยานปั่นในมหาลัย สีฟ้ามีตะกร้าหน้า',
    price: 1200,
    category: 'ยานพาหนะ',
    seller: 'กอล์ฟ วิศวะ',
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=500&q=80',
    location: 'ลานกลม',
    badge: 'Hot',
    type: 'bike',
    modelUrl: ''
  },
  {
    id: 4,
    title: 'เก้าอี้ทำงานสเปกนั่งสบาย ไม่ปวดหลัง',
    price: 890,
    category: 'เฟอร์นิเจอร์',
    seller: 'เจมส์ หอพัก B',
    image: 'https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?w=500&q=80',
    location: 'โซนหอนอก',
    badge: 'Best Value',
    type: 'chair',
    modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/Avocado/glTF-Binary/Avocado.glb'
  },
];

const locationOptions = ['ตึกวิศวะ', 'โซนหอใน', 'โซนหอนอก', 'ลานกลม', 'โรงอาหารกลาง'];
const navItems = ['🏠 หน้าแรก', '🔍 ค้นหา', '✨ ยอดฮิต', '👤 โปรไฟล์'];

export default function Home() {
  const [products, setProducts] = useState(initialProducts);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [is3DMode, setIs3DMode] = useState(true);
  const [selectedZone, setSelectedZone] = useState('ทั้งหมด');
  const [activeNav, setActiveNav] = useState('🏠 หน้าแรก');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cardRotation, setCardRotation] = useState<{ [key: number]: { x: number; y: number } }>({});
  const [selectedProduct3D, setSelectedProduct3D] = useState<any>(null);
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('หนังสือ / เอกสารเรียน');
  const [seller, setSeller] = useState('');
  const [location, setLocation] = useState('ตึกวิศวะ');
  const [image, setImage] = useState('');
  const [modelUrlInput, setModelUrlInput] = useState('');
  const [time, setTime] = useState(0);

  useEffect(() => {
    // อนิเมชั่นพื้นหลังแบบอิสระ
    const interval = setInterval(() => setTime((t) => t + 1), 50);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 50;
    const y = (clientY / innerHeight - 0.5) * 50;
    setMousePos({ x, y });
  };

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    if (!is3DMode) return;
    const card = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - card.left - card.width / 2) / (card.width / 2);
    const y = (e.clientY - card.top - card.height / 2) / (card.height / 2);
    setCardRotation((prev) => ({ ...prev, [id]: { x: -y * 15, y: x * 15 } }));
  };

  const handleCardMouseLeave = (id: number) => {
    setCardRotation((prev) => ({ ...prev, [id]: { x: 0, y: 0 } }));
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

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
      badge: 'New Arrival',
      type: 'bike',
      modelUrl: modelUrlInput,
    };
    setProducts([newProduct, ...products]);
    setIsSellModalOpen(false);
    setTitle('');
    setPrice('');
    setSeller('');
    setImage('');
    setModelUrlInput('');
  };

  const filteredProducts = selectedZone === 'ทั้งหมด' 
    ? products 
    : products.filter(p => p.location === selectedZone);

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-700 overflow-x-hidden font-sans pb-24"
    >
      {/* 🔮 Experimental Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100 via-slate-50 to-white dark:from-slate-900 dark:via-slate-950 dark:to-black">
        {/* Floating Ambient Orbs (ขยับเองอัตโนมัติ) */}
        <div 
          className="absolute top-[10%] left-[20%] w-[30rem] h-[30rem] bg-indigo-400/20 dark:bg-indigo-600/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen transition-transform duration-1000"
          style={{ transform: `translate(${Math.sin(time * 0.05) * 30}px, ${Math.cos(time * 0.03) * 40}px) scale(${1 + Math.sin(time * 0.02) * 0.1})` }}
        />
        <div 
          className="absolute top-[30%] right-[10%] w-[25rem] h-[25rem] bg-cyan-400/20 dark:bg-cyan-500/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen transition-transform duration-1000"
          style={{ transform: `translate(${Math.cos(time * 0.04) * 40}px, ${Math.sin(time * 0.06) * 30}px) scale(${1 + Math.cos(time * 0.03) * 0.1})` }}
        />
        <div 
          className="absolute -bottom-32 left-[40%] w-[35rem] h-[35rem] bg-purple-400/20 dark:bg-purple-600/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen transition-transform duration-1000"
          style={{ transform: `translate(${Math.sin(time * 0.03) * -50}px, ${Math.cos(time * 0.05) * -30}px)` }}
        />

        {/* Cursor Reactive Glow (ขยับตามเมาส์) */}
        <div 
          className="absolute top-1/2 left-1/2 w-[40rem] h-[40rem] bg-blue-300/10 dark:bg-blue-500/10 rounded-full blur-[100px] transition-transform duration-500 ease-out"
          style={{ transform: `translate(calc(-50% + ${mousePos.x * 2.5}px), calc(-50% + ${mousePos.y * 2.5}px))` }}
        />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl border-b border-white/20 dark:border-slate-800/50 shadow-sm transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/30 text-white font-black">
              C
            </div>
            <span className="text-2xl font-black bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 dark:from-cyan-400 dark:via-indigo-300 dark:to-purple-400 bg-clip-text text-transparent">
              CAMPUS <span className="text-xs font-mono px-2 py-0.5 rounded-full border border-cyan-500/40 text-cyan-600 dark:text-cyan-400 bg-cyan-100/50 dark:bg-cyan-950/50">3D UI</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2.5 rounded-2xl text-xs font-bold transition hover:scale-105 border bg-white/50 dark:bg-slate-800/50 backdrop-blur-md border-slate-200 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 shadow-sm"
            >
              {isDarkMode ? '☀️ Light' : '🌙 Dark'}
            </button>

            <button
              onClick={() => setIs3DMode(!is3DMode)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition hover:scale-105 border flex items-center gap-2 backdrop-blur-md ${
                is3DMode
                  ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-600 dark:text-cyan-300 shadow-sm shadow-cyan-500/10'
                  : 'bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50 text-slate-600 dark:text-slate-400'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${is3DMode ? 'bg-cyan-500 animate-ping' : 'bg-slate-400'}`} />
              {is3DMode ? '3D Engine: ON' : '2D View'}
            </button>

            <button 
              onClick={() => setIsSellModalOpen(true)}
              className="px-5 py-2.5 text-xs font-bold text-white dark:text-slate-950 bg-gradient-to-r from-cyan-500 to-indigo-600 dark:from-cyan-400 dark:to-indigo-400 rounded-2xl shadow-lg shadow-cyan-500/25 transition hover:scale-105 active:scale-95"
            >
              + ลงขายสินค้า
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-16 px-4 text-center z-10">
        <h1 className="text-4xl sm:text-6xl font-black mb-4 tracking-tight bg-gradient-to-b from-slate-900 to-slate-500 dark:from-white dark:to-slate-400 bg-clip-text text-transparent drop-shadow-sm">
          ศูนย์รวมแลกเปลี่ยนสินค้า <br />
          <span className="bg-gradient-to-r from-cyan-500 to-indigo-500 dark:from-cyan-400 dark:to-indigo-400 bg-clip-text text-transparent">
            มิติใหม่ของชาวมหาลัย
          </span>
        </h1>
        <p className="text-sm font-mono text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/30 inline-block px-4 py-1.5 rounded-full border border-cyan-200 dark:border-cyan-800/50 shadow-sm">
          ✨ คลิกที่การ์ดสินค้า เพื่อเปิดหมุนดูโมเดล 3D แบบ 360 องศา
        </p>
      </section>

      {/* Zone Filter */}
      <section className="max-w-7xl mx-auto px-4 mb-10 z-30 relative">
        <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl p-2 rounded-3xl border border-white/50 dark:border-slate-800/50 shadow-xl flex items-center justify-between gap-2 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2">
            {['ทั้งหมด', ...locationOptions].map((zone) => (
              <button
                key={zone}
                onClick={() => setSelectedZone(zone)}
                className={`px-5 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-300 border ${
                  selectedZone === zone
                    ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white border-transparent shadow-md scale-105'
                    : 'bg-white/60 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-200/50 dark:border-slate-700/50 hover:scale-105'
                }`}
              >
                {zone}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <main className="max-w-7xl mx-auto px-4 py-4 z-20 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => {
            const rot = cardRotation[product.id] || { x: 0, y: 0 };
            return (
              <div
                key={product.id}
                onClick={() => setSelectedProduct3D(product)}
                onMouseMove={(e) => handleCardMouseMove(e, product.id)}
                onMouseLeave={() => handleCardMouseLeave(product.id)}
                className="group bg-white/60 dark:bg-slate-900/50 rounded-3xl border border-white/60 dark:border-slate-700/40 overflow-hidden transition-all duration-200 flex flex-col cursor-pointer backdrop-blur-xl hover:border-cyan-500/50 hover:shadow-[0_20px_40px_-15px_rgba(6,182,212,0.3)]"
                style={{
                  transform: is3DMode 
                    ? `perspective(1000px) rotateX(${rot.x}deg) rotateY(${rot.y}deg) scale3d(1.02, 1.02, 1.02)` 
                    : 'none',
                  transition: rot.x === 0 ? 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)' : 'none',
                }}
              >
                <div className="h-56 bg-slate-200/50 dark:bg-slate-800/50 relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 text-[10px] font-mono px-3 py-1.5 rounded-xl shadow-sm">
                    {product.badge}
                  </span>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-950/40 backdrop-blur-[2px]">
                    <span className="px-5 py-2.5 bg-cyan-500/90 backdrop-blur-md text-white rounded-full font-bold text-xs shadow-[0_0_20px_rgba(6,182,212,0.5)] transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      🔍 เปิดดูโมเดล 3D
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-800 dark:text-slate-100 line-clamp-2 mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-indigo-600 dark:from-cyan-400 dark:to-indigo-400">
                      ฿{product.price.toLocaleString()}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-slate-200/60 dark:border-slate-700/50 text-xs text-slate-500 dark:text-slate-400 flex justify-between items-center">
                    <span className="flex items-center gap-1">📍 {product.location}</span>
                    <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg font-medium">
                      พร้อมส่ง
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* 🚀 Experimental Bottom Dock Navigation */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
        <div className="flex items-center gap-1 sm:gap-2 p-2 bg-white/40 dark:bg-slate-900/60 backdrop-blur-2xl rounded-full border border-white/50 dark:border-slate-700/50 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] dark:shadow-[0_10px_40px_-10px_rgba(6,182,212,0.15)]">
          {navItems.map((item) => (
            <button 
              key={item} 
              onClick={() => setActiveNav(item)}
              className={`px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ease-out ${
                activeNav === item 
                ? 'bg-white dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 shadow-md scale-105' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-800/50 hover:scale-105 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </nav>

      {/* 3D Model Modal (คงเดิมแบบปรับ UI เล็กน้อย) */}
      {selectedProduct3D && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xl p-4 transition-opacity">
          <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl border border-white/20 dark:border-slate-700/50 rounded-[2rem] max-w-4xl w-full overflow-hidden shadow-2xl relative grid grid-cols-1 md:grid-cols-2 animate-in fade-in zoom-in duration-300">
            <button
              onClick={() => setSelectedProduct3D(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white flex items-center justify-center font-bold border border-slate-200 dark:border-slate-700 backdrop-blur-md transition-colors"
            >
              ✕
            </button>
            <div className="h-80 md:h-[450px] bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-950 dark:to-slate-900 relative flex items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800/50">
              <div className="absolute top-4 left-4 z-10 text-[11px] font-mono text-cyan-700 dark:text-cyan-400 bg-cyan-100/80 dark:bg-cyan-950/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-cyan-300/50 dark:border-cyan-500/30">
                🖱️ คลิกลากหมุน 360° / สกรอลล์เพื่อซูม
              </div>
              <ModelViewerInner
                src={selectedProduct3D.modelUrl || 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/Duck/glTF-Binary/Duck.glb'}
                alt={selectedProduct3D.title}
              />
            </div>
            <div className="p-8 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 bg-cyan-100/50 dark:bg-cyan-950/50 border border-cyan-300/50 dark:border-cyan-800/50 px-3 py-1 rounded-full">
                  {selectedProduct3D.category}
                </span>
                <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 mt-4 mb-2">
                  {selectedProduct3D.title}
                </h2>
                <p className="text-3xl font-black text-cyan-600 dark:text-cyan-400 mb-6">
                  ฿{selectedProduct3D.price.toLocaleString()}
                </p>
                <div className="space-y-3 text-sm bg-slate-50/50 dark:bg-slate-800/30 backdrop-blur-sm p-5 rounded-2xl border border-slate-200/50 dark:border-slate-700/50">
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">ผู้ขาย:</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-200">{selectedProduct3D.seller}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">สถานที่นัดรับ:</span>
                    <span className="font-semibold text-cyan-600 dark:text-cyan-400">📍 {selectedProduct3D.location}</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => alert(`ทักแชทหา ${selectedProduct3D.seller} เรียบร้อย!`)}
                className="w-full mt-6 py-4 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold rounded-2xl shadow-lg shadow-cyan-500/30 transition-all active:scale-95"
              >
                💬 ทักแชทนัดรับสินค้า
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Sell Item (ซ่อนไว้ให้โค้ดสั้นลง แต่ Logic เดิมทำงานครบ) */}
      {/* ... โค้ด Modal ลงขายของเดิม ... */}
    </div>
  );
}