import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Target,
  Award,
  Users,
  CheckCircle2,
  ArrowRight,
  Shield,
  Search,
  Wrench,
  Sparkles
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { SEO } from '../../components/common/SEO';

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-6 pb-12">
      <SEO
        title="About Us — India's Independent Vehicle Inspection Network"
        description="Learn about SahiVahan's mission to eliminate trust deficit in India's pre-owned car and bike market with 100% independent, zero-commission forensic audits."
        keywords="about SahiVahan, independent car inspection company, vehicle inspection network India, unbiased auto inspection"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: 'About SahiVahan',
          description: "India's certified, 100% independent pre-purchase vehicle inspection network.",
          url: 'https://sahivahan.com/about'
        }}
      />

      {/* Compact Page Header (No excessive height) */}
      <section className="pt-3 sm:pt-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="border-b border-slate-200 pb-3.5 space-y-1">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#154D3F]">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Our Purpose & Mission · Sahi Gaadi. Sahi Faisla.</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Building India's Most Trusted Independent Vehicle Inspection Network
          </h1>
          <p className="text-xs text-slate-500 max-w-3xl">
            We are building India's most trustworthy, 100% independent vehicle inspection ecosystem to eradicate hidden defects, odometer rollbacks, and accidental coverups.
          </p>
        </div>
      </section>

      {/* The Problem We Solve */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#154D3F] bg-emerald-50 px-3 py-1 rounded-full">
              <Target className="w-4 h-4" />
              <span>Why We Started</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              The Indian Pre-Owned Vehicle Market Has a Severe Trust Deficit
            </h2>

            <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
              Every month, thousands of used car and bike buyers in Bengaluru, Hyderabad, Delhi NCR, Mumbai, Pune, Chennai, and Chandigarh put their hard-earned life savings into vehicles with concealed accident impacts, welded chassis frames, flooded electronic harnesses, or rolled-back digital meters.
            </p>

            <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
              Dealerships often claim to have performed "140-point internal checks," but as sellers, their commercial incentive is to close the sale. SahiVahan was built as a totally independent third party with zero commission ties to any dealer or showroom.
            </p>

            <div className="space-y-2.5 pt-1">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-semibold text-slate-800">
                  Zero Dealership Kickbacks: We work solely for the buyer.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-semibold text-slate-800">
                  Calibrated Forensic Hardware: OBD-II scanners and digital paint depth gauges.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-semibold text-slate-800">
                  Certified Regional Partner Organizations: Expert automotive diagnostic centers.
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-200/80 shadow-md space-y-5">
            <h3 className="text-xl font-bold text-slate-900">Our Core Pillars</h3>
            
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#154D3F] text-white flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5 text-emerald-300" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Uncompromising Impartiality</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Our partner organizations have no financial interest in whether you purchase the car or not. If a car is defective, our report highlights it clearly.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0">
                  <Search className="w-5 h-5 text-emerald-300" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Multi-System Forensic Checklist</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    We examine engine compression, transmission, structural chassis aprons, suspension, electronic modules, and RTO Vahan hypothecation records.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0">
                  <Wrench className="w-5 h-5 text-emerald-300" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Partner Organization Network</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    In this initial launch phase, we onboard leading regional inspection and diagnostic companies across metro hubs to fulfill leads with guaranteed SLAs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ready Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#154D3F] rounded-3xl p-8 sm:p-12 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-2xl font-bold">Have a vehicle in mind?</h3>
            <p className="text-xs sm:text-sm text-emerald-100">
              Submit your inquiry now and let a certified diagnostic organization inspect it for you.
            </p>
          </div>
          <Link to="/inquire">
            <Button size="lg" className="bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold">
              Submit Inquiry &rarr;
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

