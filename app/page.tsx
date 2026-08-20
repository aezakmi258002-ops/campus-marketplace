'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// 1. โหลด model-viewer แบบปิด SSR เพื่อป้องกันจอดำใน Next.js
const ModelViewerInner = dynamic(
  () =>
    Promise.resolve(({ src, alt }: { src: string; alt: string }) => {
      useEffect(() => {
        // โหลด Script ของ Google บน Client Side
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
          style={{ width: '100%', height: '100%', backgroundColor: '#020617' }}
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

// ข้อมูลสินค้าตัวอย่าง
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
    id: 3,
    title: 'จักรยานปั่นในมหาลัย สีฟ้ามีตะกร้าหน้า',
    price: 1200,
    category: 'ยานพาหนะ',
    seller: 'กอล์ฟ วิศวะ',
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=500&q=80',
    location: 'ลานกลม',
    badge: 'Hot',
    type: 'bike',
    // 🚲 เพิ่มโมเดล 3D จักรยานที่นี่
    modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/Bicycle/glTF-Binary/Bicycle.glb'
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

export default function Home() {
  const [products, setProducts] = useState(initialProducts);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [is3DMode, setIs3DMode] = useState(true);
  const [selectedZone, setSelectedZone] = useState('ทั้งหมด');
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
      className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-500 overflow-x-hidden font-sans"
    >
      {/* Dynamic Background Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div 
          className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-400/20 dark:bg-indigo-600/30 rounded-full blur-[120px] transition-transform duration-700 ease-out"
          style={{ transform: `translate(${mousePos.x * 2}px, ${mousePos.y * 2}px)` }}
        />
        <div 
          className="absolute top-1/2 -right-40 w-96 h-96 bg-cyan-400/20 dark:bg-cyan-500/20 rounded-full blur-[140px] transition-transform duration-700 ease-out"
          style={{ transform: `translate(${-mousePos.x * 2}px, ${-mousePos.y * 2}px)` }}
        />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800/80 shadow-sm transition-colors duration-500">
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
              className="p-2.5 rounded-2xl text-xs font-bold transition border bg-slate-200/60 dark:bg-slate-800/40 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300"
            >
              {isDarkMode ? '☀️ Light' : '🌙 Dark'}
            </button>

            <button
              onClick={() => setIs3DMode(!is3DMode)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition border flex items-center gap-2 ${
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
              className="px-5 py-2.5 text-xs font-bold text-white dark:text-slate-950 bg-gradient-to-r from-cyan-500 to-indigo-600 dark:from-cyan-400 dark:to-indigo-400 rounded-2xl shadow-lg shadow-cyan-500/25 transition active:scale-95"
            >
              + ลงขายสินค้า
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-16 px-4 text-center z-10">
        <h1 className="text-4xl sm:text-6xl font-black mb-4 tracking-tight bg-gradient-to-b from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
          ศูนย์รวมแลกเปลี่ยนสินค้า <br />
          <span className="bg-gradient-to-r from-cyan-500 to-indigo-500 bg-clip-text text-transparent">
            มิติใหม่ของชาวมหาลัย
          </span>
        </h1>
        <p className="text-xs font-mono text-cyan-600 dark:text-cyan-400">
          คลิกที่การ์ดสินค้า เพื่อเปิดหมุนดูโมเดล 3D แบบ 360 องศา
        </p>
      </section>

      {/* Zone Filter */}
      <section className="max-w-7xl mx-auto px-4 mb-10 z-30 relative">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl p-2 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl flex items-center justify-between gap-2 overflow-x-auto">
          <div className="flex gap-2">
            {['ทั้งหมด', ...locationOptions].map((zone) => (
              <button
                key={zone}
                onClick={() => setSelectedZone(zone)}
                className={`px-5 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition border ${
                  selectedZone === zone
                    ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white border-cyan-400/50 shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800'
                }`}
              >
                {zone}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <main className="max-w-7xl mx-auto px-4 py-8 z-20 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => {
            const rot = cardRotation[product.id] || { x: 0, y: 0 };
            return (
              <div
                key={product.id}
                onClick={() => setSelectedProduct3D(product)}
                onMouseMove={(e) => handleCardMouseMove(e, product.id)}
                onMouseLeave={() => handleCardMouseLeave(product.id)}
                className="group bg-white/80 dark:bg-slate-900/60 rounded-3xl border border-slate-200 dark:border-slate-800/80 overflow-hidden transition-all duration-200 flex flex-col cursor-pointer backdrop-blur-xl hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/20"
                style={{
                  transform: is3DMode 
                    ? `perspective(1000px) rotateX(${rot.x}deg) rotateY(${rot.y}deg)` 
                    : 'none',
                  transition: rot.x === 0 ? 'transform 0.5s ease-out' : 'none',
                }}
              >
                <div className="h-52 bg-slate-200 dark:bg-slate-800 relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <span className="absolute top-3 left-3 bg-white/90 dark:bg-slate-950/80 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 text-[10px] font-mono px-2.5 py-1 rounded-xl">
                    {product.badge}
                  </span>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950/60 backdrop-blur-sm">
                    <span className="px-4 py-2 bg-cyan-500 text-slate-950 rounded-full font-bold text-xs shadow-lg">
                      🔍 ดูโมเดล 3D
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-800 dark:text-slate-200 line-clamp-2 mb-3">
                      {product.title}
                    </h3>
                    <p className="text-2xl font-black text-cyan-600 dark:text-cyan-400">
                      ฿{product.price.toLocaleString()}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80 text-xs text-slate-500 dark:text-slate-400 flex justify-between">
                    <span>📍 {product.location}</span>
                    <span className="text-emerald-500 font-medium">พร้อมส่ง</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* 3D Model Modal */}
      {selectedProduct3D && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-2xl p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl relative grid grid-cols-1 md:grid-cols-2">
            
            <button
              onClick={() => setSelectedProduct3D(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white flex items-center justify-center font-bold border border-slate-700"
            >
              ✕
            </button>

            {/* 3D Model Container */}
            <div className="h-80 md:h-[450px] bg-slate-950 relative flex items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-slate-800">
              <div className="absolute top-4 left-4 z-10 text-[11px] font-mono text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-500/30">
                🖱️ คลิกลากหมุน 360° / สกรอลล์เพื่อซูม
              </div>

              {/* แสดงผล Dynamic ModelViewer */}
              <ModelViewerInner
                src={
                  selectedProduct3D.modelUrl || 
                  'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/Duck/glTF-Binary/Duck.glb'
                }
                alt={selectedProduct3D.title}
              />
            </div>

            {/* Product Details */}
            <div className="p-8 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 bg-cyan-100 dark:bg-cyan-950 border border-cyan-300 dark:border-cyan-800 px-3 py-1 rounded-full">
                  {selectedProduct3D.category}
                </span>
                <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 mt-4 mb-2">
                  {selectedProduct3D.title}
                </h2>
                <p className="text-3xl font-black text-cyan-600 dark:text-cyan-400 mb-6">
                  ฿{selectedProduct3D.price.toLocaleString()}
                </p>
                <div className="space-y-3 text-sm bg-slate-100 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
                  <div className="flex justify-between">
                    <span className="text-slate-400">ผู้ขาย:</span>
                    <span className="font-semibold">{selectedProduct3D.seller}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">สถานที่นัดรับ:</span>
                    <span className="font-semibold text-cyan-500">📍 {selectedProduct3D.location}</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => alert(`ทักแชทหา ${selectedProduct3D.seller} เรียบร้อย!`)}
                className="w-full mt-6 py-3.5 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold rounded-2xl shadow-lg transition active:scale-95"
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
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-8 shadow-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-800 mb-6">
              <h3 className="text-xl font-bold">➕ ลงขายสินค้า</h3>
              <button onClick={() => setIsSellModalOpen(false)} className="text-slate-400 font-bold">✕</button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">ชื่อสินค้า</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 border dark:border-slate-700 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">ราคา (บาท)</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-4 py-2.5 border dark:border-slate-700 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">หมวดหมู่</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2.5 border dark:border-slate-700 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  >
                    <option value="ยานพาหนะ">ยานพาหนะ</option>
                    <option value="หนังสือ / เอกสารเรียน">หนังสือ / เอกสารเรียน</option>
                    <option value="เครื่องใช้ไฟฟ้า">เครื่องใช้ไฟฟ้า</option>
                    <option value="เฟอร์นิเจอร์">เฟอร์นิเจอร์</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">URL โมเดล 3D (.glb / .gltf)</label>
                <input
                  type="text"
                  placeholder="https://.../model.glb"
                  value={modelUrlInput}
                  onChange={(e) => setModelUrlInput(e.target.value)}
                  className="w-full px-4 py-2.5 border dark:border-slate-700 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div className="flex gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsSellModalOpen(false)}
                  className="flex-1 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-sm font-bold"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-cyan-500 text-slate-950 text-sm font-bold shadow-md"
                >
                  ลงขาย
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}