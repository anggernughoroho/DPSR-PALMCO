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
  CheckCircle2, 
  TrendingUp, 
  Sprout, 
  Banknote,
  Users2,
  Calendar,
  LandPlot,
  Layers,
  FileSpreadsheet,
  FileCheck2,
  Filter,
  Eye,
  Settings2,
  ChevronDown,
  ArrowDownToLine,
  Paperclip
} from 'lucide-react';

export const ReportsTab: React.FC = () => {
  const { 
    filteredKudList, 
    kudList, 
    filters, 
    showNotification
  } = usePsr();

  // Active view tab: Executive Summary vs Lampiran Lembaga Pekebun
  const [activeReportView, setActiveReportView] = useState<'executive' | 'lampiran'>('executive');
  const [reportScope, setReportScope] = useState<'filtered' | 'all'>('filtered');
  const [documentNo, setDocumentNo] = useState<string>('MEMO-PSR/PTPN4/2026/BOD-EXSUM-08');
  const [reportDate, setReportDate] = useState<string>(
    new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
  );

  // Active dataset based on scope
  const activeDataset = useMemo(() => {
    return reportScope === 'filtered' ? filteredKudList : kudList;
  }, [reportScope, filteredKudList, kudList]);

  // Recalculate metrics for executive summary
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
      const pctRekomtek = targetLuas > 0 ? (luasRekomtek / targetLuas) * 100 : 0;

      return {
        regional: reg,
        kudCount,
        targetLuas,
        luasRekomtek,
        luasTanam,
        totalDana,
        totalKk,
        pctTanam,
        pctRekomtek
      };
    });
  }, [activeDataset]);

  // Partnership model analysis (Offtaker, Kemitraan, Revitbun)
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
        luasTanamHa: kudInYear.reduce((sum, k) => sum + k.luasTanamHa, 0),
        danaRp: kudInYear.reduce((sum, k) => sum + k.totalNilaiPencairan, 0),
        totalKk: kudInYear.reduce((sum, k) => sum + k.jumlahKk, 0)
      };
    }).filter(y => y.count > 0);
  }, [activeDataset]);

  // Direct CSV download for Lampiran Lembaga Pekebun
  const handleDownloadAttachmentCsv = () => {
    const headers = [
      'NO',
      'KODE_LEMBAGA',
      'NAMA_LEMBAGA_PEKEBUN',
      'JENIS_KELEMBAGAAN',
      'REGIONAL',
      'PKS_MITRA',
      'PROVINSI',
      'KABUPATEN',
      'KECAMATAN',
      'DESA',
      'NAMA_KETUA_PENGURUS',
      'KONTAK_PENGURUS',
      'STATUS_KEMITRAAN',
      'TAHUN_PEROLEHAN_MOU',
      'TAHUN_BATCH_TANAM',
      'VARIETAS_BIBIT',
      'TARGET_USULAN_HA',
      'LUAS_REKOMTEK_HA',
      'LUAS_PENCAIRAN_HA',
      'LUAS_TANAM_FISIK_HA',
      'TARIF_BANTUAN_PER_HA',
      'TOTAL_DANA_BPDPKS_RP',
      'STATUS_PENCAIRAN',
      'BANK_PENYALUR',
      'JUMLAH_PETANI_KK',
      'PROGRES_FISIK_PERSEN',
      'NOMOR_SK_REKOMTEK'
    ];

    const rows = activeDataset.map((k, idx) => [
      idx + 1,
      `"${k.kodeKud}"`,
      `"${k.namaKud.replace(/"/g, '""')}"`,
      `"${k.jenisKelembagaan}"`,
      `"${k.regional}"`,
      `"${k.unitPksMitra.replace(/"/g, '""')}"`,
      `"${k.provinsi}"`,
      `"${k.kabupaten}"`,
      `"${k.kecamatan}"`,
      `"${k.desa}"`,
      `"${k.namaKetua.replace(/"/g, '""')}"`,
      `"${k.kontak}"`,
      `"${k.statusKemitraan}"`,
      k.tahunPerolehan || 2024,
      k.tahunTanamBatch,
      `"${k.varietasBibit}"`,
      k.targetLuasHa,
      k.luasRekomtekHa,
      k.luasPencairanHa,
      k.luasTanamHa,
      k.bantuanPerHa,
      k.totalNilaiPencairan,
      `"${k.statusPencairan}"`,
      `"${k.bankPenyalur}"`,
      k.jumlahKk,
      k.progresFisikPersen,
      `"${k.nomorRekomtek || ''}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `LAMPIRAN_LEMBAGA_PEKEBUN_PSR_PTPN4_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showNotification(`Lampiran ${activeDataset.length} Lembaga Pekebun berhasil diunduh dalam format Spreadsheet/CSV.`);
  };

  // Direct print / Save as PDF
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-5 pb-16 max-w-5xl mx-auto">
      {/* ========================================================================= */}
      {/* TOP CONTROLS & REPORT MODE NAVIGATION (HIDDEN IN PRINT / PDF)            */}
      {/* ========================================================================= */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3.5 print:hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                Executive Summary
              </span>
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Laporan Eksekutif Dewan Direksi (BOD Memo PSR)
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Format ringkasan eksekutif resmi PTPN IV PalmCo siap cetak & simpan PDF A4
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              id="btn-print-bod-report"
              onClick={handlePrint}
              className="px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-2 shadow-xs hover:shadow transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Simpan PDF (A4)</span>
            </button>

            <button
              id="btn-download-lampiran-csv"
              onClick={handleDownloadAttachmentCsv}
              className="px-3.5 py-2 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <ArrowDownToLine className="w-3.5 h-3.5" />
              <span>Unduh Lampiran Lembaga Pekebun (.CSV)</span>
            </button>
          </div>
        </div>

        {/* View Toggle Tabs & Filter Configuration */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          {/* Tab Selection */}
          <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setActiveReportView('executive')}
              className={`px-3.5 py-1.5 rounded-md font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeReportView === 'executive'
                  ? 'bg-white dark:bg-slate-900 text-emerald-800 dark:text-emerald-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Ringkasan Eksekutif Direksi</span>
            </button>

            <button
              onClick={() => setActiveReportView('lampiran')}
              className={`px-3.5 py-1.5 rounded-md font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeReportView === 'lampiran'
                  ? 'bg-white dark:bg-slate-900 text-emerald-800 dark:text-emerald-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Paperclip className="w-3.5 h-3.5" />
              <span>Lampiran Data Lembaga Pekebun ({activeDataset.length})</span>
            </button>
          </div>

          {/* Scope Selector */}
          <div className="flex items-center gap-2">
            <label className="text-[11px] font-semibold text-slate-500">Cakupan Data:</label>
            <select
              value={reportScope}
              onChange={(e) => setReportScope(e.target.value as 'filtered' | 'all')}
              className="text-xs py-1.5 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold"
            >
              <option value="filtered">Data Terfilter ({filteredKudList.length} Lembaga)</option>
              <option value="all">Semua Portofolio ({kudList.length} Lembaga)</option>
            </select>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. VIEW 1: EXECUTIVE SUMMARY DIREKSI (BOD MEMO)                          */}
      {/* ========================================================================= */}
      {activeReportView === 'executive' && (
        <div 
          id="official-bod-executive-report"
          className="print-document-sheet bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-10 shadow-sm space-y-5 text-slate-900 dark:text-slate-100"
        >
          {/* Official Letterhead */}
          <div className="border-b-2 border-emerald-800 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-800 via-emerald-900 to-emerald-950 text-white flex items-center justify-center font-black text-xl shadow-md border border-emerald-700 shrink-0">
                🌴 IV
              </div>
              <div>
                <h1 className="text-base sm:text-lg font-black uppercase tracking-wider text-emerald-950 dark:text-emerald-300 leading-tight">
                  PT PERKEBUNAN NUSANTARA IV (PERSERO)
                </h1>
                <p className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wide">
                  SUB-HOLDING PALMCO • DIVISI PSR DAN PLASMA
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">
                  Gedung Agro Plaza Lt. 12, Jl. H.R. Rasuna Said Kav. X-2 No. 1 Jakarta Selatan • Medan: Jl. Letjen Suprapto No. 2
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

          {/* Executive Memorandum Metadata Header */}
          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-1.5">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
              <span className="font-bold text-slate-500">Kepada:</span>
              <span className="sm:col-span-3 font-bold text-slate-900 dark:text-white">
                Direktur Utama & Jajaran Dewan Direksi (BOD) PT Perkebunan Nusantara IV PalmCo
              </span>

              <span className="font-bold text-slate-500">Dari:</span>
              <span className="sm:col-span-3 font-semibold text-slate-800 dark:text-slate-200">
                Kepala Divisi PSR dan Plasma PT Perkebunan Nusantara IV PalmCo
              </span>

              <span className="font-bold text-slate-500">Perihal:</span>
              <span className="sm:col-span-3 font-bold text-emerald-800 dark:text-emerald-400 leading-relaxed">
                EXECUTIVE SUMMARY: Capaian Realisasi Rekomtek Ditjenbun, Tanam Fisik, dan Penyerapan Dana BPDPKS Program Peremajaan Sawit Rakyat (PSR) PalmCo
              </span>

              <span className="font-bold text-slate-500">Lampiran:</span>
              <span className="sm:col-span-3 text-slate-700 dark:text-slate-300 font-medium">
                1 (Satu) Berkas Rincian Data {currentMetrics.totalKud} Lembaga Pekebun (KUD/Poktan/Gapoktan) Terlampir Terpisah
              </span>
            </div>
          </div>

          {/* SECTION I: EXECUTIVE KPI DASHBOARD */}
          <div className="report-section space-y-2.5">
            <div className="flex items-center justify-between border-b-2 border-slate-200 dark:border-slate-700 pb-1">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-slate-100">
                I. Ringkasan Indikator Kinerja Utama (Executive KPI)
              </h3>
              <span className="text-[10px] font-mono text-slate-400">Status Konsolidasi Nasional</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {/* Card 1: Luas Rekomtek */}
              <div className="p-3 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/60 dark:bg-emerald-950/30">
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

              {/* Card 2: Realisasi Tanam */}
              <div className="p-3 rounded-xl border border-teal-200 dark:border-teal-800 bg-teal-50/60 dark:bg-teal-950/30">
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

              {/* Card 3: Dana BPDPKS */}
              <div className="p-3 rounded-xl border border-orange-200 dark:border-orange-800 bg-orange-50/60 dark:bg-orange-950/30">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Penyaluran BPDPKS</span>
                <div className="my-1">
                  <span className="text-base font-black text-orange-900 dark:text-orange-300 block truncate">
                    {formatIDR(currentMetrics.totalDana)}
                  </span>
                </div>
                <span className="text-[10px] text-slate-600 dark:text-slate-400 block">
                  Lahan Cair: {formatHectare(currentMetrics.luasPencairan)} ({currentMetrics.pctDana.toFixed(1)}%)
                </span>
              </div>

              {/* Card 4: Petani & Lembaga */}
              <div className="p-3 rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50/60 dark:bg-blue-950/30">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Lembaga & Petani</span>
                <div className="flex items-baseline gap-1 my-1">
                  <span className="text-xl font-black text-blue-900 dark:text-blue-300">
                    {formatNumber(currentMetrics.totalKk)}
                  </span>
                  <span className="text-xs font-bold text-blue-700">KK</span>
                </div>
                <span className="text-[10px] text-slate-600 dark:text-slate-400 block">
                  {currentMetrics.totalKud} Lembaga Pekebun Terbina
                </span>
              </div>
            </div>
          </div>

          {/* SECTION II: 3 MODEL KEMITRAAN PSR */}
          <div className="report-section space-y-2">
            <div className="flex items-center justify-between border-b-2 border-slate-200 dark:border-slate-700 pb-1">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-slate-100">
                II. Capaian Berdasarkan 3 Model Kemitraan PSR
              </h3>
              <span className="text-[10px] text-slate-500 font-medium">Offtaker • Kemitraan • Revitbun</span>
            </div>

            <table className="w-full text-xs text-left border border-slate-200 dark:border-slate-700">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold border-b border-slate-200 dark:border-slate-700">
                  <th className="py-2 px-3">Model Kemitraan</th>
                  <th className="py-2 px-3 text-center">Jumlah Lembaga</th>
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
                    <td className="py-1.5 px-3 font-bold text-slate-900 dark:text-white">
                      <span className={`inline-block w-2 h-2 rounded-full mr-1.5 ${
                        p.model === 'Offtaker' ? 'bg-blue-500' : p.model === 'Kemitraan' ? 'bg-emerald-600' : 'bg-purple-500'
                      }`} />
                      Model {p.model}
                    </td>
                    <td className="py-1.5 px-3 text-center font-semibold">{p.count} Lembaga</td>
                    <td className="py-1.5 px-3 text-right font-bold text-emerald-800 dark:text-emerald-300">
                      {formatHectare(p.luasRekomtek)}
                    </td>
                    <td className="py-1.5 px-3 text-right font-semibold text-teal-700 dark:text-teal-400">
                      {formatHectare(p.luasTanam)}
                    </td>
                    <td className="py-1.5 px-3 text-right font-bold text-orange-700 dark:text-orange-300">
                      {formatIDR(p.totalDana)}
                    </td>
                    <td className="py-1.5 px-3 text-center">{formatNumber(p.totalKk)} KK</td>
                    <td className="py-1.5 px-3 text-right font-mono font-bold text-slate-700 dark:text-slate-300">
                      {p.pctLuas.toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-slate-100/80 dark:bg-slate-800/80 font-bold border-t-2 border-slate-300 dark:border-slate-600">
                  <td className="py-1.5 px-3">TOTAL KONSOLIDASI</td>
                  <td className="py-1.5 px-3 text-center">{currentMetrics.totalKud} Lembaga</td>
                  <td className="py-1.5 px-3 text-right text-emerald-900 dark:text-emerald-300">
                    {formatHectare(currentMetrics.luasRekomtek)}
                  </td>
                  <td className="py-1.5 px-3 text-right text-teal-800 dark:text-teal-300">
                    {formatHectare(currentMetrics.luasTanam)}
                  </td>
                  <td className="py-1.5 px-3 text-right text-orange-800 dark:text-orange-300">
                    {formatIDR(currentMetrics.totalDana)}
                  </td>
                  <td className="py-1.5 px-3 text-center">{formatNumber(currentMetrics.totalKk)} KK</td>
                  <td className="py-1.5 px-3 text-right">100.0%</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* SECTION III: MATRIKS REGIONAL PTPN IV (REGIONAL 1 - 7) */}
          <div className="report-section space-y-2">
            <div className="flex items-center justify-between border-b-2 border-slate-200 dark:border-slate-700 pb-1">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-slate-100">
                III. Matriks Kinerja Realisasi Per Regional PTPN IV
              </h3>
              <span className="text-[10px] text-slate-500">Regional 1 sampai Regional 7</span>
            </div>

            <table className="w-full text-xs text-left border border-slate-200 dark:border-slate-700">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold border-b border-slate-200 dark:border-slate-700">
                  <th className="py-1.5 px-2.5">Regional</th>
                  <th className="py-1.5 px-2.5 text-center">Lembaga</th>
                  <th className="py-1.5 px-2.5 text-right">Target Usulan</th>
                  <th className="py-1.5 px-2.5 text-right">Rekomtek</th>
                  <th className="py-1.5 px-2.5 text-right">Realisasi Tanam</th>
                  <th className="py-1.5 px-2.5 text-right">% Tanam</th>
                  <th className="py-1.5 px-2.5 text-right">Dana BPDPKS Diserap</th>
                  <th className="py-1.5 px-2.5 text-center">Petani (KK)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {regionalBreakdown.map(reg => (
                  <tr key={reg.regional} className="hover:bg-slate-50/50">
                    <td className="py-1.5 px-2.5 font-bold text-slate-900 dark:text-white">
                      {reg.regional}
                    </td>
                    <td className="py-1.5 px-2.5 text-center font-semibold">
                      {reg.kudCount}
                    </td>
                    <td className="py-1.5 px-2.5 text-right text-slate-600 dark:text-slate-400">
                      {formatHectare(reg.targetLuas)}
                    </td>
                    <td className="py-1.5 px-2.5 text-right font-bold text-emerald-800 dark:text-emerald-300">
                      {formatHectare(reg.luasRekomtek)}
                    </td>
                    <td className="py-1.5 px-2.5 text-right font-semibold text-teal-700 dark:text-teal-400">
                      {formatHectare(reg.luasTanam)}
                    </td>
                    <td className="py-1.5 px-2.5 text-right font-mono font-bold text-slate-800 dark:text-slate-200">
                      {reg.pctTanam.toFixed(1)}%
                    </td>
                    <td className="py-1.5 px-2.5 text-right font-bold text-orange-700 dark:text-orange-300">
                      {formatIDR(reg.totalDana)}
                    </td>
                    <td className="py-1.5 px-2.5 text-center">
                      {formatNumber(reg.totalKk)} KK
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-slate-100/80 dark:bg-slate-800/80 font-bold border-t-2 border-slate-300 dark:border-slate-600">
                  <td className="py-1.5 px-2.5">TOTAL NASIONAL</td>
                  <td className="py-1.5 px-2.5 text-center">{currentMetrics.totalKud}</td>
                  <td className="py-1.5 px-2.5 text-right">{formatHectare(currentMetrics.targetLuas)}</td>
                  <td className="py-1.5 px-2.5 text-right text-emerald-900 dark:text-emerald-300">
                    {formatHectare(currentMetrics.luasRekomtek)}
                  </td>
                  <td className="py-1.5 px-2.5 text-right text-teal-800 dark:text-teal-300">
                    {formatHectare(currentMetrics.luasTanam)}
                  </td>
                  <td className="py-1.5 px-2.5 text-right">{currentMetrics.pctTanam.toFixed(1)}%</td>
                  <td className="py-1.5 px-2.5 text-right text-orange-800 dark:text-orange-300">
                    {formatIDR(currentMetrics.totalDana)}
                  </td>
                  <td className="py-1.5 px-2.5 text-center">{formatNumber(currentMetrics.totalKk)} KK</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* SECTION IV: TAHUN PEROLEHAN KEMITRAAN (MoU) */}
          <div className="report-section space-y-2">
            <div className="flex items-center justify-between border-b-2 border-slate-200 dark:border-slate-700 pb-1">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-slate-100">
                IV. Rekapitulasi Portofolio Berdasarkan Tahun Perolehan Kemitraan (MoU)
              </h3>
              <span className="text-[10px] text-slate-500">Tahun Akuisisi Kemitraan</span>
            </div>

            <table className="w-full text-xs text-left border border-slate-200 dark:border-slate-700">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold border-b border-slate-200 dark:border-slate-700">
                  <th className="py-1.5 px-3">Tahun Perolehan</th>
                  <th className="py-1.5 px-3 text-center">Jumlah Lembaga</th>
                  <th className="py-1.5 px-3 text-right">Luas Rekomtek (Ha)</th>
                  <th className="py-1.5 px-3 text-right">Realisasi Tanam (Ha)</th>
                  <th className="py-1.5 px-3 text-right">Dana BPDPKS Cair (Rp)</th>
                  <th className="py-1.5 px-3 text-center">Petani (KK)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {tahunBreakdown.map(tb => (
                  <tr key={tb.year} className="hover:bg-slate-50/50">
                    <td className="py-1.5 px-3 font-bold text-slate-900 dark:text-white">
                      Tahun {tb.year}
                    </td>
                    <td className="py-1.5 px-3 text-center font-semibold">{tb.count} Lembaga</td>
                    <td className="py-1.5 px-3 text-right font-bold text-emerald-800 dark:text-emerald-300">
                      {formatHectare(tb.luasHa)}
                    </td>
                    <td className="py-1.5 px-3 text-right font-semibold text-teal-700 dark:text-teal-400">
                      {formatHectare(tb.luasTanamHa)}
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

          {/* SECTION V: KETERANGAN LAMPIRAN LEMBAGA PEKEBUN */}
          <div className="report-section p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 avoid-break-inside">
            <div className="space-y-0.5">
              <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <Paperclip className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Dokumen Lampiran I: Daftar Rincian Lembaga Pekebun (KUD / Poktan)</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">
                Rincian individual per lembaga pekebun sebanyak <strong>{currentMetrics.totalKud} Lembaga</strong> (termasuk kontak ketua, nomor SK Rekomtek, dan titik koordinat) dilampirkan terpisah dalam Dokumen Lampiran I.
              </p>
            </div>

            <button
              onClick={handleDownloadAttachmentCsv}
              className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-200 font-bold text-xs shrink-0 flex items-center gap-1.5 cursor-pointer print:hidden"
            >
              <Download className="w-3.5 h-3.5 text-emerald-600" />
              <span>Unduh Lampiran I (.CSV)</span>
            </button>
          </div>

          {/* SECTION VI: CATATAN STRATEGIS & SIGNATURES BLOCK */}
          <div className="report-section pt-4 border-t-2 border-slate-300 dark:border-slate-700 space-y-6 avoid-break-inside">
            {/* Signature Grid: 3 Signatories strictly matching user instruction */}
            <div className="grid grid-cols-3 gap-4 text-center text-xs pt-4 signature-block">
              {/* 1. Ditandatangani oleh: Kepala Divisi PSR dan Plasma (Abdul Muthalib) */}
              <div className="space-y-14 flex flex-col justify-between">
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Ditandatangani Oleh,</p>
                  <p className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">Kepala Divisi PSR dan Plasma</p>
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-slate-100 underline decoration-slate-400 underline-offset-4 text-xs">
                    Abdul Muthalib
                  </p>
                  <p className="text-[10px] text-slate-500 mt-0.5">PT Perkebunan Nusantara IV PalmCo</p>
                </div>
              </div>

              {/* 2. Disetujui oleh: Direktur Hubungan Kelembagaan (Arya Sandhiyudha) */}
              <div className="space-y-14 flex flex-col justify-between">
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Disetujui Oleh,</p>
                  <p className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">Direktur Hubungan Kelembagaan</p>
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-slate-100 underline decoration-slate-400 underline-offset-4 text-xs">
                    Arya Sandhiyudha
                  </p>
                  <p className="text-[10px] text-slate-500 mt-0.5">PT Perkebunan Nusantara IV PalmCo</p>
                </div>
              </div>

              {/* 3. Diketahui oleh: Direktur Utama */}
              <div className="space-y-14 flex flex-col justify-between">
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Diketahui Oleh,</p>
                  <p className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">Direktur Utama</p>
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-slate-100 underline decoration-slate-400 underline-offset-4 text-xs">
                    Jatmiko Krisna Santosa
                  </p>
                  <p className="text-[10px] text-slate-500 mt-0.5">PT Perkebunan Nusantara IV PalmCo</p>
                </div>
              </div>
            </div>

            <div className="text-center pt-3 text-[10px] text-slate-400 border-t border-slate-100 dark:border-slate-800">
              Dokumen Executive Summary ini dihasilkan dari Sistem Monitoring Terpadu Peremajaan Sawit Rakyat (PSR) Sub-Holding PalmCo.
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. VIEW 2: DEDICATED LAMPIRAN RINCIAN LEMBAGA PEKEBUN                     */}
      {/* ========================================================================= */}
      {activeReportView === 'lampiran' && (
        <div 
          id="official-bod-lampiran-report"
          className="print-document-sheet bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-5 text-slate-900 dark:text-slate-100"
        >
          {/* Header Lampiran */}
          <div className="border-b-2 border-emerald-800 pb-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 font-bold">
                LAMPIRAN I • {documentNo}
              </div>
              <h2 className="text-sm sm:text-base font-black uppercase text-slate-900 dark:text-white">
                Daftar Rincian Lembaga Pekebun & Realisasi Program PSR PalmCo
              </h2>
              <p className="text-xs text-slate-500">
                Total <strong>{activeDataset.length} Lembaga Pekebun</strong> (KUD / Gapoktan / Poktan) Terdaftar
              </p>
            </div>

            <div className="flex items-center gap-2 print:hidden">
              <button
                onClick={handleDownloadAttachmentCsv}
                className="px-3.5 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <ArrowDownToLine className="w-3.5 h-3.5" />
                <span>Unduh File CSV / Excel</span>
              </button>

              <button
                onClick={handlePrint}
                className="px-3.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Cetak Lampiran (A4)</span>
              </button>
            </div>
          </div>

          {/* Table Lampiran */}
          <div className="overflow-x-auto">
            <table className="w-full text-[10.5px] text-left border border-slate-200 dark:border-slate-700">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold border-b border-slate-200 dark:border-slate-700">
                  <th className="py-2 px-2 text-center w-8">No</th>
                  <th className="py-2 px-2">Nama Lembaga Pekebun</th>
                  <th className="py-2 px-2">Regional & Lokasi</th>
                  <th className="py-2 px-2">Ketua Pengurus & Kontak</th>
                  <th className="py-2 px-2 text-center">Model</th>
                  <th className="py-2 px-2 text-center">Th. MoU</th>
                  <th className="py-2 px-2 text-right">Rekomtek (Ha)</th>
                  <th className="py-2 px-2 text-right">Tanam (Ha)</th>
                  <th className="py-2 px-2 text-right">Dana Cair (Rp)</th>
                  <th className="py-2 px-2 text-center">KK</th>
                  <th className="py-2 px-2 text-center">Fisik %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {activeDataset.map((kud, idx) => (
                  <tr key={kud.id} className="hover:bg-slate-50/50">
                    <td className="py-1.5 px-2 text-center text-slate-500 font-mono">{idx + 1}</td>
                    <td className="py-1.5 px-2 font-bold text-slate-900 dark:text-white">
                      <div>{kud.namaKud}</div>
                      <div className="text-[9px] font-normal text-slate-400 font-mono">{kud.kodeKud} • {kud.jenisKelembagaan}</div>
                    </td>
                    <td className="py-1.5 px-2 text-slate-700 dark:text-slate-300">
                      <div className="font-semibold text-slate-900 dark:text-white">{kud.regional}</div>
                      <div className="text-[9.5px] text-slate-500">{kud.kabupaten}, {kud.provinsi}</div>
                    </td>
                    <td className="py-1.5 px-2 text-slate-700 dark:text-slate-300">
                      <div className="font-medium text-slate-900 dark:text-white">{kud.namaKetua}</div>
                      <div className="text-[9px] text-slate-400 font-mono">{kud.kontak}</div>
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
              <tfoot>
                <tr className="bg-slate-100/80 dark:bg-slate-800/80 font-bold border-t-2 border-slate-300 dark:border-slate-600">
                  <td colSpan={6} className="py-2 px-2 text-center">TOTAL REKAPITULASI LAMPIRAN</td>
                  <td className="py-2 px-2 text-right text-emerald-900 dark:text-emerald-300">
                    {formatNumber(currentMetrics.luasRekomtek, 2)} Ha
                  </td>
                  <td className="py-2 px-2 text-right text-teal-800 dark:text-teal-300">
                    {formatNumber(currentMetrics.luasTanam, 2)} Ha
                  </td>
                  <td className="py-2 px-2 text-right text-orange-800 dark:text-orange-300">
                    {formatIDR(currentMetrics.totalDana)}
                  </td>
                  <td className="py-2 px-2 text-center">{formatNumber(currentMetrics.totalKk)} KK</td>
                  <td className="py-2 px-2 text-center font-mono">{currentMetrics.avgFisik.toFixed(1)}%</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2 border-t border-slate-100 dark:border-slate-800">
            <span>Lampiran ini merupakan bagian yang tidak terpisahkan dari Memo Eksekutif Direksi.</span>
            <span className="font-mono">PTPN IV PalmCo PSR Management System</span>
          </div>
        </div>
      )}
    </div>
  );
};
