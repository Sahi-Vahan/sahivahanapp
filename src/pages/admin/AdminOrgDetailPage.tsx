import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Building2,
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Car,
  Bike,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ClipboardList,
  Wrench,
  Users,
  Award,
  Plus,
  Trash2,
  ExternalLink,
  MessageCircle,
  FileText,
  UserCheck,
  ChevronRight,
  ChevronDown,
  Check,
  Pencil
} from 'lucide-react';
import { useAppData } from '../../context/AppDataContext';
import { Badge, BadgeVariant } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { InspectorCertMultiSelect } from '../../components/common/InspectorCertMultiSelect';
import { Organization, OrgStatus, InspectorMember } from '../../types';

export const AdminOrgDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { organizations, queries, updateOrganizationStatus, updateOrganization } = useAppData();

  const org = organizations.find(o => o.id === id);

  // Soft delete state for inspector
  const [inspectorToDelete, setInspectorToDelete] = useState<InspectorMember | null>(null);

  // Add inspector modal state
  const [isAddInspectorOpen, setIsAddInspectorOpen] = useState(false);
  const [newInspectorName, setNewInspectorName] = useState('');
  const [newInspectorPhone, setNewInspectorPhone] = useState('');
  const [newInspectorSpecialization, setNewInspectorSpecialization] = useState<'all' | 'car' | 'bike'>('all');
  const [newInspectorExp, setNewInspectorExp] = useState<number>(3);
  const [newInspectorCerts, setNewInspectorCerts] = useState<string[]>(['ASDC Level 4 Master Tech']);

  if (!org) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-xs max-w-lg mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">Partner Organization Not Found</h2>
          <p className="text-xs text-slate-500">
            No partner organization exists with ID "{id}". It may have been removed or the link is incorrect.
          </p>
          <Button variant="primary" onClick={() => navigate('/admin/organizations')}>
            Back to Organizations Directory
          </Button>
        </div>
      </div>
    );
  }

  // Assigned queries
  const orgQueries = queries.filter(q => q.assignedOrgId === org.id);

  // Status toggle handler
  const handleToggleStatus = () => {
    const nextStatus: OrgStatus = org.status === 'active' ? 'inactive' : 'active';
    updateOrganizationStatus(org.id, nextStatus);
  };

  // Add Inspector handler
  const handleSaveNewInspector = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInspectorName.trim() || !newInspectorPhone.trim()) {
      alert('Please enter technician name and phone number.');
      return;
    }

    const newInspector: InspectorMember = {
      id: `INS-${Date.now()}`,
      name: newInspectorName.trim(),
      phone: newInspectorPhone.trim(),
      specialization: newInspectorSpecialization,
      experienceYears: Number(newInspectorExp) || 0,
      certification: newInspectorCerts.join(', '),
      certifications: newInspectorCerts
    };

    const currentInspectors = org.inspectors || [];
    updateOrganization(org.id, {
      inspectors: [...currentInspectors, newInspector]
    });

    // Reset form
    setNewInspectorName('');
    setNewInspectorPhone('');
    setNewInspectorExp(3);
    setNewInspectorCerts(['ASDC Level 4 Master Tech']);
    setIsAddInspectorOpen(false);
  };

  // Remove Inspector handler
  const handleConfirmRemoveInspector = () => {
    if (!inspectorToDelete) return;
    const currentInspectors = org.inspectors || [];
    updateOrganization(org.id, {
      inspectors: currentInspectors.filter(i => i.id !== inspectorToDelete.id)
    });
    setInspectorToDelete(null);
  };

  const getStatusBadge = (status: OrgStatus) => {
    switch (status) {
      case 'active':
        return <Badge variant="success">Active Partner</Badge>;
      case 'pending_verification':
        return <Badge variant="warning">Pending Verification</Badge>;
      case 'inactive':
        return <Badge variant="neutral">Inactive / Paused</Badge>;
    }
  };

  // Default equipment if none was added during creation
  const displayEquipment = (org.equipment && org.equipment.length > 0)
    ? org.equipment
    : [
        'Launch X431 Pro OBD-II Diagnostic Scanner',
        'Ultrasonic Paint Coating / Thickness Gauge (Fe & NFe)',
        'Digital Battery Conductance & Cold Cranking Amps (CCA) Analyzer',
        'Digital Tyre Tread Depth Gauge & DOT Date Reader',
        'Articulated Digital Borescope Inspection Camera',
        'Digital Brake Fluid Moisture & Boiling Point Tester'
      ];

  // Default field technicians if none was added
  const displayInspectors = (org.inspectors && org.inspectors.length > 0)
    ? org.inspectors
    : [
        {
          id: 'INS-DEFAULT-1',
          name: org.contactPerson || 'Lead Operations Technician',
          phone: org.phone,
          specialization: 'all' as const,
          experienceYears: 6,
          certification: 'ASDC Certified Master Diagnostic Specialist'
        }
      ];

  return (
    <div className="w-full space-y-6 pb-12">
      {/* Top Navigation & Breadcrumb */}
      <div className="space-y-2">
        <Link
          to="/admin/organizations"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#154D3F] transition-colors py-0.5 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Partner Organizations Directory</span>
        </Link>

        {/* Header Strip with Live Actions */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#154D3F] text-white flex items-center justify-center font-bold text-lg shadow-sm shrink-0">
              <Building2 className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                  {org.id}
                </span>
                {getStatusBadge(org.status)}
                <span className="text-xs text-slate-400">
                  • Registered on {org.createdAt}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {org.name}
              </h1>
              <p className="text-xs text-slate-500 mt-0.5 flex flex-wrap items-center gap-2">
                <span>GSTIN: <strong className="font-mono text-slate-700">{org.gstin}</strong></span>
                <span>•</span>
                <span>Coverage: <strong className="text-slate-700">{org.cities.join(', ')}</strong></span>
                <span>•</span>
                <span>SLA: <strong className="text-emerald-800">⚡ {org.slaHours}h Response</strong></span>
              </p>
            </div>
          </div>

          {/* Quick Operational Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
            <a
              href={`tel:${org.phone}`}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#154D3F]" />
              <span>Call</span>
            </a>

            <a
              href={`https://wa.me/${org.phone.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp</span>
            </a>

            <a
              href={`mailto:${org.email}`}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-slate-600" />
              <span>Email</span>
            </a>

            <Link to={`/admin/organizations/${org.id}/edit`}>
              <Button
                variant="outline"
                size="sm"
                className="font-bold text-xs border-slate-300 hover:bg-slate-50"
                icon={<Pencil className="w-3.5 h-3.5" />}
              >
                Edit Profile
              </Button>
            </Link>

            <Button
              variant={org.status === 'active' ? 'danger' : 'primary'}
              size="sm"
              onClick={handleToggleStatus}
              className="font-bold text-xs"
            >
              {org.status === 'active' ? 'Pause / Deactivate' : 'Activate Partner'}
            </Button>
          </div>
        </div>
      </div>

      {/* KPI Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Leads Assigned</span>
          <div className="text-2xl font-extrabold text-slate-900">{org.leadCount}</div>
          <p className="text-[11px] text-slate-500">Inspection queries allocated</p>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Completed Audits</span>
          <div className="text-2xl font-extrabold text-emerald-700">{org.completedCount}</div>
          <p className="text-[11px] text-slate-500">Vehicles verified & delivered</p>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Turnaround SLA</span>
          <div className="text-2xl font-extrabold text-slate-900">{org.slaHours} Hours</div>
          <p className="text-[11px] text-slate-500">Dispatch commitment</p>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Field Technicians</span>
          <div className="text-2xl font-extrabold text-[#154D3F]">{displayInspectors.length}</div>
          <p className="text-[11px] text-slate-500">Active inspection mechanics</p>
        </div>
      </div>

      {/* Grid: Company Details + Regional Scope */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Card 1: Company & Operations Liaison */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#154D3F] flex items-center justify-center shrink-0 font-bold">
              <Building2 className="w-4 h-4 text-[#154D3F]" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">Company & Dispatch Operations</h2>
              <p className="text-xs text-slate-500">Official tax registration and primary contact liaison</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px] font-bold uppercase mb-0.5">Organization Full Name:</span>
              <span className="font-bold text-slate-900 text-sm block">{org.name}</span>
            </div>

            <div>
              <span className="text-slate-400 block text-[11px] font-bold uppercase mb-0.5">GSTIN / Trade License:</span>
              <span className="font-mono font-bold text-slate-800 text-sm block">{org.gstin}</span>
            </div>

            <div>
              <span className="text-slate-400 block text-[11px] font-bold uppercase mb-0.5">Primary Contact Person:</span>
              <span className="font-bold text-slate-900 block">{org.contactPerson} ({org.designation || 'Operations Lead'})</span>
            </div>

            <div>
              <span className="text-slate-400 block text-[11px] font-bold uppercase mb-0.5">Dispatch Operations Phone:</span>
              <a href={`tel:${org.phone}`} className="font-mono font-bold text-[#154D3F] hover:underline block">
                {org.phone}
              </a>
            </div>

            <div className="sm:col-span-2">
              <span className="text-slate-400 block text-[11px] font-bold uppercase mb-0.5">Official Operations Email:</span>
              <a href={`mailto:${org.email}`} className="font-semibold text-blue-600 hover:underline block">
                {org.email}
              </a>
            </div>
          </div>

          {org.notes && (
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1 text-xs">
              <span className="font-bold text-slate-700 block text-[11px] uppercase">Internal Operations & Equipment Notes:</span>
              <p className="text-slate-600 leading-relaxed">{org.notes}</p>
            </div>
          )}
        </div>

        {/* Card 2: Regional Coverage & Inspection Scope */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#154D3F] flex items-center justify-center shrink-0 font-bold">
              <MapPin className="w-4 h-4 text-[#154D3F]" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">Regional Coverage & Vehicle Scope</h2>
              <p className="text-xs text-slate-500">Service hub territories and supported audit categories</p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px] font-bold uppercase mb-1.5">
                Operational Metro Cities & Hubs ({org.cities.length}):
              </span>
              <div className="flex flex-wrap gap-2">
                {org.cities.map(city => (
                  <span
                    key={city}
                    className="px-3 py-1 rounded-xl bg-slate-100 text-slate-800 border border-slate-200 font-semibold text-xs inline-flex items-center gap-1.5"
                  >
                    <MapPin className="w-3 h-3 text-[#154D3F]" />
                    <span>{city}</span>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-slate-400 block text-[11px] font-bold uppercase mb-1.5">
                Vehicle Audit Categories:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {org.vehicleTypes.includes('car') && (
                  <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-200 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#154D3F] text-white flex items-center justify-center shrink-0">
                      <Car className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block">Used Cars (4-Wheelers)</span>
                      <span className="text-[11px] text-slate-500">OBD-II, paint depth & multi-system audit</span>
                    </div>
                  </div>
                )}

                {org.vehicleTypes.includes('bike') && (
                  <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-200 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#154D3F] text-white flex items-center justify-center shrink-0">
                      <Bike className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block">Motorcycles & Bikes (2-Wheelers)</span>
                      <span className="text-[11px] text-slate-500">Chassis alignment & engine compression</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">Turnaround SLA Commitment:</span>
              <span className="font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/80">
                ⚡ {org.slaHours} Hours Standard Lead Allocation
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Card 3: Diagnostic Instruments & Calibrated Tools */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#154D3F] flex items-center justify-center shrink-0 font-bold">
              <Wrench className="w-4 h-4 text-[#154D3F]" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Diagnostic Equipment & Calibrated Forensic Tools ({displayEquipment.length})
              </h2>
              <p className="text-xs text-slate-500">Instruments verified for physical inspection and OBD scanning</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {displayEquipment.map((tool, idx) => (
            <span
              key={idx}
              className="px-3 py-1.5 rounded-xl bg-emerald-50 text-[#154D3F] border border-emerald-200/80 text-xs font-semibold inline-flex items-center gap-1.5 shadow-2xs"
            >
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{tool}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Card 4: Assigned Field Inspectors & Qualified Mechanics */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#154D3F] flex items-center justify-center shrink-0 font-bold">
              <Users className="w-4 h-4 text-[#154D3F]" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Assigned Field Inspectors & Vehicle Mechanics ({displayInspectors.length})
              </h2>
              <p className="text-xs text-slate-500">
                Technicians dispatched on-ground to perform physical audits for this partner organization
              </p>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setIsAddInspectorOpen(true)}
            className="text-xs font-bold text-[#154D3F] border-[#154D3F]/40 hover:bg-emerald-50"
            icon={<Plus className="w-3.5 h-3.5" />}
          >
            Add Field Inspector
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {displayInspectors.map((inspector, idx) => (
            <div
              key={inspector.id}
              className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/90 relative space-y-2.5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#154D3F] text-white text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{inspector.name}</h4>
                      <p className="font-mono text-[11px] text-slate-500">{inspector.phone}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setInspectorToDelete(inspector)}
                    className="text-slate-400 hover:text-red-600 transition-colors p-1"
                    title="Remove Inspector"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200/80 text-slate-700">
                    {inspector.specialization === 'all'
                      ? 'Cars & Bikes'
                      : inspector.specialization === 'car'
                      ? 'Cars Only (4W)'
                      : 'Bikes Only (2W)'}
                  </span>
                  {inspector.experienceYears && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {inspector.experienceYears} Years Exp
                    </span>
                  )}
                </div>
              </div>

              {((inspector.certifications && inspector.certifications.length > 0) || inspector.certification) && (
                <div className="pt-2.5 border-t border-slate-200/60 space-y-1.5">
                  <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    <Award className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Certifications</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {(inspector.certifications && inspector.certifications.length > 0
                      ? inspector.certifications
                      : inspector.certification!.split(',').map(s => s.trim()).filter(Boolean)
                    ).map((cert, cIdx) => (
                      <span
                        key={cIdx}
                        className="inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-[#154D3F] border border-emerald-200/60"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Card 5: Leads Assigned to this Organization */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#154D3F] flex items-center justify-center shrink-0 font-bold">
              <ClipboardList className="w-4 h-4 text-[#154D3F]" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Leads & Inspection Orders Allocated to this Organization ({orgQueries.length})
              </h2>
              <p className="text-xs text-slate-500">Live operational inquiries fulfilled by this partner</p>
            </div>
          </div>

          <Link to="/admin/queries">
            <Button variant="outline" size="sm" className="text-xs font-bold">
              View All Global Leads &rarr;
            </Button>
          </Link>
        </div>

        {orgQueries.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200/60 text-xs text-slate-400 space-y-2">
            <ClipboardList className="w-8 h-8 text-slate-300 mx-auto" />
            <p>No customer inspection inquiries are currently assigned to this organization.</p>
            <Link to="/admin/queries">
              <Button size="sm" variant="outline" className="text-xs font-bold mt-2">
                Go to Lead Queue to Assign Leads
              </Button>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Lead ID</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Vehicle</th>
                  <th className="py-3 px-4">City</th>
                  <th className="py-3 px-4">Preferred Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orgQueries.map(q => (
                  <tr key={q.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-slate-800">{q.id}</td>
                    <td className="py-3 px-4 font-semibold text-slate-900">{q.customerName}</td>
                    <td className="py-3 px-4 text-slate-700">{q.vehicleMakeModel} ({q.vehicleYear})</td>
                    <td className="py-3 px-4 text-slate-600">{q.city}</td>
                    <td className="py-3 px-4 text-slate-600">{q.preferredDate}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        q.status === 'completed'
                          ? 'bg-emerald-100 text-[#154D3F]'
                          : q.status === 'in_progress'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {q.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link to="/admin/queries">
                        <Button size="sm" variant="outline" className="text-[11px] py-1 px-2.5">
                          Inspect Lead
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal 1: Soft Delete Confirmation for Field Inspector */}
      {inspectorToDelete && (
        <Modal
          isOpen={!!inspectorToDelete}
          onClose={() => setInspectorToDelete(null)}
          title="Remove Field Inspector?"
          subtitle="Confirm removal of this technician from the organization's field roster"
          maxWidth="md"
        >
          <div className="space-y-4 text-xs">
            <div className="p-4 bg-red-50 rounded-2xl border border-red-200/80 flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                <Trash2 className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-slate-900 text-sm">
                  Are you sure you want to remove {inspectorToDelete.name}?
                </p>
                <p className="text-slate-600 mt-1">
                  This technician ({inspectorToDelete.phone}) will no longer be listed for dispatching customer inspections under {org.name}.
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

      {/* Modal 2: Add New Inspector to this Organization */}
      {isAddInspectorOpen && (
        <Modal
          isOpen={isAddInspectorOpen}
          onClose={() => setIsAddInspectorOpen(false)}
          title="Add Field Inspector"
          subtitle={`Register a new vehicle technician for ${org.name}`}
          maxWidth="lg"
        >
          <form onSubmit={handleSaveNewInspector} className="space-y-4 text-xs">
            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                Technician Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Anand R"
                value={newInspectorName}
                onChange={e => setNewInspectorName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#154D3F] text-xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                  Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98450 11223"
                  value={newInspectorPhone}
                  onChange={e => setNewInspectorPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#154D3F] text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                  Experience (Years)
                </label>
                <div className="relative">
                  <select
                    value={newInspectorExp}
                    onChange={e => setNewInspectorExp(Number(e.target.value))}
                    className="w-full appearance-none px-3 py-2 pr-8 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#154D3F] text-xs font-semibold bg-white cursor-pointer"
                  >
                    <option value={1}>1 Year (Junior)</option>
                    <option value={2}>2 Years</option>
                    <option value={3}>3 Years (Standard)</option>
                    <option value={4}>4 Years</option>
                    <option value={5}>5 Years (Senior Tech)</option>
                    <option value={6}>6 Years</option>
                    <option value={7}>7 Years</option>
                    <option value={8}>8 Years</option>
                    <option value={9}>9 Years</option>
                    <option value={10}>10 Years (Master Tech)</option>
                    <option value={12}>12+ Years</option>
                    <option value={15}>15+ Years (Lead / Specialist)</option>
                    <option value={20}>20+ Years (Industry Veteran)</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5 text-slate-400">
                    <ChevronDown className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                Vehicle Specialization
              </label>
              <select
                value={newInspectorSpecialization}
                onChange={e => setNewInspectorSpecialization(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#154D3F] text-xs font-semibold"
              >
                <option value="all">Cars & Bikes (All Categories)</option>
                <option value="car">Cars Only (4-Wheelers)</option>
                <option value="bike">Bikes Only (2-Wheelers)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                Certifications / Credentials
              </label>
              <InspectorCertMultiSelect
                selected={newInspectorCerts}
                onChange={setNewInspectorCerts}
                placeholder="Select or type certifications..."
              />
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
              <Button variant="outline" size="sm" type="button" onClick={() => setIsAddInspectorOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" type="submit" className="font-bold">
                Add Field Technician
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
