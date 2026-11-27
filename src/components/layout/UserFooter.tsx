import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, PhoneCall, Mail, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';

export const UserFooter: React.FC = () => {
  return (
    <footer className="bg-[#0A0E12] text-slate-400 pt-10 sm:pt-16 pb-8 sm:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 pb-8 sm:pb-12 border-b border-slate-800">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-white">
                  Sahi<span className="text-emerald-400">Vahan</span>
                </span>
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Sahi Gaadi. Sahi Faisla.
                </p>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              India's first certified independent pre-purchase vehicle inspection network. We empower used car & bike buyers with unbiased, forensic vehicle evaluations.
            </p>

            <div className="flex flex-col gap-2 pt-2 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>100% Independent — Zero dealership commissions</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>ASDC Certified partner organization inspectors</span>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-emerald-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-emerald-400 transition-colors">
                  Inspection Services
                </Link>
              </li>
              <li>
                <Link to="/inquire" className="hover:text-emerald-400 transition-colors">
                  Submit Inspection Query
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="hover:text-emerald-400 transition-colors">
                  Customer Reviews
                </Link>
              </li>
              <li>
                <Link to="/feedback" className="hover:text-emerald-400 transition-colors">
                  Submit Feedback
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="hover:text-emerald-400 transition-colors">
                  Automotive Guides & Blogs
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="hover:text-emerald-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-emerald-400 transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-emerald-400 transition-colors">
                  Customer Account
                </Link>
              </li>
              <li>
                <Link to="/admin/dashboard" className="text-emerald-400 font-semibold hover:underline flex items-center gap-1">
                  <span>Admin Operations</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Operating Hubs & Contact */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Contact & Hubs
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-white font-semibold">1800-123-SAHI</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>support@sahivahan.com</span>
              </li>
              <li className="flex items-start gap-2 pt-1">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-xs text-slate-400">
                  Bengaluru • Hyderabad • Delhi NCR • Mumbai • Pune • Chennai • Chandigarh
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} SahiVahan Technologies Pvt Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="text-slate-400">"Sahi Gaadi. Sahi Faisla."</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

