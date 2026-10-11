import React, { useState } from 'react';
import { PRODUCTS } from '../data/products';
import { ProductBottleView } from './ProductBottleView';

interface ProductSystemsProps {
  onEnquireProduct: (productId: 'tl-513' | 'ts-523') => void;
  selectedProductId?: 'tl-513' | 'ts-523';
}

export const ProductSystems: React.FC<ProductSystemsProps> = ({
  onEnquireProduct,
  selectedProductId = 'tl-513'
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'tl-513' | 'ts-523'>(selectedProductId || 'all');

  const tl = PRODUCTS['tl-513'];
  const ts = PRODUCTS['ts-523'];

  return (
    <section id="products" className="py-12 sm:py-16 lg:py-20 bg-white border-b border-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-1">
              <span>01. PRODUCT RANGE</span>
              <span aria-hidden="true">·</span>
              <span>INDUSTRIAL ADHESIVES</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              Product Systems
            </h2>
            <p className="mt-1 text-sm sm:text-base text-slate-600 max-w-xl">
              Precision anaerobic adhesives engineered to lock and seal threaded mechanical assemblies.
            </p>
          </div>

          {/* Filter control tabs */}
          <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 border border-slate-300">
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className={`min-h-[36px] px-3 py-1.5 text-xs font-mono font-bold transition-all ${
                activeFilter === 'all'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Systems
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('tl-513')}
              className={`min-h-[36px] px-3 py-1.5 text-xs font-mono font-bold transition-all ${
                activeFilter === 'tl-513'
                  ? 'bg-[#0B2545] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              TL-513
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('ts-523')}
              className={`min-h-[36px] px-3 py-1.5 text-xs font-mono font-bold transition-all ${
                activeFilter === 'ts-523'
                  ? 'bg-[#7A3E1D] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              TS-523
            </button>
          </div>
        </div>

        {/* Product Cards Stack */}
        <div className="mt-8 space-y-8 sm:space-y-10">
          {(activeFilter === 'all' || activeFilter === 'tl-513') && (
            <div id="tl-513" className="scroll-mt-24">
              <ProductBottleView
                product={tl}
                onEnquireClick={onEnquireProduct}
              />
            </div>
          )}

          {(activeFilter === 'all' || activeFilter === 'ts-523') && (
            <div id="ts-523" className="scroll-mt-24">
              <ProductBottleView
                product={ts}
                onEnquireClick={onEnquireProduct}
              />
            </div>
          )}
        </div>

        {/* Technical Specification Matrix */}
        <div className="mt-10 sm:mt-12 bg-slate-50 border border-slate-300 p-4 sm:p-5 overflow-hidden">
          <h3 className="font-display text-xl font-bold text-slate-900 mb-3 border-b border-slate-200 pb-2">
            Technical Specification Matrix
          </h3>

          <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
            <table className="w-full min-w-[500px] text-left font-mono text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-300 bg-white">
                  <th className="py-2.5 px-3 text-slate-600 font-bold">PROPERTY</th>
                  <th className="py-2.5 px-3 text-[#0B2545] font-bold">TL-513 (THREADLOCKER)</th>
                  <th className="py-2.5 px-3 text-[#7A3E1D] font-bold">TS-523 (THREAD SEALANT)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr className="hover:bg-slate-100/60">
                  <td className="py-2.5 px-3 font-semibold text-slate-700">Classification</td>
                  <td className="py-2.5 px-3 text-slate-900">Medium Strength Anaerobic Threadlocker</td>
                  <td className="py-2.5 px-3 text-slate-900">Medium Strength Anaerobic Thread Sealant</td>
                </tr>
                <tr className="hover:bg-slate-100/60">
                  <td className="py-2.5 px-3 font-semibold text-slate-700">Primary Function</td>
                  <td className="py-2.5 px-3 text-slate-900 font-bold">Prevents Loosening From Vibration</td>
                  <td className="py-2.5 px-3 text-slate-900 font-bold">Seals and Locks Threaded Fittings</td>
                </tr>
                <tr className="hover:bg-slate-100/60">
                  <td className="py-2.5 px-3 font-semibold text-slate-700">Color Identity</td>
                  <td className="py-2.5 px-3 text-slate-900">Navy & Precision Blue</td>
                  <td className="py-2.5 px-3 text-slate-900">Industrial Warm Brown</td>
                </tr>
                <tr className="hover:bg-slate-100/60">
                  <td className="py-2.5 px-3 font-semibold text-slate-700">Available Sizes</td>
                  <td className="py-2.5 px-3 text-slate-900 font-bold">10 ml · 25 ml · 50 ml</td>
                  <td className="py-2.5 px-3 text-slate-900 font-bold">10 ml · 25 ml · 50 ml</td>
                </tr>
                <tr className="hover:bg-slate-100/60">
                  <td className="py-2.5 px-3 font-semibold text-slate-700">Disassembly</td>
                  <td className="py-2.5 px-3 text-slate-900">Standard hand tools</td>
                  <td className="py-2.5 px-3 text-slate-900">Standard pipe wrench</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
