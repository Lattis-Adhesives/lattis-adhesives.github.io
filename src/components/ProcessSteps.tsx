import React from 'react';
import { StepCleanIcon, StepApplyIcon, StepAssembleIcon, StepCureIcon, HazardWarningIcon } from './TechnicalDrawings';

export const ProcessSteps: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Clean',
      desc: 'Remove oil, grease, or dirt from threads using solvent degreaser. Allow parts to dry.',
      icon: StepCleanIcon,
      color: '#0B2545'
    },
    {
      num: '02',
      title: 'Apply',
      desc: 'Apply a controlled bead of LATTIS to the engagement threads.',
      icon: StepApplyIcon,
      color: '#0284C7'
    },
    {
      num: '03',
      title: 'Assemble',
      desc: 'Assemble and tighten to required engineering torque or fitting orientation.',
      icon: StepAssembleIcon,
      color: '#784421'
    },
    {
      num: '04',
      title: 'Cure',
      desc: 'Allow anaerobic cure in the joint before placing into vibration or pressure service.',
      icon: StepCureIcon,
      color: '#1E293B'
    }
  ];

  return (
    <section id="directions" className="py-12 sm:py-16 lg:py-20 bg-white border-b border-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pb-6 border-b border-slate-200">
          <span className="text-xs font-mono text-slate-500 uppercase flex items-center gap-1.5 mb-1">
            <span className="w-1.5 h-1.5 bg-[#A66A3F]" aria-hidden="true"></span>
            03. Protocol
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Directions for Use
          </h2>
          <div className="mt-2 mb-2 flex items-center gap-1.5">
            <div className="w-10 h-0.5 bg-[#0B2545]"></div>
            <div className="w-5 h-0.5 bg-[#A66A3F]"></div>
          </div>
          <p className="mt-1 text-sm sm:text-base text-slate-600 max-w-xl">
            Standard 4-step anaerobic application sequence printed on every container.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {steps.map((step) => {
            const Icon = step.icon;
            const isStep3 = step.num === '03';
            return (
              <div
                key={step.num}
                className={`p-4 sm:p-5 flex flex-col justify-between border ${
                  isStep3
                    ? 'bg-[#FAF8F5] border-[#A66A3F]/50 border-t-2 border-t-[#784421] shadow-xs'
                    : 'bg-[#F8F9FA] border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
                    <span className="font-display text-3xl font-black text-slate-900">
                      {step.num}
                    </span>
                    <div className="p-1.5 bg-white border border-slate-200 shrink-0">
                      <Icon size={24} color={step.color} />
                    </div>
                  </div>
                  <h3 className="font-display text-xl font-bold text-slate-900 mb-1.5">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Safety Note */}
        <div className="mt-6 p-4 bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
          <HazardWarningIcon size={24} className="shrink-0" />
          <p className="text-xs text-slate-300 font-sans leading-relaxed">
            Ensure good ventilation. Keep container lightly sealed and away from children. Always read Material Safety Data Sheet & Technical Data Sheet before use.
          </p>
        </div>
      </div>
    </section>
  );
};
