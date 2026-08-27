import React, { useState } from 'react';

export default function UniversityMarketplace() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-white relative overflow-hidden">
      
      {/* Background Glow Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/70 border-b border-slate-800/80 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-gradient-to-tr from-cyan-500 to-indigo-500 rounded-xl flex items-center justify-center font-bold text-lg shadow-lg shadow-cyan-500/30">
            U
          </div>
          <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            UniMarket 3D
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
            ค้นหาสินค้า
          </button>
          <button className="bg-gradient-to-r from-cyan-500 to-indigo-500 text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-lg shadow-cyan-500/20 hover:opacity-90 transition-opacity">
            ลงขายสินค้า
          </button>
        </div>
      </nav>

      {/* Hero 3D Interactive Text Section */}
      <section className="relative py-20 px-4 text-center z-10 flex flex-col items-center justify-center">
        <div 
          className="group relative cursor-pointer inline-block py-6 px-8 rounded-3xl transition-transform duration-200 ease-out"
          style={{
            perspective: '1000px',
          }}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
            const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
            e.currentTarget.style.transform = `rotateX(${-y * 20}deg) rotateY(${x * 20}deg) scale(1.05)`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
          }}
        >
          {/* แสงนีออนเรืองแสงด้านหลังตัวหนังสือตอนเอาเมาส์ชี้ */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

          <h1 
            className="text-4xl sm:text-6xl font-black tracking-tight text-white drop-shadow-sm transition-all duration-300"
            style={{ transform: 'translateZ(30px)' }}
          >
            ศูนย์รวมแลกเปลี่ยนสินค้า
          </h1>
          <h1 
            className="text-4xl sm:text-6xl font-black tracking-tight bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent mt-2 drop-shadow-sm transition-all duration-300"
            style={{ transform: 'translateZ(50px)' }}
          >
            มิติใหม่ของชาวมหาลัย
          </h1>
        </div>

        <p className="text-xs font-mono text-cyan-400 mt-6 bg-cyan-950/40 border border-cyan-800/50 py-2 px-4 rounded-full">
          ✨ ขยับเมาส์สำรวจแสงนีออน • เอาเมาส์ชี้และวนบนข้อความเพื่อหมุนดูมิติ 3D • คลิกการ์ดสินค้าเพื่อดูโมเดล 3D
        </p>
      </section>

      {/* Filter Tabs */}
      <div className="max-w-6xl mx-auto px-4 mb-10 flex justify-center gap-2 flex-wrap">
        {['all', 'books', 'electronics', 'furniture'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${
              activeTab === tab
                ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25'
                : 'bg-slate-900/80 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800'
            }`}
          >
            {tab === 'all' && 'ทั้งหมด'}
            {tab === 'books' && 'หนังสือและชีทเรียน'}
            {tab === 'electronics' && 'อุปกรณ์ไอที'}
            {tab === 'furniture' && 'เฟอร์นิเจอร์หอพัก'}
          </button>
        ))}
      </div>

      {/* Product Grid Sample */}
      <div className="max-w-6xl mx-auto px-4 pb-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {[
          { title: 'แคลคูลัส 1 ฉบับสรุปเข้าใจง่าย', price: '150 บาท', tag: 'หนังสือ', imgBg: 'from-blue-600/20 to-cyan-600/20' },
          { title: 'โคมไฟตั้งโต๊ะ LED อ่านหนังสือ', price: '290 บาท', tag: 'อุปกรณ์ไอที', imgBg: 'from-purple-600/20 to-indigo-600/20' },
          { title: 'เก้าอี้ญี่ปุ่นปรับเอนนอนได้', price: '590 บาท', tag: 'เฟอร์นิเจอร์', imgBg: 'from-emerald-600/20 to-teal-600/20' },
        ].map((item, index) => (
          <div 
            key={index}
            className="group relative bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
          >
            <div className={`w-full h-48 rounded-xl bg-gradient-to-br ${item.imgBg} flex items-center justify-center border border-slate-800 mb-4 group-hover:scale-[1.02] transition-transform duration-300`}>
              <span className="text-xs font-mono text-slate-400">3D Interactive Preview</span>
            </div>
            <span className="text-xs font-semibold text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded-md border border-cyan-800/40">
              {item.tag}
            </span>
            <h3 className="font-bold text-white mt-2 group-hover:text-cyan-300 transition-colors">
              {item.title}
            </h3>
            <div className="flex justify-between items-center mt-4">
              <span className="text-lg font-black text-cyan-400">{item.price}</span>
              <span className="text-xs text-slate-400 group-hover:translate-x-1 transition-transform">ดูรายละเอียด →</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}