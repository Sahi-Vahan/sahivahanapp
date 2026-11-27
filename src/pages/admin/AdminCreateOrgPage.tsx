import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Building2,
  ArrowLeft,
  Clock,
  MapPin,
  Car,
  Bike,
  ShieldCheck,
  FileText,
  Mail,
  Phone,
  User,
  Briefcase,
  Check,
  Plus,
  Wrench,
  ChevronDown,
  Search,
  X,
  Trash2,
  Users,
  Award
} from 'lucide-react';
import { useAppData } from '../../context/AppDataContext';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { InspectorCertMultiSelect } from '../../components/common/InspectorCertMultiSelect';
import { VehicleType, OrgStatus, InspectorMember } from '../../types';

// Comprehensive catalog of vehicle pre-purchase inspection & diagnostic equipment
interface EquipmentItem {
  id: string;
  name: string;
  category: 'OBD & Electronics' | 'Body & Paint' | 'Engine & Mechanical' | 'Wheels & Brakes' | 'Battery & Electrical' | 'Motorcycle Specific' | 'Certifications';
  description: string;
}

const EQUIPMENT_CATALOG: EquipmentItem[] = [
  // 1. Electronic Scanners & OBD
  {
    id: 'launch-obd',
    name: 'Launch X431 Pro OBD-II Diagnostic Scanner',
    category: 'OBD & Electronics',
    description: 'ECU multi-system fault codes, live data sensors, ABS, Airbag, ECM, TCM diagnostics'
  },
  {
    id: 'autel-maxisys',
    name: 'Autel MaxiSys Diagnostic System',
    category: 'OBD & Electronics',
    description: 'Bi-directional active tests, actuation tests and live component streaming'
  },
  {
    id: 'dtc-freeze-frame',
    name: 'I/M Readiness & Freeze-Frame DTC Analyzer',
    category: 'OBD & Electronics',
    description: 'Detects recently cleared check engine DTCs, tamper codes & emission readiness'
  },
  {
    id: 'motorcycle-obd-harness',
    name: 'Motorcycle OBD Adapter Harness Kit (Euro 5 / 4-Pin / 6-Pin)',
    category: 'OBD & Electronics',
    description: 'Diagnostic harness for Yamaha, Honda, Royal Enfield, Bajaj, KTM, TVS bikes'
  },
  {
    id: 'digital-multimeter',
    name: 'Automotive Digital Multimeter & Parasitic Draw Clamp',
    category: 'OBD & Electronics',
    description: 'Battery parasitic drain testing, alternator ripple & sensor voltage check'
  },

  // 2. Body, Paint & Structural Inspection
  {
    id: 'paint-gauge',
    name: 'Ultrasonic Paint Coating / Thickness Gauge (Fe & NFe)',
    category: 'Body & Paint',
    description: 'Micron-level paint depth gauge to detect body filler, putty & repainted panels'
  },
  {
    id: 'borescope',
    name: 'Articulated Digital Borescope Inspection Camera',
    category: 'Body & Paint',
    description: 'HD snake probe for cylinder walls, chassis rails, frame internals & cavities'
  },
  {
    id: 'chassis-apron-gauge',
    name: 'Chassis & Apron Deformation Measurement Gauge',
    category: 'Body & Paint',
    description: 'Verifies structural straightness, apron symmetry and major accident repair'
  },
  {
    id: 'inspection-mirror',
    name: 'Telescopic LED Inspection Mirror & Underbody Light',
    category: 'Body & Paint',
    description: 'Underbody chassis, fuel line, brake line & suspension mount visual check'
  },
  {
    id: 'thermal-camera',
    name: 'Infrared Thermal Imaging Camera (FLIR)',
    category: 'Body & Paint',
    description: 'Detects AC evaporator blockage, radiator hot spots & exhaust micro leaks'
  },

  // 3. Engine, Mechanical & Fluids
  {
    id: 'compression-tester',
    name: 'Engine Cylinder Compression & Leakdown Tester Kit',
    category: 'Engine & Mechanical',
    description: 'Measures compression to identify worn piston rings, burnt valves & gasket leaks'
  },
  {
    id: 'mechanic-stethoscope',
    name: 'Mechanic Electronic Stethoscope & Sound Probe',
    category: 'Engine & Mechanical',
    description: 'Acoustic detection of piston slap, valvetrain ticking & bearing whine'
  },
  {
    id: 'brake-fluid-tester',
    name: 'Digital Brake Fluid Moisture & Boiling Point Tester',
    category: 'Engine & Mechanical',
    description: 'Measures moisture contamination percentage in DOT3, DOT4 and DOT5.1 fluids'
  },
  {
    id: 'coolant-refractometer',
    name: 'Coolant & Battery Acid Optical Refractometer',
    category: 'Engine & Mechanical',
    description: 'Precision optical measurement of glycol concentration & freeze protection'
  },
  {
    id: 'radiator-pressure-kit',
    name: 'Cooling System Radiator Cap & Pressure Tester',
    category: 'Engine & Mechanical',
    description: 'Pressurizes cooling loop to detect micro leaks in hoses, heater core & water pump'
  },
  {
    id: 'smoke-leak-detector',
    name: 'EVAP & Vacuum Smoke Leak Detector Machine',
    category: 'Engine & Mechanical',
    description: 'Traces vacuum leaks, intake manifold leaks & EVAP canister fault codes'
  },

  // 4. Wheels, Suspension & Underbody
  {
    id: 'tyre-tread-gauge',
    name: 'Digital Tyre Tread Depth Gauge & DOT Date Reader',
    category: 'Wheels & Brakes',
    description: 'Measures tyre wear in mm and verifies DOT manufacture date compliance'
  },
  {
    id: 'brake-micrometer',
    name: 'Brake Disc Rotor Thickness Micrometer & Caliper',
    category: 'Wheels & Brakes',
    description: 'Measures rotor lip wear, runout and minimum safety thickness against OEM spec'
  },
  {
    id: 'suspension-play-bar',
    name: 'Chassis & Suspension Bushing Play Detector Bar',
    category: 'Wheels & Brakes',
    description: 'Tests ball joints, tie-rod ends, control arm bushings & steering rack play'
  },
  {
    id: 'hydraulic-jack',
    name: 'Low-Profile Hydraulic Trolley Jack & 3-Ton Safety Stands',
    category: 'Wheels & Brakes',
    description: 'Safe vehicle lifting for comprehensive 360-degree undercarriage inspection'
  },
  {
    id: 'torque-wrench',
    name: 'Calibrated Digital Click Torque Wrench (10-210 Nm)',
    category: 'Wheels & Brakes',
    description: 'Lug nut and suspension bolt torque verification'
  },

  // 5. Battery & Electrical
  {
    id: 'battery-cca-tester',
    name: 'Digital Battery Conductance & Cold Cranking Amps (CCA) Analyzer',
    category: 'Battery & Electrical',
    description: 'Tests 12V lead-acid, AGM, GEL battery health, state of charge (SoC) & cranking load'
  },
  {
    id: 'alternator-analyzer',
    name: 'Alternator Ripple & Stator Charging Health Tester',
    category: 'Battery & Electrical',
    description: 'Monitors charging system voltage stability under full vehicle electrical load'
  },

  // 6. Motorcycle & Two-Wheeler Specific
  {
    id: 'bike-chain-tool',
    name: 'Motorcycle Drive Chain Slack & Sprocket Wear Gauge',
    category: 'Motorcycle Specific',
    description: 'Checks chain pitch elongation, sprocket tooth hooking & chain tension safety'
  },
  {
    id: 'bike-fork-alignment',
    name: 'Front Fork Stanchion & Frame Laser Alignment Tool',
    category: 'Motorcycle Specific',
    description: 'Detects bend or twist in front fork stanchions, triple tree clamps & frame rake'
  },
  {
    id: 'bike-battery-tester',
    name: 'Compact Motorcycle 12V VRLA Battery & Stator Tester',
    category: 'Motorcycle Specific',
    description: 'Specialized for low-capacity two-wheeler motorcycle and scooter batteries'
  },

  // 7. Accreditations & Certifications
  {
    id: 'asdc-certified',
    name: 'ASDC Certified Automotive Diagnostic Master Technician',
    category: 'Certifications',
    description: 'Automotive Skills Development Council certified personnel on staff'
  },
  {
    id: 'bosch-certified',
    name: 'Bosch Certified Diagnostic Service Technician',
    category: 'Certifications',
    description: 'Factory-grade diagnostic and vehicle systems training credential'
  },
  {
    id: 'arai-trained',
    name: 'ARAI / ICAT Inspection & Emission Testing Trained',
    category: 'Certifications',
    description: 'Certified in vehicle roadworthiness and fitness inspection guidelines'
  },
  {
    id: 'multi-tech-fleet',
    name: '5+ Qualified Field Inspection Technicians on Duty',
    category: 'Certifications',
    description: 'Full-time field technician capacity for fast multi-city lead fulfillment'
  }
];

