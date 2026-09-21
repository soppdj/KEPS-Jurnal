import React, { useState, useEffect } from 'react';
import { 
  Flame, 
  CalendarDays, 
  Check, 
  Sparkles 
} from 'lucide-react';

export function ProgressTrackingCalendar({ 
  activeDay, 
  onSelectDay, 
  completedActions = {}, 
  reflections = {},
  metrics 
}) {
  const activeDayPhase = activeDay <= 30 ? 1 : activeDay <= 60 ? 2 : 3;
  const [selectedSession, setSelectedSession] = useState(activeDayPhase);

  // Sync selected session if activeDay moves to a different session
  useEffect(() => {
    setSelectedSession(activeDayPhase);
  }, [activeDayPhase]);

  const startDay = (selectedSession - 1) * 30 + 1;
  const daysInSession = Array.from({ length: 30 }, (_, i) => startDay + i);

  const sessionNames = {
    1: 'Sesi 1: Membangun Arah',
    2: 'Sesi 2: Membangun Kepercayaan',
    3: 'Sesi 3: Membangun Kultur'
  };

  const getDayStatus = (day) => {
    const hasReflection = !!reflections[day]?.insight;
    const actions = completedActions[day] || [];
    const hasActions = actions.length > 0;
    const isFullActions = actions.length >= 4;

    if (hasReflection) return 'reflection';
    if (isFullActions) return 'full-actions';
    if (hasActions) return 'partial';
    return 'none';
  };

  const completedInSession = daysInSession.filter(d => !!reflections[d]?.insight).length;

  return (
    <div className="card-3d rounded-2xl sm:rounded-3xl p-4 sm:p-5 flex flex-col justify-between h-full">
      <div>
        {/* Header with Title & Streak */}
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-200 dark:border-slate-800/80 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <CalendarDays className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                Progress Tracking
              </h3>
              <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400">
                {sessionNames[selectedSession]}
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[11px] sm:text-xs font-black shrink-0">
            <Flame className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-500" />
            <span>{metrics?.streak || 0} Hari Streak</span>
          </div>
        </div>

        {/* 3 Sesi Tabs: 1-30, 31-60, 61-90 as requested */}
        <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl mb-3 border border-slate-200 dark:border-slate-700/60">
          <button
            type="button"
            onClick={() => setSelectedSession(1)}
            className={`py-1 sm:py-1.5 px-1.5 sm:px-2 rounded-lg text-[10px] sm:text-xs font-bold transition-all cursor-pointer text-center ${
              selectedSession === 1
                ? 'bg-emerald-500 text-white shadow-sm font-black'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-700/50'
            }`}
          >
            Sesi 1 (1–30)
          </button>
          <button
            type="button"
            onClick={() => setSelectedSession(2)}
            className={`py-1 sm:py-1.5 px-1.5 sm:px-2 rounded-lg text-[10px] sm:text-xs font-bold transition-all cursor-pointer text-center ${
              selectedSession === 2
                ? 'bg-emerald-500 text-white shadow-sm font-black'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-700/50'
            }`}
          >
            Sesi 2 (31–60)
          </button>
          <button
            type="button"
            onClick={() => setSelectedSession(3)}
            className={`py-1 sm:py-1.5 px-1.5 sm:px-2 rounded-lg text-[10px] sm:text-xs font-bold transition-all cursor-pointer text-center ${
              selectedSession === 3
                ? 'bg-emerald-500 text-white shadow-sm font-black'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-700/50'
            }`}
          >
            Sesi 3 (61–90)
          </button>
        </div>

        {/* Weekday headers: Min Sen Sel Rab Kam Jum Sab */}
        <div className="grid grid-cols-7 gap-1 text-center text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
          <span>Min</span>
          <span>Sen</span>
          <span>Sel</span>
          <span>Rab</span>
          <span>Kam</span>
          <span>Jum</span>
          <span>Sab</span>
        </div>

        {/* 30-Day Grid (Compact & Responsive) */}
        <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
          {daysInSession.map((day) => {
            const status = getDayStatus(day);
            const isActive = day === activeDay;

            let tileClasses = "bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700/60 hover:bg-slate-200 dark:hover:bg-slate-700";
            
            if (status === 'reflection') {
              tileClasses = "bg-emerald-500 text-white font-bold shadow-md shadow-emerald-500/30 border border-emerald-400";
            } else if (status === 'full-actions') {
              tileClasses = "bg-emerald-600 text-white font-semibold border border-emerald-500";
            } else if (status === 'partial') {
              tileClasses = "bg-emerald-500/25 text-emerald-400 font-semibold border border-emerald-500/40";
            }

            if (isActive) {
              tileClasses += " ring-2 ring-emerald-400 ring-offset-2 ring-offset-slate-900 scale-105 z-10 font-black";
            }

            return (
              <button
                key={day}
                onClick={() => onSelectDay(day)}
                className={`h-8 sm:h-9 rounded-lg sm:rounded-xl flex flex-col items-center justify-center text-[10px] sm:text-xs transition-all duration-200 cursor-pointer ${tileClasses}`}
                title={`Hari Ke-${day} • ${status === 'reflection' ? 'Refleksi Selesai' : 'Klik untuk buka'}`}
              >
                <span className="leading-none">{day}</span>
                {status === 'reflection' && (
                  <span className="w-1 h-1 rounded-full bg-white mt-0.5" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Legend & Per-Session Summary (Replacing '0 dari 90' with 'X dari 30') */}
      <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between gap-2 text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2 sm:gap-2.5">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-sm bg-emerald-500" />
            <span>Selesai</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-sm bg-emerald-500/30 border border-emerald-500/40" />
            <span>Proses</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-sm bg-slate-800 border border-slate-700" />
            <span>Belum</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="font-black text-emerald-500 dark:text-emerald-400">
            {completedInSession} dari 30 Selesai
          </span>
          <span className="hidden sm:inline text-slate-500 text-[10px]">
            (Total {metrics?.totalReflectionsCompleted || 0}/90)
          </span>
        </div>
      </div>
    </div>
  );
}
