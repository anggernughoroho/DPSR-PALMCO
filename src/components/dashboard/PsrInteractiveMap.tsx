import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { usePsr } from '../../context/PsrContext';
import { KudRecord } from '../../types/psr';
import { formatHectare, formatIDR } from '../../lib/utils';
import { 
  MapPin, 
  Layers, 
  Compass, 
  Eye, 
  Building2, 
  Sprout, 
  Maximize2,
  Minimize2,
  TreePine,
  CheckCircle,
  Clock,
  Sparkles
} from 'lucide-react';

interface PsrInteractiveMapProps {
  heightClass?: string;
  isFullScreenMode?: boolean;
}

export const PsrInteractiveMap: React.FC<PsrInteractiveMapProps> = ({ 
  heightClass = 'h-[440px]',
  isFullScreenMode = false 
}) => {
  const { filteredKudList, setSelectedKudDetail, setFilter, filters } = usePsr();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  const [mapLayer, setMapLayer] = useState<'street' | 'satellite' | 'topo'>('street');
  const [selectedRegionalJump, setSelectedRegionalJump] = useState<string>('ALL');

  // Coordinates centers
  const regionalCenters: Record<string, { center: [number, number]; zoom: number }> = {
    'ALL': { center: [0.5, 107.0], zoom: 5 }, // Indonesia view
    'Regional 1': { center: [3.2, 98.8], zoom: 8 },
    'Regional 2': { center: [0.5, 101.5], zoom: 8 },
    'Regional 3': { center: [-1.6, 102.5], zoom: 8 },
    'Regional 4': { center: [-3.2, 104.5], zoom: 8 },
    'Regional 5': { center: [-0.2, 111.0], zoom: 7 },
    'Regional 6': { center: [-2.0, 114.5], zoom: 7 },
    'Regional 7': { center: [-3.5, 119.5], zoom: 7 }
  };

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: regionalCenters['ALL'].center,
        zoom: regionalCenters['ALL'].zoom,
        zoomControl: false,
        attributionControl: false
      });

      // Add Zoom Control at bottom right
      L.control.zoom({ position: 'bottomright' }).addTo(map);

      // Attribution
      L.control.attribution({ position: 'bottomleft', prefix: '© PTPN IV PalmCo GIS' }).addTo(map);

      mapInstanceRef.current = map;
      markersLayerRef.current = L.layerGroup().addTo(map);
    }

    return () => {
      // cleanup handled gracefully
    };
  }, []);

  // Update Tile Layer
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Remove existing tile layers
    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer);
      }
    });

    let tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    let maxZoom = 19;

    if (mapLayer === 'satellite') {
      tileUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      maxZoom = 18;
    } else if (mapLayer === 'topo') {
      tileUrl = 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
      maxZoom = 17;
    }

    L.tileLayer(tileUrl, {
      maxZoom,
      subdomains: mapLayer === 'satellite' ? ['server', 'services'] : ['a', 'b', 'c']
    }).addTo(map);

  }, [mapLayer]);

  // Update Markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersLayer = markersLayerRef.current;
    if (!map || !markersLayer) return;

    markersLayer.clearLayers();

    const bounds = L.latLngBounds([]);

    filteredKudList.forEach((kud) => {
      if (kud.latitude && kud.longitude) {
        // Marker color depending on kemitraan
        let pinColor = '#059669'; // Emerald (Single Mgmt)
        let pinBg = 'bg-emerald-600';
        if (kud.statusKemitraan === 'Off-Taker TBS') {
          pinColor = '#ea580c';
          pinBg = 'bg-orange-600';
        } else if (kud.statusKemitraan === 'Full Off-taker & Pemeliharaan') {
          pinColor = '#0284c7';
          pinBg = 'bg-sky-600';
        } else if (kud.statusKemitraan === 'Penyediaan Bibit & Agronomi') {
          pinColor = '#7c3aed';
          pinBg = 'bg-purple-600';
        }

        // Custom HTML Leaflet Icon
        const customIcon = L.divIcon({
          className: 'custom-palm-pin',
          html: `
            <div style="position: relative; display: flex; align-items: center; justify-content: center;">
              <div style="
                background-color: ${pinColor};
                width: 32px;
                height: 32px;
                border-radius: 50% 50% 50% 0;
                transform: rotate(-45deg);
                box-shadow: 0 4px 10px rgba(0,0,0,0.3);
                border: 2px solid white;
                display: flex;
                align-items: center;
                justify-content: center;
              ">
                <div style="transform: rotate(45deg); color: white; font-weight: 800; font-size: 11px;">
                  🌴
                </div>
              </div>
              <div style="
                position: absolute;
                bottom: -4px;
                width: 8px;
                height: 4px;
                background: rgba(0,0,0,0.3);
                border-radius: 50%;
                filter: blur(1px);
              "></div>
            </div>
          `,
          iconSize: [32, 32],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32]
        });

        const marker = L.marker([kud.latitude, kud.longitude], { icon: customIcon });

        // Build Popup HTML
        const popupContent = document.createElement('div');
        popupContent.className = 'p-3 text-slate-800 text-xs w-64';
        popupContent.innerHTML = `
          <div style="font-family: inherit;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
              <span style="font-size: 10px; font-weight: 700; background: #ecfdf5; color: #047857; padding: 2px 6px; border-radius: 4px; border: 1px solid #a7f3d0;">
                ${kud.regional}
              </span>
              <span style="font-size: 10px; font-weight: 600; color: #64748b;">
                ${kud.kodeKud}
              </span>
            </div>
            <h4 style="font-size: 13px; font-weight: 800; color: #0f172a; margin-bottom: 4px; line-height: 1.3;">
              ${kud.namaKud}
            </h4>
            <p style="font-size: 11px; color: #475569; margin-bottom: 8px;">
              📍 ${kud.kabupaten}, ${kud.provinsi}
            </p>

            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 8px; margin-bottom: 8px; display: grid; grid-template-columns: 1fr 1fr; gap: 4px;">
              <div>
                <span style="font-size: 9px; color: #64748b; display: block;">Luas Rekomtek</span>
                <strong style="font-size: 11px; color: #059669;">${kud.luasRekomtekHa.toFixed(1)} Ha</strong>
              </div>
              <div>
                <span style="font-size: 9px; color: #64748b; display: block;">Luas Tanam</span>
                <strong style="font-size: 11px; color: #0284c7;">${kud.luasTanamHa.toFixed(1)} Ha</strong>
              </div>
              <div>
                <span style="font-size: 9px; color: #64748b; display: block;">Total Cair</span>
                <strong style="font-size: 10px; color: #ea580c;">${formatIDR(kud.totalNilaiPencairan)}</strong>
              </div>
              <div>
                <span style="font-size: 9px; color: #64748b; display: block;">Mitra PKS</span>
                <strong style="font-size: 10px; color: #334155; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: block;">${kud.unitPksMitra.split('/')[0]}</strong>
              </div>
            </div>

            <div style="font-size: 10px; color: #334155; margin-bottom: 8px;">
              <span style="font-weight: 600;">Tahapan:</span> ${kud.tahapanPsr}
            </div>

            <button id="btn-popup-${kud.id}" style="
              width: 100%;
              background: #059669;
              color: white;
              border: none;
              padding: 6px 10px;
              border-radius: 6px;
              font-weight: 700;
              font-size: 11px;
              cursor: pointer;
            ">
              Buka Detail Lengkap
            </button>
          </div>
        `;

        marker.bindPopup(popupContent);

        // Attach popup button event
        marker.on('popupopen', () => {
          const btn = document.getElementById(`btn-popup-${kud.id}`);
          if (btn) {
            btn.onclick = () => {
              setSelectedKudDetail(kud);
            };
          }
        });

        markersLayer.addLayer(marker);
        bounds.extend([kud.latitude, kud.longitude]);
      }
    });

    // Auto zoom to fit if markers exist and no manual regional jump is selected
    if (filteredKudList.length > 0 && selectedRegionalJump === 'ALL' && bounds.isValid()) {
      map.fitBounds(bounds, { padding: [30, 30], maxZoom: 9 });
    }
  }, [filteredKudList, selectedRegionalJump, setSelectedKudDetail]);

  // Jump to specific Regional
  const jumpToRegional = (reg: string) => {
    setSelectedRegionalJump(reg);
    const map = mapInstanceRef.current;
    if (map && regionalCenters[reg]) {
      map.flyTo(regionalCenters[reg].center, regionalCenters[reg].zoom, {
        duration: 1.2
      });
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs relative flex flex-col">
      {/* Map Control Header Bar */}
      <div className="p-2.5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/90 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-6 rounded bg-emerald-600 text-white flex items-center justify-center">
            <Compass className="w-3.5 h-3.5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 uppercase tracking-tight">
              <span>Peta Spasial KUD PSR</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold">
                {filteredKudList.length} Titik
              </span>
            </h4>
          </div>
        </div>

        {/* Regional Quick Jump Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto py-0.5">
          {['ALL', 'Regional 1', 'Regional 2', 'Regional 3', 'Regional 4', 'Regional 5', 'Regional 6', 'Regional 7'].map((reg) => (
            <button
              key={reg}
              onClick={() => jumpToRegional(reg)}
              className={`text-[10px] px-2 py-0.5 rounded font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedRegionalJump === reg
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
              }`}
            >
              {reg === 'ALL' ? '🇮🇩 Nasional' : reg}
            </button>
          ))}
        </div>

        {/* Layer Selector */}
        <div className="flex items-center gap-0.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-0.5 rounded">
          <button
            onClick={() => setMapLayer('street')}
            className={`text-[10px] px-1.5 py-0.5 rounded font-medium transition-colors cursor-pointer ${
              mapLayer === 'street' ? 'bg-slate-100 dark:bg-slate-700 font-bold text-slate-900 dark:text-white' : 'text-slate-500'
            }`}
          >
            Peta Jalan
          </button>
          <button
            onClick={() => setMapLayer('satellite')}
            className={`text-[10px] px-1.5 py-0.5 rounded font-medium transition-colors cursor-pointer ${
              mapLayer === 'satellite' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-500'
            }`}
          >
            Satelit Kebun
          </button>
          <button
            onClick={() => setMapLayer('topo')}
            className={`text-[10px] px-1.5 py-0.5 rounded font-medium transition-colors cursor-pointer ${
              mapLayer === 'topo' ? 'bg-slate-100 dark:bg-slate-700 font-bold text-slate-900 dark:text-white' : 'text-slate-500'
            }`}
          >
            Topografi
          </button>
        </div>
      </div>

      {/* Map Container Element */}
      <div 
        ref={mapContainerRef} 
        className={`w-full ${heightClass} relative z-0`}
      />

      {/* Floating Map Legend */}
      <div className="absolute bottom-3 left-3 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-2 rounded-lg border border-slate-200 dark:border-slate-700 shadow-md text-[10px] space-y-1 max-w-xs pointer-events-auto">
        <div className="font-bold text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-0.5 flex items-center justify-between">
          <span>Legenda Model Kemitraan</span>
          <TreePine className="w-3 h-3 text-emerald-600" />
        </div>
        <div className="grid grid-cols-2 gap-x-2 gap-y-0.5">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
            <span className="text-slate-600 dark:text-slate-300">Single Mgmt</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-orange-600 shrink-0" />
            <span className="text-slate-600 dark:text-slate-300">Off-Taker TBS</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-sky-600 shrink-0" />
            <span className="text-slate-600 dark:text-slate-300">Full Off-taker</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-purple-600 shrink-0" />
            <span className="text-slate-600 dark:text-slate-300">Bibit & Agro</span>
          </div>
        </div>
      </div>
    </div>
  );
};
