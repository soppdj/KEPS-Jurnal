import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Printer, 
  Calendar, 
  Award, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck,
  Compass,
  AlertCircle
} from 'lucide-react';
import { CASES_90 } from '../../data/cases90';
import { LEADERSHIP_STYLES, PHASES } from '../../data/leadershipStyles';
import { MOOD_LEVELS } from '../../data/defaultState';
import { pdfService } from '../../services/pdfGenerator';

export function ReportExporter({ 
  profile, 
  reflections = {}, 
  completedActions = {}, 
  metrics, 
  radarData, 
  activeDay = 1 
}) {
  const [reportType, setReportType] = useState('milestone'); // 'daily' | 'milestone'
  const [selectedDay, setSelectedDay] = useState(activeDay);
  const [selectedMilestone, setSelectedMilestone] = useState(30); // 30 | 60 | 90
  const [isGenerating, setIsGenerating] = useState(false);
  const [exportMessage, setExportMessage] = useState('');

  const currentCase = CASES_90.find(c => c.day === Number(selectedDay)) || CASES_90[0];
  const currentReflection = reflections[selectedDay] || {};
  const currentActions = completedActions[selectedDay] || [];
  const currentMoodObj = MOOD_LEVELS.find(m => m.value === currentReflection.mood) || MOOD_LEVELS[2];

  // Milestone phase metadata
  const milestonePhase = selectedMilestone === 30 ? PHASES[1] : selectedMilestone === 60 ? PHASES[2] : PHASES[3];
  const milestoneStart = selectedMilestone === 30 ? 1 : selectedMilestone === 60 ? 31 : 61;
  const milestoneEnd = selectedMilestone;
  const milestoneDays = Array.from({ length: 30 }, (_, i) => milestoneStart + i);

  // Filter completed cases in this milestone
  const milestoneCompletedCases = CASES_90.filter(c => {
    return c.day >= milestoneStart && c.day <= milestoneEnd && 
      (reflections[c.day] || (completedActions[c.day] && completedActions[c.day].length > 0));
  });

  const handleDownloadPdf = async () => {
    setIsGenerating(true);
    setExportMessage('Menyiapkan dokumen portofolio eksekutif...');

    const elementId = reportType === 'daily' ? 'keps-daily-pdf-template' : 'keps-milestone-pdf-template';
    const filename = reportType === 'daily'
      ? `KEPS_Refleksi_Hari_${selectedDay}_${profile.schoolName.replace(/\s+/g, '_')}.pdf`
      : `KEPS_Laporan_Evaluasi_${selectedMilestone}_Hari_${profile.schoolName.replace(/\s+/g, '_')}.pdf`;

    try {
      await pdfService.exportElementToPdf(elementId, filename);
      setExportMessage('Berhasil diunduh! Dokumen siap dicetak atau dilaporkan.');
      setTimeout(() => setExportMessage(''), 4000);
    } catch (err) {
      console.error(err);
      setExportMessage('Gagal membuat PDF otomatis. Mengalihkan ke jendela Cetak (Print)...');
      window.print();
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Configuration & Selection Panel */}
      <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-6 h-6 text-emerald-500" />
            <span>Ekspor Portofolio Kepemimpinan (Cetak PDF)</span>
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Cetak dokumen portofolio akuntabilitas kepemimpinan resmi dan lembar refleksi harian
          </p>
        </div>

        {/* Report Type Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <button
            type="button"
            onClick={() => setReportType('daily')}
            className={`p-4 rounded-2xl border text-left transition-all ${
              reportType === 'daily'
                ? 'bg-emerald-500/10 border-emerald-500 text-slate-900 dark:text-white ring-1 ring-emerald-500'
                : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300'
            }`}
          >
            <div className="font-extrabold text-sm flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-500" />
              <span>1. Kartu Refleksi Harian (Single Day Card)</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Lembar catatan situasional 1 hari: tantangan, keputusan taktis, dan insight kepemimpinan.
            </p>
          </button>

          <button
            type="button"
            onClick={() => setReportType('milestone')}
            className={`p-4 rounded-2xl border text-left transition-all ${
              reportType === 'milestone'
                ? 'bg-blue-500/10 border-blue-500 text-slate-900 dark:text-white ring-1 ring-blue-500'
                : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300'
            }`}
          >
            <div className="font-extrabold text-sm flex items-center gap-2">
              <Award className="w-4 h-4 text-blue-500" />
              <span>2. Laporan Evaluasi Milestone (30 / 60 / 90 Hari)</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Laporan eksekutif lengkap per fase dengan ringkasan data, radar gaya kepemimpinan, dan pengesahan Kepala Sekolah.
            </p>
          </button>
        </div>

        {/* Dynamic Selector Dropdowns */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-100 dark:border-slate-800">
          {reportType === 'daily' ? (
            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Pilih Hari Refleksi:
              </label>
              <select
                value={selectedDay}
                onChange={(e) => setSelectedDay(Number(e.target.value))}
                className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {CASES_90.map(c => (
                  <option key={c.day} value={c.day}>
                    Hari ke-{c.day}: {c.title.substring(0, 36)}...
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Pilih Milestone Evaluasi:
              </label>
              <div className="flex gap-2">
                {[30, 60, 90].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setSelectedMilestone(m)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      selectedMilestone === m
                        ? 'bg-navy-800 text-white dark:bg-slate-700 dark:text-emerald-400 ring-2 ring-emerald-500'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                    }`}
                  >
                    {m} Hari {m === 30 ? '(Fase 1)' : m === 60 ? '(Fase 2)' : '(Fase 3)'}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Action Download / Print Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs sm:text-sm font-semibold transition-all"
              title="Cetak Langsung (Ctrl+P)"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={isGenerating}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs sm:text-sm font-extrabold shadow-lg shadow-emerald-500/20 disabled:opacity-50 transition-all hover:scale-105 active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>{isGenerating ? 'Memproses PDF...' : 'Unduh Dokumen PDF'}</span>
            </button>
          </div>
        </div>

        {exportMessage && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{exportMessage}</span>
          </div>
        )}
      </div>

      {/* LIVE PREVIEW AREA (Formatted for A4 Printable Document) */}
      <div className="border border-slate-200 dark:border-slate-800 rounded-3xl p-4 sm:p-8 bg-slate-100 dark:bg-navy-950 overflow-x-auto">
        <div className="text-center text-xs font-semibold text-slate-400 mb-4 uppercase tracking-wider">
          Pratinjau Dokumen Portofolio Resmi (Format A4)
        </div>

        {/* 1. DAILY CARD TEMPLATE */}
        {reportType === 'daily' && (
          <div 
            id="keps-daily-pdf-template"
            className="w-full max-w-[210mm] mx-auto bg-white text-slate-900 p-8 sm:p-12 shadow-2xl rounded-xl border border-slate-300 font-sans"
            style={{ minHeight: '297mm' }}
          >
            {/* Official Header */}
            <div className="border-b-4 border-double border-slate-900 pb-4 mb-6 text-center">
              <h1 className="text-xl font-extrabold uppercase text-slate-950 tracking-tight">
                {profile?.schoolName || 'TK Inspira Montessori'}
              </h1>
              {profile?.schoolAddress && (
                <p className="text-xs text-slate-600 mt-1 font-medium">
                  {profile.schoolAddress}
                </p>
              )}
              <p className="text-[11px] text-slate-500 mt-0.5 italic">
                Jurnal Kepemimpinan Situasional 90 Hari Kepala Sekolah Berdampak
              </p>
            </div>

            {/* Document Title Banner */}
            <div className="bg-slate-100 p-4 sm:p-5 rounded-xl border border-slate-300 mb-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block mb-1">
                LEMBAR REFLEKSI SITUASIONAL HARIAN
              </span>
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm sm:text-base font-black uppercase tracking-wide text-slate-900">
                  HARI KE-{currentCase.day}
                </span>
                <span className="text-xs sm:text-sm font-bold px-3.5 py-1 rounded-full bg-slate-900 text-white whitespace-nowrap shrink-0">
                  Fase {currentCase.phase}: {currentCase.phaseName}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-950 mt-1.5 tracking-tight leading-snug">
                {currentCase.title}
              </h3>
            </div>

            {/* Principal Identity Table */}
            <div className="border-b border-slate-200 pb-4 mb-6">
              <div className="flex items-start gap-4">
                {profile?.photoUrl && (
                  <div className="shrink-0">
                    <img 
                      src={profile.photoUrl} 
                      alt={profile.principalName} 
                      className="w-16 h-20 object-cover rounded-lg border border-slate-300 shadow-sm"
                    />
                  </div>
                )}
                <div className="flex-1 grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 block">Nama Kepala Sekolah:</span>
                    <strong className="text-slate-900 text-sm">{profile?.principalName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">NIP:</span>
                    <strong className="text-slate-900 text-sm">{profile?.nip || '-'}</strong>
                  </div>
                  {profile?.schoolAddress && (
                    <div className="col-span-2">
                      <span className="text-slate-500 block">Alamat Sekolah:</span>
                      <strong className="text-slate-900">{profile.schoolAddress}</strong>
                    </div>
                  )}
                  <div>
                    <span className="text-slate-500 block">Gaya Kepemimpinan Kontekstual:</span>
                    <strong className="text-indigo-900 font-bold uppercase">
                      {LEADERSHIP_STYLES[currentCase.style?.toUpperCase()]?.name || currentCase.style}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Suasana Kebatinan / Mood:</span>
                    <strong className="text-slate-900">
                      {currentMoodObj.emoji} {currentMoodObj.label} (Skor {currentMoodObj.value}/5)
                    </strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Situational Narrative & Mindset */}
            <div className="mb-6 space-y-3">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  A. Situasi Lapangan
                </h4>
                <p className="text-xs leading-relaxed text-slate-800 bg-slate-50 p-3 rounded-lg border border-slate-200">
                  {currentCase.narrative}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  B. Prinsip & Mindset Pemimpin
                </h4>
                <p className="text-xs italic font-medium text-slate-800 bg-amber-50 p-3 rounded-lg border border-amber-200">
                  "{currentCase.mindset}"
                </p>
              </div>
            </div>

            {/* Actions Checklist Executed */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                C. Aksi Nyata Terlaksana ({currentActions.length}/{currentCase.actions?.length || 4})
              </h4>
              <div className="space-y-1.5 text-xs text-slate-800">
                {currentCase.actions?.map((act, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="font-bold text-slate-700">[{currentActions.includes(i) ? '✔' : ' '}]</span>
                    <span>{act}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Structured Reflection Content */}
            <div className="space-y-4 mb-8">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  D. Tantangan Terbesar Hari Ini
                </h4>
                <p className="text-xs leading-relaxed text-slate-900 p-3 rounded-lg border border-slate-200 min-h-[50px] whitespace-pre-wrap">
                  {currentReflection.challenge || 'Belum ada catatan tantangan.'}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  E. Keputusan & Aksi Nyata yang Diambil
                </h4>
                <p className="text-xs leading-relaxed text-slate-900 p-3 rounded-lg border border-slate-200 min-h-[50px] whitespace-pre-wrap">
                  {currentReflection.decision || 'Belum ada catatan keputusan.'}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  F. Pelajaran / Insight Utama
                </h4>
                <p className="text-xs leading-relaxed text-slate-900 p-3 rounded-lg border border-slate-200 min-h-[50px] whitespace-pre-wrap">
                  {currentReflection.insight || 'Belum ada catatan pelajaran.'}
                </p>
              </div>
            </div>

            {/* Signatures */}
            <div className="pt-8 border-t border-slate-300 text-xs flex justify-end">
              <div className="text-center w-64">
                <p className="text-slate-500">
                  Bandung, {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
                <p className="font-bold text-slate-800">Kepala Sekolah</p>
                <div className="h-16"></div>
                <p className="font-bold underline text-slate-900">{profile?.principalName}</p>
                <p className="text-slate-500">NIP. {profile?.nip || '-'}</p>
              </div>
            </div>
          </div>
        )}

        {/* 2. MILESTONE REPORT TEMPLATE */}
        {reportType === 'milestone' && (
          <div 
            id="keps-milestone-pdf-template"
            className="w-full max-w-[210mm] mx-auto bg-white text-slate-900 p-8 sm:p-12 shadow-2xl rounded-xl border border-slate-300 font-sans"
            style={{ minHeight: '297mm' }}
          >
            {/* Kop Laporan */}
            <div className="border-b-4 border-double border-slate-900 pb-4 mb-6 text-center">
              <h1 className="text-xl font-black uppercase text-slate-950 tracking-tight">
                {profile?.schoolName || 'TK Inspira Montessori'}
              </h1>
              {profile?.schoolAddress && (
                <p className="text-xs text-slate-600 mt-1 font-medium">
                  {profile.schoolAddress}
                </p>
              )}
              <p className="text-[11px] text-slate-500 mt-0.5 italic">
                Laporan Eksekutif Capaian 90 Hari Kepemimpinan Situasional Kepala Sekolah Berdampak
              </p>
            </div>

            {/* Document Header */}
            <div className="bg-navy-900 text-white p-5 rounded-2xl mb-6 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 block">
                  LAPORAN EVALUASI MILESTONE {selectedMilestone} HARI
                </span>
                <h3 className="text-lg font-black mt-0.5">
                  Fase {milestonePhase.number}: {milestonePhase.name}
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Cakupan: Hari ke-{milestoneStart} hingga Hari ke-{milestoneEnd} ({milestoneCompletedCases.length}/30 Hari Selesai Direfleksi)
                </p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-emerald-400">
                  {Math.round((milestoneCompletedCases.length / 30) * 100)}%
                </span>
                <span className="block text-[10px] text-slate-400 uppercase">Capaian Fase</span>
              </div>
            </div>

            {/* Principal Identity Grid */}
            <div className="border-b border-slate-200 pb-4 mb-6">
              <div className="flex items-start gap-4">
                {profile?.photoUrl && (
                  <div className="shrink-0">
                    <img 
                      src={profile.photoUrl} 
                      alt={profile.principalName} 
                      className="w-16 h-20 object-cover rounded-lg border border-slate-300 shadow-sm"
                    />
                  </div>
                )}
                <div className="flex-1 grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 block">Kepala Sekolah:</span>
                    <strong className="text-slate-900 text-sm">{profile?.principalName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">NIP:</span>
                    <strong className="text-slate-900 text-sm">{profile?.nip || '-'}</strong>
                  </div>
                  {profile?.schoolAddress && (
                    <div className="col-span-2">
                      <span className="text-slate-500 block">Alamat Sekolah:</span>
                      <strong className="text-slate-900">{profile.schoolAddress}</strong>
                    </div>
                  )}
                  <div>
                    <span className="text-slate-500 block">Tanggal Pelaksanaan:</span>
                    <strong className="text-slate-900">Mulai {profile?.startDate} s.d. Sekarang</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Rata-rata Suasana Kebatinan:</span>
                    <strong className="text-slate-900">{metrics?.averageMood || '3.5'} / 5.0 (Kondusif)</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Executive Summary Narrative */}
            <div className="mb-6 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                1. Ringkasan Eksekutif Transformasi
              </h4>
              <p className="text-xs leading-relaxed text-slate-800 bg-slate-50 p-4 rounded-xl border border-slate-200">
                Selama periode {milestonePhase.name}, kepemimpinan sekolah difokuskan pada penguatan fondasi arah, 
                penataan standar mutu awal, transparansi pengelolaan anggaran BOS, serta pembiasaan disiplin dan 
                keamanan psikologis bagi dewan guru. Dari total 30 situasi kepemimpinan terencana, sebanyak 
                <strong> {milestoneCompletedCases.length} hari</strong> telah tereksekusi dengan aksi konkret dan catatan refleksi mendalam.
              </p>
            </div>

            {/* Leadership Style Radar Summary Table */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                2. Distribusi Profil Gaya Kepemimpinan
              </h4>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {Object.values(LEADERSHIP_STYLES).slice(0, 9).map((style, idx) => {
                  const score = radarData?.values?.[idx] || 0;
                  return (
                    <div key={style.id} className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between">
                      <span className="font-semibold text-slate-800 truncate">{style.name}</span>
                      <span className="font-mono font-bold text-slate-900">{score}%</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 5 Key Strategic Actions & Decisions Highlights */}
            <div className="mb-8">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                3. Keputusan Situasional Strategis Terpilih
              </h4>
              <div className="space-y-2 text-xs">
                {milestoneCompletedCases.slice(0, 4).map((c, i) => {
                  const ref = reflections[c.day];
                  return (
                    <div key={i} className="p-3 rounded-lg border border-slate-200">
                      <div className="flex items-center justify-between font-bold text-slate-900 mb-1">
                        <span>Hari {c.day}: {c.title}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 uppercase text-slate-600">
                          {c.style}
                        </span>
                      </div>
                      <p className="text-slate-700 italic">
                        "{ref?.decision || c.mindset}"
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Signatures */}
            <div className="pt-8 border-t border-slate-300 text-xs flex justify-end">
              <div className="text-center w-64">
                <p className="text-slate-500">
                  Bandung, {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
                <p className="font-bold text-slate-800">Kepala Sekolah Berdampak</p>
                <div className="h-16"></div>
                <p className="font-bold underline text-slate-900">{profile?.principalName}</p>
                <p className="text-slate-500">NIP. {profile?.nip || '-'}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
