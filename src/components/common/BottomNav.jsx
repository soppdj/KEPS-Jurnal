import React from 'react';
import { LayoutDashboard, BookOpen, PenTool, Compass, FileText, Settings } from 'lucide-react';

export function BottomNav({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'dashboard', label: 'Beranda', icon: LayoutDashboard },
    { id: 'cases', label: 'Kasus', icon: BookOpen },
    { id: 'journal', label: 'Jurnal', icon: PenTool, highlight: true },
    { id: 'analytics', label: 'Analisis', icon: Compass },
    { id: 'reports', label: 'Laporan', icon: FileText },
    { id: 'settings', label: 'Pengaturan', icon: Settings }
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-navy-950/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 pb-safe">
      <div className="grid grid-cols-6 h-16 max-w-lg mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center transition-all relative ${
                isActive
                  ? 'text-emerald-500 dark:text-emerald-400 font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              {tab.highlight && (
                <span className="absolute -top-1 w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
              )}
              <div className={`p-1 rounded-xl transition-all ${
                isActive ? 'bg-emerald-500/10 dark:bg-emerald-500/20' : ''
              }`}>
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight font-medium">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
