import React, { useState, useEffect } from 'react';
import { usePsr } from '../../context/PsrContext';
import { 
  KudRecord, 
  RegionalType, 
  StatusKemitraan, 
  TahapanPSR, 
  KlasifikasiTanaman, 
  StatusPencairan 
} from '../../types/psr';
import { 
  REGIONAL_OPTIONS, 
  PROVINSI_OPTIONS, 
  KEMITRAAN_OPTIONS, 
  TAHAPAN_OPTIONS, 
  KLASIFIKASI_OPTIONS 
} from '../../data/mockPsrData';
import { formatIDR } from '../../lib/utils';
import { X, Save, PlusCircle, Sprout, Building2, MapPin, Banknote } from 'lucide-react';

export const KudFormModal: React.FC = () => {
  const { 
    isCreateModalOpen, 
    setIsCreateModalOpen, 
    selectedKudEdit, 
    setSelectedKudEdit, 
    addKud, 
    updateKud 
  } = usePsr();

  const isEditMode = Boolean(selectedKudEdit);
  const isOpen = isCreateModalOpen || isEditMode;

  const [formData, setFormData] = useState<Omit<KudRecord, 'id' | 'lastUpdated'>>({
    kodeKud: '',
    namaKud: '',
    jenisKelembagaan: 'KUD',
    regional: 'Regional 1',
    unitPksMitra: 'PKS Dolok Ilir',
    provinsi: 'Sumatera Utara',
    kabupaten: 'Serdang Bedagai',
    kecamatan: '',
    desa: '',
    latitude: 3.1,
    longitude: 99.1,
    namaKetua: '',
    kontak: '',
    statusKemitraan: 'Kemitraan',
    tahapanPsr: 'Sosialisasi & Usulan',
    klasifikasiTanaman: 'Tanaman Tua (>25 Tahun)',
    tahunPerolehan: 2024,
    tahunTanamBatch: 2026,
    varietasBibit: 'PPKS 540 (Unggul DxP)',
    targetLuasHa: 200,
    luasRekomtekHa: 200,
    luasPencairanHa: 0,
    luasTanamHa: 0,
    bantuanPerHa: 60000000,
    totalNilaiPencairan: 0,
    statusPencairan: 'Belum Cair',
    bankPenyalur: 'Bank Mandiri',
    nomorRekomtek: '',
    tanggalRekomtek: '',
    tanggalPencairan: '',
    jumlahKk: 100,
    progresFisikPersen: 15,
    kelengkapanDokumen: {
      legalitasKoperasi: true,
      sertifikatLahanSHM: true,
      rekomtekDitjenbun: false,
      rekeningEscrow: false,
      spkPtpnIv: true
    },
    catatanMonitoring: ''
  });

  useEffect(() => {
    if (selectedKudEdit) {
      setFormData({
        kodeKud: selectedKudEdit.kodeKud,
        namaKud: selectedKudEdit.namaKud,
        jenisKelembagaan: selectedKudEdit.jenisKelembagaan,
        regional: selectedKudEdit.regional,
        unitPksMitra: selectedKudEdit.unitPksMitra,
        provinsi: selectedKudEdit.provinsi,
        kabupaten: selectedKudEdit.kabupaten,
        kecamatan: selectedKudEdit.kecamatan,
        desa: selectedKudEdit.desa,
        latitude: selectedKudEdit.latitude,
        longitude: selectedKudEdit.longitude,
        namaKetua: selectedKudEdit.namaKetua,
        kontak: selectedKudEdit.kontak,
        statusKemitraan: selectedKudEdit.statusKemitraan,
        tahapanPsr: selectedKudEdit.tahapanPsr,
        klasifikasiTanaman: selectedKudEdit.klasifikasiTanaman,
        tahunPerolehan: selectedKudEdit.tahunPerolehan || 2024,
        tahunTanamBatch: selectedKudEdit.tahunTanamBatch,
        varietasBibit: selectedKudEdit.varietasBibit,
        targetLuasHa: selectedKudEdit.targetLuasHa,
        luasRekomtekHa: selectedKudEdit.luasRekomtekHa,
        luasPencairanHa: selectedKudEdit.luasPencairanHa,
        luasTanamHa: selectedKudEdit.luasTanamHa,
        bantuanPerHa: selectedKudEdit.bantuanPerHa,
        totalNilaiPencairan: selectedKudEdit.totalNilaiPencairan,
        statusPencairan: selectedKudEdit.statusPencairan,
        bankPenyalur: selectedKudEdit.bankPenyalur,
        nomorRekomtek: selectedKudEdit.nomorRekomtek || '',
        tanggalRekomtek: selectedKudEdit.tanggalRekomtek || '',
        tanggalPencairan: selectedKudEdit.tanggalPencairan || '',
        jumlahKk: selectedKudEdit.jumlahKk,
        progresFisikPersen: selectedKudEdit.progresFisikPersen,
        kelengkapanDokumen: { ...selectedKudEdit.kelengkapanDokumen },
        catatanMonitoring: selectedKudEdit.catatanMonitoring || ''
      });
    } else {
      const regNum = Math.floor(Math.random() * 5) + 1;
      const rnd = Math.floor(Math.random() * 900) + 100;
      setFormData(prev => ({
        ...prev,
        kodeKud: `PSR-REG${regNum}-${rnd}`,
        namaKud: '',
        targetLuasHa: 250,
        luasRekomtekHa: 250,
        luasPencairanHa: 0,
        luasTanamHa: 0,
        bantuanPerHa: 60000000,
        totalNilaiPencairan: 0,
        statusPencairan: 'Belum Cair',
        jumlahKk: 125,
        progresFisikPersen: 10
      }));
    }
  }, [selectedKudEdit, isCreateModalOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    setIsCreateModalOpen(false);
    setSelectedKudEdit(null);
  };

  const handleNumericChange = (field: string, value: string) => {
    const num = parseFloat(value) || 0;
    setFormData(prev => {
      const updated = { ...prev, [field]: num };
      // Auto-recalculate funding if luasPencairanHa or bantuanPerHa changes
      if (field === 'luasPencairanHa' || field === 'bantuanPerHa') {
        const luas = field === 'luasPencairanHa' ? num : prev.luasPencairanHa;
        const rate = field === 'bantuanPerHa' ? num : prev.bantuanPerHa;
        updated.totalNilaiPencairan = luas * rate;
      }
      return updated;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.namaKud.trim()) {
      alert('Mohon masukkan Nama KUD / Gapoktan');
      return;
    }

    if (isEditMode && selectedKudEdit) {
      updateKud(selectedKudEdit.id, formData);
    } else {
      addKud(formData);
    }

    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-3xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 my-8">
        {/* Modal Header */}
        <div className="p-5 bg-gradient-to-r from-emerald-950 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
              {isEditMode ? <Save className="w-5 h-5" /> : <PlusCircle className="w-5 h-5" />}
            </div>
            <div>
              <h2 className="text-base font-bold">
                {isEditMode ? `Edit Data Kemitraan: ${selectedKudEdit?.namaKud}` : 'Tambah Usulan Kemitraan PSR Baru'}
              </h2>
              <p className="text-xs text-emerald-300">
                PTPN IV PalmCo • Program Peremajaan Sawit Rakyat
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 max-h-[65vh] overflow-y-auto space-y-4 text-xs">
          {/* Section 1: Identitas Kelembagaan */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-3">
            <span className="font-bold text-slate-900 dark:text-slate-100 block text-xs border-b border-slate-200 dark:border-slate-700 pb-1.5 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-emerald-600" />
              1. Identitas Kelembagaan & Wilayah
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Kode Registrasi KUD *
                </label>
                <input
                  type="text"
                  required
                  value={formData.kodeKud}
                  onChange={(e) => setFormData({ ...formData, kodeKud: e.target.value })}
                  className="w-full text-xs py-2 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 font-mono"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Nama Lengkap KUD / Gapoktan / Poktan *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: KUD Makmur Bersama..."
                  value={formData.namaKud}
                  onChange={(e) => setFormData({ ...formData, namaKud: e.target.value })}
                  className="w-full text-xs py-2 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 font-bold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Jenis Kelembagaan
                </label>
                <select
                  value={formData.jenisKelembagaan}
                  onChange={(e) => setFormData({ ...formData, jenisKelembagaan: e.target.value as any })}
                  className="w-full text-xs py-2 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="KUD">KUD (Koperasi Unit Desa)</option>
                  <option value="Gapoktan">Gapoktan (Gabungan Kelompok Tani)</option>
                  <option value="Kelompok Tani (Poktan)">Kelompok Tani (Poktan)</option>
                  <option value="Koperasi Syariah">Koperasi Syariah</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Regional PTPN IV
                </label>
                <select
                  value={formData.regional}
                  onChange={(e) => setFormData({ ...formData, regional: e.target.value as RegionalType })}
                  className="w-full text-xs py-2 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 font-semibold"
                >
                  {REGIONAL_OPTIONS.filter(r => r !== 'ALL').map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Unit Bisnis / PKS Mitra *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: PKS Tandun"
                  value={formData.unitPksMitra}
                  onChange={(e) => setFormData({ ...formData, unitPksMitra: e.target.value })}
                  className="w-full text-xs py-2 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Provinsi
                </label>
                <select
                  value={formData.provinsi}
                  onChange={(e) => setFormData({ ...formData, provinsi: e.target.value })}
                  className="w-full text-xs py-2 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                >
                  {PROVINSI_OPTIONS.filter(p => p !== 'ALL').map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Kabupaten
                </label>
                <input
                  type="text"
                  required
                  value={formData.kabupaten}
                  onChange={(e) => setFormData({ ...formData, kabupaten: e.target.value })}
                  className="w-full text-xs py-2 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Kecamatan & Desa
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  <input
                    type="text"
                    placeholder="Kecamatan"
                    value={formData.kecamatan}
                    onChange={(e) => setFormData({ ...formData, kecamatan: e.target.value })}
                    className="w-full text-xs py-2 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                  <input
                    type="text"
                    placeholder="Desa"
                    value={formData.desa}
                    onChange={(e) => setFormData({ ...formData, desa: e.target.value })}
                    className="w-full text-xs py-2 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Metrik Lahan & Kemitraan */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-3">
            <span className="font-bold text-slate-900 dark:text-slate-100 block text-xs border-b border-slate-200 dark:border-slate-700 pb-1.5 flex items-center gap-1.5">
              <Sprout className="w-3.5 h-3.5 text-emerald-600" />
              2. Kemitraan, Luas Areal & Tahapan PSR
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Model Kemitraan
                </label>
                <select
                  value={formData.statusKemitraan}
                  onChange={(e) => setFormData({ ...formData, statusKemitraan: e.target.value as StatusKemitraan })}
                  className="w-full text-xs py-2 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 font-bold"
                >
                  {KEMITRAAN_OPTIONS.map(k => (
                    <option key={k} value={k}>{k}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Tahapan Siklus PSR
                </label>
                <select
                  value={formData.tahapanPsr}
                  onChange={(e) => setFormData({ ...formData, tahapanPsr: e.target.value as TahapanPSR })}
                  className="w-full text-xs py-2 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                >
                  {TAHAPAN_OPTIONS.filter(t => t !== 'ALL').map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Progres Fisik Lapangan (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.progresFisikPersen}
                  onChange={(e) => handleNumericChange('progresFisikPersen', e.target.value)}
                  className="w-full text-xs py-2 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 font-bold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Target Usulan (Ha)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.targetLuasHa}
                  onChange={(e) => handleNumericChange('targetLuasHa', e.target.value)}
                  className="w-full text-xs py-2 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Luas Rekomtek Terbit (Ha)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.luasRekomtekHa}
                  onChange={(e) => handleNumericChange('luasRekomtekHa', e.target.value)}
                  className="w-full text-xs py-2 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-emerald-600"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Luas Tanam Perdana (Ha)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.luasTanamHa}
                  onChange={(e) => handleNumericChange('luasTanamHa', e.target.value)}
                  className="w-full text-xs py-2 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-teal-600"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Jumlah Petani (KK)
                </label>
                <input
                  type="number"
                  value={formData.jumlahKk}
                  onChange={(e) => handleNumericChange('jumlahKk', e.target.value)}
                  className="w-full text-xs py-2 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Varietas Bibit Sawit
                </label>
                <input
                  type="text"
                  value={formData.varietasBibit}
                  onChange={(e) => setFormData({ ...formData, varietasBibit: e.target.value })}
                  className="w-full text-xs py-2 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Tahun Perolehan Kemitraan (MoU)
                </label>
                <select
                  value={formData.tahunPerolehan}
                  onChange={(e) => setFormData({ ...formData, tahunPerolehan: Number(e.target.value) })}
                  className="w-full text-xs py-2 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold"
                >
                  {[2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026].map(y => (
                    <option key={y} value={y}>Tahun {y}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Tahun Batch Tanam
                </label>
                <select
                  value={formData.tahunTanamBatch}
                  onChange={(e) => setFormData({ ...formData, tahunTanamBatch: Number(e.target.value) })}
                  className="w-full text-xs py-2 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value={2018}>2018</option>
                  <option value={2019}>2019</option>
                  <option value={2020}>2020</option>
                  <option value={2021}>2021</option>
                  <option value={2022}>2022</option>
                  <option value={2023}>2023</option>
                  <option value={2024}>2024</option>
                  <option value={2025}>2025</option>
                  <option value={2026}>2026</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Finansial & BPDPKS */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-3">
            <span className="font-bold text-slate-900 dark:text-slate-100 block text-xs border-b border-slate-200 dark:border-slate-700 pb-1.5 flex items-center gap-1.5">
              <Banknote className="w-3.5 h-3.5 text-orange-600" />
              3. Penyaluran Dana BPDPKS & Rekening Bank
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Tarif Bantuan Hibah / Ha
                </label>
                <select
                  value={formData.bantuanPerHa}
                  onChange={(e) => handleNumericChange('bantuanPerHa', e.target.value)}
                  className="w-full text-xs py-2 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold"
                >
                  <option value={30000000}>Rp 30.000.000 / Ha (Reguler)</option>
                  <option value={60000000}>Rp 60.000.000 / Ha (Skema Baru 2024-2026)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Luas Pencairan (Ha)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.luasPencairanHa}
                  onChange={(e) => handleNumericChange('luasPencairanHa', e.target.value)}
                  className="w-full text-xs py-2 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-orange-600"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Status Pencairan Dana
                </label>
                <select
                  value={formData.statusPencairan}
                  onChange={(e) => setFormData({ ...formData, statusPencairan: e.target.value as StatusPencairan })}
                  className="w-full text-xs py-2 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="Belum Cair">Belum Cair</option>
                  <option value="Proses Bank Penampung">Proses Bank Penampung</option>
                  <option value="Cair Tahap 1 (70%)">Cair Tahap 1 (70%)</option>
                  <option value="Cair Penuh (100%)">Cair Penuh (100%)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Bank Escrow Penampung
                </label>
                <select
                  value={formData.bankPenyalur}
                  onChange={(e) => setFormData({ ...formData, bankPenyalur: e.target.value as any })}
                  className="w-full text-xs py-2 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold"
                >
                  <option value="Bank Mandiri">Bank Mandiri</option>
                  <option value="Bank BRI">Bank BRI</option>
                  <option value="Bank BNI">Bank BNI</option>
                  <option value="Bank BSI">Bank BSI</option>
                  <option value="Bank Sumut">Bank Sumut</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Total Nilai Pencairan (Otomatis)
                </label>
                <div className="py-2 px-3 rounded-lg bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-900 font-black text-sm text-orange-700 dark:text-orange-300">
                  {formatIDR(formData.totalNilaiPencairan)}
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Kontak & Catatan */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Nama Ketua / Pengurus
              </label>
              <input
                type="text"
                placeholder="Nama Ketua KUD"
                value={formData.namaKetua}
                onChange={(e) => setFormData({ ...formData, namaKetua: e.target.value })}
                className="w-full text-xs py-2 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Kontak / Nomor Telepon
              </label>
              <input
                type="text"
                placeholder="0812-XXXX-XXXX"
                value={formData.kontak}
                onChange={(e) => setFormData({ ...formData, kontak: e.target.value })}
                className="w-full text-xs py-2 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
              Catatan Monitoring Tim PTPN IV
            </label>
            <textarea
              rows={2}
              placeholder="Catatan progres lapangan, pasokan bibit, kendala operasional..."
              value={formData.catatanMonitoring}
              onChange={(e) => setFormData({ ...formData, catatanMonitoring: e.target.value })}
              className="w-full text-xs py-2 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 text-xs font-semibold cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isEditMode ? 'Simpan Perubahan' : 'Tambahkan KUD'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
