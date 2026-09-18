import React from 'react';
import { Target, Compass, ShieldCheck, Award } from 'lucide-react';
import { PHASES } from '../../data/leadershipStyles';

export function ProgressOverview({ metrics, onSelectPhase }) {
  const phaseStats = [
    {
      phase: PHASES[1],
      stats: metrics?.phase1 || { completed: 0, total: 30, percentage: 0 },
      icon: Compass,
      color: 'from-blue-500 to-indigo-600',
      bgGlow: 'bg-blue-500/10 border-blue-500/20'
    },
    {
      phase: PHASES[2],
      stats: metrics?.phase2 || { completed: 0, total: 30, percentage: 0 },
      icon: ShieldCheck,
      color: 'from-purple-500 to-pink-600',
      bgGlow: 'bg-purple-500/10 border-purple-500/20'
    },
    {
      phase: PHASES[3],
      stats: metrics?.phase3 || { completed: 0, total: 30, percentage: 0 },
      icon: Award,
      color: 'from-emerald-500 to-teal-600',
      bgGlow: 'bg-emerald-500/10 border-emerald-500/20'
    }
  ];

  const globalPercentage = metrics?.completionPercentage || 0;
  const completedDays = metrics?.completedDaysCount || 0;

  return (
    <div className="space-y-6">
      {/* Global Progress Bar Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg">
                Progres Global Kepemimpinan 90 Hari
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Transformasi Terencana Menjadi Kepala Sekolah Berdampak
              </p>
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {globalPercentage}%
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              ({completedDays}/90 Hari)
            </span>
          </div>
        </div>

        {/* Multi-segment progress bar */}
        <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden flex">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 transition-all duration-500 rounded-full"
            style={{ width: `${globalPercentage}%` }}
          />
        </div>
      </div>

      {/* 3 Phase Cards Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {phaseStats.map(({ phase, stats, icon: Icon, color, bgGlow }) => {
          return (
            <div
              key={phase.number}
              onClick={() => onSelectPhase && onSelectPhase(phase.number)}
              className={`p-5 rounded-2xl bg-white dark:bg-navy-900 border ${bgGlow} shadow-sm hover:shadow-md transition-all cursor-pointer group`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {phase.days}
                </span>
                <div className={`p-2 rounded-xl bg-gradient-to-tr ${color} text-white shadow-sm`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <h4 className="font-extrabold text-slate-900 dark:text-white text-base group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
                Fase {phase.number}: {phase.name}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                {phase.description}
              </p>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                <div className="flex items-center justify-between text-xs mb-1.5 font-semibold">
                  <span className="text-slate-600 dark:text-slate-300">
                    Capaian
                  </span>
                  <span className="text-slate-900 dark:text-white">
                    {stats.completed} / {stats.total} Hari ({stats.percentage}%)
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${color} transition-all duration-500 rounded-full`}
                    style={{ width: `${stats.percentage}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
