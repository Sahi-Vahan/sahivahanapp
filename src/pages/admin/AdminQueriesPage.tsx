import React, { useState } from 'react';
import {
  ClipboardList,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Building2,
  Phone,
  Mail,
  MapPin,
  Car,
  AlertCircle,
  ExternalLink,
  MessageCircle,
  Calendar,
  Save,
  UserCheck,
  X,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import { useAppData } from '../../context/AppDataContext';
import { Badge, BadgeVariant } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { InspectionQuery, QueryStatus } from '../../types';

export const AdminQueriesPage: React.FC = () => {
  const { queries, organizations, assignQueryToOrg, updateQueryStatus, updateQueryNotes } = useAppData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedCity, setSelectedCity] = useState<string>('all');

  // Modal State
  const [activeQuery, setActiveQuery] = useState<InspectionQuery | null>(null);
  const [selectedOrgId, setSelectedOrgId] = useState<string>('');
  const [assignmentNote, setAssignmentNote] = useState('');
  const [targetStatus, setTargetStatus] = useState<QueryStatus>('new');
  const [adminNotesText, setAdminNotesText] = useState('');
  const [actionSuccessMsg, setActionSuccessMsg] = useState('');

  const filteredQueries = queries.filter(q => {
    const matchesSearch =
      q.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.customerPhone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.vehicleMakeModel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (q.vehicleRegNumber && q.vehicleRegNumber.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = selectedStatus === 'all' || q.status === selectedStatus;
    const matchesCity = selectedCity === 'all' || q.city === selectedCity;

    return matchesSearch && matchesStatus && matchesCity;
  });

  const getStatusBadge = (status: QueryStatus) => {
    const config: Record<QueryStatus, { label: string; variant: BadgeVariant }> = {
      new: { label: 'New Lead', variant: 'warning' },
      assigned: { label: 'Assigned to Org', variant: 'info' },
      in_progress: { label: 'In Progress', variant: 'brand' },
      completed: { label: 'Completed', variant: 'success' },
      cancelled: { label: 'Cancelled', variant: 'neutral' }
    };
    return <Badge variant={config[status].variant}>{config[status].label}</Badge>;
  };

  const openQueryModal = (query: InspectionQuery) => {
    setActiveQuery(query);
    setSelectedOrgId(query.assignedOrgId || '');
    setTargetStatus(query.status);
    setAdminNotesText(query.adminNotes || '');
    setAssignmentNote('');
    setActionSuccessMsg('');
  };

  const handleAssignOrg = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeQuery || !selectedOrgId) return;

    assignQueryToOrg(activeQuery.id, selectedOrgId, assignmentNote);
    setActionSuccessMsg('Lead successfully assigned to partner organization!');

    // Update active modal query locally
    const org = organizations.find(o => o.id === selectedOrgId);
    setActiveQuery(prev => prev ? {
      ...prev,
      assignedOrgId: selectedOrgId,
      assignedOrgName: org?.name,
      status: 'assigned',
      adminNotes: assignmentNote ? (prev.adminNotes ? `${prev.adminNotes}\n${assignmentNote}` : assignmentNote) : prev.adminNotes
    } : null);
  };

  const handleStatusUpdate = () => {
    if (!activeQuery) return;
    updateQueryStatus(activeQuery.id, targetStatus);
    setActionSuccessMsg(`Status updated to ${targetStatus}!`);
    setActiveQuery(prev => prev ? { ...prev, status: targetStatus } : null);
  };

  const handleSaveNotes = () => {
    if (!activeQuery) return;
    updateQueryNotes(activeQuery.id, adminNotesText);
    setActionSuccessMsg('Admin internal notes saved successfully!');
    setActiveQuery(prev => prev ? { ...prev, adminNotes: adminNotesText } : null);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
            Inspection Queries & Leads
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Review incoming customer inquiries, assign them to partner organizations, and update progress.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by ID, customer, vehicle or phone..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#154D3F] text-xs"
          />
        </div>

        <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 sm:gap-3 w-full md:w-auto">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 text-xs text-slate-500">
            <span className="font-bold text-[11px] uppercase text-slate-400 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Status:
            </span>
            <div className="relative w-full sm:w-auto">
              <select
                value={selectedStatus}
                onChange={e => setSelectedStatus(e.target.value)}
                className="w-full appearance-none px-2.5 py-1.5 pr-8 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-[#154D3F]"
              >
                <option value="all">All ({queries.length})</option>
                <option value="new">New Leads</option>
                <option value="assigned">Assigned</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5 text-slate-400">
                <ChevronDown className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-1 text-xs text-slate-500">
            <span className="font-bold text-[11px] uppercase text-slate-400 flex items-center gap-1">
              <MapPin className="w-3 h-3" /> City:
            </span>
            <div className="relative w-full sm:w-auto">
              <select
                value={selectedCity}
                onChange={e => setSelectedCity(e.target.value)}
                className="w-full appearance-none px-2.5 py-1.5 pr-8 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-[#154D3F]"
              >
                <option value="all">All Cities</option>
                <option value="Bengaluru">Bengaluru</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Delhi NCR">Delhi NCR</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Pune">Pune</option>
                <option value="Chennai">Chennai</option>
                <option value="Chandigarh">Chandigarh</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5 text-slate-400">
                <ChevronDown className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile-Friendly Lead Cards (Visible on screens < md) */}
      <div className="md:hidden space-y-3">
        {filteredQueries.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center text-slate-400 text-xs border border-slate-200">
            No inspection queries match the selected filters.
          </div>
        ) : (
          filteredQueries.map(q => (
            <div
              key={q.id}
              onClick={() => openQueryModal(q)}
              className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs space-y-3 active:bg-slate-50 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-xs text-slate-900">{q.id}</span>
                {getStatusBadge(q.status)}
              </div>

              <div>
                <p className="font-bold text-slate-900 text-sm">{q.vehicleMakeModel} ({q.vehicleYear})</p>
                <p className="text-xs text-slate-500 mt-0.5">{q.serviceName} • {q.city}</p>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                <div>
                  <span className="font-semibold text-slate-800 block">{q.customerName}</span>
                  <span className="text-[11px] text-slate-500">{q.customerPhone}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Assigned To</span>
                  <span className="font-bold text-[#154D3F] text-xs">
                    {q.assignedOrgName || 'Unassigned'}
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-[#E8F5EE] hover:text-[#154D3F] font-bold text-xs text-slate-700 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>{q.status === 'new' ? 'Assign Lead to Org' : 'Manage Lead'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Desktop Queries Table (Hidden on screens < md) */}
      <div className="hidden md:block bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[750px]">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-bold">
              <tr>
                <th className="py-3.5 px-6">Inquiry ID</th>
                <th className="py-3.5 px-6">Customer Details</th>
                <th className="py-3.5 px-6">Vehicle & Package</th>
                <th className="py-3.5 px-6">City & Slot</th>
                <th className="py-3.5 px-6">Assigned Organization</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredQueries.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No inspection queries match the selected filters.
                  </td>
                </tr>
              ) : (
                filteredQueries.map(q => (
                  <tr
                    key={q.id}
                    onClick={() => openQueryModal(q)}
                    className="hover:bg-slate-50/70 transition-colors cursor-pointer group"
                  >
                    <td className="py-4 px-6 font-mono font-bold text-slate-900">
                      {q.id}
                    </td>

                    <td className="py-4 px-6">
                      <p className="font-bold text-slate-900">{q.customerName}</p>
                      <p className="text-slate-500 text-[11px]">{q.customerPhone}</p>
                      <p className="text-slate-400 text-[10px]">{q.customerEmail}</p>
                    </td>

                    <td className="py-4 px-6">
                      <p className="font-bold text-slate-900">{q.vehicleMakeModel}</p>
                      <p className="text-slate-500 text-[11px]">
                        {q.vehicleYear} {q.vehicleRegNumber ? `• ${q.vehicleRegNumber}` : ''}
                      </p>
                      <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-sm inline-block mt-1">
                        {q.serviceName}
                      </span>
                    </td>

                    <td className="py-4 px-6">
                      <p className="font-semibold text-slate-800">{q.city}</p>
                      <p className="text-slate-500 text-[11px]">{q.preferredDate}</p>
                      {q.preferredTimeSlot && <p className="text-slate-400 text-[10px]">{q.preferredTimeSlot}</p>}
                    </td>

                    <td className="py-4 px-6">
                      {q.assignedOrgName ? (
                        <div className="flex items-center gap-1.5 text-slate-900 font-semibold">
                          <Building2 className="w-3.5 h-3.5 text-[#154D3F]" />
                          <span>{q.assignedOrgName}</span>
                        </div>
                      ) : (
                        <span className="text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md text-[11px] font-bold border border-amber-200">
                          Unassigned (Pending)
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-6">
                      {getStatusBadge(q.status)}
                    </td>

                    <td className="py-4 px-6 text-right">
                      <Button
                        size="sm"
                        variant={q.status === 'new' ? 'primary' : 'outline'}
                        onClick={(e) => {
                          e.stopPropagation();
                          openQueryModal(q);
                        }}
                      >
                        {q.status === 'new' ? 'Assign Lead' : 'View / Edit'}
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Popup with Full Details and Action Buttons */}
      {activeQuery && (
        <Modal
          isOpen={!!activeQuery}
          onClose={() => setActiveQuery(null)}
          title={
            <div className="flex items-center gap-3">
              <span className="font-mono text-base font-bold text-slate-900">{activeQuery.id}</span>
              {getStatusBadge(activeQuery.status)}
            </div>
          }
          subtitle={`Submitted by ${activeQuery.customerName} on ${new Date(activeQuery.createdAt).toLocaleString()}`}
          maxWidth="3xl"
        >
          <div className="space-y-6">
            {/* Feedback Alert if action occurred */}
            {actionSuccessMsg && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{actionSuccessMsg}</span>
              </div>
            )}

            {/* Dossier Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Vehicle & Inspection Info */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2.5">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Car className="w-4 h-4 text-[#154D3F]" />
                  <span>Vehicle & Inspection Package</span>
                </h4>
                <div>
                  <span className="text-slate-500 block">Vehicle Model:</span>
                  <span className="font-bold text-slate-900 text-sm">{activeQuery.vehicleMakeModel} ({activeQuery.vehicleYear})</span>
                </div>
                {activeQuery.vehicleRegNumber && (
                  <div>
                    <span className="text-slate-500 block">Registration Number:</span>
                    <span className="font-mono font-bold text-slate-800">{activeQuery.vehicleRegNumber}</span>
                  </div>
                )}
                <div>
                  <span className="text-slate-500 block">Service Requested:</span>
                  <span className="font-bold text-[#154D3F]">{activeQuery.serviceName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Inspection Location / Address:</span>
                  <span className="font-medium text-slate-800">{activeQuery.inspectionAddress}, {activeQuery.city}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Preferred Date:</span>
                  <span className="font-medium text-slate-800">
                    {activeQuery.preferredDate}
                    {activeQuery.preferredTimeSlot ? ` (${activeQuery.preferredTimeSlot})` : ''}
                  </span>
                </div>
                {activeQuery.sellerName && (
                  <div className="pt-2 border-t border-slate-200">
                    <span className="text-slate-500 block">Seller / Workshop Info:</span>
                    <span className="font-semibold text-slate-800">
                      {activeQuery.sellerName}
                      {activeQuery.sellerType ? ` • ${activeQuery.sellerType}` : ''}
                      {activeQuery.sellerPhone ? ` • Tel: ${activeQuery.sellerPhone}` : ''}
                    </span>
                  </div>
                )}
              </div>

              {/* Customer Contact & Notes */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2.5">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-[#154D3F]" />
                  <span>Customer Contact Details</span>
                </h4>
                <div>
                  <span className="text-slate-500 block">Customer Name:</span>
                  <span className="font-bold text-slate-900">{activeQuery.customerName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Email Address:</span>
                  <a href={`mailto:${activeQuery.customerEmail}`} className="font-medium text-blue-600 hover:underline">
                    {activeQuery.customerEmail}
                  </a>
                </div>
                <div>
                  <span className="text-slate-500 block">Phone Number:</span>
                  <a href={`tel:${activeQuery.customerPhone}`} className="font-bold text-slate-900 hover:underline">
                    {activeQuery.customerPhone}
                  </a>
                </div>

                {/* Quick Contact Links */}
                <div className="pt-2 flex items-center gap-2">
                  <a
                    href={`https://wa.me/${activeQuery.customerPhone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-[11px] hover:bg-emerald-700 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href={`tel:${activeQuery.customerPhone}`}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 text-white font-bold text-[11px] hover:bg-slate-700 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Customer</span>
                  </a>
                </div>

                {activeQuery.customerNotes && (
                  <div className="pt-2 border-t border-slate-200">
                    <span className="text-slate-500 block">Customer Special Notes:</span>
                    <p className="text-slate-700 italic bg-white p-2 rounded-lg border border-slate-200 mt-1">
                      "{activeQuery.customerNotes}"
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* ACTION SECTION 1: Assign to Partner Organization */}
            <div className="bg-emerald-50/60 rounded-2xl p-5 border border-emerald-200 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-[#154D3F] flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    <span>Assign Lead to Partner Organization</span>
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {activeQuery.assignedOrgName ? (
                      <span>Currently Assigned: <strong>{activeQuery.assignedOrgName}</strong></span>
                    ) : (
                      <span className="text-amber-800 font-semibold">Not assigned yet. Select a partner organization to dispatch.</span>
                    )}
                  </p>
                </div>
              </div>

              <form onSubmit={handleAssignOrg} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                      Select Organization *
                    </label>
                    <div className="relative">
                      <select
                        value={selectedOrgId}
                        onChange={e => setSelectedOrgId(e.target.value)}
                        className="w-full appearance-none px-3 py-2 pr-10 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#154D3F] text-xs bg-white font-semibold"
                      >
                        <option value="">-- Choose Partner Organization --</option>
                        {organizations.map(org => {
                          const isCityMatch = org.cities.some(c => c.toLowerCase() === activeQuery.city.toLowerCase());
                          return (
                            <option key={org.id} value={org.id}>
                              {org.name} ({org.cities.join(', ')}) {isCityMatch ? '★ Regional Hub' : ''}
                            </option>
                          );
                        })}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                      Dispatch Notes for Organization
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Inspector Suresh allocated for 2 PM slot"
                      value={assignmentNote}
                      onChange={e => setAssignmentNote(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#154D3F] text-xs bg-white"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  size="sm"
                  variant="primary"
                  disabled={!selectedOrgId}
                  className="w-full sm:w-auto font-bold"
                >
                  {activeQuery.assignedOrgId ? 'Reassign to Selected Organization' : 'Assign Lead to Organization'}
                </Button>
              </form>
            </div>

            {/* ACTION SECTION 2: Status Management & Ops Notes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-3">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                  Update Lead Status
                </h4>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <div className="relative w-full sm:flex-1">
                    <select
                      value={targetStatus}
                      onChange={e => setTargetStatus(e.target.value as QueryStatus)}
                      className="w-full appearance-none px-3 py-2 pr-10 rounded-xl border border-slate-300 bg-white text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-[#154D3F]"
                    >
                      <option value="new">New Lead</option>
                      <option value="assigned">Assigned to Org</option>
                      <option value="in_progress">Inspection In Progress</option>
                      <option value="completed">Inspection Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="w-full sm:w-auto shrink-0" onClick={handleStatusUpdate}>
                    Save Status
                  </Button>
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-3">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                  Internal Operations Notes
                </h4>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <input
                    type="text"
                    placeholder="Log audit status, customer follow-up..."
                    value={adminNotesText}
                    onChange={e => setAdminNotesText(e.target.value)}
                    className="w-full sm:flex-1 px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs"
                  />
                  <Button size="sm" variant="outline" className="w-full sm:w-auto shrink-0" onClick={handleSaveNotes} icon={<Save className="w-3.5 h-3.5" />}>
                    Save
                  </Button>
                </div>
              </div>
            </div>

            {/* Footer close */}
            <div className="pt-2 flex justify-end">
              <Button variant="outline" className="w-full sm:w-auto" onClick={() => setActiveQuery(null)}>
                Close Modal
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

