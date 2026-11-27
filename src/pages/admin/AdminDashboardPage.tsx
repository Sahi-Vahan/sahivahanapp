import React from 'react';
import { Link } from 'react-router-dom';
import {
  ClipboardList,
  Building2,
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  Clock,
  ArrowRight,
  PlusCircle,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  MapPin,
  Star
} from 'lucide-react';
import { useAppData } from '../../context/AppDataContext';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

export const AdminDashboardPage: React.FC = () => {
  const { queries, organizations, feedbacks } = useAppData();

  const newQueries = queries.filter(q => q.status === 'new');
  const assignedQueries = queries.filter(q => q.status === 'assigned' || q.status === 'in_progress');
  const completedQueries = queries.filter(q => q.status === 'completed');
  const pendingFeedbacks = feedbacks.filter(f => f.status === 'pending_review');

  const activeOrgs = organizations.filter(o => o.status === 'active');

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
            Operations Command Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5 sm:mt-1">
            Dispatch inspection leads to partner organizations and oversee vehicle audit SLAs.
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <Link to="/admin/organizations/create" className="flex-1 sm:flex-initial">
            <Button size="sm" variant="outline" className="w-full text-xs" icon={<PlusCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}>
              Onboard Org
            </Button>
          </Link>
          <Link to="/admin/queries" className="flex-1 sm:flex-initial">
            <Button size="sm" variant="primary" className="w-full text-xs" icon={<ClipboardList className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}>
              View All Queries
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Stats Cards - Compact 2x2 grid on mobile, 4-col on desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
        <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between gap-1">
            <span className="text-[10px] sm:text-xs font-bold uppercase text-slate-400 tracking-wider truncate">
              Total Leads
            </span>
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <ClipboardList className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
          <p className="text-xl sm:text-3xl font-black text-slate-900 my-1 sm:my-1.5">{queries.length}</p>
          <p className="text-[10px] sm:text-xs text-slate-500 truncate">
            <span className="text-emerald-700 font-bold">{completedQueries.length} Done</span>
            <span className="hidden xs:inline"> • {assignedQueries.length} Active</span>
          </p>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-amber-200 shadow-xs bg-gradient-to-br from-white to-amber-50/40 flex flex-col justify-between">
          <div className="flex items-center justify-between gap-1">
            <span className="text-[10px] sm:text-xs font-bold uppercase text-amber-700 tracking-wider truncate">
              Needs Action
            </span>
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold shrink-0">
              <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
          <p className="text-xl sm:text-3xl font-black text-amber-900 my-1 sm:my-1.5">{newQueries.length}</p>
          <Link
            to="/admin/queries"
            className="text-[10px] sm:text-xs text-amber-700 font-bold hover:underline inline-flex items-center gap-0.5 truncate"
          >
            <span>Assign leads</span>
            <ArrowRight className="w-3 h-3 shrink-0" />
          </Link>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between gap-1">
            <span className="text-[10px] sm:text-xs font-bold uppercase text-slate-400 tracking-wider truncate">
              Partner Orgs
            </span>
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
              <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
          <p className="text-xl sm:text-3xl font-black text-slate-900 my-1 sm:my-1.5">{organizations.length}</p>
          <p className="text-[10px] sm:text-xs text-slate-500 truncate">
            <span className="text-emerald-700 font-bold">{activeOrgs.length} Active</span>
            <span className="hidden xs:inline"> (7 Hubs)</span>
          </p>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between gap-1">
            <span className="text-[10px] sm:text-xs font-bold uppercase text-slate-400 tracking-wider truncate">
              Reviews QA
            </span>
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
              <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
          <p className="text-xl sm:text-3xl font-black text-slate-900 my-1 sm:my-1.5">{pendingFeedbacks.length}</p>
          <Link
            to="/admin/feedback"
            className="text-[10px] sm:text-xs text-purple-700 font-bold hover:underline inline-flex items-center gap-0.5 truncate"
          >
            <span>Moderate</span>
            <ArrowRight className="w-3 h-3 shrink-0" />
          </Link>
        </div>
      </div>

      {/* Leads Awaiting Allocation Banner / Alert */}
      {newQueries.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="flex items-start sm:items-center gap-2.5">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 mt-0.5 sm:mt-0 shadow-xs">
                <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <h3 className="text-xs sm:text-base font-bold text-amber-950">
                  {newQueries.length} Lead{newQueries.length > 1 ? 's' : ''} Awaiting Partner Assignment
                </h3>
                <p className="text-[11px] sm:text-xs text-amber-800 mt-0.5">
                  Customers awaiting dispatch confirmation to regional partner organizations.
                </p>
              </div>
            </div>

            <Link to="/admin/queries" className="w-full sm:w-auto shrink-0">
              <Button size="sm" className="w-full sm:w-auto bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs">
                Open Lead Queue &rarr;
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-1">
            {newQueries.slice(0, 2).map(q => (
              <div key={q.id} className="bg-white p-3 rounded-xl sm:rounded-2xl border border-amber-200/80 text-xs space-y-1.5 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-[11px] text-slate-800">{q.id}</span>
                  <Badge variant="warning" size="sm">New Lead</Badge>
                </div>
                <p className="font-bold text-xs sm:text-sm text-slate-900 truncate">{q.vehicleMakeModel} ({q.vehicleYear})</p>
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span className="truncate">Customer: {q.customerName}</span>
                  <span className="font-semibold text-slate-700 shrink-0 ml-2">{q.city}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Two Column Layout: Partner Organizations & Recent Feedback */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8">
        {/* Partner Organizations Section */}
        <div className="lg:col-span-7 bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">Partner Organizations</h2>
              <p className="text-xs text-slate-500">
                Regional dispatch partners
              </p>
            </div>
            <Link
              to="/admin/organizations"
              className="text-xs font-bold text-[#154D3F] hover:underline inline-flex items-center gap-1 shrink-0 whitespace-nowrap bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200/70 hover:bg-emerald-100 transition-colors"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-2.5">
            {organizations.slice(0, 4).map(org => (
              <Link
                key={org.id}
                to={`/admin/organizations/${org.id}`}
                className="p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-100 hover:border-emerald-200 bg-slate-50/60 hover:bg-emerald-50/20 transition-all flex items-center justify-between gap-3 text-xs group block"
              >
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-[#154D3F] transition-colors truncate">
                      {org.name}
                    </span>
                    <Badge
                      variant={org.status === 'active' ? 'success' : 'neutral'}
                      size="sm"
                    >
                      {org.status}
                    </Badge>
                  </div>
                  <p className="text-slate-500 text-[11px] truncate">
                    Lead: <strong className="text-slate-700">{org.contactPerson}</strong> ({org.phone}) • SLA: <strong className="text-slate-700">{org.slaHours}h</strong>
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-slate-400 truncate">
                    Hubs: {org.cities.join(', ')}
                  </p>
                </div>

                <div className="text-right shrink-0 pl-2.5 border-l border-slate-200/70">
                  <span className="text-base sm:text-lg font-black text-slate-900 group-hover:text-[#154D3F] block">
                    {org.leadCount}
                  </span>
                  <span className="text-[9px] sm:text-[10px] uppercase font-bold text-slate-400 block whitespace-nowrap">
                    Leads
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Actions & Recent Feedback */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-xs space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">Operations Shortcuts</h2>
            
            <div className="space-y-2">
              <Link
                to="/admin/organizations/create"
                className="flex items-center justify-between p-3 rounded-xl sm:rounded-2xl bg-emerald-50/60 hover:bg-emerald-50 border border-emerald-100 transition-colors"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <PlusCircle className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-900 truncate">Onboard New Partner Org</span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#154D3F] shrink-0" />
              </Link>

              <Link
                to="/admin/queries"
                className="flex items-center justify-between p-3 rounded-xl sm:rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center shrink-0">
                    <ClipboardList className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-900 truncate">Lead Queue & Dispatches</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 shrink-0" />
              </Link>

              <Link
                to="/admin/feedback"
                className="flex items-center justify-between p-3 rounded-xl sm:rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center shrink-0">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-900 truncate">Customer Review Moderation</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 shrink-0" />
              </Link>
            </div>
          </div>

          {/* Recent Reviews Activity in Admin */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">Incoming Reviews</h2>
                <p className="text-[11px] text-slate-400">Live review moderation queue</p>
              </div>
              <Link
                to="/admin/feedback"
                className="text-xs font-bold text-[#154D3F] hover:underline inline-flex items-center gap-1 shrink-0 whitespace-nowrap bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/60 transition-colors"
              >
                <span>Moderate ({feedbacks.length})</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="space-y-2">
              {feedbacks.slice(0, 3).map(f => (
                <div key={f.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1 text-xs">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1 text-amber-500 font-bold shrink-0">
                      {[...Array(f.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                      <span className="text-slate-800 ml-1 font-bold">{f.rating}.0</span>
                    </div>
                    <span className={`text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                      f.status === 'approved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : f.status === 'pending_review'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      {f.status === 'approved' ? 'Approved' : f.status === 'pending_review' ? 'Pending QA' : 'Rejected'}
                    </span>
                  </div>
                  <p className="font-bold text-slate-900 truncate">"{f.title}"</p>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
                    <span className="truncate">{f.customerName}</span>
                    <span className="shrink-0 text-[10px] text-slate-400">{f.city}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Architecture Note */}
          <div className="bg-slate-900 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 space-y-2 border border-slate-800">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Phase 1 MVP Architecture
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              In this initial release, individual technicians are managed directly by regional partner organizations. SahiVahan operates as the central command hub.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

