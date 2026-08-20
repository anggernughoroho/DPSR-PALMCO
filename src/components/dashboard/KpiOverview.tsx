import React from 'react';
import { usePsr } from '../../context/PsrContext';
import { formatHectare, formatIDR, formatNumber } from '../../lib/utils';
import { 
  Trees, 
  Banknote, 
  Users2, 
  CheckCircle, 
  TrendingUp, 
  Sprout, 
  ArrowUpRight, 
  Percent,
  Layers,
  Award
} from 'lucide-react';

export const KpiOverview: React.FC = () => {
  const { kpiMetrics } = usePsr();

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {/* Card 1: Luas Rekomtek vs Target */}
      <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Total Rekomtek
            </span>
            <span className="p-1 px-1.5 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded text-[10px] font-bold">
              {formatNumber(kpiMetrics.persenRekomtekVsTarget, 1)}%
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">
              {formatNumber(kpiMetrics.totalLuasRekomtekHa, 0)}
            </span>
            <span className="text-xs text-slate-500 font-medium">Ha</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            Target: {formatHectare(kpiMetrics.totalTargetLuasHa)}
          </div>
        </div>

        <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(kpiMetrics.persenRekomtekVsTarget, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Card 2: Total Nilai Pencairan BPDPKS */}
      <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Dana BPDPKS Cair
            </span>
            <span className="p-1 px-1.5 bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 rounded text-[10px] font-bold">
              {formatNumber(kpiMetrics.persenPencairanVsRekomtek, 1)}%
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">
              {formatIDR(kpiMetrics.totalNilaiPencairanRp)}
            </span>
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            Luas Cair: {formatHectare(kpiMetrics.totalLuasPencairanHa)}
          </div>
        </div>

        <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-orange-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(kpiMetrics.persenPencairanVsRekomtek, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Card 3: Luas Realisasi Tanam Perdana */}
      <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Realisasi Tanam
            </span>
            <span className="p-1 px-1.5 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded text-[10px] font-bold">
              {formatNumber(kpiMetrics.persenTanamVsRekomtek, 1)}%
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">
              {formatNumber(kpiMetrics.totalLuasTanamHa, 0)}
            </span>
            <span className="text-xs text-slate-500 font-medium">Ha</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            Progres Fisik: {formatNumber(kpiMetrics.rataRataProgresFisik, 1)}%
          </div>
        </div>

        <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(kpiMetrics.persenTanamVsRekomtek, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Card 4: Petani Plasma & Mitra */}
      <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Petani Terlibat
            </span>
            <span className="p-1 px-1.5 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 rounded text-[10px] font-bold">
              {kpiMetrics.totalKudCount} KUD
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">
              {formatNumber(kpiMetrics.totalJumlahKk)}
            </span>
            <span className="text-xs text-slate-500 font-medium">KK</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            Rata-rata: {kpiMetrics.totalJumlahKk > 0 ? formatNumber(kpiMetrics.totalLuasRekomtekHa / kpiMetrics.totalJumlahKk, 2) : '0'} Ha/KK
          </div>
        </div>

        <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-blue-500 h-full rounded-full transition-all duration-500"
              style={{ width: '100%' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
