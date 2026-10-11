import React, { useState } from 'react';
import { BRAND_INFO } from '../data/products';
import { LattisLogo } from './LattisLogo';

interface FooterProps {
  onEnquireClick: (product: 'tl-513' | 'ts-523') => void;
}

export const Footer: React.FC<FooterProps> = ({ onEnquireClick }) => {
  const [showLegalModal, setShowLegalModal] = useState<null | 'privacy' | 'terms'>(null);

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 font-sans text-xs relative">
      {/* Engineering Brand Accent Line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-[#0B2545] via-[#A66A3F] to-[#784421]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-slate-800">
          {/* Logo & Tagline */}
          <div className="space-y-2">
            <LattisLogo variant="light" src="/Footer_logo.png" size="md" />
            <p className="text-slate-400 text-xs">
              Industrial anaerobic adhesives and joint sealants.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center gap-x-5 sm:gap-x-6 gap-y-2.5 font-mono text-xs">
            <button
              type="button"
              onClick={() => onEnquireClick('tl-513')}
              className="text-slate-300 hover:text-white transition-colors min-h-[36px] flex items-center"
            >
              TL-513
            </button>
            <button
              type="button"
              onClick={() => onEnquireClick('ts-523')}
              className="text-[#A66A3F] hover:text-[#E5B94F] font-semibold transition-colors min-h-[36px] flex items-center"
            >
              TS-523
            </button>
            <a href="#technical-resources" className="text-slate-300 hover:text-white transition-colors min-h-[36px] flex items-center">
              Data Sheets
            </a>
            <a href="#enquiry" className="text-slate-300 hover:text-white transition-colors min-h-[36px] flex items-center">
              Contact
            </a>
            <a href="#faq" className="text-slate-300 hover:text-white transition-colors min-h-[36px] flex items-center">
              FAQ
            </a>
          </div>

          {/* Contact Coordinates */}
          <div className="text-left md:text-right font-mono text-xs space-y-1.5 shrink-0">
            <p>
              <a href={`mailto:${BRAND_INFO.email}`} className="text-slate-300 hover:text-white block">
                {BRAND_INFO.email}
              </a>
            </p>
            <p>
              <a href={`tel:${BRAND_INFO.phone.replace(/\s+/g, '')}`} className="text-slate-300 hover:text-white block">
                {BRAND_INFO.phone}
              </a>
            </p>
          </div>
        </div>

        {/* Bottom Copyright & Legal Links */}
        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] font-mono text-slate-500">
          <div>
            © {new Date().getFullYear()} LATTIS Industrial Adhesives. All rights reserved.
          </div>

          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            <button
              type="button"
              onClick={() => setShowLegalModal('privacy')}
              className="hover:text-slate-300 underline py-1"
            >
              Privacy Policy
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => setShowLegalModal('terms')}
              className="hover:text-slate-300 underline py-1"
            >
              Terms of Supply
            </button>
          </div>
        </div>
      </div>

      {/* Legal Modal */}
      {showLegalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white text-slate-900 border-2 border-slate-900 max-w-lg w-full p-5 sm:p-6 relative font-sans text-xs shadow-2xl">
            <button
              type="button"
              onClick={() => setShowLegalModal(null)}
              className="absolute top-4 right-4 min-w-[36px] min-h-[36px] p-1 font-mono text-slate-500 hover:text-slate-900 text-sm flex items-center justify-center"
              aria-label="Close modal"
            >
              ✕
            </button>

            <h3 className="font-display text-xl font-bold mb-3 text-slate-900 pr-8">
              {showLegalModal === 'privacy' ? 'Privacy Policy' : 'Terms of Supply'}
            </h3>

            <div className="space-y-2 text-slate-600 leading-relaxed max-h-60 overflow-y-auto pr-2">
              <p>
                <strong>LATTIS Industrial Adhesives:</strong> Contact details provided via forms are utilized strictly to respond to customer inquiries and provide technical assistance.
              </p>
              <p>
                We do not sell or share business contact information with third parties.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 text-right">
              <button
                type="button"
                onClick={() => setShowLegalModal(null)}
                className="min-h-[38px] px-4 py-1.5 bg-slate-900 text-white font-mono text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
