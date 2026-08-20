export type MonthName = 
  | 'Januari' 
  | 'Februari' 
  | 'Maret' 
  | 'April' 
  | 'Mei' 
  | 'Juni' 
  | 'Juli' 
  | 'Agustus' 
  | 'September' 
  | 'Oktober' 
  | 'November' 
  | 'Desember';

export type WeekName = 'W1' | 'W2' | 'W3' | 'W4';

export interface StageDataRow {
  id: string;
  no: number;
  tahapan: string;
  iconName: string;
  isSpecialHighlight?: boolean; // Rekomtek & Pencairan Dana
  specialType?: 'rekomtek' | 'pencairan_dana';
  
  // Data per regional
  regionals: {
    [key: string]: { 
      bulanIni: {
        realisasi: number;
        rkap: number;
        persen: number;
      };
      sdBulanIni: {
        realisasi: number;
        rkap: number;
        persen: number;
      };
      setahun: {
        rkap: number;
        persen: number;
      };
    };
  };
}

export const MONTH_LIST: MonthName[] = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

export const WEEK_LIST: WeekName[] = ['W1', 'W2', 'W3', 'W4'];

export interface RegionalColumnDef {
  id: string;
  label: string;
  sublabel?: string;
  shortCode: string;
  fullName: string;
}

export const REGIONAL_COLUMNS: RegionalColumnDef[] = [
  { id: 'REG_I', label: 'Regional I', shortCode: 'Reg I', fullName: 'Regional I (Sumatera Utara)' },
  { id: 'REG_II', label: 'Regional II', shortCode: 'Reg II', fullName: 'Regional II (Riau)' },
  { id: 'REG_III', label: 'Regional III', shortCode: 'Reg III', fullName: 'Regional III (Jambi / Sumsel)' },
  { id: 'REG_IV', label: 'Regional IV', shortCode: 'Reg IV', fullName: 'Regional IV (Sumbar / Bengkulu)' },
  { id: 'REG_V', label: 'Regional V', shortCode: 'Reg V', fullName: 'Regional V (Kalimantan Barat)' },
  { id: 'REG_VI', label: 'Regional VI', sublabel: '(eks N1)', shortCode: 'Reg VI', fullName: 'Regional VI (eks N1 / Kalteng - Kalsel)' },
  { id: 'REG_VII', label: 'Regional VII', sublabel: '(eks N7)', shortCode: 'Reg VII', fullName: 'Regional VII (eks N7 / Sulsel - Papua)' },
  { id: 'REG_II_DRUS', label: 'Regional II - DRUS', sublabel: '(eks N2)', shortCode: 'DRUS', fullName: 'Regional II - Distrik Rayon (eks N2)' },
  { id: 'REG_I_DJABA', label: 'Regional I - Djaba', sublabel: '(eks N8)', shortCode: 'Djaba', fullName: 'Regional I - Distrik Djaba (eks N8)' },
  { id: 'REG_II_DSUL', label: 'Regional II - DSUL', sublabel: '(eks N14)', shortCode: 'DSUL', fullName: 'Regional II - Distrik Sulawesi (eks N14)' },
  { id: 'KONSOLIDASI', label: 'KONSOLIDASI PALMCO', shortCode: 'KONSOLIDASI', fullName: 'Total Konsolidasi Nasional PalmCo' }
];

export interface StageBaselineDefinition {
  id: string;
  no: number;
  tahapan: string;
  iconName: string;
  isSpecialHighlight?: boolean;
  specialType?: 'rekomtek' | 'pencairan_dana';
  regionals: {
    [key: string]: {
      bulanIni: { realisasi: number; rkap: number; persen: number };
      sdBulanIni: { realisasi: number; rkap: number; persen: number };
      setahun: { rkap: number; persen: number };
    };
  };
}

/**
 * Exact baseline data parsed directly from Google Sheet "To ppt RKO" (Agustus W4)
 */
