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
      className="text-4xl sm:text-6xl font-black tracking-tight bg-gradient-to-b from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent drop-shadow-sm transition-all duration-300"
      style={{ transform: 'translateZ(30px)' }}
    >
      ศูนย์รวมแลกเปลี่ยนสินค้า
    </h1>
    <h1 
      className="text-4xl sm:text-6xl font-black tracking-tight bg-gradient-to-r from-cyan-500 to-indigo-500 bg-clip-text text-transparent mt-2 drop-shadow-sm transition-all duration-300"
      style={{ transform: 'translateZ(50px)' }}
    >
      มิติใหม่ของชาวมหาลัย
    </h1>
  </div>

  <p className="text-xs font-mono text-cyan-600 dark:text-cyan-400 mt-6">
    ✨ ขยับเมาส์สำรวจแสงนีออน • เอาเมาส์ชี้และวนบนข้อความเพื่อหมุนดูมิติ 3D • คลิกการ์ดสินค้าเพื่อดูโมเดล 3D
  </p>
</section> 