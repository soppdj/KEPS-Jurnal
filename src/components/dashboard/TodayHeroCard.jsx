import React from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  CheckCircle2, 
  Circle, 
  PenLine, 
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { StyleBadge, PhaseBadge } from '../common/Badge';

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
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-900 via-navy-800 to-slate-900 border border-slate-700/50 text-white shadow-xl shadow-navy-950/20">
      {/* Decorative background glows */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"></div>

      <div className="relative p-6 sm:p-8">
        {/* Top bar: Day Navigation & Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-700/50">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-lg bg-emerald-500 text-slate-950 font-black text-xs sm:text-sm tracking-wider uppercase">
              HARI KE-{currentCase.day}
            </span>
            <PhaseBadge phaseNumber={currentCase.phase} size="sm" />
            <StyleBadge styleKey={currentCase.style} size="sm" />
          </div>

          {/* Quick prev/next day buttons */}
          <div className="flex items-center gap-1 bg-slate-800/80 rounded-xl p-1 border border-slate-700">
            <button
              onClick={() => onSelectDay(Math.max(1, currentCase.day - 1))}
              disabled={currentCase.day <= 1}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 disabled:opacity-30 transition-all"
              title="Hari Sebelumnya"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-semibold px-2 text-slate-300">
              {currentCase.day} / 90
            </span>
            <button
              onClick={() => onSelectDay(Math.min(90, currentCase.day + 1))}
              disabled={currentCase.day >= 90}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 disabled:opacity-30 transition-all"
              title="Hari Berikutnya"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Case Title & Narrative Snippet */}
        <div className="mt-6 space-y-3">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-white leading-tight">
            {currentCase.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed line-clamp-3">
            {currentCase.narrative}
          </p>
        </div>

        {/* Leader Mindset Quote Banner */}
        <div className="mt-5 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-0.5">
              Prinsip & Mindset Pemimpin
            </span>
            <p className="text-xs sm:text-sm text-amber-100/90 font-medium italic">
              "{currentCase.mindset}"
            </p>
          </div>
        </div>

        {/* Action checklist preview & Status pills */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-slate-300 font-medium">
              {isAllActionsDone ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <Circle className="w-4 h-4 text-amber-400" />
              )}
              <span>
                Aksi Tercentang: <strong className="text-white font-bold">{checkedCount}</strong>/{totalActions}
              </span>
            </div>

            {hasReflection && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <CheckCircle2 className="w-3 h-3" />
                Refleksi Selesai
              </span>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={() => onOpenCaseDetail(currentCase)}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold border border-slate-600 transition-all"
            >
              <BookOpen className="w-4 h-4 text-slate-400" />
              <span>Detail Kasus</span>
            </button>
            <button
              onClick={() => onOpenJournal(currentCase.day)}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-slate-950 text-xs sm:text-sm font-bold shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <PenLine className="w-4 h-4" />
              <span>{hasReflection ? 'Edit Refleksi Hari Ini' : 'Tulis Refleksi Hari Ini'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
