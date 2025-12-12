'use client';

import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/images/marker-icon-2x.png',
  iconUrl: '/leaflet/images/marker-icon.png',
  shadowUrl: '/leaflet/images/marker-shadow.png',
});

// Map style options
const MAP_STYLES = {
  standard: {
    name: 'Standard',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '© OpenStreetMap contributors'
  },
  dark: {
    name: 'Dark',
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution: '© OpenStreetMap, © CartoDB'
  },
  light: {
    name: 'Light',
    url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    attribution: '© OpenStreetMap, © CartoDB'
  },
  terrain: {
    name: 'Terrain',
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution: '© OpenStreetMap contributors, SRTM'
  },
  satellite: {
    name: 'Satellite',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: '© Esri'
  }
};

// Custom icons
const customIcons = {
  blue: new L.Icon({
    iconUrl: 'data:image/svg+xml;base64,' + btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
        <circle cx="16" cy="16" r="14" fill="#3B82F6" stroke="white" stroke-width="3"/>
        <circle cx="16" cy="12" r="4" fill="white"/>
        <path d="M16 20 L10 28 L22 28 Z" fill="white"/>
      </svg>
    `),
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  }),
  red: new L.Icon({
    iconUrl: 'data:image/svg+xml;base64,' + btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
        <circle cx="16" cy="16" r="14" fill="#EF4444" stroke="white" stroke-width="3"/>
        <circle cx="16" cy="12" r="4" fill="white"/>
        <path d="M16 20 L10 28 L22 28 Z" fill="white"/>
      </svg>
    `),
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  }),
  green: new L.Icon({
    iconUrl: 'data:image/svg+xml;base64,' + btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
        <circle cx="16" cy="16" r="14" fill="#10B981" stroke="white" stroke-width="3"/>
        <circle cx="16" cy="12" r="4" fill="white"/>
        <path d="M16 20 L10 28 L22 28 Z" fill="white"/>
      </svg>
    `),
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  }),
  purple: new L.Icon({
    iconUrl: 'data:image/svg+xml;base64,' + btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
        <circle cx="16" cy="16" r="14" fill="#8B5CF6" stroke="white" stroke-width="3"/>
        <circle cx="16" cy="12" r="4" fill="white"/>
        <path d="M16 20 L10 28 L22 28 Z" fill="white"/>
      </svg>
    `),
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  })
};

interface ReactLeafletMapProps {
  lat: number;
  lng: number;
  name: string;
  height?: string;
  zoom?: number;
  showControls?: boolean;
  defaultStyle?: keyof typeof MAP_STYLES;
  defaultIcon?: keyof typeof customIcons;
}