export const AdminCreateOrgPage: React.FC = () => {
  const navigate = useNavigate();
  const { addOrganization } = useAppData();

  const [name, setName] = useState('');
  const [gstin, setGstin] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [designation, setDesignation] = useState('Operations Manager');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [slaHours, setSlaHours] = useState<number>(4);
  const [status, setStatus] = useState<OrgStatus>('active');
  const [notes, setNotes] = useState('');

  // Selected cities
  const availableCities = ['Bengaluru', 'Hyderabad', 'Delhi NCR', 'Mumbai', 'Pune', 'Chennai', 'Chandigarh'];
  const [selectedCities, setSelectedCities] = useState<string[]>(['Bengaluru']);

  // Selected vehicle types (Cars & Bikes only)
  const [vehicleTypes, setVehicleTypes] = useState<VehicleType[]>(['car', 'bike']);

  // Equipment multi-select state
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([
    'Launch X431 Pro OBD-II Diagnostic Scanner',
    'Ultrasonic Paint Coating / Thickness Gauge (Fe & NFe)',
    'Digital Battery Conductance & Cold Cranking Amps (CCA) Analyzer'
  ]);
  const [equipmentSearch, setEquipmentSearch] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Field Inspectors / Technicians state (Optional)
  const [inspectors, setInspectors] = useState<InspectorMember[]>([]);
  const [inspectorToDelete, setInspectorToDelete] = useState<InspectorMember | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Close equipment dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleCity = (city: string) => {
    setSelectedCities(prev =>
      prev.includes(city) ? prev.filter(c => c !== city) : [...prev, city]
    );
  };

  const toggleVehicleType = (type: VehicleType) => {
    setVehicleTypes(prev => {
      if (prev.includes(type)) {
        if (prev.length === 1) return prev; // Keep at least one
        return prev.filter(t => t !== type);
      }
      return [...prev, type];
    });
  };

  // Equipment handlers
  const toggleEquipment = (equipmentName: string) => {
    setSelectedEquipment(prev =>
      prev.includes(equipmentName)
        ? prev.filter(item => item !== equipmentName)
        : [...prev, equipmentName]
    );
  };

  const removeEquipment = (equipmentName: string) => {
    setSelectedEquipment(prev => prev.filter(item => item !== equipmentName));
  };

  const addCustomEquipment = () => {
    const trimmed = equipmentSearch.trim();
    if (trimmed && !selectedEquipment.includes(trimmed)) {
      setSelectedEquipment(prev => [...prev, trimmed]);
      setEquipmentSearch('');
    }
  };

  const addStandardKit = () => {
    const standardKit = [
      'Launch X431 Pro OBD-II Diagnostic Scanner',
      'Ultrasonic Paint Coating / Thickness Gauge (Fe & NFe)',
      'Digital Battery Conductance & Cold Cranking Amps (CCA) Analyzer',
      'Articulated Digital Borescope Inspection Camera',
      'Digital Tyre Tread Depth Gauge & DOT Date Reader',
      'Digital Brake Fluid Moisture & Boiling Point Tester'
    ];
    setSelectedEquipment(prev => Array.from(new Set([...prev, ...standardKit])));
  };

  // Field Inspector handlers
  const handleAddInspector = () => {
    const newInspector: InspectorMember = {
      id: `INS-${Date.now()}`,
      name: '',
      phone: '',
      role: 'Vehicle Diagnostic Technician',
      specialization: 'all',
      experienceYears: 3,
      certification: 'ASDC Level 4 Master Tech',
      certifications: ['ASDC Level 4 Master Tech']
    };
    setInspectors(prev => [...prev, newInspector]);
  };

  const handleUpdateInspector = (id: string, field: keyof InspectorMember, value: any) => {
    setInspectors(prev =>
      prev.map(ins => (ins.id === id ? { ...ins, [field]: value } : ins))
    );
  };

  const handleRemoveInspector = (id: string) => {
    const target = inspectors.find(ins => ins.id === id);
    if (target) {
      setInspectorToDelete(target);
    }
  };

  const handleConfirmRemoveInspector = () => {
    if (!inspectorToDelete) return;
    setInspectors(prev => prev.filter(ins => ins.id !== inspectorToDelete.id));
    setInspectorToDelete(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || selectedCities.length === 0 || vehicleTypes.length === 0) {
      alert('Please fill all required fields and select at least one city and vehicle category.');
      return;
    }

    setIsSubmitting(true);
    try {
      await addOrganization({
        name: name.trim(),
        gstin: gstin.toUpperCase().trim(),
        contactPerson: contactPerson.trim(),
        designation: designation.trim(),
        email: email.trim(),
        phone: phone.trim(),
        cities: selectedCities,
        vehicleTypes,
        slaHours: Number(slaHours),
        status,
        equipment: selectedEquipment,
        inspectors: inspectors.filter(ins => ins.name.trim().length > 0),
        notes: notes.trim()
      });

      navigate('/admin/organizations');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filtered equipment list
  const filteredEquipment = EQUIPMENT_CATALOG.filter(item =>
    item.name.toLowerCase().includes(equipmentSearch.toLowerCase()) ||
    item.category.toLowerCase().includes(equipmentSearch.toLowerCase()) ||
    item.description.toLowerCase().includes(equipmentSearch.toLowerCase())
  );

  return (
    <div className="w-full space-y-5 pb-8">
      {/* Top Navigation & Breadcrumb */}
      <div className="space-y-2">
        <Link
          to="/admin/organizations"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#154D3F] transition-colors py-0.5 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Partner Directory</span>
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#154D3F] text-[10px] font-extrabold uppercase tracking-wider">
                Partner Onboarding
              </span>
              <span className="text-xs text-slate-400">• New Organization Profile</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Onboard Partner Organization
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Register a regional diagnostic company to receive vehicle inspection leads in their coverage hubs.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            <Link to="/admin/organizations">
              <Button variant="outline" size="sm" type="button">
                Cancel
              </Button>
            </Link>
            <Button
              type="button"
              variant="primary"
              size="sm"
              isLoading={isSubmitting}
              onClick={handleSubmit}
              className="font-bold shadow-xs"
              icon={<ShieldCheck className="w-4 h-4" />}
            >
              Onboard Partner Organization &rarr;
            </Button>
          </div>
        </div>
      </div>

      {/* Main Full-Width Form Layout */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Card 1: Consolidated Company & Operations Contact */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#154D3F] flex items-center justify-center shrink-0 font-bold">
                <Building2 className="w-4 h-4 text-[#154D3F]" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900">1. Organization & Contact Details</h2>
                <p className="text-xs text-slate-500">Legal registration, primary dispatch liaison, initial status and turnaround SLA</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Organization Name */}
            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                Organization Full Name *
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  placeholder="e.g. SpeedSafe Automotive Diagnostics LLP"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#154D3F] focus:border-[#154D3F] text-xs transition-all"
                />
              </div>
            </div>

            {/* GSTIN */}
            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                GSTIN / Trade License *
              </label>
              <div className="relative">
                <FileText className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  placeholder="e.g. 29AAAAA0000A1Z5"
                  value={gstin}
                  onChange={e => setGstin(e.target.value.toUpperCase())}
                  className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#154D3F] focus:border-[#154D3F] text-xs uppercase font-mono transition-all"
                />
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                Initial Status
              </label>
              <div className="relative">
                <ShieldCheck className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                <select
                  value={status}
                  onChange={e => setStatus(e.target.value as OrgStatus)}
                  className="w-full appearance-none pl-9 pr-9 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#154D3F] text-xs bg-white font-semibold transition-all"
                >
                  <option value="active">Active (Ready to Receive Leads)</option>
                  <option value="pending_verification">Pending Verification</option>
                  <option value="inactive">Inactive / On Hold</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5 text-slate-400">
                  <ChevronDown className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* SLA Response Time */}
            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                SLA Response Time Commitment *
              </label>
              <div className="relative">
                <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                <select
                  value={slaHours}
                  onChange={e => setSlaHours(Number(e.target.value))}
                  className="w-full appearance-none pl-9 pr-9 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#154D3F] text-xs bg-white font-semibold transition-all"
                >
                  <option value={2}>2 Hours (Fast Priority Dispatch)</option>
                  <option value={4}>4 Hours (Standard Same-Day)</option>
                  <option value={6}>6 Hours (Next-Day Flexibility)</option>
                  <option value={12}>12 Hours (Next-Day SLA)</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5 text-slate-400">
                  <ChevronDown className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Contact Person Name */}
            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                Contact Person Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kulkarni"
                  value={contactPerson}
                  onChange={e => setContactPerson(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#154D3F] focus:border-[#154D3F] text-xs transition-all"
                />
              </div>
            </div>

            {/* Role */}
            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                Designation / Role
              </label>
              <div className="relative">
                <Briefcase className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="e.g. Operations Manager"
                  value={designation}
                  onChange={e => setDesignation(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#154D3F] focus:border-[#154D3F] text-xs transition-all"
                />
              </div>
            </div>

            {/* Dispatch Email */}
            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                Dispatch Email *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  required
                  placeholder="dispatch@speedsafe.in"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#154D3F] focus:border-[#154D3F] text-xs transition-all"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                Phone / WhatsApp Number *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="tel"
                  required
                  placeholder="+91 98450 00000"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#154D3F] focus:border-[#154D3F] text-xs transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Regional Hubs, Scope & Searchable Equipment Dropdown */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-xs space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#154D3F] flex items-center justify-center shrink-0 font-bold">
              <MapPin className="w-4 h-4 text-[#154D3F]" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">2. Regional Hubs, Vehicle Scope & Diagnostic Equipment</h2>
              <p className="text-xs text-slate-500">Service locations, audit categories, and certified diagnostic instruments</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* Operational Hubs (7 cols on lg) */}
            <div className="lg:col-span-7 space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-[11px] font-bold uppercase text-slate-700">
                  Operational Cities / Hubs * ({selectedCities.length} Selected)
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedCities([...availableCities])}
                    className="text-[11px] font-bold text-[#154D3F] hover:underline"
                  >
                    Select All
                  </button>
                  <span className="text-slate-300">•</span>
                  <button
                    type="button"
                    onClick={() => setSelectedCities(['Bengaluru'])}
                    className="text-[11px] font-bold text-slate-400 hover:text-slate-600"
                  >
                    Reset
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {availableCities.map(city => {
                  const isSelected = selectedCities.includes(city);
                  return (
                    <button
                      type="button"
                      key={city}
                      onClick={() => toggleCity(city)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all inline-flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-[#154D3F] text-white border-[#154D3F] shadow-xs'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {isSelected ? (
                        <Check className="w-3.5 h-3.5 text-emerald-300" />
                      ) : (
                        <Plus className="w-3.5 h-3.5 text-slate-400" />
                      )}
                      <span>{city}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Vehicle Categories Covered (5 cols on lg) */}
            <div className="lg:col-span-5 space-y-2">
              <label className="block text-[11px] font-bold uppercase text-slate-700">
                Vehicle Categories Covered *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  {
                    type: 'car' as VehicleType,
                    label: 'Used Cars (4-Wheelers)',
                    sub: 'OBD-II, paint gauge & multi-system audit',
                    icon: <Car className="w-4 h-4" />
                  },
                  {
                    type: 'bike' as VehicleType,
                    label: 'Motorcycles & Bikes (2-Wheelers)',
                    sub: 'Chassis alignment, compression & brake safety test',
                    icon: <Bike className="w-4 h-4" />
                  }
                ].map(item => {
                  const isChecked = vehicleTypes.includes(item.type);
                  return (
                    <button
                      type="button"
                      key={item.type}
                      onClick={() => toggleVehicleType(item.type)}
                      className={`p-3 rounded-2xl border text-left transition-all relative flex items-start gap-2.5 ${
                        isChecked
                          ? 'bg-emerald-50/50 border-[#154D3F] ring-1 ring-[#154D3F]/20'
                          : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-500'
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                        isChecked ? 'bg-[#154D3F] text-white' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {item.icon}
                      </div>
                      <div className="flex-1 pr-4">
                        <span className={`font-bold text-xs block ${isChecked ? 'text-slate-900' : 'text-slate-600'}`}>
                          {item.label}
                        </span>
                        <span className="text-[11px] text-slate-400 block mt-0.5 leading-tight">
                          {item.sub}
                        </span>
                      </div>
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center absolute right-2.5 top-3 text-[10px] font-bold ${
                        isChecked ? 'bg-[#154D3F] text-white' : 'border border-slate-300'
                      }`}>
                        {isChecked && '✓'}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* SEARCHABLE MULTI-SELECT EQUIPMENT WITH CHIPS */}
          <div className="space-y-3 pt-3 border-t border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-700">
                  Diagnostic Equipment & Forensic Tools ({selectedEquipment.length} Selected)
                </label>
                <p className="text-[11px] text-slate-500">
                  Search and pick instruments calibrated by this organization. Selected tools appear as chips.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={addStandardKit}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#154D3F] hover:underline bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/60"
                >
                  <Award className="w-3 h-3 text-[#154D3F]" />
                  <span>+ Add Standard PPI Kit (Top 6)</span>
                </button>
                {selectedEquipment.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setSelectedEquipment([])}
                    className="text-[11px] font-bold text-slate-400 hover:text-red-600 transition-colors"
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>

            {/* Selected Equipment Chips */}
            {selectedEquipment.length > 0 ? (
              <div className="flex flex-wrap gap-1.5 p-2.5 bg-slate-50/80 rounded-2xl border border-slate-200/80 min-h-[46px]">
                {selectedEquipment.map(eq => (
                  <span
                    key={eq}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-100/90 text-[#154D3F] border border-emerald-300/70 text-xs font-semibold shadow-2xs group"
                  >
                    <Wrench className="w-3 h-3 text-[#154D3F] shrink-0" />
                    <span>{eq}</span>
                    <button
                      type="button"
                      onClick={() => removeEquipment(eq)}
                      className="w-3.5 h-3.5 rounded-full hover:bg-emerald-200 text-[#154D3F] flex items-center justify-center transition-colors ml-0.5"
                      title="Remove"
                    >
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </span>
                ))}
              </div>
            ) : (
              <div className="text-xs text-slate-400 italic p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                No diagnostic instruments selected yet. Search below to add scanners, gauges, and certifications.
              </div>
            )}

            {/* Search Input & Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search scanners, paint gauges, borescopes, compression testers, certifications..."
                  value={equipmentSearch}
                  onFocus={() => setIsDropdownOpen(true)}
                  onChange={e => {
                    setEquipmentSearch(e.target.value);
                    setIsDropdownOpen(true);
                  }}
                  className="w-full pl-10 pr-24 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#154D3F] text-xs bg-white transition-all"
                />
                {equipmentSearch && (
                  <button
                    type="button"
                    onClick={addCustomEquipment}
                    className="absolute right-2 top-1.5 px-2.5 py-1 rounded-lg bg-[#154D3F] text-white text-[10px] font-bold hover:bg-[#103d32] transition-colors"
                  >
                    + Add
                  </button>
                )}
              </div>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute z-30 mt-1.5 w-full bg-white rounded-2xl border border-slate-200 shadow-xl max-h-72 overflow-y-auto divide-y divide-slate-100">
                  <div className="p-2 bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
                    <span>Available Diagnostic Instruments & Accreditations ({filteredEquipment.length})</span>
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(false)}
                      className="text-slate-400 hover:text-slate-700"
                    >
                      Close ✕
                    </button>
                  </div>

                  {filteredEquipment.length === 0 ? (
                    <div className="p-4 text-center space-y-2">
                      <p className="text-xs text-slate-500">No matching preset equipment found for "{equipmentSearch}".</p>
                      <button
                        type="button"
                        onClick={addCustomEquipment}
                        className="px-3 py-1.5 rounded-xl bg-emerald-50 text-[#154D3F] border border-emerald-200 text-xs font-bold hover:bg-emerald-100"
                      >
                        + Add "{equipmentSearch}" as Custom Tool
                      </button>
                    </div>
                  ) : (
                    filteredEquipment.map(item => {
                      const isSelected = selectedEquipment.includes(item.name);
                      return (
                        <button
                          type="button"
                          key={item.id}
                          onClick={() => toggleEquipment(item.name)}
                          className={`w-full p-2.5 text-left text-xs transition-colors flex items-start justify-between gap-3 ${
                            isSelected ? 'bg-emerald-50/70 hover:bg-emerald-50' : 'hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className={`font-bold ${isSelected ? 'text-[#154D3F]' : 'text-slate-800'}`}>
                                {item.name}
                              </span>
                              <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                                {item.category}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400 leading-tight">
                              {item.description}
                            </p>
                          </div>
                          <div className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs ${
                            isSelected
                              ? 'bg-[#154D3F] text-white shadow-xs'
                              : 'border border-slate-300 text-transparent hover:border-slate-400'
                          }`}>
                            ✓
                          </div>
                        </button>
                      );
                    })
                  )}
                </div>
              )}
            </div>

            {/* Additional Free-Form Workshop Notes */}
            <div className="space-y-1.5 pt-2">
              <label className="block text-[11px] font-bold uppercase text-slate-700">
                Additional Workshop / Operations Notes
              </label>
              <textarea
                rows={5}
                placeholder="e.g. Indiranagar & Koramangala hub technicians equipped with Launch OBD-II diagnostic scanners and ultrasonic paint thickness gauges. Provide any specific workshop guidelines, service capabilities, or technician dispatch instructions."
                value={notes}
                onChange={e => setNotes(e.target.value)}
                className="w-full min-h-[120px] sm:min-h-[140px] p-3.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#154D3F] focus:border-[#154D3F] text-xs leading-relaxed transition-all resize-y"
              />
            </div>
          </div>
        </div>

        {/* Card 3: Assigned Field Inspectors / Vehicle Technicians (OPTIONAL) */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#154D3F] flex items-center justify-center shrink-0 font-bold">
                <Users className="w-4 h-4 text-[#154D3F]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-bold text-slate-900">3. Field Inspectors & Diagnostic Technicians</h2>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                    Optional
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Register qualified mechanics or diagnostic technicians from this organization who check vehicles on-ground.
                </p>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddInspector}
              className="text-xs font-bold text-[#154D3F] border-[#154D3F]/40 hover:bg-emerald-50"
              icon={<Plus className="w-3.5 h-3.5" />}
            >
              Add Field Technician
            </Button>
          </div>

          {inspectors.length === 0 ? (
            <div className="p-6 bg-slate-50/70 rounded-2xl border-2 border-dashed border-slate-200 text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#154D3F] flex items-center justify-center mx-auto">
                <Users className="w-5 h-5 text-[#154D3F]" />
              </div>
              <h3 className="text-xs font-bold text-slate-800">No Individual Technicians Registered Yet</h3>
              <p className="text-[11px] text-slate-500 max-w-md mx-auto">
                This section is optional. You can onboard this partner organization now and add specific technician profiles anytime later.
              </p>
              <div className="pt-1">
                <button
                  type="button"
                  onClick={handleAddInspector}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-xs font-bold text-slate-700 hover:border-[#154D3F] hover:text-[#154D3F] shadow-2xs transition-colors"
                >
                  <Plus className="w-3.5 h-3.5 text-[#154D3F]" />
                  <span>Add First Field Inspector</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {inspectors.map((inspector, index) => (
                <div
                  key={inspector.id}
                  className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/90 relative space-y-3"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#154D3F] text-white text-[10px] font-bold flex items-center justify-center">
                        {index + 1}
                      </span>
                      <span className="text-xs font-bold text-slate-800">
                        {inspector.name.trim() || `Field Inspector #${index + 1}`}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setInspectorToDelete(inspector)}
                      className="text-slate-400 hover:text-red-600 transition-colors p-1"
                      title="Remove Technician"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-start">
                    {/* Inspector Full Name (3 cols) */}
                    <div className="lg:col-span-3">
                      <label className="block text-[10px] font-bold uppercase text-slate-600 mb-1">
                        Inspector Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Suresh Kumar"
                        value={inspector.name}
                        onChange={e => handleUpdateInspector(inspector.id, 'name', e.target.value)}
                        className="w-full px-3 py-1.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#154D3F] text-xs bg-white"
                      />
                    </div>

                    {/* Phone Number (2 cols) */}
                    <div className="lg:col-span-2">
                      <label className="block text-[10px] font-bold uppercase text-slate-600 mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 98450 11223"
                        value={inspector.phone}
                        onChange={e => handleUpdateInspector(inspector.id, 'phone', e.target.value)}
                        className="w-full px-3 py-1.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#154D3F] text-xs bg-white"
                      />
                    </div>

                    {/* Vehicle Specialization (2 cols) */}
                    <div className="lg:col-span-2">
                      <label className="block text-[10px] font-bold uppercase text-slate-600 mb-1">
                        Specialization
                      </label>
                      <div className="relative">
                        <select
                          value={inspector.specialization}
                          onChange={e => handleUpdateInspector(inspector.id, 'specialization', e.target.value)}
                          className="w-full appearance-none px-2.5 py-1.5 pr-7 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#154D3F] text-xs bg-white font-semibold"
                        >
                          <option value="all">Cars & Bikes (All)</option>
                          <option value="car">Cars Only (4-Wheelers)</option>
                          <option value="bike">Bikes Only (2-Wheelers)</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-slate-400">
                          <ChevronDown className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>

                    {/* Experience Years Dropdown (1 col) */}
                    <div className="lg:col-span-1">
                      <label className="block text-[10px] font-bold uppercase text-slate-600 mb-1">
                        Exp (Yrs)
                      </label>
                      <div className="relative">
                        <select
                          value={inspector.experienceYears ?? 3}
                          onChange={e => handleUpdateInspector(inspector.id, 'experienceYears', Number(e.target.value))}
                          className="w-full appearance-none px-2 py-1.5 pr-6 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#154D3F] text-xs bg-white font-semibold text-center cursor-pointer"
                        >
                          <option value={1}>1 Yr</option>
                          <option value={2}>2 Yrs</option>
                          <option value={3}>3 Yrs</option>
                          <option value={4}>4 Yrs</option>
                          <option value={5}>5 Yrs</option>
                          <option value={6}>6 Yrs</option>
                          <option value={7}>7 Yrs</option>
                          <option value={8}>8 Yrs</option>
                          <option value={9}>9 Yrs</option>
                          <option value={10}>10 Yrs</option>
                          <option value={12}>12+ Yrs</option>
                          <option value={15}>15+ Yrs</option>
                          <option value={20}>20+ Yrs</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-1.5 text-slate-400">
                          <ChevronDown className="w-3 h-3" />
                        </div>
                      </div>
                    </div>

                    {/* Certifications / Credentials Multi-Select (4 cols) */}
                    <div className="lg:col-span-4">
                      <label className="block text-[10px] font-bold uppercase text-slate-600 mb-1">
                        Certifications / Credentials
                      </label>
                      <InspectorCertMultiSelect
                        selected={inspector.certifications || (inspector.certification ? [inspector.certification] : ['ASDC Level 4 Master Tech'])}
                        onChange={(newCerts) => {
                          handleUpdateInspector(inspector.id, 'certifications', newCerts);
                          handleUpdateInspector(inspector.id, 'certification', newCerts.join(', '));
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}

              <div className="pt-1">
                <button
                  type="button"
                  onClick={handleAddInspector}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#154D3F] hover:underline"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Another Field Inspector</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Form Actions */}
        <div className="pt-2 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3">
          <Link to="/admin/organizations" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto">
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            variant="primary"
            isLoading={isSubmitting}
            className="w-full sm:w-auto font-bold px-6 shadow-xs"
            icon={<ShieldCheck className="w-4 h-4" />}
          >
            Onboard Partner Organization &rarr;
          </Button>
        </div>
      </form>

      {/* Soft Delete Confirmation Modal for Field Inspector */}
      {inspectorToDelete && (
        <Modal
          isOpen={!!inspectorToDelete}
          onClose={() => setInspectorToDelete(null)}
          title="Remove Field Inspector?"
          subtitle="Confirm removal of this technician from the onboarding roster"
          maxWidth="md"
        >
          <div className="space-y-4 text-xs">
            <div className="p-4 bg-red-50 rounded-2xl border border-red-200/80 flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                <Trash2 className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-slate-900 text-sm">
                  Remove {inspectorToDelete.name.trim() || 'this field inspector'}?
                </p>
                <p className="text-slate-600 mt-1">
                  Are you sure you want to remove this technician from the onboarding roster? You can always add them back later.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <Button variant="outline" size="sm" onClick={() => setInspectorToDelete(null)}>
                Cancel
              </Button>
              <Button variant="danger" size="sm" onClick={handleConfirmRemoveInspector} className="font-bold">
                Yes, Remove Inspector
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

