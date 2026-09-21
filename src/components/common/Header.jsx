import React from 'react';
import { 
  Flame, 
  Moon, 
  Sun, 
  BookOpen, 
  BookMarked,
  PenTool, 
  Compass, 
  FileText, 
  Settings, 
  LayoutDashboard,
  CheckCircle2,
  User
} from 'lucide-react';

export function Header({ 
  activeTab, 
  setActiveTab, 
  profile, 
  metrics, 
  isDarkMode, 
  toggleDarkMode 
}) {
  const navItems = [
    { id: 'dashboard', label: 'Beranda', icon: LayoutDashboard },
    { id: 'cases', label: 'Kasus', icon: BookOpen },
    { id: 'journal', label: 'Jurnal', icon: PenTool },
    { id: 'analytics', label: 'Analisis', icon: Compass },
    { id: 'reports', label: 'Laporan', icon: FileText },
    { id: 'settings', label: 'Pengaturan', icon: Settings }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-navy-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2 lg:gap-4">
          {/* Brand & School info with divider */}
          <div 
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group shrink-0 pr-3 sm:pr-4 lg:pr-6 border-r border-slate-200 dark:border-slate-800" 
            onClick={() => setActiveTab('dashboard')}
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden shadow-md shadow-navy-950/20 transition-all group-hover:scale-105 shrink-0 bg-navy-900 border border-emerald-500/20">
              <img src="/logo.png" alt="KEPS Jurnal Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm sm:text-base tracking-tight text-slate-900 dark:text-white whitespace-nowrap">
                  KEPS Jurnal
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  v.1.0
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate max-w-[130px] sm:max-w-[180px] lg:max-w-[220px]">
                {profile?.schoolName || 'SD Inspira Montessori'}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-2.5 lg:px-3 py-1.5 rounded-xl text-xs lg:text-sm font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-navy-900 text-white dark:bg-slate-800 dark:text-emerald-400 dark:ring-1 dark:ring-emerald-500/30 shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right actions: Streak, Theme Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Streak Counter Badge */}
            <div 
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 font-bold text-xs cursor-help shadow-sm whitespace-nowrap shrink-0"
              title={`Streak berjalan: ${metrics?.currentStreak || 0} hari berturut-turut!`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500 animate-pulse shrink-0" />
              <span>{metrics?.currentStreak || 0} Hari</span>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              aria-label="Ganti Tema"
              className="p-1.5 sm:p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors shrink-0"
              title={isDarkMode ? 'Beralih ke Tema Terang' : 'Beralih ke Tema Gelap'}
            >
              {isDarkMode ? <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />}
            </button>

            {/* Profile Avatar Thumbnail */}
            <button
              onClick={() => setActiveTab('settings')}
              className="flex items-center gap-1.5 p-0.5 rounded-full hover:ring-2 hover:ring-emerald-500/50 transition-all shrink-0"
              title={`Profil: ${profile?.principalName || 'Kepala Sekolah'}`}
            >
              {profile?.photoUrl ? (
                <img 
                  src={profile.photoUrl} 
                  alt={profile.principalName} 
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border-2 border-emerald-500 shadow-sm"
                />
              ) : (
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold text-xs">
                  {profile?.principalName ? profile.principalName.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
