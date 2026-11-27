import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, ExternalLink, LogOut, Menu, UserCheck, Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAppData } from '../../context/AppDataContext';

interface AdminHeaderProps {
  onToggleSidebar: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ onToggleSidebar }) => {
  const { adminUser, logoutAdmin } = useAuth();
  const { queries } = useAppData();
  const navigate = useNavigate();

  const newQueriesCount = queries.filter(q => q.status === 'new').length;

  const handleSignOut = () => {
    logoutAdmin();
    navigate('/admin/login');
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 h-16 px-3 sm:px-6 flex items-center justify-between shadow-2xs shrink-0">
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <button
          onClick={onToggleSidebar}
          aria-label="Toggle navigation menu"
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 active:bg-slate-200 transition-colors shrink-0"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-[#154D3F] text-white flex items-center justify-center font-bold shrink-0">
            <Shield className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="min-w-0">
            <span className="font-extrabold text-slate-900 text-xs sm:text-sm tracking-tight truncate block">
              SahiVahan <span className="text-[#154D3F] hidden xs:inline">Command Center</span>
            </span>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-emerald-100 text-[#154D3F] text-[10px] font-bold uppercase tracking-wider">
              Internal Ops
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        {/* Mobile Radar Bell Badge */}
        <Link
          to="/admin/queries"
          aria-label="New lead queries"
          className="sm:hidden relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <Bell className="w-5 h-5" />
          {newQueriesCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-amber-500 text-white font-bold text-[10px] flex items-center justify-center animate-pulse">
              {newQueriesCount}
            </span>
          )}
        </Link>

        {/* Desktop Unassigned Radar Pill */}
        <Link
          to="/admin/queries"
          className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
            newQueriesCount > 0
              ? 'bg-amber-100 text-amber-900 border border-amber-300 animate-pulse'
              : 'bg-slate-100 text-slate-700'
          }`}
        >
          <Bell className="w-3.5 h-3.5" />
          <span>{newQueriesCount} New Leads Awaiting Org Assignment</span>
        </Link>

        {/* Public Portal Link */}
        <Link
          to="/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#154D3F] bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 transition-colors"
        >
          <span>View Public Site</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        {/* Admin profile */}
        <div className="flex items-center gap-2 sm:gap-3 pl-2 border-l border-slate-200">
          <div className="hidden sm:block text-right">
            <p className="text-xs font-bold text-slate-900 leading-tight">
              {adminUser?.fullName || 'Operations Admin'}
            </p>
            <p className="text-[11px] text-slate-500 leading-tight">
              {adminUser?.email || 'admin@sahivahan.com'}
            </p>
          </div>
          <button
            onClick={handleSignOut}
            title="Sign Out Admin"
            aria-label="Sign Out Admin"
            className="p-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 active:bg-rose-100 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};

