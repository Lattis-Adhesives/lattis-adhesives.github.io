import React, { useState } from 'react';
import { PRODUCTS } from '../data/products';
import { CrosshairReticle, BoltFastenerDiagram, PipeFittingDiagram } from './TechnicalDrawings';
import { LattisLogo } from './LattisLogo';

interface HeroProps {
  onExploreClick: () => void;
  onEnquireClick: () => void;
  onSelectProduct: (productId: 'tl-513' | 'ts-523') => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onEnquireClick, onSelectProduct }) => {
  const [activeTab, setActiveTab] = useState<'tl-513' | 'ts-523'>('tl-513');
  const activeProduct = PRODUCTS[activeTab];
  const isTL = activeTab === 'tl-513';

  return (
    <section className="relative bg-[#F8F9FA] border-b border-slate-300 engineering-grid-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Minimal, Confident Engineering Message */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6">
            <span className="font-mono text-xs tracking-wider text-slate-500 uppercase block">
              Engineered Anaerobic Chemistry
            </span>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#0B2545] tracking-tight leading-[1.0] break-words">
              Precision in every connection.
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-slate-600 font-sans leading-relaxed max-w-xl">
              Anaerobic threadlocking and thread sealing formulations engineered for high-vibration
              mechanical assemblies and leak-proof industrial fluid systems.
            </p>

            {/* Product Switcher Tabs */}
            <div className="pt-1 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('tl-513')}
                className={`min-h-[40px] px-3.5 sm:px-4 py-2 text-xs font-mono font-bold transition-all border ${
                  isTL
                    ? 'bg-[#0B2545] text-white border-[#0B2545] shadow-xs'
                    : 'bg-white text-slate-700 border-slate-300 hover:border-slate-500'
                }`}
              >
                TL-513 Threadlocker
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('ts-523')}
                className={`min-h-[40px] px-3.5 sm:px-4 py-2 text-xs font-mono font-bold transition-all border ${
                  !isTL
                    ? 'bg-[#7A3E1D] text-white border-[#7A3E1D] shadow-xs'
                    : 'bg-white text-slate-700 border-slate-300 hover:border-slate-500'
                }`}
              >
                TS-523 Thread Sealant
              </button>
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  onSelectProduct(activeTab);
                  onExploreClick();
                }}
                className="min-h-[44px] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition-all shadow-xs hover:opacity-95 text-center flex items-center justify-center"
                style={{ backgroundColor: activeProduct.themeColor }}
              >
                View {activeProduct.code}
              </button>
              <button
                type="button"
                onClick={onEnquireClick}
                className="min-h-[44px] px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-900 bg-white border border-slate-400 hover:border-slate-900 transition-all text-center flex items-center justify-center"
              >
                Enquire Now
              </button>
            </div>
          </div>

          {/* Right Column: Rigid Technical Product Showcase Card */}
          <div className="lg:col-span-6 w-full">
            <div className="bg-white border-2 border-slate-900 shadow-sm relative overflow-hidden flex flex-col">
              {/* Product Card Top Band */}
              <div
                className="px-4 sm:px-5 py-3 text-white flex items-center justify-between gap-3"
                style={{ backgroundColor: activeProduct.themeColor }}
              >
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  <span className="font-display text-xl sm:text-2xl font-black tracking-wider shrink-0">
                    {activeProduct.code}
                  </span>
                  <span className="text-xs font-mono text-white/80 truncate">
                    {activeProduct.category}
                  </span>
                </div>
                <CrosshairReticle size={18} color="#FFFFFF" />
              </div>

              {/* Product Card Body */}
              <div className="p-4 sm:p-6 space-y-4">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <LattisLogo size="sm" />
                  <span className="font-mono text-[11px] sm:text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 border border-slate-200">
                    {activeProduct.operationalClassification}
                  </span>
                </div>

                <div>
                  <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                    {activeProduct.title}
                  </h2>
                  <p className="font-sans text-sm sm:text-base font-bold mt-1" style={{ color: activeProduct.accentColor }}>
                    {activeProduct.claim}
                  </p>
                </div>

                {/* Compact Diagram Box */}
                <div className="p-3 sm:p-4 bg-slate-50 border border-slate-200 flex items-center justify-center min-h-[140px]">
                  {isTL ? (
                    <BoltFastenerDiagram className="h-28 sm:h-32" />
                  ) : (
                    <PipeFittingDiagram className="h-28 sm:h-32" />
                  )}
                </div>

                {/* Card Bottom Strip */}
                <div className="pt-2 border-t border-slate-200 flex flex-col xs:flex-row items-start xs:items-center justify-between gap-1 text-xs font-mono text-slate-600">
                  <span>Removable with hand tools</span>
                  <span className="font-semibold text-slate-900">Anaerobic Matrix</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
