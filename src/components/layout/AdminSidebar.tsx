import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  ClipboardList,
  Building2,
  PlusCircle,
  MessageSquare,
  ShieldCheck,
  X,
  LogOut,
  Car
} from 'lucide-react';
import { useAppData } from '../../context/AppDataContext';
import { useAuth } from '../../context/AuthContext';

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, onClose }) => {
  const { queries, feedbacks, organizations } = useAppData();
  const { logoutAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const newQueriesCount = queries.filter(q => q.status === 'new').length;
  const pendingFeedbacksCount = feedbacks.filter(f => f.status === 'pending_review').length;

  const navItems = [
    {
      to: '/admin/dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
      isActive: location.pathname === '/admin/dashboard' || location.pathname === '/admin'
    },
    {
      to: '/admin/queries',
      label: 'Inspection Queries',
      icon: <ClipboardList className="w-5 h-5" />,
      badge: newQueriesCount > 0 ? `${newQueriesCount}` : undefined,
      badgeColor: 'bg-amber-500 text-white',
      isActive: location.pathname.startsWith('/admin/queries')
    },
    {
      to: '/admin/organizations',
      label: 'Partner Organizations',
      icon: <Building2 className="w-5 h-5" />,
      badge: `${organizations.length}`,
      badgeColor: 'bg-slate-200 text-slate-800',
      isActive: location.pathname.startsWith('/admin/organizations') && location.pathname !== '/admin/organizations/create'
    },
    {
      to: '/admin/organizations/create',
      label: 'Onboard Organization',
      icon: <PlusCircle className="w-5 h-5" />,
      isActive: location.pathname === '/admin/organizations/create'
    },
    {
      to: '/admin/feedback',
      label: 'Customer Feedback',
      icon: <MessageSquare className="w-5 h-5" />,
      badge: pendingFeedbacksCount > 0 ? `${pendingFeedbacksCount}` : undefined,
      badgeColor: 'bg-emerald-600 text-white',
      isActive: location.pathname.startsWith('/admin/feedback')
    }
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 max-w-[85vw] bg-slate-900 text-slate-300 flex flex-col transition-transform duration-200 lg:static lg:h-screen lg:shrink-0 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand bar */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-slate-800 bg-slate-950/60 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#154D3F] border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-white text-base tracking-tight">SahiVahan</span>
              <span className="block text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                Admin Console
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto min-h-0">
          <p className="px-3 text-[11px] font-bold uppercase text-slate-500 tracking-wider mb-2">
            Operations & Leads
          </p>
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={() =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  item.isActive
                    ? 'bg-[#154D3F] text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                }`
              }
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${item.badgeColor}`}
                >
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom helper card */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/40 shrink-0">
          <div className="bg-slate-800/80 rounded-xl p-3 border border-slate-700/60 text-xs">
            <p className="font-bold text-white mb-1 flex items-center gap-1.5">
              <Car className="w-4 h-4 text-emerald-400" />
              <span>MVP Partner Mode</span>
            </p>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Leads are assigned directly to partner organizations, who allocate technicians.
            </p>
          </div>

          <button
            onClick={() => {
              logoutAdmin();
              navigate('/admin/login');
            }}
            className="mt-3 w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-slate-400 hover:text-rose-400 hover:bg-slate-800/80 rounded-xl transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

