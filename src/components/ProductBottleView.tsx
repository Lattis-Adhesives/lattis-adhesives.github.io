import React from 'react';
import { ProductData } from '../data/products';
import { CrosshairReticle, PlusReticle, VerticalRuler, BoltFastenerDiagram, PipeFittingDiagram } from './TechnicalDrawings';
import { LattisLogo } from './LattisLogo';

interface ProductBottleViewProps {
  product: ProductData;
  onEnquireClick: (productId: 'tl-513' | 'ts-523') => void;
}

export const ProductBottleView: React.FC<ProductBottleViewProps> = ({
  product,
  onEnquireClick
}) => {
  const isTL = product.id === 'tl-513';
  const bandColor = isTL ? '#0B2545' : '#784421';
  const subAccent = isTL ? '#0284C7' : '#A66A3F';

  return (
    <div className="bg-white border border-slate-300 shadow-xs relative overflow-hidden">
      {/* Top Bar: Navy for TL-513, Industrial Brown for TS-523 */}
      <div
        className="text-white px-3.5 sm:px-4 py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs font-mono border-b border-black/10 transition-colors"
        style={{ backgroundColor: isTL ? '#0B2545' : '#784421' }}
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-white font-semibold shrink-0">{product.code}</span>
          <span className="text-white/60">/</span>
          <span className="truncate text-white/90">{product.category}</span>
        </div>
        <span className="text-white/80 text-[11px] shrink-0">{product.operationalClassification}</span>
      </div>

      {/* Main Label Card */}
      <div className="p-3.5 sm:p-6 bg-white">
        <div className="border-2 border-slate-900 bg-white relative flex flex-col md:flex-row shadow-inner">
          {/* Color Identification Band (horizontal strip on mobile, vertical spine on md+) */}
          <div
            className="w-full md:w-20 shrink-0 flex flex-row md:flex-col items-center justify-between p-3 md:p-3.5 relative"
            style={{ backgroundColor: bandColor }}
          >
            <div className="hidden md:block">
              <PlusReticle size={14} color="rgba(255,255,255,0.4)" />
            </div>

            <div className="flex items-center gap-2 md:transform md:-rotate-90 my-auto text-white">
              <span className="font-display text-lg sm:text-xl font-bold tracking-widest uppercase">
                {product.code}
              </span>
            </div>

            <div className="opacity-70">
              <CrosshairReticle size={16} color="#FFFFFF" />
            </div>
          </div>

          {/* Center Content */}
          <div className="flex-1 p-4 sm:p-6 flex flex-col justify-between bg-white min-w-0">
            <div className="flex items-start justify-between border-b border-slate-200 pb-3 gap-2 flex-wrap">
              <LattisLogo size="md" />
              <span className="font-mono text-xs text-slate-500">
                {product.category}
              </span>
            </div>

            <div className="py-3 sm:py-4">
              <h3
                className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight"
                style={{ color: bandColor }}
              >
                {product.code}
              </h3>

              <h4 className="font-display text-xl sm:text-2xl font-bold text-slate-900 leading-tight mt-1">
                {product.title}
              </h4>

              <p
                className="font-sans text-sm sm:text-base font-bold mt-1.5"
                style={{ color: subAccent }}
              >
                {product.claim}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-xs font-mono text-slate-600">
              <span>{isTL ? 'Prevents vibration loosening' : 'Prevents fluid leaks'}</span>
              <span>Standard tool removal</span>
            </div>
          </div>

          {/* Right Ruler Scale (visible on desktop) */}
          <div className="hidden lg:flex w-6 shrink-0 bg-slate-50 border-l border-slate-300 items-center justify-center p-1">
            <VerticalRuler height={220} ticks={22} />
          </div>
        </div>

        {/* Compact Mechanical Diagram Box */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 items-center bg-[#FAF8F5] p-3.5 sm:p-4 border border-slate-200">
          <div>
            <span className="font-mono text-[10px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mb-1">
              <span className="w-1.5 h-1.5 bg-[#A66A3F]" aria-hidden="true"></span>
              JOINT MECHANICS
            </span>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              {isTL
                ? 'Fills 100% of fastener thread clearance and cures into a tough polymer in the absence of air, preventing vibration loosening.'
                : 'Fills the helical clearance of pipe threads, forming an insoluble seal against vibration surges and fluid leaks.'}
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-2 flex items-center justify-center min-h-[120px]">
            {isTL ? (
              <BoltFastenerDiagram className="h-24 sm:h-28" />
            ) : (
              <PipeFittingDiagram className="h-24 sm:h-28" />
            )}
          </div>
        </div>

        {/* Action Button Row */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <div className="text-xs font-mono text-slate-500">
            Available in <span className="text-slate-900 font-semibold">{product.availableSizes.join(', ')}</span>
          </div>

          <button
            type="button"
            onClick={() => onEnquireClick(product.id)}
            className="min-h-[44px] px-5 py-2.5 text-xs font-bold text-white uppercase tracking-wider transition-all shadow-xs hover:opacity-95 text-center flex items-center justify-center w-full sm:w-auto"
            style={{ backgroundColor: bandColor }}
          >
            Enquire For {product.code}
          </button>
        </div>
      </div>
    </div>
  );
};
