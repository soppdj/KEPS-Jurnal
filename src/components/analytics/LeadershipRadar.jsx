import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { Compass, Sparkles, TrendingUp, Info } from 'lucide-react';
import { LEADERSHIP_STYLES } from '../../data/leadershipStyles';

// Register ChartJS modules
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export function LeadershipRadar({ radarData, isDarkMode = false }) {
  const { labels = [], values = [], rawScores = {} } = radarData || {};

  // Identify dominant style
  const dominantIndex = useMemo(() => {
    if (!values || values.length === 0) return 0;
    let maxIdx = 0;
    let maxVal = values[0];
    for (let i = 1; i < values.length; i++) {
      if (values[i] > maxVal) {
        maxVal = values[i];
        maxIdx = i;
      }
    }
    return maxIdx;
  }, [values]);

  const dominantStyleObj = Object.values(LEADERSHIP_STYLES)[dominantIndex] || Object.values(LEADERSHIP_STYLES)[0];

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Tingkat Penerapan Gaya Kepemimpinan (%)',
        data: values,
        backgroundColor: isDarkMode ? 'rgba(16, 185, 129, 0.25)' : 'rgba(30, 58, 138, 0.2)',
        borderColor: isDarkMode ? '#10B981' : '#1E3A8A',
        borderWidth: 2.5,
        pointBackgroundColor: isDarkMode ? '#10B981' : '#1E3A8A',
        pointBorderColor: '#ffffff',
        pointHoverBackgroundColor: '#ffffff',
        pointHoverBorderColor: isDarkMode ? '#10B981' : '#1E3A8A',
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: {
          color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
        },
        grid: {
          color: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
        },
        pointLabels: {
          color: isDarkMode ? '#CBD5E1' : '#334155',
          font: {
            size: 11,
            weight: '600',
            family: 'Inter, sans-serif'
          },
        },
        ticks: {
          backdropColor: 'transparent',
          color: isDarkMode ? '#94A3B8' : '#64748B',
          stepSize: 20,
          font: {
            size: 9,
          },
          showLabelBackdrop: false
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return ` Skor: ${context.formattedValue}%`;
          }
        }
      }
    },
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Dominant Leadership Style */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-navy-900 via-navy-800 to-slate-900 border border-slate-700/50 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Gaya Kepemimpinan Dominan Saat Ini
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">
              Kepemimpinan {dominantStyleObj.name}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl leading-relaxed">
              {dominantStyleObj.description}
            </p>
          </div>
        </div>
        <div className="px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-center shrink-0">
          <span className="block text-[10px] text-slate-400 font-semibold uppercase">Capaian Profil</span>
          <span className="text-2xl font-black text-emerald-400">{values[dominantIndex] || 0}%</span>
        </div>
      </div>

      {/* Spider / Radar Chart Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-emerald-500" />
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Radar Distribusi 9 Gaya Kepemimpinan
              </h3>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Skala 0 - 100%
            </span>
          </div>

          {/* Chart Canvas */}
          <div className="w-full h-[360px] sm:h-[400px] flex items-center justify-center relative">
            <Radar data={chartData} options={chartOptions} />
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>● Nilai diperbarui otomatis dari aksi tercentang & refleksi</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">9 Dimensi Seimbang</span>
          </div>
        </div>

        {/* 9 Styles Breakdown List */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center justify-between">
            <span>Rincian 9 Gaya Kepemimpinan</span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </h3>

          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
            {Object.values(LEADERSHIP_STYLES).map((style, idx) => {
              const val = values[idx] || 0;
              return (
                <div 
                  key={style.id}
                  className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 hover:border-slate-300 transition-all"
                >
                  <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                    <span className="text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: style.color }} />
                      {style.name}
                    </span>
                    <span className="text-slate-900 dark:text-white font-mono">
                      {val}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: `${val}%`,
                        backgroundColor: style.color
                      }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                    {style.keyAction}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
