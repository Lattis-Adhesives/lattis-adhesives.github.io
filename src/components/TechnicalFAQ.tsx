import React, { useState } from 'react';
import { CrosshairReticle } from './TechnicalDrawings';

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  keyTakeaway: string;
}

export const TechnicalFAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const faqs: FAQItem[] = [
    {
      id: 'faq-1',
      category: 'CURE MECHANISM',
      question: 'What triggers the anaerobic curing reaction?',
      answer:
        'Anaerobic adhesives polymerise strictly in the absence of atmospheric oxygen (air) and in the presence of active metal ions. While exposed to air in the bottle, the formulation remains a liquid monomer. When confined between assembled metal threads, air is excluded and rapid crosslinking creates a solid thermoset polymer.',
      keyTakeaway: 'Metal contact + absence of air (oxygen exclusion).'
    },
    {
      id: 'faq-2',
      category: 'METALLURGY',
      question: 'Which metals are "active" vs "passive"?',
      answer:
        'Active metals (fast cure): mild steel, carbon steel, cast iron, copper, brass, and bronze. Passive metals (slower cure): stainless steel, aluminum, zinc-plated/galvanized hardware, and titanium. Passive surfaces require additional fixture time before full load.',
      keyTakeaway: 'Active: steel, iron, brass. Passive: stainless steel, aluminum, zinc.'
    },
    {
      id: 'faq-3',
      category: 'STORAGE',
      question: 'Why doesn’t the adhesive cure inside the bottle?',
      answer:
        'Containers are made from specially engineered gas-permeable polyethylene and packaged with air headspace. Oxygen continuously permeates the liquid, acting as a natural stabilizer to prevent polymerisation on the shelf.',
      keyTakeaway: 'Permeable bottle + oxygen headspace keep product liquid.'
    },
    {
      id: 'faq-4',
      category: 'SURFACE PREPARATION',
      question: 'How clean must the threads be before application?',
      answer:
        'Threads should be free of heavy grease, cutting fluid emulsions, and rust scale. Degreasing with a rapid-drying solvent ensures 100% metal contact and predictable breakaway torque.',
      keyTakeaway: 'Degrease threads for optimal metal-to-adhesive bonding.'
    },
    {
      id: 'faq-5',
      category: 'DISASSEMBLY',
      question: 'How are locked joints dismantled for maintenance?',
      answer:
        'Both TL-513 and TS-523 are medium-strength grades engineered to disassemble using standard workshop hand wrenches without damaging threads. For large hardware, localized heating (~150°C) softens the polymer matrix for easy release.',
      keyTakeaway: 'Disassembles with standard hand wrenches.'
    },
    {
      id: 'faq-6',
      category: 'THREAD SEALING',
      question: 'Why use TS-523 thread sealant instead of PTFE tape?',
      answer:
        'PTFE tape shreds during fitting engagement, producing ribbons that contaminate hydraulic servo valves and filters. TS-523 cures into a 100% solid, non-shredding seal that fills the entire thread clearance and allows directional alignment.',
      keyTakeaway: 'Zero shredding, no valve contamination, 100% solid seal.'
    }
  ];

  return (
    <section id="faq" className="py-12 sm:py-16 lg:py-20 bg-white border-b border-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pb-6 border-b border-slate-200">
          <span className="text-xs font-mono text-slate-500 uppercase flex items-center gap-1.5 mb-1">
            <span className="w-1.5 h-1.5 bg-[#A66A3F]" aria-hidden="true"></span>
            Technical Knowledge
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <div className="mt-2 mb-2 flex items-center gap-1.5">
            <div className="w-10 h-0.5 bg-[#0B2545]"></div>
            <div className="w-5 h-0.5 bg-[#A66A3F]"></div>
          </div>
          <p className="mt-1 text-sm sm:text-base text-slate-600 max-w-xl">
            Engineering guidance on anaerobic curing, metallurgy, and joint application.
          </p>
        </div>

        {/* FAQ List */}
        <div className="mt-6 space-y-2.5">
          {faqs.map((faq, index) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`bg-[#FAF8F5] border transition-all ${
                  isOpen ? 'border-[#784421] shadow-xs border-l-4 border-l-[#A66A3F]' : 'border-slate-300 hover:border-[#A66A3F]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full min-h-[48px] p-3.5 sm:p-4 text-left flex items-start sm:items-center justify-between gap-3 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start sm:items-center gap-2.5 sm:gap-3 min-w-0">
                    <span className="font-mono text-xs font-bold text-slate-400 shrink-0 mt-0.5 sm:mt-0">
                      {String(index + 1).padStart(2, '0')}.
                    </span>
                    <h3 className="font-display text-base sm:text-lg lg:text-xl font-bold text-slate-900 leading-snug break-words">
                      {faq.question}
                    </h3>
                  </div>

                  <span className={`font-mono text-xs font-bold shrink-0 min-w-[24px] min-h-[24px] flex items-center justify-center ${isOpen ? 'text-[#784421]' : 'text-slate-500'}`}>
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-3.5 sm:px-4 pb-4 pt-1 border-t border-slate-200 font-sans text-xs sm:text-sm text-slate-600 leading-relaxed break-words">
                    <p>{faq.answer}</p>
                    <div className="mt-2.5 pt-2 border-t border-slate-200 font-mono text-xs text-slate-800 flex flex-col xs:flex-row items-start xs:items-center justify-between gap-1">
                      <span><strong>Key:</strong> {faq.keyTakeaway}</span>
                      <CrosshairReticle size={14} color="#A66A3F" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
