import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle2,
  Car,
  Bike,
  Cpu,
  Gauge,
  Wrench,
  Search,
  FileText,
  ArrowRight,
  Sparkles,
  AlertTriangle,
  Camera,
  Layers,
  Check
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { SEO } from '../../components/common/SEO';

export const ServicesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'car' | 'bike' | 'tech'>('car');

  const carCheckpoints = [
    {
      title: 'Chassis, Apron & Structural Frame',
      scope: 'Structural Audit',
      desc: 'Deep inspection of radiator core support, A/B/C pillars, rocker panels, strut towers, firewall, floor pan, and rear quarter seams to verify OEM spot welds and zero accidental deformation.'
    },
    {
      title: 'Engine, Powertrain & Gearbox',
      scope: 'Powertrain Diagnostics',
      desc: 'Cold start evaluation, idle stability, engine blow-by check, valve cover weeping, turbo boost plumbing, coolant contamination, clutch bite, and automatic / manual transmission trial.'
    },
    {
      title: 'Ultrasonic Paint Depth Measurement',
      scope: 'Digital Micron Profiling',
      desc: 'Digital micron readings across fenders, doors, bonnet, roof, and boot lid to identify concealed accident body filler (putty), blend lines, and panel replacements.'
    },
    {
      title: 'OBD-II Computer Diagnostic Scan',
      scope: 'Real-Time ECU Interrogation',
      desc: 'Electronic scan of Engine Control Unit (ECU), Airbag/SRS, and ABS/ESC modules to retrieve active and stored fault codes, readiness monitors, and distance since DTC clear.'
    },
    {
      title: 'Suspension, Steering, Brakes & Tyres',
      scope: 'Running Gear Audit',
      desc: 'Strut leakage, lower control arms, tie rod play, steering rack backlash, brake rotor lip thickness, brake pad life in mm, and tyre tread depth + DOT date codes.'
    },
    {
      title: 'Interior, Electrics & Flood Detection',
      scope: 'Cabin & Flood Check',
      desc: 'AC vent chilling test, seatbelt retractor locks, sunroof drain inspection, electrical switchgear, infotainment, instrument cluster warning lamps, and under-carpet flood waterline audit.'
    },
    {
      title: 'Dynamic Road Test Trial',
      scope: 'Dynamic Road Trial',
      desc: 'On-road evaluation of straight-line tracking, high-speed braking shudder, suspension clunks over potholes, clutch slippage, and transmission shift smoothness.'
    }
  ];

  const bikeCheckpoints = [
    {
      title: 'Chassis Frame & Headstock Alignment',
      scope: 'Frame Alignment',
      desc: 'Laser & visual inspection of chassis downtube, steering triple-tree alignment, headstock bearing play, notchiness, and rear swingarm bush wear.'
    },
    {
      title: 'Engine, Gearbox & Tappet Diagnostics',
      scope: 'Compression & Tappet Check',
      desc: 'Cold compression test, valve timing noise, tappet clatter, clutch drag/slippage, false neutral detection, oil seal seepage, and exhaust smoke color.'
    },
    {
      title: 'Suspension & Shock Absorbers',
      scope: 'Fork & Rebound Damping',
      desc: 'Front fork oil seal weepage, stanchion chrome pitting, fork deflection, and rear monoshock / dual-shock rebound damping.'
    },
    {
      title: 'Drive Chain & Sprocket Audit',
      scope: 'Drivetrain & Chain Slack',
      desc: 'Chain slack tension, link binding, sprocket tooth rounding/hooking, cush drive rubber play, and alignment.'
    },
    {
      title: 'Disc Brakes, Wheels & Tyres',
      scope: 'Braking & Wheel Runout',
      desc: 'Disc rotor warp/trueing, caliper piston bite, pad wear, spoke tension/alloy rim runout, and tyre manufacturing DOT date codes.'
    },
    {
      title: 'Electrical Harness & Controls',
      scope: 'Stator & Electrical Output',
      desc: 'Battery cranking voltage, charging coil output, handlebar switchgear, headlight beam, aftermarket wiring splices, and safety interlocks.'
    }
  ];

  const diagnosticTools = [
    {
      name: 'OBD-II Computer Scanners',
      desc: 'Bi-directional diagnostic tablet scans Engine, ABS, Transmission, and Airbag modules for active/hidden fault codes and live sensor data streams.',
      icon: <Cpu className="w-6 h-6 text-emerald-400" />
    },
    {
      name: 'Digital Ultrasonic Paint Gauge',
      desc: 'Measures body paint coating thickness down to single microns (µm). Instantly exposes concealed accident repairs, repainted panels, and body filler putty.',
      icon: <Gauge className="w-6 h-6 text-emerald-400" />
    },
    {
      name: 'High-Res Borescope Cameras',
      desc: 'Inspects hard-to-reach engine compartments, underbody chassis frame cavities, and behind interior trim panels for structural damage.',
      icon: <Camera className="w-6 h-6 text-emerald-400" />
    },
    {
      name: 'Electronic Battery Analyzer',
      desc: 'Measures battery cold-cranking amps (CCA), internal cell conductance, and charging alternator load voltage to predict battery life.',
      icon: <Wrench className="w-6 h-6 text-emerald-400" />
    }
  ];

  return (
    <div className="space-y-5 py-3 sm:py-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SEO
        title="Vehicle Inspection Checklists & Forensic Coverage"
        description="Explore SahiVahan's 140+ point car & motorcycle inspection checklists. Includes OBD-II computer scanning, ultrasonic paint depth profiling, and dynamic road tests."
        keywords="car inspection checklist, bike inspection points, OBD2 diagnostic scan India, paint thickness test, used car evaluation checklist"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'SahiVahan Vehicle Inspection Services',
          provider: {
            '@type': 'AutomotiveBusiness',
            name: 'SahiVahan',
            url: 'https://sahivahan.com'
          },
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Vehicle Inspection Packages',
            itemListElement: [
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Comprehensive Pre-Purchase Car Inspection',
                  description: '140+ checkpoint forensic evaluation including OBD-II scan, ultrasonic paint meter profiling, and dynamic road trial.'
                }
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Pre-Purchase Motorcycle & Scooter Inspection',
                  description: 'Multi-system audit covering frame alignment, fork seals, compression test, and drivetrain wear.'
                }
              }
            ]
          }
        }}
      />

      {/* Compact Page Header (No excessive height) */}
      <section className="border-b border-slate-200 pb-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#154D3F]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Certified Diagnostic Capabilities</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
              Vehicle Inspection Checklists & Coverage
            </h1>

            <p className="text-xs text-slate-500 max-w-2xl">
              Forensic, doorstep pre-purchase evaluations across India. Every audit is conducted by experienced diagnostic specialists equipped with professional scanners and ultrasonic paint gauges.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto shrink-0">
            <Link to="/inquire">
              <Button variant="primary" size="sm" className="font-bold text-xs py-2 px-4">
                Submit Inspection Query
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Service Category Switcher (3 Premium Category Cards) */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl sm:rounded-3xl p-2 sm:p-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {/* Car Tab */}
          <button
            type="button"
            onClick={() => setActiveTab('car')}
            className={`flex items-center gap-3 p-3.5 rounded-xl sm:rounded-2xl text-left transition-all ${
              activeTab === 'car'
                ? 'bg-[#154D3F] text-white shadow-md'
                : 'bg-white hover:bg-slate-100/80 text-slate-700 border border-slate-200/60'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              activeTab === 'car' ? 'bg-white/15 text-white' : 'bg-emerald-50 text-emerald-700'
            }`}>
              <Car className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xs sm:text-sm">Used Car Audit</span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                  activeTab === 'car' ? 'bg-emerald-400 text-emerald-950' : 'bg-slate-100 text-slate-600'
                }`}>
                  Full Audit
                </span>
              </div>
              <p className={`text-[11px] mt-0.5 line-clamp-1 ${activeTab === 'car' ? 'text-emerald-100' : 'text-slate-500'}`}>
                Engine, OBD-II scan, paint & chassis
              </p>
            </div>
          </button>

          {/* Bike Tab */}
          <button
            type="button"
            onClick={() => setActiveTab('bike')}
            className={`flex items-center gap-3 p-3.5 rounded-xl sm:rounded-2xl text-left transition-all ${
              activeTab === 'bike'
                ? 'bg-[#154D3F] text-white shadow-md'
                : 'bg-white hover:bg-slate-100/80 text-slate-700 border border-slate-200/60'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              activeTab === 'bike' ? 'bg-white/15 text-white' : 'bg-emerald-50 text-emerald-700'
            }`}>
              <Bike className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xs sm:text-sm">Used Bike Audit</span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                  activeTab === 'bike' ? 'bg-emerald-400 text-emerald-950' : 'bg-slate-100 text-slate-600'
                }`}>
                  Full Audit
                </span>
              </div>
              <p className={`text-[11px] mt-0.5 line-clamp-1 ${activeTab === 'bike' ? 'text-emerald-100' : 'text-slate-500'}`}>
                Frame, fork seals, chain & road test
              </p>
            </div>
          </button>

          {/* Tech Hardware Tab */}
          <button
            type="button"
            onClick={() => setActiveTab('tech')}
            className={`flex items-center gap-3 p-3.5 rounded-xl sm:rounded-2xl text-left transition-all ${
              activeTab === 'tech'
                ? 'bg-[#154D3F] text-white shadow-md'
                : 'bg-white hover:bg-slate-100/80 text-slate-700 border border-slate-200/60'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              activeTab === 'tech' ? 'bg-white/15 text-white' : 'bg-emerald-50 text-emerald-700'
            }`}>
              <Gauge className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xs sm:text-sm">Diagnostic Hardware</span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                  activeTab === 'tech' ? 'bg-emerald-400 text-emerald-950' : 'bg-slate-100 text-slate-600'
                }`}>
                  OEM Tools
                </span>
              </div>
              <p className={`text-[11px] mt-0.5 line-clamp-1 ${activeTab === 'tech' ? 'text-emerald-100' : 'text-slate-500'}`}>
                Paint gauge, OBD scanner & borescopes
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Tab 1: Car Inspection Deep Dive */}
      {activeTab === 'car' && (
        <section className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 border border-slate-200 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full">
                  Flagship 4-Wheeler Service
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Pre-Purchase Used Car Inspection
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Exhaustive on-site evaluation covering hatchbacks, sedans, compact SUVs, and luxury cars.
                </p>
              </div>

              <Link to="/inquire?type=car" className="w-full sm:w-auto">
                <Button size="lg" variant="primary" className="w-full sm:w-auto font-extrabold text-xs sm:text-sm shadow-md justify-center py-3">
                  Inquire for Car Inspection &rarr;
                </Button>
              </Link>
            </div>

            {/* Checkpoint Sections Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {carCheckpoints.map((sec, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:bg-slate-50 transition-colors space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 text-sm">{sec.title}</h3>
                    <span className="text-[11px] font-black text-[#154D3F] bg-[#E8F5EE] px-2.5 py-0.5 rounded-full">
                      {sec.scope}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{sec.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Tab 2: Bike Inspection Deep Dive */}
      {activeTab === 'bike' && (
        <section className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 border border-slate-200 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full">
                  Two-Wheeler Diagnostic Service
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Pre-Purchase Motorcycle & Scooter Inspection
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Precision verification for commuter bikes, Royal Enfields, KTMs, and high-performance two-wheelers.
                </p>
              </div>

              <Link to="/inquire?type=bike" className="w-full sm:w-auto">
                <Button size="lg" variant="primary" className="w-full sm:w-auto font-extrabold text-xs sm:text-sm shadow-md justify-center py-3">
                  Inquire for Bike Inspection &rarr;
                </Button>
              </Link>
            </div>

            {/* Checkpoint Sections Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bikeCheckpoints.map((sec, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:bg-slate-50 transition-colors space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 text-sm">{sec.title}</h3>
                    <span className="text-[11px] font-black text-[#154D3F] bg-[#E8F5EE] px-2.5 py-0.5 rounded-full">
                      {sec.scope}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{sec.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Tab 3: Specialized Diagnostic Hardware */}
      {(activeTab === 'tech' || activeTab === 'car' || activeTab === 'bike') && (
        <section className="bg-slate-900 text-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-12 border border-slate-800 space-y-6 sm:space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Forensic Instruments
            </span>
            <h2 className="text-xl sm:text-3xl font-extrabold text-white">
              Professional Diagnostic Equipment We Deploy
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Unlike casual mechanics relying on sight and sound, our partner technicians use calibrated electronic testing equipment on-site.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {diagnosticTools.map((tool, idx) => (
              <div
                key={idx}
                className="bg-slate-800/80 p-4 sm:p-5 rounded-2xl border border-slate-700/60 space-y-2.5"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-slate-700/60 flex items-center justify-center">
                  {tool.icon}
                </div>
                <h3 className="font-bold text-white text-sm">{tool.name}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{tool.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* What You Receive in the Report */}
      <section className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-12 border border-slate-200 shadow-xs space-y-6 sm:space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#154D3F] bg-emerald-50 px-3 py-1 rounded-full">
            Deliverable & Output
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            What You Receive After Every Inspection
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Delivered digitally upon physical inspection completion.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-2 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-[#154D3F] text-white flex items-center justify-center font-bold mb-3 mx-auto sm:mx-0">
              1
            </div>
            <h4 className="font-bold text-sm text-slate-900">Digital Health Score</h4>
            <p className="text-xs text-slate-600">
              Overall vehicle score out of 10 computed across Engine, Chassis, Body, and Electricals.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-2 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-[#154D3F] text-white flex items-center justify-center font-bold mb-3 mx-auto sm:mx-0">
              2
            </div>
            <h4 className="font-bold text-sm text-slate-900">80+ Geotagged Photos</h4>
            <p className="text-xs text-slate-600">
              High-resolution photographic evidence of underbody, odometer, tyre tread, and defect close-ups.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-2 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-[#154D3F] text-white flex items-center justify-center font-bold mb-3 mx-auto sm:mx-0">
              3
            </div>
            <h4 className="font-bold text-sm text-slate-900">OBD Computer Scan Log</h4>
            <p className="text-xs text-slate-600">
              Full readout of ECU diagnostics, historical sensor errors, and emission readiness status.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-2 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-[#154D3F] text-white flex items-center justify-center font-bold mb-3 mx-auto sm:mx-0">
              4
            </div>
            <h4 className="font-bold text-sm text-slate-900">Quantified Repair Estimates</h4>
            <p className="text-xs text-slate-600">
              Realistic parts and labor repair estimates to help you negotiate price discounts with the seller.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="bg-gradient-to-r from-[#154D3F] to-[#0F382E] rounded-3xl p-8 sm:p-12 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-2xl font-black">Ready to inspect a vehicle?</h3>
          <p className="text-xs sm:text-sm text-emerald-100">
            Submit an inquiry in under 60 seconds. Our operations team coordinates with the nearest certified partner organization.
          </p>
        </div>
        <Link to="/inquire" className="shrink-0">
          <Button
            size="lg"
            className="bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black shadow-lg"
          >
            Submit Inspection Query &rarr;
          </Button>
        </Link>
      </section>
    </div>
  );
};
