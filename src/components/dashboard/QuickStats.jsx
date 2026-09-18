import React from 'react';
import { Flame, Smile, PenTool, Award } from 'lucide-react';
import { MOOD_LEVELS } from '../../data/defaultState';

export function QuickStats({ metrics, activeDay = 1 }) {
  const avgMoodNum = parseFloat(metrics?.averageMood || '3.0');
  const moodObj = MOOD_LEVELS.find(m => m.value === Math.round(avgMoodNum)) || MOOD_LEVELS[2];

  // Next milestone calculation
  let nextMilestone = 30;
  let milestoneTitle = 'Evaluasi Fase 1 (30 Hari)';
  if (activeDay > 60) {
    nextMilestone = 90;
    milestoneTitle = 'Pengukuhan Paripurna (90 Hari)';
  } else if (activeDay > 30) {
    nextMilestone = 60;
    milestoneTitle = 'Evaluasi Fase 2 (60 Hari)';
  }
  const daysLeft = Math.max(0, nextMilestone - activeDay);

  const stats = [
    {
      title: 'Streak Kepemimpinan',
      value: `${metrics?.currentStreak || 0} Hari`,
      sub: `Rekor tertinggi: ${metrics?.longestStreak || 0} hari`,
      icon: Flame,
      color: 'text-amber-500 bg-amber-500/10 border-amber-500/20'
    },
    {
      title: 'Suasana Kebatinan',
      value: `${moodObj.emoji} ${metrics?.averageMood || '3.0'}/5`,
      sub: moodObj.label,
      icon: Smile,
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20'
    },
    {
      title: 'Refleksi Tersimpan',
      value: `${metrics?.totalReflections || 0} Lembar`,
      sub: 'Jurnal refleksi terisi',
      icon: PenTool,
      color: 'text-blue-500 bg-blue-500/10 border-blue-500/20'
    },
    {
      title: 'Target Terdekat',
      value: `${daysLeft} Hari Lagi`,
      sub: milestoneTitle,
      icon: Award,
      color: 'text-purple-500 bg-purple-500/10 border-purple-500/20'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div 
            key={idx}
            className="p-5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 truncate max-w-[130px]">
                {item.title}
              </span>
              <div className={`p-2 rounded-xl border ${item.color}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                {item.value}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate font-medium">
                {item.sub}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
