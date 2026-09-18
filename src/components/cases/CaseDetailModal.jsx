import React from 'react';
import { 
  CheckSquare, 
  Square, 
  Sparkles, 
  HelpCircle, 
  PenLine, 
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { StyleBadge, PhaseBadge } from '../common/Badge';

export function CaseDetailModal({ 
  isOpen, 
  onClose, 
  caseData, 
  completedActions = [], 
  onToggleAction, 
  onOpenJournal 
}) {
  if (!caseData) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-lg bg-navy-800 text-white dark:bg-slate-800 dark:text-emerald-400 font-black text-xs">
            HARI KE-{caseData.day}
          </span>
          <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate">
            {caseData.title}
          </span>
        </div>
      }
      maxWidth="max-w-3xl"
    >
      <div className="space-y-6">
        {/* Badges bar */}
        <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
          <PhaseBadge phaseNumber={caseData.phase} size="sm" />
          <StyleBadge styleKey={caseData.style} size="sm" />
        </div>

        {/* Situation Narrative */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Situasi & Narasi Lapangan
          </h4>
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
            {caseData.narrative}
          </p>
        </div>

        {/* Leader Mindset Banner */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block mb-1">
              Prinsip & Mindset Pemimpin
            </span>
            <p className="text-sm text-slate-800 dark:text-amber-100 font-medium italic">
              "{caseData.mindset}"
            </p>
          </div>
        </div>

        {/* Concrete Action Checklist */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
            <span>Daftar Aksi Konkret Hari Ini</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
              {completedActions.length} / {caseData.actions?.length || 4} Selesai
            </span>
          </h4>
          <div className="space-y-2.5">
            {caseData.actions?.map((action, idx) => {
              const isChecked = completedActions.includes(idx);
              return (
                <div
                  key={idx}
                  onClick={() => onToggleAction && onToggleAction(caseData.day, idx)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                    isChecked
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-slate-900 dark:text-emerald-100'
                      : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                  }`}
                >
                  <button type="button" className="shrink-0 mt-0.5">
                    {isChecked ? (
                      <CheckSquare className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <Square className="w-5 h-5 text-slate-400" />
                    )}
                  </button>
                  <span className={`text-xs sm:text-sm leading-relaxed ${isChecked ? 'line-through opacity-80' : ''}`}>
                    {action}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Reflection Prompt Box */}
        <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-start gap-3">
          <HelpCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
          <div>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block mb-1">
              Pertanyaan Refleksi Mandiri
            </span>
            <p className="text-sm font-semibold text-slate-800 dark:text-blue-100">
              {caseData.reflectionPrompt}
            </p>
          </div>
        </div>

        {/* Modal Footer actions */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Tutup
          </button>
          <button
            onClick={() => {
              onClose();
              onOpenJournal(caseData.day);
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs sm:text-sm shadow-md shadow-emerald-500/20 transition-all"
          >
            <PenLine className="w-4 h-4" />
            <span>Tulis Jurnal Refleksi</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Modal>
  );
}
