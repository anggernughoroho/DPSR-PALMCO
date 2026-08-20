import pptxgenjs from 'pptxgenjs';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { MonthName, WeekName, StageDataRow, REGIONAL_COLUMNS, getKonsolidasiPalmcoData } from '../data/rkoProgressData';
import { formatNumber } from './utils';

/**
 * Export matrix to native Microsoft PowerPoint (.pptx) presentation
 */
export async function exportRkoToPptx(
  month: MonthName,
  week: WeekName,
  matrix: StageDataRow[],
  activeRegionalFilter: string
) {
  const pptx = new pptxgenjs();
  pptx.layout = 'LAYOUT_WIDE'; // 16:9 widescreen presentation

  // =========================================================================
  // SLIDE 1: Matriks Rekapitulasi RKO (To ppt RKO)
  // =========================================================================
  const slide1 = pptx.addSlide();
  slide1.background = { color: 'F8FAFC' };

  // Header Title
  slide1.addText(`Executive Summary up to : ${week} ${month}`, {
    x: 0.5,
    y: 0.25,
    w: 8.5,
    h: 0.45,
    fontSize: 17,
    bold: true,
    color: '064E3B', // Emerald-900
    fontFace: 'Arial'
  });

  slide1.addText(`Peremajaan Sawit Rakyat (Ha) • Sub-Holding PalmCo PT Perkebunan Nusantara IV`, {
    x: 0.5,
    y: 0.7,
    w: 9.5,
    h: 0.25,
    fontSize: 9.5,
    italic: true,
    color: '475569',
    fontFace: 'Arial'
  });

  // Badge Status
  slide1.addText(`Periode: ${week} ${month} 2026`, {
    x: 9.6,
    y: 0.3,
    w: 3.2,
    h: 0.35,
    fontSize: 9,
    bold: true,
    color: 'FFFFFF',
    fill: { color: '047857' },
    align: 'center',
    fontFace: 'Arial'
  });

  // Table Columns Setup
  const selectedRegDef = activeRegionalFilter === 'ALL'
    ? REGIONAL_COLUMNS
    : REGIONAL_COLUMNS.filter(r => r.id === activeRegionalFilter || r.id === 'KONSOLIDASI');

  const tableRows: any[][] = [];

  // Header 1 (Regional Names)
  const headerRow1: any[] = [{ text: 'Tahapan PSR', options: { rowSpan: 2, bold: true, fill: { color: '065F46' }, color: 'FFFFFF', align: 'center', fontSize: 7 } }];
  selectedRegDef.forEach(reg => {
    headerRow1.push({
      text: reg.shortCode,
      options: { colSpan: 3, bold: true, fill: { color: reg.id === 'KONSOLIDASI' ? '064E3B' : '065F46' }, color: reg.id === 'KONSOLIDASI' ? 'FDE047' : 'FFFFFF', align: 'center', fontSize: 7 }
    });
  });
  tableRows.push(headerRow1);

  // Header 2 (Bulan Ini, Sd Bln Ini, Setahun)
  const headerRow2: any[] = [];
  selectedRegDef.forEach(() => {
    headerRow2.push(
      { text: 'Bln Ini', options: { bold: true, fill: { color: '047857' }, color: 'FFFFFF', align: 'center', fontSize: 6.5 } },
      { text: 'Sd Bln Ini', options: { bold: true, fill: { color: '047857' }, color: 'FFFFFF', align: 'center', fontSize: 6.5 } },
      { text: '% RKAP', options: { bold: true, fill: { color: '047857' }, color: 'FFFFFF', align: 'center', fontSize: 6.5 } }
    );
  });
  tableRows.push(headerRow2);

  // Body Rows (13 stages)
  matrix.forEach((row, idx) => {
    const isSpecial = row.isSpecialHighlight;
    let bgRowColor = idx % 2 === 0 ? 'FFFFFF' : 'F8FAFC';
    let textColor = '1E293B';
    
    if (row.id === 'rekomtek') {
      bgRowColor = 'D1FAE5'; // Emerald-100
      textColor = '064E3B';
    } else if (row.id === 'pencairan_dana') {
      bgRowColor = 'DBEAFE'; // Blue-100
      textColor = '1E3A8A';
    }

    const rowCells: any[] = [
      {
        text: `${row.no}. ${row.tahapan}`,
        options: {
          bold: isSpecial,
          fill: { color: bgRowColor },
          color: textColor,
          fontSize: 7,
          align: 'left'
        }
      }
    ];

    selectedRegDef.forEach(reg => {
      const data = row.regionals[reg.id];
      rowCells.push(
        {
          text: formatNumber(data?.bulanIni?.realisasi || 0, 1),
          options: { fill: { color: bgRowColor }, color: textColor, fontSize: 6.5, align: 'right' }
        },
        {
          text: formatNumber(data?.sdBulanIni?.realisasi || 0, 1),
          options: { bold: isSpecial, fill: { color: bgRowColor }, color: textColor, fontSize: 6.5, align: 'right' }
        },
        {
          text: `${(data?.setahun?.persen || 0).toFixed(1)}%`,
          options: { bold: true, fill: { color: bgRowColor }, color: isSpecial ? '047857' : '334155', fontSize: 6.5, align: 'right' }
        }
      );
    });

    tableRows.push(rowCells);
  });

  slide1.addTable(tableRows, {
    x: 0.4,
    y: 1.05,
    w: 12.5,
    colW: [2.3, ...Array(selectedRegDef.length * 3).fill((12.5 - 2.3) / (selectedRegDef.length * 3))],
    border: { pt: 0.5, color: 'CBD5E1' }
  });

  slide1.addText('Sumber: Sub-Holding PalmCo PTPN IV • Divisi PSR & Plasma', {
    x: 0.5,
    y: 7.0,
    w: 6.0,
    h: 0.3,
    fontSize: 8,
    color: '94A3B8'
  });

  // =========================================================================
  // SLIDE 2: Kompilasi RKAP Vs Realisasi Konsolidasi "PALMCO"
  // =========================================================================
  const slide2 = pptx.addSlide();
  slide2.background = { color: 'F8FAFC' };

  slide2.addText('Kompilasi RKAP Vs Realisasi Konsolidasi "PALMCO"', {
    x: 0.5,
    y: 0.3,
    w: 10.0,
    h: 0.45,
    fontSize: 18,
    bold: true,
    color: '064E3B'
  });

  slide2.addText(`Posisi: Minggu ke-4 (${week}) • ${month} 2026 | Rekapitulasi Capaian Nasional Terhadap RKAP`, {
    x: 0.5,
    y: 0.75,
    w: 10.0,
    h: 0.3,
    fontSize: 10,
    color: '475569'
  });

  // Konsolidasi Data Table
  const konsolidasiRows = getKonsolidasiPalmcoData(matrix);
  const konsolTable: any[][] = [];

  // Headers
  konsolTable.push([
    { text: 'No & Tahapan PSR', options: { rowSpan: 2, bold: true, fill: { color: '064E3B' }, color: 'FFFFFF', align: 'center', fontSize: 8 } },
    { text: 'Bulan Ini (Ha)', options: { colSpan: 3, bold: true, fill: { color: '047857' }, color: 'FFFFFF', align: 'center', fontSize: 8 } },
    { text: 's.d. Bulan Ini (Ha)', options: { colSpan: 3, bold: true, fill: { color: '047857' }, color: 'FFFFFF', align: 'center', fontSize: 8 } },
    { text: 'RKAP Setahun', options: { colSpan: 3, bold: true, fill: { color: '065F46' }, color: 'FFFFFF', align: 'center', fontSize: 8 } }
  ]);

  konsolTable.push([
    { text: 'Realisasi', options: { bold: true, fill: { color: '065F46' }, color: 'FFFFFF', align: 'center', fontSize: 7 } },
    { text: 'RKAP', options: { bold: true, fill: { color: '065F46' }, color: 'FFFFFF', align: 'center', fontSize: 7 } },
    { text: '%', options: { bold: true, fill: { color: '065F46' }, color: 'FFFFFF', align: 'center', fontSize: 7 } },
    
    { text: 'Realisasi', options: { bold: true, fill: { color: '065F46' }, color: 'FFFFFF', align: 'center', fontSize: 7 } },
    { text: 'RKAP', options: { bold: true, fill: { color: '065F46' }, color: 'FFFFFF', align: 'center', fontSize: 7 } },
    { text: '%', options: { bold: true, fill: { color: '065F46' }, color: 'FFFFFF', align: 'center', fontSize: 7 } },

    { text: 'Target', options: { bold: true, fill: { color: '047857' }, color: 'FFFFFF', align: 'center', fontSize: 7 } },
    { text: 'Sisa Target', options: { bold: true, fill: { color: '047857' }, color: 'FFFFFF', align: 'center', fontSize: 7 } },
    { text: '% Capaian', options: { bold: true, fill: { color: '047857' }, color: 'FFFFFF', align: 'center', fontSize: 7 } }
  ]);

  konsolidasiRows.forEach((row, idx) => {
    let bg = idx % 2 === 0 ? 'FFFFFF' : 'F8FAFC';
    let txt = '1E293B';
    const isSpecial = row.isSpecialHighlight;

    if (row.stageId === 'rekomtek') {
      bg = 'D1FAE5';
      txt = '064E3B';
    } else if (row.stageId === 'pencairan_dana') {
      bg = 'DBEAFE';
      txt = '1E3A8A';
    }

    konsolTable.push([
      { text: `${row.no}. ${row.tahapan}`, options: { bold: isSpecial, fill: { color: bg }, color: txt, fontSize: 7.5, align: 'left' } },
      { text: formatNumber(row.bulanIniReal, 1), options: { fill: { color: bg }, color: txt, fontSize: 7.5, align: 'right' } },
      { text: formatNumber(row.bulanIniRkap, 1), options: { fill: { color: bg }, color: txt, fontSize: 7.5, align: 'right' } },
      { text: `${row.bulanIniPersen.toFixed(1)}%`, options: { bold: true, fill: { color: bg }, color: txt, fontSize: 7.5, align: 'right' } },
      { text: formatNumber(row.sdBulanIniReal, 1), options: { bold: isSpecial, fill: { color: bg }, color: txt, fontSize: 7.5, align: 'right' } },
      { text: formatNumber(row.sdBulanIniRkap, 1), options: { fill: { color: bg }, color: txt, fontSize: 7.5, align: 'right' } },
      { text: `${row.sdBulanIniPersen.toFixed(1)}%`, options: { bold: true, fill: { color: bg }, color: txt, fontSize: 7.5, align: 'right' } },
      { text: formatNumber(row.rkapSetahun, 1), options: { bold: true, fill: { color: bg }, color: txt, fontSize: 7.5, align: 'right' } },
      { text: formatNumber(row.sisaTargetSetahun, 1), options: { fill: { color: bg }, color: txt, fontSize: 7.5, align: 'right' } },
      { text: `${row.capaianSetahunPersen.toFixed(1)}%`, options: { bold: true, fill: { color: bg }, color: isSpecial ? '047857' : '1E293B', fontSize: 7.5, align: 'right' } }
    ]);
  });

  slide2.addTable(konsolTable, {
    x: 0.5,
    y: 1.15,
    w: 12.3,
    colW: [3.3, 0.9, 0.9, 0.9, 1.1, 1.1, 0.9, 1.1, 1.1, 1.1],
    border: { pt: 0.5, color: 'CBD5E1' }
  });

  // =========================================================================
  // SLIDE 3: Key Milestones Summary & Regional Highlights
  // =========================================================================
  const slide3 = pptx.addSlide();
  slide3.background = { color: 'F8FAFC' };

  slide3.addText(`Pencapaian Milestone Program PSR (${week} ${month} 2026)`, {
    x: 0.5,
    y: 0.5,
    w: 12.0,
    h: 0.5,
    fontSize: 20,
    bold: true,
    color: '064E3B'
  });

  // Milestone Cards
  const rekomtekRow = matrix.find(m => m.id === 'rekomtek')?.regionals['KONSOLIDASI'];
  const pencairanRow = matrix.find(m => m.id === 'pencairan_dana')?.regionals['KONSOLIDASI'];
  const tanamRow = matrix.find(m => m.id === 'penanaman')?.regionals['KONSOLIDASI'];

  // Card 1: Rekomtek (Special Emerald)
  slide3.addShape(pptx.ShapeType.rect, {
    x: 0.5,
    y: 1.3,
    w: 3.8,
    h: 2.2,
    fill: { color: 'ECFDF5' },
    line: { color: '059669', width: 1.5 }
  });
  slide3.addText('TOTAL REKOMTEK NASIONAL', { x: 0.7, y: 1.5, w: 3.4, h: 0.3, fontSize: 11, bold: true, color: '065F46' });
  slide3.addText(`${formatNumber(rekomtekRow?.sdBulanIni?.realisasi || 0, 1)} Ha`, { x: 0.7, y: 1.9, w: 3.4, h: 0.6, fontSize: 24, bold: true, color: '047857' });
  slide3.addText(`Capaian: ${(rekomtekRow?.setahun?.persen || 0).toFixed(1)}% dari RKAP Tahunan`, { x: 0.7, y: 2.6, w: 3.4, h: 0.4, fontSize: 10, color: '475569' });

  // Card 2: Pencairan Dana BPDP (Special Blue)
  slide3.addShape(pptx.ShapeType.rect, {
    x: 4.7,
    y: 1.3,
    w: 3.8,
    h: 2.2,
    fill: { color: 'EFF6FF' },
    line: { color: '2563EB', width: 1.5 }
  });
  slide3.addText('PENCAIRAN DANA BPDP', { x: 4.9, y: 1.5, w: 3.4, h: 0.3, fontSize: 11, bold: true, color: '1E40AF' });
  slide3.addText(`${formatNumber(pencairanRow?.sdBulanIni?.realisasi || 0, 1)} Ha`, { x: 4.9, y: 1.9, w: 3.4, h: 0.6, fontSize: 24, bold: true, color: '1D4ED8' });
  slide3.addText(`Capaian: ${(pencairanRow?.setahun?.persen || 0).toFixed(1)}% dari Target Tahunan`, { x: 4.9, y: 2.6, w: 3.4, h: 0.4, fontSize: 10, color: '475569' });

  // Card 3: Realisasi Tanam
  slide3.addShape(pptx.ShapeType.rect, {
    x: 8.9,
    y: 1.3,
    w: 3.8,
    h: 2.2,
    fill: { color: 'F1F5F9' },
    line: { color: '64748B', width: 1.5 }
  });
  slide3.addText('REALISASI PENANAMAN', { x: 9.1, y: 1.5, w: 3.4, h: 0.3, fontSize: 11, bold: true, color: '334155' });
  slide3.addText(`${formatNumber(tanamRow?.sdBulanIni?.realisasi || 0, 1)} Ha`, { x: 9.1, y: 1.9, w: 3.4, h: 0.6, fontSize: 24, bold: true, color: '0F172A' });
  slide3.addText(`Capaian: ${(tanamRow?.setahun?.persen || 0).toFixed(1)}% dari Target Tanam Tahunan`, { x: 9.1, y: 2.6, w: 3.4, h: 0.4, fontSize: 10, color: '475569' });

  // Notes on Slide 3
  slide3.addText('Catatan Strategis Realisasi Regional:', { x: 0.5, y: 4.0, w: 12.0, h: 0.4, fontSize: 14, bold: true, color: '1E293B' });
  slide3.addText(
    `• Regional I (Sumatera Utara) mencatat realisasi Rekomtek tertinggi sebesar ${formatNumber(matrix[7].regionals['REG_I'].sdBulanIni.realisasi, 1)} Ha (${matrix[7].regionals['REG_I'].setahun.persen}% dari target tahunan).\n` +
    `• Regional III (Jambi / Sumsel) memimpin pendataan luasan calon petani/KUD dengan total ${formatNumber(matrix[0].regionals['REG_III'].sdBulanIni.realisasi, 1)} Ha.\n` +
    `• Regional II - DRUS (eks N2), Regional I - Djaba (eks N8), dan Regional II - DSUL (eks N14) telah terintegrasi dalam sistem pemantauan terpadu PalmCo.`,
    { x: 0.5, y: 4.5, w: 12.0, h: 2.0, fontSize: 11, color: '334155', lineSpacing: 20 }
  );

  // Save PPTX
  const fileName = `Highlight_Progres_PSR_PalmCo_${week}_${month}_2026.pptx`;
  await pptx.writeFile({ fileName });
}

