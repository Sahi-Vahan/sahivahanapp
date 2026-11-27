import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { MapPin, Search, Navigation, Check, X, Building2, Loader2, Compass } from 'lucide-react';
import { Button } from './Button';

interface LocationMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLocation: (address: string, city?: string) => void;
  initialCity: string;
  initialAddress?: string;
}

interface CityCoordinates {
  lat: number;
  lng: number;
  hubs: { name: string; lat: number; lng: number }[];
}

const CITY_COORDINATES: Record<string, CityCoordinates> = {
  'Chandigarh': {
    lat: 30.7333,
    lng: 76.7794,
    hubs: [
      { name: 'Sector 28 Motor Market, Chandigarh', lat: 30.7165, lng: 76.7972 },
      { name: 'Industrial Area Phase 1, Chandigarh', lat: 30.7071, lng: 76.8043 },
      { name: 'Mohali Phase 7 Hub, Mohali', lat: 30.7118, lng: 76.7176 },
      { name: 'Sector 14 Motor Market, Panchkula', lat: 30.6934, lng: 76.8525 }
    ]
  },
  'Bengaluru': {
    lat: 12.9716,
    lng: 77.5946,
    hubs: [
      { name: 'Spinny Hub, Marathahalli, Bengaluru', lat: 12.9562, lng: 77.7019 },
      { name: 'Cars24 Hub, Koramangala, Bengaluru', lat: 12.9352, lng: 77.6245 },
      { name: 'Bosch Car Service, HSR Layout, Bengaluru', lat: 12.9121, lng: 77.6446 },
      { name: 'Whitefield Main Road Hub, Bengaluru', lat: 12.9698, lng: 77.7499 }
    ]
  },
  'Hyderabad': {
    lat: 17.3850,
    lng: 78.4867,
    hubs: [
      { name: 'Madhapur Auto Zone, Hitech City, Hyderabad', lat: 17.4483, lng: 78.3915 },
      { name: 'Kukatpally Y-Junction Dealerships, Hyderabad', lat: 17.4842, lng: 78.4138 },
      { name: 'Gachibowli Auto Hub, Hyderabad', lat: 17.4401, lng: 78.3489 },
      { name: 'Secunderabad MG Road Garage Area, Hyderabad', lat: 17.4447, lng: 78.4983 }
    ]
  },
  'Delhi NCR': {
    lat: 28.6139,
    lng: 77.2090,
    hubs: [
      { name: 'Sector 63 Car Hub, Noida, NCR', lat: 28.6256, lng: 77.3789 },
      { name: 'Golf Course Extension Hub, Gurugram, NCR', lat: 28.4190, lng: 77.0860 },
      { name: 'Okhla Industrial Area Phase 1, New Delhi', lat: 28.5355, lng: 77.2720 },
      { name: 'Subhash Nagar Auto Market, West Delhi', lat: 28.6415, lng: 77.1064 }
    ]
  },
  'Mumbai': {
    lat: 19.0760,
    lng: 72.8777,
    hubs: [
      { name: 'Kurla West Used Car Hub, Mumbai', lat: 19.0688, lng: 72.8797 },
      { name: 'Andheri East MIDC Garage Hub, Mumbai', lat: 19.1197, lng: 72.8764 },
      { name: 'Vashi Sector 17 Auto Hub, Navi Mumbai', lat: 19.0771, lng: 72.9986 },
      { name: 'Thane West Majiwada Hub, Thane', lat: 19.2183, lng: 72.9781 }
    ]
  },
  'Pune': {
    lat: 18.5204,
    lng: 73.8567,
    hubs: [
      { name: 'Wakad-Hinjawadi Auto Corridor, Pune', lat: 18.5987, lng: 73.7686 },
      { name: 'Hadapsar Magarpatta Hub, Pune', lat: 18.5089, lng: 73.9260 },
      { name: 'Swargate Motor Market, Pune', lat: 18.5018, lng: 73.8580 },
      { name: 'Viman Nagar Nagar Road Hub, Pune', lat: 18.5679, lng: 73.9143 }
    ]
  },
  'Chennai': {
    lat: 13.0827,
    lng: 80.2707,
    hubs: [
      { name: 'Guindy Industrial Estate Auto Zone, Chennai', lat: 13.0067, lng: 80.2025 },
      { name: 'Anna Nagar West Hub, Chennai', lat: 13.0850, lng: 80.1982 },
      { name: 'OMR Sholinganallur Tech Corridor, Chennai', lat: 12.9010, lng: 80.2279 },
      { name: 'Ambattur Industrial Estate Workshops, Chennai', lat: 13.1143, lng: 80.1548 }
    ]
  }
};

