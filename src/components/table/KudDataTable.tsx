import React, { useState, useMemo } from 'react';
import { usePsr } from '../../context/PsrContext';
import { KudRecord } from '../../types/psr';
import { formatHectare, formatIDR, formatNumber, formatDate } from '../../lib/utils';
import { 
  ArrowUpDown, 
  ChevronLeft, 
  ChevronRight, 
  Eye, 
  Edit3, 
  Trash2, 
  Download, 
  Plus, 
  Building2, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  ShieldCheck,
  Search,
  SlidersHorizontal,
  FileSpreadsheet
} from 'lucide-react';

interface KudDataTableProps {
  showTitle?: boolean;
  limitRows?: number;
}

export const KudDataTable: React.FC<KudDataTableProps> = ({ 
  showTitle = true,
  limitRows
}) => {
  const { 
    filteredKudList, 
    setSelectedKudDetail, 
    setSelectedKudEdit, 
    deleteKud, 
    setIsCreateModalOpen,
    setIsExportModalOpen,
    filters,
    setFilter
  } = usePsr();

  const [sortField, setSortField] = useState<keyof KudRecord>('luasRekomtekHa');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(limitRows || 10);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Sorting Handler
  const handleSort = (field: keyof KudRecord) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // Sorted and Paginated Data
  const sortedData = useMemo(() => {
    return [...filteredKudList].sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];

      if (aVal === undefined || aVal === null) return 1;
      if (bVal === undefined || bVal === null) return -1;

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }

      const aStr = aVal.toString().toLowerCase();
      const bStr = bVal.toString().toLowerCase();
      if (aStr < bStr) return sortDirection === 'asc' ? -1 : 1;
      if (aStr > bStr) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredKudList, sortField, sortDirection]);

  const totalPages = Math.ceil(sortedData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  // Bulk Selection Handlers
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(paginatedData.map(d => d.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Status Badge Helper
  const renderKemitraanBadge = (status: KudRecord['statusKemitraan'] | string) => {
    switch (status) {
      case 'Offtaker':
      case 'Off-Taker TBS':
      case 'Full Off-taker & Pemeliharaan':
        return <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">Offtaker</span>;
      case 'Kemitraan':
      case 'Single Management':
        return <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">Kemitraan</span>;
      case 'Revitbun':
      case 'Penyediaan Bibit & Agronomi':
        return <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800">Revitbun</span>;
      default:
        return <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-700">{status}</span>;
    }
  };

  const renderPencairanBadge = (status: KudRecord['statusPencairan']) => {
    switch (status) {
      case 'Cair Penuh (100%)':
        return <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400"><CheckCircle className="w-2.5 h-2.5" /> Cair 100%</span>;
      case 'Cair Tahap 1 (70%)':
        return <span className="inline-flex items-center gap-1 text-[10px] font-bold text-orange-600 dark:text-orange-400"><Clock className="w-2.5 h-2.5" /> Cair Tahap 1</span>;
      case 'Proses Bank Penampung':
        return <span className="inline-flex items-center gap-1 text-[10px] font-medium text-blue-600 dark:text-blue-400"><Clock className="w-2.5 h-2.5" /> Proses Bank</span>;
      default:
        return <span className="inline-flex items-center gap-1 text-[10px] font-medium text-slate-400"><AlertCircle className="w-2.5 h-2.5" /> Belum Cair</span>;
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden flex flex-col">
      {/* Table Header Controls */}
      {showTitle && (
        <div className="p-3 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-50/50 dark:bg-slate-900/50">
          <div>
            <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 uppercase tracking-tight">
              <span>Tabel Rekapitulasi KUD / Gapoktan Mitra PSR</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold">
                {filteredKudList.length} Entitas
              </span>
            </h3>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">
              Monitoring progres administratif, realisasi pencairan dana BPDPKS, dan tanam fisik
            </p>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              id="table-add-kud-btn"
              onClick={() => setIsCreateModalOpen(true)}
              className="px-2.5 py-1 rounded text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Usulan</span>
            </button>

            <button
              id="table-export-btn"
              onClick={() => setIsExportModalOpen(true)}
              className="px-2.5 py-1 rounded text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Ekspor</span>
            </button>
          </div>
        </div>
      )}

      {/* Responsive Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 select-none text-[10px] uppercase tracking-wider font-bold">
              <th className="py-2 px-2.5 w-8 text-center">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={paginatedData.length > 0 && selectedIds.length === paginatedData.length}
                  className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5"
                />
              </th>
              
              <th 
                onClick={() => handleSort('namaKud')}
                className="py-2 px-2.5 cursor-pointer hover:text-emerald-700 dark:hover:text-emerald-400"
              >
                <div className="flex items-center gap-1">
                  <span>Nama KUD</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>

              <th 
                onClick={() => handleSort('regional')}
                className="py-2 px-2.5 cursor-pointer hover:text-emerald-700 dark:hover:text-emerald-400"
              >
                <div className="flex items-center gap-1">
                  <span>Regional & Wilayah</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>

              <th 
                onClick={() => handleSort('statusKemitraan')}
                className="py-2 px-2.5 cursor-pointer hover:text-emerald-700 dark:hover:text-emerald-400"
              >
                <div className="flex items-center gap-1">
                  <span>Model</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>

              <th 
                onClick={() => handleSort('tahapanPsr')}
                className="py-2 px-2.5 cursor-pointer hover:text-emerald-700 dark:hover:text-emerald-400"
              >
                <div className="flex items-center gap-1">
                  <span>Tahapan & Fisik</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>

              <th 
                onClick={() => handleSort('luasRekomtekHa')}
                className="py-2 px-2.5 cursor-pointer hover:text-emerald-700 dark:hover:text-emerald-400 text-right"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>Rekomtek / Tanam</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>

              <th 
                onClick={() => handleSort('totalNilaiPencairan')}
                className="py-2 px-2.5 cursor-pointer hover:text-emerald-700 dark:hover:text-emerald-400 text-right"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>Pencairan BPDPKS</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>

              <th className="py-2 px-2.5 text-center">PKS & Petani</th>

              <th className="py-2 px-2.5 text-center w-24">Aksi</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200 text-xs">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-8 text-center text-slate-400 dark:text-slate-500">
                  <div className="flex flex-col items-center justify-center gap-1.5">
                    <SlidersHorizontal className="w-6 h-6 text-slate-300 dark:text-slate-600" />
                    <p className="font-semibold text-xs">Tidak ada data KUD yang cocok dengan filter</p>
                    <button
                      onClick={() => setFilter('searchQuery', '')}
                      className="text-[11px] text-emerald-600 hover:underline cursor-pointer"
                    >
                      Reset kata kunci pencarian
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedData.map((kud) => {
                const isSelected = selectedIds.includes(kud.id);
                return (
                  <tr 
                    key={kud.id}
                    className={`hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors ${
                      isSelected ? 'bg-emerald-50/40 dark:bg-emerald-950/20' : ''
                    }`}
                  >
                    {/* Checkbox */}
                    <td className="py-2 px-2.5 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleSelectOne(kud.id)}
                        className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5"
                      />
                    </td>

                    {/* Nama KUD */}
                    <td className="py-2 px-2.5">
                      <div className="font-bold text-slate-900 dark:text-slate-100 hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer"
                           onClick={() => setSelectedKudDetail(kud)}>
                        {kud.namaKud}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                        {kud.kodeKud} • {kud.jenisKelembagaan}
                      </div>
                    </td>

                    {/* Regional & Wilayah */}
                    <td className="py-2 px-2.5">
                      <div className="font-semibold text-slate-800 dark:text-slate-200">
                        {kud.regional}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">
                        {kud.kabupaten}, {kud.provinsi}
                      </div>
                    </td>

                    {/* Model Kemitraan */}
                    <td className="py-2 px-2.5">
                      {renderKemitraanBadge(kud.statusKemitraan)}
                      <div className="text-[9px] text-slate-500 dark:text-slate-400 mt-0.5">
                        <span>Perolehan: {kud.tahunPerolehan || 2024}</span> • <span>Tanam: {kud.tahunTanamBatch}</span>
                      </div>
                    </td>

                    {/* Tahapan & Progres Fisik */}
                    <td className="py-2 px-2.5">
                      <div className="font-medium text-slate-800 dark:text-slate-200 truncate max-w-[130px] text-[11px]" title={kud.tahapanPsr}>
                        {kud.tahapanPsr}
                      </div>
                      <div className="flex items-center gap-1 mt-0.5">
                        <div className="w-14 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-emerald-600 rounded-full" 
                            style={{ width: `${kud.progresFisikPersen}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                          {kud.progresFisikPersen}%
                        </span>
                      </div>
                    </td>

                    {/* Luas Rekomtek / Tanam */}
                    <td className="py-2 px-2.5 text-right">
                      <div className="font-bold text-slate-900 dark:text-slate-100">
                        {formatHectare(kud.luasRekomtekHa)}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">
                        Tanam: <span className="font-semibold text-teal-600 dark:text-teal-400">{formatHectare(kud.luasTanamHa)}</span>
                      </div>
                    </td>

                    {/* Pencairan BPDPKS */}
                    <td className="py-2 px-2.5 text-right">
                      <div className="font-bold text-orange-600 dark:text-orange-400 text-[11px]">
                        {formatIDR(kud.totalNilaiPencairan)}
                      </div>
                      <div className="mt-0.5">
                        {renderPencairanBadge(kud.statusPencairan)}
                      </div>
                    </td>

                    {/* PKS Mitra & Petani */}
                    <td className="py-2 px-2.5 text-center">
                      <div className="font-semibold text-slate-800 dark:text-slate-200">
                        {kud.jumlahKk} KK
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate max-w-[110px] mx-auto" title={kud.unitPksMitra}>
                        {kud.unitPksMitra.split('/')[0]}
                      </div>
                    </td>

                    {/* Action Buttons */}
                    <td className="py-2 px-2.5 text-center">
                      <div className="flex items-center justify-center gap-0.5">
                        <button
                          id={`btn-view-${kud.id}`}
                          onClick={() => setSelectedKudDetail(kud)}
                          title="Lihat Detail"
                          className="p-1 rounded text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-emerald-600 transition-colors cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        <button
                          id={`btn-edit-${kud.id}`}
                          onClick={() => setSelectedKudEdit(kud)}
                          title="Edit Data"
                          className="p-1 rounded text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 transition-colors cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          id={`btn-del-${kud.id}`}
                          onClick={() => setDeleteConfirmId(kud.id)}
                          title="Hapus"
                          className="p-1 rounded text-slate-600 dark:text-slate-300 hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:text-rose-600 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Table Pagination & Stats Footer */}
      <div className="p-2.5 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="flex items-center gap-2">
          <span>
            Menampilkan <strong className="text-slate-800 dark:text-slate-200">{paginatedData.length > 0 ? (currentPage - 1) * pageSize + 1 : 0}</strong> - <strong className="text-slate-800 dark:text-slate-200">{Math.min(currentPage * pageSize, sortedData.length)}</strong> dari <strong className="text-slate-800 dark:text-slate-200">{sortedData.length}</strong> entitas
          </span>

          <div className="hidden sm:flex items-center gap-1">
            <span>Per hal:</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="text-[11px] py-0.5 px-1.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>

        {/* Pagination Buttons */}
        <div className="flex items-center gap-1 self-center sm:self-auto">
          <button
            id="pagination-prev-btn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            className="p-1 rounded border border-slate-200 dark:border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
            if (totalPages > 6 && Math.abs(page - currentPage) > 2 && page !== 1 && page !== totalPages) {
              if (page === 2 || page === totalPages - 1) {
                return <span key={page} className="px-1 text-slate-400">...</span>;
              }
              return null;
            }
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-6 h-6 rounded font-semibold text-[11px] transition-colors cursor-pointer ${
                  currentPage === page
                    ? 'bg-emerald-700 text-white'
                    : 'border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                {page}
              </button>
            );
          })}

          <button
            id="pagination-next-btn"
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            className="p-1 rounded border border-slate-200 dark:border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Safe Delete Confirmation Dialog Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-xl max-w-sm w-full p-5 border border-slate-200 dark:border-slate-800 shadow-xl animate-in fade-in zoom-in-95 duration-150">
            <div className="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-600 flex items-center justify-center mx-auto mb-3">
              <Trash2 className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-center text-slate-900 dark:text-slate-100 mb-1">
              Konfirmasi Hapus Data KUD
            </h4>
            <p className="text-xs text-center text-slate-500 dark:text-slate-400 mb-4">
              Apakah Anda yakin ingin menghapus data KUD ini dari sistem monitoring PSR PTPN IV?
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2 px-3 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  deleteKud(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                className="flex-1 py-2 px-3 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold cursor-pointer"
              >
                Hapus Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
