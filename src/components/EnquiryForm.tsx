import React, { useState, useEffect } from 'react';
import { CrosshairReticle } from './TechnicalDrawings';
import { BRAND_INFO } from '../data/products';

export const RECIPIENT_EMAIL = 'sales@lattis.in';
export const CONTACT_PHONE = '+91 9742444744';

/**
 * Validates and normalizes an Indian mobile number.
 *
 * Rules:
 * - Accept valid 10-digit Indian mobile number beginning with 6, 7, 8 or 9.
 * - Accept optional +91, 91 or trunk 0 prefix with spaces or hyphens.
 * - Reject numbers with more or fewer than 10 digits after normalization.
 * - Reject repeated sequences like 6666666666, 7777777777, etc.
 */
export const validateIndianMobile = (
  raw: string
): { isValid: boolean; normalized: string; formatted: string; error?: string } => {
  if (!raw || !raw.trim()) {
    return { isValid: false, normalized: '', formatted: '', error: 'Mobile number is required.' };
  }

  // Remove common separators (spaces, hyphens, parentheses, dots)
  let cleaned = raw.trim().replace(/[\s\-\(\)\.]/g, '');

  // Handle international & trunk prefixes
  if (cleaned.startsWith('+91')) {
    cleaned = cleaned.slice(3);
  } else if (cleaned.startsWith('0') && cleaned.length === 11) {
    cleaned = cleaned.slice(1);
  } else if (cleaned.startsWith('91') && cleaned.length === 12) {
    cleaned = cleaned.slice(2);
  }

  // Check if non-digit characters remain
  if (!/^\d+$/.test(cleaned)) {
    return {
      isValid: false,
      normalized: cleaned,
      formatted: raw,
      error: 'Mobile number must contain digits only.'
    };
  }

  // Reject more or fewer than 10 digits after normalization
  if (cleaned.length !== 10) {
    return {
      isValid: false,
      normalized: cleaned,
      formatted: raw,
      error: 'Please enter a valid 10-digit Indian mobile number.'
    };
  }

  // Check starting digit (must begin with 6, 7, 8 or 9)
  if (!/^[6-9]/.test(cleaned)) {
    return {
      isValid: false,
      normalized: cleaned,
      formatted: raw,
      error: 'Indian mobile numbers must begin with 6, 7, 8 or 9.'
    };
  }

  // Reject all 10 digits being the exact same repeated digit (e.g. 6666666666)
  if (/^(\d)\1{9}$/.test(cleaned)) {
    return {
      isValid: false,
      normalized: cleaned,
      formatted: raw,
      error: 'Repeated-digit sequence is not a valid mobile number.'
    };
  }

  const formatted = `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  return {
    isValid: true,
    normalized: cleaned,
    formatted
  };
};

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

  const numQuantity = parseInt(formData.quantity, 10) || 0;

  const handleIncrement = () => {
    const current = parseInt(formData.quantity, 10);
    const validCurrent = isNaN(current) || current < 1 ? 0 : current;
    const nextVal = validCurrent + 2;
    setFormData((prev) => ({ ...prev, quantity: String(nextVal) }));
    if (errors.quantity) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.quantity;
        return next;
      });
    }
  };

  const handleDecrement = () => {
    const current = parseInt(formData.quantity, 10);
    const validCurrent = isNaN(current) ? 1 : current;
    const nextVal = Math.max(1, validCurrent - 1);
    setFormData((prev) => ({ ...prev, quantity: String(nextVal) }));
    if (errors.quantity) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.quantity;
        return next;
      });
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Contact name is required.';
    if (!formData.company.trim()) errs.company = 'Company name is required.';

    // Comprehensive Indian mobile validation
    const phoneCheck = validateIndianMobile(formData.phone);
    if (!phoneCheck.isValid) {
      errs.phone = phoneCheck.error || 'Please enter a valid 10-digit mobile number.';
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email = 'A valid work email is required.';
    }

    const qtyVal = parseInt(formData.quantity, 10);
    if (!formData.quantity || isNaN(qtyVal) || qtyVal < 1) {
      errs.quantity = 'Quantity must be at least 1 unit.';
    }

    if (!formData.city.trim()) errs.city = 'City / location is required.';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Format verified phone for clean presentation in email
  const verifiedPhone = validateIndianMobile(formData.phone).formatted || formData.phone;

  const formattedEnquiry = `LATTIS INDUSTRIAL ADHESIVES — ENQUIRY
----------------------------------------------------------------------
Date: ${new Date().toLocaleDateString('en-IN')}
To: ${RECIPIENT_EMAIL}

CONTACT DETAILS:
- Name: ${formData.name}
- Company: ${formData.company}
- Phone: ${verifiedPhone}
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

    // Validate phone number and other fields before constructing or opening mailto:
    if (!validate()) {
      return;
    }

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
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="name-input" className="block text-xs font-mono font-semibold text-slate-700">
                      NAME *
                    </label>
                    {errors.name && (
                      <span className="text-[11px] text-red-600 font-mono font-medium">
                        {errors.name}
                      </span>
                    )}
                  </div>
                  <input
                    id="name-input"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name && e.target.value.trim()) {
                        setErrors((prev) => {
                          const next = { ...prev };
                          delete next.name;
                          return next;
                        });
                      }
                    }}
                    placeholder="Contact name"
                    className={`w-full min-h-[44px] px-3.5 py-2.5 text-xs bg-[#F8F9FA] border transition-colors focus:bg-white focus:outline-none ${
                      errors.name ? 'border-red-600 focus:border-red-600' : 'border-slate-300 focus:border-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="company-input" className="block text-xs font-mono font-semibold text-slate-700">
                      COMPANY *
                    </label>
                    {errors.company && (
                      <span className="text-[11px] text-red-600 font-mono font-medium">
                        {errors.company}
                      </span>
                    )}
                  </div>
                  <input
                    id="company-input"
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => {
                      setFormData({ ...formData, company: e.target.value });
                      if (errors.company && e.target.value.trim()) {
                        setErrors((prev) => {
                          const next = { ...prev };
                          delete next.company;
                          return next;
                        });
                      }
                    }}
                    placeholder="Company / Workshop"
                    className={`w-full min-h-[44px] px-3.5 py-2.5 text-xs bg-[#F8F9FA] border transition-colors focus:bg-white focus:outline-none ${
                      errors.company ? 'border-red-600 focus:border-red-600' : 'border-slate-300 focus:border-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="phone-input" className="block text-xs font-mono font-semibold text-slate-700">
                      PHONE *
                    </label>
                    {errors.phone && (
                      <span id="phone-error" className="text-[11px] text-red-600 font-mono font-medium">
                        {errors.phone}
                      </span>
                    )}
                  </div>
                  <input
                    id="phone-input"
                    type="tel"
                    required
                    name="phone"
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={(e) => {
                      const val = e.target.value;
                      setFormData((prev) => ({ ...prev, phone: val }));
                      // Clear error dynamically as soon as the user corrects to a valid format
                      if (errors.phone) {
                        const check = validateIndianMobile(val);
                        if (check.isValid) {
                          setErrors((prev) => {
                            const next = { ...prev };
                            delete next.phone;
                            return next;
                          });
                        }
                      }
                    }}
                    onBlur={(e) => {
                      const val = e.target.value;
                      if (val.trim()) {
                        const check = validateIndianMobile(val);
                        if (!check.isValid) {
                          setErrors((prev) => ({ ...prev, phone: check.error || 'Invalid phone number.' }));
                        } else {
                          setErrors((prev) => {
                            const next = { ...prev };
                            delete next.phone;
                            return next;
                          });
                        }
                      }
                    }}
                    placeholder="+91 98765 43210"
                    pattern="^(?:(?:\+91|91|0)[\s\-]?)?[6-9]\d{4}[\s\-]?\d{5}$"
                    title="Please enter a valid 10-digit Indian mobile number beginning with 6, 7, 8 or 9 (e.g. +91 98765 43210)"
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                    className={`w-full min-h-[44px] px-3.5 py-2.5 text-xs bg-[#F8F9FA] border transition-colors focus:bg-white focus:outline-none ${
                      errors.phone
                        ? 'border-red-600 focus:border-red-600 ring-1 ring-red-600/30'
                        : 'border-slate-300 focus:border-slate-900'
                    }`}
                  />
                  <span className="text-[10px] text-slate-500 font-mono mt-1 block">
                    10-digit Indian mobile starting with 6, 7, 8 or 9 (e.g. +91 98765 43210)
                  </span>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="email-input" className="block text-xs font-mono font-semibold text-slate-700">
                      EMAIL *
                    </label>
                    {errors.email && (
                      <span className="text-[11px] text-red-600 font-mono font-medium">
                        {errors.email}
                      </span>
                    )}
                  </div>
                  <input
                    id="email-input"
                    type="email"
                    required
                    name="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email && e.target.value.includes('@')) {
                        setErrors((prev) => {
                          const next = { ...prev };
                          delete next.email;
                          return next;
                        });
                      }
                    }}
                    placeholder="contact@company.com"
                    className={`w-full min-h-[44px] px-3.5 py-2.5 text-xs bg-[#F8F9FA] border transition-colors focus:bg-white focus:outline-none ${
                      errors.email ? 'border-red-600 focus:border-red-600' : 'border-slate-300 focus:border-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="product-select" className="block text-xs font-mono font-semibold text-slate-700 mb-1">
                    PRODUCT *
                  </label>
                  <select
                    id="product-select"
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
                  <label htmlFor="size-select" className="block text-xs font-mono font-semibold text-slate-700 mb-1">
                    SIZE *
                  </label>
                  <select
                    id="size-select"
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
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="qty-input" className="block text-xs font-mono font-semibold text-slate-700">
                      QUANTITY (UNITS) *
                    </label>
                    {numQuantity > 200 ? (
                      <span className="text-[10px] text-[#784421] font-mono font-bold">
                        BULK ORDER
                      </span>
                    ) : errors.quantity ? (
                      <span className="text-[11px] text-red-600 font-mono font-medium">
                        {errors.quantity}
                      </span>
                    ) : null}
                  </div>

                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={handleDecrement}
                      disabled={numQuantity <= 1}
                      className="min-w-[40px] min-h-[44px] bg-slate-100 hover:bg-slate-200 active:bg-slate-300 disabled:opacity-40 disabled:cursor-not-allowed border border-slate-300 border-r-0 text-slate-800 font-mono text-base font-bold flex items-center justify-center transition-colors focus:outline-none"
                      title="Decrease quantity by 1"
                      aria-label="Decrease quantity by 1"
                    >
                      -
                    </button>

                    <input
                      id="qty-input"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      required
                      value={formData.quantity}
                      onChange={(e) => {
                        const raw = e.target.value;
                        if (/^\d*$/.test(raw)) {
                          setFormData((prev) => ({ ...prev, quantity: raw }));
                          if (errors.quantity && parseInt(raw, 10) >= 1) {
                            setErrors((prev) => {
                              const next = { ...prev };
                              delete next.quantity;
                              return next;
                            });
                          }
                        }
                      }}
                      onBlur={() => {
                        const val = parseInt(formData.quantity, 10);
                        if (isNaN(val) || val < 1) {
                          setFormData((prev) => ({ ...prev, quantity: '1' }));
                        }
                      }}
                      placeholder="1 - 200"
                      className="w-full min-h-[44px] px-3 py-2.5 text-center text-xs font-mono font-bold bg-[#F8F9FA] border border-slate-300 focus:bg-white focus:border-slate-900 focus:outline-none"
                    />

                    <button
                      type="button"
                      onClick={handleIncrement}
                      className="min-w-[40px] min-h-[44px] bg-slate-100 hover:bg-slate-200 active:bg-slate-300 border border-slate-300 border-l-0 text-slate-800 font-mono text-base font-bold flex items-center justify-center transition-colors focus:outline-none"
                      title="Increase quantity by 2"
                      aria-label="Increase quantity by 2"
                    >
                      +
                    </button>
                  </div>

                  {numQuantity > 200 ? (
                    <div className="mt-1.5 p-2 bg-[#FAF4EF] border border-[#A66A3F]/40 text-[11px] font-mono text-[#784421] leading-tight">
                      ⚠️ For bulk quantities exceeding 200 units, please contact us directly regarding custom pricing and bulk dispatch.
                    </div>
                  ) : (
                    <span className="text-[10px] text-slate-500 font-mono mt-1 block">
                      Range: 1 to 200 units.
                    </span>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="city-input" className="block text-xs font-mono font-semibold text-slate-700">
                    CITY / REGION *
                  </label>
                  {errors.city && (
                    <span className="text-[11px] text-red-600 font-mono font-medium">
                      {errors.city}
                    </span>
                  )}
                </div>
                <input
                  id="city-input"
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => {
                    setFormData({ ...formData, city: e.target.value });
                    if (errors.city && e.target.value.trim()) {
                      setErrors((prev) => {
                        const next = { ...prev };
                        delete next.city;
                        return next;
                      });
                    }
                  }}
                  placeholder="e.g. Bengaluru, Karnataka"
                  className={`w-full min-h-[44px] px-3.5 py-2.5 text-xs bg-[#F8F9FA] border transition-colors focus:bg-white focus:outline-none ${
                    errors.city ? 'border-red-600 focus:border-red-600' : 'border-slate-300 focus:border-slate-900'
                  }`}
                />
              </div>

              <div>
                <label htmlFor="notes-textarea" className="block text-xs font-mono font-semibold text-slate-700 mb-1">
                  APPLICATION DETAILS (OPTIONAL)
                </label>
                <textarea
                  id="notes-textarea"
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
                  className="w-full min-h-[48px] py-3 px-6 text-xs font-bold uppercase tracking-wider text-white bg-[#0B2545] hover:bg-[#071930] border-b-2 border-[#A66A3F] transition-all flex items-center justify-center shadow-xs cursor-pointer"
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