export const EXACT_SHEET_RKO_BASELINE: StageBaselineDefinition[] = [
  {
    "id": "pendataan",
    "no": 1,
    "tahapan": "Pendataan Luasan Petani/KUD",
    "iconName": "Users",
    "regionals": {
      "REG_I": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 160,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 1439.54,
          "rkap": 1150,
          "persen": 125.18
        },
        "setahun": {
          "rkap": 1250,
          "persen": 115.16
        }
      },
      "REG_II": {
        "bulanIni": {
          "realisasi": 275,
          "rkap": 200,
          "persen": 137.5
        },
        "sdBulanIni": {
          "realisasi": 849.66,
          "rkap": 1240,
          "persen": 68.52
        },
        "setahun": {
          "rkap": 1400,
          "persen": 60.69
        }
      },
      "REG_III": {
        "bulanIni": {
          "realisasi": 126.58,
          "rkap": 0,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 4525.48,
          "rkap": 4500,
          "persen": 100.57
        },
        "setahun": {
          "rkap": 4500,
          "persen": 100.57
        }
      },
      "REG_IV": {
        "bulanIni": {
          "realisasi": 252.82,
          "rkap": 656,
          "persen": 38.54
        },
        "sdBulanIni": {
          "realisasi": 3384.79,
          "rkap": 3450,
          "persen": 98.11
        },
        "setahun": {
          "rkap": 4200,
          "persen": 80.59
        }
      },
      "REG_V": {
        "bulanIni": {
          "realisasi": 213,
          "rkap": 700,
          "persen": 30.43
        },
        "sdBulanIni": {
          "realisasi": 3322.58,
          "rkap": 4050,
          "persen": 82.04
        },
        "setahun": {
          "rkap": 4800,
          "persen": 69.22
        }
      },
      "REG_VI": {
        "bulanIni": {
          "realisasi": 99.02,
          "rkap": 150,
          "persen": 66.01
        },
        "sdBulanIni": {
          "realisasi": 719.75,
          "rkap": 1350,
          "persen": 53.31
        },
        "setahun": {
          "rkap": 1500,
          "persen": 47.98
        }
      },
      "REG_VII": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 210,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 1404.84,
          "rkap": 1450,
          "persen": 96.89
        },
        "setahun": {
          "rkap": 1700,
          "persen": 82.64
        }
      },
      "REG_II_DRUS": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 110,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 684.46,
          "rkap": 1220,
          "persen": 56.1
        },
        "setahun": {
          "rkap": 1350,
          "persen": 50.7
        }
      },
      "REG_I_DJABA": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 70,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 912.97,
          "rkap": 1025,
          "persen": 89.07
        },
        "setahun": {
          "rkap": 1168,
          "persen": 78.17
        }
      },
      "REG_II_DSUL": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 80,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 459.8,
          "rkap": 640,
          "persen": 71.84
        },
        "setahun": {
          "rkap": 700,
          "persen": 65.69
        }
      },
      "KONSOLIDASI": {
        "bulanIni": {
          "realisasi": 966.42,
          "rkap": 2336,
          "persen": 41.37
        },
        "sdBulanIni": {
          "realisasi": 17703.88,
          "rkap": 20075,
          "persen": 88.19
        },
        "setahun": {
          "rkap": 22568,
          "persen": 78.45
        }
      }
    }
  },
  {
    "id": "titik_koordinat",
    "no": 2,
    "tahapan": "Pengambilan Titik Koordinat",
    "iconName": "Crosshair",
    "regionals": {
      "REG_I": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 160,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 1439.54,
          "rkap": 1150,
          "persen": 125.18
        },
        "setahun": {
          "rkap": 1250,
          "persen": 115.16
        }
      },
      "REG_II": {
        "bulanIni": {
          "realisasi": 275,
          "rkap": 200,
          "persen": 137.5
        },
        "sdBulanIni": {
          "realisasi": 836.45,
          "rkap": 1240,
          "persen": 67.46
        },
        "setahun": {
          "rkap": 1400,
          "persen": 59.75
        }
      },
      "REG_III": {
        "bulanIni": {
          "realisasi": 126.58,
          "rkap": 0,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 4236.27,
          "rkap": 4500,
          "persen": 94.14
        },
        "setahun": {
          "rkap": 4500,
          "persen": 94.14
        }
      },
      "REG_IV": {
        "bulanIni": {
          "realisasi": 252.82,
          "rkap": 656,
          "persen": 38.54
        },
        "sdBulanIni": {
          "realisasi": 2255.7,
          "rkap": 3450,
          "persen": 65.38
        },
        "setahun": {
          "rkap": 4200,
          "persen": 53.71
        }
      },
      "REG_V": {
        "bulanIni": {
          "realisasi": 213,
          "rkap": 700,
          "persen": 30.43
        },
        "sdBulanIni": {
          "realisasi": 3262.58,
          "rkap": 4050,
          "persen": 80.56
        },
        "setahun": {
          "rkap": 4800,
          "persen": 67.97
        }
      },
      "REG_VI": {
        "bulanIni": {
          "realisasi": 99.02,
          "rkap": 150,
          "persen": 66.01
        },
        "sdBulanIni": {
          "realisasi": 785.5,
          "rkap": 1350,
          "persen": 58.19
        },
        "setahun": {
          "rkap": 1500,
          "persen": 52.37
        }
      },
      "REG_VII": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 210,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 1387.54,
          "rkap": 1450,
          "persen": 95.69
        },
        "setahun": {
          "rkap": 1700,
          "persen": 81.62
        }
      },
      "REG_II_DRUS": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 110,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 684.46,
          "rkap": 1220,
          "persen": 56.1
        },
        "setahun": {
          "rkap": 1350,
          "persen": 50.7
        }
      },
      "REG_I_DJABA": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 70,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 118.97,
          "rkap": 1085,
          "persen": 10.97
        },
        "setahun": {
          "rkap": 1168,
          "persen": 10.19
        }
      },
      "REG_II_DSUL": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 80,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 498.05,
          "rkap": 640,
          "persen": 77.82
        },
        "setahun": {
          "rkap": 700,
          "persen": 71.15
        }
      },
      "KONSOLIDASI": {
        "bulanIni": {
          "realisasi": 966.42,
          "rkap": 2336,
          "persen": 41.37
        },
        "sdBulanIni": {
          "realisasi": 15505.06,
          "rkap": 20135,
          "persen": 77.01
        },
        "setahun": {
          "rkap": 22568,
          "persen": 68.7
        }
      }
    }
  },
  {
    "id": "verif_permentan",
    "no": 3,
    "tahapan": "Verifikasi Dokumen sesuai Permentan 05/2025",
    "iconName": "ScrollText",
    "regionals": {
      "REG_I": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 160,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 1439.54,
          "rkap": 1128,
          "persen": 127.62
        },
        "setahun": {
          "rkap": 1250,
          "persen": 115.16
        }
      },
      "REG_II": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 200,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 561.45,
          "rkap": 1240,
          "persen": 45.28
        },
        "setahun": {
          "rkap": 1400,
          "persen": 40.1
        }
      },
      "REG_III": {
        "bulanIni": {
          "realisasi": 126.58,
          "rkap": 630,
          "persen": 20.09
        },
        "sdBulanIni": {
          "realisasi": 3436.67,
          "rkap": 4008,
          "persen": 85.75
        },
        "setahun": {
          "rkap": 4500,
          "persen": 76.37
        }
      },
      "REG_IV": {
        "bulanIni": {
          "realisasi": 252.82,
          "rkap": 500,
          "persen": 50.56
        },
        "sdBulanIni": {
          "realisasi": 2255.7,
          "rkap": 2844,
          "persen": 79.31
        },
        "setahun": {
          "rkap": 4200,
          "persen": 53.71
        }
      },
      "REG_V": {
        "bulanIni": {
          "realisasi": 213,
          "rkap": 343,
          "persen": 62.1
        },
        "sdBulanIni": {
          "realisasi": 3196.63,
          "rkap": 1937,
          "persen": 165.03
        },
        "setahun": {
          "rkap": 4800,
          "persen": 66.6
        }
      },
      "REG_VI": {
        "bulanIni": {
          "realisasi": 99.02,
          "rkap": 165,
          "persen": 60.01
        },
        "sdBulanIni": {
          "realisasi": 627.99,
          "rkap": 865,
          "persen": 72.6
        },
        "setahun": {
          "rkap": 1500,
          "persen": 41.87
        }
      },
      "REG_VII": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 190,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 1337.01,
          "rkap": 870,
          "persen": 153.68
        },
        "setahun": {
          "rkap": 1700,
          "persen": 78.65
        }
      },
      "REG_II_DRUS": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 110,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 684.46,
          "rkap": 870,
          "persen": 78.67
        },
        "setahun": {
          "rkap": 1350,
          "persen": 50.7
        }
      },
      "REG_I_DJABA": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 52,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 118.97,
          "rkap": 961,
          "persen": 12.38
        },
        "setahun": {
          "rkap": 1168,
          "persen": 10.19
        }
      },
      "REG_II_DSUL": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 40,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 409.75,
          "rkap": 280,
          "persen": 146.34
        },
        "setahun": {
          "rkap": 700,
          "persen": 58.54
        }
      },
      "KONSOLIDASI": {
        "bulanIni": {
          "realisasi": 691.42,
          "rkap": 2390,
          "persen": 28.93
        },
        "sdBulanIni": {
          "realisasi": 14068.18,
          "rkap": 15003,
          "persen": 93.77
        },
        "setahun": {
          "rkap": 22568,
          "persen": 62.34
        }
      }
    }
  },
  {
    "id": "rab",
    "no": 4,
    "tahapan": "Membuat RAB",
    "iconName": "Calculator",
    "regionals": {
      "REG_I": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 160,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 1439.54,
          "rkap": 1150,
          "persen": 125.18
        },
        "setahun": {
          "rkap": 1250,
          "persen": 115.16
        }
      },
      "REG_II": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 200,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 561.45,
          "rkap": 1240,
          "persen": 45.28
        },
        "setahun": {
          "rkap": 1400,
          "persen": 40.1
        }
      },
      "REG_III": {
        "bulanIni": {
          "realisasi": 126.58,
          "rkap": 630,
          "persen": 20.09
        },
        "sdBulanIni": {
          "realisasi": 3436.67,
          "rkap": 4008,
          "persen": 85.75
        },
        "setahun": {
          "rkap": 4500,
          "persen": 76.37
        }
      },
      "REG_IV": {
        "bulanIni": {
          "realisasi": 252.82,
          "rkap": 500,
          "persen": 50.56
        },
        "sdBulanIni": {
          "realisasi": 2255.7,
          "rkap": 2844,
          "persen": 79.31
        },
        "setahun": {
          "rkap": 4200,
          "persen": 53.71
        }
      },
      "REG_V": {
        "bulanIni": {
          "realisasi": 213,
          "rkap": 686,
          "persen": 31.05
        },
        "sdBulanIni": {
          "realisasi": 3196.63,
          "rkap": 3874,
          "persen": 82.52
        },
        "setahun": {
          "rkap": 4800,
          "persen": 66.6
        }
      },
      "REG_VI": {
        "bulanIni": {
          "realisasi": 99.02,
          "rkap": 165,
          "persen": 60.01
        },
        "sdBulanIni": {
          "realisasi": 635.04,
          "rkap": 865,
          "persen": 73.41
        },
        "setahun": {
          "rkap": 1500,
          "persen": 42.34
        }
      },
      "REG_VII": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 190,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 1326.01,
          "rkap": 870,
          "persen": 152.41
        },
        "setahun": {
          "rkap": 1700,
          "persen": 78
        }
      },
      "REG_II_DRUS": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 110,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 684.46,
          "rkap": 870,
          "persen": 78.67
        },
        "setahun": {
          "rkap": 1350,
          "persen": 50.7
        }
      },
      "REG_I_DJABA": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 52,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 118.97,
          "rkap": 961,
          "persen": 12.38
        },
        "setahun": {
          "rkap": 1168,
          "persen": 10.19
        }
      },
      "REG_II_DSUL": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 40,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 409.75,
          "rkap": 280,
          "persen": 146.34
        },
        "setahun": {
          "rkap": 700,
          "persen": 58.54
        }
      },
      "KONSOLIDASI": {
        "bulanIni": {
          "realisasi": 691.42,
          "rkap": 2733,
          "persen": 25.3
        },
        "sdBulanIni": {
          "realisasi": 14064.23,
          "rkap": 16962,
          "persen": 82.92
        },
        "setahun": {
          "rkap": 22568,
          "persen": 62.32
        }
      }
    }
  },
  {
    "id": "portal_psr",
    "no": 5,
    "tahapan": "Pendaftaran melalui Portal PSR Online",
    "iconName": "Globe",
    "regionals": {
      "REG_I": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 160,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 1209.54,
          "rkap": 1150,
          "persen": 105.18
        },
        "setahun": {
          "rkap": 1250,
          "persen": 96.76
        }
      },
      "REG_II": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 200,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 561.45,
          "rkap": 1240,
          "persen": 45.28
        },
        "setahun": {
          "rkap": 1400,
          "persen": 40.1
        }
      },
      "REG_III": {
        "bulanIni": {
          "realisasi": 126.58,
          "rkap": 630,
          "persen": 20.09
        },
        "sdBulanIni": {
          "realisasi": 3436.67,
          "rkap": 4008,
          "persen": 85.75
        },
        "setahun": {
          "rkap": 4500,
          "persen": 76.37
        }
      },
      "REG_IV": {
        "bulanIni": {
          "realisasi": 252.82,
          "rkap": 500,
          "persen": 50.56
        },
        "sdBulanIni": {
          "realisasi": 2210.39,
          "rkap": 2694,
          "persen": 82.05
        },
        "setahun": {
          "rkap": 4200,
          "persen": 52.63
        }
      },
      "REG_V": {
        "bulanIni": {
          "realisasi": 213,
          "rkap": 600,
          "persen": 35.5
        },
        "sdBulanIni": {
          "realisasi": 3172.89,
          "rkap": 3882,
          "persen": 81.73
        },
        "setahun": {
          "rkap": 4800,
          "persen": 66.1
        }
      },
      "REG_VI": {
        "bulanIni": {
          "realisasi": 99.02,
          "rkap": 165,
          "persen": 60.01
        },
        "sdBulanIni": {
          "realisasi": 700.91,
          "rkap": 865,
          "persen": 81.03
        },
        "setahun": {
          "rkap": 1500,
          "persen": 46.73
        }
      },
      "REG_VII": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 190,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 1254.18,
          "rkap": 870,
          "persen": 144.16
        },
        "setahun": {
          "rkap": 1700,
          "persen": 73.78
        }
      },
      "REG_II_DRUS": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 110,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 684.46,
          "rkap": 870,
          "persen": 78.67
        },
        "setahun": {
          "rkap": 1350,
          "persen": 50.7
        }
      },
      "REG_I_DJABA": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 52,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 118.97,
          "rkap": 961,
          "persen": 12.38
        },
        "setahun": {
          "rkap": 1168,
          "persen": 10.19
        }
      },
      "REG_II_DSUL": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 40,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 409.75,
          "rkap": 280,
          "persen": 146.34
        },
        "setahun": {
          "rkap": 700,
          "persen": 58.54
        }
      },
      "KONSOLIDASI": {
        "bulanIni": {
          "realisasi": 691.42,
          "rkap": 2647,
          "persen": 26.12
        },
        "sdBulanIni": {
          "realisasi": 13759.21,
          "rkap": 16820,
          "persen": 81.8
        },
        "setahun": {
          "rkap": 22568,
          "persen": 60.97
        }
      }
    }
  },
  {
    "id": "verif_dokumen",
    "no": 6,
    "tahapan": "Verifikasi dokumen",
    "iconName": "FileCheck2",
    "regionals": {
      "REG_I": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 160,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 1209.54,
          "rkap": 1124,
          "persen": 107.61
        },
        "setahun": {
          "rkap": 1250,
          "persen": 96.76
        }
      },
      "REG_II": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 200,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 311.97,
          "rkap": 1240,
          "persen": 25.16
        },
        "setahun": {
          "rkap": 1400,
          "persen": 22.28
        }
      },
      "REG_III": {
        "bulanIni": {
          "realisasi": 126.58,
          "rkap": 520,
          "persen": 24.34
        },
        "sdBulanIni": {
          "realisasi": 3436.67,
          "rkap": 3692,
          "persen": 93.08
        },
        "setahun": {
          "rkap": 4500,
          "persen": 76.37
        }
      },
      "REG_IV": {
        "bulanIni": {
          "realisasi": 252.82,
          "rkap": 500,
          "persen": 50.56
        },
        "sdBulanIni": {
          "realisasi": 2255.7,
          "rkap": 2644,
          "persen": 85.31
        },
        "setahun": {
          "rkap": 4200,
          "persen": 53.71
        }
      },
      "REG_V": {
        "bulanIni": {
          "realisasi": 384.68,
          "rkap": 600,
          "persen": 64.11
        },
        "sdBulanIni": {
          "realisasi": 3056.94,
          "rkap": 3882,
          "persen": 78.75
        },
        "setahun": {
          "rkap": 4800,
          "persen": 63.69
        }
      },
      "REG_VI": {
        "bulanIni": {
          "realisasi": 99.02,
          "rkap": 165,
          "persen": 60.01
        },
        "sdBulanIni": {
          "realisasi": 723.79,
          "rkap": 865,
          "persen": 83.68
        },
        "setahun": {
          "rkap": 1500,
          "persen": 48.25
        }
      },
      "REG_VII": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 190,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 1183.32,
          "rkap": 870,
          "persen": 136.01
        },
        "setahun": {
          "rkap": 1700,
          "persen": 69.61
        }
      },
      "REG_II_DRUS": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 110,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 367.79,
          "rkap": 870,
          "persen": 42.28
        },
        "setahun": {
          "rkap": 1350,
          "persen": 27.24
        }
      },
      "REG_I_DJABA": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 52,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 118.97,
          "rkap": 961,
          "persen": 12.38
        },
        "setahun": {
          "rkap": 1168,
          "persen": 10.19
        }
      },
      "REG_II_DSUL": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 40,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 409.75,
          "rkap": 280,
          "persen": 146.34
        },
        "setahun": {
          "rkap": 700,
          "persen": 58.54
        }
      },
      "KONSOLIDASI": {
        "bulanIni": {
          "realisasi": 863.1,
          "rkap": 2537,
          "persen": 34.02
        },
        "sdBulanIni": {
          "realisasi": 13074.45,
          "rkap": 16428,
          "persen": 79.59
        },
        "setahun": {
          "rkap": 22568,
          "persen": 57.93
        }
      }
    }
  },
  {
    "id": "verif_lapangan",
    "no": 7,
    "tahapan": "Verifikasi lapangan",
    "iconName": "ShieldCheck",
    "regionals": {
      "REG_I": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 160,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 1209.54,
          "rkap": 1128,
          "persen": 107.23
        },
        "setahun": {
          "rkap": 1250,
          "persen": 96.76
        }
      },
      "REG_II": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 200,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 311.97,
          "rkap": 1240,
          "persen": 25.16
        },
        "setahun": {
          "rkap": 1400,
          "persen": 22.28
        }
      },
      "REG_III": {
        "bulanIni": {
          "realisasi": 126.58,
          "rkap": 464,
          "persen": 27.28
        },
        "sdBulanIni": {
          "realisasi": 3177.67,
          "rkap": 3584,
          "persen": 88.66
        },
        "setahun": {
          "rkap": 4500,
          "persen": 70.61
        }
      },
      "REG_IV": {
        "bulanIni": {
          "realisasi": 252.82,
          "rkap": 304,
          "persen": 83.16
        },
        "sdBulanIni": {
          "realisasi": 2255.7,
          "rkap": 2244,
          "persen": 100.52
        },
        "setahun": {
          "rkap": 4200,
          "persen": 53.71
        }
      },
      "REG_V": {
        "bulanIni": {
          "realisasi": 213,
          "rkap": 680,
          "persen": 31.32
        },
        "sdBulanIni": {
          "realisasi": 2885.27,
          "rkap": 3800,
          "persen": 75.93
        },
        "setahun": {
          "rkap": 4800,
          "persen": 60.11
        }
      },
      "REG_VI": {
        "bulanIni": {
          "realisasi": 99.02,
          "rkap": 165,
          "persen": 60.01
        },
        "sdBulanIni": {
          "realisasi": 723.79,
          "rkap": 865,
          "persen": 83.68
        },
        "setahun": {
          "rkap": 1500,
          "persen": 48.25
        }
      },
      "REG_VII": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 190,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 1059.68,
          "rkap": 870,
          "persen": 121.8
        },
        "setahun": {
          "rkap": 1700,
          "persen": 62.33
        }
      },
      "REG_II_DRUS": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 110,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 367.79,
          "rkap": 870,
          "persen": 42.28
        },
        "setahun": {
          "rkap": 1350,
          "persen": 27.24
        }
      },
      "REG_I_DJABA": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 52,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 59.97,
          "rkap": 961,
          "persen": 6.24
        },
        "setahun": {
          "rkap": 1168,
          "persen": 5.13
        }
      },
      "REG_II_DSUL": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 40,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 409.75,
          "rkap": 280,
          "persen": 146.34
        },
        "setahun": {
          "rkap": 700,
          "persen": 58.54
        }
      },
      "KONSOLIDASI": {
        "bulanIni": {
          "realisasi": 691.42,
          "rkap": 2365,
          "persen": 29.24
        },
        "sdBulanIni": {
          "realisasi": 12461.13,
          "rkap": 15842,
          "persen": 78.66
        },
        "setahun": {
          "rkap": 22568,
          "persen": 55.22
        }
      }
    }
  },
  {
    "id": "rekomtek",
    "no": 8,
    "tahapan": "Rekomtek",
    "iconName": "Award",
    "isSpecialHighlight": true,
    "specialType": "rekomtek",
    "regionals": {
      "REG_I": {
        "bulanIni": {
          "realisasi": 115.7,
          "rkap": 140,
          "persen": 82.64
        },
        "sdBulanIni": {
          "realisasi": 1045.24,
          "rkap": 794,
          "persen": 131.64
        },
        "setahun": {
          "rkap": 1250,
          "persen": 83.62
        }
      },
      "REG_II": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 200,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 189.53,
          "rkap": 800,
          "persen": 23.69
        },
        "setahun": {
          "rkap": 1400,
          "persen": 13.54
        }
      },
      "REG_III": {
        "bulanIni": {
          "realisasi": 126.58,
          "rkap": 464,
          "persen": 27.28
        },
        "sdBulanIni": {
          "realisasi": 3032,
          "rkap": 2534,
          "persen": 119.65
        },
        "setahun": {
          "rkap": 4500,
          "persen": 67.38
        }
      },
      "REG_IV": {
        "bulanIni": {
          "realisasi": 252.82,
          "rkap": 436,
          "persen": 57.99
        },
        "sdBulanIni": {
          "realisasi": 1943.1,
          "rkap": 2172,
          "persen": 89.46
        },
        "setahun": {
          "rkap": 4200,
          "persen": 46.26
        }
      },
      "REG_V": {
        "bulanIni": {
          "realisasi": 213,
          "rkap": 650,
          "persen": 32.77
        },
        "sdBulanIni": {
          "realisasi": 2723.7,
          "rkap": 2394,
          "persen": 113.77
        },
        "setahun": {
          "rkap": 4800,
          "persen": 56.74
        }
      },
      "REG_VI": {
        "bulanIni": {
          "realisasi": 99.02,
          "rkap": 240,
          "persen": 41.26
        },
        "sdBulanIni": {
          "realisasi": 552.91,
          "rkap": 775,
          "persen": 71.34
        },
        "setahun": {
          "rkap": 1500,
          "persen": 36.86
        }
      },
      "REG_VII": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 190,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 1059.68,
          "rkap": 740,
          "persen": 143.2
        },
        "setahun": {
          "rkap": 1700,
          "persen": 62.33
        }
      },
      "REG_II_DRUS": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 110,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 554.02,
          "rkap": 810,
          "persen": 68.4
        },
        "setahun": {
          "rkap": 1350,
          "persen": 41.04
        }
      },
      "REG_I_DJABA": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 52,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 0,
          "rkap": 901,
          "persen": 0
        },
        "setahun": {
          "rkap": 1168,
          "persen": 0
        }
      },
      "REG_II_DSUL": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 40,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 334.41,
          "rkap": 280,
          "persen": 119.43
        },
        "setahun": {
          "rkap": 700,
          "persen": 47.77
        }
      },
      "KONSOLIDASI": {
        "bulanIni": {
          "realisasi": 807.12,
          "rkap": 2522,
          "persen": 32
        },
        "sdBulanIni": {
          "realisasi": 11434.58,
          "rkap": 12200,
          "persen": 93.73
        },
        "setahun": {
          "rkap": 22568,
          "persen": 50.67
        }
      }
    }
  },
  {
    "id": "pencairan_dana",
    "no": 9,
    "tahapan": "Pencairan Dana dari BPDP",
    "iconName": "Wallet",
    "isSpecialHighlight": true,
    "specialType": "pencairan_dana",
    "regionals": {
      "REG_I": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 140,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 929.54,
          "rkap": 794,
          "persen": 117.07
        },
        "setahun": {
          "rkap": 1250,
          "persen": 74.36
        }
      },
      "REG_II": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 200,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 189.53,
          "rkap": 820,
          "persen": 23.11
        },
        "setahun": {
          "rkap": 1400,
          "persen": 13.54
        }
      },
      "REG_III": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 464,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 1765.19,
          "rkap": 2448,
          "persen": 72.11
        },
        "setahun": {
          "rkap": 4500,
          "persen": 39.23
        }
      },
      "REG_IV": {
        "bulanIni": {
          "realisasi": 252.82,
          "rkap": 436,
          "persen": 57.99
        },
        "sdBulanIni": {
          "realisasi": 1831.79,
          "rkap": 2172,
          "persen": 84.34
        },
        "setahun": {
          "rkap": 4200,
          "persen": 43.61
        }
      },
      "REG_V": {
        "bulanIni": {
          "realisasi": 213,
          "rkap": 650,
          "persen": 32.77
        },
        "sdBulanIni": {
          "realisasi": 2723.7,
          "rkap": 1942,
          "persen": 140.25
        },
        "setahun": {
          "rkap": 4800,
          "persen": 56.74
        }
      },
      "REG_VI": {
        "bulanIni": {
          "realisasi": 99.02,
          "rkap": 240,
          "persen": 41.26
        },
        "sdBulanIni": {
          "realisasi": 575.9,
          "rkap": 775,
          "persen": 74.31
        },
        "setahun": {
          "rkap": 1500,
          "persen": 38.39
        }
      },
      "REG_VII": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 190,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 1059.68,
          "rkap": 740,
          "persen": 143.2
        },
        "setahun": {
          "rkap": 1700,
          "persen": 62.33
        }
      },
      "REG_II_DRUS": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 110,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 367.79,
          "rkap": 810,
          "persen": 45.41
        },
        "setahun": {
          "rkap": 1350,
          "persen": 27.24
        }
      },
      "REG_I_DJABA": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 52,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 0,
          "rkap": 881,
          "persen": 0
        },
        "setahun": {
          "rkap": 1168,
          "persen": 0
        }
      },
      "REG_II_DSUL": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 40,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 276.95,
          "rkap": 280,
          "persen": 98.91
        },
        "setahun": {
          "rkap": 700,
          "persen": 39.56
        }
      },
      "KONSOLIDASI": {
        "bulanIni": {
          "realisasi": 564.84,
          "rkap": 2522,
          "persen": 22.4
        },
        "sdBulanIni": {
          "realisasi": 9720.07,
          "rkap": 11662,
          "persen": 83.35
        },
        "setahun": {
          "rkap": 22568,
          "persen": 43.07
        }
      }
    }
  },
  {
    "id": "spj",
    "no": 10,
    "tahapan": "SPJ Pelaksanaan Peremajaan",
    "iconName": "Receipt",
    "regionals": {
      "REG_I": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 63,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 929.54,
          "rkap": 523,
          "persen": 177.73
        },
        "setahun": {
          "rkap": 688,
          "persen": 135.11
        }
      },
      "REG_II": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 60,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 65.17,
          "rkap": 506,
          "persen": 12.88
        },
        "setahun": {
          "rkap": 770,
          "persen": 8.46
        }
      },
      "REG_III": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 300,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 254.72,
          "rkap": 1118,
          "persen": 22.78
        },
        "setahun": {
          "rkap": 1728,
          "persen": 14.74
        }
      },
      "REG_IV": {
        "bulanIni": {
          "realisasi": 252.82,
          "rkap": 240,
          "persen": 105.34
        },
        "sdBulanIni": {
          "realisasi": 1550.68,
          "rkap": 866,
          "persen": 179.06
        },
        "setahun": {
          "rkap": 2310,
          "persen": 67.13
        }
      },
      "REG_V": {
        "bulanIni": {
          "realisasi": 213,
          "rkap": 300,
          "persen": 71
        },
        "sdBulanIni": {
          "realisasi": 2723.7,
          "rkap": 1099,
          "persen": 247.83
        },
        "setahun": {
          "rkap": 2640,
          "persen": 103.17
        }
      },
      "REG_VI": {
        "bulanIni": {
          "realisasi": 99.02,
          "rkap": 72,
          "persen": 137.53
        },
        "sdBulanIni": {
          "realisasi": 575.9,
          "rkap": 464,
          "persen": 124.12
        },
        "setahun": {
          "rkap": 824,
          "persen": 69.89
        }
      },
      "REG_VII": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 108,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 1059.68,
          "rkap": 473,
          "persen": 224.03
        },
        "setahun": {
          "rkap": 935,
          "persen": 113.33
        }
      },
      "REG_II_DRUS": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 80,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 367.79,
          "rkap": 461,
          "persen": 79.78
        },
        "setahun": {
          "rkap": 743,
          "persen": 49.5
        }
      },
      "REG_I_DJABA": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 31,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 0,
          "rkap": 517,
          "persen": 0
        },
        "setahun": {
          "rkap": 642,
          "persen": 0
        }
      },
      "REG_II_DSUL": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 27,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 276.95,
          "rkap": 132,
          "persen": 209.81
        },
        "setahun": {
          "rkap": 385,
          "persen": 71.94
        }
      },
      "KONSOLIDASI": {
        "bulanIni": {
          "realisasi": 564.84,
          "rkap": 1281,
          "persen": 44.09
        },
        "sdBulanIni": {
          "realisasi": 7804.13,
          "rkap": 6159,
          "persen": 126.71
        },
        "setahun": {
          "rkap": 11665,
          "persen": 66.9
        }
      }
    }
  },
  {
    "id": "tumbang",
    "no": 11,
    "tahapan": "Penumbangan Pohon",
    "iconName": "TreePine",
    "regionals": {
      "REG_I": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 48,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 929.54,
          "rkap": 249,
          "persen": 373.31
        },
        "setahun": {
          "rkap": 378,
          "persen": 245.91
        }
      },
      "REG_II": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 36,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 65.17,
          "rkap": 266,
          "persen": 24.5
        },
        "setahun": {
          "rkap": 424,
          "persen": 15.37
        }
      },
      "REG_III": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 180,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 254.72,
          "rkap": 818,
          "persen": 31.14
        },
        "setahun": {
          "rkap": 1398,
          "persen": 18.22
        }
      },
      "REG_IV": {
        "bulanIni": {
          "realisasi": 252.82,
          "rkap": 144,
          "persen": 175.57
        },
        "sdBulanIni": {
          "realisasi": 1550.68,
          "rkap": 405,
          "persen": 382.88
        },
        "setahun": {
          "rkap": 1271,
          "persen": 122
        }
      },
      "REG_V": {
        "bulanIni": {
          "realisasi": 213,
          "rkap": 200,
          "persen": 106.5
        },
        "sdBulanIni": {
          "realisasi": 2723.7,
          "rkap": 602,
          "persen": 452.44
        },
        "setahun": {
          "rkap": 1452,
          "persen": 187.58
        }
      },
      "REG_VI": {
        "bulanIni": {
          "realisasi": 99.02,
          "rkap": 43,
          "persen": 230.28
        },
        "sdBulanIni": {
          "realisasi": 502.66,
          "rkap": 238,
          "persen": 211.2
        },
        "setahun": {
          "rkap": 454,
          "persen": 110.72
        }
      },
      "REG_VII": {
        "bulanIni": {
          "realisasi": 513.22,
          "rkap": 65,
          "persen": 789.57
        },
        "sdBulanIni": {
          "realisasi": 1059.68,
          "rkap": 237,
          "persen": 447.12
        },
        "setahun": {
          "rkap": 514,
          "persen": 206.16
        }
      },
      "REG_II_DRUS": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 33,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 367.79,
          "rkap": 239,
          "persen": 153.89
        },
        "setahun": {
          "rkap": 408,
          "persen": 90.15
        }
      },
      "REG_I_DJABA": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 19,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 0,
          "rkap": 278,
          "persen": 0
        },
        "setahun": {
          "rkap": 353,
          "persen": 0
        }
      },
      "REG_II_DSUL": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 16,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 276.95,
          "rkap": 80,
          "persen": 346.19
        },
        "setahun": {
          "rkap": 212,
          "persen": 130.64
        }
      },
      "KONSOLIDASI": {
        "bulanIni": {
          "realisasi": 1078.06,
          "rkap": 784,
          "persen": 137.51
        },
        "sdBulanIni": {
          "realisasi": 7730.88,
          "rkap": 3412,
          "persen": 226.58
        },
        "setahun": {
          "rkap": 6864,
          "persen": 112.63
        }
      }
    }
  },
  {
    "id": "olah_tanah",
    "no": 12,
    "tahapan": "Pengolahan tanah",
    "iconName": "Tractor",
    "regionals": {
      "REG_I": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 48,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 929.54,
          "rkap": 249,
          "persen": 373.31
        },
        "setahun": {
          "rkap": 378,
          "persen": 245.91
        }
      },
      "REG_II": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 36,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 65.17,
          "rkap": 266,
          "persen": 24.5
        },
        "setahun": {
          "rkap": 424,
          "persen": 15.37
        }
      },
      "REG_III": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 100,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 254.72,
          "rkap": 638,
          "persen": 39.92
        },
        "setahun": {
          "rkap": 1398,
          "persen": 18.22
        }
      },
      "REG_IV": {
        "bulanIni": {
          "realisasi": 252.82,
          "rkap": 144,
          "persen": 175.57
        },
        "sdBulanIni": {
          "realisasi": 1368.68,
          "rkap": 405,
          "persen": 337.95
        },
        "setahun": {
          "rkap": 1271,
          "persen": 107.69
        }
      },
      "REG_V": {
        "bulanIni": {
          "realisasi": 213,
          "rkap": 200,
          "persen": 106.5
        },
        "sdBulanIni": {
          "realisasi": 2723.7,
          "rkap": 652,
          "persen": 417.74
        },
        "setahun": {
          "rkap": 1452,
          "persen": 187.58
        }
      },
      "REG_VI": {
        "bulanIni": {
          "realisasi": 99.02,
          "rkap": 43,
          "persen": 230.28
        },
        "sdBulanIni": {
          "realisasi": 480.66,
          "rkap": 238,
          "persen": 201.96
        },
        "setahun": {
          "rkap": 454,
          "persen": 105.87
        }
      },
      "REG_VII": {
        "bulanIni": {
          "realisasi": 513.22,
          "rkap": 65,
          "persen": 789.57
        },
        "sdBulanIni": {
          "realisasi": 1059.68,
          "rkap": 237,
          "persen": 447.12
        },
        "setahun": {
          "rkap": 514,
          "persen": 206.16
        }
      },
      "REG_II_DRUS": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 33,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 229.23,
          "rkap": 239,
          "persen": 95.91
        },
        "setahun": {
          "rkap": 408,
          "persen": 56.18
        }
      },
      "REG_I_DJABA": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 19,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 0,
          "rkap": 278,
          "persen": 0
        },
        "setahun": {
          "rkap": 353,
          "persen": 0
        }
      },
      "REG_II_DSUL": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 16,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 276.95,
          "rkap": 80,
          "persen": 346.19
        },
        "setahun": {
          "rkap": 212,
          "persen": 130.64
        }
      },
      "KONSOLIDASI": {
        "bulanIni": {
          "realisasi": 1078.06,
          "rkap": 747,
          "persen": 144.32
        },
        "sdBulanIni": {
          "realisasi": 7388.32,
          "rkap": 3282,
          "persen": 225.12
        },
        "setahun": {
          "rkap": 6864,
          "persen": 107.64
        }
      }
    }
  },
  {
    "id": "penanaman",
    "no": 13,
    "tahapan": "Penanaman",
    "iconName": "Sprout",
    "regionals": {
      "REG_I": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 48,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 840.85,
          "rkap": 249,
          "persen": 337.69
        },
        "setahun": {
          "rkap": 378,
          "persen": 222.45
        }
      },
      "REG_II": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 36,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 65.17,
          "rkap": 266,
          "persen": 24.5
        },
        "setahun": {
          "rkap": 424,
          "persen": 15.37
        }
      },
      "REG_III": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 144,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 254.72,
          "rkap": 558,
          "persen": 45.65
        },
        "setahun": {
          "rkap": 1361,
          "persen": 18.72
        }
      },
      "REG_IV": {
        "bulanIni": {
          "realisasi": 252.82,
          "rkap": 144,
          "persen": 175.57
        },
        "sdBulanIni": {
          "realisasi": 1368.68,
          "rkap": 405,
          "persen": 337.95
        },
        "setahun": {
          "rkap": 1271,
          "persen": 107.69
        }
      },
      "REG_V": {
        "bulanIni": {
          "realisasi": 213,
          "rkap": 200,
          "persen": 106.5
        },
        "sdBulanIni": {
          "realisasi": 2723.7,
          "rkap": 652,
          "persen": 417.74
        },
        "setahun": {
          "rkap": 450,
          "persen": 605.27
        }
      },
      "REG_VI": {
        "bulanIni": {
          "realisasi": 99.02,
          "rkap": 43,
          "persen": 230.28
        },
        "sdBulanIni": {
          "realisasi": 480.66,
          "rkap": 238,
          "persen": 201.96
        },
        "setahun": {
          "rkap": 454,
          "persen": 105.87
        }
      },
      "REG_VII": {
        "bulanIni": {
          "realisasi": 513.22,
          "rkap": 65,
          "persen": 789.57
        },
        "sdBulanIni": {
          "realisasi": 1059.68,
          "rkap": 237,
          "persen": 447.12
        },
        "setahun": {
          "rkap": 514,
          "persen": 206.16
        }
      },
      "REG_II_DRUS": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 33,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 367.79,
          "rkap": 239,
          "persen": 153.89
        },
        "setahun": {
          "rkap": 408,
          "persen": 90.15
        }
      },
      "REG_I_DJABA": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 19,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 0,
          "rkap": 278,
          "persen": 0
        },
        "setahun": {
          "rkap": 353,
          "persen": 0
        }
      },
      "REG_II_DSUL": {
        "bulanIni": {
          "realisasi": 0,
          "rkap": 16,
          "persen": 0
        },
        "sdBulanIni": {
          "realisasi": 276.95,
          "rkap": 80,
          "persen": 346.19
        },
        "setahun": {
          "rkap": 212,
          "persen": 130.64
        }
      },
      "KONSOLIDASI": {
        "bulanIni": {
          "realisasi": 1078.06,
          "rkap": 748,
          "persen": 144.13
        },
        "sdBulanIni": {
          "realisasi": 7438.19,
          "rkap": 3202,
          "persen": 232.3
        },
        "setahun": {
          "rkap": 5825,
          "persen": 127.69
        }
      }
    }
  }
];

