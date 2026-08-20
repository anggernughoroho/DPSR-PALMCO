import React, { useState } from 'react';
import { usePsr } from '../../context/PsrContext';
import { UserRole } from '../../types/psr';
import { 
  Menu, 
  Search, 
  Sun, 
  Moon, 
  RefreshCw, 
  Download, 
  Bell, 
  UserCheck, 
  FileSpreadsheet, 
  ChevronDown,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

interface TopbarProps {
  isSidebarOpen?: boolean;
  onToggleSidebar: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ isSidebarOpen = true, onToggleSidebar }) => {
  const { 
    activeTab,
    filters, 
    setFilter, 
    isDarkMode, 
    toggleDarkMode, 
    activeRole, 
    setActiveRole, 
    sheetConfig, 
    syncGoogleSheet,
    setIsExportModalOpen,
    setIsGoogleSheetModalOpen,
    filteredKudList,
    kudList
  } = usePsr();

  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  const tabLabels: Record<string, string> = {
    'dashboard': 'Dashboard Utama',
    'highlight-progres': 'Highlight Progres',
    'map': 'Peta Sebaran GIS',
    'kud-list': 'Laporan Replanting KUD',
    'analytics': 'Manajemen Kemitraan',
    'reports': 'Laporan Direksi (BOD)'
  };

  const roles: UserRole[] = [
    'Direktur Utama PalmCo',
    'SEVP Operation',
    'Kepala Divisi PSR',
    'Tim Monitoring Regional',
    'Agronomy Specialist'
  ];

  return (
    <header className="h-14 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 flex items-center justify-between z-30 shrink-0 print:hidden">
      {/* Left: Sidebar Toggle & Section Title */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        <button
          id="sidebar-toggle-btn"
          onClick={onToggleSidebar}
          className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
          title={isSidebarOpen ? 'Minimize Sidebar (Sembunyikan)' : 'Buka Sidebar Navigasi'}
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-1.5 truncate">
          <h1 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-tight truncate">
            Dashboard PSR
          </h1>
          <span className="text-slate-300 dark:text-slate-700">/</span>
          <span className="text-xs sm:text-sm font-semibold text-emerald-700 dark:text-emerald-400 truncate">
            {tabLabels[activeTab] || 'Dashboard Utama'}
          </span>
        </div>
      </div>

      {/* Right: Quick Search, Actions, Notifications & Profile Role */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Search Field */}
        <div className="relative">
          <input
            id="topbar-search-input"
            type="text"
            placeholder="Cari KUD atau Wilayah..."
            value={filters.searchQuery}
            onChange={(e) => setFilter('searchQuery', e.target.value)}
            className="bg-slate-100 dark:bg-slate-800 border-none text-xs rounded-full py-1.5 px-4 w-44 sm:w-64 focus:ring-1 focus:ring-emerald-500 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 outline-none"
          />
          {filters.searchQuery && (
            <button
              onClick={() => setFilter('searchQuery', '')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

        {/* Sheets Live Sync Icon Button */}
        <button
          id="topbar-sync-sheets-btn"
          onClick={syncGoogleSheet}
          disabled={sheetConfig.isSyncing}
          title={`Sinkronisasi Google Sheets (Terakhir: ${sheetConfig.lastSynced})`}
          className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
        >
          <RefreshCw className={`w-4 h-4 text-emerald-600 ${sheetConfig.isSyncing ? 'animate-spin' : ''}`} />
        </button>

        {/* Export Report Action */}
        <button
          id="topbar-export-btn"
          onClick={() => setIsExportModalOpen(true)}
          title="Ekspor Laporan"
          className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
        >
          <Download className="w-4 h-4" />
        </button>

        {/* Dark / Light Mode Toggle */}
        <button
          id="theme-toggle-btn"
          onClick={toggleDarkMode}
          className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
        </button>

        {/* Role Switcher */}
        <div className="relative">
          <button
            id="role-dropdown-btn"
            onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold transition-colors cursor-pointer shadow-xs"
          >
            <span className="hidden md:inline max-w-[120px] truncate">{activeRole}</span>
            <span className="md:hidden">BOD</span>
            <ChevronDown className="w-3 h-3 text-emerald-200" />
          </button>

          {isRoleDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-3 py-1.5 text-[10px] font-bold uppercase text-slate-400 border-b border-slate-100 dark:border-slate-700">
                Pilih Role Pengguna
              </div>
              {roles.map(r => (
                <button
                  key={r}
                  onClick={() => {
                    setActiveRole(r);
                    setIsRoleDropdownOpen(false);
                  }}
                  className={`w-full px-3 py-1.5 text-left text-xs flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer ${
                    activeRole === r ? 'font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40' : 'text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span className="truncate">{r}</span>
                  {activeRole === r && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
