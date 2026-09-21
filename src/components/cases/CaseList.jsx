import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  CheckCircle2, 
  Circle, 
  BookOpen, 
  PenTool, 
  Compass,
  ArrowUpDown
} from 'lucide-react';
import { CASES_90 } from '../../data/cases90';
import { LEADERSHIP_STYLES, PHASES } from '../../data/leadershipStyles';
import { StyleBadge, PhaseBadge } from '../common/Badge';

export function CaseList({ 
  completedActions = {}, 
  reflections = {}, 
  onSelectDay, 
  onOpenJournal, 
  onOpenCaseDetail,
  initialSearchQuery = ''
}) {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);

  React.useEffect(() => {
    if (initialSearchQuery !== undefined) {
      setSearchQuery(initialSearchQuery);
    }
  }, [initialSearchQuery]);
  const [selectedPhase, setSelectedPhase] = useState('all'); // 'all' | '1' | '2' | '3'
  const [selectedStyle, setSelectedStyle] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'completed' | 'pending'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' | 'desc'

  const filteredCases = useMemo(() => {
    return CASES_90.filter((c) => {
      // Phase filter
      if (selectedPhase !== 'all' && c.phase !== Number(selectedPhase)) {
        return false;
      }
      // Style filter
      if (selectedStyle !== 'all' && c.style !== selectedStyle) {
        return false;
      }
      // Status filter
      const hasReflection = reflections[c.day] && (reflections[c.day].challenge || reflections[c.day].decision || reflections[c.day].insight);
      const isDone = hasReflection || (completedActions[c.day] && completedActions[c.day].length >= (c.actions?.length || 4));
      if (statusFilter === 'completed' && !isDone) return false;
      if (statusFilter === 'pending' && isDone) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = c.title.toLowerCase().includes(q);
        const matchesNarrative = c.narrative.toLowerCase().includes(q);
        const matchesMindset = c.mindset.toLowerCase().includes(q);
        const matchesDay = `hari ${c.day}`.includes(q) || `${c.day}` === q;
        return matchesTitle || matchesNarrative || matchesMindset || matchesDay;
      }

      return true;
    }).sort((a, b) => {
      return sortOrder === 'asc' ? a.day - b.day : b.day - a.day;
    });
  }, [searchQuery, selectedPhase, selectedStyle, statusFilter, sortOrder, completedActions, reflections]);

  return (
    <div className="space-y-6">
      {/* Header & Filter Bar */}
      <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            Eksplorasi 90 Kasus Kepemimpinan Situasional
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Telusuri panduan aksi dan refleksi terstruktur dari Hari 1 hingga Hari 90
          </p>
        </div>

        {/* Search bar & quick filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search text input */}
          <div className="relative col-span-1 sm:col-span-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari kasus, topik, atau kata kunci..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            />
          </div>

          {/* Style Filter */}
          <div>
            <select
              value={selectedStyle}
              onChange={(e) => setSelectedStyle(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            >
              <option value="all">Semua Gaya (9 Dimensi)</option>
              {Object.values(LEADERSHIP_STYLES).map(style => (
                <option key={style.id} value={style.id}>
                  {style.name}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="flex-1 px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            >
              <option value="all">Status: Semua</option>
              <option value="completed">Selesai Direfleksi</option>
              <option value="pending">Belum Selesai</option>
            </select>

            <button
              onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
              className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
              title={sortOrder === 'asc' ? 'Urutan: Hari 1 -> 90' : 'Urutan: Hari 90 -> 1'}
            >
              <ArrowUpDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Phase Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Fase:
          </span>
          <button
            onClick={() => setSelectedPhase('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedPhase === 'all'
                ? 'bg-navy-800 text-white dark:bg-slate-800 dark:text-emerald-400'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Semua Fase (90 Hari)
          </button>
          <button
            onClick={() => setSelectedPhase('1')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedPhase === '1'
                ? 'bg-blue-600 text-white'
                : 'text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40'
            }`}
          >
            Fase 1: Membangun Arah (1-30)
          </button>
          <button
            onClick={() => setSelectedPhase('2')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedPhase === '2'
                ? 'bg-purple-600 text-white'
                : 'text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/40'
            }`}
          >
            Fase 2: Membangun Kepercayaan (31-60)
          </button>
          <button
            onClick={() => setSelectedPhase('3')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedPhase === '3'
                ? 'bg-emerald-600 text-white'
                : 'text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'
            }`}
          >
            Fase 3: Membangun Kultur (61-90)
          </button>
        </div>
      </div>

      {/* Case Count Indicator */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1 font-medium">
        <span>Menampilkan <strong>{filteredCases.length}</strong> dari 90 kasus kepemimpinan</span>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="text-emerald-500 hover:underline"
          >
            Reset Pencarian
          </button>
        )}
      </div>

      {/* Cases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCases.map((c) => {
          const acts = completedActions[c.day] || [];
          const totalActs = c.actions?.length || 4;
          const isActDone = acts.length >= totalActs;
          const ref = reflections[c.day];
          const hasRef = ref && (ref.challenge || ref.decision || ref.insight);

          return (
            <div
              key={c.day}
              className="p-5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Card Top: Day & Badges */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-lg bg-navy-800 text-white dark:bg-slate-800 dark:text-emerald-400 font-extrabold text-xs tracking-wider">
                    HARI KE-{c.day}
                  </span>
                  <StyleBadge styleKey={c.style} size="xs" />
                </div>

                {/* Title & Narrative preview */}
                <h3 
                  onClick={() => onOpenCaseDetail(c)}
                  className="font-bold text-slate-900 dark:text-white text-base leading-snug group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {c.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                  {c.narrative}
                </p>

                {/* Mindset Quote Pill */}
                <div className="mt-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-300 italic line-clamp-2">
                  "{c.mindset}"
                </div>
              </div>

              {/* Bottom Actions & Status */}
              <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {hasRef ? (
                    <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Refleksi Selesai
                    </span>
                  ) : isActDone ? (
                    <span className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Aksi Tuntas
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-slate-400">
                      <Circle className="w-3.5 h-3.5" /> {acts.length}/{totalActs} Aksi
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onOpenCaseDetail(c)}
                    className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors"
                    title="Detail Kasus & Panduan"
                  >
                    <BookOpen className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      onSelectDay(c.day);
                      onOpenJournal(c.day);
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500 text-emerald-600 hover:text-slate-950 dark:text-emerald-400 font-semibold text-xs border border-emerald-500/20 transition-all"
                  >
                    <PenTool className="w-3.5 h-3.5" />
                    <span>Refleksi</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
