import React, { useState, useEffect, useMemo } from 'react';
import { storage } from './services/storage';
import { CASES_90 } from './data/cases90';
import { notificationService } from './services/notifications';
import { DEFAULT_SUBSCRIPTION } from './data/defaultState';

// Common Components
import { Header } from './components/common/Header';
import { BottomNav } from './components/common/BottomNav';
import { OpeningScreen } from './components/common/OpeningScreen';
import { TrialLockModal } from './components/common/TrialLockModal';

// Dashboard Components
import { DashboardTopCards } from './components/dashboard/DashboardTopCards';
import { TodayHeroCard } from './components/dashboard/TodayHeroCard';
import { ProgressTrackingCalendar } from './components/dashboard/ProgressTrackingCalendar';

// Case Explorer Components
import { CaseList } from './components/cases/CaseList';
import { CaseDetailModal } from './components/cases/CaseDetailModal';

// Journal & Voice Components
import { ReflectionForm } from './components/journal/ReflectionForm';

// Analytics & Visualizations
import { LeadershipRadar } from './components/analytics/LeadershipRadar';

// Reports & PDF
import { ReportExporter } from './components/reports/ReportExporter';

// Settings & Backup
import { ProfileSettings } from './components/settings/ProfileSettings';

export default function App() {
  const [userData, setUserData] = useState(() => storage.loadData());
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'cases' | 'journal' | 'analytics' | 'reports' | 'settings'
  const [activeDay, setActiveDay] = useState(() => userData.activeDay || 3);
  const [selectedCaseModal, setSelectedCaseModal] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showOpening, setShowOpening] = useState(() => {
    try {
      return localStorage.getItem('keps_skip_opening') !== 'true';
    } catch {
      return true;
    }
  });

  const [isDarkMode, setIsDarkMode] = useState(() => {
    return userData.profile?.theme === 'light' ? false : true;
  });

  // Keep state in sync with localStorage updates
  useEffect(() => {
    const handleDataUpdate = (event) => {
      if (event.detail) {
        setUserData(event.detail);
      }
    };
    window.addEventListener('keps-data-updated', handleDataUpdate);
    return () => window.removeEventListener('keps-data-updated', handleDataUpdate);
  }, []);

  // Sync dark mode class on document element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Initialize background reminder scheduler
  useEffect(() => {
    notificationService.initDailyScheduler();
  }, []);

  // Computed metrics & radar data
  const metrics = useMemo(() => storage.calculateMetrics(userData), [userData]);
  const radarData = useMemo(() => storage.calculateLeadershipRadar(userData), [userData]);

  const currentCase = useMemo(() => {
    return CASES_90.find(c => c.day === Number(activeDay)) || CASES_90[0];
  }, [activeDay]);

  const currentActions = useMemo(() => {
    return userData.completedActions[activeDay] || [];
  }, [userData.completedActions, activeDay]);

  const currentReflection = useMemo(() => {
    return userData.reflections[activeDay] || null;
  }, [userData.reflections, activeDay]);

  // Check if trial has expired (Automatic Lockout)
  const isTrialExpired = useMemo(() => {
    const sub = userData.subscription;
    if (!sub) return true;
    // If user has not claimed any verified token, they are strictly under 3-day trial
    if (!sub.lastTokenUsed || !sub.tokensHistory || sub.tokensHistory.length === 0) {
      if (sub.status === 'expired') return true;
      if (!sub.validUntil) return true;
      return new Date() > new Date(sub.validUntil);
    }
    // If user has redeemed a token, check standard token expiration
    if (sub.status === 'expired' || (sub.validUntil && new Date() > new Date(sub.validUntil))) {
      return true;
    }
    return false;
  }, [userData.subscription]);

  // Handlers
  const handleToggleDarkMode = () => {
    const nextMode = !isDarkMode;
    setIsDarkMode(nextMode);
    const updated = {
      ...userData,
      profile: {
        ...userData.profile,
        theme: nextMode ? 'dark' : 'light'
      }
    };
    storage.saveData(updated);
  };

  const handleSelectDay = (day) => {
    setActiveDay(Number(day));
    const updated = { ...userData, activeDay: Number(day) };
    storage.saveData(updated);
  };

  const handleOpenJournal = (day) => {
    if (day) handleSelectDay(day);
    setActiveTab('journal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleAction = (day, actionIndex) => {
    const updated = storage.toggleAction(day, actionIndex);
    setUserData(updated);
  };

  const handleSaveReflection = (day, reflectionPayload) => {
    const updated = storage.saveReflection(day, reflectionPayload);
    setUserData(updated);
  };

  const handleSaveProfile = (newProfile) => {
    const updated = {
      ...userData,
      profile: { ...userData.profile, ...newProfile }
    };
    storage.saveData(updated);
    setUserData(updated);
  };

  const handleSaveSettings = (newSettings) => {
    const updated = {
      ...userData,
      settings: { ...userData.settings, ...newSettings }
    };
    storage.saveData(updated);
    setUserData(updated);
  };

  const handleUpdateSubscription = (newSubscription) => {
    const updated = {
      ...userData,
      subscription: newSubscription
    };
    storage.saveData(updated);
    setUserData(updated);
  };

  const handleResetData = () => {
    const reset = storage.resetData();
    setUserData(reset);
    setActiveDay(1);
    setActiveTab('dashboard');
  };

  const handleExportDailyPdf = (day) => {
    handleSelectDay(day);
    setActiveTab('reports');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-950 text-slate-900 dark:text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-white transition-colors">
      {/* 1. Opening 3D Showcase (Before Entering Dashboard) */}
      {showOpening && (
        <OpeningScreen onEnterApp={() => setShowOpening(false)} />
      )}

      {/* 2. Strict Paywall Lock (When Trial Expired) */}
      {isTrialExpired && (
        <TrialLockModal
          subscription={userData.subscription || DEFAULT_SUBSCRIPTION}
          onSubscriptionUpdated={handleUpdateSubscription}
        />
      )}

      {/* Top Desktop & Mobile Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        profile={userData.profile}
        metrics={metrics}
        isDarkMode={isDarkMode}
        toggleDarkMode={handleToggleDarkMode}
        onOpenOpeningScreen={() => setShowOpening(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 mb-20 md:mb-8">
        
        {/* TAB 1: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-4 sm:space-y-5 animate-in fade-in duration-200">
            {/* Dashboard Header Title & Phase Selector */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                  Dashboard
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                  Ikhtisar Kepemimpinan Situasional Hari Ke-{activeDay} • {currentCase.phaseName}
                </p>
              </div>

              {/* Day / Phase Quick Switcher */}
              <div className="flex items-center gap-2">
                <select
                  value={activeDay}
                  onChange={(e) => handleSelectDay(Number(e.target.value))}
                  className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm cursor-pointer"
                >
                  {CASES_90.map((c) => (
                    <option key={c.day} value={c.day}>
                      Hari {c.day}: {c.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* TOP ROW: 3 METRIC 3D CARDS (Mint/Emerald, Slate/Navy, Electric Blue) */}
            <DashboardTopCards
              activeDay={activeDay}
              currentCase={currentCase}
              reflection={currentReflection}
              metrics={metrics}
              onOpenJournal={handleOpenJournal}
              onOpenAnalytics={() => setActiveTab('analytics')}
            />

            {/* MIDDLE ROW: SPLIT HERO CASE + PROGRESS TRACKING CALENDAR (3 SESI) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
              <div className="lg:col-span-7">
                <TodayHeroCard
                  currentCase={currentCase}
                  completedActions={currentActions}
                  reflection={currentReflection}
                  onSelectDay={handleSelectDay}
                  onOpenJournal={handleOpenJournal}
                  onOpenCaseDetail={(c) => setSelectedCaseModal(c)}
                />
              </div>

              <div className="lg:col-span-5">
                <ProgressTrackingCalendar
                  activeDay={activeDay}
                  onSelectDay={handleSelectDay}
                  completedActions={userData.completedActions}
                  reflections={userData.reflections}
                  metrics={metrics}
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: 90 KASUS (CASE EXPLORER) */}
        {activeTab === 'cases' && (
          <div className="animate-in fade-in duration-200">
            <CaseList
              completedActions={userData.completedActions}
              reflections={userData.reflections}
              onSelectDay={handleSelectDay}
              onOpenJournal={handleOpenJournal}
              onOpenCaseDetail={(c) => setSelectedCaseModal(c)}
              initialSearchQuery={searchQuery}
            />
          </div>
        )}

        {/* TAB 3: JURNAL REFLEKSI (STRUCTURED INPUT & VOICE) */}
        {activeTab === 'journal' && (
          <div className="animate-in fade-in duration-200">
            <ReflectionForm
              activeDay={activeDay}
              onSelectDay={handleSelectDay}
              savedReflection={currentReflection}
              completedActions={currentActions}
              onToggleAction={handleToggleAction}
              onSaveReflection={handleSaveReflection}
              onExportDailyPdf={handleExportDailyPdf}
            />
          </div>
        )}

        {/* TAB 4: ANALISIS RADAR & VISUALISASI */}
        {activeTab === 'analytics' && (
          <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
            <LeadershipRadar
              radarData={radarData}
              isDarkMode={isDarkMode}
            />
          </div>
        )}

        {/* TAB 5: LAPORAN PDF & PORTOFOLIO */}
        {activeTab === 'reports' && (
          <div className="animate-in fade-in duration-200">
            <ReportExporter
              profile={userData.profile}
              reflections={userData.reflections}
              completedActions={userData.completedActions}
              metrics={metrics}
              radarData={radarData}
              activeDay={activeDay}
            />
          </div>
        )}

        {/* TAB 6: PENGATURAN & SINKRONISASI */}
        {activeTab === 'settings' && (
          <div className="animate-in fade-in duration-200">
            <ProfileSettings
              profile={userData.profile}
              settings={userData.settings}
              subscription={userData.subscription || DEFAULT_SUBSCRIPTION}
              onSaveProfile={handleSaveProfile}
              onSaveSettings={handleSaveSettings}
              onUpdateSubscription={handleUpdateSubscription}
              onResetData={handleResetData}
            />
          </div>
        )}
      </main>

      {/* Case Detail Modal */}
      {selectedCaseModal && (
        <CaseDetailModal
          isOpen={!!selectedCaseModal}
          onClose={() => setSelectedCaseModal(null)}
          caseData={selectedCaseModal}
          completedActions={userData.completedActions[selectedCaseModal.day] || []}
          onToggleAction={handleToggleAction}
          onOpenJournal={handleOpenJournal}
        />
      )}

      {/* Mobile Bottom Thumb Navigation */}
      <BottomNav
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
