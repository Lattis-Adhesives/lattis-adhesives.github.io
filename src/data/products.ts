export interface ProductData {
  id: 'tl-513' | 'ts-523';
  code: string;
  title: string;
  category: string;
  claim: string;
  operationalClassification: string;
  themeColor: string;
  accentColor: string;
  bgLight: string;
  borderColor: string;
  textColor: string;
  availableSizes: string[];
  directions: {
    clean: string;
    apply: string;
    assemble: string;
    cure: string;
  };
  storage: string;
  hazardWarning: string;
  applications: string[];
}

export const PRODUCTS: Record<'tl-513' | 'ts-523', ProductData> = {
  'tl-513': {
    id: 'tl-513',
    code: 'TL-513',
    title: 'Medium Strength Anaerobic Threadlocker',
    category: 'Threadlocking System',
    claim: 'Prevents Loosening From Vibration',
    operationalClassification: 'Removable | Threadlocking | Industrial Use',
    themeColor: '#0B2545', // Deep Navy
    accentColor: '#0284C7', // Precision Blue
    bgLight: '#F0F6FF',
    borderColor: '#BAE6FD',
    textColor: '#0B2545',
    availableSizes: ['10 ml', '25 ml', '50 ml'],
    directions: {
      clean: 'Remove oil, grease or dirt from the bolt contact area.',
      apply: 'Apply a small amount of TL-513 to the engagement threads.',
      assemble: 'Assemble fastener and tighten to required torque.',
      cure: 'Allow to cure before putting the assembly into service.'
    },
    storage: 'Keep container lightly sealed in a well-ventilated area. Keep away from children. Read TDS & SDS before use.',
    hazardWarning: 'May cause allergic skin reaction and eye irritation. Use in ventilated area with protective equipment.',
    applications: [
      'Gearbox & pump casing bolts',
      'Motor mounts & vibration pads',
      'Conveyor rollers & bearing caps',
      'Flange fasteners (M6 – M20)'
    ]
  },
  'ts-523': {
    id: 'ts-523',
    code: 'TS-523',
    title: 'Medium Strength Anaerobic Thread Sealant',
    category: 'Thread Sealing System',
    claim: 'Seals and Locks Threaded Fittings',
    operationalClassification: 'Leak Resistant | Vibration Resistant | Industrial Use',
    themeColor: '#784421', // Primary Industrial Brown
    accentColor: '#A66A3F', // Secondary Copper Brown
    bgLight: '#FBF6F2',
    borderColor: '#A66A3F',
    textColor: '#784421',
    availableSizes: ['10 ml', '25 ml', '50 ml'],
    directions: {
      clean: 'Remove oil, grease or dirt from threaded fitting surfaces.',
      apply: 'Apply a small amount of TS-523 to leading threads.',
      assemble: 'Assemble fitting and tighten to required orientation.',
      cure: 'Allow to cure before subjecting to operational pressure.'
    },
    storage: 'Keep container lightly sealed in a well-ventilated area. Keep away from children. Read TDS & SDS before use.',
    hazardWarning: 'May cause allergic skin reaction and eye irritation. Use in ventilated area with protective equipment.',
    applications: [
      'Hydraulic power units & manifolds',
      'Pneumatic air lines & valves',
      'Cooling loops & fluid lines',
      'Threaded pipe elbows & couplings'
    ]
  }
};

export const BRAND_INFO = {
  name: 'LATTIS Industrial Adhesives',
  address: '1st Cross, Adarsha Layout, Jnanabharathi, Mallathalli, Bengaluru – 560056, Karnataka, India.',
  email: 'sales@lattis.in',
  phone: '+91 9742444744',
  whatsapp: '919742444744',
  availableSizes: ['10 ml', '25 ml', '50 ml']
};
