import React from 'react';
import { usePsr } from '../../context/PsrContext';
import { ActiveTab, RegionalType } from '../../types/psr';
import { 
  LayoutDashboard, 
  BarChart3, 
  MapPin, 
  Layers, 
  FileSpreadsheet, 
  FileText, 
  TrendingUp,
  PlusCircle, 
  Building2,
  PanelLeftClose,
  X
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const { activeTab, setActiveTab, setIsCreateModalOpen, setIsGoogleSheetModalOpen, kudList, setFilter, filters, activeRole } = usePsr();

  const navItems: { id: ActiveTab; label: string; icon: React.ElementType; badge?: string }[] = [
    { id: 'dashboard', label: 'Dashboard Utama', icon: LayoutDashboard },
    { id: 'highlight-progres', label: 'Highlight Progres', icon: TrendingUp, badge: 'RKO' },
    { id: 'map', label: 'Peta Sebaran KUD', icon: MapPin, badge: 'GIS' },
    { id: 'kud-list', label: 'Laporan Replanting', icon: Layers, badge: kudList.length.toString() },
    { id: 'analytics', label: 'Manajemen Kemitraan', icon: BarChart3 },
    { id: 'reports', label: 'Laporan Direksi (BOD)', icon: FileText }
  ];

  const regionalList: { id: RegionalType | 'ALL'; name: string }[] = [
    { id: 'ALL', name: 'Semua Regional' },
    { id: 'Regional 1', name: 'Regional 1' },
    { id: 'Regional 2', name: 'Regional 2' },
    { id: 'Regional 3', name: 'Regional 3' },
    { id: 'Regional 4', name: 'Regional 4' },
    { id: 'Regional 5', name: 'Regional 5' },
    { id: 'Regional 6', name: 'Regional 6' },
    { id: 'Regional 7', name: 'Regional 7' },
  ];

  // Calculate count per regional
  const regionalCounts = React.useMemo(() => {
    const counts: Record<string, number> = { ALL: kudList.length };
    kudList.forEach(k => {
      counts[k.regional] = (counts[k.regional] || 0) + 1;
    });
    return counts;
  }, [kudList]);

  return (
    <>
      {/* Mobile / Tablet Backdrop */}
      {isOpen && (
        <div 
          id="sidebar-backdrop"
          className="fixed inset-0 bg-slate-950/70 z-40 lg:hidden backdrop-blur-xs transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container: Supports both desktop toggle & mobile drawer */}
      <aside 
        id="main-navigation-sidebar"
        className={`
          fixed lg:static top-0 left-0 bottom-0 z-50 
          bg-emerald-900 border-r border-emerald-800 
          flex flex-col h-full 
          transition-all duration-300 ease-in-out
          print:hidden
          ${isOpen 
            ? 'w-64 translate-x-0 opacity-100 shadow-2xl lg:shadow-none' 
            : 'w-0 -translate-x-full lg:w-0 lg:p-0 opacity-0 pointer-events-none overflow-hidden border-r-0'
          }
        `}
        style={{ 
          minWidth: isOpen ? '16rem' : '0rem', 
          maxWidth: isOpen ? '16rem' : '0rem',
          width: isOpen ? '16rem' : '0rem'
        }}
      >
        {/* Brand Header with Minimize Button */}
        <div className="p-3.5 border-b border-emerald-800/60 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center font-bold text-white shadow-xs">
              P
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-white tracking-tight leading-tight uppercase text-xs">
                PSR PTPN IV
              </span>
              <span className="text-[10px] text-emerald-300 font-medium">
                Monitoring System
              </span>
            </div>
          </div>

          {/* Minimize / Close Button */}
          <button
            id="sidebar-minimize-btn"
            onClick={() => setIsOpen(false)}
            title="Minimize Navigasi (Sembunyikan)"
            className="p-1.5 rounded-md text-emerald-300 hover:text-white hover:bg-emerald-800/80 transition-colors cursor-pointer"
            aria-label="Tutup navigasi"
          >
            <PanelLeftClose className="w-4 h-4 hidden lg:block" />
            <X className="w-4 h-4 lg:hidden" />
          </button>
        </div>

        {/* Quick Action Button */}
        <div className="px-3 pt-3 space-y-1.5 shrink-0">
          <button
            id="sidebar-add-kud-btn"
            onClick={() => {
              setIsCreateModalOpen(true);
              if (window.innerWidth < 1024) setIsOpen(false);
            }}
            className="w-full py-1.5 px-3 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold rounded-md border border-emerald-600/60 shadow-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5 text-emerald-200" />
            <span>Tambah Usulan PSR</span>
          </button>

          <button
            id="sidebar-sheets-sync-btn"
            onClick={() => {
              setIsGoogleSheetModalOpen(true);
              if (window.innerWidth < 1024) setIsOpen(false);
            }}
            className="w-full py-1 px-2 bg-emerald-950/60 hover:bg-emerald-800/80 text-emerald-200 text-[11px] font-medium rounded-md border border-emerald-800 flex items-center justify-between transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-1.5 truncate">
              <FileSpreadsheet className="w-3 h-3 text-emerald-400 shrink-0" />
              <span className="truncate">Google Sheets Master</span>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          </button>
        </div>

        {/* Main Navigation */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4">
          <div>
            <div className="text-[10px] uppercase font-semibold text-emerald-400/60 mb-2 px-2 tracking-wider">
              Main Menu
            </div>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`sidebar-nav-${item.id}`}
                    onClick={() => {
                      setActiveTab(item.id);
                      if (window.innerWidth < 1024) setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-emerald-800 text-white font-semibold shadow-xs'
                        : 'text-emerald-100/80 hover:bg-emerald-800/50 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-emerald-300'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                        isActive 
                          ? 'bg-emerald-700 text-white font-bold' 
                          : 'bg-emerald-950/60 text-emerald-300'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Regional Slicer List (Regional 1 - 7) */}
          <div>
            <div className="text-[10px] uppercase font-bold text-emerald-400/80 mb-1.5 px-2 flex items-center justify-between tracking-wider">
              <span>Slicer Regional</span>
              <Building2 className="w-3 h-3 text-emerald-400/80" />
            </div>
            <div className="flex flex-col gap-0.5">
              {regionalList.map(reg => {
                const isSelected = filters.regional === reg.id || (reg.id === 'ALL' && filters.regional === 'ALL');
                const count = regionalCounts[reg.id] || 0;
                return (
                  <button
                    key={reg.id}
                    id={`sidebar-reg-filter-${reg.id.replace(/\s+/g, '-').toLowerCase()}`}
                    onClick={() => {
                      setFilter('regional', reg.id);
                      if (activeTab !== 'dashboard' && activeTab !== 'map' && activeTab !== 'kud-list') {
                        setActiveTab('dashboard');
                      }
                      if (window.innerWidth < 1024) setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-md text-xs transition-colors cursor-pointer text-left ${
                      isSelected
                        ? 'bg-emerald-800 text-white font-bold shadow-xs'
                        : 'text-emerald-100/70 hover:bg-emerald-800/40 hover:text-white font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-orange-400 ring-2 ring-orange-400/30' : 'bg-emerald-700'}`} />
                      <span className="text-xs">{reg.name}</span>
                    </div>
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                      isSelected 
                        ? 'bg-emerald-700 text-white font-bold' 
                        : 'bg-emerald-950/50 text-emerald-400/80'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* User Profile Footer */}
        <div className="p-3 bg-emerald-950/60 border-t border-emerald-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-orange-200 border-2 border-orange-500 text-orange-800 font-bold flex items-center justify-center text-xs shrink-0">
              P
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-white truncate leading-tight">{activeRole}</p>
              <p className="text-[10px] text-emerald-400 leading-tight">Administrator</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
