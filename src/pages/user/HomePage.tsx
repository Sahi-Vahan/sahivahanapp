import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Car,
  Bike,
  Wrench,
  Clock,
  Star,
  FileText,
  Sparkles,
  PhoneCall,
  SearchCheck,
  ChevronRight,
  ClipboardCheck,
  Building2,
  MapPin
} from 'lucide-react';
import { useAppData } from '../../context/AppDataContext';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { FeedbackModal } from '../../components/feedback/FeedbackModal';
import { SEO } from '../../components/common/SEO';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { services, blogs, feedbacks } = useAppData();
  const [selectedType, setSelectedType] = useState<'car' | 'bike'>('car');
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  const featuredFeedbacks = feedbacks
    .filter(f => f.status === 'approved')
    .sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0))
    .slice(0, 3);
  const recentBlogs = blogs.slice(0, 3);

  return (
    <div className="space-y-8 sm:space-y-12 pb-16">
      <SEO
        title="SahiVahan | Sahi Gaadi. Sahi Faisla — Certified Pre-Purchase Car & Bike Inspections"
        description="India's certified pre-purchase vehicle inspection network. 100% unbiased doorstep car & bike audits with OBD-II scanner, ultrasonic paint depth gauge & digital report."
        keywords="used car inspection India, pre purchase bike inspection, car evaluation, second hand vehicle check, vehicle forensic audit, SahiVahan"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'SahiVahan',
          url: 'https://sahivahan.com',
          potentialAction: {
            '@type': 'SearchAction',
            target: 'https://sahivahan.com/blog?q={search_term_string}',
            'query-input': 'required name=search_term_string'
          }
        }}
      />
      {/* Signature Hero Section (Compact & Mobile-Optimized) */}
      <section className="pt-2 sm:pt-4 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#071F18] via-[#103D32] to-[#051712] text-white p-5 sm:p-8 lg:p-10 shadow-xl relative overflow-hidden border border-emerald-800/50">
          
          {/* Subtle Ambient Lighting Accents */}
          <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-[200px] h-[200px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center relative z-10">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-200 text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                <span>Sahi Gaadi. Sahi Faisla. · 100% Unbiased</span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-white leading-tight">
                Never Buy a Used Car or Bike{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-100 to-white block sm:inline">
                  Without Inspection
                </span>
              </h1>

              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Book certified diagnostic specialists for on-site vehicle evaluations. We uncover hidden accidental damage, welded frames, odometer rollbacks, and provide quantified repair estimates before you pay.
              </p>

              {/* Key Trust Stats (Compact & Mobile-Fitting) */}
              <div className="grid grid-cols-3 gap-2 pt-1 max-w-md mx-auto lg:mx-0 text-left">
                <div className="p-2.5 sm:p-3 rounded-xl bg-white/[0.08] backdrop-blur-md border border-white/15">
                  <div className="text-base sm:text-xl font-black text-white">Full</div>
                  <div className="text-[10px] text-emerald-200/80 font-medium mt-0.5 leading-tight">Diagnostic Audit</div>
                </div>
                <div className="p-2.5 sm:p-3 rounded-xl bg-white/[0.08] backdrop-blur-md border border-white/15">
                  <div className="text-base sm:text-xl font-black text-emerald-300">100%</div>
                  <div className="text-[10px] text-emerald-200/80 font-medium mt-0.5 leading-tight">Zero Dealer Cut</div>
                </div>
                <div className="p-2.5 sm:p-3 rounded-xl bg-white/[0.08] backdrop-blur-md border border-white/15">
                  <div className="text-base sm:text-xl font-black text-amber-300">Vetted</div>
                  <div className="text-[10px] text-emerald-200/80 font-medium mt-0.5 leading-tight">Partner Network</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-2.5 pt-1">
                <Link to={`/inquire?type=${selectedType}`} className="w-full sm:w-auto">
                  <button
                    type="button"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-xs sm:text-sm bg-white text-[#154D3F] hover:bg-emerald-50 shadow-lg shadow-black/20 active:scale-[0.98] transition-all group"
                  >
                    <span>Submit Inspection Query</span>
                    <ArrowRight className="w-4 h-4 text-[#154D3F] group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>

                <Link to="/services" className="w-full sm:w-auto">
                  <Button
                    variant="glass"
                    size="sm"
                    className="w-full sm:w-auto font-bold px-5 py-3 text-xs justify-center"
                  >
                    View Checklists & Coverage
                  </Button>
                </Link>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-[11px] text-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span className="text-left">Technicians active across Bengaluru, Hyderabad, Delhi-NCR, Mumbai, Pune, Chennai & Chandigarh</span>
              </div>
            </div>

            {/* Right Column: Sleek Quick-Inquiry Selector */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-xl border border-slate-200 text-slate-900 transition-all relative">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[#E8F5EE] text-[#154D3F] flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 tracking-tight">
                        Select Vehicle to Inspect
                      </h3>
                      <p className="text-[10px] sm:text-[11px] text-slate-500">
                        Certified on-site vehicle audits
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-[#154D3F] border border-emerald-200/80 text-[10px] font-black uppercase tracking-wider shrink-0">
                    100% Unbiased
                  </span>
                </div>

                {/* Sleek 2-Option Segmented Selector */}
                <div className="grid grid-cols-2 gap-2 my-3.5">
                  <button
                    type="button"
                    onClick={() => setSelectedType('car')}
                    className={`flex items-center justify-center gap-1.5 sm:gap-2 py-2 px-2.5 rounded-xl text-xs font-extrabold transition-all duration-200 border ${
                      selectedType === 'car'
                        ? 'bg-[#154D3F] text-white border-[#154D3F] shadow-md shadow-emerald-950/20'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    <Car className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${selectedType === 'car' ? 'text-emerald-300' : 'text-slate-500'}`} />
                    <span>Used Car</span>
                    <span className={`text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-full font-bold shrink-0 ${
                      selectedType === 'car' ? 'bg-white/20 text-emerald-100' : 'bg-slate-200 text-slate-600'
                    }`}>
                      Comprehensive
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedType('bike')}
                    className={`flex items-center justify-center gap-1.5 sm:gap-2 py-2 px-2.5 rounded-xl text-xs font-extrabold transition-all duration-200 border ${
                      selectedType === 'bike'
                        ? 'bg-[#154D3F] text-white border-[#154D3F] shadow-md shadow-emerald-950/20'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    <Bike className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${selectedType === 'bike' ? 'text-emerald-300' : 'text-slate-500'}`} />
                    <span>Used Bike</span>
                    <span className={`text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-full font-bold shrink-0 ${
                      selectedType === 'bike' ? 'bg-white/20 text-emerald-100' : 'bg-slate-200 text-slate-600'
                    }`}>
                      Full Audit
                    </span>
                  </button>
                </div>

                {/* Selected Vehicle Details Preview */}
                <div className="space-y-2.5 pb-3.5">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-xs text-slate-900">
                        {selectedType === 'car' ? 'Car Comprehensive Audit' : 'Bike & Superbike Audit'}
                      </span>
                      <span className="text-[10px] font-black text-[#154D3F] bg-[#E8F5EE] px-2 py-0.5 rounded-md border border-emerald-200/60">
                        {selectedType === 'car' ? 'Comprehensive Audit' : 'Full Evaluation'}
                      </span>
                    </div>

                    <ul className="text-[11px] text-slate-600 space-y-1 pt-0.5">
                      {selectedType === 'car' ? (
                        <>
                          <li className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>OBD-II scanner for engine & ECU fault codes</span>
                          </li>
                          <li className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>Digital paint depth gauge for repainted panels</span>
                          </li>
                          <li className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>Structural chassis, apron & flood waterline check</span>
                          </li>
                        </>
                      ) : (
                        <>
                          <li className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>Chassis frame alignment & accident distortion check</span>
                          </li>
                          <li className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>Fork seal leaks, drive chain & sprocket audit</span>
                          </li>
                          <li className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>Cold compression & tappet noise test</span>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>

                <Link to={`/inquire?type=${selectedType}`} className="block w-full">
                  <Button variant="primary" size="md" className="w-full font-bold text-xs py-2.5 justify-center">
                    Continue to Inquire for {selectedType === 'car' ? 'Car' : 'Bike'} &rarr;
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Launch Capabilities & Standards (Honest & Unbiased) */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-xs p-4 sm:p-6 lg:p-7">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
            {/* Metric 1: Checkpoints */}
            <div className="pt-2 lg:pt-0 lg:px-4 text-center sm:text-left flex flex-col items-center sm:items-start justify-between">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
                  <ClipboardCheck className="w-4 h-4" />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">Diagnostic Rigor</span>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-[#154D3F] tracking-tight">Multi-System</p>
                <p className="text-xs font-medium text-slate-500 mt-1 leading-snug">
                  Chassis, OBD-II scanner, paint depth meter & road test
                </p>
              </div>
            </div>

            {/* Metric 2: Independence */}
            <div className="pt-2 lg:pt-0 lg:px-4 text-center sm:text-left flex flex-col items-center sm:items-start justify-between">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
                  <ShieldCheck className="w-4 h-4" />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">Zero Conflict</span>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-[#154D3F] tracking-tight">100% Unbiased</p>
                <p className="text-xs font-medium text-slate-500 mt-1 leading-snug">
                  Zero dealership commissions, kickbacks, or inventory sales
                </p>
              </div>
            </div>

            {/* Metric 3: Fast Allocation SLA */}
            <div className="pt-4 lg:pt-0 lg:px-4 text-center sm:text-left flex flex-col items-center sm:items-start justify-between">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
                  <ShieldCheck className="w-4 h-4" />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">Partner Matching</span>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-[#154D3F] tracking-tight">Vetted Partner Match</p>
                <p className="text-xs font-medium text-slate-500 mt-1 leading-snug">
                  Prompt matching with certified local inspection organizations
                </p>
              </div>
            </div>

            {/* Metric 4: Regional Hubs */}
            <div className="pt-4 lg:pt-0 lg:px-4 text-center sm:text-left flex flex-col items-center sm:items-start justify-between">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
                  <MapPin className="w-4 h-4" />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">Metro Network</span>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-[#154D3F] tracking-tight">7 Key Metros</p>
                <p className="text-xs font-medium text-slate-500 mt-1 leading-snug">
                  Bengaluru, Hyderabad, NCR, Mumbai, Pune, Chennai, Chandigarh
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Services Section (Only Car & Bike) */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
              <Wrench className="w-3.5 h-3.5" />
              <span>Inspection Checklists</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Certified Vehicle Inspection Packages
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Unbiased on-site evaluations with zero dealer commissions. Select your vehicle package.
            </p>
          </div>

          <Link to="/services" className="self-start sm:self-auto">
            <Button variant="outline" size="sm" icon={<ChevronRight className="w-4 h-4" />}>
              Explore All Checklists
            </Button>
          </Link>
        </div>

        {/* Services Grid (Cars & Bikes) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className={`rounded-3xl p-7 flex flex-col justify-between transition-all duration-200 ${
                service.popular
                  ? 'bg-gradient-to-b from-white to-[#E8F5EE]/40 border-2 border-[#154D3F] shadow-lg relative'
                  : 'bg-white border border-slate-200/80 shadow-xs hover:shadow-md'
              }`}
            >
              {service.popular && (
                <div className="absolute -top-3.5 right-6 bg-[#154D3F] text-white text-[11px] font-extrabold uppercase px-3 py-1 rounded-full tracking-wider shadow-xs">
                  {service.badge || 'Most Popular'}
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#E8F5EE] text-[#154D3F] flex items-center justify-center font-bold">
                    {service.category === 'bike' ? <Bike className="w-6 h-6" /> : <Car className="w-6 h-6" />}
                  </div>
                  <Badge variant="brand" size="sm">
                    Comprehensive Audit
                  </Badge>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900">{service.title}</h3>
                  <p className="text-xs font-medium text-slate-500 mt-1">{service.tagline}</p>
                </div>

                <div className="flex items-center gap-4 text-xs font-semibold text-slate-600 py-2 border-y border-slate-100">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-emerald-600" />
                    {service.duration}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Full Evaluation
                  </span>
                </div>

                <ul className="space-y-2 text-xs text-slate-600">
                  {service.features.slice(0, 4).map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100">
                <Link to={`/inquire?service=${service.id}`} className="block w-full">
                  <Button
                    variant={service.popular ? 'primary' : 'outline'}
                    className="w-full font-bold"
                  >
                    Select This Package
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works: Signature Process Section */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-[#061B15] via-[#0D2F25] to-[#041410] text-white p-6 sm:p-10 lg:p-14 border border-emerald-800/40 shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Glows */}
          <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-[300px] h-[300px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3 relative z-10 mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Simple 3-Step Verification</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              How SahiVahan Protects Your Vehicle Purchase
            </h2>

            <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
              No technical expertise needed. From seller coordination to computer diagnostics, we handle everything at the vehicle's doorstep.
            </p>
          </div>

          {/* 3 Step Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {/* Step 1 */}
            <div className="group rounded-2xl bg-white/[0.05] hover:bg-white/[0.08] backdrop-blur-md border border-white/10 hover:border-emerald-500/40 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-300 group-hover:scale-105 transition-transform shadow-inner">
                    <ClipboardCheck className="w-6 h-6 text-emerald-400" />
                  </div>
                  <span className="font-mono text-xs font-black tracking-widest text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-2.5 py-1 rounded-full">
                    STEP 01
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400/90 block mb-1">
                    Takes 60 Seconds
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-emerald-200 transition-colors">
                    Submit Vehicle Inquiry
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300/80 leading-relaxed mt-2">
                    Provide the vehicle make, seller/dealer location, and preferred inspection time slot.
                  </p>
                </div>

                <ul className="space-y-2 text-xs text-slate-300/90 pt-3 border-t border-white/10">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Instant customer email sign-in</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Home or dealership doorstep address</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Reference ID issued immediately</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-emerald-300/70">
                <span>Phase 1: Booking</span>
                <span className="font-semibold text-emerald-400">Zero Advance Required &rarr;</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="group rounded-2xl bg-white/[0.05] hover:bg-white/[0.08] backdrop-blur-md border border-white/10 hover:border-emerald-500/40 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-300 group-hover:scale-105 transition-transform shadow-inner">
                    <Building2 className="w-6 h-6 text-emerald-400" />
                  </div>
                  <span className="font-mono text-xs font-black tracking-widest text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-2.5 py-1 rounded-full">
                    STEP 02
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400/90 block mb-1">
                    Certified Partner Matching
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-emerald-200 transition-colors">
                    Partner Organization Dispatched
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300/80 leading-relaxed mt-2">
                    Our operations team assigns your lead to a certified regional partner organization who allocates an expert technician.
                  </p>
                </div>

                <ul className="space-y-2 text-xs text-slate-300/90 pt-3 border-t border-white/10">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Direct technician coordination with seller</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>OBD-II scanner & ultrasonic paint gauge on-site</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Multi-system physical & dynamic road trial</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-emerald-300/70">
                <span>Phase 2: On-Site Audit</span>
                <span className="font-semibold text-emerald-400">100% Impartial &rarr;</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="group rounded-2xl bg-white/[0.05] hover:bg-white/[0.08] backdrop-blur-md border border-white/10 hover:border-emerald-500/40 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-300 group-hover:scale-105 transition-transform shadow-inner">
                    <ShieldCheck className="w-6 h-6 text-emerald-400" />
                  </div>
                  <span className="font-mono text-xs font-black tracking-widest text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-2.5 py-1 rounded-full">
                    STEP 03
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400/90 block mb-1">
                    Digital Forensic Report
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-emerald-200 transition-colors">
                    Forensic Health Dossier
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300/80 leading-relaxed mt-2">
                    Receive an exhaustive digital report covering hidden structural damage, error codes, and negotiation leverage.
                  </p>
                </div>

                <ul className="space-y-2 text-xs text-slate-300/90 pt-3 border-t border-white/10">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>80+ high-res photos & flood waterline evidence</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>ECU error log & meter rollback verification</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Quantified repair estimate for price negotiation</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-emerald-300/70">
                <span>Phase 3: Safe Purchase</span>
                <span className="font-semibold text-emerald-400">Negotiate with Proof &rarr;</span>
              </div>
            </div>
          </div>

          {/* Bottom Action Strip */}
          <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-white">
                  Zero Dealership Commissions · 100% Unbiased Vehicle Diagnostics
                </p>
                <p className="text-[11px] text-emerald-200/70">
                  Technicians ready across Bengaluru, Hyderabad, Delhi NCR, Mumbai, Pune, Chennai & Chandigarh
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-center">
              <Link to="/inquire" className="w-full sm:w-auto">
                <button
                  type="button"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm bg-white text-[#154D3F] hover:bg-emerald-50 shadow-lg shadow-black/30 hover:scale-[1.01] active:scale-[0.98] transition-all"
                >
                  <span>Book Inspection Now</span>
                  <ArrowRight className="w-4 h-4 text-[#154D3F]" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Verified Customer Stories</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Real Buyers Who Saved Lakhs
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Read how independent inspections uncovered hidden faults before money changed hands.
            </p>
          </div>

          <div className="flex items-center gap-2.5 self-start sm:self-auto flex-wrap">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFeedbackModalOpen(true)}
              className="font-bold text-xs"
            >
              Submit Feedback
            </Button>
            <Link to="/reviews">
              <Button variant="secondary" size="sm" icon={<ArrowRight className="w-4 h-4" />}>
                View All Reviews
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredFeedbacks.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < item.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                  <Badge variant="brand" size="sm">
                    Verified Buyer
                  </Badge>
                </div>

                <h4 className="font-bold text-slate-900 text-sm leading-snug">{item.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-4">
                  "{item.comment}"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-slate-900">{item.customerName}</p>
                  <p className="text-slate-500 text-[11px]">{item.vehicleInfo} • {item.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Dynamic Blogs Teaser from customer-portal blog posts */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
              <FileText className="w-3.5 h-3.5" />
              <span>Inspection Guides & Scam Alerts</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              From Our Automotive QA Lab
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Expert advice on avoiding scams, detecting rust, and evaluating used vehicle mechanics.
            </p>
          </div>

          <Link to="/blogs">
            <Button variant="outline" size="sm" icon={<ChevronRight className="w-4 h-4" />}>
              Read All Articles
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentBlogs.map((blog) => (
            <div
              key={blog.slug}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <Badge variant="brand" size="sm">
                    {blog.category}
                  </Badge>
                  <span>{blog.readTime}</span>
                </div>

                <h3 className="font-bold text-slate-900 text-base group-hover:text-[#154D3F] transition-colors leading-snug line-clamp-2">
                  {blog.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {blog.subtitle}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>By {blog.author.name}</span>
                <Link
                  to={`/blogs/${blog.slug}`}
                  className="font-bold text-[#154D3F] hover:underline flex items-center gap-1"
                >
                  Read &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ready CTA Ribbon */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#154D3F] to-[#0F382E] rounded-2xl sm:rounded-3xl p-6 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl text-center md:text-left">
          <div className="space-y-2">
            <h3 className="text-xl sm:text-3xl font-black">
              Found a car or bike you like?
            </h3>
            <p className="text-emerald-100 text-xs sm:text-sm max-w-xl">
              Don't transfer the token advance until our certified partner organization verifies it. Submit a query in under 60 seconds.
            </p>
          </div>

          <Link to="/inquire" className="w-full sm:w-auto shrink-0">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black shadow-lg justify-center py-3 text-xs sm:text-sm"
            >
              Submit Inspection Query &rarr;
            </Button>
          </Link>
        </div>
      </section>

      {/* Quick Feedback Submission Modal Variant */}
      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
      />
    </div>
  );
};
