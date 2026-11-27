import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Building2,
  PlusCircle,
  Search,
  Filter,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Car,
  Clock,
  ShieldCheck,
  ClipboardList,
  ChevronRight,
  ChevronDown,
  Wrench,
  Users,
  Pencil
} from 'lucide-react';
import { useAppData } from '../../context/AppDataContext';
import { Badge, BadgeVariant } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { Organization, OrgStatus } from '../../types';

export const AdminOrganizationsPage: React.FC = () => {
  const navigate = useNavigate();
  const { organizations, queries, updateOrganizationStatus } = useAppData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [activeOrg, setActiveOrg] = useState<Organization | null>(null);

  const filteredOrgs = organizations.filter(o => {
    const matchesSearch =
      o.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.gstin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCity = selectedCity === 'all' || o.cities.includes(selectedCity);

    return matchesSearch && matchesCity;
  });

  const getStatusBadge = (status: OrgStatus) => {
    const config: Record<OrgStatus, { label: string; variant: BadgeVariant }> = {
      active: { label: 'Active Partner', variant: 'success' },
      pending_verification: { label: 'Pending Verification', variant: 'warning' },
      inactive: { label: 'Inactive / Paused', variant: 'neutral' }
    };
    return <Badge variant={config[status].variant}>{config[status].label}</Badge>;
  };

  const handleToggleStatus = (org: Organization) => {
    const nextStatus: OrgStatus = org.status === 'active' ? 'inactive' : 'active';
    updateOrganizationStatus(org.id, nextStatus);
    if (activeOrg?.id === org.id) {
      setActiveOrg(prev => prev ? { ...prev, status: nextStatus } : null);
    }
  };

  // Get queries assigned to this active organization
  const orgQueries = activeOrg
    ? queries.filter(q => q.assignedOrgId === activeOrg.id)
    : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
            Partner Organizations
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Certified inspection and diagnostic companies that fulfill vehicle inspection leads in their respective cities.
          </p>
        </div>

        <Link to="/admin/organizations/create" className="w-full sm:w-auto">
          <Button size="sm" variant="primary" className="w-full sm:w-auto" icon={<PlusCircle className="w-4 h-4" />}>
            Onboard New Organization
          </Button>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search organizations, GSTIN or contact..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#154D3F] text-xs"
          />
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-500 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 shrink-0" />
          <span className="font-bold text-[11px] uppercase text-slate-400 shrink-0">Hub City:</span>
          <div className="relative flex-1 sm:flex-initial">
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

      {/* Mobile-Friendly Organizations Cards (< md) */}
      <div className="md:hidden space-y-3">
        {filteredOrgs.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center text-slate-400 text-xs border border-slate-200">
            No partner organizations match the search criteria.
          </div>
        ) : (
          filteredOrgs.map(org => (
            <div
              key={org.id}
              onClick={() => navigate(`/admin/organizations/${org.id}`)}
              className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs space-y-3 active:bg-slate-50 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{org.name}</h3>
                  <span className="font-mono text-[10px] text-slate-400">{org.id}</span>
                </div>
                <Badge
                  variant={org.status === 'active' ? 'success' : 'neutral'}
                  size="sm"
                >
                  {org.status}
                </Badge>
              </div>

              <div className="flex items-center justify-between text-xs py-2 border-y border-slate-100">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Contact Person</span>
                  <span className="font-bold text-slate-800">{org.contactPerson} ({org.phone})</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Assigned Leads</span>
                  <span className="font-black text-slate-900 text-sm">{org.leadCount}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {org.cities.map(c => (
                  <span
                    key={c}
                    className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-semibold"
                  >
                    {c}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/admin/organizations/${org.id}`);
                  }}
                  className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-[#E8F5EE] hover:text-[#154D3F] font-bold text-xs text-slate-700 transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>View Dossier</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/admin/organizations/${org.id}/edit`);
                  }}
                  className="px-3 py-2 rounded-xl border border-slate-200 text-slate-600 hover:text-[#154D3F] hover:border-[#154D3F] font-bold text-xs flex items-center gap-1 transition-colors"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Organizations Table (Desktop) */}
      <div className="hidden md:block bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[750px]">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-bold">
              <tr>
                <th className="py-3.5 px-6">Org ID & Name</th>
                <th className="py-3.5 px-6">GSTIN / Registration</th>
                <th className="py-3.5 px-6">Primary Contact</th>
                <th className="py-3.5 px-6">Operating Cities</th>
                <th className="py-3.5 px-6">Categories & SLA</th>
                <th className="py-3.5 px-6">Assigned Leads</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrgs.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    No partner organizations match the search criteria.
                  </td>
                </tr>
              ) : (
                filteredOrgs.map(org => (
                  <tr
                    key={org.id}
                    onClick={() => navigate(`/admin/organizations/${org.id}`)}
                    className="hover:bg-slate-50/70 transition-colors cursor-pointer group"
                  >
                    <td className="py-4 px-6">
                      <p className="font-bold text-slate-900 text-sm">{org.name}</p>
                      <span className="font-mono text-[11px] text-slate-400">{org.id}</span>
                    </td>

                    <td className="py-4 px-6 font-mono text-slate-700 font-medium">
                      {org.gstin}
                    </td>

                    <td className="py-4 px-6">
                      <p className="font-bold text-slate-900">{org.contactPerson}</p>
                      <p className="text-slate-500 text-[11px]">{org.phone}</p>
                      <p className="text-slate-400 text-[10px]">{org.email}</p>
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex flex-wrap gap-1">
                        {org.cities.map(c => (
                          <span
                            key={c}
                            className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-semibold"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="space-y-0.5">
                        <span className="text-[11px] font-bold text-emerald-800 uppercase">
                          {org.vehicleTypes.join(', ')}
                        </span>
                        <p className="text-slate-500 text-[11px] flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>{org.slaHours}h Turnaround</span>
                        </p>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <p className="font-black text-slate-900 text-sm">{org.leadCount} leads</p>
                      <p className="text-emerald-700 text-[11px] font-bold">{org.completedCount} completed</p>
                    </td>

                    <td className="py-4 px-6">
                      {getStatusBadge(org.status)}
                    </td>

                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/admin/organizations/${org.id}`);
                          }}
                        >
                          Inspect Dossier &rarr;
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="p-2 text-slate-500 hover:text-[#154D3F] border-slate-200"
                          title="Edit Organization"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/admin/organizations/${org.id}/edit`);
                          }}
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Organization Details Modal */}
      {activeOrg && (
        <Modal
          isOpen={!!activeOrg}
          onClose={() => setActiveOrg(null)}
          title={
            <div className="flex items-center gap-3">
              <span className="font-bold text-slate-900 text-lg">{activeOrg.name}</span>
              {getStatusBadge(activeOrg.status)}
            </div>
          }
          subtitle={`Partner ID: ${activeOrg.id} • Registered on ${activeOrg.createdAt}`}
          maxWidth="3xl"
        >
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2">
                <h4 className="font-bold text-slate-900 text-sm">Business & Contact Info</h4>
                <div>
                  <span className="text-slate-500 block">GSTIN:</span>
                  <span className="font-mono font-bold text-slate-800">{activeOrg.gstin}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Primary Contact Person:</span>
                  <span className="font-bold text-slate-900">{activeOrg.contactPerson} ({activeOrg.designation || 'Lead'})</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Phone & WhatsApp:</span>
                  <a href={`tel:${activeOrg.phone}`} className="font-bold text-slate-900 hover:underline">
                    {activeOrg.phone}
                  </a>
                </div>
                <div>
                  <span className="text-slate-500 block">Operations Email:</span>
                  <a href={`mailto:${activeOrg.email}`} className="font-medium text-blue-600 hover:underline">
                    {activeOrg.email}
                  </a>
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2">
                <h4 className="font-bold text-slate-900 text-sm">Capabilities & Hubs</h4>
                <div>
                  <span className="text-slate-500 block">Operational Hubs:</span>
                  <span className="font-bold text-slate-900">{activeOrg.cities.join(', ')}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Vehicle Categories Covered:</span>
                  <span className="font-bold text-emerald-800 uppercase">{activeOrg.vehicleTypes.join(', ')}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">SLA Commitment:</span>
                  <span className="font-bold text-slate-900">{activeOrg.slaHours} Hours Response</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Performance:</span>
                  <span className="font-bold text-slate-900">{activeOrg.leadCount} Leads Assigned • {activeOrg.completedCount} Completed</span>
                </div>
              </div>
            </div>

            {activeOrg.equipment && activeOrg.equipment.length > 0 && (
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2 text-xs">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  <Wrench className="w-4 h-4 text-[#154D3F]" />
                  <span>Diagnostic Equipment & Certified Tools ({activeOrg.equipment.length})</span>
                </h4>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {activeOrg.equipment.map((eq, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-xl bg-emerald-50 text-[#154D3F] border border-emerald-200/70 text-xs font-semibold inline-flex items-center gap-1"
                    >
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{eq}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {activeOrg.inspectors && activeOrg.inspectors.length > 0 && (
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2 text-xs">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-[#154D3F]" />
                  <span>Assigned Field Inspectors & Mechanics ({activeOrg.inspectors.length})</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {activeOrg.inspectors.map(ins => (
                    <div
                      key={ins.id}
                      className="p-3 bg-white rounded-xl border border-slate-200 flex items-start justify-between gap-2"
                    >
                      <div>
                        <span className="font-bold text-slate-900 block text-xs">{ins.name}</span>
                        <span className="text-[11px] text-slate-500 font-mono">{ins.phone}</span>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                            {ins.specialization === 'all' ? 'Cars & Bikes' : ins.specialization === 'car' ? 'Cars Only' : 'Bikes Only'}
                          </span>
                          {ins.experienceYears && (
                            <span className="text-[10px] text-slate-500">
                              {ins.experienceYears}y exp
                            </span>
                          )}
                        </div>
                      </div>
                      {ins.certification && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-[#154D3F] border border-emerald-200 text-right shrink-0">
                          {ins.certification}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeOrg.notes && (
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                <span className="font-bold text-slate-700 block mb-1">Internal Operations Notes:</span>
                <p className="text-slate-600 leading-relaxed">{activeOrg.notes}</p>
              </div>
            )}

            {/* Leads Assigned to this Org */}
            <div>
              <h4 className="font-bold text-sm text-slate-900 mb-2 flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-[#154D3F]" />
                <span>Leads Assigned to This Organization ({orgQueries.length})</span>
              </h4>
              {orgQueries.length === 0 ? (
                <p className="text-xs text-slate-400 p-3 bg-slate-50 rounded-xl">
                  No active leads have been assigned to this organization yet.
                </p>
              ) : (
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {orgQueries.map(q => (
                    <div key={q.id} className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-mono font-bold text-slate-900 mr-2">{q.id}</span>
                        <span className="font-semibold text-slate-800">{q.vehicleMakeModel}</span>
                        <span className="text-slate-400 text-[11px] block">{q.city} • {q.preferredDate}</span>
                      </div>
                      <Badge variant="brand" size="sm">{q.status}</Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-100 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
              <Button
                variant={activeOrg.status === 'active' ? 'danger' : 'primary'}
                size="sm"
                className="w-full sm:w-auto"
                onClick={() => handleToggleStatus(activeOrg)}
              >
                {activeOrg.status === 'active' ? 'Pause / Deactivate Organization' : 'Activate Organization'}
              </Button>

              <Button variant="outline" className="w-full sm:w-auto" onClick={() => setActiveOrg(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

