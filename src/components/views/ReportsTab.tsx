import React, { useState, useMemo } from 'react';
import { usePsr } from '../../context/PsrContext';
import { formatHectare, formatIDR, formatNumber } from '../../lib/utils';
import { KudRecord, RegionalType } from '../../types/psr';
import { 
  FileText, 
  Download, 
  Printer, 
  Building2, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  Sprout, 
  Banknote,
  Users2,
  Calendar,
  LandPlot,
  Layers,
  FileCheck2,
  Filter,
  Eye,
  Settings2,
  ChevronDown
} from 'lucide-react';

export const ReportsTab: React.FC = () => {
  const { 
    filteredKudList, 
    kudList, 
    kpiMetrics, 
    filters, 
    setIsExportModalOpen, 
    activeRole,
    showNotification
  } = usePsr();

  // Report configuration state
  const [reportScope, setReportScope] = useState<'filtered' | 'all'>('filtered');
  const [includeKudDetails, setIncludeKudDetails] = useState<boolean>(true);
  const [documentNo, setDocumentNo] = useState<string>('MEMO-PSR/PTPN4/2026/BOD-08');
  const [reportDate, setReportDate] = useState<string>(
    new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
  );

  // Active dataset based on scope
  const activeDataset = useMemo(() => {
    return reportScope === 'filtered' ? filteredKudList : kudList;
  }, [reportScope, filteredKudList, kudList]);

  // Recalculate metrics for the selected scope
  const currentMetrics = useMemo(() => {
    let targetLuas = 0;
    let luasRekomtek = 0;
    let luasPencairan = 0;
    let luasTanam = 0;
    let totalDana = 0;
    let totalKk = 0;
    let totalFisik = 0;

    activeDataset.forEach(k => {
      targetLuas += k.targetLuasHa || 0;
      luasRekomtek += k.luasRekomtekHa || 0;
      luasPencairan += k.luasPencairanHa || 0;
      luasTanam += k.luasTanamHa || 0;
      totalDana += k.totalNilaiPencairan || 0;
      totalKk += k.jumlahKk || 0;
      totalFisik += k.progresFisikPersen || 0;
    });

    const totalKud = activeDataset.length;
    const avgFisik = totalKud > 0 ? totalFisik / totalKud : 0;
    const pctRekomtek = targetLuas > 0 ? (luasRekomtek / targetLuas) * 100 : 0;
    const pctTanam = luasRekomtek > 0 ? (luasTanam / luasRekomtek) * 100 : 0;
    const pctDana = luasRekomtek > 0 ? (luasPencairan / luasRekomtek) * 100 : 0;

    return {
      totalKud,
      targetLuas,
      luasRekomtek,
      luasPencairan,
      luasTanam,
      totalDana,
      totalKk,
      avgFisik,
      pctRekomtek,
      pctTanam,
      pctDana
    };
  }, [activeDataset]);

  // Regional breakdown
  const regionalBreakdown = useMemo(() => {
    const regionals: RegionalType[] = [
      'Regional 1',
      'Regional 2',
      'Regional 3',
      'Regional 4',
      'Regional 5',
      'Regional 6',
      'Regional 7'
    ];

    return regionals.map(reg => {
      const kudInReg = activeDataset.filter(k => k.regional === reg);
      const kudCount = kudInReg.length;
      const targetLuas = kudInReg.reduce((sum, k) => sum + k.targetLuasHa, 0);
      const luasRekomtek = kudInReg.reduce((sum, k) => sum + k.luasRekomtekHa, 0);
      const luasTanam = kudInReg.reduce((sum, k) => sum + k.luasTanamHa, 0);
      const totalDana = kudInReg.reduce((sum, k) => sum + k.totalNilaiPencairan, 0);
      const totalKk = kudInReg.reduce((sum, k) => sum + k.jumlahKk, 0);
      const pctTanam = luasRekomtek > 0 ? (luasTanam / luasRekomtek) * 100 : 0;

      return {
        regional: reg,
        kudCount,
        targetLuas,
        luasRekomtek,
        luasTanam,
        totalDana,
        totalKk,
        pctTanam
      };
    });
  }, [activeDataset]);

  // Partnership model analysis
  const partnershipBreakdown = useMemo(() => {
    const models: ('Offtaker' | 'Kemitraan' | 'Revitbun')[] = ['Offtaker', 'Kemitraan', 'Revitbun'];
    const totalLuas = currentMetrics.luasRekomtek || 1;
    const totalKud = currentMetrics.totalKud || 1;

    return models.map(model => {
      const kudInModel = activeDataset.filter(k => k.statusKemitraan === model);
      const count = kudInModel.length;
      const luasRekomtek = kudInModel.reduce((sum, k) => sum + k.luasRekomtekHa, 0);
      const luasTanam = kudInModel.reduce((sum, k) => sum + k.luasTanamHa, 0);
      const totalDana = kudInModel.reduce((sum, k) => sum + k.totalNilaiPencairan, 0);
      const totalKk = kudInModel.reduce((sum, k) => sum + k.jumlahKk, 0);

      return {
        model,
        count,
        luasRekomtek,
        luasTanam,
        totalDana,
        totalKk,
        pctLuas: (luasRekomtek / totalLuas) * 100,
        pctKud: (count / totalKud) * 100
      };
    });
  }, [activeDataset, currentMetrics]);

  // Tahun Perolehan Breakdown
  const tahunBreakdown = useMemo(() => {
    const years = [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];
    return years.map(yr => {
      const kudInYear = activeDataset.filter(k => k.tahunPerolehan === yr);
      return {
        year: yr,
        count: kudInYear.length,
        luasHa: kudInYear.reduce((sum, k) => sum + k.luasRekomtekHa, 0),
        danaRp: kudInYear.reduce((sum, k) => sum + k.totalNilaiPencairan, 0),
        totalKk: kudInYear.reduce((sum, k) => sum + k.jumlahKk, 0)
      };
    }).filter(y => y.count > 0);
  }, [activeDataset]);

  // Handle direct print / Save as PDF
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-5 pb-16 max-w-5xl mx-auto">
      {/* ========================================================================= */}
      {/* TOP CONTROLS & PRINT ACTION BAR (HIDDEN IN PRINT / PDF)                  */}
      {/* ========================================================================= */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3 print:hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Laporan Eksekutif Dewan Direksi (BOD PSR Report)</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Format dokumen resmi siap cetak / simpan sebagai PDF untuk Direktur Utama & Jajaran Direksi PTPN IV PalmCo
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              id="btn-print-report"
              onClick={handlePrint}
              className="px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-2 shadow-xs hover:shadow transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Simpan PDF (A4)</span>
            </button>

            <button
              onClick={() => setIsExportModalOpen(true)}
              className="px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Ekspor CSV</span>
            </button>
          </div>
        </div>

        {/* Report Options Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
              Cakupan Data Dokumen:
            </label>
            <select
              value={reportScope}
              onChange={(e) => setReportScope(e.target.value as 'filtered' | 'all')}
              className="w-full text-xs py-1.5 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold"
            >
              <option value="filtered">Data Sesuai Filter Aktif ({filteredKudList.length} KUD)</option>
              <option value="all">Seluruh Data Portofolio ({kudList.length} KUD)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
              Format Kelengkapan Laporan:
            </label>
            <select
              value={includeKudDetails ? 'full' : 'summary'}
              onChange={(e) => setIncludeKudDetails(e.target.value === 'full')}
              className="w-full text-xs py-1.5 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold"
            >
              <option value="full">Lengkap (Ringkasan Eksekutif + Lampiran KUD)</option>
              <option value="summary">Hanya Ringkasan Eksekutif Direksi (BOD Memo)</option>
            </select>
          </div>

          <div className="flex items-end">
            <div className="w-full p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-[11px] text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>Layout telah dioptimalkan untuk cetakan <strong>A4 Portrait</strong> tanpa terpotong.</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PRINTABLE OFFICIAL BOD REPORT DOCUMENT SHEET                             */}
      {/* ========================================================================= */}
      <div 
        id="official-bod-report"
        className="print-document-sheet bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-10 shadow-sm space-y-6 text-slate-900 dark:text-slate-100"
      >
        {/* ===================================================================== */}
        {/* 1. KOP SURAT RESMI PTPN IV (OFFICIAL LETTERHEAD)                      */}
        {/* ===================================================================== */}
        <div className="border-b-2 border-emerald-800 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-800 via-emerald-900 to-emerald-950 text-white flex items-center justify-center font-black text-xl shadow-md border border-emerald-700">
              🌴 IV
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-black uppercase tracking-wider text-emerald-950 dark:text-emerald-300 leading-tight">
                PT PERKEBUNAN NUSANTARA IV (PERSERO)
              </h1>
              <p className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wide">
                SUB-HOLDING PALMCO • DIVISI KEMITRAAN & PEREMAJAAN SAWIT RAKYAT (PSR)
              </p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">
                Gedung Agro Plaza, Jl. HR. Rasuna Said Kav. X-2 No. 1, Jakarta Selatan / Kantor Direksi Jl. Letjen Suprapto No. 2 Medan
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right text-xs shrink-0">
            <div className="font-mono font-bold text-emerald-800 dark:text-emerald-300 text-xs">
              {documentNo}
            </div>
            <div className="text-[11px] text-slate-600 dark:text-slate-400 font-medium">
              Tanggal: {reportDate}
            </div>
            <div className="text-[10px] font-bold px-2 py-0.5 mt-1 rounded bg-red-100 text-red-800 inline-block">
              KLASIFIKASI: RAHASIA / DIREKSI
            </div>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* 2. MEMO HEADER (METADATA DISTRIBUSI & PERIHAL)                         */}
        {/* ===================================================================== */}
        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-1.5">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
            <span className="font-bold text-slate-500">Kepada:</span>
            <span className="sm:col-span-3 font-bold text-slate-900 dark:text-white">
              Board of Directors (BOD) PT Perkebunan Nusantara IV PalmCo
            </span>

            <span className="font-bold text-slate-500">Dari:</span>
            <span className="sm:col-span-3 font-semibold text-slate-800 dark:text-slate-200">
              Tim Satgas Percepatan Kemitraan & Peremajaan Sawit Rakyat (PSR) PalmCo
            </span>

            <span className="font-bold text-slate-500">Perihal:</span>
            <span className="sm:col-span-3 font-bold text-emerald-800 dark:text-emerald-400 leading-relaxed">
              Laporan Eksekutif Capaian Realisasi Rekomtek Ditjenbun, Realisasi Tanam Fisik, dan Penyerapan Dana Hibah BPDPKS Program PSR
            </span>

            <span className="font-bold text-slate-500">Cakupan Data:</span>
            <span className="sm:col-span-3 text-slate-700 dark:text-slate-300">
              {reportScope === 'filtered' 
                ? `Portofolio Terfilter (${currentMetrics.totalKud} KUD / Kelompok Tani)` 
                : `Seluruh Portofolio Nasional PTPN IV (${currentMetrics.totalKud} KUD / Kelompok Tani)`}
            </span>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* 3. BAGIAN I: RINGKASAN KINERJA UTAMA (EXECUTIVE SUMMARY KPI)           */}
        {/* ===================================================================== */}
        <div className="report-section space-y-3">
          <div className="flex items-center justify-between border-b-2 border-slate-200 dark:border-slate-700 pb-1.5">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <span>I. Ringkasan Kinerja Utama (Executive Key Performance Indicators)</span>
            </h3>
            <span className="text-[10px] font-mono text-slate-400">Status Data: Terverifikasi</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* KPI 1 */}
            <div className="p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/60 dark:bg-emerald-950/30">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Total Luas Rekomtek</span>
              <div className="flex items-baseline gap-1 my-1">
                <span className="text-xl font-black text-emerald-900 dark:text-emerald-300">
                  {formatNumber(currentMetrics.luasRekomtek, 2)}
                </span>
                <span className="text-xs font-bold text-emerald-700">Ha</span>
              </div>
              <span className="text-[10px] text-slate-600 dark:text-slate-400 block">
                {currentMetrics.pctRekomtek.toFixed(1)}% dari Target Usulan ({formatHectare(currentMetrics.targetLuas)})
              </span>
            </div>

            {/* KPI 2 */}
            <div className="p-3.5 rounded-xl border border-teal-200 dark:border-teal-800 bg-teal-50/60 dark:bg-teal-950/30">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Realisasi Tanam Fisik</span>
              <div className="flex items-baseline gap-1 my-1">
                <span className="text-xl font-black text-teal-900 dark:text-teal-300">
                  {formatNumber(currentMetrics.luasTanam, 2)}
                </span>
                <span className="text-xs font-bold text-teal-700">Ha</span>
              </div>
              <span className="text-[10px] text-slate-600 dark:text-slate-400 block">
                {currentMetrics.pctTanam.toFixed(1)}% dari Luas Rekomtek
              </span>
            </div>

            {/* KPI 3 */}
            <div className="p-3.5 rounded-xl border border-orange-200 dark:border-orange-800 bg-orange-50/60 dark:bg-orange-950/30">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Dana BPDPKS Tersalurkan</span>
              <div className="my-1">
                <span className="text-lg font-black text-orange-900 dark:text-orange-300 block truncate">
                  {formatIDR(currentMetrics.totalDana)}
                </span>
              </div>
              <span className="text-[10px] text-slate-600 dark:text-slate-400 block">
                Lahan Cair: {formatHectare(currentMetrics.luasPencairan)} ({currentMetrics.pctDana.toFixed(1)}%)
              </span>
            </div>

            {/* KPI 4 */}
            <div className="p-3.5 rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50/60 dark:bg-blue-950/30">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Penerima Manfaat</span>
              <div className="flex items-baseline gap-1 my-1">
                <span className="text-xl font-black text-blue-900 dark:text-blue-300">
                  {formatNumber(currentMetrics.totalKk)}
                </span>
                <span className="text-xs font-bold text-blue-700">KK</span>
              </div>
              <span className="text-[10px] text-slate-600 dark:text-slate-400 block">
                Total {currentMetrics.totalKud} Entitas KUD / Poktan
              </span>
            </div>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* 4. BAGIAN II: PROPORSI 3 MODEL KEMITRAAN RESMI                        */}
        {/* ===================================================================== */}
        <div className="report-section space-y-2.5">
          <div className="flex items-center justify-between border-b-2 border-slate-200 dark:border-slate-700 pb-1.5">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-slate-100">
              II. Proporsi & Capaian 3 Model Kemitraan PSR PTPN IV
            </h3>
            <span className="text-[10px] text-slate-500">Klasifikasi Standar PalmCo</span>
          </div>

          <table className="w-full text-xs text-left border border-slate-200 dark:border-slate-700">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold border-b border-slate-200 dark:border-slate-700">
                <th className="py-2 px-3">Model Kemitraan</th>
                <th className="py-2 px-3 text-center">Jumlah KUD</th>
                <th className="py-2 px-3 text-right">Luas Rekomtek (Ha)</th>
                <th className="py-2 px-3 text-right">Realisasi Tanam (Ha)</th>
                <th className="py-2 px-3 text-right">Dana BPDPKS (Rp)</th>
                <th className="py-2 px-3 text-center">Petani (KK)</th>
                <th className="py-2 px-3 text-right">Porsi Luas (%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {partnershipBreakdown.map(p => (
                <tr key={p.model} className="hover:bg-slate-50/50">
                  <td className="py-2 px-3 font-bold text-slate-900 dark:text-white">
                    <span className={`inline-block w-2 h-2 rounded-full mr-1.5 ${
                      p.model === 'Offtaker' ? 'bg-blue-500' : p.model === 'Kemitraan' ? 'bg-emerald-600' : 'bg-purple-500'
                    }`} />
                    Model {p.model}
                  </td>
                  <td className="py-2 px-3 text-center font-semibold">{p.count} KUD</td>
                  <td className="py-2 px-3 text-right font-bold text-emerald-800 dark:text-emerald-300">
                    {formatHectare(p.luasRekomtek)}
                  </td>
                  <td className="py-2 px-3 text-right font-semibold text-teal-700 dark:text-teal-400">
                    {formatHectare(p.luasTanam)}
                  </td>
                  <td className="py-2 px-3 text-right font-bold text-orange-700 dark:text-orange-300">
                    {formatIDR(p.totalDana)}
                  </td>
                  <td className="py-2 px-3 text-center">{formatNumber(p.totalKk)} KK</td>
                  <td className="py-2 px-3 text-right font-mono font-bold text-slate-700 dark:text-slate-300">
                    {p.pctLuas.toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-slate-100/80 dark:bg-slate-800/80 font-bold border-t-2 border-slate-300 dark:border-slate-600">
                <td className="py-2 px-3">TOTAL KONSOLIDASI</td>
                <td className="py-2 px-3 text-center">{currentMetrics.totalKud} KUD</td>
                <td className="py-2 px-3 text-right text-emerald-900 dark:text-emerald-300">
                  {formatHectare(currentMetrics.luasRekomtek)}
                </td>
                <td className="py-2 px-3 text-right text-teal-800 dark:text-teal-300">
                  {formatHectare(currentMetrics.luasTanam)}
                </td>
                <td className="py-2 px-3 text-right text-orange-800 dark:text-orange-300">
                  {formatIDR(currentMetrics.totalDana)}
                </td>
                <td className="py-2 px-3 text-center">{formatNumber(currentMetrics.totalKk)} KK</td>
                <td className="py-2 px-3 text-right">100.0%</td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* ===================================================================== */}
        {/* 5. BAGIAN III: MATRIKS KINERJA 7 REGIONAL PTPN IV                      */}
        {/* ===================================================================== */}
        <div className="report-section space-y-2.5">
          <div className="flex items-center justify-between border-b-2 border-slate-200 dark:border-slate-700 pb-1.5">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-slate-100">
              III. Matriks Kinerja Realisasi Per Regional PTPN IV
            </h3>
            <span className="text-[10px] text-slate-500">Cakupan Regional 1 – 7</span>
          </div>

          <table className="w-full text-xs text-left border border-slate-200 dark:border-slate-700">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold border-b border-slate-200 dark:border-slate-700">
                <th className="py-2 px-3">Regional Operasional</th>
                <th className="py-2 px-3 text-center">Jumlah KUD</th>
                <th className="py-2 px-3 text-right">Target Usulan</th>
                <th className="py-2 px-3 text-right">Rekomtek Disetujui</th>
                <th className="py-2 px-3 text-right">Realisasi Tanam</th>
                <th className="py-2 px-3 text-right">% Tanam</th>
                <th className="py-2 px-3 text-right">Dana BPDPKS Diserap</th>
                <th className="py-2 px-3 text-center">Petani (KK)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {regionalBreakdown.map(reg => (
                <tr key={reg.regional} className="hover:bg-slate-50/50">
                  <td className="py-2 px-3 font-bold text-slate-900 dark:text-white">
                    {reg.regional}
                  </td>
                  <td className="py-2 px-3 text-center font-semibold">
                    {reg.kudCount} KUD
                  </td>
                  <td className="py-2 px-3 text-right text-slate-600 dark:text-slate-400">
                    {formatHectare(reg.targetLuas)}
                  </td>
                  <td className="py-2 px-3 text-right font-bold text-emerald-800 dark:text-emerald-300">
                    {formatHectare(reg.luasRekomtek)}
                  </td>
                  <td className="py-2 px-3 text-right font-semibold text-teal-700 dark:text-teal-400">
                    {formatHectare(reg.luasTanam)}
                  </td>
                  <td className="py-2 px-3 text-right font-mono font-bold text-slate-800 dark:text-slate-200">
                    {reg.pctTanam.toFixed(1)}%
                  </td>
                  <td className="py-2 px-3 text-right font-bold text-orange-700 dark:text-orange-300">
                    {formatIDR(reg.totalDana)}
                  </td>
                  <td className="py-2 px-3 text-center">
                    {formatNumber(reg.totalKk)} KK
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-slate-100/80 dark:bg-slate-800/80 font-bold border-t-2 border-slate-300 dark:border-slate-600">
                <td className="py-2 px-3">TOTAL NASIONAL</td>
                <td className="py-2 px-3 text-center">{currentMetrics.totalKud} KUD</td>
                <td className="py-2 px-3 text-right">{formatHectare(currentMetrics.targetLuas)}</td>
                <td className="py-2 px-3 text-right text-emerald-900 dark:text-emerald-300">
                  {formatHectare(currentMetrics.luasRekomtek)}
                </td>
                <td className="py-2 px-3 text-right text-teal-800 dark:text-teal-300">
                  {formatHectare(currentMetrics.luasTanam)}
                </td>
                <td className="py-2 px-3 text-right">{currentMetrics.pctTanam.toFixed(1)}%</td>
                <td className="py-2 px-3 text-right text-orange-800 dark:text-orange-300">
                  {formatIDR(currentMetrics.totalDana)}
                </td>
                <td className="py-2 px-3 text-center">{formatNumber(currentMetrics.totalKk)} KK</td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* ===================================================================== */}
        {/* 6. BAGIAN IV: TAHUN PEROLEHAN KEMITRAAN (2018 - 2026)                  */}
        {/* ===================================================================== */}
        <div className="report-section space-y-2.5">
          <div className="flex items-center justify-between border-b-2 border-slate-200 dark:border-slate-700 pb-1.5">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-slate-100">
              IV. Rekapitulasi Portofolio Berdasarkan Tahun Perolehan Kemitraan
            </h3>
            <span className="text-[10px] text-slate-500">Tahun Akuisisi MoU Kemitraan</span>
          </div>

          <table className="w-full text-xs text-left border border-slate-200 dark:border-slate-700">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold border-b border-slate-200 dark:border-slate-700">
                <th className="py-2 px-3">Tahun Perolehan</th>
                <th className="py-2 px-3 text-center">Jumlah KUD</th>
                <th className="py-2 px-3 text-right">Luas Rekomtek (Ha)</th>
                <th className="py-2 px-3 text-right">Total Dana Diserap (Rp)</th>
                <th className="py-2 px-3 text-center">Petani (KK)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {tahunBreakdown.map(tb => (
                <tr key={tb.year} className="hover:bg-slate-50/50">
                  <td className="py-1.5 px-3 font-bold text-slate-900 dark:text-white">
                    Tahun {tb.year}
                  </td>
                  <td className="py-1.5 px-3 text-center font-semibold">{tb.count} KUD</td>
                  <td className="py-1.5 px-3 text-right font-bold text-emerald-800 dark:text-emerald-300">
                    {formatHectare(tb.luasHa)}
                  </td>
                  <td className="py-1.5 px-3 text-right font-semibold text-orange-700 dark:text-orange-300">
                    {formatIDR(tb.danaRp)}
                  </td>
                  <td className="py-1.5 px-3 text-center">{formatNumber(tb.totalKk)} KK</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ===================================================================== */}
        {/* 7. BAGIAN V: LAMPIRAN RINCIAN DATA KUD (JIKA MODE LENGKAP DIAKTIFKAN) */}
        {/* ===================================================================== */}
        {includeKudDetails && (
          <div className="report-section space-y-2.5 page-break-before pt-4">
            <div className="flex items-center justify-between border-b-2 border-slate-200 dark:border-slate-700 pb-1.5">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <span>V. Lampiran Rincian Data KUD & Realisasi Lapangan</span>
              </h3>
              <span className="text-[10px] text-slate-500">Total {activeDataset.length} Entitas Terdaftar</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-[10.5px] text-left border border-slate-200 dark:border-slate-700">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold border-b border-slate-200 dark:border-slate-700">
                    <th className="py-1.5 px-2 text-center w-8">No</th>
                    <th className="py-1.5 px-2">Nama KUD / Poktan</th>
                    <th className="py-1.5 px-2">Regional & Lokasi</th>
                    <th className="py-1.5 px-2 text-center">Model</th>
                    <th className="py-1.5 px-2 text-center">Th. Perolehan</th>
                    <th className="py-1.5 px-2 text-right">Rekomtek (Ha)</th>
                    <th className="py-1.5 px-2 text-right">Tanam (Ha)</th>
                    <th className="py-1.5 px-2 text-right">Dana Cair (Rp)</th>
                    <th className="py-1.5 px-2 text-center">KK</th>
                    <th className="py-1.5 px-2 text-center">Fisik %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {activeDataset.map((kud, idx) => (
                    <tr key={kud.id} className="hover:bg-slate-50/50">
                      <td className="py-1.5 px-2 text-center text-slate-500 font-mono">{idx + 1}</td>
                      <td className="py-1.5 px-2 font-bold text-slate-900 dark:text-white">
                        <div>{kud.namaKud}</div>
                        <div className="text-[9px] font-normal text-slate-400 font-mono">{kud.kodeKud}</div>
                      </td>
                      <td className="py-1.5 px-2 text-slate-700 dark:text-slate-300">
                        <div className="font-semibold text-slate-900 dark:text-white">{kud.regional}</div>
                        <div className="text-[9.5px] text-slate-500">{kud.kabupaten}, {kud.provinsi}</div>
                      </td>
                      <td className="py-1.5 px-2 text-center font-semibold">
                        <span className={`inline-block px-1.5 py-0.5 rounded text-[9.5px] font-bold ${
                          kud.statusKemitraan === 'Offtaker' 
                            ? 'bg-blue-100 text-blue-800' 
                            : kud.statusKemitraan === 'Kemitraan' 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'bg-purple-100 text-purple-800'
                        }`}>
                          {kud.statusKemitraan}
                        </span>
                      </td>
                      <td className="py-1.5 px-2 text-center font-mono font-bold text-slate-700 dark:text-slate-300">
                        {kud.tahunPerolehan || 2024}
                      </td>
                      <td className="py-1.5 px-2 text-right font-bold text-emerald-800 dark:text-emerald-300">
                        {formatNumber(kud.luasRekomtekHa, 2)}
                      </td>
                      <td className="py-1.5 px-2 text-right font-semibold text-teal-700 dark:text-teal-400">
                        {formatNumber(kud.luasTanamHa, 2)}
                      </td>
                      <td className="py-1.5 px-2 text-right font-bold text-orange-700 dark:text-orange-300">
                        {formatIDR(kud.totalNilaiPencairan)}
                      </td>
                      <td className="py-1.5 px-2 text-center">{kud.jumlahKk}</td>
                      <td className="py-1.5 px-2 text-center font-mono font-bold text-slate-800 dark:text-slate-200">
                        {kud.progresFisikPersen}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ===================================================================== */}
        {/* 8. BAGIAN VI: ARAHAN STRATEGIS & KOLOM PENGESAHAN DIREKSI             */}
        {/* ===================================================================== */}
        <div className="report-section pt-6 border-t-2 border-slate-300 dark:border-slate-700 space-y-6 avoid-break-inside">
          <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 uppercase tracking-wide">
              <ShieldCheck className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
              <span>Arahan Strategis Direksi & Mitigasi Risiko:</span>
            </h4>
            <ol className="list-decimal list-inside text-slate-700 dark:text-slate-300 space-y-1.5 leading-relaxed text-[11px]">
              <li><strong>Akselerasi Tanam Fisik:</strong> Regional dengan gap tinggi antara Rekomtek dan Realisasi Tanam wajib mempercepat proses chipping dan penyediaan bibit unggul DxP bersertifikat.</li>
              <li><strong>Penyaluran Dana BPDPKS:</strong> Pastikan kepatuhan pembukaan rekening escrow dan penyelesaian SPK sebelum pengajuan pencairan dana tahap berikutnya ke BPDPKS.</li>
              <li><strong>Pengamanan Pasokan TBS (Offtaker & Single Management):</strong> Seluruh hasil panen kebun PSR kemitraan wajib terkunci untuk pasokan PKS PTPN IV guna memaksimalkan utilisasi kapasitas olah pabrik.</li>
            </ol>
          </div>

          {/* Signature Grid (3 Signatures: Satgas, Kadiv, SEVP/Dirut) */}
          <div className="grid grid-cols-3 gap-4 text-center text-xs pt-4 signature-block">
            {/* Signature 1 */}
            <div className="space-y-16 flex flex-col justify-between">
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">Dibuat Oleh,</p>
                <p className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">Satgas PSR PalmCo</p>
              </div>
              <div>
                <p className="font-bold text-slate-900 dark:text-slate-100 underline decoration-slate-400 underline-offset-4">
                  Tim Monitoring & Evaluasi PSR
                </p>
                <p className="text-[10px] text-slate-500 font-mono mt-0.5">PTPN IV Holding</p>
              </div>
            </div>

            {/* Signature 2 */}
            <div className="space-y-16 flex flex-col justify-between">
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">Diperiksa Oleh,</p>
                <p className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">Kepala Divisi PSR & Kemitraan</p>
              </div>
              <div>
                <p className="font-bold text-slate-900 dark:text-slate-100 underline decoration-slate-400 underline-offset-4">
                  Dr. Ir. Hendra Gunawan, M.M.
                </p>
                <p className="text-[10px] text-slate-500 font-mono mt-0.5">Kepala Divisi PSR PTPN IV</p>
              </div>
            </div>

            {/* Signature 3 */}
            <div className="space-y-16 flex flex-col justify-between">
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">Disetujui & Ditetapkan,</p>
                <p className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">Senior Executive Vice President</p>
              </div>
              <div>
                <p className="font-bold text-slate-900 dark:text-slate-100 underline decoration-slate-400 underline-offset-4">
                  Ir. Jatmiko Santosa
                </p>
                <p className="text-[10px] text-slate-500 font-mono mt-0.5">SEVP Operation / Direksi PalmCo</p>
              </div>
            </div>
          </div>

          <div className="text-center pt-4 text-[10px] text-slate-400 border-t border-slate-100 dark:border-slate-800">
            Dokumen ini dicetak secara otomatis melalui Sistem Monitoring Terpadu Peremajaan Sawit Rakyat (PSR) PTPN IV PalmCo.
          </div>
        </div>
      </div>
    </div>
  );
};
