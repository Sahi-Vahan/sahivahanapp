import React, { useState } from 'react';
import { PhoneCall, Mail, MapPin, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Select } from '../../components/common/Select';
import { SEO } from '../../components/common/SEO';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: 'Bengaluru',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-5 pb-12">
      <SEO
        title="Contact SahiVahan — Customer Support & Helpline"
        description="Get in touch with SahiVahan for inspection assistance, franchise inquiries, or regional partner registration. Toll-free helpline: 1800-123-SAHI."
        keywords="contact SahiVahan, vehicle inspection customer support, auto inspection toll-free number, partner registration"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: 'Contact SahiVahan',
          url: 'https://sahivahan.com/contact',
          mainEntity: {
            '@type': 'AutomotiveBusiness',
            name: 'SahiVahan',
            telephone: '+91-1800-123-7244',
            email: 'support@sahivahan.com'
          }
        }}
      />

      {/* Compact Page Header (No excessive height) */}
      <section className="pt-3 sm:pt-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-200 pb-3.5">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#154D3F]">
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              <span>Direct Customer Support & Partnerships</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              We're Here to Help
            </h1>
            <p className="text-xs text-slate-500 max-w-xl">
              Need assistance with an inspection query or interested in partnering as an inspection organization?
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
            <a
              href="tel:18001237244"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#E8F5EE] text-[#154D3F] hover:bg-[#d5eee0] text-xs font-bold transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>1800-123-SAHI (7244)</span>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10">
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
              <h2 className="text-xl font-bold text-slate-900">Direct Channels</h2>

              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#E8F5EE] text-[#154D3F] flex items-center justify-center shrink-0">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase">Toll-Free Phone</p>
                    <a href="tel:18001234567" className="font-bold text-slate-900 hover:text-[#154D3F] text-base">
                      1800-123-SAHI (7244)
                    </a>
                    <p className="text-xs text-slate-500 mt-0.5">Mon - Sun: 8:00 AM - 9:00 PM IST</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#E8F5EE] text-[#154D3F] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase">Support Email</p>
                    <a href="mailto:support@sahivahan.com" className="font-bold text-slate-900 hover:text-[#154D3F] text-base">
                      support@sahivahan.com
                    </a>
                    <p className="text-xs text-slate-500 mt-0.5">Prompt response from our operations team</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#E8F5EE] text-[#154D3F] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase">Headquarters</p>
                    <p className="font-bold text-slate-900">
                      SahiVahan Technologies Pvt Ltd
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Indiranagar 100ft Road, Bengaluru, Karnataka 560038
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Operating Hubs */}
            <div className="bg-slate-900 text-white rounded-3xl p-8 space-y-4">
              <h3 className="font-bold text-base flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>Active Regional Operating Hubs</span>
              </h3>
              <p className="text-xs text-slate-400">
                Partner diagnostic teams are actively available in the following metro clusters:
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {['Bengaluru', 'Hyderabad', 'Delhi NCR', 'Mumbai', 'Pune', 'Chennai', 'Chandigarh'].map((city) => (
                  <span
                    key={city}
                    className="px-3 py-1 bg-slate-800 text-emerald-300 text-xs font-semibold rounded-lg border border-slate-700"
                  >
                    {city}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-200/80 shadow-xs">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Message Received!</h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    Thank you for reaching out, {formData.name}. Our automotive operations team will get in touch with you at <strong className="text-slate-900">{formData.email}</strong> shortly.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        city: 'Bengaluru',
                        subject: '',
                        message: ''
                      });
                    }}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Send Us a Message</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Have questions regarding vehicle inspection reports or partner onboarding?
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ramesh Patel"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#154D3F] text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="ramesh@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#154D3F] text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#154D3F] text-sm"
                      />
                    </div>

                    <Select
                      label="City"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    >
                      <option value="Bengaluru">Bengaluru</option>
                      <option value="Hyderabad">Hyderabad</option>
                      <option value="Delhi NCR">Delhi NCR</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Pune">Pune</option>
                      <option value="Chennai">Chennai</option>
                      <option value="Chandigarh">Chandigarh</option>
                      <option value="Other">Other City</option>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Question about inspection in Whitefield"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#154D3F] text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="How can our team assist you today?"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#154D3F] text-sm"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full font-bold" icon={<Send className="w-4 h-4" />}>
                    Send Message
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

