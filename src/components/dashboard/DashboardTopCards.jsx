import React from 'react';
import { 
  Calendar, 
  CheckCircle2, 
  PenLine, 
  Compass, 
  ArrowRight, 
  Sparkles,
  ClipboardList,
  Flame,
  Award
} from 'lucide-react';

export function DashboardTopCards({ 
  activeDay, 
  currentCase, 
  reflection, 
  metrics, 
  onOpenJournal, 
  onOpenAnalytics 
}) {
  const isReflectionDone = !!reflection?.insight;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
      
      {/* CARD 1: HARI KE-X (Mint/Emerald 3D Card - Matching Image 2) */}
      <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 text-white p-4 sm:p-5 shadow-xl shadow-emerald-500/20 border border-emerald-400/40 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
        {/* Background glow and subtle specular */}
        <div className="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-5 -right-5 text-white/15 pointer-events-none">
          <ClipboardList className="w-28 h-28" strokeWidth={1} />
        </div>

        <div className="relative z-10">
          <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-emerald-100 block mb-0.5">
            AGENDA AKTIF
          </span>
          <div className="flex items-baseline gap-1.5 sm:gap-2">
            <span className="text-xl sm:text-2xl font-bold tracking-tight">HARI</span>
            <span className="text-2xl sm:text-3xl font-black tracking-tighter">KE-{activeDay}</span>
          </div>
        </div>

        <div className="relative z-10 mt-3 pt-2.5 border-t border-white/20 flex items-center justify-between">
          <div>
            <span className="text-[9px] sm:text-[10px] uppercase font-bold text-emerald-200 block">Fase {currentCase?.phase || 1}</span>
            <span className="text-xs font-extrabold text-white truncate max-w-[170px] block">
              {currentCase?.phaseName || 'Membangun Arah'}
            </span>
          </div>
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-inner">
            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
        </div>
      </div>

      {/* CARD 2: REFLEKSI HARIAN (Dark Slate 3D Card - Matching Image 2) */}
      <div className="card-3d rounded-2xl sm:rounded-3xl p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden group">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 block mb-0.5">
              Modul Refleksi
            </span>
            <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white tracking-tight leading-snug">
              Refleksi Kepemimpinan
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
              {isReflectionDone 
                ? 'Refleksi hari ini telah tersimpan dan terarsip.' 
                : 'Catat tantangan, keputusan & hikmah hari ini.'}
            </p>
          </div>
          
          <div className={`w-8 h-8 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 ${
            isReflectionDone 
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
              : 'bg-slate-800 text-slate-400 border border-slate-700'
          }`}>
            {isReflectionDone ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <PenLine className="w-4 h-4" />}
          </div>
        </div>

        <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
          <span className="text-[11px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400">
            {isReflectionDone ? 'Status: Selesai' : 'Status: Belum diisi'}
          </span>
          <button
            type="button"
            onClick={() => onOpenJournal(activeDay)}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold transition-all cursor-pointer group-hover:border-emerald-500/50"
          >
            <span>{isReflectionDone ? 'Lihat Refleksi' : 'Tulis Refleksi'}</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* CARD 3: GAYA DOMINAN / RADAR (Blue 3D Card - Matching Image 2) */}
      <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 text-white p-4 sm:p-5 shadow-xl shadow-blue-600/20 border border-blue-400/30 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
        <div className="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-5 -right-5 text-white/10 pointer-events-none">
          <Compass className="w-28 h-28" strokeWidth={1} />
        </div>

        <div className="relative z-10">
          <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-blue-200 block mb-0.5">
            PROFIL KEPEMIMPINAN
          </span>
          <h3 className="text-base sm:text-lg font-black tracking-tight truncate">
            {metrics?.dominantStyle?.name || 'Transformasional'}
          </h3>
          <p className="text-xs text-blue-100/80 mt-0.5">
            Gaya paling menonjol dari keputusan reflektif Anda sejauh ini.
          </p>
        </div>

        <div className="relative z-10 mt-3 pt-2.5 border-t border-white/20 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-amber-300" />
            <span className="text-xs font-black text-white">
              {metrics?.dominantStyle?.score || 0}% Skor Dominan
            </span>
          </div>
          <button
            type="button"
            onClick={onOpenAnalytics}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-white text-xs font-bold transition-all cursor-pointer backdrop-blur-md"
          >
            <span>Analisis</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

    </div>
  );
}
