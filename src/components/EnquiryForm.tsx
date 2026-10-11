import React, { useState, useEffect } from 'react';
import { CrosshairReticle } from './TechnicalDrawings';
import { BRAND_INFO } from '../data/products';

export const RECIPIENT_EMAIL = 'sales@lattis.in';
export const CONTACT_PHONE = '+91 9742444744';

interface EnquiryFormProps {
  initialProduct?: 'tl-513' | 'ts-523' | 'both';
  initialNote?: string;
}

export const EnquiryForm: React.FC<EnquiryFormProps> = ({
  initialProduct = 'tl-513',
  initialNote = ''
}) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    product: initialProduct,
    size: '25 ml',
    quantity: '25',
    city: 'Bengaluru',
    applicationNote: initialNote
  });

  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialProduct) setFormData((prev) => ({ ...prev, product: initialProduct }));
    if (initialNote) setFormData((prev) => ({ ...prev, applicationNote: initialNote }));
  }, [initialProduct, initialNote]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Contact name is required.';
    if (!formData.company.trim()) errs.company = 'Company name is required.';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required.';
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email = 'A valid work email is required.';
    }
    if (!formData.city.trim()) errs.city = 'City / location is required.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const formattedEnquiry = `LATTIS INDUSTRIAL ADHESIVES — ENQUIRY
----------------------------------------------------------------------
Date: ${new Date().toLocaleDateString('en-IN')}
To: ${RECIPIENT_EMAIL}

CONTACT DETAILS:
- Name: ${formData.name}
- Company: ${formData.company}
- Phone: ${formData.phone}
- Email: ${formData.email}
- Location: ${formData.city}

REQUIREMENT:
- Product: ${
    formData.product === 'tl-513'
      ? 'TL-513 (Medium Strength Anaerobic Threadlocker)'
      : formData.product === 'ts-523'
      ? 'TS-523 (Medium Strength Anaerobic Thread Sealant)'
      : 'Both TL-513 & TS-523 Systems'
  }
- Pack Size: ${formData.size}
- Estimated Quantity: ${formData.quantity} Units
- Application / Notes: ${formData.applicationNote || 'General enquiry.'}

Contact: Phone: ${CONTACT_PHONE} | Email: ${RECIPIENT_EMAIL}
Address: ${BRAND_INFO.name}, ${BRAND_INFO.address}
----------------------------------------------------------------------`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const subject = encodeURIComponent(`Product Enquiry: ${formData.company} - ${formData.product.toUpperCase()}`);
    const body = encodeURIComponent(formattedEnquiry);
    window.location.href = `mailto:${RECIPIENT_EMAIL}?subject=${subject}&body=${body}`;

    setSubmitted(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedEnquiry);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const whatsappTemplate = formData.applicationNote || (formData.quantity && formData.quantity !== '25')
    ? `Hello,
I'm interested in your industrial adhesive products. Could you please share the product details, available pack sizes, pricing, and technical datasheets?
My application: ${formData.applicationNote || ''}
Quantity required: ${formData.quantity ? formData.quantity + ' Units' : ''}
Thank you.`
    : `Hello,
