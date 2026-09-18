import React, { useState } from 'react';
import { Flame, Calendar, CheckCircle2, Circle, ArrowRight } from 'lucide-react';
import { CASES_90 } from '../../data/cases90';
import { PHASES } from '../../data/leadershipStyles';

export function HabitHeatmap({ 
  reflections = {}, 
  completedActions = {}, 
  activeDay = 1, 
  onSelectDay,
  metrics 
}) {
  const [hoveredDay, setHoveredDay] = useState(null);

  const getDayStatus = (day) => {
    const ref = reflections[day];
    const acts = completedActions[day] || [];
    const targetCase = CASES_90.find(c => c.day === day);
    const totalActs = targetCase?.actions?.length || 4;

    const hasReflection = ref && (ref.challenge || ref.decision || ref.insight);
    const isAllActionsDone = acts.length >= totalActs;
    const isPartialActions = acts.length > 0;

    if (hasReflection) {
      return {
        level: 3,
        label: 'Refleksi Lengkap',
        bg: 'bg-emerald-500 hover:bg-emerald-400 text-slate-950',
        ring: 'ring-emerald-500'
      };
    }
    if (isAllActionsDone) {
      return {
        level: 2,
        label: 'Aksi Tuntas 100%',
        bg: 'bg-blue-500 hover:bg-blue-400 text-white',
        ring: 'ring-blue-500'
      };
    }
    if (isPartialActions) {
      return {
        level: 1,
        label: `Aksi Parsial (${acts.length}/${totalActs})`,
        bg: 'bg-blue-300 dark:bg-blue-900/60 hover:bg-blue-400 text-slate-900 dark:text-blue-200',
        ring: 'ring-blue-300'
      };
    }

    return {
      level: 0,
      label: 'Belum Dikerjakan',
      bg: 'bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400',
      ring: 'ring-slate-300'
    };
  };

  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
      {/* Header with Streak info & Legend */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-500" />
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg">
              Matriks Heatmap Kebiasaan 90 Hari
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Klik pada kotak hari mana saja untuk langsung melompat ke panduan & refleksinya
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-slate-200 dark:bg-slate-800"></span>
            <span>Belum</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-blue-300 dark:bg-blue-900"></span>
            <span>Parsial</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-blue-500"></span>
            <span>Aksi Tuntas</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-emerald-500"></span>
            <span>Refleksi Selesai</span>
          </div>
        </div>
      </div>

      {/* 3 Phase Grouped Grid */}
      <div className="space-y-6">
        {[1, 2, 3].map((phaseNum) => {
          const phase = PHASES[phaseNum];
          const startDay = (phaseNum - 1) * 30 + 1;
          const endDay = phaseNum * 30;
          const daysInPhase = Array.from({ length: 30 }, (_, i) => startDay + i);

          return (
            <div key={phaseNum} className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-400">
                <span className="uppercase tracking-wider">
                  Fase {phaseNum}: {phase.name} (Hari {startDay} - {endDay})
                </span>
                <span className="text-[11px] font-medium text-slate-400">
                  {phase.description}
                </span>
              </div>

              {/* Grid 10 columns x 3 rows = 30 days per phase */}
              <div className="grid grid-cols-6 sm:grid-cols-10 gap-2">
                {daysInPhase.map((day) => {
                  const status = getDayStatus(day);
                  const isCurrent = day === activeDay;
                  const targetCase = CASES_90.find(c => c.day === day);

                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => onSelectDay && onSelectDay(day)}
                      onMouseEnter={() => setHoveredDay({ day, case: targetCase, status })}
                      onMouseLeave={() => setHoveredDay(null)}
                      className={`h-10 sm:h-11 rounded-xl flex flex-col items-center justify-center font-bold text-xs transition-all relative group ${
                        status.bg
                      } ${isCurrent ? 'ring-2 ring-emerald-500 ring-offset-2 dark:ring-offset-navy-900 scale-105 z-10' : ''}`}
                    >
                      <span className="text-[11px] sm:text-xs">{day}</span>
                      {status.level === 3 && (
                        <span className="w-1 h-1 rounded-full bg-slate-900 dark:bg-emerald-950 mt-0.5"></span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Hovered Day Preview Drawer / Banner */}
      {hoveredDay && (
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 animate-in fade-in duration-150 flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="font-extrabold text-xs px-2 py-0.5 rounded bg-navy-800 text-white dark:bg-slate-700">
                Hari {hoveredDay.day}
              </span>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                ● {hoveredDay.status.label}
              </span>
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate max-w-md">
              {hoveredDay.case?.title}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 italic line-clamp-1">
              "{hoveredDay.case?.mindset}"
            </p>
          </div>

          <button
            type="button"
            onClick={() => onSelectDay && onSelectDay(hoveredDay.day)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs shrink-0 transition-all shadow-sm"
          >
            <span>Buka Hari Ini</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
