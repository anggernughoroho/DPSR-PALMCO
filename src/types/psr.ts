export type RegionalType = 
  | 'Regional 1'
  | 'Regional 2'
  | 'Regional 3'
  | 'Regional 4'
  | 'Regional 5'
  | 'Regional 6'
  | 'Regional 7';

export type StatusKemitraan = 
  | 'Offtaker' 
  | 'Kemitraan' 
  | 'Revitbun';

export type TahapanPSR = 
  | 'Sosialisasi & Usulan'
  | 'Verifikasi Berkas & Lapangan'
  | 'Rekomendasi Teknis (Rekomtek)'
  | 'Pencairan Dana Tahap I (P1)'
  | 'Tumbang Chipping & Land Clearing'
  | 'Tanam Perdana'
  | 'Pencairan Dana Tahap II (P2)'
  | 'Pemeliharaan TBM';

export type KlasifikasiTanaman = 
  | 'Tanaman Tua (>25 Tahun)'
  | 'Produktivitas Rendah (<10 Ton/Ha)'
  | 'Bibit Non-Sertifikat / Illegitim';

export type StatusPencairan = 
  | 'Belum Cair' 
  | 'Proses Bank Penampung' 
  | 'Cair Tahap 1 (70%)' 
  | 'Cair Penuh (100%)';

export type JenisKelembagaan = 
  | 'KUD' 
  | 'Gapoktan' 
  | 'Kelompok Tani (Poktan)' 
  | 'Koperasi Syariah' 
  | 'Koperasi Produsen'
  | 'Koperasi Konsumen'
  | string;

export interface KudRecord {
  id: string;
  kodeKud: string;
  namaKud: string;
  jenisKelembagaan: 'KUD' | 'Gapoktan' | 'Kelompok Tani (Poktan)' | 'Koperasi Syariah' | 'Koperasi Produsen' | 'Koperasi Konsumen' | string;
  regional: RegionalType;
  unitPksMitra: string;
  provinsi: string;
  kabupaten: string;
  kecamatan: string;
  desa: string;
  latitude: number;
  longitude: number;
  namaKetua: string;
  kontak: string;
  statusKemitraan: StatusKemitraan;
  tahapanPsr: TahapanPSR;
  klasifikasiTanaman: KlasifikasiTanaman;
  tahunPerolehan: number; // Tahun KUD diperoleh bermitra / MoU
  tahunTanamBatch: number;
  varietasBibit: string;
  
  // Metrik Luas (Ha)
  targetLuasHa: number;
  luasRekomtekHa: number;
  luasPencairanHa: number;
  luasTanamHa: number;
  
  // Finansial (IDR)
  bantuanPerHa: number; // e.g. 30000000 or 60000000
  totalNilaiPencairan: number;
  statusPencairan: StatusPencairan;
  bankPenyalur: 'Bank Mandiri' | 'Bank BRI' | 'Bank BNI' | 'Bank BSI' | 'Bank Sumut' | 'Bank Sumsel Babel' | 'Bank Riau Kepri Syariah' | 'Bank Kalbar' | 'Bank Kalteng' | string;
  nomorRekomtek?: string;
  tanggalRekomtek?: string;
  tanggalPencairan?: string;
  
  // Demografi & Sosial
  jumlahKk: number;
  progresFisikPersen: number;
  
  // Status Verifikasi Dokumen
  kelengkapanDokumen: {
    legalitasKoperasi: boolean;
    sertifikatLahanSHM: boolean;
    rekomtekDitjenbun: boolean;
    rekeningEscrow: boolean;
    spkPtpnIv: boolean;
  };

  catatanMonitoring?: string;
  lastUpdated: string;
}

export interface PsrFilterState {
  searchQuery: string;
  regional: string; // 'ALL' or specific (e.g. 'Regional 1')
  provinsi: string; // 'ALL' or specific (e.g. 'SUMATERA UTARA', 'RIAU')
  statusKemitraan: string; // 'ALL' | 'Offtaker' | 'Kemitraan' | 'Revitbun'
  tahunPerolehan: string; // 'ALL' | '2024' | '2023' etc.
  tahunTanam: string; // 'ALL' or year number string
  rabPerHa: string; // 'ALL' | '60000000' | '30000000' | '25000000'
  tahapanPsr: string; // 'ALL' or specific
  klasifikasiTanaman: string; // 'ALL' or specific
  statusPencairan: string; // 'ALL' or specific
}

export interface PsrKpiMetrics {
  totalTargetLuasHa: number;
  totalLuasRekomtekHa: number;
  totalLuasPencairanHa: number;
  totalLuasTanamHa: number;
  totalNilaiPencairanRp: number;
  totalJumlahKk: number;
  totalKudCount: number;
  persenRekomtekVsTarget: number;
  persenPencairanVsRekomtek: number;
  persenTanamVsRekomtek: number;
  rataRataProgresFisik: number;
}

export type ActiveTab = 'dashboard' | 'analytics' | 'map' | 'kud-list' | 'google-sheets' | 'reports';

export type UserRole = 'Direktur Utama PalmCo' | 'SEVP Operation' | 'Kepala Divisi PSR' | 'Tim Monitoring Regional' | 'Agronomy Specialist';
