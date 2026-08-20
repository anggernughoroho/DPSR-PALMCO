import React from 'react';
import { usePsr } from '../../context/PsrContext';
import { KpiOverview } from '../dashboard/KpiOverview';
import { FilterPanel } from '../dashboard/FilterPanel';
import { PsrInteractiveMap } from '../dashboard/PsrInteractiveMap';
import { AnalyticsCharts } from '../dashboard/AnalyticsCharts';
import { KudDataTable } from '../table/KudDataTable';
import { Sparkles, MapPin, BarChart3, TableProperties } from 'lucide-react';

export const OverviewView: React.FC = () => {
  const { filteredKudList, setActiveTab } = usePsr();

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Executive Multi-Filter Bar */}
      <FilterPanel />

      {/* 2. Top-tier KPI Cards */}
      <KpiOverview />

      {/* 3. Spatial Map & Quick Regional Health */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-emerald-700 text-white flex items-center justify-center text-xs">
              <MapPin className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Peta GIS Sebaran Kemitraan & Mitra PKS PTPN IV
            </h3>
          </div>
          <button
            onClick={() => setActiveTab('map')}
            className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-semibold cursor-pointer"
          >
            Buka Peta Penuh →
          </button>
        </div>

        <PsrInteractiveMap heightClass="h-[420px]" />
      </div>

      {/* 4. Deep Analytical Charts */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-emerald-700 text-white flex items-center justify-center text-xs">
              <BarChart3 className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Kinerja Luasan, Kemitraan & Profil Umur Tanam PSR
            </h3>
          </div>
          <button
            onClick={() => setActiveTab('analytics')}
            className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-semibold cursor-pointer"
          >
            Lihat Analitik Lengkap →
          </button>
        </div>

        <AnalyticsCharts />
      </div>

      {/* 5. Master Data Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-emerald-700 text-white flex items-center justify-center text-xs">
              <TableProperties className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Data Rekapitulasi KUD Mitra Terdaftar
            </h3>
          </div>
          <button
            onClick={() => setActiveTab('kud-list')}
            className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-semibold cursor-pointer"
          >
            Buka Tabel Penuh →
          </button>
        </div>

        <KudDataTable showTitle={true} limitRows={10} />
      </div>
    </div>
  );
};
