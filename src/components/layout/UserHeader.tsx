import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ShieldCheck,
  Menu,
  X,
  PhoneCall,
  User as UserIcon,
  LogOut,
  Sparkles,
  Shield,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../common/Button';

export const UserHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isUserAuthenticated, logoutUser, switchDemoUser } = useAuth();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Reviews', path: '/reviews' },
    { label: 'Blogs & Guides', path: '/blogs' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top Banner Notice */}
      <div className="bg-[#0A261F] text-emerald-100 text-[11px] py-1.5 px-3 sm:px-4 border-b border-emerald-900/40">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[10px] uppercase tracking-wider border border-emerald-400/30 shrink-0">
              <ShieldCheck className="w-3 h-3 text-emerald-400" /> 100% Unbiased
            </span>
            <span className="hidden sm:inline font-medium text-emerald-100/90 text-xs truncate">
              Sahi Gaadi. Sahi Faisla. · India's Certified Pre-Purchase Car & Bike Inspection Network
            </span>
            <span className="sm:hidden font-medium text-emerald-100/90 text-[11px] truncate">
              Sahi Gaadi. Sahi Faisla.
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs font-semibold shrink-0">
            <a
              href="tel:18001234567"
              className="hidden sm:flex items-center gap-1.5 text-emerald-200 hover:text-white transition-colors"
            >
              <PhoneCall className="w-3 h-3 text-emerald-400" />
              <span>1800-123-SAHI</span>
            </a>
            <span className="hidden sm:inline text-emerald-800">|</span>
            <Link
              to="/admin/dashboard"
              className="inline-flex items-center gap-1 text-emerald-300 hover:text-white transition-colors text-[11px] sm:text-xs font-bold"
            >
              <Shield className="w-3 h-3" />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 rounded-2xl bg-[#E8F5EE] border border-[#CBEAD8] flex items-center justify-center text-[#154D3F] shadow-xs group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5 text-[#154D3F] stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-extrabold tracking-tight text-slate-900 leading-none">
                Sahi<span className="text-[#154D3F]">Vahan</span>
              </span>
              <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider mt-0.5">
                Sahi Gaadi. Sahi Faisla.
              </span>
            </div>
          </Link>

          {/* Centered Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive(link.path)
                    ? 'bg-[#E8F5EE] text-[#154D3F] font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* User Auth & Action */}
          <div className="hidden sm:flex items-center gap-3">
            {isUserAuthenticated && user ? (
              <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200">
                <div className="w-6 h-6 rounded-full bg-[#154D3F] text-white text-[11px] font-bold flex items-center justify-center">
                  {user.fullName.charAt(0).toUpperCase()}
                </div>
                <span className="text-xs font-bold text-slate-800">{user.fullName.split(' ')[0]}</span>
                <button
                  onClick={logoutUser}
                  title="Sign Out"
                  className="p-1 text-slate-400 hover:text-rose-600 rounded-full transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <span className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-full hover:bg-slate-100 transition-colors">
                    Customer Login
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={() => switchDemoUser('user')}
                  className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-2.5 py-1 rounded-full transition-colors flex items-center gap-1"
                  title="Quick Demo Customer"
                >
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  <span>Demo User</span>
                </button>
              </div>
            )}

            <Link to="/inquire">
              <Button size="sm" variant="primary" className="font-bold text-xs">
                Submit Query
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Link to="/inquire">
              <button
                type="button"
                className="px-3 py-1.5 rounded-full bg-[#154D3F] text-white text-xs font-bold hover:bg-[#0e352b] transition-colors shadow-xs"
              >
                Inquire
              </button>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-1 shadow-lg animate-in slide-in-from-top-2 duration-150">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                isActive(link.path)
                  ? 'bg-[#E8F5EE] text-[#154D3F] font-bold shadow-xs'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span>{link.label}</span>
              {isActive(link.path) && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#154D3F]" />
              )}
            </Link>
          ))}

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            {/* Toll-Free Hotline in mobile drawer */}
            <a
              href="tel:18001234567"
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
              <span>Call Helpline: 1800-123-SAHI (Toll-Free)</span>
            </a>

            {isUserAuthenticated && user ? (
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#154D3F] text-white flex items-center justify-center font-bold text-xs">
                    {user.fullName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">{user.fullName}</p>
                    <p className="text-[10px] text-slate-500">{user.email}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={logoutUser} className="text-rose-600 text-xs">
                  Sign Out
                </Button>
              </div>
            ) : (
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" size="sm" className="w-full font-bold">
                  Customer Sign In
                </Button>
              </Link>
            )}

            <Link
              to="/admin/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs text-center font-bold text-[#154D3F] bg-[#E8F5EE] hover:bg-[#d8efe2] py-2.5 rounded-xl transition-colors"
            >
              Admin Operations Center &rarr;
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
