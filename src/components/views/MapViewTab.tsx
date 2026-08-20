import React, { useState } from 'react';
import { usePsr } from '../../context/PsrContext';
import { PsrInteractiveMap } from '../dashboard/PsrInteractiveMap';
import { FilterPanel } from '../dashboard/FilterPanel';
import { formatHectare, formatIDR } from '../../lib/utils';
import { MapPin, Search, Navigation, Building2, Layers, CheckCircle2, ChevronRight } from 'lucide-react';

export const MapViewTab: React.FC = () => {
  const { filteredKudList, setSelectedKudDetail, setFilter } = usePsr();
  const [sidebarSearch, setSidebarSearch] = useState('');

  const displayedKuds = filteredKudList.filter(k => 
    k.namaKud.toLowerCase().includes(sidebarSearch.toLowerCase()) ||
    k.kabupaten.toLowerCase().includes(sidebarSearch.toLowerCase()) ||
    k.kodeKud.toLowerCase().includes(sidebarSearch.toLowerCase())
  );

  return (
    <div className="space-y-4 pb-12">
      <FilterPanel />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Left Side: KUD Quick Location Navigator */}
        <div className="lg:col-span-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 flex flex-col h-[650px] shadow-xs">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3 mb-3">
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center justify-between">
              <span>Daftar Lokasi KUD</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold">
                {displayedKuds.length}
              </span>
            </h4>
            <div className="relative mt-2">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Cari lokasi KUD / Kab..."
                value={sidebarSearch}
                onChange={(e) => setSidebarSearch(e.target.value)}
                className="w-full text-xs py-1.5 pl-8 pr-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 pr-1 text-xs">
            {displayedKuds.length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-xs">
                Tidak ada titik lokasi ditemukan
              </div>
            ) : (
              displayedKuds.map((kud) => (
                <div
                  key={kud.id}
                  onClick={() => setSelectedKudDetail(kud)}
                  className="p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 hover:border-emerald-200 dark:hover:border-emerald-800 transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                        {kud.regional}
                      </span>
                      <h5 className="font-bold text-slate-900 dark:text-slate-100 mt-1 group-hover:text-emerald-600 transition-colors">
                        {kud.namaKud}
                      </h5>
                      <p className="text-[11px] text-slate-500">
                        📍 {kud.kabupaten}, {kud.provinsi}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-200/50 dark:border-slate-700/50 flex items-center justify-between text-[10px]">
                    <span className="text-slate-500">Luas Rekomtek:</span>
                    <strong className="text-emerald-600">{formatHectare(kud.luasRekomtekHa)}</strong>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Side: Full Size Interactive GIS Map */}
        <div className="lg:col-span-3">
          <PsrInteractiveMap heightClass="h-[650px]" isFullScreenMode={true} />
        </div>
      </div>
    </div>
  );
};
