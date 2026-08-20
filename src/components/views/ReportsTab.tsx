import React from 'react';
import { usePsr } from '../../context/PsrContext';
import { formatHectare, formatIDR, formatFullIDR, formatDate, formatNumber } from '../../lib/utils';
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
  Users2
} from 'lucide-react';

export const ReportsTab: React.FC = () => {
  const { filteredKudList, kpiMetrics, setIsExportModalOpen, activeRole } = usePsr();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-16 max-w-5xl mx-auto">
      {/* Top Action Bar */}
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs print:hidden">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-600" />
            <span>Laporan Eksekutif Dewan Direksi (BOD Executive Summary)</span>
          </h3>
          <p className="text-xs text-slate-500">
            Dokumen resmi rekapitulasi progres peremajaan sawit rakyat PTPN IV PalmCo
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>Cetak / Simpan PDF</span>
          </button>

          <button
            onClick={() => setIsExportModalOpen(true)}
            className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Ekspor Spreadsheet (.CSV)</span>
          </button>
        </div>
      </div>

      {/* Printable Report Document Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm print:border-none print:shadow-none space-y-6 text-slate-900 dark:text-slate-100">
        {/* Letterhead */}
        <div className="border-b-2 border-emerald-800 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-800 to-emerald-950 text-white flex items-center justify-center font-black text-lg shadow-md">
              🌴 IV
            </div>
            <div>
              <h1 className="text-base font-black uppercase tracking-wider text-emerald-950 dark:text-emerald-400">
                PT PERKEBUNAN NUSANTARA IV (PERSERO)
              </h1>
              <p className="text-xs font-bold text-slate-600 dark:text-slate-300">
                SUB-HOLDING PALMCO • DIVISI KEMITRAAN & PEREMAJAAN SAWIT RAKYAT (PSR)
              </p>
              <p className="text-[10px] text-slate-400">
                Gedung Agro Plaza, Jl. HR. Rasuna Said, Jakarta Selatan / Kantor Direksi Medan
              </p>
            </div>
          </div>

          <div className="text-right text-xs">
            <div className="font-mono font-bold text-slate-800 dark:text-slate-200">
              MEMO-PSR/PTPN4/2026/03
            </div>
            <div className="text-[11px] text-slate-500">
              Tanggal: {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
            <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">
              Klasifikasi: RAHASIA / DIREKSI
            </div>
          </div>
        </div>

        {/* Memo Header */}
        <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-1.5">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
            <span className="font-bold text-slate-500">Kepada:</span>
            <span className="sm:col-span-3 font-bold text-slate-900 dark:text-white">
              Board of Directors (BOD) PT Perkebunan Nusantara IV PalmCo
            </span>

            <span className="font-bold text-slate-500">Dari:</span>
            <span className="sm:col-span-3 font-semibold text-slate-800 dark:text-slate-200">
              Tim Satgas Percepatan Kemitraan PSR & Keberlanjutan Pekebun
            </span>

            <span className="font-bold text-slate-500">Perihal:</span>
            <span className="sm:col-span-3 font-bold text-emerald-700 dark:text-emerald-400">
              Laporan Eksekutif Capaian Realisasi Rekomtek, Tanam Fisik, dan Pencairan Dana BPDPKS Program PSR
            </span>
          </div>
        </div>

        {/* Executive Highlights Grid */}
        <div className="space-y-2">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-1">
            I. Ringkasan Kinerja Utama (Executive Summary)
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-emerald-50/50 dark:bg-emerald-950/20 text-xs">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Total Luas Rekomtek</span>
              <span className="text-lg font-black text-emerald-800 dark:text-emerald-300">
                {formatHectare(kpiMetrics.totalLuasRekomtek)}
              </span>
              <span className="text-[10px] text-slate-500 block mt-0.5">{kpiMetrics.persenCapaianRekomtek.toFixed(1)}% dari Target Usulan</span>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-teal-50/50 dark:bg-teal-950/20 text-xs">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Realisasi Tanam Fisik</span>
              <span className="text-lg font-black text-teal-800 dark:text-teal-300">
                {formatHectare(kpiMetrics.totalLuasTanam)}
              </span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Rata-rata Fisik {kpiMetrics.rataRataProgresFisik.toFixed(1)}%</span>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-orange-50/50 dark:bg-orange-950/20 text-xs">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Dana BPDPKS Terserap</span>
              <span className="text-lg font-black text-orange-800 dark:text-orange-300">
                {formatIDR(kpiMetrics.totalDanaCair)}
              </span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Skema Bantuan Hibah Sawit</span>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-blue-50/50 dark:bg-blue-950/20 text-xs">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Pekebun / KK Terbantu</span>
              <span className="text-lg font-black text-blue-800 dark:text-blue-300">
                {formatNumber(kpiMetrics.totalKk)} KK
              </span>
              <span className="text-[10px] text-slate-500 block mt-0.5">{kpiMetrics.totalKud} Lembaga Pekebun</span>
            </div>
          </div>
        </div>

        {/* Regional Matrix Table */}
        <div className="space-y-2">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-1">
            II. Matriks Kinerja Capaian Per Regional PTPN IV
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700">
                  <th className="py-2.5 px-3 font-bold">Wilayah Regional</th>
                  <th className="py-2.5 px-3 font-bold text-center">Jumlah KUD</th>
                  <th className="py-2.5 px-3 font-bold text-right">Luas Rekomtek</th>
                  <th className="py-2.5 px-3 font-bold text-right">Realisasi Tanam</th>
                  <th className="py-2.5 px-3 font-bold text-right">Dana Tersalurkan</th>
                  <th className="py-2.5 px-3 font-bold text-center">Petani (KK)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {kpiMetrics.regionalBreakdown.map(reg => (
                  <tr key={reg.regional} className="hover:bg-slate-50/50">
                    <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white">
                      {reg.regional}
                    </td>
                    <td className="py-2.5 px-3 text-center font-semibold">
                      {reg.kudCount} KUD
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold text-emerald-700 dark:text-emerald-400">
                      {formatHectare(reg.totalLuasRekomtek)}
                    </td>
                    <td className="py-2.5 px-3 text-right font-semibold text-teal-700 dark:text-teal-400">
                      {formatHectare(reg.totalLuasTanam)}
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold text-orange-600 dark:text-orange-400">
                      {formatIDR(reg.totalDanaCair)}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      {reg.totalKk} KK
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Actionable Directives & Signature */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-700 grid grid-cols-1 sm:grid-cols-2 gap-8 text-xs">
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Arahan Strategis Manajemen:</span>
            </h4>
            <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-1 leading-relaxed">
              <li>Percepat pemenuhan verifikasi berkas SHM di BPN untuk memitigasi bottleneck terbitnya Rekomtek.</li>
              <li>Pastikan kepatuhan zero-burning dan perlakuan sanitasi lubang tanam (Ganoderma) di seluruh regional.</li>
              <li>Pertahankan model Single Management sebagai prioritas utama pengamanan pasokan TBS PKS PTPN IV.</li>
            </ul>
          </div>

          <div className="text-center sm:text-right space-y-8 flex flex-col justify-end">
            <div>
              <p className="text-slate-500 text-[11px]">Jakarta / Medan, {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <p className="font-bold text-slate-900 dark:text-slate-100 mt-1">
                Satgas Peremajaan Sawit Rakyat (PSR) PTPN IV
              </p>
            </div>
            <div className="pt-6">
              <p className="font-bold text-slate-900 dark:text-slate-100 underline decoration-slate-400 underline-offset-4">
                Senior Executive Vice President (SEVP) Kemitraan
              </p>
              <p className="text-[10px] text-slate-500 font-mono">PTPN IV PalmCo Holding</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
