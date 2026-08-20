import React from 'react';
import { PsrProvider, usePsr } from './context/PsrContext';
import { Sidebar } from './components/layout/Sidebar';
import { Topbar } from './components/layout/Topbar';
import { OverviewView } from './components/views/OverviewView';
import { MapViewTab } from './components/views/MapViewTab';
import { KudTableTab } from './components/views/KudTableTab';
import { AnalyticsTab } from './components/views/AnalyticsTab';
import { ReportsTab } from './components/views/ReportsTab';
import { KudDetailModal } from './components/modals/KudDetailModal';
import { KudFormModal } from './components/modals/KudFormModal';
import { GoogleSheetsSyncModal } from './components/modals/GoogleSheetsSyncModal';
import { ExportReportModal } from './components/modals/ExportReportModal';
import { CheckCircle2, Info } from 'lucide-react';

const DashboardContent: React.FC = () => {
  const { activeTab, toastMessage } = usePsr();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024;
    }
    return true;
  });

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <OverviewView />;
      case 'map':
        return <MapViewTab />;
      case 'kud-list':
        return <KudTableTab />;
      case 'analytics':
        return <AnalyticsTab />;
      case 'reports':
        return <ReportsTab />;
      default:
        return <OverviewView />;
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-100/70 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 antialiased">
      {/* 1. Main Navigation Sidebar with Minimize/Expand support */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
      />

      {/* 2. Main Content Canvas */}
      <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
        {/* Top Header Bar */}
        <Topbar 
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen(prev => !prev)} 
        />

        {/* Scrollable View Area */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 py-5 bg-slate-50/50 dark:bg-slate-950">
          <div className="max-w-7xl mx-auto">
            {renderActiveView()}
          </div>
        </main>
      </div>

      {/* 3. Global Interactive Modals */}
      <KudDetailModal />
      <KudFormModal />
      <GoogleSheetsSyncModal />
      <ExportReportModal />

      {/* 4. Global Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white dark:bg-emerald-950 dark:text-emerald-100 dark:border dark:border-emerald-800 px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-semibold animate-in slide-in-from-bottom-5 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <PsrProvider>
      <DashboardContent />
    </PsrProvider>
  );
}
