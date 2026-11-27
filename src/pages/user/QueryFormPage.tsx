import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Car,
  Bike,
  Calendar,
  MapPin,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check,
  AlertCircle,
  Mail,
  User,
  FileText,
  Building2,
  MessageSquare,
  Clock
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAppData } from '../../context/AppDataContext';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Select } from '../../components/common/Select';
import { SEO } from '../../components/common/SEO';
import { VehicleType, InspectionQuery } from '../../types';
import { CAR_CATALOG, BIKE_CATALOG } from '../../data/vehicleCatalog';

interface FormErrors {
  make?: string;
  model?: string;
  regNumber?: string;
  preferredDate?: string;
  address?: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
}

export const QueryFormPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const preselectedType = searchParams.get('type') as VehicleType | null;
  const preselectedServiceId = searchParams.get('service');

  const { user, loginUser } = useAuth();
  const { services, addQuery } = useAppData();

  // Helper for today & tomorrow's dates
  const getTodayStr = () => {
    const d = new Date();
    return d.toISOString().split('T')[0];
  };

  const todayStr = getTodayStr();
  // Minimum date is TODAY: users can book for today, tomorrow, or future!
  const minDateStr = todayStr;

  const formatDateReadable = (dateStr: string) => {
    if (!dateStr) return '';
    try {
      const [y, m, d] = dateStr.split('-').map(Number);
      const dateObj = new Date(y, m - 1, d);
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      
      const target = new Date(dateObj);
      target.setHours(0, 0, 0, 0);
      
      const formatted = dateObj.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
      
      if (target.getTime() === today.getTime()) {
        return `${formatted} (Today)`;
      } else if (target.getTime() === tomorrow.getTime()) {
        return `${formatted} (Tomorrow)`;
      }
      return formatted;
    } catch {
      return dateStr;
    }
  };

  // Form State (Car vs Bike ONLY)
  const [vehicleType, setVehicleType] = useState<VehicleType>(preselectedType || 'car');
  
  // Cascading Make, Model & Variant state
  const [selectedMake, setSelectedMake] = useState<string>('');
  const [customMake, setCustomMake] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [customModel, setCustomModel] = useState<string>('');
  const [selectedVariant, setSelectedVariant] = useState<string>('');
  const [customVariant, setCustomVariant] = useState<string>('');

  const [year, setYear] = useState<number>(2022);
  const [regNumber, setRegNumber] = useState('');
  const [serviceId, setServiceId] = useState(preselectedServiceId || 'srv-comprehensive-car');
  
  // Location & Seller fields
  const [city, setCity] = useState('Bengaluru');
  const [address, setAddress] = useState('');
  const [sellerName, setSellerName] = useState('');
  const [sellerPhone, setSellerPhone] = useState('');
  
  // Preferred Time Window (Optional & Tentative)
  const [preferredTimeSlot, setPreferredTimeSlot] = useState<string>('Flexible (Coordinated with Partner)');
  
  const [preferredDate, setPreferredDate] = useState(todayStr);
  const [notes, setNotes] = useState('');

  // Contact info state (prefilled if user is logged in)
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  // Validation & Touched States
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedQuery, setSubmittedQuery] = useState<InspectionQuery | null>(null);

  // Sync logged in user details
  useEffect(() => {
    if (user) {
      setContactName(user.fullName || '');
      setContactEmail(user.email || '');
      if (user.phone) {
        const clean = user.phone.replace('+91', '').trim();
        setContactPhone(clean);
      }
    }
  }, [user]);

  // Handle URL preselection
  useEffect(() => {
    if (preselectedType === 'bike') {
      setVehicleType('bike');
      setServiceId('srv-motorcycle');
    } else if (preselectedType === 'car') {
      setVehicleType('car');
      setServiceId('srv-comprehensive-car');
    }
  }, [preselectedType]);

  useEffect(() => {
    if (preselectedServiceId) {
      const s = services.find(srv => srv.id === preselectedServiceId);
      if (s) {
        setServiceId(s.id);
        setVehicleType(s.category);
      }
    }
  }, [preselectedServiceId, services]);

  const availableServices = services.filter(s => s.category === vehicleType);

  const handleTypeChange = (type: VehicleType) => {
    setVehicleType(type);
    setSelectedMake('');
    setCustomMake('');
    setSelectedModel('');
    setCustomModel('');
    setSelectedVariant('');
    setCustomVariant('');
    const matching = services.find(s => s.category === type);
    if (matching) {
      setServiceId(matching.id);
    }
  };

  // Get current catalog
  const currentCatalog = vehicleType === 'car' ? CAR_CATALOG : BIKE_CATALOG;
  const activeMakeData = currentCatalog.find(m => m.make === selectedMake);
  const availableModels = activeMakeData ? activeMakeData.models : [];
  const activeModelData = availableModels.find(m => m.name === selectedModel);
  const availableVariants = activeModelData ? activeModelData.variants : [];

  // Effective vehicle values
  const getEffectiveMake = () => (selectedMake === 'Other' ? customMake.trim() : selectedMake);
  const getEffectiveModel = () => (selectedModel === 'Other' ? customModel.trim() : selectedModel);
  const getEffectiveVariant = () => (selectedVariant === 'Other' ? customVariant.trim() : selectedVariant);

  const getFormattedVehicleName = () => {
    const m = getEffectiveMake();
    const mdl = getEffectiveModel();
    const v = getEffectiveVariant();
    if (!m && !mdl) return '';
    let res = `${m} ${mdl}`.trim();
    if (v) res += ` - ${v}`;
    return res;
  };

  // Quick preset pills for popular models in India
  const carPresets = [
    { label: 'Hyundai Creta', make: 'Hyundai', model: 'Creta', variant: 'SX' },
    { label: 'Maruti Swift', make: 'Maruti Suzuki', model: 'Swift', variant: 'ZXi' },
    { label: 'Tata Nexon', make: 'Tata', model: 'Nexon', variant: 'Creative' },
    { label: 'Mahindra Thar', make: 'Mahindra', model: 'Thar', variant: 'LX Hard Top (4WD)' },
    { label: 'Kia Seltos', make: 'Kia', model: 'Seltos', variant: 'HTX' },
    { label: 'Toyota Innova', make: 'Toyota', model: 'Innova Crysta', variant: 'GX' },
  ];

  const bikePresets = [
    { label: 'Royal Enfield Classic 350', make: 'Royal Enfield', model: 'Classic 350', variant: 'Dark Series (Dual ABS)' },
    { label: 'Yamaha MT-15', make: 'Yamaha', model: 'MT-15 V2', variant: 'Deluxe (TCS & Bluetooth)' },
    { label: 'KTM Duke 390', make: 'KTM', model: 'Duke 390', variant: 'Gen 3 with Launch Control & Quickshifter' },
    { label: 'TVS Apache RTR', make: 'TVS', model: 'Apache RTR 160 4V', variant: 'Dual Channel ABS' },
    { label: 'Honda Activa', make: 'Honda', model: 'Activa 6G', variant: 'Deluxe' },
  ];

  const handleSelectPreset = (preset: { make: string; model: string; variant?: string }) => {
    setSelectedMake(preset.make);
    setCustomMake('');
    setSelectedModel(preset.model);
    setCustomModel('');
    setSelectedVariant(preset.variant || '');
    setCustomVariant('');
    setTouched(prev => ({ ...prev, make: true, model: true }));
    setErrors(prev => ({ ...prev, make: undefined, model: undefined }));
  };

  // Comprehensive Field-by-Field Validator
  const validateField = (name: string, value: any): string | undefined => {
    switch (name) {
      case 'make':
        if (!selectedMake) {
          return 'Please select the vehicle make (brand).';
        }
        if (selectedMake === 'Other' && !customMake.trim()) {
          return 'Please enter the vehicle brand / manufacturer name.';
        }
        return undefined;

      case 'model':
        if (!selectedModel) {
          return 'Please select the vehicle model.';
        }
        if (selectedModel === 'Other' && !customModel.trim()) {
          return 'Please enter the vehicle model name.';
        }
        return undefined;

      case 'regNumber':
        if (value && value.trim()) {
          const clean = value.replace(/[\s-]/g, '').toUpperCase();
          const indianRegRegex = /^[A-Z]{2}[0-9]{1,2}[A-Z]{0,3}[0-9]{4}$|^[0-9]{2}BH[0-9]{4}[A-Z]{1,2}$/;
          if (!indianRegRegex.test(clean)) {
            return 'Invalid registration format. Use standard Indian format (e.g. KA 03 MN 7812).';
          }
        }
        return undefined;

      case 'preferredDate':
        if (!value) {
          return 'Please select your preferred inspection date.';
        }
        if (value < todayStr) {
          return 'Inspection date cannot be in the past. Please select today or a future date.';
        }
        return undefined;

      case 'address':
        if (!value || !value.trim()) {
          return 'Inspection address or location is required.';
        }
        if (value.trim().length < 6) {
          return 'Please enter a complete address, shop name, or locality (at least 6 characters).';
        }
        return undefined;

      case 'contactName':
        if (!value || !value.trim()) {
          return 'Your full name is required.';
        }
        if (value.trim().length < 2) {
          return 'Name must be at least 2 characters.';
        }
        return undefined;

      case 'contactEmail':
        if (!value || !value.trim()) {
          return 'Email address is required to receive the digital inspection report.';
        }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(value.trim())) {
          return 'Please enter a valid email address (e.g. name@example.com).';
        }
        return undefined;

      case 'contactPhone':
        if (!value || !value.trim()) {
          return 'Mobile number is required for technician dispatch coordination.';
        }
        const cleanPhone = value.replace(/[\s-+()]/g, '');
        const tenDigitPhone = cleanPhone.startsWith('91') && cleanPhone.length === 12 ? cleanPhone.slice(2) : cleanPhone;
        if (!/^[6-9]\d{9}$/.test(tenDigitPhone)) {
          return 'Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.';
        }
        return undefined;

      default:
        return undefined;
    }
  };

  // Run full validation across all fields
  const validateAll = (): FormErrors => {
    return {
      make: validateField('make', selectedMake),
      model: validateField('model', selectedModel),
      regNumber: validateField('regNumber', regNumber),
      preferredDate: validateField('preferredDate', preferredDate),
      address: validateField('address', address),
      contactName: validateField('contactName', contactName),
      contactEmail: validateField('contactEmail', contactEmail),
      contactPhone: validateField('contactPhone', contactPhone),
    };
  };

  const handleBlur = (field: string, value: any) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = validateField(field, value);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleChange = (field: string, value: any, setter: (val: any) => void) => {
    setter(value);
    if (touched[field] || submitAttempted) {
      const error = validateField(field, value);
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);

    const validationErrors = validateAll();
    const hasErrors = Object.values(validationErrors).some(err => err !== undefined);

    if (hasErrors) {
      setErrors(validationErrors);
      setTouched({
        make: true,
        model: true,
        regNumber: true,
        preferredDate: true,
        address: true,
        contactName: true,
        contactEmail: true,
        contactPhone: true,
      });

      const firstErrorKey = Object.keys(validationErrors).find(
        key => validationErrors[key as keyof FormErrors] !== undefined
      );
      if (firstErrorKey) {
        let targetId = firstErrorKey;
        if (firstErrorKey === 'make') {
          targetId = selectedMake === 'Other' ? 'customMakeInput' : 'makeSelect';
        } else if (firstErrorKey === 'model') {
          targetId = selectedModel === 'Other' || selectedMake === 'Other' ? 'customModelInput' : 'modelSelect';
        }
        const el = document.getElementById(targetId);
        if (el) {
          el.focus();
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
      return;
    }

    setIsSubmitting(true);
    try {
      let currentUserId = user?.id;
      let finalPhone = contactPhone.startsWith('+91') ? contactPhone : `+91 ${contactPhone.trim()}`;

      if (!user) {
        const loggedInUser = await loginUser(contactEmail.trim(), contactName.trim(), finalPhone);
        currentUserId = loggedInUser.id;
      }

      const formattedVehicle = getFormattedVehicleName();
      const selectedService = services.find(s => s.id === serviceId);
      
      const newQuery = await addQuery({
        userId: currentUserId || 'usr-guest',
        customerName: contactName.trim(),
        customerEmail: contactEmail.trim(),
        customerPhone: finalPhone,
        vehicleType,
        vehicleMakeModel: formattedVehicle,
        vehicleYear: Number(year),
        vehicleRegNumber: regNumber ? regNumber.trim().toUpperCase() : undefined,
        serviceId,
        serviceName: selectedService?.title || (vehicleType === 'car' ? 'Comprehensive Car Inspection' : 'Motorcycle Inspection'),
        city,
        inspectionAddress: address.trim(),
        preferredDate,
        preferredTimeSlot: preferredTimeSlot || 'Flexible (Coordinated with Partner)',
        sellerName: sellerName.trim() || undefined,
        sellerPhone: sellerPhone.trim() || undefined,
        customerNotes: notes.trim() || undefined
      });

      setSubmittedQuery(newQuery);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedServiceObj = services.find(s => s.id === serviceId);

  return (
    <div className="pt-3 sm:pt-4 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-4 sm:space-y-5">
      <SEO
        title="Book a Certified Pre-Purchase Vehicle Inspection"
        description="Book a 140+ checkpoint pre-purchase car or bike inspection across India. Doorstep forensic audit with OBD-II scan, paint meter test & digital report."
        keywords="book car inspection, pre-purchase bike inspection, used car check, door step vehicle inspection India, SahiVahan booking"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Pre-Purchase Vehicle Inspection Dispatch',
          provider: {
            '@type': 'AutomotiveBusiness',
            name: 'SahiVahan',
            url: 'https://sahivahan.com'
          },
          serviceType: 'Pre-Purchase Vehicle Forensic Audit',
          areaServed: ['Bengaluru', 'Hyderabad', 'Delhi NCR', 'Mumbai', 'Pune', 'Chennai', 'Chandigarh'],
          description: 'Comprehensive 140+ point vehicle inspection conducted at any dealership, workshop, or private seller doorstep.'
        }}
      />

      {/* Sleek Compact Header (No wasted vertical space) */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-200/90 pb-3.5">
        <div className="space-y-0.5">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#154D3F]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Verified Pre-Purchase Inspection Dispatch</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Book a Certified Vehicle Inspection
          </h1>
          <p className="text-xs text-slate-500 max-w-2xl">
            Independent forensic evaluation at any dealership, workshop, or private seller doorstep across 7 metro hubs.
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-2 self-start sm:self-auto shrink-0 bg-emerald-50 border border-emerald-200/80 px-3 py-1.5 rounded-xl text-xs font-bold text-emerald-800">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>100% Unbiased · Zero Commission</span>
        </div>
      </div>

      {submittedQuery ? (
        /* Submission Success Receipt State */
        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-12 border border-emerald-200 shadow-xl text-center space-y-6 animate-in fade-in duration-300">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Inquiry Confirmed & Logged
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Inspection Request Dispatched!
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Tracking Reference ID:{' '}
              <span className="text-[#154D3F] font-mono font-bold text-base bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {submittedQuery.id}
              </span>
            </p>
          </div>

          {/* Receipt Breakdown Card */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 text-left space-y-3 text-xs sm:text-sm">
            <div className="flex justify-between items-center border-b border-slate-200 pb-2.5">
              <span className="text-slate-500">Inspected Vehicle:</span>
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                {submittedQuery.vehicleType === 'car' ? <Car className="w-4 h-4 text-emerald-600" /> : <Bike className="w-4 h-4 text-emerald-600" />}
                {submittedQuery.vehicleMakeModel} ({submittedQuery.vehicleYear})
              </span>
            </div>

            {submittedQuery.vehicleRegNumber && (
              <div className="flex justify-between items-center border-b border-slate-200 pb-2.5">
                <span className="text-slate-500">Reg Plate:</span>
                <span className="font-mono font-bold text-slate-900">{submittedQuery.vehicleRegNumber}</span>
              </div>
            )}

            <div className="flex justify-between items-center border-b border-slate-200 pb-2.5">
              <span className="text-slate-500">Audit Scope:</span>
              <span className="font-bold text-slate-900">{submittedQuery.serviceName}</span>
            </div>

            <div className="flex justify-between items-center border-b border-slate-200 pb-2.5">
              <span className="text-slate-500">Inspection Schedule:</span>
              <div className="text-right">
                <span className="font-bold text-slate-900 block">{formatDateReadable(submittedQuery.preferredDate)}</span>
                {submittedQuery.preferredTimeSlot && (
                  <span className="text-[11px] text-emerald-800 font-semibold block">
                    Slot: {submittedQuery.preferredTimeSlot}
                  </span>
                )}
              </div>
            </div>

            <div className="flex justify-between items-start border-b border-slate-200 pb-2.5">
              <span className="text-slate-500 shrink-0">Location:</span>
              <span className="font-bold text-slate-900 text-right">{submittedQuery.inspectionAddress}, {submittedQuery.city}</span>
            </div>

            {submittedQuery.sellerName && (
              <div className="flex justify-between items-center border-b border-slate-200 pb-2.5">
                <span className="text-slate-500">Seller / Contact:</span>
                <span className="font-semibold text-slate-900">
                  {submittedQuery.sellerName} {submittedQuery.sellerPhone ? `(${submittedQuery.sellerPhone})` : ''}
                </span>
              </div>
            )}

            <div className="flex justify-between items-center pt-1">
              <span className="text-slate-500">Dispatch Status:</span>
              <span className="font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 text-xs flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                Awaiting Regional Partner Allocation
              </span>
            </div>
          </div>

          {/* Real-time Allocation & Notification Banner (What Happens Next) */}
          <div className="bg-gradient-to-br from-emerald-50/90 to-emerald-100/40 rounded-2xl p-5 sm:p-6 border border-emerald-200/80 text-left space-y-3.5 shadow-2xs">
            <div className="flex items-center gap-2 text-[#154D3F]">
              <MessageSquare className="w-5 h-5 text-emerald-700 shrink-0" />
              <h3 className="font-black text-sm sm:text-base text-slate-900">
                Partner Allocation & Dispatch Alerts
              </h3>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              We have received your inspection request and are matching it with our verified regional partner organization in{' '}
              <strong className="text-slate-900">{submittedQuery.city}</strong>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {/* WhatsApp / SMS Channel */}
              <div className="bg-white rounded-xl p-3.5 border border-emerald-100 space-y-1 shadow-2xs">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[11px]">
                    💬
                  </span>
                  <span>WhatsApp & SMS Updates</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Allocation updates will be sent to{' '}
                  <strong className="text-slate-900 font-mono">{submittedQuery.customerPhone}</strong>. You'll receive a direct WhatsApp/SMS message with the assigned technician's name, phone number, and arrival window.
                </p>
              </div>

              {/* Email Channel */}
              <div className="bg-white rounded-xl p-3.5 border border-emerald-100 space-y-1 shadow-2xs">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-[11px]">
                    ✉️
                  </span>
                  <span>Email Confirmation & PDF Report</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Booking confirmation has been sent to{' '}
                  <strong className="text-slate-900">{submittedQuery.customerEmail}</strong>. Your final forensic PDF inspection report (with 80+ high-res photos) will also be delivered here upon audit completion.
                </p>
              </div>
            </div>

            {/* Next Steps Reminder */}
            <div className="flex items-center gap-2 pt-1 text-[11px] text-emerald-900 bg-emerald-100/70 p-2.5 rounded-xl border border-emerald-200 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>
                <strong>Next Step:</strong> Our regional partner coordinates vehicle access directly at {submittedQuery.inspectionAddress}. Zero advance payment is required.
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setSubmittedQuery(null);
                setSelectedMake('');
                setCustomMake('');
                setSelectedModel('');
                setCustomModel('');
                setSelectedVariant('');
                setCustomVariant('');
                setRegNumber('');
                setAddress('');
                setSellerName('');
                setSellerPhone('');
                setNotes('');
                setSubmitAttempted(false);
                setErrors({});
                setTouched({});
              }}
              className="w-full sm:w-auto text-xs"
            >
              Submit Another Query
            </Button>

            <Link to="/admin/queries" className="w-full sm:w-auto">
              <Button variant="primary" icon={<ArrowRight className="w-4 h-4" />} className="w-full sm:w-auto justify-center text-xs">
                View in Admin Operations Queue &rarr;
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        /* Master 2-Column Split: Form (Left) & Real-time Live Summary Dossier (Right) */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: The Guided Inquiry Form (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Global Error Alert Banner if validation failed */}
            {submitAttempted && Object.values(errors).some(e => Boolean(e)) && (
              <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-rose-900 animate-in fade-in duration-200 shadow-2xs">
                <div className="p-1 rounded-xl bg-rose-100 text-rose-700 shrink-0 mt-0.5">
                  <AlertCircle className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-rose-950 text-sm">Please review the highlighted details to continue</p>
                  <p className="text-rose-700 text-xs leading-relaxed">
                    A few required fields need your attention before we can dispatch the inspection request (vehicle make/model, inspection date, location address, and mobile number).
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              
              {/* SECTION 1: VEHICLE DETAILS */}
              <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-xs space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-xl bg-emerald-50 text-[#154D3F] flex items-center justify-center font-extrabold text-xs">
                      01
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                      Vehicle & Inspection Checklist
                    </h2>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500">Step 1 of 3</span>
                </div>

                {/* Vehicle Type Switcher (Car vs Bike ONLY) */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Vehicle Category <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {/* Car Option */}
                    <button
                      type="button"
                      onClick={() => handleTypeChange('car')}
                      className={`p-3.5 sm:p-4 rounded-2xl border-2 text-left transition-all relative ${
                        vehicleType === 'car'
                          ? 'border-[#154D3F] bg-[#E8F5EE]/60 shadow-xs ring-1 ring-[#154D3F]/30'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                          vehicleType === 'car' ? 'bg-[#154D3F] text-white' : 'bg-slate-100 text-slate-600'
                        }`}>
                          <Car className="w-5 h-5" />
                        </div>
                        {vehicleType === 'car' ? (
                          <span className="w-5 h-5 rounded-full bg-[#154D3F] text-white flex items-center justify-center">
                            <Check className="w-3 h-3" />
                          </span>
                        ) : (
                          <span className="w-5 h-5 rounded-full border border-slate-300" />
                        )}
                      </div>
                      <h3 className="font-extrabold text-slate-900 text-sm">Used Car</h3>
                      <p className="text-[11px] text-slate-500 mt-0.5 font-medium">
                        Comprehensive Audit (OBD + Paint)
                      </p>
                    </button>

                    {/* Bike Option */}
                    <button
                      type="button"
                      onClick={() => handleTypeChange('bike')}
                      className={`p-3.5 sm:p-4 rounded-2xl border-2 text-left transition-all relative ${
                        vehicleType === 'bike'
                          ? 'border-[#154D3F] bg-[#E8F5EE]/60 shadow-xs ring-1 ring-[#154D3F]/30'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                          vehicleType === 'bike' ? 'bg-[#154D3F] text-white' : 'bg-slate-100 text-slate-600'
                        }`}>
                          <Bike className="w-5 h-5" />
                        </div>
                        {vehicleType === 'bike' ? (
                          <span className="w-5 h-5 rounded-full bg-[#154D3F] text-white flex items-center justify-center">
                            <Check className="w-3 h-3" />
                          </span>
                        ) : (
                          <span className="w-5 h-5 rounded-full border border-slate-300" />
                        )}
                      </div>
                      <h3 className="font-extrabold text-slate-900 text-sm">Used Bike</h3>
                      <p className="text-[11px] text-slate-500 mt-0.5 font-medium">
                        Full Multi-System Audit (Frame + Compression)
                      </p>
                    </button>
                  </div>
                </div>

                {/* Make, Model & Variant Cascading Dropdowns */}
                <div className="space-y-4 pt-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                      Vehicle Make, Model & Trim Selection
                    </span>
                    {getFormattedVehicleName() && (
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> {getFormattedVehicleName()}
                      </span>
                    )}
                  </div>

                  {/* 3-Column Cascading Dropdown Grid (With Seamless In-Place Manual Switch) */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    
                    {/* 1. MAKE / BRAND */}
                    <div className="space-y-1">
                      {selectedMake === 'Other' ? (
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <label htmlFor="customMakeInput" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                              1. Brand / Make <span className="text-red-500">*</span>
                            </label>
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedMake('');
                                setCustomMake('');
                                setSelectedModel('');
                                setCustomModel('');
                                setErrors(prev => ({ ...prev, make: undefined }));
                              }}
                              className="text-[11px] font-bold text-emerald-700 hover:text-emerald-800 hover:underline inline-flex items-center gap-0.5"
                            >
                              ← Choose from list
                            </button>
                          </div>
                          <input
                            id="customMakeInput"
                            type="text"
                            autoFocus
                            placeholder="e.g. Force Motors, Isuzu, Benelli"
                            value={customMake}
                            onChange={e => handleChange('make', e.target.value, setCustomMake)}
                            onBlur={() => handleBlur('make', customMake)}
                            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium transition-all focus:outline-hidden ${
                              errors.make && touched.make
                                ? 'border-red-400 bg-red-50/20 text-red-900 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                                : 'border-slate-300 focus:border-[#154D3F] focus:ring-2 focus:ring-[#154D3F]/15 bg-white text-slate-800'
                            }`}
                          />
                          {errors.make && touched.make && (
                            <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200/80 px-2.5 py-1.5 rounded-xl mt-1.5 animate-in fade-in duration-150">
                              <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                              <span>{errors.make}</span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <Select
                          id="makeSelect"
                          label={
                            <span>
                              1. Make / Brand <span className="text-red-500">*</span>
                            </span>
                          }
                          value={selectedMake}
                          onChange={e => {
                            const val = e.target.value;
                            setSelectedMake(val);
                            setSelectedModel('');
                            setSelectedVariant('');
                            setCustomMake('');
                            setCustomModel('');
                            setCustomVariant('');
                            if (val === 'Other') {
                              setTouched(prev => ({ ...prev, make: false }));
                              setErrors(prev => ({ ...prev, make: undefined }));
                            } else {
                              setTouched(prev => ({ ...prev, make: true }));
                              if (val) setErrors(prev => ({ ...prev, make: undefined }));
                            }
                          }}
                          onBlur={() => handleBlur('make', selectedMake)}
                          error={touched.make ? errors.make : undefined}
                        >
                          <option value="">-- Select Make / Brand --</option>
                          {currentCatalog.map(item => (
                            <option key={item.make} value={item.make}>
                              {item.make}
                            </option>
                          ))}
                          <option value="Other">+ Other / Not Listed</option>
                        </Select>
                      )}
                    </div>

                    {/* 2. MODEL */}
                    <div className="space-y-1">
                      {selectedMake === 'Other' ? (
                        <div>
                          <label htmlFor="customModelInput" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                            2. Model Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="customModelInput"
                            type="text"
                            placeholder="e.g. Gurkha, D-Max, Leoncino"
                            value={customModel}
                            onChange={e => handleChange('model', e.target.value, setCustomModel)}
                            onBlur={() => handleBlur('model', customModel)}
                            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium transition-all focus:outline-hidden ${
                              errors.model && touched.model
                                ? 'border-rose-400 bg-rose-50/20 text-rose-950 focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
                                : 'border-slate-300 focus:border-[#154D3F] focus:ring-2 focus:ring-[#154D3F]/15 bg-white text-slate-800'
                            }`}
                          />
                          {errors.model && touched.model && (
                            <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200/80 px-2.5 py-1.5 rounded-xl mt-1.5 animate-in fade-in duration-150">
                              <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                              <span>{errors.model}</span>
                            </div>
                          )}
                        </div>
                      ) : selectedModel === 'Other' ? (
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <label htmlFor="customModelInput" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                              2. Model Name <span className="text-red-500">*</span>
                            </label>
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedModel('');
                                setCustomModel('');
                                setErrors(prev => ({ ...prev, model: undefined }));
                              }}
                              className="text-[11px] font-bold text-emerald-700 hover:text-emerald-800 hover:underline inline-flex items-center gap-0.5"
                            >
                              ← Choose from list
                            </button>
                          </div>
                          <input
                            id="customModelInput"
                            type="text"
                            autoFocus
                            placeholder={selectedMake ? `e.g. ${selectedMake} model name (e.g. Sierra, Curvv)` : 'e.g. Enter model name'}
                            value={customModel}
                            onChange={e => handleChange('model', e.target.value, setCustomModel)}
                            onBlur={() => handleBlur('model', customModel)}
                            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium transition-all focus:outline-hidden ${
                              errors.model && touched.model
                                ? 'border-rose-400 bg-rose-50/20 text-rose-950 focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
                                : 'border-slate-300 focus:border-[#154D3F] focus:ring-2 focus:ring-[#154D3F]/15 bg-white text-slate-800'
                            }`}
                          />
                          {errors.model && touched.model && (
                            <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200/80 px-2.5 py-1.5 rounded-xl mt-1.5 animate-in fade-in duration-150">
                              <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                              <span>{errors.model}</span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <Select
                          id="modelSelect"
                          disabled={!selectedMake}
                          label={
                            <span>
                              2. Model <span className="text-red-500">*</span>
                            </span>
                          }
                          value={selectedModel}
                          onChange={e => {
                            const val = e.target.value;
                            setSelectedModel(val);
                            setSelectedVariant('');
                            setCustomModel('');
                            setCustomVariant('');
                            if (val === 'Other') {
                              setTouched(prev => ({ ...prev, model: false }));
                              setErrors(prev => ({ ...prev, model: undefined }));
                            } else {
                              setTouched(prev => ({ ...prev, model: true }));
                              if (val) setErrors(prev => ({ ...prev, model: undefined }));
                            }
                          }}
                          onBlur={() => handleBlur('model', selectedModel)}
                          error={touched.model ? errors.model : undefined}
                        >
                          <option value="">
                            {!selectedMake ? '-- First Select Make --' : '-- Select Model --'}
                          </option>
                          {availableModels.map(m => (
                            <option key={m.name} value={m.name}>
                              {m.name}
                            </option>
                          ))}
                          {selectedMake && <option value="Other">+ Other / Not Listed</option>}
                        </Select>
                      )}
                    </div>

                    {/* 3. VARIANT / TRIM */}
                    <div className="space-y-1">
                      {selectedMake === 'Other' || selectedModel === 'Other' ? (
                        <div>
                          <label htmlFor="customVariantInput" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                            3. Variant / Trim <span className="text-slate-400 font-normal">(Optional)</span>
                          </label>
                          <input
                            id="customVariantInput"
                            type="text"
                            placeholder="e.g. VXi, Topline, SX, 4x4, Dark"
                            value={customVariant}
                            onChange={e => setCustomVariant(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#154D3F] focus:ring-2 focus:ring-[#154D3F]/15 bg-white text-slate-800 text-sm font-medium"
                          />
                        </div>
                      ) : selectedVariant === 'Other' ? (
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <label htmlFor="customVariantInput" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                              3. Variant / Trim <span className="text-slate-400 font-normal">(Optional)</span>
                            </label>
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedVariant('');
                                setCustomVariant('');
                              }}
                              className="text-[11px] font-bold text-emerald-700 hover:text-emerald-800 hover:underline inline-flex items-center gap-0.5"
                            >
                              ← Choose from list
                            </button>
                          </div>
                          <input
                            id="customVariantInput"
                            type="text"
                            autoFocus
                            placeholder="e.g. Special Edition / Custom Trim"
                            value={customVariant}
                            onChange={e => setCustomVariant(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#154D3F] focus:ring-2 focus:ring-[#154D3F]/15 bg-white text-slate-800 text-sm font-medium"
                          />
                        </div>
                      ) : (
                        <Select
                          id="variantSelect"
                          disabled={!selectedModel}
                          label="3. Variant / Trim (Optional)"
                          value={selectedVariant}
                          onChange={e => {
                            const val = e.target.value;
                            setSelectedVariant(val);
                            setCustomVariant('');
                          }}
                        >
                          <option value="">
                            {!selectedModel ? '-- First Select Model --' : '-- Select Variant (Optional) --'}
                          </option>
                          {availableVariants.map(v => (
                            <option key={v} value={v}>
                              {v}
                            </option>
                          ))}
                          {selectedModel && <option value="Other">+ Other / Not Listed</option>}
                        </Select>
                      )}
                    </div>

                  </div>

                  {/* Popular Quick-Select Presets */}
                  <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                    <span className="text-[10px] font-bold uppercase text-slate-400 mr-1">Popular in India:</span>
                    {(vehicleType === 'car' ? carPresets : bikePresets).map(preset => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => handleSelectPreset(preset)}
                        className={`text-[11px] font-medium px-2.5 py-1 rounded-lg transition-colors border ${
                          selectedMake === preset.make && selectedModel === preset.model
                            ? 'bg-[#154D3F] text-white border-[#154D3F] font-bold'
                            : 'bg-white hover:bg-emerald-50 hover:text-emerald-800 text-slate-600 border-slate-200'
                        }`}
                      >
                        + {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Year & Registration Plate */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <Select
                    id="yearSelect"
                    label={
                      <span>
                        Manufacturing Year <span className="text-red-500">*</span>
                      </span>
                    }
                    value={year}
                    onChange={e => setYear(Number(e.target.value))}
                  >
                    {[2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012].map(y => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </Select>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label htmlFor="regNumber" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                        Registration No. <span className="text-slate-400 font-normal">(Optional)</span>
                      </label>
                      {touched.regNumber && !errors.regNumber && regNumber && (
                        <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Valid
                        </span>
                      )}
                    </div>
                    
                    <input
                      id="regNumber"
                      type="text"
                      placeholder="e.g. KA 03 MN 7812"
                      value={regNumber}
                      onChange={e => handleChange('regNumber', e.target.value.toUpperCase(), setRegNumber)}
                      onBlur={e => handleBlur('regNumber', e.target.value)}
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm uppercase font-mono tracking-wider transition-all focus:outline-hidden ${
                        errors.regNumber && touched.regNumber
                          ? 'border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                          : 'border-slate-300 focus:border-[#154D3F] focus:ring-2 focus:ring-[#154D3F]/15'
                      }`}
                    />

                    {errors.regNumber && touched.regNumber && (
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200/80 px-2.5 py-1.5 rounded-xl mt-1.5 animate-in fade-in duration-150">
                        <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                        <span>{errors.regNumber}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Inspection Service Package Selection */}
                <Select
                  id="serviceSelect"
                  label={
                    <span>
                      Inspection Package Scope <span className="text-red-500">*</span>
                    </span>
                  }
                  value={serviceId}
                  onChange={e => setServiceId(e.target.value)}
                >
                  {availableServices.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.title} (Multi-System Audit)
                    </option>
                  ))}
                </Select>
              </div>

              {/* SECTION 2: DATE & INSPECTION LOCATION */}
              <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-xs space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-xl bg-emerald-50 text-[#154D3F] flex items-center justify-center font-extrabold text-xs">
                      02
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                      Inspection Date & Location Details
                    </h2>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500">Step 2 of 3</span>
                </div>

                {/* City & Preferred Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Select
                    id="citySelect"
                    label={
                      <span>
                        Metro Hub / City <span className="text-red-500">*</span>
                      </span>
                    }
                    value={city}
                    onChange={e => setCity(e.target.value)}
                  >
                    <option value="Bengaluru">Bengaluru (Metro Hub)</option>
                    <option value="Hyderabad">Hyderabad (Metro Hub)</option>
                    <option value="Delhi NCR">Delhi NCR (Gurugram / Noida / Delhi)</option>
                    <option value="Mumbai">Mumbai & Navi Mumbai</option>
                    <option value="Pune">Pune & PCMC</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Chandigarh">Chandigarh (Tricity / Mohali / Panchkula)</option>
                  </Select>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label htmlFor="preferredDate" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                        Preferred Inspection Date <span className="text-red-500">*</span>
                      </label>
                      {touched.preferredDate && !errors.preferredDate && (
                        <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Valid
                        </span>
                      )}
                    </div>
                    
                    <input
                      id="preferredDate"
                      type="date"
                      min={todayStr}
                      value={preferredDate}
                      onChange={e => handleChange('preferredDate', e.target.value, setPreferredDate)}
                      onBlur={e => handleBlur('preferredDate', e.target.value)}
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-hidden ${
                        errors.preferredDate && touched.preferredDate
                          ? 'border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                          : 'border-slate-300 focus:border-[#154D3F] focus:ring-2 focus:ring-[#154D3F]/15'
                      }`}
                    />

                    {errors.preferredDate && touched.preferredDate && (
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200/80 px-2.5 py-1.5 rounded-xl mt-1.5 animate-in fade-in duration-150">
                        <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                        <span>{errors.preferredDate}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Preferred Time Window (Optional & Subject to Partner Availability) */}
                <div className="space-y-2.5 pt-3 border-t border-slate-100">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-emerald-700" />
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        Preferred Time Window <span className="text-slate-400 font-normal">(Optional)</span>
                      </label>
                    </div>
                    <span className="text-[10px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/80 font-semibold self-start sm:self-auto">
                      Subject to Inspector Availability
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      { id: 'Morning (10:00 AM – 01:00 PM)', label: 'Morning', time: '10 AM – 1 PM', icon: '🌅' },
                      { id: 'Afternoon (01:00 PM – 04:00 PM)', label: 'Afternoon', time: '1 PM – 4 PM', icon: '☀️' },
                      { id: 'Late Afternoon (04:00 PM – 07:00 PM)', label: 'Late Afternoon', time: '4 PM – 7 PM', icon: '🌇' },
                      { id: 'Flexible (Coordinated with Partner)', label: 'Flexible', time: 'Any Available Slot', icon: '⚡' },
                    ].map(slot => (
                      <button
                        key={slot.id}
                        type="button"
                        onClick={() => setPreferredTimeSlot(slot.id)}
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                          preferredTimeSlot === slot.id
                            ? 'bg-emerald-50/90 border-[#154D3F] text-[#154D3F] ring-1 ring-[#154D3F] shadow-xs'
                            : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs font-bold">
                          <span>{slot.icon} {slot.label}</span>
                          {preferredTimeSlot === slot.id && <Check className="w-3.5 h-3.5 text-[#154D3F]" />}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">{slot.time}</div>
                      </button>
                    ))}
                  </div>

                  <p className="text-[11px] text-slate-500 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
                    <strong className="text-slate-700">Tentative Timing:</strong> Preferred time is optional and tentative — inspection arrival is subject to local technician / inspector availability. Our dispatch operations desk will confirm the final arrival schedule with you via SMS & WhatsApp.
                  </p>
                </div>

                {/* Inspection Address (Clean Manual Entry) */}
                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <label htmlFor="address" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Inspection Address / Hub Location <span className="text-red-500">*</span>
                    </label>
                    {touched.address && !errors.address && address.trim().length >= 6 && (
                      <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Valid
                      </span>
                    )}
                  </div>

                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      id="address"
                      type="text"
                      placeholder="e.g. Workshop garage name, Dealership yard, or Seller's address"
                      value={address}
                      onChange={e => handleChange('address', e.target.value, setAddress)}
                      onBlur={e => handleBlur('address', e.target.value)}
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-hidden ${
                        errors.address && touched.address
                          ? 'border-rose-400 bg-rose-50/20 text-rose-950 focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
                          : touched.address && !errors.address && address.trim().length >= 6
                          ? 'border-emerald-400/80 bg-emerald-50/10 focus:border-[#154D3F]'
                          : 'border-slate-300 focus:border-[#154D3F] focus:ring-2 focus:ring-[#154D3F]/15'
                      }`}
                    />
                    {touched.address && !errors.address && address.trim().length >= 6 && (
                      <Check className="w-4 h-4 text-emerald-600 absolute right-3.5 top-1/2 -translate-y-1/2" />
                    )}
                  </div>

                  {errors.address && touched.address && (
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200/80 px-2.5 py-1.5 rounded-xl animate-in fade-in duration-150">
                      <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                      <span>{errors.address}</span>
                    </div>
                  )}

                  <p className="text-[11px] text-slate-400">
                    Our partner technician arrives at this exact address or workshop with calibrated diagnostic gear.
                  </p>
                </div>

                {/* Optional Seller / Workshop Contact (Helps coordinate vehicle access) */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-emerald-700" />
                      Seller / Workshop Contact Info
                    </span>
                    <span className="text-[10px] text-slate-500 font-semibold bg-white px-2 py-0.5 rounded border border-slate-200">
                      Optional
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    If you are buying from a dealer, garage, or private seller, providing their details helps our local inspector coordinate vehicle keys & parking access smoothly.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-600">
                        Seller / Dealer / Shop Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Star Auto Garage / Spinny Hub / Amit"
                        value={sellerName}
                        onChange={e => setSellerName(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-600">
                        Seller / Shop Phone Number
                      </label>
                      <input
                        type="tel"
                        maxLength={10}
                        placeholder="e.g. 98765 43210"
                        value={sellerPhone}
                        onChange={e => setSellerPhone(e.target.value.replace(/\D/g, ''))}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Notes / Concerns */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Specific Concerns for Inspector <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Check specifically for flood waterline marks, automatic gearbox delay, or repainted panels."
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-[#154D3F] focus:ring-2 focus:ring-[#154D3F]/15 text-sm"
                  />
                </div>
              </div>

              {/* SECTION 3: CONTACT & VERIFICATION */}
              <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-xs space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-xl bg-emerald-50 text-[#154D3F] flex items-center justify-center font-extrabold text-xs">
                      03
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                      Customer Contact & Dispatch Updates
                    </h2>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500">Step 3 of 3</span>
                </div>

                {/* If user is logged in: show verified badge */}
                {user ? (
                  <div className="bg-emerald-50/70 border border-emerald-100 rounded-2xl p-3.5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#154D3F] text-white flex items-center justify-center font-bold text-sm shrink-0">
                        {user.fullName.charAt(0).toUpperCase()}
                      </div>
                      <div className="text-xs">
                        <p className="font-bold text-slate-900 flex items-center gap-1.5">
                          {user.fullName}
                          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-200/70 px-1.5 py-0.2 rounded-md">
                            Verified Customer
                          </span>
                        </p>
                        <p className="text-slate-500 text-[11px]">{user.email} • {contactPhone || user.phone || 'Phone linked'}</p>
                      </div>
                    </div>
                    <span className="text-xs text-emerald-700 font-semibold hidden sm:inline">Signed In</span>
                  </div>
                ) : (
                  /* Guest User Contact Inputs */
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-xs">
                      <span className="text-slate-600">Have an existing account?</span>
                      <button
                        type="button"
                        onClick={() => loginUser('rahul.verma@gmail.com', 'Rahul Verma', '+91 98765 43210')}
                        className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1"
                      >
                        <Sparkles className="w-3.5 h-3.5" /> 1-Click Demo Login
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name Input */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <label htmlFor="contactName" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          {touched.contactName && !errors.contactName && (
                            <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Valid
                            </span>
                          )}
                        </div>
                        
                        <div className="relative">
                          <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                          <input
                            id="contactName"
                            type="text"
                            placeholder="e.g. Rahul Sharma"
                            value={contactName}
                            onChange={e => handleChange('contactName', e.target.value, setContactName)}
                            onBlur={e => handleBlur('contactName', e.target.value)}
                            className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-hidden ${
                              errors.contactName && touched.contactName
                                ? 'border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                                : 'border-slate-300 focus:border-[#154D3F] focus:ring-2 focus:ring-[#154D3F]/15'
                            }`}
                          />
                        </div>

                        {errors.contactName && touched.contactName && (
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200/80 px-2.5 py-1.5 rounded-xl mt-1.5 animate-in fade-in duration-150">
                            <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                            <span>{errors.contactName}</span>
                          </div>
                        )}
                      </div>

                      {/* Phone Input */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <label htmlFor="contactPhone" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                            Mobile Number <span className="text-red-500">*</span>
                          </label>
                          {touched.contactPhone && !errors.contactPhone && (
                            <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Valid
                            </span>
                          )}
                        </div>
                        
                        <div className="relative flex">
                          <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-300 bg-slate-50 text-slate-600 text-xs font-bold">
                            +91
                          </span>
                          <input
                            id="contactPhone"
                            type="tel"
                            maxLength={10}
                            placeholder="98765 43210"
                            value={contactPhone}
                            onChange={e => handleChange('contactPhone', e.target.value.replace(/\D/g, ''), setContactPhone)}
                            onBlur={e => handleBlur('contactPhone', e.target.value)}
                            className={`w-full px-4 py-2.5 rounded-r-xl border text-sm transition-all focus:outline-hidden ${
                              errors.contactPhone && touched.contactPhone
                                ? 'border-rose-400 bg-rose-50/20 text-rose-950 focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
                                : 'border-slate-300 focus:border-[#154D3F] focus:ring-2 focus:ring-[#154D3F]/15'
                            }`}
                          />
                        </div>

                        {errors.contactPhone && touched.contactPhone && (
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200/80 px-2.5 py-1.5 rounded-xl mt-1.5 animate-in fade-in duration-150">
                            <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                            <span>{errors.contactPhone}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Email Input */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label htmlFor="contactEmail" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        {touched.contactEmail && !errors.contactEmail && (
                          <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Valid
                          </span>
                        )}
                      </div>
                      
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                        <input
                          id="contactEmail"
                          type="email"
                          placeholder="rahul.sharma@example.com"
                          value={contactEmail}
                          onChange={e => handleChange('contactEmail', e.target.value, setContactEmail)}
                          onBlur={e => handleBlur('contactEmail', e.target.value)}
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-hidden ${
                            errors.contactEmail && touched.contactEmail
                              ? 'border-rose-400 bg-rose-50/20 text-rose-950 focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
                              : 'border-slate-300 focus:border-[#154D3F] focus:ring-2 focus:ring-[#154D3F]/15'
                          }`}
                        />
                      </div>

                      {errors.contactEmail && touched.contactEmail && (
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200/80 px-2.5 py-1.5 rounded-xl mt-1.5 animate-in fade-in duration-150">
                          <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                          <span>{errors.contactEmail}</span>
                        </div>
                      )}
                      <p className="text-[11px] text-slate-400">
                        The comprehensive forensic PDF report will be sent to this email upon audit completion.
                      </p>
                    </div>
                  </div>
                )}

                {/* Instant Allocation Updates Reassurance */}
                <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 flex items-start gap-2.5 text-xs text-slate-700">
                  <div className="w-6 h-6 rounded-lg bg-emerald-100 text-[#154D3F] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    💬
                  </div>
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-900">Allocation Updates via SMS, WhatsApp & Email</p>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      You will receive an instant WhatsApp / SMS alert and email as soon as our regional partner allocates your certified technician, including their direct name and phone number.
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit CTA Button */}
              <div className="pt-2">
                <Button
                  type="submit"
                  size="lg"
                  isLoading={isSubmitting}
                  className="w-full font-black text-sm sm:text-base py-3.5 shadow-md justify-center"
                >
                  Confirm & Submit Inspection Query &rarr;
                </Button>
                <p className="text-center text-[11px] text-slate-400 mt-2">
                  🔒 Zero advance payment required. Transparent quotation confirmed upon partner matching.
                </p>
              </div>

            </form>
          </div>

          {/* RIGHT COLUMN: Sticky Real-time Dossier & SahiVahan Assurance (4 cols) */}
          <div className="lg:col-span-4 space-y-5 sticky top-28">
            
            {/* Live Booking Summary Card */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Live Inquiry Summary
                </span>
                <Badge variant="teal" size="sm">
                  {vehicleType === 'car' ? 'Car Audit' : 'Bike Audit'}
                </Badge>
              </div>

              <div className="space-y-3 text-xs">
                {/* Vehicle */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#154D3F] flex items-center justify-center shrink-0">
                    {vehicleType === 'car' ? <Car className="w-4 h-4" /> : <Bike className="w-4 h-4" />}
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Vehicle</span>
                    <p className="font-bold text-slate-900 text-sm">
                      {getFormattedVehicleName() ? `${getFormattedVehicleName()} (${year})` : `Selected ${vehicleType === 'car' ? 'Car' : 'Bike'} (${year})`}
                    </p>
                    {regNumber && (
                      <span className="text-[10px] font-mono font-semibold text-slate-500 uppercase">{regNumber}</span>
                    )}
                  </div>
                </div>

                {/* Package */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#154D3F] flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Audit Package</span>
                    <p className="font-bold text-slate-900">
                      {selectedServiceObj?.title || (vehicleType === 'car' ? 'Comprehensive Car Inspection' : 'Motorcycle Inspection')}
                    </p>
                    <span className="text-[11px] text-emerald-700 font-medium">
                      {vehicleType === 'car' ? 'Comprehensive Forensic Audit' : 'Certified Motorcycle Audit'}
                    </span>
                  </div>
                </div>

                {/* Date, Time Window & City */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#154D3F] flex items-center justify-center shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Schedule & City</span>
                    <p className="font-bold text-slate-900">{formatDateReadable(preferredDate)} • {city}</p>
                    <span className="text-[11px] text-emerald-800 font-semibold block">
                      Window: {preferredTimeSlot}
                    </span>
                    <span className="text-[11px] text-slate-500">Allocation updates sent via SMS & Email</span>
                  </div>
                </div>

                {/* Location */}
                {address && (
                  <div className="flex items-start gap-3 pt-1 border-t border-slate-100">
                    <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-slate-400 text-[10px] uppercase font-bold block">
                        Inspection Address
                      </span>
                      <p className="text-xs text-slate-700 font-medium truncate">{address}</p>
                      {sellerName && (
                        <p className="text-[11px] text-emerald-800 font-semibold truncate mt-0.5">
                          Contact: {sellerName} {sellerPhone ? `(${sellerPhone})` : ''}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Transparent Pricing Pill */}
              <div className="pt-3 border-t border-slate-100 bg-slate-50 -mx-5 sm:-mx-6 -mb-5 sm:-mb-6 p-4 rounded-b-3xl space-y-1 text-center">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                  100% Free Lead Submission
                </span>
                <p className="text-[11px] text-slate-500 leading-snug">
                  Pay nothing now. Transparent quotation presented upon regional partner matching.
                </p>
              </div>
            </div>

            {/* SahiVahan Assurance (Clean: No SLA/time guarantees) */}
            <div className="bg-gradient-to-br from-[#071F18] via-[#103D32] to-[#051712] text-white rounded-3xl p-5 sm:p-6 space-y-4 shadow-lg border border-emerald-800/40">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                  SahiVahan Assurance
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    ✓
                  </span>
                  <div>
                    <strong className="text-white block">100% Independent & Unbiased</strong>
                    <span className="text-emerald-100/70 text-[11px]">Zero dealership commissions or sales conflicts.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    ✓
                  </span>
                  <div>
                    <strong className="text-white block">Verified Regional Partner Dispatch</strong>
                    <span className="text-emerald-100/70 text-[11px]">Matched with certified local inspection organizations.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    ✓
                  </span>
                  <div>
                    <strong className="text-white block">Calibrated Diagnostic Instruments</strong>
                    <span className="text-emerald-100/70 text-[11px]">OBD-II scanner, ultrasonic paint gauge & battery tester.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    ✓
                  </span>
                  <div>
                    <strong className="text-white block">80+ Photo Forensic PDF Report</strong>
                    <span className="text-emerald-100/70 text-[11px]">Comprehensive digital audit delivered to your phone & email upon completion.</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-emerald-800/60 flex items-center justify-between text-[11px] text-emerald-200/80">
                <span>Direct Support:</span>
                <span className="font-bold text-white font-mono">1800-123-SAHI</span>
              </div>
            </div>

          </div>

        </div>
      )}
    </div>
  );
};
