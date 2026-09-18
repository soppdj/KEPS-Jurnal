import React, { useState, useEffect } from 'react';
import { 
  Save, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  CheckCircle2, 
  Printer, 
  HelpCircle,
  Clock,
  Square,
  CheckSquare,
  Smile
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CASES_90 } from '../../data/cases90';
import { MOOD_LEVELS } from '../../data/defaultState';
import { StyleBadge, PhaseBadge } from '../common/Badge';
import { VoiceRecorder } from './VoiceRecorder';

export function ReflectionForm({ 
  activeDay = 1, 
  onSelectDay, 
  savedReflection = {}, 
  completedActions = [], 
  onToggleAction, 
  onSaveReflection,
  onExportDailyPdf 
}) {
  const currentCase = CASES_90.find(c => c.day === Number(activeDay)) || CASES_90[0];

  const [mood, setMood] = useState(savedReflection?.mood || 4);
  const [challenge, setChallenge] = useState(savedReflection?.challenge || '');
  const [decision, setDecision] = useState(savedReflection?.decision || '');
  const [insight, setInsight] = useState(savedReflection?.insight || '');
  const [activeVoiceTarget, setActiveVoiceTarget] = useState('challenge'); // 'challenge' | 'decision' | 'insight'
  const [saveStatus, setSaveStatus] = useState(''); // '' | 'saving' | 'saved'

  // Update local form state when switching active day
  useEffect(() => {
    setMood(savedReflection?.mood || 4);
    setChallenge(savedReflection?.challenge || '');
    setDecision(savedReflection?.decision || '');
    setInsight(savedReflection?.insight || '');
    setSaveStatus('');
  }, [activeDay, savedReflection]);

  // Handle voice text insertion into the currently selected target field
  const handleInsertVoiceText = (text) => {
    if (activeVoiceTarget === 'challenge') {
      setChallenge(prev => (prev ? prev + ' ' + text : text));
    } else if (activeVoiceTarget === 'decision') {
      setDecision(prev => (prev ? prev + ' ' + text : text));
    } else if (activeVoiceTarget === 'insight') {
      setInsight(prev => (prev ? prev + ' ' + text : text));
    }
  };

  const getTargetLabel = () => {
    if (activeVoiceTarget === 'challenge') return 'Tantangan';
    if (activeVoiceTarget === 'decision') return 'Keputusan & Aksi';
    return 'Pelajaran Utama';
  };

  const handleManualSave = () => {
    setSaveStatus('saving');
    
    const reflectionPayload = {
      mood,
      challenge,
      decision,
      insight,
      checklistCompleted: completedActions.length >= (currentCase.actions?.length || 4)
    };

    onSaveReflection(currentCase.day, reflectionPayload);

    // Trigger confetti celebration on milestone days (30, 60, 90) or every 10 days
    if ([10, 20, 30, 40, 50, 60, 70, 80, 90].includes(currentCase.day)) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    }

    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(''), 3000);
    }, 400);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Header & Day Navigation */}
      <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-3 py-1 rounded-lg bg-navy-800 text-white dark:bg-slate-800 dark:text-emerald-400 font-black text-xs sm:text-sm tracking-wider">
              HARI KE-{currentCase.day} DARI 90
            </span>
            <PhaseBadge phaseNumber={currentCase.phase} size="xs" />
            <StyleBadge styleKey={currentCase.style} size="xs" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            {currentCase.title}
          </h2>
        </div>

        {/* Day Selector Navigation */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onSelectDay(Math.max(1, currentCase.day - 1))}
            disabled={currentCase.day <= 1}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 transition-all"
            title="Hari Sebelumnya"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <select
            value={currentCase.day}
            onChange={(e) => onSelectDay(Number(e.target.value))}
            className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {CASES_90.map(c => (
              <option key={c.day} value={c.day}>
                Hari {c.day}: {c.title.substring(0, 32)}...
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => onSelectDay(Math.min(90, currentCase.day + 1))}
            disabled={currentCase.day >= 90}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 transition-all"
            title="Hari Berikutnya"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Case Mindset & Reflection Prompt Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block mb-0.5">
              Prinsip & Mindset Pemimpin
            </span>
            <p className="text-xs sm:text-sm text-slate-800 dark:text-amber-100 font-medium italic">
              "{currentCase.mindset}"
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-start gap-3">
          <HelpCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
          <div>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block mb-0.5">
              Fokus Refleksi Hari Ini
            </span>
            <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-blue-100">
              {currentCase.reflectionPrompt}
            </p>
          </div>
        </div>
      </div>

      {/* Concrete Action Checklist */}
      <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
            <span>Aksi Nyata Situasional Hari Ini</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              {completedActions.length} / {currentCase.actions?.length || 4} Tuntas
            </span>
          </h3>
          <span className="text-xs text-slate-400">Centang setiap aksi yang telah Anda jalankan</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
          {currentCase.actions?.map((act, idx) => {
            const isChecked = completedActions.includes(idx);
            return (
              <div
                key={idx}
                onClick={() => onToggleAction(currentCase.day, idx)}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-2.5 select-none ${
                  isChecked
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-slate-900 dark:text-emerald-100'
                    : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                <button type="button" className="shrink-0 mt-0.5">
                  {isChecked ? (
                    <CheckSquare className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-400" />
                  )}
                </button>
                <span className={`text-xs leading-relaxed ${isChecked ? 'line-through opacity-80' : ''}`}>
                  {act}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Voice-to-Text Bar with target selector */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Arahkan hasil suara ke kolom:
          </span>
          <div className="flex gap-1 bg-slate-200 dark:bg-slate-800 p-0.5 rounded-lg text-xs">
            <button
              type="button"
              onClick={() => setActiveVoiceTarget('challenge')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                activeVoiceTarget === 'challenge' 
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' 
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              1. Tantangan
            </button>
            <button
              type="button"
              onClick={() => setActiveVoiceTarget('decision')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                activeVoiceTarget === 'decision' 
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' 
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              2. Keputusan
            </button>
            <button
              type="button"
              onClick={() => setActiveVoiceTarget('insight')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                activeVoiceTarget === 'insight' 
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' 
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              3. Pelajaran
            </button>
          </div>
        </div>

        <VoiceRecorder 
          onInsertText={handleInsertVoiceText} 
          targetFieldLabel={getTargetLabel()} 
        />
      </div>

      {/* Structured Reflection Fields Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        {/* 1. Mood Pemimpin (1-5 Emoji Selector) */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
            1. Suasana Kebatinan / Mood Pemimpin Hari Ini
          </label>
          <div className="grid grid-cols-5 gap-2 sm:gap-3">
            {MOOD_LEVELS.map((m) => {
              const isSelected = mood === m.value;
              return (
                <button
                  key={m.value}
                  type="button"
                  onClick={() => setMood(m.value)}
                  className={`p-3 rounded-2xl border transition-all flex flex-col items-center text-center gap-1 ${
                    isSelected
                      ? `${m.color} ring-2 ring-emerald-500 shadow-sm font-bold scale-[1.03]`
                      : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                  }`}
                >
                  <span className="text-2xl sm:text-3xl">{m.emoji}</span>
                  <span className="text-[10px] sm:text-xs leading-tight line-clamp-2">
                    {m.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Tantangan Terbesar Hari Ini */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              2. Tantangan & Gesekan Terbesar Hari Ini
            </label>
            <button
              type="button"
              onClick={() => setActiveVoiceTarget('challenge')}
              className="text-[11px] text-emerald-500 hover:underline font-medium"
            >
              {activeVoiceTarget === 'challenge' ? '● Aktif untuk Dikte' : 'Pilih untuk Dikte'}
            </button>
          </div>
          <textarea
            rows={3}
            value={challenge}
            onChange={(e) => setChallenge(e.target.value)}
            onFocus={() => setActiveVoiceTarget('challenge')}
            placeholder="Apa kendala paling mendesak, resistensi staf, atau situasi tak terduga yang Anda hadapi hari ini?"
            className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed transition-all"
          />
        </div>

        {/* 3. Keputusan & Aksi Nyata yang Diambil */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              3. Keputusan & Aksi Nyata yang Anda Ambil
            </label>
            <button
              type="button"
              onClick={() => setActiveVoiceTarget('decision')}
              className="text-[11px] text-emerald-500 hover:underline font-medium"
            >
              {activeVoiceTarget === 'decision' ? '● Aktif untuk Dikte' : 'Pilih untuk Dikte'}
            </button>
          </div>
          <textarea
            rows={3}
            value={decision}
            onChange={(e) => setDecision(e.target.value)}
            onFocus={() => setActiveVoiceTarget('decision')}
            placeholder="Keputusan situasional apa yang Anda putuskan? Langkah taktis apa yang langsung dieksekusi di lapangan?"
            className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed transition-all"
          />
        </div>

        {/* 4. Pelajaran / Insight Utama */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              4. Pelajaran & Kebijaksanaan Utama (Leadership Insight)
            </label>
            <button
              type="button"
              onClick={() => setActiveVoiceTarget('insight')}
              className="text-[11px] text-emerald-500 hover:underline font-medium"
            >
              {activeVoiceTarget === 'insight' ? '● Aktif untuk Dikte' : 'Pilih untuk Dikte'}
            </button>
          </div>
          <textarea
            rows={3}
            value={insight}
            onChange={(e) => setInsight(e.target.value)}
            onFocus={() => setActiveVoiceTarget('insight')}
            placeholder="Hikmah apa yang Anda petik tentang karakter guru, dinamika murid, atau kematangan kepemimpinan Anda sendiri?"
            className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed transition-all"
          />
        </div>

        {/* Action Bottom Bar */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Clock className="w-4 h-4 text-slate-400" />
            {saveStatus === 'saved' ? (
              <span className="text-emerald-500 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Berhasil disimpan ke memori lokal
              </span>
            ) : saveStatus === 'saving' ? (
              <span className="text-blue-500">Menyimpan refleksi...</span>
            ) : (
              <span>Otomatis disinkronkan ke memori lokal & offline</span>
            )}
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => onExportDailyPdf && onExportDailyPdf(currentCase.day)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs sm:text-sm transition-all"
              title="Cetak Kartu PDF Hari Ini"
            >
              <Printer className="w-4 h-4 text-slate-400" />
              <span>Cetak PDF</span>
            </button>

            <button
              type="button"
              onClick={handleManualSave}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-xs sm:text-sm shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Refleksi Hari Ini</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
