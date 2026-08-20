import React, { useState } from 'react';
import { usePsr } from '../../context/PsrContext';
import { KudRecord } from '../../types/psr';
import { formatHectare, formatIDR, formatFullIDR, formatDate, formatNumber } from '../../lib/utils';
import { 
  X, 
  MapPin, 
  Building2, 
  Sprout, 
  Banknote, 
  Users2, 
  FileCheck2, 
  FileText, 
  Calendar, 
  Phone, 
  Trees, 
  CheckCircle2, 
  XCircle, 
  Edit3, 
  Printer, 
  Copy,
  ExternalLink,
  ShieldCheck,
  Compass,
  Clock
} from 'lucide-react';

export const KudDetailModal: React.FC = () => {
  const { selectedKudDetail, setSelectedKudDetail, setSelectedKudEdit, showNotification } = usePsr();
  const [activeTab, setActiveTab] = useState<'ringkasan' | 'agronomi' | 'finansial' | 'legalitas'>('ringkasan');

  if (!selectedKudDetail) return null;
  const kud = selectedKudDetail;

  const copyCoordinates = () => {
    navigator.clipboard.writeText(`${kud.latitude}, ${kud.longitude}`);
    showNotification('Koordinat GPS berhasil disalin ke clipboard');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-3xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 my-8">
        {/* Modal Header */}
        <div className="p-5 bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-900 text-white flex items-start justify-between relative">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                {kud.regional}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-400/30">
                {kud.statusKemitraan}
              </span>
              <span className="text-xs font-mono text-emerald-200/70">
                {kud.kodeKud}
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-black tracking-tight text-white">
              {kud.namaKud}
            </h2>
            <p className="text-xs text-emerald-200/90 flex items-center gap-1.5 mt-1">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Desa {kud.desa}, Kec. {kud.kecamatan}, Kab. {kud.kabupaten}, {kud.provinsi}</span>
            </p>
          </div>

          <button
            onClick={() => setSelectedKudDetail(null)}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 px-5 bg-slate-50 dark:bg-slate-900/60 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('ringkasan')}
            className={`py-3 px-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'ringkasan'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Ringkasan & Progres
          </button>
          <button
            onClick={() => setActiveTab('agronomi')}
            className={`py-3 px-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'agronomi'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Agronomi & Bibit
          </button>
          <button
            onClick={() => setActiveTab('finansial')}
            className={`py-3 px-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'finansial'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Pencairan BPDPKS
          </button>
          <button
            onClick={() => setActiveTab('legalitas')}
            className={`py-3 px-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'legalitas'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Legalitas & Dokumen
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-5 max-h-[60vh] overflow-y-auto space-y-4 text-xs">
          {activeTab === 'ringkasan' && (
            <div className="space-y-4">
              {/* 4 Quick Stat Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Luas Rekomtek</span>
                  <span className="text-base font-black text-emerald-700 dark:text-emerald-300">
                    {formatHectare(kud.luasRekomtekHa)}
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Target: {kud.targetLuasHa} Ha</span>
                </div>

                <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-100 dark:border-teal-900/50">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Realisasi Tanam</span>
                  <span className="text-base font-black text-teal-700 dark:text-teal-300">
                    {formatHectare(kud.luasTanamHa)}
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">
                    {formatNumber((kud.luasTanamHa / (kud.luasRekomtekHa || 1)) * 100, 1)}% dari Rekomtek
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-100 dark:border-orange-900/50">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Pencairan</span>
                  <span className="text-base font-black text-orange-700 dark:text-orange-300">
                    {formatIDR(kud.totalNilaiPencairan)}
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">{kud.statusPencairan}</span>
                </div>

                <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Dampak Sosial</span>
                  <span className="text-base font-black text-blue-700 dark:text-blue-300">
                    {kud.jumlahKk} KK
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Petani Anggota</span>
                </div>
              </div>

              {/* Progress Bar & Stage Status */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    Tahapan Aktif: <span className="text-emerald-700 dark:text-emerald-400">{kud.tahapanPsr}</span>
                  </span>
                  <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">
                    Progres Fisik {kud.progresFisikPersen}%
                  </span>
                </div>
                <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-600 to-teal-500 rounded-full transition-all duration-500" 
                    style={{ width: `${kud.progresFisikPersen}%` }}
                  />
                </div>
              </div>

              {/* Operational & Mitra Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/40 space-y-2">
                  <span className="font-bold text-slate-900 dark:text-slate-100 block border-b border-slate-100 dark:border-slate-700 pb-1">
                    Informasi Kemitraan & PKS
                  </span>
                  <div className="flex justify-between py-0.5">
                    <span className="text-slate-500">Unit Bisnis / PKS:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{kud.unitPksMitra}</span>
                  </div>
                  <div className="flex justify-between py-0.5">
                    <span className="text-slate-500">Model Kemitraan:</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">{kud.statusKemitraan}</span>
                  </div>
                  <div className="flex justify-between py-0.5">
                    <span className="text-slate-500">Tahun Perolehan Kemitraan:</span>
                    <span className="font-semibold text-emerald-700 dark:text-emerald-300 font-mono">Tahun {kud.tahunPerolehan || 2024}</span>
                  </div>
                  <div className="flex justify-between py-0.5">
                    <span className="text-slate-500">Ketua Pengurus:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{kud.namaKetua}</span>
                  </div>
                  <div className="flex justify-between py-0.5">
                    <span className="text-slate-500">Nomor Telepon:</span>
                    <span className="font-mono text-slate-700 dark:text-slate-300">{kud.kontak}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/40 space-y-2">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-1">
                    <span className="font-bold text-slate-900 dark:text-slate-100">
                      Koordinat Spasial GIS
                    </span>
                    <button 
                      onClick={copyCoordinates}
                      className="text-[10px] text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Copy className="w-3 h-3" />
                      Salin Koordinat
                    </button>
                  </div>
                  <div className="flex justify-between py-0.5">
                    <span className="text-slate-500">Latitude:</span>
                    <span className="font-mono text-slate-800 dark:text-slate-200">{kud.latitude}</span>
                  </div>
                  <div className="flex justify-between py-0.5">
                    <span className="text-slate-500">Longitude:</span>
                    <span className="font-mono text-slate-800 dark:text-slate-200">{kud.longitude}</span>
                  </div>
                  <div className="flex justify-between py-0.5">
                    <span className="text-slate-500">Batch Tanam:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">Tahun {kud.tahunTanamBatch}</span>
                  </div>
                  <div className="flex justify-between py-0.5">
                    <span className="text-slate-500">Terakhir Diperbarui:</span>
                    <span className="text-slate-600 dark:text-slate-400">{formatDate(kud.lastUpdated)}</span>
                  </div>
                </div>
              </div>

              {/* Field Monitoring Notes */}
              {kud.catatanMonitoring && (
                <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50">
                  <span className="font-bold text-amber-900 dark:text-amber-300 block mb-1">
                    Catatan Monitoring Tim Agronomi PTPN IV:
                  </span>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {kud.catatanMonitoring}
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'agronomi' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/40 space-y-2.5">
                  <span className="font-bold text-slate-900 dark:text-slate-100 block border-b border-slate-100 dark:border-slate-700 pb-1">
                    Spesifikasi Bibit & Pola Tanam
                  </span>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Varietas Bibit:</span>
                    <span className="font-bold text-emerald-700 dark:text-emerald-400">{kud.varietasBibit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Sertifikasi Bibit:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">PPKS / Balit Palma Terdaftar</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Kerapatan Tanam:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">143 Pokok / Ha (Segitiga Sama Sisi)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Cover Crop:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">Mucuna Bracteata (LCC)</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/40 space-y-2.5">
                  <span className="font-bold text-slate-900 dark:text-slate-100 block border-b border-slate-100 dark:border-slate-700 pb-1">
                    Kondisi Awal Lahan (Baseline)
                  </span>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Klasifikasi Lahan:</span>
                    <span className="font-semibold text-orange-600 dark:text-orange-400">{kud.klasifikasiTanaman}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Metode Land Clearing:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">Zero Burning & Chipping Sanitasi</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Pengendalian Ganoderma:</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">Aplikasi Trichoderma & Lubang Big Hole</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Kesesuaian ISPO/RSPO:</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">Terdaftar Sertifikasi Berkelanjutan</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'finansial' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                <span className="font-bold text-slate-900 dark:text-slate-100 block text-sm border-b border-slate-200 dark:border-slate-700 pb-2">
                  Rincian Penyaluran Dana Hibah BPDPKS
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <span className="text-[10px] text-slate-500 block">Tarif Hibah / Ha</span>
                    <span className="text-sm font-black text-slate-900 dark:text-white">
                      {formatFullIDR(kud.bantuanPerHa)} / Ha
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <span className="text-[10px] text-slate-500 block">Luas Tersalurkan</span>
                    <span className="text-sm font-black text-slate-900 dark:text-white">
                      {formatHectare(kud.luasPencairanHa)}
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <span className="text-[10px] text-slate-500 block">Bank Rekening Escrow</span>
                    <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">
                      {kud.bankPenyalur}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center">
                  <span className="font-bold text-slate-800 dark:text-slate-200">Total Nilai Realisasi Pencairan:</span>
                  <span className="text-base font-black text-orange-600 dark:text-orange-400">
                    {formatFullIDR(kud.totalNilaiPencairan)}
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                <span className="font-bold text-slate-900 dark:text-slate-100 block">
                  Data Administrasi Surat Rekomendasi Teknis
                </span>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Nomor SK Rekomtek Ditjenbun:</span>
                  <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">{kud.nomorRekomtek || '-'}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Tanggal Terbit Rekomtek:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{kud.tanggalRekomtek ? formatDate(kud.tanggalRekomtek) : '-'}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Tanggal Pencairan Dana:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{kud.tanggalPencairan ? formatDate(kud.tanggalPencairan) : '-'}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'legalitas' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                <span className="font-bold text-slate-900 dark:text-slate-100 block text-sm border-b border-slate-200 dark:border-slate-700 pb-2">
                  Status Kelengkapan Berkas & Legalitas Lahan
                </span>

                <div className="space-y-2.5">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <span className="font-medium text-slate-800 dark:text-slate-200">
                      1. Legalitas Badan Hukum Koperasi / KUD (Kemenkumham & NIB)
                    </span>
                    {kud.kelengkapanDokumen.legalitasKoperasi ? (
                      <span className="flex items-center gap-1 text-emerald-600 font-bold"><CheckCircle2 className="w-4 h-4" /> Lengkap</span>
                    ) : (
                      <span className="flex items-center gap-1 text-rose-500 font-bold"><XCircle className="w-4 h-4" /> Belum Lengkap</span>
                    )}
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <span className="font-medium text-slate-800 dark:text-slate-200">
                      2. Sertifikat Hak Milik (SHM) / Alas Hak Lahan Pekebun (BPN)
                    </span>
                    {kud.kelengkapanDokumen.sertifikatLahanSHM ? (
                      <span className="flex items-center gap-1 text-emerald-600 font-bold"><CheckCircle2 className="w-4 h-4" /> Terverifikasi</span>
                    ) : (
                      <span className="flex items-center gap-1 text-rose-500 font-bold"><XCircle className="w-4 h-4" /> Verifikasi BPN</span>
                    )}
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <span className="font-medium text-slate-800 dark:text-slate-200">
                      3. Surat Rekomendasi Teknis (Rekomtek) Ditjen Perkebunan
                    </span>
                    {kud.kelengkapanDokumen.rekomtekDitjenbun ? (
                      <span className="flex items-center gap-1 text-emerald-600 font-bold"><CheckCircle2 className="w-4 h-4" /> Diterbitkan</span>
                    ) : (
                      <span className="flex items-center gap-1 text-amber-500 font-bold"><Clock className="w-4 h-4" /> Proses Kementan</span>
                    )}
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <span className="font-medium text-slate-800 dark:text-slate-200">
                      4. Perjanjian Kerja Sama (SPK Kemitraan) dengan PTPN IV PalmCo
                    </span>
                    {kud.kelengkapanDokumen.spkPtpnIv ? (
                      <span className="flex items-center gap-1 text-emerald-600 font-bold"><CheckCircle2 className="w-4 h-4" /> Aktif</span>
                    ) : (
                      <span className="flex items-center gap-1 text-rose-500 font-bold"><XCircle className="w-4 h-4" /> Belum Diteken</span>
                    )}
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <span className="font-medium text-slate-800 dark:text-slate-200">
                      5. Pembukaan Rekening Escrow Penampung Dana Hibah
                    </span>
                    {kud.kelengkapanDokumen.rekeningEscrow ? (
                      <span className="flex items-center gap-1 text-emerald-600 font-bold"><CheckCircle2 className="w-4 h-4" /> Valid</span>
                    ) : (
                      <span className="flex items-center gap-1 text-rose-500 font-bold"><XCircle className="w-4 h-4" /> Proses Bank</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex items-center justify-between gap-3">
          <button
            onClick={() => {
              window.print();
            }}
            className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>Cetak Profil KUD</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const target = kud;
                setSelectedKudDetail(null);
                setSelectedKudEdit(target);
              }}
              className="px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Data KUD</span>
            </button>

            <button
              onClick={() => setSelectedKudDetail(null)}
              className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold cursor-pointer"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
