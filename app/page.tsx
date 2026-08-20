'use client';

import React, { useState, useEffect } from 'react';

// ข้อมูลสินค้าจำลอง
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
    modelUrl: 'https://modelviewer.dev/shared-assets/models/Gramophone.glb' // URL โมเดลตัวอย่าง
  },
  {
    id: 2,
    title: 'พัดลมไอเย็น Midea สภาพดี พร้อมรีโมท',
    price: 650,
    category: 'เครื่องใช้ไฟฟ้า',
    seller: 'มายด์ หอพัก A',
    image: 'https://images.unsplash.com/photo-1618961734760-466979ce35b0?w=500&q=80',
    location: 'โซนหอใน',
    badge: 'Rare',
    type: 'fan',
    modelUrl: ''
  },
  {
   id: 2,
  title: 'พัดลมไอเย็น Midea สภาพดี พร้อมรีโมท',
  price: 650,
  category: 'เครื่องใช้ไฟฟ้า',
  seller: 'มายด์ หอพัก A',
  image: 'https://images.unsplash.com/photo-1618961734760-466979ce35b0?w=500&q=80',
  location: 'โซนหอใน',
  badge: 'Rare',
  type: 'fan',
  modelUrl: '/models/fan.glb' // <-- แก้ตรงนี้ให้เป็น Path ไฟล์ของคุณ
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
    modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/SheenChair/glTF-Binary/SheenChair.glb'
  },
];

const locationOptions = ['ตึกวิศวะ', 'โซนหอใน', 'โซนหอนอก', 'ลานกลม', 'โรงอาหารกลาง'];

