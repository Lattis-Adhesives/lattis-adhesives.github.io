import React, { useState } from 'react';
import { LattisLogo } from './LattisLogo';

interface HeaderProps {
  onQuoteClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onQuoteClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Products', href: '#products' },
    { label: 'Data Sheets', href: '#technical-resources' },
    { label: 'Contact', href: '#enquiry' },
    { label: 'FAQ', href: '#faq' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-16 sm:h-18">
          {/* Zone 1: Brand Mark */}
          <a
            href="#"
            className="flex items-center whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 rounded-xs"
            aria-label="LATTIS Industrial Adhesives Home"
          >
            <LattisLogo size="md" />
          </a>

          {/* Zone 2: Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-slate-700">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-slate-900 hover:underline decoration-2 underline-offset-4 whitespace-nowrap transition-colors py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: CTA & Mobile Hamburger */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={onQuoteClick}
              className="px-3 sm:px-4 py-2 text-xs font-bold text-white bg-[#0B2545] hover:bg-[#071930] active:scale-[0.98] transition-all whitespace-nowrap uppercase tracking-wider shadow-xs min-h-[38px] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
            >
              Enquire Now
            </button>

            {/* Mobile Hamburger Button with comfortable 44px tap target */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden min-w-[40px] min-h-[40px] p-2 text-slate-700 hover:text-slate-950 hover:bg-slate-100 rounded-sm flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-1 shadow-lg">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center min-h-[44px] px-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 border-b border-slate-100 transition-colors"
            >
              {link.label}
            </a>
          ))}

          <div className="pt-3">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onQuoteClick();
              }}
              className="w-full min-h-[44px] py-2.5 text-xs font-bold text-white bg-[#0B2545] text-center uppercase tracking-wider flex items-center justify-center shadow-xs"
            >
              Enquire Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
