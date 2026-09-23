/**
 * Offline-first persistent storage service for KEPS Journal v2.0
 * Uses LocalStorage with fallback and validation
 */

import { INITIAL_USER_DATA } from '../data/defaultState';
import { CASES_90 } from '../data/cases90';
import { LEADERSHIP_STYLES } from '../data/leadershipStyles';

const STORAGE_KEY = 'keps_journal_v2_data';

export const storage = {
  /**
   * Load current state from storage or initialize with default
   */
  loadData: () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const mergedProfile = { ...INITIAL_USER_DATA.profile, ...(parsed.profile || {}) };
        delete mergedProfile.supervisorName;
        delete mergedProfile.supervisorNip;
        delete mergedProfile.regionName;

        // Auto-upgrade legacy default profile to the new requested default from Image 1
        if (
          !mergedProfile.principalName || 
          mergedProfile.principalName === 'Siti Asiyah, S.Pd' ||
          mergedProfile.schoolName === 'SD Inspira Montessori' ||
          mergedProfile.schoolName === 'TK Khoirur Rooziqiin Montessori Bandung' ||
          mergedProfile.schoolName === 'SMP Negeri 1 Merdeka Nusantara'
        ) {
          mergedProfile.principalName = INITIAL_USER_DATA.profile.principalName;
          mergedProfile.nip = INITIAL_USER_DATA.profile.nip;
          mergedProfile.schoolName = INITIAL_USER_DATA.profile.schoolName; // 'TK Inspira Montessori'
          mergedProfile.schoolAddress = INITIAL_USER_DATA.profile.schoolAddress;
          mergedProfile.schoolLevel = INITIAL_USER_DATA.profile.schoolLevel;
          mergedProfile.photoUrl = '';
        }

        // Enforce 3-day trial for any subscription without a verified claimed token
        let subscription = parsed.subscription || INITIAL_USER_DATA.subscription;
        if (!subscription.lastTokenUsed || !subscription.tokensHistory || subscription.tokensHistory.length === 0) {
          const trialStartTime = subscription.startDate ? new Date(subscription.startDate).getTime() : Date.now();
          const trialStart = isNaN(trialStartTime) ? Date.now() : trialStartTime;
          const validUntilTime = trialStart + 3 * 86400000;
          const isExpired = Date.now() > validUntilTime;

          subscription = {
            status: isExpired ? 'expired' : 'active',
            planName: 'Masa Uji Coba 3 Hari (Trial)',
            isTrial: true,
            startDate: new Date(trialStart).toISOString(),
            validUntil: new Date(validUntilTime).toISOString(),
            lastTokenUsed: null,
            tokensHistory: []
          };
        }

        return {
          ...INITIAL_USER_DATA,
          ...parsed,
          profile: mergedProfile,
          settings: { ...INITIAL_USER_DATA.settings, ...(parsed.settings || {}) },
          subscription,
          completedActions: parsed.completedActions || {},
          reflections: parsed.reflections || {}
        };
      }
    } catch (err) {
      console.error('[KEPS Storage] Error loading from localStorage, using initial state:', err);
    }
    return INITIAL_USER_DATA;
  },

  /**
   * Save full state to storage
   */
  saveData: (data) => {
    try {
      if (data?.profile) {
        delete data.profile.supervisorName;
        delete data.profile.supervisorNip;
        delete data.profile.regionName;
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      window.dispatchEvent(new CustomEvent('keps-data-updated', { detail: data }));
      return true;
    } catch (err) {
      console.error('[KEPS Storage] Error saving to localStorage:', err);
      return false;
    }
  },

  /**
   * Save reflection for a specific day
   */
  saveReflection: (day, reflectionData) => {
    const current = storage.loadData();
    const updatedReflections = {
      ...current.reflections,
      [day]: {
        day: Number(day),
        ...reflectionData,
        timestamp: new Date().toISOString()
      }
    };
    const updatedData = {
      ...current,
      reflections: updatedReflections,
      activeDay: Number(day)
    };
    storage.saveData(updatedData);
    return updatedData;
  },

  /**
   * Toggle action checklist item for a day
   */
  toggleAction: (day, actionIndex) => {
    const current = storage.loadData();
    const currentActions = current.completedActions[day] || [];
    let updatedActions;

    if (currentActions.includes(actionIndex)) {
      updatedActions = currentActions.filter(i => i !== actionIndex);
    } else {
      updatedActions = [...currentActions, actionIndex];
    }

    const updatedData = {
      ...current,
      completedActions: {
        ...current.completedActions,
        [day]: updatedActions
      }
    };
    storage.saveData(updatedData);
    return updatedData;
  },

  /**
   * Compute comprehensive metrics: completion rate, streaks, phase stats
   */
  calculateMetrics: (data) => {
    const reflections = data.reflections || {};
    const completedActions = data.completedActions || {};
    
    // Count days where reflection is filled OR all actions are completed
    let completedDaysCount = 0;
    let phase1Count = 0;
    let phase2Count = 0;
    let phase3Count = 0;
    let totalMoodSum = 0;
    let moodCount = 0;

    CASES_90.forEach(c => {
      const dayRef = reflections[c.day];
      const dayActs = completedActions[c.day] || [];
      const isReflected = dayRef && (dayRef.challenge || dayRef.decision || dayRef.insight);
      const isFullyActed = dayActs.length >= (c.actions?.length || 4);

      if (isReflected || isFullyActed) {
        completedDaysCount++;
        if (c.phase === 1) phase1Count++;
        else if (c.phase === 2) phase2Count++;
        else if (c.phase === 3) phase3Count++;
      }

      if (dayRef && dayRef.mood) {
        totalMoodSum += Number(dayRef.mood);
        moodCount++;
      }
    });

    // Calculate current streak (consecutive completed days ending near today or activeDay)
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;

    for (let day = 1; day <= 90; day++) {
      const isDone = reflections[day] || (completedActions[day] && completedActions[day].length > 0);
      if (isDone) {
        tempStreak++;
        if (tempStreak > longestStreak) longestStreak = tempStreak;
      } else {
        tempStreak = 0;
      }
    }

    // Current streak from active day backwards
    const active = data.activeDay || 1;
    for (let day = active; day >= 1; day--) {
      if (reflections[day] || (completedActions[day] && completedActions[day].length > 0)) {
        currentStreak++;
      } else {
        break;
      }
    }

    const averageMood = moodCount > 0 ? (totalMoodSum / moodCount).toFixed(1) : '3.0';
    const completionPercentage = Math.round((completedDaysCount / 90) * 100);

    return {
      completedDaysCount,
      completionPercentage,
      phase1: { completed: phase1Count, total: 30, percentage: Math.round((phase1Count / 30) * 100) },
      phase2: { completed: phase2Count, total: 30, percentage: Math.round((phase2Count / 30) * 100) },
      phase3: { completed: phase3Count, total: 30, percentage: Math.round((phase3Count / 30) * 100) },
      currentStreak,
      longestStreak,
      averageMood,
      totalReflections: Object.keys(reflections).length
    };
  },

  /**
   * Compute scores for 9 Leadership Styles for Radar Chart
   */
  calculateLeadershipRadar: (data) => {
    const reflections = data.reflections || {};
    const completedActions = data.completedActions || {};

    // Initialize counts for each style
    const styleScores = {};
    const styleTotals = {};

    Object.keys(LEADERSHIP_STYLES).forEach(key => {
      const styleId = LEADERSHIP_STYLES[key].id;
      styleScores[styleId] = 0;
      styleTotals[styleId] = 0;
    });

    // Traverse all 90 cases and attribute weight
    CASES_90.forEach(c => {
      const styleId = c.style;
      if (styleTotals[styleId] !== undefined) {
        styleTotals[styleId] += 10; // each case gives 10 base points
      }

      const hasRef = reflections[c.day];
      const acts = completedActions[c.day] || [];
      
      let dayScore = 0;
      if (acts.length > 0) {
        dayScore += (acts.length / (c.actions?.length || 4)) * 5;
      }
      if (hasRef && (hasRef.challenge || hasRef.decision || hasRef.insight)) {
        dayScore += 5;
      }

      if (styleScores[styleId] !== undefined) {
        styleScores[styleId] += dayScore;
      }
    });

    // Normalize to a 0-100 scale or balanced distribution
    const labels = [];
    const values = [];
    const colors = [];

    Object.keys(LEADERSHIP_STYLES).forEach(key => {
      const s = LEADERSHIP_STYLES[key];
      const earned = styleScores[s.id] || 0;
      const total = styleTotals[s.id] || 10;
      // Normalized percentage score (min 15 so radar looks balanced for new users)
      const score = Math.min(100, Math.max(15, Math.round((earned / total) * 100)));

      labels.push(s.shortName);
      values.push(score);
      colors.push(s.color);
    });

    return {
      labels,
      values,
      colors,
      rawScores: styleScores
    };
  },

  /**
   * Reset data back to default
   */
  resetData: () => {
    localStorage.removeItem(STORAGE_KEY);
    return storage.loadData();
  }
};
