import React, { useState, useEffect, useMemo } from 'react';
import { storage } from './services/storage';
import { CASES_90 } from './data/cases90';
import { notificationService } from './services/notifications';
import { DEFAULT_SUBSCRIPTION } from './data/defaultState';

// Common Components
import { Header } from './components/common/Header';
import { BottomNav } from './components/common/BottomNav';

// Dashboard Components
import { TodayHeroCard } from './components/dashboard/TodayHeroCard';
import { ProgressOverview } from './components/dashboard/ProgressOverview';
import { QuickStats } from './components/dashboard/QuickStats';

// Case Explorer Components
import { CaseList } from './components/cases/CaseList';
import { CaseDetailModal } from './components/cases/CaseDetailModal';

// Journal & Voice Components
import { ReflectionForm } from './components/journal/ReflectionForm';

// Analytics & Visualizations
import { LeadershipRadar } from './components/analytics/LeadershipRadar';
import { HabitHeatmap } from './components/analytics/HabitHeatmap';

// Reports & PDF
import { ReportExporter } from './components/reports/ReportExporter';

// Settings & Backup
import { ProfileSettings } from './components/settings/ProfileSettings';

export default function App() {
  const [userData, setUserData] = useState(() => storage.loadData());
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'cases' | 'journal' | 'analytics' | 'reports' | 'settings'
  const [activeDay, setActiveDay] = useState(() => userData.activeDay || 3);
  const [selectedCaseModal, setSelectedCaseModal] = useState(null);
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
      {/* Top Desktop & Mobile Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        profile={userData.profile}
        metrics={metrics}
        isDarkMode={isDarkMode}
        toggleDarkMode={handleToggleDarkMode}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 mb-20 md:mb-8">
        {/* TAB 1: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Today's Hero Situational Case */}
            <TodayHeroCard
              currentCase={currentCase}
              completedActions={currentActions}
              reflection={currentReflection}
              onSelectDay={handleSelectDay}
              onOpenJournal={handleOpenJournal}
              onOpenCaseDetail={(c) => setSelectedCaseModal(c)}
            />

            {/* Quick Stats Grid */}
            <QuickStats
              metrics={metrics}
              activeDay={activeDay}
            />

            {/* Progress Overview & Phase Cards */}
            <ProgressOverview
              metrics={metrics}
              onSelectPhase={(phaseNum) => {
                setActiveTab('cases');
              }}
            />

            {/* Habit Heatmap Grid */}
            <HabitHeatmap
              reflections={userData.reflections}
              completedActions={userData.completedActions}
              activeDay={activeDay}
              onSelectDay={handleOpenJournal}
              metrics={metrics}
            />
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
          <div className="space-y-8 animate-in fade-in duration-200">
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
