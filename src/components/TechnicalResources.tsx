import React, { useState } from 'react';

interface TechnicalResourcesProps {
  onRequestDoc: (docName: string) => void;
}

export const TechnicalResources: React.FC<TechnicalResourcesProps> = ({ onRequestDoc }) => {
  const [selectedDocPreview, setSelectedDocPreview] = useState<string | null>(null);

  const documents = [
    {
      id: 'tl-513-tds',
      title: 'TL-513 Technical Data Sheet (TDS)',
      product: 'TL-513 Threadlocker',
      type: 'TDS',
      available: false
    },
    {
      id: 'tl-513-sds',
      title: 'TL-513 Safety Data Sheet (SDS)',
      product: 'TL-513 Threadlocker',
      type: 'SDS',
      available: false
    },
    {
      id: 'ts-523-tds',
      title: 'TS-523 Technical Data Sheet (TDS)',
      product: 'TS-523 Thread Sealant',
      type: 'TDS',
      available: false
    },
    {
      id: 'ts-523-sds',
      title: 'TS-523 Safety Data Sheet (SDS)',
      product: 'TS-523 Thread Sealant',
      type: 'SDS',
      available: false
    },
    {
      id: 'guide-joint-locking',
      title: 'Joint Engineering Application Guide',
      product: 'TL-513 & TS-523 Systems',
      type: 'Guide',
      available: true
    }
  ];

  return (
    <section id="technical-resources" className="py-12 sm:py-16 lg:py-20 bg-[#FAF8F5] border-b border-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pb-6 border-b border-slate-200 flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div>
            <span className="text-xs font-mono text-slate-500 uppercase flex items-center gap-1.5 mb-1">
              <span className="w-1.5 h-1.5 bg-[#A66A3F]" aria-hidden="true"></span>
              04. Compliance & Engineering
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              Data Sheets & Resources
            </h2>
            <div className="mt-2 mb-2 flex items-center gap-1.5">
              <div className="w-10 h-0.5 bg-[#0B2545]"></div>
              <div className="w-5 h-0.5 bg-[#A66A3F]"></div>
            </div>
          </div>
          <span className="text-xs font-mono text-slate-500">
            Official signed dossiers provided upon technical request
          </span>
        </div>

        {/* Documentation Items */}
        <div className="mt-6 space-y-2.5">
          {documents.map((doc) => {
            const isTS = doc.id.includes('ts-523');
            return (
              <div
                key={doc.id}
                className="bg-white border border-slate-300 p-3.5 sm:p-4 hover:border-slate-400 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-start sm:items-center gap-3 min-w-0">
                  <span
                    className={`font-mono text-[10px] font-bold px-2 py-0.5 border shrink-0 mt-0.5 sm:mt-0 ${
                      isTS
                        ? 'bg-[#FAF4EF] text-[#784421] border-[#A66A3F]/50'
                        : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {doc.type}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-base sm:text-lg font-bold text-slate-900 leading-tight">
                      {doc.title}
                    </h3>
                    <span className="font-mono text-[11px] text-slate-500 block sm:inline">{doc.product}</span>
                  </div>
                </div>

                <div className="shrink-0 w-full sm:w-auto">
                  {doc.available ? (
                    <button
                      type="button"
                      onClick={() => setSelectedDocPreview(doc.id)}
                      className="min-h-[38px] px-4 py-1.5 text-xs font-mono font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 w-full sm:w-auto text-center flex items-center justify-center"
                    >
                      View Guide
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onRequestDoc(doc.title)}
                      className={`min-h-[38px] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white w-full sm:w-auto text-center flex items-center justify-center transition-all ${
                        isTS
                          ? 'bg-[#784421] hover:bg-[#66391a]'
                          : 'bg-[#0B2545] hover:bg-[#071930]'
                      }`}
                    >
                      Request PDF
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Guide Preview Modal */}
      {selectedDocPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white border-2 border-slate-900 max-w-xl w-full p-5 sm:p-6 relative font-sans text-xs shadow-xl">
            <button
              type="button"
              onClick={() => setSelectedDocPreview(null)}
              className="absolute top-4 right-4 min-w-[36px] min-h-[36px] p-1 font-mono text-slate-500 hover:text-slate-900 text-sm flex items-center justify-center"
              aria-label="Close modal"
            >
              ✕
            </button>

            <h3 className="font-display text-xl sm:text-2xl font-black text-slate-900 mb-3 pr-8">
              Joint Engineering Application Guide
            </h3>

            <div className="space-y-3 text-slate-700 leading-relaxed font-mono text-[11px] max-h-72 overflow-y-auto pr-2">
              <p>
                <strong>1. Surface Preparation:</strong> Degrease mating threads using solvent. Anaerobic chemistry requires direct metal contact free of heavy oil films.
              </p>
              <p>
                <strong>2. TL-513 Fastener Dispensing:</strong> Apply 3–5 drops across engagement threads. For blind holes, dispense directly down internal threads.
              </p>
              <p>
                <strong>3. TS-523 Pipe Sealing:</strong> Apply continuous 360° bead on leading male threads, leaving first thread bare. Wrench-tighten to required orientation.
              </p>
              <p>
                <strong>4. Disassembly:</strong> Both products disassemble with standard hand tools. Localized heat (~150°C) softens polymer for easy release on large fasteners.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 text-right">
              <button
                type="button"
                onClick={() => setSelectedDocPreview(null)}
                className="min-h-[38px] px-4 py-1.5 bg-slate-900 text-white font-mono text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