export default function Home() {
  const [products, setProducts] = useState(initialProducts);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [is3DMode, setIs3DMode] = useState(true);
  const [selectedZone, setSelectedZone] = useState('ทั้งหมด');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cardRotation, setCardRotation] = useState<{ [key: number]: { x: number; y: number } }>({});

  // State สำหรับ 3D Model Modal
  const [selectedProduct3D, setSelectedProduct3D] = useState<any>(null);

  // State สำหรับ Modal ลงขายสินค้า
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('หนังสือ / เอกสารเรียน');
  const [seller, setSeller] = useState('');
  const [location, setLocation] = useState('ตึกวิศวะ');
  const [image, setImage] = useState('');

  // โหลด Script <model-viewer> เข้ามาในระบบอัตโนมัติ
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js';
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 30;
    const y = (clientY / innerHeight - 0.5) * 30;
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
      modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/Bicycle/glTF-Binary/Bicycle.glb'
    };

    setProducts([newProduct, ...products]);
    setIsSellModalOpen(false);
    setTitle('');
    setPrice('');
    setSeller('');
    setImage('');
  };

  const filteredProducts = selectedZone === 'ทั้งหมด' 
    ? products 
    : products.filter(p => p.location === selectedZone);

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-slate-950 text-slate-100 transition-colors duration-500 overflow-x-hidden selection:bg-cyan-500 selection:text-black font-sans"
    >
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div 
          className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/30 rounded-full blur-[120px] transition-transform duration-700 ease-out"
          style={{ transform: `translate(${mousePos.x * 2}px, ${mousePos.y * 2}px)` }}
        />
        <div 
          className="absolute top-1/2 -right-40 w-96 h-96 bg-cyan-500/20 rounded-full blur-[140px] transition-transform duration-700 ease-out"
          style={{ transform: `translate(${-mousePos.x * 2}px, ${-mousePos.y * 2}px)` }}
        />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-900/60 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/30 animate-pulse">
              <span className="text-xl font-black">C</span>
            </div>
            <span className="text-2xl font-black bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent tracking-tight">
              CAMPUS<span className="text-xs font-mono ml-1 px-2 py-0.5 rounded-full border border-cyan-500/40 text-cyan-400 bg-cyan-950/50">3D UI</span>
            </span>
          </div>

          <div className="flex-1 max-w-md mx-8 hidden md:block relative">
            <input
              type="text"
              placeholder="ค้นหาสินค้าด้วยระบบ AI Spatial Search..."
              className="w-full px-5 py-2.5 rounded-2xl text-sm bg-slate-800/50 border border-slate-700/60 text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-500/80 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 backdrop-blur-md"
            />
            <span className="absolute right-4 top-3 text-xs text-slate-500 font-mono">⌘K</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIs3DMode(!is3DMode)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all duration-300 border backdrop-blur-md flex items-center gap-2 ${
                is3DMode
                  ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 border-cyan-500/60 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.3)]'
                  : 'bg-slate-800/40 border-slate-700 text-slate-400'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${is3DMode ? 'bg-cyan-400 animate-ping' : 'bg-slate-500'}`} />
              {is3DMode ? '3D Engine: Active' : '2D View'}
            </button>

            <button 
              onClick={() => setIsSellModalOpen(true)}
              className="px-5 py-2.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-indigo-400 hover:from-cyan-300 hover:to-indigo-300 rounded-2xl shadow-lg shadow-cyan-500/25 transition-all duration-300 active:scale-95 hover:shadow-cyan-500/40"
            >
              + ลงขายสินค้า
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center overflow-hidden z-10">
        <div 
          className="max-w-4xl mx-auto relative z-10 transition-transform duration-300 ease-out"
          style={{
            transform: is3DMode 
              ? `rotateX(${-mousePos.y * 0.2}deg) rotateY(${mousePos.x * 0.2}deg)` 
              : 'none'
          }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-mono tracking-widest text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 rounded-full backdrop-blur-xl">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            CLICK ANY CARD TO INSPECT IN 3D
          </div>
          
          <h1 className="text-4xl sm:text-7xl font-black mb-6 tracking-tight leading-tight bg-gradient-to-b from-white via-slate-200 to-slate-400 bg-clip-text text-transparent drop-shadow-2xl">
            ศูนย์รวมแลกเปลี่ยนสินค้า <br />
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              มิติใหม่ของชาวมหาลัย
            </span>
          </h1>
        </div>
      </section>

      {/* Spatial Zone Filter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 relative z-30">
        <div className="bg-slate-900/80 backdrop-blur-2xl p-2 rounded-3xl border border-slate-800 shadow-2xl flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 px-3 text-xs font-mono text-cyan-400">
            <span>📍 SPATIAL ZONE:</span>
          </div>
          <div className="flex gap-2">
            {['ทั้งหมด', ...locationOptions].map((zone) => {
              const isActive = selectedZone === zone;
              return (
                <button
                  key={zone}
                  onClick={() => setSelectedZone(zone)}
                  className={`px-5 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-300 border ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white border-cyan-400/50 shadow-lg shadow-cyan-500/25 scale-105'
                      : 'bg-slate-800/40 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  {zone}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => {
            const rot = cardRotation[product.id] || { x: 0, y: 0 };
            return (
              <div
                key={product.id}
                onClick={() => setSelectedProduct3D(product)}
                onMouseMove={(e) => handleCardMouseMove(e, product.id)}
                onMouseLeave={() => handleCardMouseLeave(product.id)}
                className="group relative bg-slate-900/60 rounded-3xl border border-slate-800/80 overflow-hidden transition-all duration-200 flex flex-col cursor-pointer backdrop-blur-xl hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/20"
                style={{
                  transform: is3DMode 
                    ? `perspective(1000px) rotateX(${rot.x}deg) rotateY(${rot.y}deg) translateZ(${rot.x !== 0 ? 20 : 0}px)` 
                    : 'none',
                  transition: rot.x === 0 ? 'transform 0.5s ease-out' : 'none',
                }}
              >
                {/* Image & Overlay */}
                <div className="h-52 bg-slate-800 relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                  
                  <span className="absolute top-3 left-3 bg-slate-950/80 text-cyan-300 border border-cyan-500/30 text-[10px] font-mono px-2.5 py-1 rounded-xl backdrop-blur-md">
                    {product.badge}
                  </span>

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950/60 backdrop-blur-sm">
                    <span className="px-4 py-2 bg-cyan-500 text-slate-950 rounded-full font-bold text-xs shadow-lg shadow-cyan-500/50 transform group-hover:scale-110 transition-transform">
                      🔍 ดูโมเดล 3D
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-200 line-clamp-2 mb-3 group-hover:text-cyan-300 transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-indigo-300 bg-clip-text text-transparent">
                      ฿{product.price.toLocaleString()}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-800/80 text-xs text-slate-400 flex justify-between items-center">
                    <span>📍 {product.location}</span>
                    <span className="text-emerald-400 font-medium">Ready</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* ================= 3D MODEL REAL RENDER MODAL ================= */}
      {selectedProduct3D && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-2xl p-4 animate-[fadeIn_0.2s_ease-out]">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl relative grid grid-cols-1 md:grid-cols-2">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedProduct3D(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white flex items-center justify-center font-bold transition border border-slate-700"
            >
              ✕
            </button>

            {/* 3D Viewer Canvas Area using <model-viewer> */}
            <div className="h-80 md:h-[450px] bg-slate-950 relative flex items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-slate-800">
              {/* Grid Background */}
              <div 
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(#06b6d4 1px, transparent 1px)`,
                  backgroundSize: '24px 24px'
                }}
              />

              <div className="absolute top-4 left-4 z-10 text-[11px] font-mono text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-500/30">
                🖱️ หมุน/ย่อ-ขยาย โมเดล 3D แบบ REALTIME
              </div>

              {/* Render Web Component <model-viewer> */}
              {selectedProduct3D.modelUrl ? (
                // @ts-ignore
                <model-viewer
                  src={selectedProduct3D.modelUrl}
                  alt={selectedProduct3D.title}
                  auto-rotate
                  camera-controls
                  shadow-intensity="1"
                  exposure="1.2"
                  touch-action="pan-y"
                  style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
                />
              ) : (
                <div className="text-center p-6 text-slate-500 font-mono text-sm">
                  ⚠️ สินค้านี้ยังไม่มีไฟล์โมเดล 3D (.glb)
                </div>
              )}
            </div>

            {/* Product Details Side */}
            <div className="p-8 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950 border border-cyan-800 px-3 py-1 rounded-full">
                  {selectedProduct3D.category}
                </span>

                <h2 className="text-2xl font-black text-slate-100 mt-4 mb-2">
                  {selectedProduct3D.title}
                </h2>

                <p className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-indigo-300 bg-clip-text text-transparent mb-6">
                  ฿{selectedProduct3D.price.toLocaleString()}
                </p>

                <div className="space-y-3 text-sm text-slate-300 bg-slate-800/40 p-4 rounded-2xl border border-slate-800">
                  <div className="flex justify-between">
                    <span className="text-slate-400">ผู้ขาย:</span>
                    <span className="font-semibold text-slate-200">{selectedProduct3D.seller}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">สถานที่นัดรับ:</span>
                    <span className="font-semibold text-cyan-400">📍 {selectedProduct3D.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">สถานะสินค้า:</span>
                    <span className="text-emerald-400 font-semibold">พร้อมส่งมอบ</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <button 
                  onClick={() => alert(`ทักแชทหา ${selectedProduct3D.seller} เรียบร้อยแล้ว!`)}
                  className="flex-1 py-3.5 bg-gradient-to-r from-cyan-400 to-indigo-500 text-slate-950 font-bold rounded-2xl shadow-lg shadow-cyan-500/25 hover:opacity-90 active:scale-95 transition"
                >
                  💬 ทักแชทนัดรับสินค้า
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Modal ลงขายสินค้า */}
      {isSellModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl">
          <div className="bg-slate-900 rounded-3xl max-w-lg w-full p-8 shadow-2xl border border-slate-800 relative">
            <div className="flex justify-between items-center pb-4 border-b border-slate-800 mb-6">
              <h3 className="text-xl font-bold text-slate-100">➕ ลงขายสินค้าใน Spatial Market</h3>
              <button onClick={() => setIsSellModalOpen(false)} className="text-slate-400 text-xl font-bold">✕</button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">ชื่อสินค้า</label>
                <input
                  type="text"
                  required
                  placeholder="เช่น จักรยาน, หนังสือ"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-700 rounded-xl text-sm bg-slate-800/50 text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">ราคา (บาท)</label>
                  <input
                    type="number"
                    required
                    placeholder="1200"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-700 rounded-xl text-sm bg-slate-800/50 text-slate-100 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">หมวดหมู่</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-700 rounded-xl text-sm bg-slate-800/50 text-slate-100 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="ยานพาหนะ">ยานพาหนะ</option>
                    <option value="หนังสือ / เอกสารเรียน">หนังสือ / เอกสารเรียน</option>
                    <option value="เครื่องใช้ไฟฟ้า">เครื่องใช้ไฟฟ้า</option>
                    <option value="เฟอร์นิเจอร์">เฟอร์นิเจอร์</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsSellModalOpen(false)}
                  className="flex-1 py-3 rounded-xl border border-slate-700 text-slate-300 text-sm font-bold"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 text-slate-950 text-sm font-bold"
                >
                  ลงขายสินค้า
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}