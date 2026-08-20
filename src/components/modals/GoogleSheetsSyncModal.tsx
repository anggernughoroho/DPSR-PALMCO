import React, { useState } from 'react';
import { usePsr } from '../../context/PsrContext';
import { 
  X, 
  FileSpreadsheet, 
  RefreshCw, 
  CheckCircle2, 
  Link2, 
  Database, 
  Clock, 
  RotateCcw, 
  ExternalLink,
  ShieldCheck,
  TableProperties,
  Layers,
  MapPin
} from 'lucide-react';
import { OFFICIAL_SHEET_URL, OFFICIAL_SHEET_NAME, OFFICIAL_SHEET_GID } from '../../lib/googleSheetParser';

export const GoogleSheetsSyncModal: React.FC = () => {
  const { 
    isGoogleSheetModalOpen, 
    setIsGoogleSheetModalOpen, 
    sheetConfig, 
    syncGoogleSheet, 
    updateSheetConfig,
    resetToDefaultData,
    showNotification,
    kudList
  } = usePsr();

  const [inputUrl, setInputUrl] = useState(sheetConfig.sheetUrl || OFFICIAL_SHEET_URL);
  const [sheetTabName, setSheetTabName] = useState(sheetConfig.sheetName || OFFICIAL_SHEET_NAME);
  const [isSaving, setIsSaving] = useState(false);

  if (!isGoogleSheetModalOpen) return null;

  const handleSaveConfig = () => {
    setIsSaving(true);
    updateSheetConfig({
      sheetUrl: inputUrl,
      sheetName: sheetTabName
    });
    setTimeout(() => {
      setIsSaving(false);
      showNotification('Konfigurasi Google Sheets berhasil disimpan');
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-xl max-w-2xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-3.5 bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white shrink-0">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs font-bold uppercase tracking-tight flex items-center gap-2">
                <span>Sumber Data: Google Sheets Master PSR</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/30 text-emerald-300 font-normal">
                  Live Connected
                </span>
              </h2>
              <p className="text-[10px] text-emerald-300">
                PTPN IV PalmCo • Sheet: <strong className="text-white">{OFFICIAL_SHEET_NAME}</strong> (GID: {OFFICIAL_SHEET_GID})
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsGoogleSheetModalOpen(false)}
            className="p-1 rounded-md bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3 text-xs">
          {/* Status Banner */}
          <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <div>
                <span className="font-bold text-emerald-900 dark:text-emerald-200 text-xs flex items-center gap-1.5">
                  <span>Terhubung ke Database Pivot & Looker</span>
                  <span className="text-[10px] font-mono px-1 rounded bg-emerald-200 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200">
                    {kudList.length} Entitas Aktif
                  </span>
                </span>
                <span className="text-[10px] text-emerald-700 dark:text-emerald-400 block">
                  Terakhir sinkronisasi: <strong>{sheetConfig.lastSynced}</strong>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <a
                href={OFFICIAL_SHEET_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-1 rounded bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 font-semibold text-[10px] flex items-center gap-1 transition-colors"
              >
                <span>Buka Spreadsheet</span>
                <ExternalLink className="w-3 h-3 text-emerald-600" />
              </a>

              <button
                onClick={syncGoogleSheet}
                disabled={sheetConfig.isSyncing}
                className="px-2.5 py-1 rounded bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-[10px] flex items-center gap-1 transition-colors cursor-pointer"
              >
                <RefreshCw className={`w-3 h-3 ${sheetConfig.isSyncing ? 'animate-spin' : ''}`} />
                <span>{sheetConfig.isSyncing ? 'Menyinkronkan...' : 'Sinkronkan Sekarang'}</span>
              </button>
            </div>
          </div>

          {/* Form Configuration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[10px] font-semibold text-slate-600 dark:text-slate-400 mb-0.5">
                URL Google Spreadsheet Sumber
              </label>
              <input
                type="text"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                className="w-full text-[11px] py-1.5 px-2.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-1 focus:ring-emerald-500 font-mono truncate"
              />
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-600 dark:text-slate-400 mb-0.5">
                Nama Worksheet / Tab
              </label>
              <div className="flex gap-1.5">
                <input
                  type="text"
                  value={sheetTabName}
                  onChange={(e) => setSheetTabName(e.target.value)}
                  className="flex-1 text-[11px] py-1.5 px-2.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-1 focus:ring-emerald-500 font-semibold"
                />
                <button
                  onClick={handleSaveConfig}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-[10px] rounded transition-colors cursor-pointer shrink-0"
                >
                  {isSaving ? '...' : 'Simpan'}
                </button>
              </div>
            </div>
          </div>

          {/* Column Mapping Preview */}
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <span className="font-bold text-slate-900 dark:text-slate-100 text-[11px] flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-1">
              <span className="flex items-center gap-1.5">
                <TableProperties className="w-3.5 h-3.5 text-emerald-600" />
                <span>Struktur Pemetaan Kolom Sheet "DATABASE PIVOT + LOOKER"</span>
              </span>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[10px]">
              <div className="p-1.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="text-slate-400 block">Kolom A:</span>
                <strong className="text-slate-800 dark:text-slate-200">REGIONAL (REG I - VII)</strong>
              </div>
              <div className="p-1.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="text-slate-400 block">Kolom B:</span>
                <strong className="text-slate-800 dark:text-slate-200">NAMA KUD / MITRA</strong>
              </div>
              <div className="p-1.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="text-slate-400 block">Kolom C:</span>
                <strong className="text-slate-800 dark:text-slate-200">STATUS KEMITRAAN</strong>
              </div>
              <div className="p-1.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="text-slate-400 block">Kolom F-I:</span>
                <strong className="text-slate-800 dark:text-slate-200">DESA, KEC, KAB, PROV</strong>
              </div>
              <div className="p-1.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="text-slate-400 block">Kolom K:</span>
                <strong className="text-slate-800 dark:text-slate-200">KLASIFIKASI TANAMAN</strong>
              </div>
              <div className="p-1.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="text-slate-400 block">Kolom L-M:</span>
                <strong className="text-slate-800 dark:text-slate-200">LUAS REKOMTEK & TANAM</strong>
              </div>
              <div className="p-1.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="text-slate-400 block">Kolom N-O:</span>
                <strong className="text-slate-800 dark:text-slate-200">BANTUAN & TOTAL DANA</strong>
              </div>
              <div className="p-1.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="text-slate-400 block">Kolom R-T:</span>
                <strong className="text-slate-800 dark:text-slate-200">KOORDINAT LAT, LNG, MAPS</strong>
              </div>
            </div>
          </div>

          {/* Reset Action */}
          <div className="pt-1 flex items-center justify-between">
            <button
              onClick={resetToDefaultData}
              className="text-[11px] text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1 cursor-pointer font-medium"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Muat Ulang Data Master Google Sheets</span>
            </button>

            <button
              onClick={() => setIsGoogleSheetModalOpen(false)}
              className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded transition-colors cursor-pointer"
            >
              Selesai
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