/**
 * Capture DOM node and export to High-Resolution JPG / PNG image
 */
export async function exportRkoToJpg(elementId: string, month: MonthName, week: WeekName) {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('Element not found');
  }

  const canvas = await html2canvas(element, {
    scale: 2.5, // Crisp 2.5x resolution for presentations and reports
    useCORS: true,
    backgroundColor: '#FFFFFF',
    logging: false
  });

  const image = canvas.toDataURL('image/jpeg', 0.95);
  const link = document.createElement('a');
  link.href = image;
  link.download = `Highlight_Progres_PSR_PalmCo_${week}_${month}_2026.jpg`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Export directly to clean formatted PDF file
 */
export async function exportRkoToPdf(elementId: string, month: MonthName, week: WeekName) {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('Element not found');
  }

  const canvas = await html2canvas(element, {
    scale: 2.0,
    useCORS: true,
    backgroundColor: '#FFFFFF',
    logging: false
  });

  const imgData = canvas.toDataURL('image/jpeg', 0.95);
  
  // A4 Landscape is 297mm x 210mm
  const pdf = new jsPDF('l', 'mm', 'a4');
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  
  const imgWidth = pdfWidth - 10; // 5mm margin each side
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  pdf.addImage(imgData, 'JPEG', 5, 5, imgWidth, Math.min(imgHeight, pdfHeight - 10));
  pdf.save(`Highlight_Progres_PSR_PalmCo_${week}_${month}_2026.pdf`);
}