I'm interested in your industrial adhesive products. Could you please share the product details, available pack sizes, pricing, and technical datasheets?
My application: 
Quantity required: 
Thank you.`;

  const whatsappMessage = encodeURIComponent(whatsappTemplate);
  const whatsappUrl = `https://wa.me/919742444744?text=${whatsappMessage}`;

  return (
    <section id="enquiry" className="py-12 sm:py-16 lg:py-20 bg-[#FAF8F5] border-b border-slate-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border-2 border-slate-900 border-t-2 border-t-[#A66A3F] p-4 sm:p-8 lg:p-10 shadow-xs relative">
          <div className="absolute top-4 right-4">
            <CrosshairReticle size={18} color="#A66A3F" />
          </div>

          {/* Section Header */}
          <div className="border-b border-slate-200 pb-5 mb-6">
            <span className="text-xs font-mono text-slate-500 uppercase flex items-center gap-1.5 mb-1">
              <span className="w-1.5 h-1.5 bg-[#A66A3F]" aria-hidden="true"></span>
              Contact & Technical Enquiry
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Get in Touch
            </h2>
            <div className="mt-2 mb-2 flex items-center gap-1.5">
              <div className="w-10 h-0.5 bg-[#0B2545]"></div>
              <div className="w-5 h-0.5 bg-[#A66A3F]"></div>
            </div>

            {/* Exactly Specified Address */}
            <div className="mt-3 p-3.5 bg-[#FAF8F5] border border-slate-200 border-l-4 border-l-[#A66A3F] text-xs font-sans text-slate-700 leading-relaxed">
              <strong className="text-slate-900 block font-semibold mb-0.5">
                LATTIS Industrial Adhesives
              </strong>
              <span>1st Cross, Adarsha Layout, Jnanabharathi, Mallathalli, Bengaluru – 560056, Karnataka, India.</span>
            </div>

            <div className="mt-3 flex items-center gap-3 sm:gap-4 text-xs font-mono text-slate-600 flex-wrap">
              <span>
                Phone:{' '}
                <a href={`tel:${CONTACT_PHONE.replace(/\s+/g, '')}`} className="font-semibold text-slate-900 hover:underline">
                  {CONTACT_PHONE}
                </a>
              </span>
              <span>·</span>
              <span>
                Email:{' '}
                <a href={`mailto:${RECIPIENT_EMAIL}`} className="font-semibold text-slate-900 hover:underline">
                  {RECIPIENT_EMAIL}
                </a>
              </span>
              <span>·</span>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 font-semibold hover:underline"
              >
                WhatsApp Chat
              </a>
            </div>
          </div>

          {submitted ? (
            <div className="space-y-4">
              <div className="p-4 bg-slate-900 text-white">
                <span className="text-amber-400 font-mono text-xs font-bold block mb-1">
                  ✓ ENQUIRY PREPARED
                </span>
                <p className="text-xs text-slate-300">
                  Your email client has been prepared with your enquiry addressed to{' '}
                  <span className="text-white font-semibold underline">{RECIPIENT_EMAIL}</span>.
                </p>
              </div>

              <div className="bg-slate-50 p-4 border border-slate-300 font-mono text-xs text-slate-700 whitespace-pre-wrap max-h-48 overflow-y-auto">
                {formattedEnquiry}
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="min-h-[44px] px-4 py-2 text-xs font-mono font-bold bg-slate-900 text-white hover:bg-slate-800 text-center flex items-center justify-center"
                >
                  {copied ? '✓ Copied' : 'Copy Summary'}
                </button>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] px-4 py-2 text-xs font-mono font-bold bg-emerald-700 text-white hover:bg-emerald-800 text-center flex items-center justify-center"
                >
                  Send via WhatsApp
                </a>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="min-h-[44px] text-xs font-mono text-slate-600 underline text-center flex items-center justify-center"
                >
                  Edit Enquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-700 mb-1">
                    NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Contact name"
                    className="w-full min-h-[44px] px-3.5 py-2.5 text-xs bg-[#F8F9FA] border border-slate-300 focus:bg-white focus:border-slate-900 focus:outline-none"
                  />
                  {errors.name && <span className="text-[11px] text-red-600 font-mono mt-0.5 block">{errors.name}</span>}
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-700 mb-1">
                    COMPANY *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Company / Workshop"
                    className="w-full min-h-[44px] px-3.5 py-2.5 text-xs bg-[#F8F9FA] border border-slate-300 focus:bg-white focus:border-slate-900 focus:outline-none"
                  />
                  {errors.company && <span className="text-[11px] text-red-600 font-mono mt-0.5 block">{errors.company}</span>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-700 mb-1">
                    PHONE *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 9742444744"
                    className="w-full min-h-[44px] px-3.5 py-2.5 text-xs bg-[#F8F9FA] border border-slate-300 focus:bg-white focus:border-slate-900 focus:outline-none"
                  />
                  {errors.phone && <span className="text-[11px] text-red-600 font-mono mt-0.5 block">{errors.phone}</span>}
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-700 mb-1">
                    EMAIL *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="contact@company.com"
                    className="w-full min-h-[44px] px-3.5 py-2.5 text-xs bg-[#F8F9FA] border border-slate-300 focus:bg-white focus:border-slate-900 focus:outline-none"
                  />
                  {errors.email && <span className="text-[11px] text-red-600 font-mono mt-0.5 block">{errors.email}</span>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-700 mb-1">
                    PRODUCT *
                  </label>
                  <select
                    value={formData.product}
                    onChange={(e) => setFormData({ ...formData, product: e.target.value as any })}
                    className="w-full min-h-[44px] px-3 py-2.5 text-xs bg-[#F8F9FA] border border-slate-300 focus:bg-white focus:border-slate-900 focus:outline-none"
                  >
                    <option value="tl-513">TL-513 Threadlocker</option>
                    <option value="ts-523">TS-523 Thread Sealant</option>
                    <option value="both">Both Systems</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-700 mb-1">
                    SIZE *
                  </label>
                  <select
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                    className="w-full min-h-[44px] px-3 py-2.5 text-xs bg-[#F8F9FA] border border-slate-300 focus:bg-white focus:border-slate-900 focus:outline-none"
                  >
                    <option value="10 ml">10 ml</option>
                    <option value="25 ml">25 ml</option>
                    <option value="50 ml">50 ml</option>
                    <option value="All Sizes">All Sizes</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-700 mb-1">
                    QUANTITY *
                  </label>
                  <select
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full min-h-[44px] px-3 py-2.5 text-xs bg-[#F8F9FA] border border-slate-300 focus:bg-white focus:border-slate-900 focus:outline-none"
                  >
                    <option value="10">10 Units</option>
                    <option value="25">25 Units</option>
                    <option value="50">50 Units</option>
                    <option value="100">100 Units</option>
                    <option value="250">250 Units</option>
                    <option value="500+">500+ Units</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold text-slate-700 mb-1">
                  CITY / REGION *
                </label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="e.g. Bengaluru, Karnataka"
                  className="w-full min-h-[44px] px-3.5 py-2.5 text-xs bg-[#F8F9FA] border border-slate-300 focus:bg-white focus:border-slate-900 focus:outline-none"
                />
                {errors.city && <span className="text-[11px] text-red-600 font-mono mt-0.5 block">{errors.city}</span>}
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold text-slate-700 mb-1">
                  APPLICATION DETAILS (OPTIONAL)
                </label>
                <textarea
                  rows={2}
                  value={formData.applicationNote}
                  onChange={(e) => setFormData({ ...formData, applicationNote: e.target.value })}
                  placeholder="Bolt size, pipe diameter, fluid medium, operating temperature."
                  className="w-full min-h-[64px] px-3.5 py-2.5 text-xs bg-[#F8F9FA] border border-slate-300 focus:bg-white focus:border-slate-900 focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full min-h-[48px] py-3 px-6 text-xs font-bold uppercase tracking-wider text-white bg-[#0B2545] hover:bg-[#071930] border-b-2 border-[#A66A3F] transition-all flex items-center justify-center shadow-xs"
                >
                  Submit Enquiry →
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
