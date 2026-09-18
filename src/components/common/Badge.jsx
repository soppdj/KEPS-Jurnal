import React from 'react';
import { LEADERSHIP_STYLES, PHASES } from '../../data/leadershipStyles';

export function StyleBadge({ styleKey, size = 'sm' }) {
  const style = LEADERSHIP_STYLES[styleKey?.toUpperCase()] || 
    Object.values(LEADERSHIP_STYLES).find(s => s.id === styleKey) || {
      name: styleKey || 'Umum',
      bgLight: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300'
    };

  const sizeClasses = size === 'xs' 
    ? 'text-xs px-2 py-0.5' 
    : size === 'md' 
    ? 'text-sm px-3 py-1 font-medium' 
    : 'text-xs px-2.5 py-1 font-medium';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border ${style.bgLight} ${sizeClasses} transition-all`}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: style.color || '#64748B' }}></span>
      <span>{style.name}</span>
    </span>
  );
}

export function PhaseBadge({ phaseNumber, size = 'sm' }) {
  const phase = PHASES[phaseNumber] || PHASES[1];
  const sizeClasses = size === 'xs' ? 'text-xs px-2 py-0.5' : 'text-xs px-2.5 py-1 font-medium';

  return (
    <span className={`inline-flex items-center gap-1 rounded-full border ${phase.badgeClass} ${sizeClasses}`}>
      <span className="font-semibold">Fase {phaseNumber}:</span>
      <span>{phase.name}</span>
    </span>
  );
}
