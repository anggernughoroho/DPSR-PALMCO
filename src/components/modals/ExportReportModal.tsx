import React, { useState } from 'react';
import { usePsr } from '../../context/PsrContext';
import { formatHectare, formatIDR, formatNumber } from '../../lib/utils';
import { 
  X, 
  Download, 
  FileSpreadsheet, 
  FileText, 
  Printer, 
  CheckCircle2,
  Building2,
  Calendar,
  Layers
} from 'lucide-react';

export const ExportReportModal: React.FC = () => {
  const { 
    isExportModalOpen, 
    setIsExportModalOpen, 
    filteredKudList, 
    kudList, 
    kpiMetrics, 
    activeRole,
    showNotification
  } = usePsr();

  const [exportScope, setExportScope] = useState<'filtered' | 'all'>('filtered');
  const [exportFormat, setExportFormat] = useState<'csv' | 'print'>('csv');

  if (!isExportModalOpen) return null;

  const dataset = exportScope === 'filtered' ? filteredKudList : kudList;

  // Handle CSV Download
  const handleDownloadCsv = () => {
    const headers = [
      'KODE_KUD',
      'NAMA_KUD',
      'JENIS_KELEMBAGAAN',
      'REGIONAL',
      'PKS_MITRA',
      'PROVINSI',
      'KABUPATEN',
      'KECAMATAN',
      'DESA',
      'LATITUDE',
      'LONGITUDE',
      'NAMA_KETUA',
      'KONTAK',
      'STATUS_KEMITRAAN',
      'TAHAPAN_PSR',
      'KLASIFIKASI_TANAMAN',
      'TAHUN_BATCH',
      'VARIETAS_BIBIT',
      'TARGET_LUAS_HA',
      'LUAS_REKOMTEK_HA',
      'LUAS_PENCAIRAN_HA',
      'LUAS_TANAM_HA',
      'BANTUAN_PER_HA',
      'TOTAL_NILAI_PENCAIRAN',
      'STATUS_PENCAIRAN',
      'BANK_PENYALUR',
      'JUMLAH_KK',
      'PROGRES_FISIK_PERSEN',
      'NOMOR_REKOMTEK'
    ];

    const rows = dataset.map(k => [
      `"${k.kodeKud}"`,
      `"${k.namaKud.replace(/"/g, '""')}"`,
      `"${k.jenisKelembagaan}"`,
      `"${k.regional}"`,
      `"${k.unitPksMitra.replace(/"/g, '""')}"`,
      `"${k.provinsi}"`,
      `"${k.kabupaten}"`,
      `"${k.kecamatan}"`,
      `"${k.desa}"`,
      k.latitude,
      k.longitude,
      `"${k.namaKetua.replace(/"/g, '""')}"`,
      `"${k.kontak}"`,
      `"${k.statusKemitraan}"`,
      `"${k.tahapanPsr}"`,
      `"${k.klasifikasiTanaman}"`,
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
    link.setAttribute('download', `LAPORAN_MONITORING_PSR_PTPN4_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showNotification(`Laporan ${dataset.length} KUD berhasil diunduh dalam format Excel/CSV.`);
    setIsExportModalOpen(false);
  };

  const handlePrint = () => {
    setIsExportModalOpen(false);
    setTimeout(() => {
      window.print();
    }, 200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center text-white">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold">Ekspor Laporan Manajemen PSR</h2>
              <p className="text-xs text-emerald-300">PTPN IV PalmCo Board of Directors</p>
            </div>
          </div>

          <button
            onClick={() => setIsExportModalOpen(false)}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-5 space-y-4 text-xs">
          {/* Scope Selector */}
          <div>
            <label className="block font-bold text-slate-800 dark:text-slate-200 mb-2">
              Cakupan Data yang Diekspor:
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setExportScope('filtered')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  exportScope === 'filtered'
                    ? 'border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/40 font-bold text-emerald-800 dark:text-emerald-300 ring-2 ring-emerald-500/20'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs">Data Terfilter Saat Ini</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-200/60 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 font-bold">
                    {filteredKudList.length} KUD
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-normal">Sesuai filter regional & status aktif</p>
              </button>

              <button
                onClick={() => setExportScope('all')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  exportScope === 'all'
                    ? 'border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/40 font-bold text-emerald-800 dark:text-emerald-300 ring-2 ring-emerald-500/20'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs">Seluruh Database</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold">
                    {kudList.length} KUD
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-normal">Seluruh wilayah Regional 1 s/d 5</p>
              </button>
            </div>
          </div>

          {/* Format Selector */}
          <div>
            <label className="block font-bold text-slate-800 dark:text-slate-200 mb-2">
              Pilih Format Output:
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setExportFormat('csv')}
                className={`p-3 rounded-xl border flex items-center gap-3 transition-all cursor-pointer ${
                  exportFormat === 'csv'
                    ? 'border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/40 font-bold text-emerald-800 dark:text-emerald-300 ring-2 ring-emerald-500/20'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                <FileSpreadsheet className="w-5 h-5 text-emerald-600 shrink-0" />
                <div className="text-left">
                  <div className="text-xs font-bold">Spreadsheet / Excel (.CSV)</div>
                  <div className="text-[10px] text-slate-500 font-normal">Semua kolom data mentah</div>
                </div>
              </button>

              <button
                onClick={() => setExportFormat('print')}
                className={`p-3 rounded-xl border flex items-center gap-3 transition-all cursor-pointer ${
                  exportFormat === 'print'
                    ? 'border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/40 font-bold text-emerald-800 dark:text-emerald-300 ring-2 ring-emerald-500/20'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                <Printer className="w-5 h-5 text-blue-600 shrink-0" />
                <div className="text-left">
                  <div className="text-xs font-bold">Cetak / PDF Memo Direksi</div>
                  <div className="text-[10px] text-slate-500 font-normal">Format laporan eksekutif siap cetak</div>
                </div>
              </button>
            </div>
          </div>

          {/* Summary Preview Box */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5 text-[11px]">
            <div className="flex justify-between">
              <span className="text-slate-500">Jumlah Entitas:</span>
              <span className="font-bold text-slate-900 dark:text-white">{dataset.length} KUD / Kelompok Tani</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Total Luas Rekomtek:</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">{formatHectare(dataset.reduce((a, b) => a + b.luasRekomtekHa, 0))}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Total Nilai Pencairan:</span>
              <span className="font-bold text-orange-600 dark:text-orange-400">{formatIDR(dataset.reduce((a, b) => a + b.totalNilaiPencairan, 0))}</span>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex items-center justify-end gap-2">
            <button
              onClick={() => setIsExportModalOpen(false)}
              className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 text-xs font-semibold cursor-pointer"
            >
              Batal
            </button>
            <button
              onClick={exportFormat === 'csv' ? handleDownloadCsv : handlePrint}
              className="px-5 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{exportFormat === 'csv' ? 'Unduh CSV (.CSV)' : 'Buka Preview Cetak'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
