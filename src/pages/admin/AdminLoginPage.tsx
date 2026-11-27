import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Mail, Lock, Sparkles, ArrowRight, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { loginAdmin, switchDemoUser, isAdminAuthenticated } = useAuth();

  const [email, setEmail] = useState('admin@sahivahan.com');
  const [password, setPassword] = useState('admin123');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If already authenticated, redirect to dashboard
  if (isAdminAuthenticated) {
    navigate('/admin/dashboard');
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await loginAdmin(email, password);
      navigate('/admin/dashboard');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoAdmin = () => {
    switchDemoUser('admin');
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 py-8 sm:py-12">
      <div className="w-full max-w-md bg-slate-950/80 rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-800 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-[#154D3F] border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-950/50">
            <Shield className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Admin Command Center
          </h1>
          <p className="text-xs text-slate-400">
            Restricted operations portal. Manage inspection queries, dispatch to partner organizations, and moderate feedback.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">
              Admin Email *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                placeholder="admin@sahivahan.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">
              Password *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-sm"
              />
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            isLoading={isSubmitting}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm shadow-md"
          >
            Access Admin Console &rarr;
          </Button>
        </form>

        <div className="pt-4 border-t border-slate-800 space-y-3 text-center">
          <button
            type="button"
            onClick={handleDemoAdmin}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-emerald-300 transition-colors flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Instant 1-Click Demo Admin Sign In</span>
          </button>

          <p className="text-xs text-slate-500">
            <Link to="/" className="text-emerald-400 hover:underline">
              &larr; Return to Public Website
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

