import React, { useState, useRef, useEffect } from 'react';
import { Award, Check, ChevronDown, Plus, Search, X } from 'lucide-react';

export const DEFAULT_CERTIFICATIONS = [
  'ASDC Level 4 Master Tech',
  'Bosch Certified Diagnostic Specialist',
  'Automotive Service Excellence (ASE)',
  'ARAI / ICAT Certified Inspector',
  'OEM Multi-Brand Diagnostic Lead',
  'Two-Wheeler Dynamics & Chassis Certified',
  'OBD-II & CAN-Bus Diagnostic Specialist',
  'Ultrasonic Paint & Frame Damage Auditor',
  'High-Voltage Electric & Hybrid Safety Trained'
];

interface InspectorCertMultiSelectProps {
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
}

export const InspectorCertMultiSelect: React.FC<InspectorCertMultiSelectProps> = ({
  selected = [],
  onChange,
  placeholder = 'Select certifications...'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleCert = (cert: string) => {
    if (selected.includes(cert)) {
      onChange(selected.filter(c => c !== cert));
    } else {
      onChange([...selected, cert]);
    }
  };

  const removeCert = (cert: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(selected.filter(c => c !== cert));
  };

  const handleAddCustom = () => {
    const trimmed = search.trim();
    if (trimmed && !selected.includes(trimmed)) {
      onChange([...selected, trimmed]);
      setSearch('');
    }
  };

  // Filter options based on search query
  const filteredOptions = DEFAULT_CERTIFICATIONS.filter(cert =>
    cert.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Trigger Area with Selected Chips */}
      <div
        onClick={() => setIsOpen(prev => !prev)}
        className="min-h-[36px] w-full p-1.5 pr-8 bg-white rounded-xl border border-slate-300 focus-within:ring-2 focus-within:ring-[#154D3F] focus-within:border-[#154D3F] transition-all cursor-pointer flex flex-wrap items-center gap-1.5"
      >
        {selected.length === 0 ? (
          <span className="text-slate-400 text-xs px-2 select-none flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-slate-300" />
            <span>{placeholder}</span>
          </span>
        ) : (
          selected.map(cert => (
            <span
              key={cert}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-emerald-50 text-[#154D3F] border border-emerald-200/80 text-[11px] font-semibold"
            >
              <span>{cert}</span>
              <button
                type="button"
                onClick={e => removeCert(cert, e)}
                className="w-3.5 h-3.5 rounded-full hover:bg-emerald-200 text-[#154D3F] flex items-center justify-center transition-colors"
                title="Remove"
              >
                <X className="w-2.5 h-2.5" />
              </button>
            </span>
          ))
        )}

        <div className="absolute right-2.5 top-2.5 text-slate-400 pointer-events-none">
          <ChevronDown className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-40 left-0 right-0 mt-1 bg-white rounded-2xl border border-slate-200 shadow-xl max-h-64 overflow-y-auto divide-y divide-slate-100 text-xs">
          {/* Search box inside dropdown */}
          <div className="p-2 bg-slate-50 sticky top-0 z-10 border-b border-slate-100" onClick={e => e.stopPropagation()}>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search certifications..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddCustom();
                  }
                }}
                className="w-full pl-8 pr-16 py-1.5 rounded-lg border border-slate-200 bg-white text-xs focus:outline-hidden focus:ring-1 focus:ring-[#154D3F]"
              />
              {search.trim() && !DEFAULT_CERTIFICATIONS.includes(search.trim()) && (
                <button
                  type="button"
                  onClick={handleAddCustom}
                  className="absolute right-1 top-1 px-2 py-0.5 rounded bg-[#154D3F] text-white text-[10px] font-bold"
                >
                  + Add
                </button>
              )}
            </div>
          </div>

          {/* Options List */}
          <div className="p-1 space-y-0.5">
            {filteredOptions.length === 0 ? (
              <div className="p-3 text-center text-slate-400">
                <span>No preset match. Click "+ Add" above to add "{search}".</span>
              </div>
            ) : (
              filteredOptions.map(cert => {
                const isChecked = selected.includes(cert);
                return (
                  <button
                    type="button"
                    key={cert}
                    onClick={() => toggleCert(cert)}
                    className={`w-full px-2.5 py-1.5 rounded-lg text-left text-xs transition-colors flex items-center justify-between gap-2 ${
                      isChecked
                        ? 'bg-emerald-50 text-[#154D3F] font-bold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{cert}</span>
                    <div
                      className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 text-[10px] font-bold ${
                        isChecked
                          ? 'bg-[#154D3F] text-white'
                          : 'border border-slate-300'
                      }`}
                    >
                      {isChecked && <Check className="w-3 h-3 text-white" />}
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};
