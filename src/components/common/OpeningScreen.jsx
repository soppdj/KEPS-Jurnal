import React, { useEffect } from 'react';
import { 
  Compass, 
  Flame, 
  BookOpen, 
  ShieldCheck 
} from 'lucide-react';

export function OpeningScreen({ onEnterApp }) {
  // Allow Enter or Spacebar key to also enter the app
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
        onEnterApp();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onEnterApp]);

  return (
    <div 
      onClick={onEnterApp}
      className="fixed inset-0 z-50 overflow-hidden bg-slate-950 text-slate-100 flex flex-col justify-between p-4 sm:p-8 cursor-pointer select-none animate-in fade-in duration-500"
      title="Klik di mana saja untuk membuka aplikasi"
    >
      {/* Top bar */}
      <div className="max-w-7xl w-full mx-auto flex items-center justify-between z-20">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl overflow-hidden bg-navy-900 border border-emerald-500/30 p-0.5 shadow-md">
            <img src="/logo.png" alt="Logo" className="w-full h-full object-cover rounded-lg" />
          </div>
          <span className="font-extrabold tracking-tight text-white text-sm sm:text-base">
            KEPS Jurnal <span className="text-emerald-400 font-bold text-xs">v.1.0</span>
          </span>
        </div>
      </div>

      {/* Main 3D Showcase Arena + WELCOME Typography */}
      <div className="relative w-full max-w-7xl mx-auto my-auto py-4 sm:py-8 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 perspective-1500">
        
        {/* Ambient Glows */}
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* 3D Scene Wrapper with preserve-3d */}
        <div className="relative w-full max-w-2xl h-[320px] sm:h-[420px] preserve-3d flex items-center justify-center shrink-0">
          
          {/* Card 1: Top/Back Floating Dashboard Card */}
          <div 
            className="absolute top-2 sm:top-4 w-[85%] sm:w-[520px] h-[160px] sm:h-[200px] rounded-2xl bg-gradient-to-br from-slate-800/85 via-navy-900/90 to-slate-900/95 border border-slate-700/60 shadow-2xl p-4 sm:p-5 backdrop-blur-md pointer-events-none transition-transform duration-700 animate-float-slow"
            style={{
              transform: 'rotateX(20deg) rotateY(-8deg) rotateZ(1deg) translateZ(-80px)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), inset 0 1px 1px 0 rgba(255, 255, 255, 0.15)'
            }}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-700/50 text-[10px] text-slate-400">
              <div className="flex items-center gap-1.5 font-bold text-white">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>KEPS Jurnal - Executive Dashboard</span>
              </div>
              <span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30 font-bold">
                90 Hari Terpandu
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="bg-slate-900/70 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[9px] text-slate-400 block mb-1">Habit Tracking Progress</span>
                <div className="flex items-end gap-1.5 h-10 pt-1">
                  <div className="w-2.5 bg-emerald-500/60 rounded-t h-[40%]" />
                  <div className="w-2.5 bg-emerald-500/70 rounded-t h-[65%]" />
                  <div className="w-2.5 bg-emerald-400 rounded-t h-[85%]" />
                  <div className="w-2.5 bg-emerald-500 rounded-t h-[100%]" />
                  <div className="w-2.5 bg-emerald-400 rounded-t h-[75%]" />
                  <div className="w-2.5 bg-emerald-500/80 rounded-t h-[90%]" />
                </div>
              </div>
              <div className="bg-slate-900/70 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[9px] text-slate-400 block mb-1">9 Gaya Kepemimpinan</span>
                <div className="flex items-center justify-center h-10">
                  <div className="w-8 h-8 rounded-full border-2 border-emerald-500/40 border-dashed animate-spin flex items-center justify-center">
                    <Compass className="w-4 h-4 text-emerald-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Left Floating Card (Jurnal Refleksi) */}
          <div 
            className="hidden sm:block absolute -left-4 sm:left-2 top-20 w-[190px] h-[200px] rounded-2xl bg-gradient-to-br from-slate-850/90 to-navy-950/95 border border-emerald-500/25 shadow-2xl p-3.5 backdrop-blur-md pointer-events-none transition-transform duration-700 animate-float-reverse"
            style={{
              transform: 'rotateY(22deg) rotateX(8deg) translateZ(40px)',
              boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.6), 0 0 20px -5px rgba(16, 185, 129, 0.2)'
            }}
          >
            <div className="text-[11px] font-bold text-emerald-400 mb-2 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Jurnal Refleksi Harian</span>
            </div>
            <div className="space-y-1.5 text-[10px]">
              <div className="bg-slate-900/80 p-1.5 rounded-lg border border-slate-800">
                <span className="text-slate-400 block">Hari Ke-1</span>
                <span className="font-semibold text-slate-200 truncate block">Membaca Denyut Sekolah</span>
              </div>
              <div className="bg-slate-900/80 p-1.5 rounded-lg border border-slate-800">
                <span className="text-slate-400 block">Dikte Suara</span>
                <span className="text-emerald-400 font-medium">● Voice Active</span>
              </div>
              <div className="bg-slate-900/80 p-1.5 rounded-lg border border-slate-800">
                <span className="text-slate-400 block">Mood Meter</span>
                <span className="text-amber-400 font-bold">🌟 Berdaya</span>
              </div>
            </div>
          </div>

          {/* Card 3: Right Floating Card (Mobile App Perspective) */}
          <div 
            className="hidden sm:block absolute -right-4 sm:right-2 top-20 w-[180px] h-[210px] rounded-2xl bg-gradient-to-br from-slate-850/90 to-navy-950/95 border border-blue-500/25 shadow-2xl p-3.5 backdrop-blur-md pointer-events-none transition-transform duration-700 animate-float-slow"
            style={{
              transform: 'rotateY(-24deg) rotateX(10deg) translateZ(40px)',
              boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.6), 0 0 20px -5px rgba(59, 130, 246, 0.2)'
            }}
          >
            <div className="text-[11px] font-bold text-blue-400 mb-2 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
              <span>Streak & Evaluasi</span>
            </div>
            <div className="space-y-1.5 text-[10px]">
              <div className="bg-slate-900/80 p-1.5 rounded-lg border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">Total</span>
                <span className="font-bold text-white">90 Kasus</span>
              </div>
              <div className="bg-slate-900/80 p-1.5 rounded-lg border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">Masa Trial</span>
                <span className="text-emerald-400 font-bold">3 Hari</span>
              </div>
              <div className="bg-slate-900/80 p-1.5 rounded-lg border border-slate-800">
                <span className="text-slate-400 block">Portofolio</span>
                <span className="text-blue-400 font-semibold block">Format PDF A4</span>
              </div>
            </div>
          </div>

          {/* Card 4: Bottom Floating Card (Leadership Radar & Habit Matrix) */}
          <div 
            className="absolute bottom-2 sm:bottom-0 w-[90%] sm:w-[440px] h-[120px] sm:h-[135px] rounded-2xl bg-gradient-to-br from-slate-900/95 to-slate-950/98 border border-emerald-500/30 shadow-2xl p-3 backdrop-blur-md pointer-events-none transition-transform duration-700"
            style={{
              transform: 'rotateX(22deg) rotateY(-4deg) translateZ(90px)',
              boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.8), 0 0 25px -4px rgba(16, 185, 129, 0.3), inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)'
            }}
          >
            <div className="flex items-center justify-between text-[11px] font-bold pb-1.5 border-b border-slate-800">
              <span className="text-white flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Leadership Radar 9 Dimensi</span>
              </span>
              <span className="text-[10px] text-emerald-400 font-semibold">
                Matriks Habit 90 Hari
              </span>
            </div>
            <div className="flex items-center justify-between pt-2">
              <div className="flex gap-1">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-3.5 h-3.5 rounded-sm ${i < 7 ? 'bg-emerald-500' : 'bg-slate-800'} ${i === 6 ? 'animate-pulse ring-2 ring-emerald-400' : ''}`} 
                  />
                ))}
              </div>
              <div className="text-right">
                <span className="text-[9px] text-slate-400 block">Dominan</span>
                <span className="text-xs font-black text-emerald-400">Transformasional</span>
              </div>
            </div>
          </div>

          {/* Centerpiece: 3D High-Gloss Floating Badge */}
          <div 
            className="relative z-30 w-32 h-32 sm:w-40 sm:h-40 rounded-3xl bg-gradient-to-br from-slate-800/90 via-navy-900/95 to-slate-950/95 border-2 border-emerald-500/50 shadow-2xl flex flex-col items-center justify-center p-3 transition-transform duration-500 hover:scale-105"
            style={{
              transform: 'translateZ(130px)',
              boxShadow: '0 25px 60px -10px rgba(0, 0, 0, 0.9), 0 0 35px -5px rgba(16, 185, 129, 0.4), inset 0 2px 3px 0 rgba(255, 255, 255, 0.25)'
            }}
          >
            <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl overflow-hidden shadow-xl border border-emerald-400/30 p-1 bg-navy-950 mb-1.5">
              <img src="/logo.png" alt="Logo" className="w-full h-full object-cover rounded-xl" />
            </div>
            <span className="text-xs sm:text-sm font-black tracking-tight text-white uppercase text-center">
              KEPS Jurnal
            </span>
            <span className="text-[10px] font-extrabold text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded-md mt-0.5 border border-emerald-500/30">
              v.1.0
            </span>
          </div>

        </div>

        {/* WELCOME Typography Block */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left z-20 px-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight bg-gradient-to-br from-white via-slate-100 to-emerald-400 bg-clip-text text-transparent drop-shadow-xl leading-tight">
            WELCOME
          </h1>

          <p className="text-sm sm:text-base text-slate-400 font-medium mt-3 max-w-sm">
            Selamat datang Bapak/Ibu<br />Kepala Sekolah
          </p>
        </div>

      </div>

      {/* Footer */}
      <div className="max-w-7xl w-full mx-auto text-center py-2.5 text-xs text-slate-400 font-medium border-t border-slate-900">
        KEPS Jurnal v.1.0 Powered by FatherLab
      </div>
    </div>
  );
}
