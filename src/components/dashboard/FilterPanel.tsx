import React, { useState } from 'react';
import { usePsr } from '../../context/PsrContext';
import { 
  REGIONAL_OPTIONS, 
  PROVINSI_OPTIONS, 
  KEMITRAAN_OPTIONS, 
  TAHAPAN_OPTIONS, 
  KLASIFIKASI_OPTIONS, 
  TAHUN_PEROLEHAN_OPTIONS,
  TAHUN_OPTIONS,
  RAB_BPDP_OPTIONS
} from '../../data/mockPsrData';
import { 
  Filter, 
  RotateCcw, 
  ChevronDown, 
  ChevronUp, 
  SlidersHorizontal,
  Sparkles,
  Check,
  Calendar,
  Layers,
  MapPin,
  Banknote,
  Users
} from 'lucide-react';

export const FilterPanel: React.FC = () => {
  const { filters, setFilter, resetFilters, hasActiveFilters, filteredKudList, kudList } = usePsr();
  const [isExpanded, setIsExpanded] = useState(false);

  // Quick Preset Filters
  const applyPreset = (preset: 'all' | 'offtaker' | 'kemitraan' | 'revitbun' | 'konversi_karet' | 'rab60' | 'rab30' | 'cair' | 'tanam') => {
    resetFilters();
    if (preset === 'offtaker') {
      setFilter('statusKemitraan', 'Offtaker');
    } else if (preset === 'kemitraan') {
      setFilter('statusKemitraan', 'Kemitraan');
    } else if (preset === 'revitbun') {
      setFilter('statusKemitraan', 'Revitbun');
    } else if (preset === 'konversi_karet') {
      setFilter('statusKemitraan', 'Konversi Karet');
    } else if (preset === 'rab60') {
      setFilter('rabPerHa', '60000000');
    } else if (preset === 'rab30') {
      setFilter('rabPerHa', '30000000');
    } else if (preset === 'cair') {
      setFilter('statusPencairan', 'Cair Penuh (100%)');
    } else if (preset === 'tanam') {
      setFilter('tahapanPsr', 'Tanam Perdana');
    }
  };

  return (
    <div className="p-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs space-y-3">
      {/* Header & Quick Filter Pills */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-tight">
            Filter PSR Multi-Dimensi
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold">
            {filteredKudList.length} dari {kudList.length} Entitas
          </span>
        </div>

        {/* Quick Filter Pills */}
        <div className="flex items-center gap-1.5 flex-wrap text-xs">
          <button
            onClick={() => applyPreset('all')}
            className={`text-[11px] px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
              !hasActiveFilters
                ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            Semua
          </button>

          <button
            onClick={() => applyPreset('offtaker')}
            className={`text-[11px] px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
              filters.statusKemitraan === 'Offtaker'
                ? 'bg-blue-600 text-white font-semibold shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            Offtaker
          </button>

          <button
            onClick={() => applyPreset('kemitraan')}
            className={`text-[11px] px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
              filters.statusKemitraan === 'Kemitraan'
                ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            Kemitraan
          </button>

          <button
            onClick={() => applyPreset('revitbun')}
            className={`text-[11px] px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
              filters.statusKemitraan === 'Revitbun'
                ? 'bg-purple-600 text-white font-semibold shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            Revitbun
          </button>

          <button
            onClick={() => applyPreset('konversi_karet')}
            className={`text-[11px] px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
              filters.statusKemitraan === 'Konversi Karet'
                ? 'bg-amber-600 text-white font-semibold shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            Konversi Karet
          </button>

          <button
            onClick={() => applyPreset('rab60')}
            className={`text-[11px] px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
              filters.rabPerHa === '60000000'
                ? 'bg-amber-600 text-white font-semibold shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            RAB 60 Jt/Ha
          </button>

          <button
            onClick={() => applyPreset('rab30')}
            className={`text-[11px] px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
              filters.rabPerHa === '30000000'
                ? 'bg-teal-600 text-white font-semibold shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            RAB 30 Jt/Ha
          </button>

          {hasActiveFilters && (
            <button
              id="filter-reset-btn"
              onClick={resetFilters}
              className="text-[11px] px-2.5 py-1 rounded-md bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800/60 hover:bg-rose-100 flex items-center gap-1 font-medium transition-all cursor-pointer ml-1"
            >
              <RotateCcw className="w-3 h-3" />
              Reset ({Object.values(filters).filter(v => v !== 'ALL' && v !== '').length})
            </button>
          )}

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[11px] px-2 py-1 rounded text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 flex items-center gap-0.5 ml-auto cursor-pointer"
          >
            <span>{isExpanded ? 'Tutup Filter Tambahan' : 'Filter Tambahan'}</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* 6 Primary Filter Grid (Regional, Provinsi, Status Kemitraan, Tahun Perolehan, Tahun Tanam, RAB/Ha BPDP) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {/* 1. Regional Filter */}
        <div>
          <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Layers className="w-3 h-3 text-emerald-600" />
            <span>1. Regional</span>
          </label>
          <select
            id="filter-regional-select"
            value={filters.regional}
            onChange={(e) => setFilter('regional', e.target.value)}
            className={`w-full text-xs border rounded-lg px-2.5 py-1.5 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-colors ${
              filters.regional !== 'ALL' ? 'border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/20 font-semibold' : 'border-slate-200 dark:border-slate-700'
            }`}
          >
            <option value="ALL">Semua Regional (1 - 7)</option>
            {REGIONAL_OPTIONS.map(opt => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* 2. Provinsi Filter */}
        <div>
          <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-emerald-600" />
            <span>2. Provinsi</span>
          </label>
          <select
            id="filter-provinsi-select"
            value={filters.provinsi}
            onChange={(e) => setFilter('provinsi', e.target.value)}
            className={`w-full text-xs border rounded-lg px-2.5 py-1.5 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-colors ${
              filters.provinsi !== 'ALL' ? 'border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/20 font-semibold' : 'border-slate-200 dark:border-slate-700'
            }`}
          >
            <option value="ALL">Semua Provinsi</option>
            {PROVINSI_OPTIONS.map(opt => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* 3. Status Kemitraan (Offtaker, Kemitraan, Revitbun) */}
        <div>
          <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Users className="w-3 h-3 text-emerald-600" />
            <span>3. Status Kemitraan</span>
          </label>
          <select
            id="filter-kemitraan-select"
            value={filters.statusKemitraan}
            onChange={(e) => setFilter('statusKemitraan', e.target.value)}
            className={`w-full text-xs border rounded-lg px-2.5 py-1.5 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-colors ${
              filters.statusKemitraan !== 'ALL' ? 'border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/20 font-semibold' : 'border-slate-200 dark:border-slate-700'
            }`}
          >
            <option value="ALL">Semua Model ({KEMITRAAN_OPTIONS.length} Status)</option>
            {KEMITRAAN_OPTIONS.map(opt => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* 4. Tahun Perolehan (Tahun Kemitraan Diperoleh) */}
        <div>
          <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Calendar className="w-3 h-3 text-emerald-600" />
            <span>4. Tahun Perolehan</span>
          </label>
          <select
            id="filter-tahun-perolehan-select"
            value={filters.tahunPerolehan}
            onChange={(e) => setFilter('tahunPerolehan', e.target.value)}
            className={`w-full text-xs border rounded-lg px-2.5 py-1.5 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-colors ${
              filters.tahunPerolehan !== 'ALL' ? 'border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/20 font-semibold' : 'border-slate-200 dark:border-slate-700'
            }`}
          >
            <option value="ALL">Semua Thn Perolehan</option>
            {TAHUN_PEROLEHAN_OPTIONS.map(opt => (
              <option key={opt} value={opt}>
                Tahun {opt}
              </option>
            ))}
          </select>
        </div>

        {/* 5. Tahun Tanam Kebun */}
        <div>
          <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Calendar className="w-3 h-3 text-emerald-600" />
            <span>5. Tahun Tanam</span>
          </label>
          <select
            id="filter-tahun-tanam-select"
            value={filters.tahunTanam}
            onChange={(e) => setFilter('tahunTanam', e.target.value)}
            className={`w-full text-xs border rounded-lg px-2.5 py-1.5 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-colors ${
              filters.tahunTanam !== 'ALL' ? 'border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/20 font-semibold' : 'border-slate-200 dark:border-slate-700'
            }`}
          >
            <option value="ALL">Semua Thn Tanam</option>
            {TAHUN_OPTIONS.map(opt => (
              <option key={opt} value={opt}>
                Tahun {opt}
              </option>
            ))}
          </select>
        </div>

        {/* 6. RAB / Ha Dana BPDP */}
        <div>
          <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Banknote className="w-3 h-3 text-emerald-600" />
            <span>6. RAB/Ha Dana BPDP</span>
          </label>
          <select
            id="filter-rab-select"
            value={filters.rabPerHa}
            onChange={(e) => setFilter('rabPerHa', e.target.value)}
            className={`w-full text-xs border rounded-lg px-2.5 py-1.5 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-colors ${
              filters.rabPerHa !== 'ALL' ? 'border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/20 font-semibold' : 'border-slate-200 dark:border-slate-700'
            }`}
          >
            {RAB_BPDP_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Expanded Secondary Filters (Tahapan, Klasifikasi, Status Pencairan) */}
      {isExpanded && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2.5 mt-2.5 border-t border-dashed border-slate-200 dark:border-slate-800 animate-in fade-in duration-150">
          {/* Tahapan PSR */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Tahapan PSR (SOP Teknis)
            </label>
            <select
              id="filter-tahapan-select"
              value={filters.tahapanPsr}
              onChange={(e) => setFilter('tahapanPsr', e.target.value)}
              className="w-full text-xs border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
            >
              <option value="ALL">Semua Tahapan PSR</option>
              {TAHAPAN_OPTIONS.map(opt => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Klasifikasi Tanaman Filter */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Klasifikasi Kebun PSR
            </label>
            <select
              id="filter-klasifikasi-select"
              value={filters.klasifikasiTanaman}
              onChange={(e) => setFilter('klasifikasiTanaman', e.target.value)}
              className="w-full text-xs border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
            >
              <option value="ALL">Semua Klasifikasi Kebun</option>
              {KLASIFIKASI_OPTIONS.map(opt => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Status Pencairan Dana BPDPKS */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Status Pencairan Rekening Escrow
            </label>
            <select
              id="filter-pencairan-select"
              value={filters.statusPencairan}
              onChange={(e) => setFilter('statusPencairan', e.target.value)}
              className="w-full text-xs border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
            >
              <option value="ALL">Semua Status Pencairan</option>
              <option value="Cair Penuh (100%)">Cair Penuh (100%)</option>
              <option value="Cair Tahap 1 (70%)">Cair Tahap 1 (70%)</option>
              <option value="Proses Bank Penampung">Proses Bank Penampung</option>
              <option value="Belum Cair">Belum Cair</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};
