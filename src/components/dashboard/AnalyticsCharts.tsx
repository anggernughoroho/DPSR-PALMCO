import React, { useMemo, useState } from 'react';
import { usePsr } from '../../context/PsrContext';
import { formatHectare, formatIDR, formatNumber } from '../../lib/utils';
import { 
  LandPlot,
  Building2, 
  Users, 
  Banknote, 
  Handshake, 
  Sprout, 
  Layers, 
  TrendingUp, 
  CheckCircle2, 
  PieChart,
  Calendar,
  Sparkles,
  TreePine,
  ArrowRight,
  BarChart3,
  Filter,
  Check
} from 'lucide-react';

export const AnalyticsCharts: React.FC = () => {
  const { filteredKudList, kpiMetrics, filters, setFilter } = usePsr();
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);

  // 1. Calculations for 3 Partnership Models: Offtaker, Kemitraan, Revitbun
  const partnershipAnalysis = useMemo(() => {
    let offtakerCount = 0;
    let offtakerLuas = 0;
    let offtakerDana = 0;
    let offtakerKk = 0;
    let offtakerTanam = 0;

    let kemitraanCount = 0;
    let kemitraanLuas = 0;
    let kemitraanDana = 0;
    let kemitraanKk = 0;
    let kemitraanTanam = 0;

    let revitbunCount = 0;
    let revitbunLuas = 0;
    let revitbunDana = 0;
    let revitbunKk = 0;
    let revitbunTanam = 0;

    let konversiKaretCount = 0;
    let konversiKaretLuas = 0;
    let konversiKaretDana = 0;
    let konversiKaretKk = 0;
    let konversiKaretTanam = 0;

    filteredKudList.forEach(k => {
      if (k.statusKemitraan === 'Offtaker') {
        offtakerCount += 1;
        offtakerLuas += k.luasRekomtekHa;
        offtakerDana += k.totalNilaiPencairan;
        offtakerKk += k.jumlahKk;
        offtakerTanam += k.luasTanamHa;
      } else if (k.statusKemitraan === 'Kemitraan') {
        kemitraanCount += 1;
        kemitraanLuas += k.luasRekomtekHa;
        kemitraanDana += k.totalNilaiPencairan;
        kemitraanKk += k.jumlahKk;
        kemitraanTanam += k.luasTanamHa;
      } else if (k.statusKemitraan === 'Revitbun') {
        revitbunCount += 1;
        revitbunLuas += k.luasRekomtekHa;
        revitbunDana += k.totalNilaiPencairan;
        revitbunKk += k.jumlahKk;
        revitbunTanam += k.luasTanamHa;
      } else if (k.statusKemitraan === 'Konversi Karet') {
        konversiKaretCount += 1;
        konversiKaretLuas += k.luasRekomtekHa;
        konversiKaretDana += k.totalNilaiPencairan;
        konversiKaretKk += k.jumlahKk;
        konversiKaretTanam += k.luasTanamHa;
      }
    });

    const totalKud = filteredKudList.length || 1;
    const totalLuas = kpiMetrics.totalLuasRekomtekHa || 1;

    return {
      offtaker: {
        count: offtakerCount,
        luas: offtakerLuas,
        tanam: offtakerTanam,
        dana: offtakerDana,
        kk: offtakerKk,
        pctKud: (offtakerCount / totalKud) * 100,
        pctLuas: (offtakerLuas / totalLuas) * 100
      },
      kemitraan: {
        count: kemitraanCount,
        luas: kemitraanLuas,
        tanam: kemitraanTanam,
        dana: kemitraanDana,
        kk: kemitraanKk,
        pctKud: (kemitraanCount / totalKud) * 100,
        pctLuas: (kemitraanLuas / totalLuas) * 100
      },
      revitbun: {
        count: revitbunCount,
        luas: revitbunLuas,
        tanam: revitbunTanam,
        dana: revitbunDana,
        kk: revitbunKk,
        pctKud: (revitbunCount / totalKud) * 100,
        pctLuas: (revitbunLuas / totalLuas) * 100
      },
      konversiKaret: {
        count: konversiKaretCount,
        luas: konversiKaretLuas,
        tanam: konversiKaretTanam,
        dana: konversiKaretDana,
        kk: konversiKaretKk,
        pctKud: (konversiKaretCount / totalKud) * 100,
        pctLuas: (konversiKaretLuas / totalLuas) * 100
      }
    };
  }, [filteredKudList, kpiMetrics]);

  // 2. Calculations for Grafik Tahun Perolehan Kemitraan KUD (Tahun Kemitraan Diperoleh)
  const tahunPerolehanAnalysis = useMemo(() => {
    const years = [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];
    
    const yearStats = years.map(year => {
      const kudInYear = filteredKudList.filter(k => k.tahunPerolehan === year);
      const kudCount = kudInYear.length;
      const luasHa = kudInYear.reduce((acc, k) => acc + k.luasRekomtekHa, 0);
      const danaRp = kudInYear.reduce((acc, k) => acc + k.totalNilaiPencairan, 0);
      const kkCount = kudInYear.reduce((acc, k) => acc + k.jumlahKk, 0);
      
      const offtakerCount = kudInYear.filter(k => k.statusKemitraan === 'Offtaker').length;
      const kemitraanCount = kudInYear.filter(k => k.statusKemitraan === 'Kemitraan').length;
      const revitbunCount = kudInYear.filter(k => k.statusKemitraan === 'Revitbun').length;
      const konversiKaretCount = kudInYear.filter(k => k.statusKemitraan === 'Konversi Karet').length;

      return {
        year,
        kudCount,
        luasHa,
        danaRp,
        kkCount,
        offtakerCount,
        kemitraanCount,
        revitbunCount,
        konversiKaretCount
      };
    });

    const maxKudCount = Math.max(...yearStats.map(y => y.kudCount), 1);
    const maxLuasHa = Math.max(...yearStats.map(y => y.luasHa), 1);

    const totalKudAll = yearStats.reduce((acc, y) => acc + y.kudCount, 0);
    const totalLuasAll = yearStats.reduce((acc, y) => acc + y.luasHa, 0);

    return {
      yearStats,
      maxKudCount,
      maxLuasHa,
      totalKudAll,
      totalLuasAll
    };
  }, [filteredKudList]);

  // 3. Calculations for Umur Tanam / Klasifikasi Umur Tanaman Sawit
  const plantAgeAnalysis = useMemo(() => {
    const currentYear = 2026;

    const ageCategories = [
      {
        id: 'TBM-1',
        title: 'TBM 1 (0 – 1 Tahun)',
        subtitle: 'Tanam Perdana Batch 2025–2026',
        color: 'bg-emerald-500',
        textColor: 'text-emerald-600 dark:text-emerald-400',
        bgColor: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/60',
        kudCount: 0,
        luasHa: 0,
        jumlahKk: 0
      },
      {
        id: 'TBM-2',
        title: 'TBM 2 (1 – 2 Tahun)',
        subtitle: 'Vegetatif Lanjutan Batch 2024',
        color: 'bg-teal-500',
        textColor: 'text-teal-600 dark:text-teal-400',
        bgColor: 'bg-teal-50 dark:bg-teal-950/40 border-teal-200 dark:border-teal-800/60',
        kudCount: 0,
        luasHa: 0,
        jumlahKk: 0
      },
      {
        id: 'TBM-3',
        title: 'TBM 3 (2 – 3 Tahun)',
        subtitle: 'Pra-Panen Batch 2023',
        color: 'bg-cyan-500',
        textColor: 'text-cyan-600 dark:text-cyan-400',
        bgColor: 'bg-cyan-50 dark:bg-cyan-950/40 border-cyan-200 dark:border-cyan-800/60',
        kudCount: 0,
        luasHa: 0,
        jumlahKk: 0
      },
      {
        id: 'TM-MUDA',
        title: 'TM Muda (3 – 5 Tahun)',
        subtitle: 'Tanaman Menghasilkan Batch 2021–2022',
        color: 'bg-green-600',
        textColor: 'text-green-700 dark:text-green-400',
        bgColor: 'bg-green-50 dark:bg-green-950/40 border-green-200 dark:border-green-800/60',
        kudCount: 0,
        luasHa: 0,
        jumlahKk: 0
      },
      {
        id: 'TM-DEWASA',
        title: 'TM Produktif (> 5 Tahun)',
        subtitle: 'Fase Panen Prima Batch ≤ 2020',
        color: 'bg-emerald-700',
        textColor: 'text-emerald-800 dark:text-emerald-300',
        bgColor: 'bg-emerald-100/70 dark:bg-emerald-900/30 border-emerald-300 dark:border-emerald-700/60',
        kudCount: 0,
        luasHa: 0,
        jumlahKk: 0
      },
      {
        id: 'PRA-TANAM',
        title: 'Pra-Tanam & Persiapan',
        subtitle: 'Chipping, Verifikasi & Rekomtek',
        color: 'bg-amber-500',
        textColor: 'text-amber-600 dark:text-amber-400',
        bgColor: 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/60',
        kudCount: 0,
        luasHa: 0,
        jumlahKk: 0
      }
    ];

    filteredKudList.forEach(k => {
      const isPrePlanting = 
        k.tahapanPsr.includes('Sosialisasi') || 
        k.tahapanPsr.includes('Verifikasi') || 
        k.tahapanPsr.includes('Rekomendasi') || 
        k.tahapanPsr.includes('Chipping') ||
        k.luasTanamHa === 0;

      if (isPrePlanting) {
        ageCategories[5].kudCount += 1;
        ageCategories[5].luasHa += k.luasRekomtekHa || k.targetLuasHa;
        ageCategories[5].jumlahKk += k.jumlahKk;
        return;
      }

      const batchYear = k.tahunTanamBatch;
      const age = currentYear - batchYear;

      if (age <= 1) {
        ageCategories[0].kudCount += 1;
        ageCategories[0].luasHa += k.luasTanamHa;
        ageCategories[0].jumlahKk += k.jumlahKk;
      } else if (age === 2) {
        ageCategories[1].kudCount += 1;
        ageCategories[1].luasHa += k.luasTanamHa;
        ageCategories[1].jumlahKk += k.jumlahKk;
      } else if (age === 3) {
        ageCategories[2].kudCount += 1;
        ageCategories[2].luasHa += k.luasTanamHa;
        ageCategories[2].jumlahKk += k.jumlahKk;
      } else if (age >= 4 && age <= 5) {
        ageCategories[3].kudCount += 1;
        ageCategories[3].luasHa += k.luasTanamHa;
        ageCategories[3].jumlahKk += k.jumlahKk;
      } else {
        ageCategories[4].kudCount += 1;
        ageCategories[4].luasHa += k.luasTanamHa;
        ageCategories[4].jumlahKk += k.jumlahKk;
      }
    });

    const totalLuasUmur = ageCategories.reduce((acc, c) => acc + c.luasHa, 0) || 1;
    const totalKudUmur = filteredKudList.length || 1;

    return ageCategories.map(c => ({
      ...c,
      pctLuas: (c.luasHa / totalLuasUmur) * 100,
      pctKud: (c.kudCount / totalKudUmur) * 100
    }));
  }, [filteredKudList]);

  // 4. Tahapan Siklus Funnel
  const tahapanStages = useMemo(() => {
    const stages = [
      { label: 'Sosialisasi & Usulan', count: 0, luas: 0, color: 'bg-slate-400' },
      { label: 'Verifikasi Berkas', count: 0, luas: 0, color: 'bg-blue-500' },
      { label: 'Rekomtek Ditjenbun', count: 0, luas: 0, color: 'bg-amber-500' },
      { label: 'Pencairan P1', count: 0, luas: 0, color: 'bg-orange-500' },
      { label: 'Land Clearing & Chipping', count: 0, luas: 0, color: 'bg-yellow-600' },
      { label: 'Tanam Perdana', count: 0, luas: 0, color: 'bg-emerald-500' },
      { label: 'Pemeliharaan TBM / P2', count: 0, luas: 0, color: 'bg-emerald-700' }
    ];

    filteredKudList.forEach(k => {
      if (k.tahapanPsr.includes('Sosialisasi')) { stages[0].count += 1; stages[0].luas += k.targetLuasHa; }
      else if (k.tahapanPsr.includes('Verifikasi')) { stages[1].count += 1; stages[1].luas += k.targetLuasHa; }
      else if (k.tahapanPsr.includes('Rekomendasi')) { stages[2].count += 1; stages[2].luas += k.luasRekomtekHa; }
      else if (k.tahapanPsr.includes('Tahap I')) { stages[3].count += 1; stages[3].luas += k.luasPencairanHa; }
      else if (k.tahapanPsr.includes('Chipping')) { stages[4].count += 1; stages[4].luas += k.luasPencairanHa; }
      else if (k.tahapanPsr.includes('Tanam')) { stages[5].count += 1; stages[5].luas += k.luasTanamHa; }
      else { stages[6].count += 1; stages[6].luas += k.luasTanamHa; }
    });

    return stages;
  }, [filteredKudList]);

  return (
    <div className="space-y-4">
      {/* ========================================================= */}
      {/* 1. KOTAK METRIK UTAMA: TOTAL LUASAN, KUD, PETANI & DANA */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Metric 1: Jumlah Total Luasan */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
                <LandPlot className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Total Luasan PSR
                </span>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                  Rekomtek & Realisasi
                </span>
              </div>
            </div>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300">
              {formatNumber(kpiMetrics.persenTanamVsRekomtek, 1)}% Tanam
            </span>
          </div>

          <div className="my-2.5">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                {formatNumber(kpiMetrics.totalLuasRekomtekHa, 2)}
              </span>
              <span className="text-sm font-bold text-slate-500">Ha</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Total Luas Rekomtek Ditjenbun Disetujui
            </p>
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1 text-[11px]">
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Realisasi Tanam Fisik:</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">{formatHectare(kpiMetrics.totalLuasTanamHa)}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Target Usulan Awal:</span>
              <span className="font-semibold">{formatHectare(kpiMetrics.totalTargetLuasHa)}</span>
            </div>
          </div>
        </div>

        {/* Metric 2: Jumlah KUD / Kelembagaan */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Jumlah Entitas KUD
                </span>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                  Kelembagaan Petani
                </span>
              </div>
            </div>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300">
              Aktif
            </span>
          </div>

          <div className="my-2.5">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                {formatNumber(kpiMetrics.totalKudCount)}
              </span>
              <span className="text-sm font-bold text-slate-500">KUD/Gapoktan</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Koperasi Unit Desa & Kelompok Tani Mitra
            </p>
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1 text-[11px]">
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Cakupan Regional:</span>
              <span className="font-bold text-blue-600 dark:text-blue-400">7 Regional PTPN IV</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Status Legalitas:</span>
              <span className="font-semibold text-emerald-600">100% Terverifikasi</span>
            </div>
          </div>
        </div>

        {/* Metric 3: Jumlah Petani (KK) */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-teal-100 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Jumlah Petani Mitra
                </span>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                  Kepala Keluarga (KK)
                </span>
              </div>
            </div>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-teal-50 dark:bg-teal-950/70 text-teal-700 dark:text-teal-300">
              Penerima Manfaat
            </span>
          </div>

          <div className="my-2.5">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                {formatNumber(kpiMetrics.totalJumlahKk)}
              </span>
              <span className="text-sm font-bold text-slate-500">KK Petani</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Pekebun Sawit Rakyat Peserta Program
            </p>
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1 text-[11px]">
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Rerata Luas per KK:</span>
              <span className="font-bold text-teal-600 dark:text-teal-400">
                {kpiMetrics.totalJumlahKk > 0 ? (kpiMetrics.totalLuasRekomtekHa / kpiMetrics.totalJumlahKk).toFixed(2) : '0,00'} Ha/KK
              </span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Rerata Petani per KUD:</span>
              <span className="font-semibold">
                {kpiMetrics.totalKudCount > 0 ? Math.round(kpiMetrics.totalJumlahKk / kpiMetrics.totalKudCount) : 0} KK/KUD
              </span>
            </div>
          </div>
        </div>

        {/* Metric 4: Nilai Pencairan Dana */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-400">
                <Banknote className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Nilai Pencairan Dana
                </span>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                  Hibah BPDPKS & Escrow
                </span>
              </div>
            </div>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-orange-50 dark:bg-orange-950/70 text-orange-700 dark:text-orange-300">
              {formatNumber(kpiMetrics.persenPencairanVsRekomtek, 1)}% Cair
            </span>
          </div>

          <div className="my-2.5">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight truncate">
                {formatIDR(kpiMetrics.totalNilaiPencairanRp)}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Total Dana Tersalurkan ke Rekening Escrow
            </p>
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1 text-[11px]">
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Luas Lahan Cair:</span>
              <span className="font-bold text-orange-600 dark:text-orange-400">{formatHectare(kpiMetrics.totalLuasPencairanHa)}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Tarif Bantuan:</span>
              <span className="font-semibold">Rp 30 Jt / 60 Jt / 25 Jt / Ha</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. GRAFIK TAHUN PEROLEHAN KEMITRAAN KUD (TAHUN PEROLEHAN / MoU)           */}
      {/* ========================================================================= */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 uppercase tracking-tight flex items-center gap-2">
                <span>Grafik Tahun Perolehan Kemitraan KUD</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-mono font-bold">
                  2018 – 2026
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Tren tahun akuisisi kemitraan KUD, total luasan yang diperoleh, serta model kemitraannya
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {filters.tahunPerolehan !== 'ALL' && (
              <button
                onClick={() => setFilter('tahunPerolehan', 'ALL')}
                className="text-xs px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 font-bold hover:bg-emerald-200 cursor-pointer flex items-center gap-1"
              >
                <span>Filter: Tahun {filters.tahunPerolehan}</span>
                <span className="text-xs">✕ Reset</span>
              </button>
            )}

            <div className="flex items-center gap-3 text-xs font-semibold">
              <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                <span className="w-2.5 h-2.5 rounded-xs bg-blue-500" />
                Offtaker
              </span>
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                <span className="w-2.5 h-2.5 rounded-xs bg-emerald-600" />
                Kemitraan
              </span>
              <span className="flex items-center gap-1 text-purple-600 dark:text-purple-400">
                <span className="w-2.5 h-2.5 rounded-xs bg-purple-500" />
                Revitbun
              </span>
            </div>
          </div>
        </div>

        {/* Interactive Visual Bar Chart per Year */}
        <div className="pt-2">
          <div className="grid grid-cols-9 gap-1.5 sm:gap-3 items-end min-h-[220px] pb-2 border-b border-slate-200 dark:border-slate-800">
            {tahunPerolehanAnalysis.yearStats.map((item) => {
              const isSelected = filters.tahunPerolehan === item.year.toString();
              const isHovered = hoveredYear === item.year;
              const heightPercent = Math.max(12, (item.kudCount / tahunPerolehanAnalysis.maxKudCount) * 100);

              const offtakerPct = item.kudCount > 0 ? (item.offtakerCount / item.kudCount) * 100 : 0;
              const kemitraanPct = item.kudCount > 0 ? (item.kemitraanCount / item.kudCount) * 100 : 0;
              const revitbunPct = item.kudCount > 0 ? (item.revitbunCount / item.kudCount) * 100 : 0;

              return (
                <div
                  key={item.year}
                  onMouseEnter={() => setHoveredYear(item.year)}
                  onMouseLeave={() => setHoveredYear(null)}
                  onClick={() => {
                    if (isSelected) {
                      setFilter('tahunPerolehan', 'ALL');
                    } else {
                      setFilter('tahunPerolehan', item.year.toString());
                    }
                  }}
                  className="flex flex-col items-center justify-end h-full group cursor-pointer relative"
                >
                  {/* Tooltip on Hover */}
                  {(isHovered || isSelected) && (
                    <div className="absolute -top-24 z-20 bg-slate-900 text-white p-2.5 rounded-lg shadow-xl text-left text-[11px] whitespace-nowrap min-w-[170px] border border-slate-700 animate-in fade-in zoom-in-95 pointer-events-none">
                      <div className="font-bold text-emerald-400 border-b border-slate-700 pb-1 mb-1 flex justify-between">
                        <span>Tahun Perolehan {item.year}</span>
                        <span>{item.kudCount} KUD</span>
                      </div>
                      <div className="space-y-0.5 text-slate-300">
                        <div className="flex justify-between">
                          <span>Luasan Diperoleh:</span>
                          <span className="font-semibold text-white">{formatHectare(item.luasHa)}</span>
                        </div>
                        <div className="flex justify-between text-[10px]">
                          <span className="text-blue-400">Offtaker:</span>
                          <span>{item.offtakerCount} KUD</span>
                        </div>
                        <div className="flex justify-between text-[10px]">
                          <span className="text-emerald-400">Kemitraan:</span>
                          <span>{item.kemitraanCount} KUD</span>
                        </div>
                        <div className="flex justify-between text-[10px]">
                          <span className="text-purple-400">Revitbun:</span>
                          <span>{item.revitbunCount} KUD</span>
                        </div>
                        <div className="flex justify-between pt-1 border-t border-slate-800 text-[10px] text-orange-300">
                          <span>Nilai Cair:</span>
                          <span>{formatIDR(item.danaRp)}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Value Badge on top of column */}
                  <span className={`text-[10px] font-bold mb-1 transition-colors ${
                    isSelected ? 'text-emerald-600 dark:text-emerald-400 font-extrabold scale-110' : 'text-slate-600 dark:text-slate-400'
                  }`}>
                    {item.kudCount}
                  </span>

                  {/* Stacked Bar Container */}
                  <div
                    className={`w-full max-w-[48px] rounded-t-lg overflow-hidden flex flex-col justify-end transition-all duration-300 ${
                      isSelected
                        ? 'ring-2 ring-emerald-500 shadow-md scale-105'
                        : isHovered
                        ? 'opacity-95 shadow-sm'
                        : 'opacity-85 hover:opacity-100'
                    }`}
                    style={{ height: `${heightPercent}%` }}
                  >
                    {/* Stack segment: Revitbun */}
                    {item.revitbunCount > 0 && (
                      <div 
                        className="w-full bg-purple-500 hover:bg-purple-600 transition-colors"
                        style={{ height: `${revitbunPct}%` }}
                        title={`Revitbun: ${item.revitbunCount} KUD`}
                      />
                    )}
                    {/* Stack segment: Kemitraan */}
                    {item.kemitraanCount > 0 && (
                      <div 
                        className="w-full bg-emerald-600 hover:bg-emerald-700 transition-colors"
                        style={{ height: `${kemitraanPct}%` }}
                        title={`Kemitraan: ${item.kemitraanCount} KUD`}
                      />
                    )}
                    {/* Stack segment: Offtaker */}
                    {item.offtakerCount > 0 && (
                      <div 
                        className="w-full bg-blue-500 hover:bg-blue-600 transition-colors"
                        style={{ height: `${offtakerPct}%` }}
                        title={`Offtaker: ${item.offtakerCount} KUD`}
                      />
                    )}
                  </div>

                  {/* Year Label */}
                  <div className="mt-2 text-center">
                    <span className={`text-[10px] sm:text-xs font-bold block ${
                      isSelected 
                        ? 'text-emerald-700 dark:text-emerald-400 underline underline-offset-2' 
                        : 'text-slate-700 dark:text-slate-300'
                    }`}>
                      {item.year}
                    </span>
                    <span className="text-[9px] text-slate-400 hidden sm:block">
                      {formatNumber(item.luasHa, 0)} Ha
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Chart Footer Info */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2.5 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                Total Perolehan:
              </span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                {tahunPerolehanAnalysis.totalKudAll} KUD ({formatHectare(tahunPerolehanAnalysis.totalLuasAll)})
              </span>
            </div>
            <span className="text-[11px] text-slate-400">
              *Klik pada salah satu batang tahun untuk memfilter data monitoring KUD secara langsung
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. ANALISIS MODEL KEMITRAAN (OFFTAKER, KEMITRAAN, REVITBUN)               */}
      {/* ========================================================================= */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center">
              <Handshake className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 uppercase tracking-tight">
                Persentase & Komposisi Model Kemitraan PSR
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Proporsi 4 Model Kemitraan Resmi PTPN IV: Offtaker, Kemitraan, Revitbun, dan Konversi Karet
              </p>
            </div>
          </div>

          {filters.statusKemitraan !== 'ALL' && (
            <button
              onClick={() => setFilter('statusKemitraan', 'ALL')}
              className="text-xs px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 font-bold hover:bg-emerald-200 cursor-pointer self-start flex items-center gap-1"
            >
              <span>Filter: {filters.statusKemitraan}</span>
              <span className="text-xs">✕ Reset</span>
            </button>
          )}
        </div>

        {/* 3-Segment Visual Comparison Split Ratio Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs font-bold flex-wrap gap-2">
            <span className="text-blue-700 dark:text-blue-400 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              Offtaker ({partnershipAnalysis.offtaker.pctLuas.toFixed(1)}% Luas | {partnershipAnalysis.offtaker.pctKud.toFixed(1)}% KUD)
            </span>
            <span className="text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
              Kemitraan ({partnershipAnalysis.kemitraan.pctLuas.toFixed(1)}% Luas | {partnershipAnalysis.kemitraan.pctKud.toFixed(1)}% KUD)
            </span>
            <span className="text-purple-700 dark:text-purple-400 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
              Revitbun ({partnershipAnalysis.revitbun.pctLuas.toFixed(1)}% Luas | {partnershipAnalysis.revitbun.pctKud.toFixed(1)}% KUD)
            </span>
            <span className="text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              Konversi Karet ({partnershipAnalysis.konversiKaret.pctLuas.toFixed(1)}% Luas | {partnershipAnalysis.konversiKaret.pctKud.toFixed(1)}% KUD)
            </span>
          </div>

          {/* 4-Segment Split Ratio Bar */}
          <div className="w-full h-4 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex p-0.5 gap-0.5">
            <div 
              className="h-full bg-blue-500 rounded-l-full transition-all duration-700 hover:opacity-90 cursor-pointer"
              style={{ width: `${Math.max(partnershipAnalysis.offtaker.pctLuas, 2)}%` }}
              onClick={() => setFilter('statusKemitraan', 'Offtaker')}
              title={`Offtaker: ${partnershipAnalysis.offtaker.luas.toFixed(2)} Ha`}
            />
            <div 
              className="h-full bg-emerald-600 transition-all duration-700 hover:opacity-90 cursor-pointer"
              style={{ width: `${Math.max(partnershipAnalysis.kemitraan.pctLuas, 2)}%` }}
              onClick={() => setFilter('statusKemitraan', 'Kemitraan')}
              title={`Kemitraan: ${partnershipAnalysis.kemitraan.luas.toFixed(2)} Ha`}
            />
            <div 
              className="h-full bg-purple-500 transition-all duration-700 hover:opacity-90 cursor-pointer"
              style={{ width: `${Math.max(partnershipAnalysis.revitbun.pctLuas, 2)}%` }}
              onClick={() => setFilter('statusKemitraan', 'Revitbun')}
              title={`Revitbun: ${partnershipAnalysis.revitbun.luas.toFixed(2)} Ha`}
            />
            <div 
              className="h-full bg-amber-500 rounded-r-full transition-all duration-700 hover:opacity-90 cursor-pointer"
              style={{ width: `${Math.max(partnershipAnalysis.konversiKaret.pctLuas, 2)}%` }}
              onClick={() => setFilter('statusKemitraan', 'Konversi Karet')}
              title={`Konversi Karet: ${partnershipAnalysis.konversiKaret.luas.toFixed(2)} Ha`}
            />
          </div>
        </div>

        {/* Detailed 4 Comparison Cards (Offtaker, Kemitraan, Revitbun, Konversi Karet) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
          {/* Card A: Offtaker */}
          <div 
            onClick={() => setFilter('statusKemitraan', filters.statusKemitraan === 'Offtaker' ? 'ALL' : 'Offtaker')}
            className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
              filters.statusKemitraan === 'Offtaker'
                ? 'bg-blue-50/90 dark:bg-blue-950/40 border-blue-500 ring-2 ring-blue-500/40 shadow-sm'
                : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-blue-400'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    Offtaker
                  </h4>
                </div>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 font-mono">
                  {partnershipAnalysis.offtaker.pctLuas.toFixed(1)}% Luas
                </span>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 leading-relaxed">
                KUD mengelola operasional kebun mandiri dengan kepastian pasokan & pembelian TBS oleh PKS PalmCo.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-200/80 dark:border-slate-700/80">
              <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Total Luasan</span>
                <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                  {formatHectare(partnershipAnalysis.offtaker.luas)}
                </span>
                <span className="text-[10px] text-emerald-600 block mt-0.5">
                  Tanam: {formatHectare(partnershipAnalysis.offtaker.tanam)}
                </span>
              </div>

              <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">KUD & Petani</span>
                <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                  {partnershipAnalysis.offtaker.count} KUD
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">
                  {formatNumber(partnershipAnalysis.offtaker.kk)} KK
                </span>
              </div>

              <div className="col-span-2 p-2 rounded bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <span className="text-[11px] text-slate-500">Nilai Cair:</span>
                <span className="font-bold text-blue-600 dark:text-blue-400 text-xs">
                  {formatIDR(partnershipAnalysis.offtaker.dana)}
                </span>
              </div>
            </div>
          </div>

          {/* Card B: Kemitraan */}
          <div 
            onClick={() => setFilter('statusKemitraan', filters.statusKemitraan === 'Kemitraan' ? 'ALL' : 'Kemitraan')}
            className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
              filters.statusKemitraan === 'Kemitraan'
                ? 'bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-500/40 shadow-sm'
                : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-emerald-400'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-600" />
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    Kemitraan
                  </h4>
                </div>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-mono">
                  {partnershipAnalysis.kemitraan.pctLuas.toFixed(1)}% Luas
                </span>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 leading-relaxed">
                Single Management dengan pendampingan teknis, kultur teknis, dan agronomi standar PTPN IV.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-200/80 dark:border-slate-700/80">
              <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Total Luasan</span>
                <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                  {formatHectare(partnershipAnalysis.kemitraan.luas)}
                </span>
                <span className="text-[10px] text-emerald-600 block mt-0.5">
                  Tanam: {formatHectare(partnershipAnalysis.kemitraan.tanam)}
                </span>
              </div>

              <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">KUD & Petani</span>
                <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                  {partnershipAnalysis.kemitraan.count} KUD
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">
                  {formatNumber(partnershipAnalysis.kemitraan.kk)} KK
                </span>
              </div>

              <div className="col-span-2 p-2 rounded bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <span className="text-[11px] text-slate-500">Nilai Cair:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 text-xs">
                  {formatIDR(partnershipAnalysis.kemitraan.dana)}
                </span>
              </div>
            </div>
          </div>

          {/* Card C: Revitbun */}
          <div 
            onClick={() => setFilter('statusKemitraan', filters.statusKemitraan === 'Revitbun' ? 'ALL' : 'Revitbun')}
            className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
              filters.statusKemitraan === 'Revitbun'
                ? 'bg-purple-50/90 dark:bg-purple-950/40 border-purple-500 ring-2 ring-purple-500/40 shadow-sm'
                : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-purple-400'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500" />
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    Revitbun
                  </h4>
                </div>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 font-mono">
                  {partnershipAnalysis.revitbun.pctLuas.toFixed(1)}% Luas
                </span>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 leading-relaxed">
                Revitalisasi kebun rakyat intensif, pemulihan produktivitas, dan bibit bersertifikat DxP.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-200/80 dark:border-slate-700/80">
              <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Total Luasan</span>
                <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                  {formatHectare(partnershipAnalysis.revitbun.luas)}
                </span>
                <span className="text-[10px] text-purple-600 block mt-0.5">
                  Tanam: {formatHectare(partnershipAnalysis.revitbun.tanam)}
                </span>
              </div>

              <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">KUD & Petani</span>
                <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                  {partnershipAnalysis.revitbun.count} KUD
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">
                  {formatNumber(partnershipAnalysis.revitbun.kk)} KK
                </span>
              </div>

              <div className="col-span-2 p-2 rounded bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <span className="text-[11px] text-slate-500">Nilai Cair:</span>
                <span className="font-bold text-purple-600 dark:text-purple-400 text-xs">
                  {formatIDR(partnershipAnalysis.revitbun.dana)}
                </span>
              </div>
            </div>
          </div>

          {/* Card D: Konversi Karet */}
          <div 
            onClick={() => setFilter('statusKemitraan', filters.statusKemitraan === 'Konversi Karet' ? 'ALL' : 'Konversi Karet')}
            className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
              filters.statusKemitraan === 'Konversi Karet'
                ? 'bg-amber-50/90 dark:bg-amber-950/40 border-amber-500 ring-2 ring-amber-500/40 shadow-sm'
                : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-amber-400'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    Konversi Karet
                  </h4>
                </div>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-mono">
                  {partnershipAnalysis.konversiKaret.pctLuas.toFixed(1)}% Luas
                </span>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 leading-relaxed">
                Alih komoditi perkebunan dari eksisting tanaman karet rakyat menjadi perkebunan kelapa sawit produktif.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-200/80 dark:border-slate-700/80">
              <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Total Luasan</span>
                <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                  {formatHectare(partnershipAnalysis.konversiKaret.luas)}
                </span>
                <span className="text-[10px] text-amber-600 block mt-0.5">
                  Tanam: {formatHectare(partnershipAnalysis.konversiKaret.tanam)}
                </span>
              </div>

              <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">KUD & Petani</span>
                <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                  {partnershipAnalysis.konversiKaret.count} KUD
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">
                  {formatNumber(partnershipAnalysis.konversiKaret.kk)} KK
                </span>
              </div>

              <div className="col-span-2 p-2 rounded bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <span className="text-[11px] text-slate-500">Nilai Cair:</span>
                <span className="font-bold text-amber-600 dark:text-amber-400 text-xs">
                  {formatIDR(partnershipAnalysis.konversiKaret.dana)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. PERSENTASE UMUR TANAM SAWIT & PROFIL PRODUKTIVITAS */}
      {/* ========================================================================= */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center">
              <TreePine className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 uppercase tracking-tight">
                Persentase Umur Tanam & Klasifikasi Tanaman Sawit
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Distribusi Fase Tanaman Belum Menghasilkan (TBM 1-3) & Tanaman Menghasilkan (TM)
              </p>
            </div>
          </div>

          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Total Lahan Terdata: <span className="font-bold text-emerald-600 dark:text-emerald-400">{formatHectare(kpiMetrics.totalLuasRekomtekHa)}</span>
          </div>
        </div>

        {/* Umur Tanam Visual Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {plantAgeAnalysis.map((ageItem) => (
            <div
              key={ageItem.id}
              className={`p-3.5 rounded-xl border transition-all flex flex-col justify-between ${ageItem.bgColor}`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${ageItem.color}`} />
                    <span className="font-bold text-xs text-slate-900 dark:text-white">
                      {ageItem.title}
                    </span>
                  </div>
                  <span className={`text-xs font-black px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 shadow-2xs ${ageItem.textColor}`}>
                    {ageItem.pctLuas.toFixed(1)}%
                  </span>
                </div>

                <p className="text-[10px] text-slate-500 dark:text-slate-400 mb-2.5">
                  {ageItem.subtitle}
                </p>
              </div>

              <div className="space-y-2">
                {/* Visual Progress Bar */}
                <div className="w-full bg-slate-200/80 dark:bg-slate-700/80 h-2 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${ageItem.color}`}
                    style={{ width: `${Math.max(ageItem.pctLuas, ageItem.luasHa > 0 ? 3 : 0)}%` }}
                  />
                </div>

                <div className="flex justify-between items-center text-xs pt-1 border-t border-slate-200/60 dark:border-slate-800/60">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Total Luasan</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {formatHectare(ageItem.luasHa)}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block font-medium">KUD & Petani</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      {ageItem.kudCount} KUD <span className="text-slate-400 font-normal">({formatNumber(ageItem.jumlahKk)} KK)</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. PIPELINE SIKLUS TAHAPAN PSR (END-TO-END TRACKING PROGRESS) */}
      {/* ========================================================================= */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
            <h4 className="font-bold text-xs text-slate-900 dark:text-slate-100 uppercase tracking-tight">
              Pipeline Progres Tahapan Siklus PSR PTPN IV
            </h4>
          </div>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
            End-to-End Tracking Usulan hingga Pemeliharaan TBM
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 pt-1">
          {tahapanStages.map((stage, idx) => (
            <div 
              key={idx}
              className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] font-bold text-slate-400 uppercase">
                    Tahap 0{idx + 1}
                  </span>
                  <div className={`w-1.5 h-1.5 rounded-full ${stage.color}`} />
                </div>
                <div className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-tight mb-1.5 min-h-[28px]">
                  {stage.label}
                </div>
              </div>

              <div className="pt-1.5 border-t border-slate-200/60 dark:border-slate-700/60">
                <div className="text-base font-bold text-slate-800 dark:text-white">
                  {stage.count} <span className="text-[10px] font-normal text-slate-500">KUD</span>
                </div>
                <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold truncate">
                  {formatHectare(stage.luas)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
