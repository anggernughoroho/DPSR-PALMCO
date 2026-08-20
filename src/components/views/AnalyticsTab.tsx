import React from 'react';
import { usePsr } from '../../context/PsrContext';
import { FilterPanel } from '../dashboard/FilterPanel';
import { AnalyticsCharts } from '../dashboard/AnalyticsCharts';
import { KpiOverview } from '../dashboard/KpiOverview';
import { formatHectare, formatIDR, formatNumber } from '../../lib/utils';
import { 
  BarChart3, 
  TrendingUp, 
  Sprout, 
  Banknote, 
  ShieldCheck, 
  PieChart, 
  Calendar, 
  Activity,
  TreePine
} from 'lucide-react';

export const AnalyticsTab: React.FC = () => {
  const { filteredKudList, kpiMetrics } = usePsr();

  // Varietas Bibit Aggregation
  const bibitMap: Record<string, number> = {};
  filteredKudList.forEach(k => {
    bibitMap[k.varietasBibit] = (bibitMap[k.varietasBibit] || 0) + k.luasRekomtekHa;
  });
  const bibitList = Object.entries(bibitMap).sort((a, b) => b[1] - a[1]);

  // Bank Penyalur Aggregation
  const bankMap: Record<string, number> = {};
  filteredKudList.forEach(k => {
    bankMap[k.bankPenyalur] = (bankMap[k.bankPenyalur] || 0) + k.totalNilaiPencairan;
  });
  const bankList = Object.entries(bankMap).sort((a, b) => b[1] - a[1]);

  return (
    <div className="space-y-6 pb-12">
      <FilterPanel />
      <KpiOverview />

      <AnalyticsCharts />

      {/* Additional Deep Dive Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Varietas Bibit Distribution */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <TreePine className="w-4 h-4 text-emerald-600" />
              <span>Distribusi Varietas Bibit Bersertifikasi</span>
            </h4>
            <span className="text-[10px] text-slate-400">Total Luas (Ha)</span>
          </div>

          <div className="space-y-3 text-xs">
            {bibitList.map(([name, ha]) => {
              const pct = (ha / (kpiMetrics.totalLuasRekomtek || 1)) * 100;
              return (
                <div key={name} className="space-y-1">
                  <div className="flex justify-between text-slate-700 dark:text-slate-300">
                    <span className="font-semibold">{name}</span>
                    <span className="font-bold text-emerald-600">{formatHectare(ha)} ({pct.toFixed(1)}%)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bank Penyalur Escrow Distribution */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Banknote className="w-4 h-4 text-orange-600" />
              <span>Distribusi Rekening Escrow Perbankan Penyalur</span>
            </h4>
            <span className="text-[10px] text-slate-400">Total Cair</span>
          </div>

          <div className="space-y-3 text-xs">
            {bankList.map(([bank, amount]) => {
              const pct = (amount / (kpiMetrics.totalDanaCair || 1)) * 100;
              return (
                <div key={bank} className="space-y-1">
                  <div className="flex justify-between text-slate-700 dark:text-slate-300">
                    <span className="font-semibold">{bank}</span>
                    <span className="font-bold text-orange-600">{formatIDR(amount)} ({pct.toFixed(1)}%)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
