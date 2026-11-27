import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Mail, User, Phone, Sparkles, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';

export const UserLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { loginUser, switchDemoUser, isUserAuthenticated } = useAuth();

  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If already authenticated, allow redirect
  if (isUserAuthenticated) {
    navigate('/inquire');
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    try {
      await loginUser(email, fullName || email.split('@')[0], phone);
      navigate('/inquire');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoLogin = () => {
    switchDemoUser('user');
    navigate('/inquire');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#E8F5EE] border border-[#CBEAD8] text-[#154D3F] flex items-center justify-center mx-auto">
            <ShieldCheck className="w-7 h-7 text-[#154D3F]" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Customer Sign In
          </h1>
          <p className="text-xs text-slate-500">
            Enter your email to submit inspection queries and track vehicle reports.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="e.g. Rahul Verma"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#154D3F] text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#154D3F] text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="tel"
                placeholder="+91 98765 43210"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#154D3F] text-sm"
              />
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            isLoading={isSubmitting}
            className="w-full font-bold text-sm"
          >
            Sign In with Email &rarr;
          </Button>
        </form>

        <div className="pt-4 border-t border-slate-100 space-y-3 text-center">
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-xs font-bold text-emerald-800 transition-colors flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Instant 1-Click Demo Customer Sign In</span>
          </button>

          <p className="text-xs text-slate-400">
            Looking for operations control?{' '}
            <Link to="/admin/login" className="text-[#154D3F] font-bold hover:underline">
              Go to Admin Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