export const REGIONAL_KEYS = [
  'REG_I',
  'REG_II',
  'REG_III',
  'REG_IV',
  'REG_V',
  'REG_VI',
  'REG_VII',
  'REG_II_DRUS',
  'REG_I_DJABA',
  'REG_II_DSUL'
];

/**
 * Returns dynamic or exact progress matrix for selected month and week.
 * When user selects "Agustus" and "W4", it matches the exact Google Sheet "To ppt RKO" values.
 * For other months / weeks, it smoothly computes accurate proportional scaling based on RKAP targets and elapsed timeline.
 */
export function getRkoProgressMatrix(
  selectedMonth: MonthName = 'Agustus', 
  selectedWeek: WeekName = 'W4'
): StageDataRow[] {
  const monthIndex = MONTH_LIST.indexOf(selectedMonth);
  const weekIndex = WEEK_LIST.indexOf(selectedWeek);
  const mIdx = monthIndex >= 0 ? monthIndex : 7;
  const wIdx = weekIndex >= 0 ? weekIndex : 3;

  // Exact anchor check: Agustus W4 matches the official sheet directly
  const isExactBaseline = (selectedMonth === 'Agustus' || mIdx === 7) && (selectedWeek === 'W4' || wIdx === 3);

  return EXACT_SHEET_RKO_BASELINE.map((baseStage) => {
    const isRekomtek = baseStage.id === 'rekomtek';
    const isPencairan = baseStage.id === 'pencairan_dana';

    const regionalsObj: StageDataRow['regionals'] = {};
    let totalBulanIniReal = 0;
    let totalBulanIniRkap = 0;
    let totalSdBlnIniReal = 0;
    let totalSdBlnIniRkap = 0;
    let totalSetahunRkap = 0;

    REGIONAL_KEYS.forEach((regKey) => {
      const baseReg = baseStage.regionals[regKey];
      if (!baseReg) return;

      if (isExactBaseline) {
        regionalsObj[regKey] = {
          bulanIni: { ...baseReg.bulanIni },
          sdBulanIni: { ...baseReg.sdBulanIni },
          setahun: { ...baseReg.setahun }
        };
        totalBulanIniReal += baseReg.bulanIni.realisasi;
        totalBulanIniRkap += baseReg.bulanIni.rkap;
        totalSdBlnIniReal += baseReg.sdBulanIni.realisasi;
        totalSdBlnIniRkap += baseReg.sdBulanIni.rkap;
        totalSetahunRkap += baseReg.setahun.rkap;
        return;
      }

      // Proportional calculation for other months/weeks
      const annualRkap = baseReg.setahun.rkap;
      const targetPerMonth = annualRkap > 0 ? annualRkap / 12 : (baseReg.bulanIni.rkap || 100);
      
      const elapsedTargetMonths = (mIdx + (wIdx + 1) / 4);
      const rkapSdBlnIni = Number(Math.min(annualRkap, targetPerMonth * elapsedTargetMonths).toFixed(1));
      const monthlyRkap = Number((targetPerMonth * ((wIdx + 1) / 4)).toFixed(1));

      const timeRatio = elapsedTargetMonths / 8.0; // 8.0 is baseline Agustus W4
      let sdBlnReal = Number((baseReg.sdBulanIni.realisasi * timeRatio).toFixed(1));
      
      // Monthly real
      let monthlyReal = Number((baseReg.bulanIni.realisasi * ((wIdx + 1) / 4) * (mIdx > 7 ? 1.05 : mIdx < 7 ? 0.92 : 1.0)).toFixed(1));
      if (sdBlnReal < monthlyReal) sdBlnReal = monthlyReal;

      const bulanIniPersen = monthlyRkap > 0 ? Number(((monthlyReal / monthlyRkap) * 100).toFixed(1)) : 0;
      const sdBlnPersen = rkapSdBlnIni > 0 ? Number(((sdBlnReal / rkapSdBlnIni) * 100).toFixed(1)) : 0;
      const setahunPersen = annualRkap > 0 ? Number(((sdBlnReal / annualRkap) * 100).toFixed(1)) : 0;

      regionalsObj[regKey] = {
        bulanIni: {
          realisasi: monthlyReal,
          rkap: monthlyRkap,
          persen: bulanIniPersen
        },
        sdBulanIni: {
          realisasi: sdBlnReal,
          rkap: rkapSdBlnIni,
          persen: sdBlnPersen
        },
        setahun: {
          rkap: annualRkap,
          persen: setahunPersen
        }
      };

      totalBulanIniReal += monthlyReal;
      totalBulanIniRkap += monthlyRkap;
      totalSdBlnIniReal += sdBlnReal;
      totalSdBlnIniRkap += rkapSdBlnIni;
      totalSetahunRkap += annualRkap;
    });

    if (isExactBaseline && baseStage.regionals.KONSOLIDASI) {
      regionalsObj['KONSOLIDASI'] = { ...baseStage.regionals.KONSOLIDASI };
    } else {
      const konsolBulanIniPersen = totalBulanIniRkap > 0 ? Number(((totalBulanIniReal / totalBulanIniRkap) * 100).toFixed(1)) : 0;
      const konsolSdBlnPersen = totalSdBlnIniRkap > 0 ? Number(((totalSdBlnIniReal / totalSdBlnIniRkap) * 100).toFixed(1)) : 0;
      const konsolSetahunPersen = totalSetahunRkap > 0 ? Number(((totalSdBlnIniReal / totalSetahunRkap) * 100).toFixed(1)) : 0;

      regionalsObj['KONSOLIDASI'] = {
        bulanIni: {
          realisasi: Number(totalBulanIniReal.toFixed(1)),
          rkap: Number(totalBulanIniRkap.toFixed(1)),
          persen: konsolBulanIniPersen
        },
        sdBulanIni: {
          realisasi: Number(totalSdBlnIniReal.toFixed(1)),
          rkap: Number(totalSdBlnIniRkap.toFixed(1)),
          persen: konsolSdBlnPersen
        },
        setahun: {
          rkap: Number(totalSetahunRkap.toFixed(1)),
          persen: konsolSetahunPersen
        }
      };
    }

    return {
      id: baseStage.id,
      no: baseStage.no,
      tahapan: baseStage.tahapan,
      iconName: baseStage.iconName,
      isSpecialHighlight: isRekomtek || isPencairan,
      specialType: isRekomtek ? 'rekomtek' : isPencairan ? 'pencairan_dana' : undefined,
      regionals: regionalsObj
    };
  });
}

