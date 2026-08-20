import React, { useState, useMemo } from 'react';
import { usePsr } from '../../context/PsrContext';
import { 
  MONTH_LIST, 
  WEEK_LIST, 
  MonthName, 
  WeekName, 
  REGIONAL_COLUMNS, 
  getRkoProgressMatrix, 
  getKonsolidasiPalmcoData,
  StageDataRow 
} from '../../data/rkoProgressData';
import { exportRkoToPdf, exportRkoToJpg, exportRkoToPptx } from '../../lib/rkoExportHelper';
import { formatNumber } from '../../lib/utils';
import { 
  TrendingUp, 
  Calendar, 
  Filter, 
  FileText, 
  Image as ImageIcon, 
  Presentation, 
  Printer, 
  Sparkles, 
  Users, 
  Crosshair, 
  ScrollText, 
  Calculator, 
  Globe, 
  FileCheck2, 
  ShieldCheck, 
  Award, 
  Wallet, 
  Receipt, 
  TreePine, 
  Tractor, 
  Sprout, 
  BarChart3,
  Table as TableIcon,
  Search
} from 'lucide-react';

export const HighlightProgresTab: React.FC = () => {
  const { showNotification } = usePsr();

  // Slicer States: Defaulting to 'Agustus' and 'W4' to match Google Sheet "To ppt RKO" baseline exactly
  const [selectedMonth, setSelectedMonth] = useState<MonthName>('Agustus');
  const [selectedWeek, setSelectedWeek] = useState<WeekName>('W4');
  const [selectedRegionalFilter, setSelectedRegionalFilter] = useState<string>('ALL');
  const [activeViewMode, setActiveViewMode] = useState<'matrix' | 'kompilasi'>('matrix');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportType, setExportType] = useState<string | null>(null);

  // Compute Matrix based on Slicers
  const fullMatrix = useMemo(() => {
    return getRkoProgressMatrix(selectedMonth, selectedWeek);
  }, [selectedMonth, selectedWeek]);

  // Compute Kompilasi Konsolidasi PALMCO (without Deviasi)
  const konsolidasiPalmcoData = useMemo(() => {
    return getKonsolidasiPalmcoData(fullMatrix);
  }, [fullMatrix]);

  // Filtered rows for search
  const displayedMatrix = useMemo(() => {
    if (!searchFilter.trim()) return fullMatrix;
    const query = searchFilter.toLowerCase();
    return fullMatrix.filter(row => 
      row.tahapan.toLowerCase().includes(query) || 
      row.no.toString().includes(query)
    );
  }, [fullMatrix, searchFilter]);

  const displayedKonsolidasi = useMemo(() => {
    if (!searchFilter.trim()) return konsolidasiPalmcoData;
    const query = searchFilter.toLowerCase();
    return konsolidasiPalmcoData.filter(row => 
      row.tahapan.toLowerCase().includes(query) || 
      row.no.toString().includes(query)
    );
  }, [konsolidasiPalmcoData, searchFilter]);

  // Key KPI values
  const rekomtekKonsolidasi = fullMatrix.find(r => r.id === 'rekomtek')?.regionals['KONSOLIDASI'];
  const pencairanKonsolidasi = fullMatrix.find(r => r.id === 'pencairan_dana')?.regionals['KONSOLIDASI'];
  const tanamKonsolidasi = fullMatrix.find(r => r.id === 'penanaman')?.regionals['KONSOLIDASI'];
  const pendataanKonsolidasi = fullMatrix.find(r => r.id === 'pendataan')?.regionals['KONSOLIDASI'];

  // Columns to show in matrix table
  const visibleRegionals = useMemo(() => {
    if (selectedRegionalFilter === 'ALL') {
      return REGIONAL_COLUMNS;
    }
    const matched = REGIONAL_COLUMNS.filter(r => r.id === selectedRegionalFilter || r.id === 'KONSOLIDASI');
    return matched.length > 0 ? matched : REGIONAL_COLUMNS;
  }, [selectedRegionalFilter]);

  // Helper to render Stage Icon
  const renderStageIcon = (iconName: string, isSpecialHighlight?: boolean, specialType?: string) => {
    let iconClass = 'w-4 h-4 text-slate-700 dark:text-slate-300';
    if (isSpecialHighlight) {
      if (specialType === 'rekomtek') {
        iconClass = 'w-4 h-4 text-emerald-700 dark:text-emerald-400';
      } else if (specialType === 'pencairan_dana') {
        iconClass = 'w-4 h-4 text-blue-700 dark:text-blue-400';
      }
    }
    
    switch (iconName) {
      case 'Users': return <Users className={iconClass} />;
      case 'Crosshair': return <Crosshair className={iconClass} />;
      case 'ScrollText': return <ScrollText className={iconClass} />;
      case 'Calculator': return <Calculator className={iconClass} />;
      case 'Globe': return <Globe className={iconClass} />;
      case 'FileCheck2': return <FileCheck2 className={iconClass} />;
      case 'ShieldCheck': return <ShieldCheck className={iconClass} />;
      case 'Award': return <Award className={iconClass} />;
      case 'Wallet': return <Wallet className={iconClass} />;
      case 'Receipt': return <Receipt className={iconClass} />;
      case 'TreePine': return <TreePine className={iconClass} />;
      case 'Tractor': return <Tractor className={iconClass} />;
      case 'Sprout': return <Sprout className={iconClass} />;
      default: return <Sparkles className={iconClass} />;
    }
  };

  // Export Handlers
  const handleExportPdf = async () => {
    try {
      setIsExporting(true);
      setExportType('PDF');
      await exportRkoToPdf('rko-presentation-canvas', selectedMonth, selectedWeek);
      showNotification(`Laporan Highlight Progres (${selectedWeek} ${selectedMonth}) berhasil disimpan sebagai PDF.`);
    } catch (err) {
      console.error(err);
      showNotification('Gagal mengekspor PDF, silakan gunakan opsi cetak');
    } finally {
      setIsExporting(false);
      setExportType(null);
    }
  };

  const handleExportJpg = async () => {
    try {
      setIsExporting(true);
      setExportType('JPG');
      await exportRkoToJpg('rko-presentation-canvas', selectedMonth, selectedWeek);
      showNotification(`Laporan Highlight Progres (${selectedWeek} ${selectedMonth}) berhasil disimpan sebagai Gambar JPG.`);
    } catch (err) {
      console.error(err);
      showNotification('Gagal mengekspor JPG');
    } finally {
      setIsExporting(false);
      setExportType(null);
    }
  };

  const handleExportPpt = async () => {
    try {
      setIsExporting(true);
      setExportType('PPT');
      await exportRkoToPptx(selectedMonth, selectedWeek, fullMatrix, selectedRegionalFilter);
      showNotification(`File Presentasi PowerPoint (.pptx) (${selectedWeek} ${selectedMonth}) berhasil disimpan.`);
    } catch (err) {
      console.error(err);
      showNotification('Gagal mengekspor PPT');
    } finally {
      setIsExporting(false);
      setExportType(null);
    }
  };

  return (
    <div className="space-y-4 pb-12">
      {/* ========================================================================= */}
      {/* SLICER & TOOLBAR PANEL (HIDDEN IN PRINT)                                  */}
      {/* ========================================================================= */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3.5 print:hidden">
        {/* Top Title & Export Buttons */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-700 flex items-center justify-center text-emerald-800 dark:text-emerald-300 shrink-0">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-slate-100">
                  Highlight Progres
                </h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                  To PPT RKO
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Pemantauan 13 tahapan PSR lengkap seluruh regional dan konsolidasi RKAP vs Realisasi PalmCo
              </p>
            </div>
          </div>

          {/* Export Action Buttons (PDF, JPG, PPT) */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* PPT Export Button */}
            <button
              id="btn-export-rko-ppt"
              onClick={handleExportPpt}
              disabled={isExporting}
              className="px-3.5 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer disabled:opacity-50"
            >
              <Presentation className="w-3.5 h-3.5" />
              <span>{isExporting && exportType === 'PPT' ? 'Menyiapkan PPT...' : 'Simpan File PPT (.pptx)'}</span>
            </button>

            {/* JPG Export Button */}
            <button
              id="btn-export-rko-jpg"
              onClick={handleExportJpg}
              disabled={isExporting}
              className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer disabled:opacity-50"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>{isExporting && exportType === 'JPG' ? 'Menyimpan JPG...' : 'Simpan File JPG'}</span>
            </button>

            {/* PDF Export Button */}
            <button
              id="btn-export-rko-pdf"
              onClick={handleExportPdf}
              disabled={isExporting}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer disabled:opacity-50"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{isExporting && exportType === 'PDF' ? 'Menyimpan PDF...' : 'Simpan File PDF'}</span>
            </button>

            {/* Print Button */}
            <button
              onClick={() => window.print()}
              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
              title="Cetak via Browser"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* View Mode Toggle: Matriks Regional vs Kompilasi Konsolidasi PALMCO */}
        <div className="flex items-center justify-between gap-3 pt-1 flex-wrap">
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
            <button
              id="btn-view-matrix"
              onClick={() => setActiveViewMode('matrix')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeViewMode === 'matrix'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-slate-700 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Matriks Semua Regional (To ppt RKO)</span>
            </button>

            <button
              id="btn-view-kompilasi"
              onClick={() => setActiveViewMode('kompilasi')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeViewMode === 'kompilasi'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-slate-700 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Kompilasi RKAP Vs Real Konsolidasi "PALMCO"</span>
            </button>
          </div>

          <div className="text-xs text-slate-600 dark:text-slate-300">
            Posisi Data Filter: <span className="font-black text-emerald-800 dark:text-emerald-300">{selectedWeek} {selectedMonth} 2026</span>
          </div>
        </div>

        {/* Slicer Controls: Month, Week, Regional & Search */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
          {/* Slicer 1: Month Selector (Januari - Desember) */}
          <div className="md:col-span-5 space-y-1.5">
            <label className="text-[11px] font-black text-slate-700 dark:text-slate-200 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-emerald-700" />
              <span>Slicer Bulan (Januari s.d Desember):</span>
            </label>
            <div className="flex flex-wrap gap-1">
              {MONTH_LIST.map((m) => (
                <button
                  key={m}
                  onClick={() => setSelectedMonth(m)}
                  className={`px-2 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                    selectedMonth === m
                      ? 'bg-emerald-800 text-white shadow-xs font-black ring-1 ring-emerald-900'
                      : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700'
                  }`}
                >
                  {m.substring(0, 3)}
                </button>
              ))}
            </div>
          </div>

          {/* Slicer 2: Weekly Progress (W1, W2, W3, W4) */}
          <div className="md:col-span-3 space-y-1.5">
            <label className="text-[11px] font-black text-slate-700 dark:text-slate-200 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-orange-600" />
              <span>Slicer Weekly (W1 - W4):</span>
            </label>
            <div className="grid grid-cols-4 gap-1">
              {WEEK_LIST.map((w) => (
                <button
                  key={w}
                  onClick={() => setSelectedWeek(w)}
                  className={`py-1 rounded text-[11px] text-center font-black transition-all cursor-pointer ${
                    selectedWeek === w
                      ? 'bg-orange-600 text-white shadow-xs ring-1 ring-orange-700'
                      : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700'
                  }`}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>

          {/* Slicer 3: Regional Focus */}
          <div className="md:col-span-4 space-y-1.5">
            <label className="text-[11px] font-black text-slate-700 dark:text-slate-200 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-blue-600" />
              <span>Filter Tampilan Kolom Regional:</span>
            </label>
            <div>
              <select
                value={selectedRegionalFilter}
                onChange={(e) => setSelectedRegionalFilter(e.target.value)}
                className="w-full text-xs py-1.5 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold focus:ring-1 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="ALL">Semua Regional (Regional I - VII, DRUS, Djaba, DSUL + Konsolidasi)</option>
                <option value="KONSOLIDASI">Hanya Kolom Konsolidasi PALMCO</option>
                <option value="REG_I">Regional I (Sumatera Utara)</option>
                <option value="REG_II">Regional II (Riau)</option>
                <option value="REG_III">Regional III (Jambi / Sumsel)</option>
                <option value="REG_IV">Regional IV (Sumbar / Bengkulu)</option>
                <option value="REG_V">Regional V (Kalimantan Barat)</option>
                <option value="REG_VI">Regional VI (eks N1)</option>
                <option value="REG_VII">Regional VII (eks N7)</option>
                <option value="REG_II_DRUS">Regional II - DRUS (eks N2)</option>
                <option value="REG_I_DJABA">Regional I - Djaba (eks N8)</option>
                <option value="REG_II_DSUL">Regional II - DSUL (eks N14)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* QUICK KPI HIGHLIGHT CARDS                                                 */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 print:hidden">
        {/* Card 1: Rekomtek (Special Highlight Emerald) */}
        <div className="p-3.5 rounded-xl border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 shadow-xs">
          <div className="flex items-center justify-between text-emerald-900 dark:text-emerald-200 text-[10.5px] uppercase font-black tracking-wider">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              Rekomtek (Warna Spesial)
            </span>
            <Award className="w-4 h-4 text-emerald-700 dark:text-emerald-300" />
          </div>
          <div className="flex items-baseline gap-1 my-1">
            <span className="text-xl sm:text-2xl font-black text-emerald-950 dark:text-white">
              {formatNumber(rekomtekKonsolidasi?.sdBulanIni.realisasi || 0, 1)}
            </span>
            <span className="text-xs font-bold text-emerald-800 dark:text-emerald-200">Ha</span>
          </div>
          <div className="text-[11px] text-slate-700 dark:text-slate-300 flex items-center justify-between font-semibold">
            <span>Bln Ini: +{formatNumber(rekomtekKonsolidasi?.bulanIni.realisasi || 0, 1)} Ha</span>
            <span className="font-black text-emerald-950 dark:text-emerald-200 bg-emerald-200/90 dark:bg-emerald-900 px-1.5 py-0.5 rounded">
              {(rekomtekKonsolidasi?.setahun.persen || 0).toFixed(1)}% RKAP
            </span>
          </div>
        </div>

        {/* Card 2: Pencairan Dana BPDP (Special Highlight Blue) */}
        <div className="p-3.5 rounded-xl border-2 border-blue-500 bg-blue-50 dark:bg-blue-950/60 shadow-xs">
          <div className="flex items-center justify-between text-blue-900 dark:text-blue-200 text-[10.5px] uppercase font-black tracking-wider">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              Pencairan Dana BPDP (Spesial)
            </span>
            <Wallet className="w-4 h-4 text-blue-700 dark:text-blue-300" />
          </div>
          <div className="flex items-baseline gap-1 my-1">
            <span className="text-xl sm:text-2xl font-black text-blue-950 dark:text-white">
              {formatNumber(pencairanKonsolidasi?.sdBulanIni.realisasi || 0, 1)}
            </span>
            <span className="text-xs font-bold text-blue-800 dark:text-blue-200">Ha</span>
          </div>
          <div className="text-[11px] text-slate-700 dark:text-slate-300 flex items-center justify-between font-semibold">
            <span>Bln Ini: +{formatNumber(pencairanKonsolidasi?.bulanIni.realisasi || 0, 1)} Ha</span>
            <span className="font-black text-blue-950 dark:text-blue-200 bg-blue-200/90 dark:bg-blue-900 px-1.5 py-0.5 rounded">
              {(pencairanKonsolidasi?.setahun.persen || 0).toFixed(1)}% RKAP
            </span>
          </div>
        </div>

        {/* Card 3: Penanaman */}
        <div className="p-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xs">
          <div className="flex items-center justify-between text-slate-700 dark:text-slate-300 text-[10.5px] uppercase font-black">
            <span>Realisasi Penanaman</span>
            <Sprout className="w-4 h-4 text-slate-700 dark:text-slate-300" />
          </div>
          <div className="flex items-baseline gap-1 my-1">
            <span className="text-xl font-black text-slate-950 dark:text-white">
              {formatNumber(tanamKonsolidasi?.sdBulanIni.realisasi || 0, 1)}
            </span>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Ha</span>
          </div>
          <div className="text-[11px] text-slate-700 dark:text-slate-300 flex items-center justify-between font-semibold">
            <span>Bln Ini: +{formatNumber(tanamKonsolidasi?.bulanIni.realisasi || 0, 1)} Ha</span>
            <span className="font-bold text-slate-900 dark:text-slate-100 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
              {(tanamKonsolidasi?.setahun.persen || 0).toFixed(1)}% RKAP
            </span>
          </div>
        </div>

        {/* Card 4: Pendataan Luasan */}
        <div className="p-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xs">
          <div className="flex items-center justify-between text-slate-700 dark:text-slate-300 text-[10.5px] uppercase font-black">
            <span>Pendataan Calon Petani</span>
            <Users className="w-4 h-4 text-slate-700 dark:text-slate-300" />
          </div>
          <div className="flex items-baseline gap-1 my-1">
            <span className="text-xl font-black text-slate-950 dark:text-white">
              {formatNumber(pendataanKonsolidasi?.sdBulanIni.realisasi || 0, 1)}
            </span>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Ha</span>
          </div>
          <div className="text-[11px] text-slate-700 dark:text-slate-300 flex items-center justify-between font-semibold">
            <span>Bln Ini: +{formatNumber(pendataanKonsolidasi?.bulanIni.realisasi || 0, 1)} Ha</span>
            <span className="font-bold text-slate-900 dark:text-slate-100 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
              {(pendataanKonsolidasi?.setahun.persen || 0).toFixed(1)}% RKAP
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PRESENTATION CANVAS & MATRIX TABLE (CAPTURED FOR PDF / JPG / PRINT)       */}
      {/* ========================================================================= */}
      <div 
        id="rko-presentation-canvas"
        className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4 print:p-0 print:border-none print:shadow-none"
      >
        {/* Presentation Header Block */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-emerald-800 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-black px-2 py-0.5 bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200 rounded border border-emerald-400">
                PTPN IV PALMCO
              </span>
              <h2 className="text-base sm:text-lg font-black text-emerald-950 dark:text-emerald-100">
                {activeViewMode === 'matrix' 
                  ? `Executive Summary up to : ${selectedWeek} ${selectedMonth}` 
                  : `Kompilasi RKAP Vs Real Konsolidasi "PALMCO" (${selectedWeek} ${selectedMonth})`
                }
              </h2>
            </div>
            <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-0.5">
              Peremajaan Sawit Rakyat (Ha) • {activeViewMode === 'matrix' ? 'Matriks Capaian 13 Tahapan Lengkap Seluruh Regional' : 'Rekapitulasi Capaian Nasional PalmCo Terhadap Target RKAP 2026'}
            </p>
          </div>

          <div className="text-left sm:text-right text-xs">
            <div className="font-mono font-black text-slate-900 dark:text-white">
              Tahun Anggaran 2026
            </div>
            <div className="text-[11px] font-bold text-slate-600 dark:text-slate-400">
              Posisi: {selectedWeek} {selectedMonth} 2026
            </div>
          </div>
        </div>

        {/* Search Input for Tahapan (Hidden in print) */}
        <div className="flex items-center justify-between gap-3 print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400">Tampilan Saat Ini:</span>
            <span className="text-xs font-black text-slate-900 dark:text-slate-100">
              {activeViewMode === 'matrix' 
                ? `${visibleRegionals.length} Kolom Regional Aktif (${selectedRegionalFilter})`
                : 'Tabel Komparasi Konsolidasi PalmCo Lengkap (13 Tahapan Tanpa Deviasi)'
              }
            </span>
          </div>

          <div className="w-64 relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2 text-slate-500" />
            <input
              type="text"
              placeholder="Cari tahapan PSR / nomor..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full text-xs py-1.5 pl-8 pr-2.5 rounded-md border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-medium"
            />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* VIEW 1: MATRIKS TO PPT RKO (ALL REGIONALS)                                */}
        {/* ========================================================================= */}
        {activeViewMode === 'matrix' && (
          <div className="overflow-x-auto rounded-xl border border-slate-300 dark:border-slate-700 shadow-2xs">
            <table className="w-full text-[11px] text-left border-collapse border border-slate-300 dark:border-slate-700">
              {/* Header 1: Regional Header Bars */}
              <thead>
                <tr className="bg-emerald-950 text-white font-black text-center border-b border-emerald-800">
                  <th rowSpan={3} className="py-2.5 px-3 text-left w-64 border-r border-emerald-800 sticky left-0 z-20 bg-emerald-950 text-white">
                    Tahapan PSR Lengkap
                  </th>
                  {visibleRegionals.map((reg) => (
                    <th
                      key={reg.id}
                      colSpan={8}
                      className={`py-2 px-2 border-r border-emerald-800 font-black tracking-wider text-xs ${
                        reg.id === 'KONSOLIDASI' ? 'bg-emerald-950 text-amber-300 ring-1 ring-amber-400/40' : 'bg-emerald-900 text-white'
                      }`}
                    >
                      <div className="flex flex-col items-center">
                        <span>{reg.label}</span>
                        {reg.sublabel && (
                          <span className="text-[9.5px] font-normal text-emerald-200">
                            {reg.sublabel}
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>

                {/* Header 2: Sub-Period Headers (Bulan Ini, Sd Bln Ini, Setahun) */}
                <tr className="bg-emerald-900 text-white font-bold text-center text-[10.5px] border-b border-emerald-700">
                  {visibleRegionals.map((reg) => (
                    <React.Fragment key={`${reg.id}-subperiods`}>
                      <th colSpan={3} className="py-1 px-1 border-r border-emerald-700 bg-emerald-850 text-white font-bold">
                        Bulan Ini
                      </th>
                      <th colSpan={3} className="py-1 px-1 border-r border-emerald-700 bg-emerald-900 text-white font-bold">
                        Sd Bln Ini
                      </th>
                      <th colSpan={2} className="py-1 px-1 border-r border-emerald-700 bg-emerald-950 text-white font-bold">
                        Setahun
                      </th>
                    </React.Fragment>
                  ))}
                </tr>

                {/* Header 3: Metric Names (Real, RKAP, %) */}
                <tr className="bg-emerald-800 text-white font-black text-center text-[10px] border-b border-slate-300 dark:border-slate-700">
                  {visibleRegionals.map((reg) => (
                    <React.Fragment key={`${reg.id}-metrics`}>
                      {/* Bulan Ini */}
                      <th className="py-1 px-1 border-r border-emerald-700 w-12 font-bold text-white bg-emerald-850">Real</th>
                      <th className="py-1 px-1 border-r border-emerald-700 w-12 font-bold text-white bg-emerald-800">RKAP</th>
                      <th className="py-1 px-0.5 border-r border-emerald-700 w-9 font-black text-amber-200 bg-emerald-900">%</th>

                      {/* Sd Bln Ini */}
                      <th className="py-1 px-1 border-r border-emerald-700 w-14 font-bold text-white bg-emerald-850">Real</th>
                      <th className="py-1 px-1 border-r border-emerald-700 w-14 font-bold text-white bg-emerald-800">RKAP</th>
                      <th className="py-1 px-0.5 border-r border-emerald-700 w-9 font-black text-amber-200 bg-emerald-900">%</th>

                      {/* Setahun */}
                      <th className="py-1 px-1 border-r border-emerald-700 w-14 font-bold text-white bg-emerald-900">RKAP</th>
                      <th className="py-1 px-0.5 border-r border-emerald-700 w-9 font-black text-amber-200 bg-emerald-950">%</th>
                    </React.Fragment>
                  ))}
                </tr>
              </thead>

              {/* Body: 13 Stages */}
              <tbody className="divide-y divide-slate-300 dark:divide-slate-700">
                {displayedMatrix.map((row, idx) => {
                  const isRekomtek = row.id === 'rekomtek';
                  const isPencairan = row.id === 'pencairan_dana';
                  const isSpecial = isRekomtek || isPencairan;

                  let rowBgClass = idx % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-slate-100/90 dark:bg-slate-800/80';
                  if (isRekomtek) {
                    rowBgClass = 'bg-emerald-100/95 dark:bg-emerald-950/80 font-bold';
                  } else if (isPencairan) {
                    rowBgClass = 'bg-blue-100/95 dark:bg-blue-950/80 font-bold';
                  }

                  return (
                    <tr key={row.id} className={`${rowBgClass} hover:bg-emerald-50 dark:hover:bg-slate-750 transition-colors`}>
                      {/* Stage Name Column (Sticky left) */}
                      <td className={`py-2 px-3 border-r border-slate-300 dark:border-slate-700 sticky left-0 z-10 ${
                        isRekomtek
                          ? 'bg-emerald-200 dark:bg-emerald-950 text-emerald-950 dark:text-emerald-100 font-black' 
                          : isPencairan
                          ? 'bg-blue-200 dark:bg-blue-950 text-blue-950 dark:text-blue-100 font-black'
                          : idx % 2 === 0 ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                      }`}>
                        <div className="flex items-center gap-2">
                          <div className="shrink-0">
                            {renderStageIcon(row.iconName, isSpecial, row.specialType)}
                          </div>
                          <span className={`text-[11px] leading-tight truncate ${isSpecial ? 'font-black' : 'font-bold'}`}>
                            {row.no}. {row.tahapan}
                          </span>
                          {isRekomtek && (
                            <span className="ml-auto px-1.5 py-0.2 rounded text-[9px] font-black bg-emerald-700 text-white shrink-0">
                              REKOMTEK
                            </span>
                          )}
                          {isPencairan && (
                            <span className="ml-auto px-1.5 py-0.2 rounded text-[9px] font-black bg-blue-700 text-white shrink-0">
                              BPDP
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Regional Data Cells */}
                      {visibleRegionals.map((reg) => {
                        const data = row.regionals[reg.id];
                        const isKonsolidasi = reg.id === 'KONSOLIDASI';

                        // Text colors for high contrast
                        const realTextColor = isRekomtek 
                          ? 'text-emerald-950 dark:text-emerald-100 font-black' 
                          : isPencairan 
                          ? 'text-blue-950 dark:text-blue-100 font-black'
                          : isKonsolidasi 
                          ? 'text-slate-950 dark:text-white font-black'
                          : 'text-slate-950 dark:text-white font-bold';

                        const rkapTextColor = isRekomtek
                          ? 'text-emerald-900 dark:text-emerald-200 font-bold'
                          : isPencairan
                          ? 'text-blue-900 dark:text-blue-200 font-bold'
                          : 'text-slate-800 dark:text-slate-200 font-semibold';

                        return (
                          <React.Fragment key={`${row.id}-${reg.id}`}>
                            {/* Bulan Ini */}
                            <td className={`py-1 px-1 text-right font-mono border-r border-slate-300 dark:border-slate-700 ${realTextColor}`}>
                              {formatNumber(data?.bulanIni?.realisasi || 0, 1)}
                            </td>
                            <td className={`py-1 px-1 text-right font-mono border-r border-slate-300 dark:border-slate-700 ${rkapTextColor}`}>
                              {formatNumber(data?.bulanIni?.rkap || 0, 1)}
                            </td>
                            <td className={`py-1 px-0.5 text-right font-mono border-r border-slate-300 dark:border-slate-700 font-black ${
                              (data?.bulanIni?.persen || 0) >= 100 
                                ? 'text-emerald-900 dark:text-emerald-300 bg-emerald-200/50 dark:bg-emerald-900/40' 
                                : (data?.bulanIni?.persen || 0) > 0 
                                ? 'text-slate-900 dark:text-slate-100' 
                                : 'text-slate-400 dark:text-slate-500'
                            }`}>
                              {(data?.bulanIni?.persen || 0).toFixed(1)}
                            </td>

                            {/* Sd Bln Ini */}
                            <td className={`py-1 px-1 text-right font-mono border-r border-slate-300 dark:border-slate-700 ${realTextColor}`}>
                              {formatNumber(data?.sdBulanIni?.realisasi || 0, 1)}
                            </td>
                            <td className={`py-1 px-1 text-right font-mono border-r border-slate-300 dark:border-slate-700 ${rkapTextColor}`}>
                              {formatNumber(data?.sdBulanIni?.rkap || 0, 1)}
                            </td>
                            <td className={`py-1 px-0.5 text-right font-mono border-r border-slate-300 dark:border-slate-700 font-black ${
                              (data?.sdBulanIni?.persen || 0) >= 100 
                                ? 'text-emerald-900 dark:text-emerald-300 bg-emerald-200/50 dark:bg-emerald-900/40' 
                                : (data?.sdBulanIni?.persen || 0) > 0
                                ? 'text-amber-900 dark:text-amber-300'
                                : 'text-slate-400 dark:text-slate-500'
                            }`}>
                              {(data?.sdBulanIni?.persen || 0).toFixed(1)}
                            </td>

                            {/* Setahun */}
                            <td className={`py-1 px-1 text-right font-mono border-r border-slate-300 dark:border-slate-700 ${rkapTextColor} font-black`}>
                              {formatNumber(data?.setahun?.rkap || 0, 1)}
                            </td>
                            <td className={`py-1 px-0.5 text-right font-mono font-black border-r border-slate-300 dark:border-slate-700 ${
                              (data?.setahun?.persen || 0) >= 100 
                                ? 'text-emerald-900 dark:text-emerald-300 bg-emerald-200/60 dark:bg-emerald-900/50' 
                                : 'text-slate-900 dark:text-slate-100'
                            }`}>
                              {(data?.setahun?.persen || 0).toFixed(1)}
                            </td>
                          </React.Fragment>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: KOMPILASI RKAP VS REAL KONSOLIDASI "PALMCO" (TANPA DEVIASI)       */}
        {/* ========================================================================= */}
        {activeViewMode === 'kompilasi' && (
          <div className="space-y-4">
            {/* Konsolidasi Executive Summary Box */}
            <div className="p-4 rounded-xl bg-emerald-950 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-emerald-800">
              <div>
                <span className="px-2 py-0.5 bg-emerald-850 text-amber-300 font-mono text-[10px] font-black rounded uppercase ring-1 ring-amber-400/40">
                  Konsolidasi Nasional PalmCo
                </span>
                <h3 className="text-base font-black mt-1 text-white">
                  Kompilasi Capaian RKAP Vs Realisasi 13 Tahapan PSR ({selectedWeek} {selectedMonth} 2026)
                </h3>
                <p className="text-xs text-emerald-200">
                  Perbandingan target operasional bulanan, target s.d bulan berjalan, dan target tahunan RKAP 2026.
                </p>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <div className="text-right">
                  <div className="text-[10px] text-emerald-300 uppercase font-bold">Total Target RKAP PSR</div>
                  <div className="text-xl font-black text-white">22.568,0 <span className="text-xs font-normal">Ha</span></div>
                </div>
                <div className="h-8 w-px bg-emerald-700"></div>
                <div className="text-right">
                  <div className="text-[10px] text-emerald-300 uppercase font-bold">Realisasi Rekomtek</div>
                  <div className="text-xl font-black text-amber-300">
                    {formatNumber(rekomtekKonsolidasi?.sdBulanIni.realisasi || 0, 1)} <span className="text-xs font-normal text-white">Ha</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Kompilasi Table (NO DEVIASI COLUMN) */}
            <div className="overflow-x-auto rounded-xl border border-slate-300 dark:border-slate-700 shadow-2xs">
              <table className="w-full text-[11px] text-left border-collapse border border-slate-300 dark:border-slate-700">
                <thead>
                  <tr className="bg-emerald-950 text-white font-black text-center border-b border-emerald-800">
                    <th rowSpan={2} className="py-2.5 px-3 text-left w-64 border-r border-emerald-800">
                      No & Tahapan PSR Lengkap
                    </th>
                    <th colSpan={3} className="py-2 px-2 border-r border-emerald-800 bg-emerald-900">
                      Bulan Ini ({selectedMonth}) (Ha)
                    </th>
                    <th colSpan={3} className="py-2 px-2 border-r border-emerald-800 bg-emerald-850">
                      s.d. Bulan Ini ({selectedWeek} {selectedMonth}) (Ha)
                    </th>
                    <th colSpan={3} className="py-2 px-2 bg-emerald-900">
                      Target RKAP Setahun 2026
                    </th>
                  </tr>
                  <tr className="bg-emerald-800 text-white font-black text-center text-[10px] border-b border-slate-300 dark:border-slate-700">
                    {/* Bulan Ini (3 Columns: Realisasi, RKAP, %) */}
                    <th className="py-2 px-2 border-r border-emerald-700 w-24 bg-emerald-900">Realisasi</th>
                    <th className="py-2 px-2 border-r border-emerald-700 w-24 bg-emerald-850">RKAP</th>
                    <th className="py-2 px-1.5 border-r border-emerald-700 w-16 bg-emerald-950 text-amber-200">%</th>

                    {/* Sd Bulan Ini (3 Columns: Realisasi, RKAP, %) */}
                    <th className="py-2 px-2 border-r border-emerald-700 w-24 bg-emerald-900">Realisasi</th>
                    <th className="py-2 px-2 border-r border-emerald-700 w-24 bg-emerald-850">RKAP</th>
                    <th className="py-2 px-1.5 border-r border-emerald-700 w-16 bg-emerald-950 text-amber-200">%</th>

                    {/* Setahun (3 Columns: RKAP Setahun, Sisa Target, % Capaian) */}
                    <th className="py-2 px-2 border-r border-emerald-700 w-24 bg-emerald-900">RKAP Setahun</th>
                    <th className="py-2 px-2 border-r border-emerald-700 w-24 bg-emerald-850">Sisa Target</th>
                    <th className="py-2 px-1.5 w-18 bg-emerald-950 text-amber-200">% Capaian</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-300 dark:divide-slate-700">
                  {displayedKonsolidasi.map((item, idx) => {
                    const isRekomtek = item.stageId === 'rekomtek';
                    const isPencairan = item.stageId === 'pencairan_dana';
                    const isSpecial = isRekomtek || isPencairan;

                    let bgClass = idx % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-slate-100/90 dark:bg-slate-800/80';
                    if (isRekomtek) {
                      bgClass = 'bg-emerald-100/95 dark:bg-emerald-950/80 font-bold';
                    } else if (isPencairan) {
                      bgClass = 'bg-blue-100/95 dark:bg-blue-950/80 font-bold';
                    }

                    // High contrast text classes
                    const realClass = isRekomtek 
                      ? 'text-emerald-950 dark:text-emerald-100 font-black' 
                      : isPencairan 
                      ? 'text-blue-950 dark:text-blue-100 font-black' 
                      : 'text-slate-950 dark:text-white font-bold';

                    const rkapClass = isRekomtek 
                      ? 'text-emerald-900 dark:text-emerald-200 font-bold' 
                      : isPencairan 
                      ? 'text-blue-900 dark:text-blue-200 font-bold' 
                      : 'text-slate-800 dark:text-slate-200 font-semibold';

                    return (
                      <tr key={item.stageId} className={`${bgClass} hover:bg-emerald-50 dark:hover:bg-slate-750 transition-colors`}>
                        {/* Tahapan Name */}
                        <td className="py-2.5 px-3 border-r border-slate-300 dark:border-slate-700">
                          <div className="flex items-center gap-2">
                            <div className="shrink-0">
                              {renderStageIcon(item.iconName, isSpecial, item.specialType)}
                            </div>
                            <span className={`text-[11.5px] ${isSpecial ? 'font-black' : 'font-bold'} text-slate-950 dark:text-white`}>
                              {item.no}. {item.tahapan}
                            </span>
                            {isRekomtek && (
                              <span className="ml-auto px-1.5 py-0.5 rounded text-[9px] font-black bg-emerald-700 text-white shrink-0">
                                REKOMTEK
                              </span>
                            )}
                            {isPencairan && (
                              <span className="ml-auto px-1.5 py-0.5 rounded text-[9px] font-black bg-blue-700 text-white shrink-0">
                                BPDP DANA
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Bulan Ini Data */}
                        <td className={`py-2 px-2 text-right font-mono border-r border-slate-300 dark:border-slate-700 ${realClass}`}>
                          {formatNumber(item.bulanIniReal, 1)}
                        </td>
                        <td className={`py-2 px-2 text-right font-mono border-r border-slate-300 dark:border-slate-700 ${rkapClass}`}>
                          {formatNumber(item.bulanIniRkap, 1)}
                        </td>
                        <td className={`py-2 px-1.5 text-right font-mono font-black border-r border-slate-300 dark:border-slate-700 ${
                          item.bulanIniPersen >= 100 ? 'text-emerald-900 dark:text-emerald-300 bg-emerald-200/50 dark:bg-emerald-900/40' : 'text-slate-900 dark:text-slate-100'
                        }`}>
                          {item.bulanIniPersen.toFixed(1)}%
                        </td>

                        {/* s.d. Bulan Ini Data */}
                        <td className={`py-2 px-2 text-right font-mono border-r border-slate-300 dark:border-slate-700 ${realClass}`}>
                          {formatNumber(item.sdBulanIniReal, 1)}
                        </td>
                        <td className={`py-2 px-2 text-right font-mono border-r border-slate-300 dark:border-slate-700 ${rkapClass}`}>
                          {formatNumber(item.sdBulanIniRkap, 1)}
                        </td>
                        <td className={`py-2 px-1.5 text-right font-mono font-black border-r border-slate-300 dark:border-slate-700 ${
                          item.sdBulanIniPersen >= 100 ? 'text-emerald-900 dark:text-emerald-300 bg-emerald-200/50 dark:bg-emerald-900/40' : 'text-amber-900 dark:text-amber-300'
                        }`}>
                          {item.sdBulanIniPersen.toFixed(1)}%
                        </td>

                        {/* Setahun Data */}
                        <td className={`py-2 px-2 text-right font-mono font-black border-r border-slate-300 dark:border-slate-700 ${rkapClass}`}>
                          {formatNumber(item.rkapSetahun, 1)}
                        </td>
                        <td className={`py-2 px-2 text-right font-mono border-r border-slate-300 dark:border-slate-700 ${rkapClass}`}>
                          {formatNumber(item.sisaTargetSetahun, 1)}
                        </td>
                        <td className={`py-2 px-1.5 text-right font-mono font-black ${
                          item.capaianSetahunPersen >= 100 
                            ? 'text-emerald-900 dark:text-emerald-300 bg-emerald-200 dark:bg-emerald-950' 
                            : 'text-slate-950 dark:text-white'
                        }`}>
                          {item.capaianSetahunPersen.toFixed(1)}%
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Footer Note on Presentation Canvas */}
        <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 gap-2 font-medium">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-emerald-200 border border-emerald-600 inline-block"></span>
              <span className="font-bold text-emerald-950 dark:text-emerald-300">Rekomtek (Warna Spesial Emerald)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-blue-200 border border-blue-600 inline-block"></span>
              <span className="font-bold text-blue-950 dark:text-blue-300">Pencairan Dana dari BPDP (Warna Spesial Biru)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-slate-200 border border-slate-400 inline-block"></span>
              <span className="font-medium text-slate-800 dark:text-slate-200">Tahapan Operasional Lainnya (Seragam)</span>
            </div>
          </div>
          <div className="font-mono text-[10.5px] font-bold text-slate-700 dark:text-slate-300">
            PT Perkebunan Nusantara IV Sub-Holding PalmCo • Rekapitulasi Tahapan PSR 2026
          </div>
        </div>
      </div>
    </div>
  );
};
