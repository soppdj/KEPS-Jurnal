import React from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  CheckCircle2, 
  Circle, 
  PenLine, 
  ArrowRight,
  Compass,
  Check
} from 'lucide-react';
import { PhaseBadge } from '../common/Badge';

export function TodayHeroCard({ 
  currentCase, 
  completedActions = [], 
  reflection, 
  onSelectDay, 
  onOpenJournal, 
  onOpenCaseDetail 
}) {
  if (!currentCase) return null;

  const totalActions = currentCase.actions?.length || 4;
  const checkedCount = completedActions.length;
  const isAllActionsDone = checkedCount >= totalActions;
  const hasReflection = reflection && (reflection.challenge || reflection.decision || reflection.insight);

  return (
    <div className="card-3d rounded-2xl sm:rounded-3xl border-2 border-emerald-500/40 dark:border-emerald-500/50 shadow-xl shadow-emerald-500/10 p-4 sm:p-5 relative overflow-hidden flex flex-col justify-between h-full">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div>
        {/* Top Header Tag & Day Navigator */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-800/80">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-black text-[11px] sm:text-xs tracking-wide">
              <Compass className="w-3.5 h-3.5" />
              <span>Kasus Hari Ini • Hari Ke-{currentCase.day}</span>
            </span>
            <PhaseBadge phaseNumber={currentCase.phase} size="sm" />
          </div>

          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl p-0.5 sm:p-1 border border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => onSelectDay(Math.max(1, currentCase.day - 1))}
              disabled={currentCase.day <= 1}
              className="p-1 rounded-lg text-slate-500 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 transition-all cursor-pointer"
              title="Hari Sebelumnya"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] sm:text-xs font-bold px-1.5 text-slate-600 dark:text-slate-300">
              {currentCase.day} / 90
            </span>
            <button
              type="button"
              onClick={() => onSelectDay(Math.min(90, currentCase.day + 1))}
              disabled={currentCase.day >= 90}
              className="p-1 rounded-lg text-slate-500 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 transition-all cursor-pointer"
              title="Hari Berikutnya"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Case Title & Narrative */}
        <div className="mt-3 space-y-1.5">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
            {currentCase.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
            {currentCase.narrative}
          </p>
        </div>

        {/* Leader Mindset Quote Box */}
        <div className="mt-3 p-3 rounded-xl sm:rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block text-[10px] sm:text-[11px] mb-0.5">
              Prinsip & Mindset Pemimpin
            </span>
            <p className="text-slate-700 dark:text-amber-100/90 italic font-medium leading-relaxed">
              "{currentCase.mindset}"
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons & Status */}
      <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400">
            {isAllActionsDone ? (
              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500" />
            ) : (
              <Circle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500" />
            )}
            <span>Aksi: <strong className="text-slate-900 dark:text-white">{checkedCount}</strong>/{totalActions}</span>
          </div>

          {hasReflection && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
              <Check className="w-3 h-3" />
              Refleksi Selesai
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => onOpenCaseDetail(currentCase)}
            className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all cursor-pointer"
          >
            Buka Kasus Lengkap
          </button>
          
          <button
            type="button"
            onClick={() => onOpenJournal(currentCase.day)}
            className="btn-3d-emerald flex-1 sm:flex-none px-3.5 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <PenLine className="w-3.5 h-3.5" />
            <span>{hasReflection ? 'Edit Refleksi' : 'Tulis Refleksi'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