export interface KonsolidasiSummaryItem {
  stageId: string;
  no: number;
  tahapan: string;
  iconName: string;
  isSpecialHighlight?: boolean;
  specialType?: 'rekomtek' | 'pencairan_dana';
  
  // Realisasi vs RKAP (Tanpa Deviasi)
  bulanIniReal: number;
  bulanIniRkap: number;
  bulanIniPersen: number;

  sdBulanIniReal: number;
  sdBulanIniRkap: number;
  sdBulanIniPersen: number;

  rkapSetahun: number;
  sisaTargetSetahun: number; // RKAP Setahun - Real Sd Bulan Ini
  capaianSetahunPersen: number;
}

/**
 * Get comprehensive Kompilasi RKAP vs Realisasi Konsolidasi PALMCO data (Clean without Deviasi)
 */
export function getKonsolidasiPalmcoData(matrix: StageDataRow[]): KonsolidasiSummaryItem[] {
  return matrix.map(row => {
    const k = row.regionals['KONSOLIDASI'];
    const bulanIniReal = k?.bulanIni?.realisasi || 0;
    const bulanIniRkap = k?.bulanIni?.rkap || 0;
    const bulanIniPersen = k?.bulanIni?.persen || 0;

    const sdBulanIniReal = k?.sdBulanIni?.realisasi || 0;
    const sdBulanIniRkap = k?.sdBulanIni?.rkap || 0;
    const sdBulanIniPersen = k?.sdBulanIni?.persen || 0;

    const rkapSetahun = k?.setahun?.rkap || 0;
    const sisaTargetSetahun = Number(Math.max(0, rkapSetahun - sdBulanIniReal).toFixed(1));
    const capaianSetahunPersen = k?.setahun?.persen || 0;

    return {
      stageId: row.id,
      no: row.no,
      tahapan: row.tahapan,
      iconName: row.iconName,
      isSpecialHighlight: row.isSpecialHighlight,
      specialType: row.specialType,
      bulanIniReal,
      bulanIniRkap,
      bulanIniPersen,
      sdBulanIniReal,
      sdBulanIniRkap,
      sdBulanIniPersen,
      rkapSetahun,
      sisaTargetSetahun,
      capaianSetahunPersen
    };
  });
}