export default function ReactLeafletMap({ 
  lat, 
  lng, 
  name, 
  height = '500px',
  zoom = 12,
  showControls = true,
  defaultStyle = 'standard',
  defaultIcon = 'blue'
}: ReactLeafletMapProps) {
  const [mapStyle, setMapStyle] = useState<keyof typeof MAP_STYLES>(defaultStyle);
  const [map, setMap] = useState<L.Map | null>(null);
  const [currentIcon, setCurrentIcon] = useState<keyof typeof customIcons>(defaultIcon);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Update map view when coordinates change
  useEffect(() => {
    if (map) {
      map.setView([lat, lng], zoom);
    }
  }, [lat, lng, zoom, map]);

  if (!isMounted) {
    return (
      <div 
        style={{ height }} 
        className="w-full rounded-lg border border-gray-300 bg-gray-200 animate-pulse flex items-center justify-center"
      >
        <p className="text-gray-500">Loading map...</p>
      </div>
    );
  }


  return (
    <div className="relative" style={{ height }}>
      <div className="w-full h-full rounded-lg border border-gray-300 overflow-hidden">
        <MapContainer
          center={[lat, lng]}
          zoom={zoom}
          className="h-full w-full"
          scrollWheelZoom={true}
          ref={setMap}
        >
          <TileLayer
            attribution={MAP_STYLES[mapStyle].attribution}
            url={MAP_STYLES[mapStyle].url}
          />
          <Marker position={[lat, lng]} icon={customIcons[currentIcon]}>
            <Popup>
              <div className="p-2 min-w-[200px]">
                <h3 className="font-bold text-gray-900 text-lg mb-1">{name}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  📍 {lat.toFixed(6)}, {lng.toFixed(6)}
                </p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => window.open(`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=14/${lat}/${lng}`, '_blank')}
                    className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200"
                  >
                    Open in OSM
                  </button>
                  <button
                    onClick={() => window.open(`https://maps.google.com/?q=${lat},${lng}`, '_blank')}
                    className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200"
                  >
                    Open in Google
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
          <Circle
            center={[lat, lng]}
            pathOptions={{ 
              color: currentIcon === 'blue' ? '#3B82F6' : 
                     currentIcon === 'red' ? '#EF4444' : 
                     currentIcon === 'green' ? '#10B981' : '#8B5CF6',
              fillColor: currentIcon === 'blue' ? '#93C5FD' : 
                         currentIcon === 'red' ? '#FCA5A5' : 
                         currentIcon === 'green' ? '#A7F3D0' : '#DDD6FE',
              fillOpacity: 0.2 
            }}
            radius={300}
          />
        </MapContainer>
      </div>

      {/* Map Style Controls */}
      {showControls && (
        <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
          {/* Style Selector Dropdown */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <select
              value={mapStyle}
              onChange={(e) => setMapStyle(e.target.value as keyof typeof MAP_STYLES)}
              className="w-full p-2 text-sm border-none focus:ring-0"
            >
              {Object.entries(MAP_STYLES).map(([key, style]) => (
                <option key={key} value={key}>
                  {style.name} Map
                </option>
              ))}
            </select>
          </div>

          {/* Icon Color Selector */}
          <div className="bg-white rounded-lg shadow-lg p-2 hidden md:inline-block">
            <p className="text-xs text-gray-600 mb-1">Marker Color</p>
            <div className="flex gap-1">
              {Object.entries(customIcons).map(([key, icon]) => (
                <button
                  key={key}
                  onClick={() => setCurrentIcon(key as keyof typeof customIcons)}
                  className={`w-6 h-6 rounded-full ${
                    currentIcon === key ? 'ring-2 ring-offset-1 ring-gray-400' : ''
                  }`}
                  style={{
                    backgroundColor: 
                      key === 'blue' ? '#3B82F6' :
                      key === 'red' ? '#EF4444' :
                      key === 'green' ? '#10B981' : '#8B5CF6'
                  }}
                  title={key.charAt(0).toUpperCase() + key.slice(1)}
                />
              ))}
            </div>
          </div>

          {/* Map Controls */}
          <div className="bg-white rounded-lg shadow-lg p-2 hidden md:inline-block">
            <div className="flex gap-1">
              <button
                onClick={() => map?.zoomIn()}
                className="p-2 hover:bg-gray-100 rounded"
                title="Zoom In"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
              <button
                onClick={() => map?.zoomOut()}
                className="p-2 hover:bg-gray-100 rounded"
                title="Zoom Out"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              <button
                onClick={() => map?.setView([lat, lng], zoom)}
                className="p-2 hover:bg-gray-100 rounded"
                title="Reset View"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                </svg>
              </button>
              <button
                onClick={() => {
                  if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition((position) => {
                      map?.setView([position.coords.latitude, position.coords.longitude], 15);
                    });
                  }
                }}
                className="p-2 hover:bg-gray-100 rounded"
                title="My Location"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Coordinates Display */}
      <div className="absolute bottom-4 left-4 z-[1000]">
        <div className="bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg">
          <p className="text-sm text-gray-600 font-medium">{name}</p>
          <div className="flex items-center gap-2 mt-1">
            <code className="text-xs bg-gray-100 px-2 py-1 rounded">
              {lat.toFixed(6)}, {lng.toFixed(6)}
            </code>
            <button
              onClick={() => navigator.clipboard.writeText(`${lat}, ${lng}`)}
              className="text-xs text-blue-600 hover:text-blue-800"
              title="Copy coordinates"
            >
              📋
            </button>
          </div>
        </div>
      </div>
    
    </div>
  );
}