const customPinIcon = L.divIcon({
  className: 'custom-sahivahan-map-pin',
  html: `
    <div style="position: relative; transform: translate(-50%, -100%); cursor: grab;">
      <div style="background-color: #154D3F; color: white; width: 38px; height: 38px; border-radius: 50%; display: flex; items-center; justify-content: center; box-shadow: 0 4px 16px rgba(21, 77, 63, 0.45); border: 2.5px solid white;">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin: auto;">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      </div>
      <div style="width: 8px; height: 8px; background: #154D3F; transform: rotate(45deg); margin: -4px auto 0; border-right: 2px solid white; border-bottom: 2px solid white;"></div>
    </div>
  `,
  iconSize: [38, 44],
  iconAnchor: [19, 44]
});

export const LocationMapModal: React.FC<LocationMapModalProps> = ({
  isOpen,
  onClose,
  onSelectLocation,
  initialCity,
  initialAddress = ''
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAddress, setSelectedAddress] = useState(initialAddress);
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [isDetectingGps, setIsDetectingGps] = useState(false);

  // Normalize city key for lookup
  const cityKey = Object.keys(CITY_COORDINATES).find(c =>
    initialCity.toLowerCase().includes(c.toLowerCase())
  ) || 'Chandigarh';

  const cityData = CITY_COORDINATES[cityKey] || CITY_COORDINATES['Chandigarh'];

  // Reverse Geocoding helper using Nominatim with fallback
  const fetchAddressFromCoords = async (lat: number, lng: number) => {
    setIsGeocoding(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
        { headers: { 'Accept-Language': 'en' } }
      );
      if (response.ok) {
        const data = await response.json();
        const addr = data.address || {};
        
        // Assemble clean human-friendly address parts
        const road = addr.road || addr.suburb || addr.neighbourhood || addr.industrial || addr.commercial || '';
        const area = addr.suburb || addr.city_district || addr.county || '';
        const cityFound = addr.city || addr.town || addr.state_district || cityKey;
        const postcode = addr.postcode ? ` - ${addr.postcode}` : '';

        const parts = [road, area, cityFound].filter(Boolean);
        const resolved = parts.length > 0 ? `${parts.join(', ')}${postcode}` : data.display_name.split(',').slice(0, 3).join(',');
        
        setSelectedAddress(resolved);
        return resolved;
      }
    } catch {
      // Fallback if network blocked
      const fallback = `Near ${cityKey} (Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)})`;
      setSelectedAddress(fallback);
      return fallback;
    } finally {
      setIsGeocoding(false);
    }
  };

  // Initialize or re-center map when modal opens
  useEffect(() => {
    if (!isOpen) return;

    // Small delay to ensure modal DOM is mounted
    const timer = setTimeout(() => {
      if (!mapContainerRef.current) return;

      if (!mapInstanceRef.current) {
        const map = L.map(mapContainerRef.current, {
          center: [cityData.lat, cityData.lng],
          zoom: 13,
          zoomControl: false
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        L.control.zoom({ position: 'bottomright' }).addTo(map);

        const marker = L.marker([cityData.lat, cityData.lng], {
          icon: customPinIcon,
          draggable: true
        }).addTo(map);

        marker.on('dragend', () => {
          const pos = marker.getLatLng();
          fetchAddressFromCoords(pos.lat, pos.lng);
        });

        map.on('click', (e: L.LeafletMouseEvent) => {
          marker.setLatLng(e.latlng);
          fetchAddressFromCoords(e.latlng.lat, e.latlng.lng);
        });

        mapInstanceRef.current = map;
        markerRef.current = marker;

        if (!selectedAddress) {
          fetchAddressFromCoords(cityData.lat, cityData.lng);
        }
      } else {
        mapInstanceRef.current.invalidateSize();
        mapInstanceRef.current.setView([cityData.lat, cityData.lng], 13);
        if (markerRef.current) {
          markerRef.current.setLatLng([cityData.lat, cityData.lng]);
        }
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [isOpen, cityKey]);

  // Clean up map when component unmounts
  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Jump to quick hub
  const handleSelectHub = (hub: { name: string; lat: number; lng: number }) => {
    if (!mapInstanceRef.current || !markerRef.current) return;
    mapInstanceRef.current.setView([hub.lat, hub.lng], 15);
    markerRef.current.setLatLng([hub.lat, hub.lng]);
    setSelectedAddress(hub.name);
  };

  // Search places via Nominatim
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsGeocoding(true);
    try {
      const q = encodeURIComponent(`${searchQuery.trim()}, ${cityKey}, India`);
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${q}&limit=1`, {
        headers: { 'Accept-Language': 'en' }
      });
      if (res.ok) {
        const results = await res.json();
        if (results && results.length > 0) {
          const item = results[0];
          const lat = parseFloat(item.lat);
          const lng = parseFloat(item.lon);
          if (mapInstanceRef.current && markerRef.current) {
            mapInstanceRef.current.setView([lat, lng], 16);
            markerRef.current.setLatLng([lat, lng]);
            setSelectedAddress(item.display_name.split(',').slice(0, 3).join(','));
          }
        }
      }
    } finally {
      setIsGeocoding(false);
    }
  };

  // Device GPS
  const handleDetectDeviceGps = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    setIsDetectingGps(true);
    navigator.geolocation.getCurrentPosition(
      pos => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        if (mapInstanceRef.current && markerRef.current) {
          mapInstanceRef.current.setView([lat, lng], 16);
          markerRef.current.setLatLng([lat, lng]);
          fetchAddressFromCoords(lat, lng);
        }
        setIsDetectingGps(false);
      },
      err => {
        setIsDetectingGps(false);
        alert('Could not detect GPS location. Please check browser location permissions or choose on the map.');
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  };

  const handleConfirm = () => {
    if (selectedAddress.trim()) {
      onSelectLocation(selectedAddress.trim(), cityKey);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#154D3F] flex items-center justify-center">
              <Compass className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
                <span>Select Inspection Location on Map</span>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                  {cityKey}
                </span>
              </h3>
              <p className="text-xs text-slate-500">
                Tap anywhere on the map or drag the pin to set the exact vehicle inspection address.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar & GPS Button */}
        <div className="p-3 sm:px-5 sm:py-3 border-b border-slate-100 bg-white flex flex-col sm:flex-row items-center gap-2">
          <form onSubmit={handleSearch} className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder={`Search workshop, dealership or locality in ${cityKey}...`}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-20 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:border-[#154D3F] focus:ring-2 focus:ring-[#154D3F]/15 focus:outline-hidden"
            />
            <button
              type="submit"
              disabled={isGeocoding}
              className="absolute right-1.5 top-1 px-3 py-1 rounded-lg bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 text-xs font-bold transition-colors"
            >
              {isGeocoding ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Search'}
            </button>
          </form>

          <button
            type="button"
            onClick={handleDetectDeviceGps}
            disabled={isDetectingGps}
            className="w-full sm:w-auto px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-[#154D3F] border border-emerald-200/80 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shrink-0"
          >
            {isDetectingGps ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-700" />
                <span>Locating...</span>
              </>
            ) : (
              <>
                <Navigation className="w-3.5 h-3.5 text-emerald-700" />
                <span>Locate Me (GPS)</span>
              </>
            )}
          </button>
        </div>

        {/* Popular Hubs Quick Strip */}
        <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
          <span className="text-[10px] font-bold uppercase text-slate-400 shrink-0 flex items-center gap-1 mr-1">
            <Building2 className="w-3 h-3" /> Popular Hubs:
          </span>
          {cityData.hubs.map(hub => (
            <button
              key={hub.name}
              type="button"
              onClick={() => handleSelectHub(hub)}
              className="shrink-0 text-[11px] font-medium px-2.5 py-1 rounded-lg bg-white hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 border border-slate-200 transition-colors"
            >
              + {hub.name.split(',')[0]}
            </button>
          ))}
        </div>

        {/* Map Container */}
        <div className="relative flex-1 min-h-[320px] sm:min-h-[380px] bg-slate-100">
          <div ref={mapContainerRef} className="w-full h-full min-h-[320px] sm:min-h-[380px]" />

          {/* Floating Instruction Badge */}
          <div className="absolute top-3 left-3 z-[1000] pointer-events-none">
            <span className="px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-semibold shadow-md flex items-center gap-1.5 border border-white/10">
              <MapPin className="w-3 h-3 text-emerald-400" /> Drag pin or tap anywhere on map
            </span>
          </div>
        </div>

        {/* Modal Footer with Selected Address & Action */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/90 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
              <span>Pinned Inspection Location</span>
              {isGeocoding && <Loader2 className="w-3 h-3 animate-spin text-emerald-600" />}
            </div>
            <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">
              {selectedAddress || 'Drop a pin on the map to set address...'}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              className="w-full sm:w-auto text-xs"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleConfirm}
              disabled={!selectedAddress.trim()}
              icon={<Check className="w-4 h-4" />}
              className="w-full sm:w-auto text-xs font-bold"
            >
              Set This Location &rarr;
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

