'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

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
  
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);

  const [cardRotation, setCardRotation] = useState<{ [key: number]: { x: number; y: number } }>({});
  const [heroRotation, setHeroRotation] = useState({ x: 0, y: 0 });
  const [headerRotation, setHeaderRotation] = useState({ x: 0, y: 0 });

  const [clickedCardId, setClickedCardId] = useState<number | null>(null);
  const [selectedProduct3D, setSelectedProduct3D] = useState<any>(null);
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [moneyRain, setMoneyRain] = useState<Array<{ id: number; left: number; duration: number; size: number; text: string }>>([]);

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('หนังสือ / เอกสารเรียน');
  const [seller, setSeller] = useState('');
  const [location, setLocation] = useState('ตึกวิศวะ');
  const [image, setImage] = useState('');
  const [modelUrlInput, setModelUrlInput] = useState('');

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
    if (!isHovered) setIsHovered(true);
  };

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!is3DMode) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setHeroRotation({ x: -y * 12, y: x * 12 });
  };

  const handleHeroMouseLeave = () => {
    setHeroRotation({ x: 0, y: 0 });
  };

  const handleHeaderMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!is3DMode) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setHeaderRotation({ x: -y * 20, y: x * 20 });
  };

  const handleHeaderMouseLeave = () => {
    setHeaderRotation({ x: 0, y: 0 });
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

  const handleCardClick = (product: any) => {
    setClickedCardId(product.id);
    setTimeout(() => {
      setSelectedProduct3D(product);
      setClickedCardId(null);
    }, 350);
  };

  const triggerMoneyRain = () => {
    const symbols = ['💸', '💵', '💶', '💷', '🪙', '✨'];
    const newItems = Array.from({ length: 25 }).map((_, index) => ({
      id: Date.now() + index,
      left: Math.random() * 100,
      duration: 1.5 + Math.random() * 2,
      size: 20 + Math.random() * 24,
      text: symbols[Math.floor(Math.random() * symbols.length)],
    }));
    setMoneyRain((prev) => [...prev, ...newItems]);
    setTimeout(() => {
      setMoneyRain((prev) => prev.filter((item) => !newItems.includes(item)));
    }, 3500);
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
      onMouseLeave={() => setIsHovered(false)}
      className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-700 overflow-x-hidden font-sans pb-28 relative"
    >
      {/* Interactive Spotlight */}
      <div 
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(6, 182, 212, 0.12), rgba(99, 102, 241, 0.06) 40%, transparent 80%)`
        }}
      />

      {/* Money Rain Container */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {moneyRain.map((item) => (
          <div
            key={item.id}
            className="absolute animate-fall select-none"
            style={{
              left: `${item.left}%`,
              top: '-50px',
              fontSize: `${item.size}px`,
              animationDuration: `${item.duration}s`,
              animationTimingFunction: 'ease-in-out',
            }}
          >
            {item.text}
          </div>
        ))}
      </div>

      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-[30rem] h-[30rem] bg-indigo-400/15 dark:bg-indigo-600/20 rounded-full blur-[130px]" />
        <div className="absolute top-1/3 -right-40 w-[30rem] h-[30rem] bg-cyan-400/15 dark:bg-cyan-500/15 rounded-full blur-[140px]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/60 dark:bg-slate-900/65 backdrop-blur-xl border-b border-cyan-500/20 shadow-lg shadow-cyan-500/5 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div 
            className="flex items-center gap-4 cursor-pointer select-none py-2 animate-float"
            onMouseMove={handleHeaderMouseMove}
            onMouseLeave={handleHeaderMouseLeave}
            style={{ perspective: '1000px' }}
          >
            <div 
              className="flex items-center gap-3 transition-transform duration-100 ease-out"
              style={{ transform: is3DMode ? `rotateX(${headerRotation.x}deg) rotateY(${headerRotation.y}deg) translateZ(25px)` : 'none' }}
            >
              <div 
                className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 flex items-center justify-center text-white font-black text-xl shadow-2xl border border-cyan-300/60 animate-neon-pulse"
                style={{ transform: 'translateZ(35px)' }}
              >
                M
              </div>

              <div className="flex flex-col">
                <span 
                  className="text-2xl sm:text-3xl font-black tracking-wider bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent"
                  style={{
                    filter: 'drop-shadow(0 0 12px rgba(6,182,212,0.8))',
                    textShadow: '0 1px 0 #0e7490, 0 2px 0 #0891b2, 0 3px 0 #06b6d4, 0 4px 0 #2563eb, 0 8px 25px rgba(6,182,212,0.9)',
                    transform: 'translateZ(45px)'
                  }}
                >
                  MARKETPLACE
                </span>
              </div>

              <div 
                className="hidden sm:inline-flex items-center px-3 py-1 rounded-full border border-cyan-400/80 bg-cyan-950/90 text-cyan-300 text-[11px] font-mono shadow-lg animate-neon-pulse"
                style={{ transform: 'translateZ(30px)' }}
              >
                ✨ 3D UI
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2.5 rounded-2xl text-xs font-bold transition border bg-slate-200/60 dark:bg-slate-800/40 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:scale-105"
            >
              {isDarkMode ? '☀️ Light' : '🌙 Dark'}
            </button>

            <button
              onClick={() => setIs3DMode(!is3DMode)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition border flex items-center gap-2 hover:scale-105 ${
                is3DMode
                  ? 'bg-cyan-500/10 border-cyan-500/60 text-cyan-600 dark:text-cyan-300'
                  : 'bg-slate-200/60 dark:bg-slate-800/40 border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${is3DMode ? 'bg-cyan-500 animate-ping' : 'bg-slate-400'}`} />
              {is3DMode ? '3D Engine: Active' : '2D View'}
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

      {/* Hero with 3D Extruded, Floating & Neon Glowing Text */}
      <section 
        className="relative py-20 px-4 text-center z-10 flex flex-col items-center justify-center cursor-default"
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
      >
        <div 
          className="transition-transform duration-200 ease-out max-w-4xl mx-auto animate-float"
          style={{
            perspective: '1000px',
            transform: is3DMode 
              ? `perspective(1000px) rotateX(${heroRotation.x}deg) rotateY(${heroRotation.y}deg)` 
              : 'none',
          }}
        >
          <h1 
            className="text-4xl sm:text-6xl font-black mb-8 tracking-tight leading-tight select-none"
            style={{
              filter: 'drop-shadow(0 0 20px rgba(6,182,212,0.7))',
              textShadow: is3DMode 
                ? '0 1px 0 #0e7490, 0 2px 0 #0891b2, 0 3px 0 #06b6d4, 0 4px 0 #0284c7, 0 5px 0 #0369a1, 0 8px 25px rgba(6,182,212,0.9), 0 15px 40px rgba(0,0,0,0.6)' 
                : 'none',
              transform: 'translateZ(50px)'
            }}
          >
            <span className="bg-gradient-to-b from-cyan-200 via-cyan-400 to-indigo-600 bg-clip-text text-transparent animate-neon-pulse inline-block">
              ศูนย์รวมแลกเปลี่ยนสินค้า
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-300 via-indigo-300 to-purple-400 bg-clip-text text-transparent drop-shadow-2xl inline-block mt-2">
              มิติใหม่ของชาวมหาลัย
            </span>
          </h1>

          <div 
            onClick={triggerMoneyRain}
            className="group inline-flex items-center gap-2 text-xs font-mono text-amber-300 dark:text-amber-400 tracking-wider uppercase bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/40 py-2.5 px-6 rounded-full backdrop-blur-md shadow-xl shadow-amber-500/10 cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95"
            style={{ transform: 'translateZ(30px)' }}
          >
            <span className="animate-bounce">💵</span>
            <span>✨ คลิกที่นี่เพื่อโปรยเงินรับโชค & ดูโมเดล 3D แบบไฮเทค</span>
            <span className="animate-bounce">💸</span>
          </div>
        </div>
      </section>

      {/* Cyberpunk Neon Glassmorphism Zone Filter */}
      <section className="max-w-7xl mx-auto px-4 mb-12 z-30 relative">
        <div className="relative p-2.5 rounded-3xl bg-slate-900/60 dark:bg-slate-900/80 backdrop-blur-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/10 animate-neon-border overflow-hidden">
          {/* Background Ambient Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-indigo-500/10 to-purple-500/10 pointer-events-none" />

          <div className="relative flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
            {['ทั้งหมด', ...locationOptions].map((zone) => {
              const isActive = selectedZone === zone;
              return (
                <button
                  key={zone}
                  onClick={() => setSelectedZone(zone)}
                  className={`relative px-6 py-3 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-300 border backdrop-blur-xl group hover:scale-105 active:scale-95 ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 text-white border-cyan-300/80 shadow-lg shadow-cyan-500/40 scale-105'
                      : 'bg-slate-950/40 hover:bg-slate-800/60 text-slate-300 border-cyan-500/20 hover:border-cyan-400/60 shadow-inner'
                  }`}
                  style={{
                    boxShadow: isActive ? '0 0 20px rgba(6, 182, 212, 0.6), inset 0 0 10px rgba(255, 255, 255, 0.3)' : '0 0 10px rgba(6, 182, 212, 0.05)',
                  }}
                >
                  {/* Subtle Neon Glow Underlay */}
                  <span className={`absolute inset-0 rounded-2xl transition-opacity duration-300 pointer-events-none ${isActive ? 'opacity-100 bg-cyan-400/20 blur-md' : 'opacity-0 group-hover:opacity-50 bg-cyan-400/10 blur-sm'}`} />
                  
                  <span className="relative z-10 flex items-center gap-2">
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-cyan-200 animate-ping" />}
                    {zone === 'ทั้งหมด' ? '🌟 ทั้งหมด' : `📍 ${zone}`}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Product Grid with Neon Borders & Glow */}
      <main className="max-w-7xl mx-auto px-4 py-8 z-20 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => {
            const rot = cardRotation[product.id] || { x: 0, y: 0 };
            const isClicked = clickedCardId === product.id;

            return (
              <div
                key={product.id}
                onClick={() => handleCardClick(product)}
                onMouseMove={(e) => handleCardMouseMove(e, product.id)}
                onMouseLeave={() => handleCardMouseLeave(product.id)}
                className={`group relative bg-slate-900/60 dark:bg-slate-900/70 rounded-3xl border border-cyan-500/30 overflow-hidden transition-all duration-300 flex flex-col cursor-pointer backdrop-blur-2xl hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] ${
                  isClicked ? 'scale-110 -translate-y-6 shadow-[0_0_50px_rgba(6,182,212,0.7)] border-cyan-300 z-30' : ''
                }`}
                style={{
                  transform: isClicked
                    ? 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1.08) translateY(-20px) translateZ(50px)'
                    : is3DMode 
                    ? `perspective(1000px) rotateX(${rot.x}deg) rotateY(${rot.y}deg)` 
                    : 'none',
                  transition: isClicked ? 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)' : (rot.x === 0 ? 'transform 0.5s ease-out' : 'none'),
                }}
              >
                {/* Subtle Card Neon Rim Glow */}
                <div className="absolute inset-0 rounded-3xl pointer-events-none border border-cyan-400/20 group-hover:border-cyan-400/60 transition-colors duration-300" />

                <div className="h-52 bg-slate-950 relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  />
                  <span className="absolute top-3 left-3 bg-slate-950/80 text-cyan-300 border border-cyan-500/40 text-[10px] font-mono px-2.5 py-1 rounded-xl shadow-lg backdrop-blur-md">
                    {product.badge}
                  </span>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950/70 backdrop-blur-sm">
                    <span className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white rounded-full font-bold text-xs shadow-lg shadow-cyan-500/50 animate-bounce">
                      🚀 คลิกลอยเพื่อดู 3D
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between relative z-10">
                  <div>
                    <h3 className="font-semibold text-slate-100 line-clamp-2 mb-3 group-hover:text-cyan-300 transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-2xl font-black text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.4)]">
                      ฿{product.price.toLocaleString()}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-cyan-500/10 text-xs text-slate-400 flex justify-between">
                    <span className="text-cyan-300/80 font-mono">📍 {product.location}</span>
                    <span className="text-emerald-400 font-medium">พร้อมส่ง</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Floating Dock Navigation */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
        <div className="flex items-center gap-1 sm:gap-2 p-2 bg-slate-900/80 backdrop-blur-2xl rounded-full border border-cyan-500/40 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
          {navItems.map((item) => (
            <button 
              key={item} 
              onClick={() => setActiveNav(item)}
              className={`px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                activeNav === item 
                ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/40 scale-105 border border-cyan-300/60' 
                : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200 hover:scale-105'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </nav>

      {/* 3D Model Modal */}
      {selectedProduct3D && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-2xl p-4 animate-fadeIn">
          <div className="bg-slate-900 border border-cyan-500/40 rounded-3xl max-w-4xl w-full overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.3)] relative grid grid-cols-1 md:grid-cols-2">
            <button
              onClick={() => setSelectedProduct3D(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white flex items-center justify-center font-bold border border-cyan-500/30"
            >
              ✕
            </button>

            <div className="h-80 md:h-[450px] bg-slate-950 relative flex items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-cyan-500/20">
              <div className="absolute top-4 left-4 z-10 text-[11px] font-mono text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-500/30">
                🖱️ คลิกลากหมุน 360° / สกรอลล์เพื่อซูม
              </div>
              <ModelViewerInner
                src={selectedProduct3D.modelUrl || 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/Duck/glTF-Binary/Duck.glb'}
                alt={selectedProduct3D.title}
              />
            </div>

            <div className="p-8 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950 border border-cyan-800 px-3 py-1 rounded-full">
                  {selectedProduct3D.category}
                </span>
                <h2 className="text-2xl font-black text-slate-100 mt-4 mb-2">
                  {selectedProduct3D.title}
                </h2>
                <p className="text-3xl font-black text-cyan-400 mb-6 drop-shadow-[0_0_10px_rgba(6,182,212,0.4)]">
                  ฿{selectedProduct3D.price.toLocaleString()}
                </p>
                <div className="space-y-3 text-sm bg-slate-800/40 p-4 rounded-2xl border border-cyan-500/20">
                  <div className="flex justify-between">
                    <span className="text-slate-400">ผู้ขาย:</span>
                    <span className="font-semibold">{selectedProduct3D.seller}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">สถานที่นัดรับ:</span>
                    <span className="font-semibold text-cyan-400">📍 {selectedProduct3D.location}</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => alert(`ทักแชทหา ${selectedProduct3D.seller} เรียบร้อย!`)}
                className="w-full mt-6 py-3.5 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold rounded-2xl shadow-lg shadow-cyan-500/40 transition active:scale-95 border border-cyan-300/40"
              >
                💬 ทักแชทนัดรับสินค้า
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Sell Item */}
      {isSellModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl">
          <div className="bg-slate-900 rounded-3xl max-w-lg w-full p-8 shadow-2xl border border-cyan-500/40">
            <div className="flex justify-between items-center pb-4 border-b border-slate-800 mb-6">
              <h3 className="text-xl font-bold text-cyan-300">➕ ลงขายสินค้า</h3>
              <button onClick={() => setIsSellModalOpen(false)} className="text-slate-400 font-bold">✕</button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-cyan-400 mb-1">ชื่อสินค้า</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 border border-cyan-500/30 rounded-xl text-sm bg-slate-800 text-slate-100 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-cyan-400 mb-1">ราคา (บาท)</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-4 py-2.5 border border-cyan-500/30 rounded-xl text-sm bg-slate-800 text-slate-100 focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-cyan-400 mb-1">หมวดหมู่</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2.5 border border-cyan-500/30 rounded-xl text-sm bg-slate-800 text-slate-100 focus:outline-none focus:border-cyan-400"
                  >
                    <option value="ยานพาหนะ">ยานพาหนะ</option>
                    <option value="หนังสือ / เอกสารเรียน">หนังสือ / เอกสารเรียน</option>
                    <option value="เครื่องใช้ไฟฟ้า">เครื่องใช้ไฟฟ้า</option>
                    <option value="เฟอร์นิเจอร์">เฟอร์นิเจอร์</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-cyan-400 mb-1">URL โมเดล 3D (.glb / .gltf)</label>
                <input
                  type="text"
                  placeholder="https://.../model.glb"
                  value={modelUrlInput}
                  onChange={(e) => setModelUrlInput(e.target.value)}
                  className="w-full px-4 py-2.5 border border-cyan-500/30 rounded-xl text-sm bg-slate-800 text-slate-100 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex gap-4 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsSellModalOpen(false)}
                  className="flex-1 py-3 rounded-xl border border-slate-700 text-sm font-bold text-slate-300"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-sm font-bold shadow-lg shadow-cyan-500/40"
                >
                  ลงขาย
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Global CSS สำหรับแอนิเมชันนีออน */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        @keyframes neonPulse {
          0%, 100% {
            filter: drop-shadow(0 0 15px rgba(6, 182, 212, 0.6)) brightness(1);
          }
          50% {
            filter: drop-shadow(0 0 30px rgba(6, 182, 212, 0.9)) brightness(1.25);
          }
        }
        @keyframes neonBorder {
          0%, 100% {
            box-shadow: 0 0 15px rgba(6, 182, 212, 0.2), inset 0 0 15px rgba(6, 182, 212, 0.1);
          }
          50% {
            box-shadow: 0 0 30px rgba(6, 182, 212, 0.4), inset 0 0 25px rgba(6, 182, 212, 0.2);
          }
        }
        @keyframes fall {
          0% {
            transform: translateY(0px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(105vh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-neon-pulse {
          animation: neonPulse 3s ease-in-out infinite;
        }
        .animate-neon-border {
          animation: neonBorder 4s ease-in-out infinite;
        }
        .animate-fall {
          animation-name: fall;
          animation-iteration-count: 1;
          pointer-events: none;
        }
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}