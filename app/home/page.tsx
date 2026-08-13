'use client';

import React, { useState } from 'react';
import { Search, PlusCircle, Tag, ShoppingBag, Heart } from 'lucide-react';

interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  condition: string;
  location: string;
  imageUrl: string;
}

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'หนังสือ Calculus 1 สภาพดีมาก มีรอยไฮไลท์นิดหน่อย',
    price: 180,
    category: 'หนังสือ/ตารางเรียน',
    condition: 'มือสอง (90%)',
    location: 'ตึกคณะวิศวกรรมศาสตร์',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80',
  },
  {
    id: '2',
    title: 'พัดลมไอเย็นขนาดเล็ก สำหรับหอพัก',
    price: 350,
    category: 'เครื่องใช้ไฟฟ้า',
    condition: 'มือสอง (85%)',
    location: 'หอพักหน้ามหาลัย',
    imageUrl: 'https://images.unsplash.com/photo-1618941723652-30823528b49e?w=400&q=80',
  },
  {
    id: '3',
    title: 'เก้าอี้ทำงานสไตล์มินิมอล ปรับระดับได้',
    price: 750,
    category: 'ของใช้ในหอพัก',
    condition: 'มือสอง (95%)',
    location: 'ซอยหลังมหาลัย',
    imageUrl: 'https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?w=400&q=80',
  },
  {
    id: '4',
    title: 'iPad Air 4 (64GB) Wi-Fi สี Space Gray แถมเคส',
    price: 11500,
    category: 'ไอที/อิเล็กทรอนิกส์',
    condition: 'มือสอง (92%)',
    location: 'ศูนย์กิจกรรมนิสิต',
    imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&q=80',
  },
];

const CATEGORIES = [
  'ทั้งหมด',
  'หนังสือ/ตารางเรียน',
  'ไอที/อิเล็กทรอนิกส์',
  'ของใช้ในหอพัก',
  'เสื้อผ้า/แฟชั่น',
  'อุปกรณ์การเรียน',
];

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด');

  const filteredProducts = SAMPLE_PRODUCTS.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'ทั้งหมด' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Header / Banner */}
      <header className="bg-emerald-600 text-white py-12 px-4 shadow-md">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
            Campus Marketplace
          </h1>
          <p className="text-emerald-100 text-base md:text-lg">
            ศูนย์รวมซื้อ-ขาย แลกเปลี่ยนของใช้และหนังสือเรียนสำหรับเด็กหอและนักศึกษา
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative pt-4">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="ค้นหาสินค้า, หนังสือ, อุปกรณ์การเรียน..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full text-slate-900 bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-300 transition"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Actions & Category Filter */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            <Tag className="w-4 h-4 text-slate-500 shrink-0" />
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-sm rounded-full whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white font-medium shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sell Button */}
          <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-sm transition shrink-0">
            <PlusCircle className="w-5 h-5" />
            <span>ลงขายสินค้า</span>
          </button>
        </div>

        {/* Product Grid */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-600" />
              รายการสินค้าล่าสุด ({filteredProducts.length})
            </h2>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition overflow-hidden group flex flex-col"
                >
                  {/* Image */}
                  <div className="relative h-48 bg-slate-100 overflow-hidden">
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <button className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white text-slate-600 hover:text-red-500 transition shadow-sm">
                      <Heart className="w-4 h-4" />
                    </button>
                    <span className="absolute bottom-3 left-3 bg-slate-900/70 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-md">
                      {product.condition}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                        {product.category}
                      </span>
                      <h3 className="font-medium text-slate-800 line-clamp-2 mt-2 group-hover:text-emerald-600 transition">
                        {product.title}
                      </h3>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-end justify-between">
                      <div>
                        <p className="text-xs text-slate-400">นัดรับ</p>
                        <p className="text-xs text-slate-600 font-medium truncate max-w-[120px]">
                          {product.location}
                        </p>
                      </div>
                      <p className="text-lg font-bold text-emerald-600">
                        ฿{product.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 space-y-2">
              <p className="text-slate-500 font-medium">ไม่พบสินค้าที่คุณค้นหา</p>
              <p className="text-sm text-slate-400">
                ลองค้นหาด้วยคำอื่น หรือเลือกหมวดใหม่อีกครั้ง
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}