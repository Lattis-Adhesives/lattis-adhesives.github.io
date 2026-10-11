import React, { useState } from 'react';
import { BoltFastenerDiagram, PipeFittingDiagram, CrosshairReticle } from './TechnicalDrawings';

export const ApplicationVisualisation: React.FC = () => {
  const [activeJoint, setActiveJoint] = useState<'fastener' | 'pipe'>('fastener');

  return (
    <section id="applications" className="py-12 sm:py-16 lg:py-20 bg-[#F8F9FA] border-b border-slate-300 engineering-grid-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl">
          <span className="text-xs font-mono text-slate-500 uppercase block mb-1">
            02. Joint Mechanics
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            How Anaerobic Chemistry Works
          </h2>
          <p className="mt-1 text-sm sm:text-base text-slate-600 leading-relaxed">
            Torqued threads achieve only 15% metal contact; the remaining 85% is empty clearance.
            LATTIS fills this gap completely, polymerising in the absence of air into an inert solid.
          </p>
        </div>

        {/* Tab Controls: Side by Side on a Single Horizontal Row with Equal Widths & Consistent Heights */}
        <div className="mt-6 grid grid-cols-2 gap-2 sm:gap-2.5 max-w-xl w-full">
          <button
            type="button"
            onClick={() => setActiveJoint('fastener')}
            className={`min-h-[42px] w-full px-2 sm:px-4 py-2 font-mono text-[11px] sm:text-xs font-bold transition-all border flex items-center justify-center text-center leading-tight ${
              activeJoint === 'fastener'
                ? 'bg-[#0B2545] text-white border-[#0B2545] shadow-xs'
                : 'bg-white text-slate-700 border-slate-300 hover:border-slate-500'
            }`}
          >
            Threaded Fasteners (TL-513)
          </button>
          <button
            type="button"
            onClick={() => setActiveJoint('pipe')}
            className={`min-h-[42px] w-full px-2 sm:px-4 py-2 font-mono text-[11px] sm:text-xs font-bold transition-all border flex items-center justify-center text-center leading-tight ${
              activeJoint === 'pipe'
                ? 'bg-[#7A3E1D] text-white border-[#7A3E1D] shadow-xs'
                : 'bg-white text-slate-700 border-slate-300 hover:border-slate-500'
            }`}
          >
            Pipe Fittings (TS-523)
          </button>
        </div>

        {/* Display Card */}
        <div className="mt-4 bg-white border-2 border-slate-900 p-4 sm:p-6 lg:p-8 relative">
          <div className="absolute top-4 right-4">
            <CrosshairReticle size={18} color="#64748B" />
          </div>

          {activeJoint === 'fastener' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              <div className="lg:col-span-6 space-y-3 font-sans text-xs sm:text-sm">
                <span className="font-mono text-xs font-bold text-[#0B2545] block">
                  TL-513 FASTENER MECHANICS
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Anti-Loosening Mechanics
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Cyclic vibration causes transverse slippage across fastener threads. TL-513 bonds mating threads with 100% surface engagement, locking the clamp load securely while allowing standard hand tool removal.
                </p>
                <div className="pt-2 grid grid-cols-1 xs:grid-cols-2 gap-2 font-mono text-[11px]">
                  <div className="p-2.5 bg-slate-50 border border-slate-200">
                    <span className="text-slate-500 block">STANDARD BOLT</span>
                    <span className="font-bold text-slate-800">15% Contact</span>
                  </div>
                  <div className="p-2.5 bg-[#0B2545] text-white">
                    <span className="text-blue-200 block">WITH TL-513</span>
                    <span className="font-bold text-white">100% Solid Polymer</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 bg-slate-50 border border-slate-200 p-4 flex items-center justify-center min-h-[140px]">
                <BoltFastenerDiagram className="h-28 sm:h-32" />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              <div className="lg:col-span-6 space-y-3 font-sans text-xs sm:text-sm">
                <span className="font-mono text-xs font-bold text-[#7A3E1D] block">
                  TS-523 PIPE SEAL MECHANICS
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Positive Fluid Sealing
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Unlike PTFE tape ribbons that shred and migrate into hydraulic lines, TS-523 cures into an insoluble seal that fills the entire helical space, resists fluid pressure surges, and permits directional alignment.
                </p>
                <div className="pt-2 grid grid-cols-1 xs:grid-cols-2 gap-2 font-mono text-[11px]">
                  <div className="p-2.5 bg-slate-50 border border-slate-200">
                    <span className="text-slate-500 block">PTFE TAPE</span>
                    <span className="font-bold text-slate-800">Shreds & Creeps</span>
                  </div>
                  <div className="p-2.5 bg-[#7A3E1D] text-white">
                    <span className="text-amber-200 block">WITH TS-523</span>
                    <span className="font-bold text-white">100% Insoluble Seal</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 bg-slate-50 border border-slate-200 p-4 flex items-center justify-center min-h-[140px]">
                <PipeFittingDiagram className="h-28 sm:h-32" />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
