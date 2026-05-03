/**
 * SpecRef Flange Database – TypeScript
 * Source: Trouvay & Cauvin – Piping Equipment 2001, Chapter 3
 * Standards: ASME B16.5, ASME B16.47 Series A & B, MSS-SP 44,
 *            BS 3293, API 6A, ASME B16.36
 * All linear dimensions in mm unless noted. Weights in kg (approximate).
 */

// ─────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────

export interface FlangeStandard {
  id: string;
  code: string;
  edition: string;
  title: string;
  npsRange?: { min: string; max: string };
  pressureClasses?: number[];
  flangeTypes?: string[];
  workingPressures_PSI?: number[];
  note?: string;
}

export interface FlangeType {
  id: string;
  code: string;
  name: string;
  nameFR: string;
  description: string;
  standard?: string;
}

export interface FacingType {
  id: string;
  code: string;
  name: string;
  nameFR: string;
  applicableClasses: number[];
  heightMm?: { class150_300?: number; class400_plus?: number };
  ringTypes?: string[];
  note?: string;
}

export interface PressureClassMap {
  asme: number;
  isoPn: number;
}

export interface FlangeSize {
  nps: string;
  dn?: number | null;
  A?: number;
  X?: number;
  Y_WN?: number;
  Y_SO?: number | null;
  B2?: number;
  T?: number;
  r?: number;
  wt_WN?: number;
  wt_SO?: number | null;
  wt_BL?: number | null;
  wt_TH?: number | null;
  wt_SW?: number | null;
}

export interface DimensionClass {
  standard: string;
  raisedFaceHeight_mm?: number;
  note?: string;
  npsRange?: string;
  sizes: FlangeSize[];
}

export interface CarbonSteelMaterial {
  astmGrade: string;
  description?: string;
  tensileMin_MPa?: number;
  yieldMin_MPa?: number;
  elongMin_pct?: number;
  reductionMin_pct?: number;
  hardnessMax_HB?: number;
}

export interface AlloyMaterial {
  astmGrade: string;
  uns?: string;
}

export interface LowTempMaterial {
  astmGrade: string;
  tensileRange_MPa?: string;
  yieldMin_MPa?: number;
  impactTemp_C?: number;
}

export interface GasketSample {
  nps: string;
  ID_mm?: number;
  OD_mm?: number;
  d2?: number;
  d3?: number;
}

export interface SpectacleBlindSample {
  nps: string;
  B: number;
  d: number;
  C: number;
  E: number;
  b1: number;
  b2: number;
}

// ─────────────────────────────────────────────────────────────────
// META
// ─────────────────────────────────────────────────────────────────

export const flangeMeta = {
  title: "SpecRef Flange Database",
  source: "Trouvay & Cauvin – Piping Equipment 2001, Chapter 3",
  edition: "2001",
  units: {
    dimensions: "mm",
    weights: "kg (approximate)",
    pressure: "bar / PSI (as noted)",
  },
  lastUpdated: "2024",
};

// ─────────────────────────────────────────────────────────────────
// STANDARDS
// ─────────────────────────────────────────────────────────────────

export const flangeStandards: FlangeStandard[] = [
  {
    id: "ASME_B16_5",
    code: "ASME B16.5",
    edition: "1996",
    title: "Pipe Flanges and Flanged Fittings NPS 1/2 to 24",
    npsRange: { min: "1/2", max: "24" },
    pressureClasses: [150, 300, 400, 600, 900, 1500, 2500],
  },
  {
    id: "ASME_B16_47_A",
    code: "ASME B16.47 Series A",
    edition: "1996",
    title: "Large Diameter Steel Flanges NPS 26 to 60 (Series A)",
    npsRange: { min: "26", max: "60" },
    pressureClasses: [150, 300, 400, 600, 900],
    note: "Series A aligns with MSS-SP 44",
  },
  {
    id: "ASME_B16_47_B",
    code: "ASME B16.47 Series B",
    edition: "1996",
    title: "Large Diameter Steel Flanges NPS 26 to 60 (Series B)",
    npsRange: { min: "26", max: "60" },
    pressureClasses: [150, 300, 600, 900],
    note: "Replaces API 605",
  },
  {
    id: "MSS_SP_44",
    code: "MSS-SP 44",
    edition: "1996",
    title: "Steel Pipeline Flanges",
    npsRange: { min: "12", max: "60" },
    note: "NPS 12 to 24 identical to ASME B16.5",
  },
  {
    id: "BS_3293",
    code: "BS 3293",
    edition: "1960",
    title: "Carbon Steel Pipe Flanges for the Petroleum Industry",
    npsRange: { min: "26", max: "48" },
    pressureClasses: [150, 300, 400, 600],
  },
  {
    id: "API_6A",
    code: "API 6A",
    edition: "1999",
    title: "Wellhead and Christmas Tree Equipment",
    flangeTypes: ["6B", "6BX"],
    workingPressures_PSI: [2000, 3000, 5000, 10000, 15000, 20000],
  },
  {
    id: "ASME_B16_36",
    code: "ASME B16.36",
    edition: "1996",
    title: "Orifice Flanges",
    npsRange: { min: "1", max: "24" },
    pressureClasses: [300, 400, 600, 900, 1500, 2500],
  },
  {
    id: "ASME_B16_20",
    code: "ASME B16.20",
    edition: "1998",
    title: "Metallic Gaskets for Pipe Flanges (replaces API 601-1988)",
  },
  {
    id: "ASME_B16_21",
    code: "ASME B16.21",
    edition: "1992",
    title: "Nonmetallic Flat Gaskets for Pipe Flanges",
  },
];

// ─────────────────────────────────────────────────────────────────
// PRESSURE CLASS / ISO PN MAP
// ─────────────────────────────────────────────────────────────────

export const pressureClassMap: PressureClassMap[] = [
  { asme: 150, isoPn: 20 },
  { asme: 300, isoPn: 50 },
  { asme: 400, isoPn: 68 },
  { asme: 600, isoPn: 100 },
  { asme: 900, isoPn: 150 },
  { asme: 1500, isoPn: 250 },
  { asme: 2500, isoPn: 420 },
];

// ─────────────────────────────────────────────────────────────────
// FLANGE TYPES
// ─────────────────────────────────────────────────────────────────

export const flangeTypes: FlangeType[] = [
  {
    id: "WN",
    code: "WN",
    name: "Welding Neck",
    nameFR: "Collerette à souder",
    description: "Hub tapers from flange to pipe OD; butt-welded to pipe. Highest integrity joint.",
  },
  {
    id: "SO",
    code: "SO",
    name: "Slip-On",
    nameFR: "Emmanchée soudée",
    description: "Slips over pipe; fillet-welded inside and outside.",
  },
  {
    id: "BL",
    code: "BL",
    name: "Blind",
    nameFR: "Pleine",
    description: "Solid disc used to blank off a pipeline or vessel opening.",
  },
  {
    id: "TH",
    code: "TH",
    name: "Threaded",
    nameFR: "Taraudée / Filetée",
    description: "Screwed onto threaded pipe end; no welding required.",
  },
  {
    id: "SW",
    code: "SW",
    name: "Socket Welding",
    nameFR: "À emboîter",
    description: "Pipe inserts into flange socket bore; fillet-welded externally.",
  },
  {
    id: "LA",
    code: "LA",
    name: "Lapped / Lap Joint",
    nameFR: "Tournante",
    description: "Used with a lap-joint stub end; flange rotates freely.",
  },
  {
    id: "LWN",
    code: "LWN",
    name: "Long Welding Neck",
    nameFR: "Long welding-neck",
    description: "Extended hub WN flange; length specified by purchaser.",
  },
  {
    id: "OR",
    code: "OR",
    name: "Orifice Flange",
    nameFR: "Bride à orifice",
    standard: "ASME B16.36",
    description: "Flanges with tapped pressure-tap holes for orifice plates.",
  },
];

// ─────────────────────────────────────────────────────────────────
// FACING TYPES
// ─────────────────────────────────────────────────────────────────

export const facingTypes: FacingType[] = [
  {
    id: "RF",
    code: "RF",
    name: "Raised Face",
    nameFR: "Face surélevée",
    heightMm: { class150_300: 1.6, class400_plus: 6.4 },
    applicableClasses: [150, 300, 400, 600, 900, 1500, 2500],
    note: "Class 150 & 300: 1.6 mm (included in Y). Class 400+: 6.4 mm.",
  },
  {
    id: "FF",
    code: "FF",
    name: "Flat Face",
    nameFR: "Face plane",
    applicableClasses: [150, 300],
  },
  {
    id: "RTJ",
    code: "RTJ",
    name: "Ring Joint",
    nameFR: "Face usinée pour joint annulaire",
    applicableClasses: [150, 300, 400, 600, 900, 1500, 2500],
    ringTypes: ["R (Oval / Octagonal)", "RX (Pressure-energised)", "BX (API 6A)"],
  },
  {
    id: "TG_L",
    code: "T&G-Large",
    name: "Large Tongue & Groove",
    nameFR: "Emboîtement double mâle/femelle large",
    applicableClasses: [300, 400, 600, 900, 1500, 2500],
  },
  {
    id: "TG_S",
    code: "T&G-Small",
    name: "Small Tongue & Groove",
    nameFR: "Emboîtement double mâle/femelle étroit",
    applicableClasses: [150, 300, 400, 600, 900, 1500, 2500],
  },
  {
    id: "MF_L",
    code: "M&F-Large",
    name: "Large Male & Female",
    nameFR: "Emboîtement simple mâle/femelle large",
    applicableClasses: [300, 400, 600, 900, 1500, 2500],
  },
  {
    id: "MF_S",
    code: "M&F-Small",
    name: "Small Male & Female",
    nameFR: "Emboîtement simple mâle/femelle étroit",
    applicableClasses: [150, 300, 400, 600, 900, 1500, 2500],
  },
];

// ─────────────────────────────────────────────────────────────────
// FACING FINISH
// ─────────────────────────────────────────────────────────────────

export const facingFinish = {
  raisedFace_flatFace: {
    stock_finish: "125–250 µin (3.2–6.3 µm) Ra – phonographic concentric or spiral serrated",
    smooth_finish: "≤ 125 µin (3.2 µm) Ra",
    cutting_tool_pitch: "approx. 0.06 in (1.5 mm) pitch",
    serrations_per_in: "45–55",
    note: "Tongue, groove, male, female faces: ≤ 125 µin (3.2 µm) Ra",
  },
  ringJoint: {
    surfaceFinish_Ra_max: "1.6 µm (63 µin)",
  },
};

// ─────────────────────────────────────────────────────────────────
// MATERIALS
// ─────────────────────────────────────────────────────────────────

export const flangeMaterials = {
  carbonSteels: [
    {
      astmGrade: "A 105 / A 105M-98",
      description: "Carbon steel forgings for piping components",
      tensileMin_MPa: 485,
      yieldMin_MPa: 250,
      elongMin_pct: 22,
      reductionMin_pct: 30,
      hardnessMax_HB: 187,
    },
    {
      astmGrade: "A 181 / A 181M-95 Class 60",
      tensileMin_MPa: 415,
      yieldMin_MPa: 205,
      elongMin_pct: 22,
      reductionMin_pct: 35,
    },
    {
      astmGrade: "A 181 / A 181M-95 Class 70",
      tensileMin_MPa: 485,
      yieldMin_MPa: 250,
      elongMin_pct: 22,
      reductionMin_pct: 24,
    },
  ] as CarbonSteelMaterial[],

  alloyHiTempSteels: [
    { astmGrade: "A 182 F1",          uns: "K12822" },
    { astmGrade: "A 182 F2",          uns: "K12122" },
    { astmGrade: "A 182 F5",          uns: "K41545" },
    { astmGrade: "A 182 F9",          uns: "K90941" },
    { astmGrade: "A 182 F11 Class 2", uns: "K11572" },
    { astmGrade: "A 182 F12 Class 2", uns: "K11564" },
    { astmGrade: "A 182 F22 Class 3", uns: "K21590" },
    { astmGrade: "A 182 F304",        uns: "S30400" },
    { astmGrade: "A 182 F304L",       uns: "S30403" },
    { astmGrade: "A 182 F316",        uns: "S31600" },
    { astmGrade: "A 182 F316L",       uns: "S31603" },
    { astmGrade: "A 182 F321",        uns: "S32100" },
    { astmGrade: "A 182 F347",        uns: "S34700" },
    { astmGrade: "A 182 F348",        uns: "S34800" },
    { astmGrade: "A 182 F310",        uns: "S31000" },
  ] as AlloyMaterial[],

  lowTempSteels: [
    { astmGrade: "A 350 LF1", tensileRange_MPa: "415–585", yieldMin_MPa: 205 },
    { astmGrade: "A 350 LF2", tensileRange_MPa: "485–655", yieldMin_MPa: 250, impactTemp_C: -46 },
    { astmGrade: "A 350 LF3", tensileRange_MPa: "485–655", yieldMin_MPa: 260, impactTemp_C: -102 },
  ] as LowTempMaterial[],
};

// ─────────────────────────────────────────────────────────────────
// ASME B16.5 DIMENSIONS BY CLASS
// ─────────────────────────────────────────────────────────────────
// Key: A=hub OD at weld, X=flange OD, Y_WN=WN length, Y_SO=SO length,
//      B2=bore, T=min thickness, r=fillet radius, wt_*=approx weights (kg)

export const flangeDimensions: Record<string, DimensionClass> = {
  class150: {
    standard: "ASME B16.5-1996",
    raisedFaceHeight_mm: 1.6,
    sizes: [
      { nps: "1/2",   dn: 15,  A: 21.3,  X: 38,  Y_WN: 16,  Y_SO: 22, B2: 22.9,  T: 16, r: 3,  wt_WN: 0.8,  wt_SO: 0.8,  wt_BL: 0.8,  wt_TH: 0.8,  wt_SW: 1.2  },
      { nps: "3/4",   dn: 20,  A: 26.7,  X: 48,  Y_WN: 16,  Y_SO: 25, B2: 28.2,  T: 16, r: 3,  wt_WN: 0.9,  wt_SO: 0.9,  wt_BL: 0.9,  wt_TH: 0.9,  wt_SW: 1.3  },
      { nps: "1",     dn: 25,  A: 33.4,  X: 54,  Y_WN: 17,  Y_SO: 27, B2: 35.0,  T: 18, r: 3,  wt_WN: 1.0,  wt_SO: 1.0,  wt_BL: 1.0,  wt_TH: 1.0,  wt_SW: 1.4  },
      { nps: "1-1/4", dn: 32,  A: 42.2,  X: 63,  Y_WN: 21,  Y_SO: 29, B2: 43.7,  T: 21, r: 5,  wt_WN: 1.3,  wt_SO: 1.3,  wt_BL: 1.3,  wt_TH: 1.3,  wt_SW: 1.8  },
      { nps: "1-1/2", dn: 40,  A: 48.3,  X: 70,  Y_WN: 22,  Y_SO: 32, B2: 50.0,  T: 22, r: 5,  wt_WN: 1.5,  wt_SO: 1.5,  wt_BL: 1.5,  wt_TH: 1.5,  wt_SW: 2.2  },
      { nps: "2",     dn: 50,  A: 60.3,  X: 83,  Y_WN: 25,  Y_SO: 37, B2: 62.5,  T: 24, r: 6,  wt_WN: 2.0,  wt_SO: 2.0,  wt_BL: 2.0,  wt_TH: 2.0,  wt_SW: 3.0  },
      { nps: "2-1/2", dn: 65,  A: 73.0,  X: 99,  Y_WN: 29,  Y_SO: 41, B2: 75.4,  T: 27, r: 8,  wt_WN: 3.5,  wt_SO: 3.5,  wt_BL: 3.5,  wt_TH: 3.5,  wt_SW: 4.5  },
      { nps: "3",     dn: 80,  A: 88.9,  X: 117, Y_WN: 29,  Y_SO: 44, B2: 91.4,  T: 29, r: 8,  wt_WN: 4.5,  wt_SO: 4.5,  wt_BL: 4.5,  wt_TH: 4.5,  wt_SW: 6.0  },
      { nps: "4",     dn: 100, A: 114.3, X: 150, Y_WN: 33,  Y_SO: 51, B2: 116.8, T: 30, r: 10, wt_WN: 7.0,  wt_SO: 7.0,  wt_BL: 7.0,  wt_TH: 7.0,  wt_SW: 9.0  },
      { nps: "6",     dn: 150, A: 168.3, X: 210, Y_WN: 41,  Y_SO: 62, B2: 171.4, T: 35, r: 11, wt_WN: 15.0, wt_SO: 15.0, wt_BL: 15.0, wt_TH: 15.0, wt_SW: null },
      { nps: "8",     dn: 200, A: 219.1, X: 260, Y_WN: 44,  Y_SO: 70, B2: 222.2, T: 38, r: 11, wt_WN: 22.0, wt_SO: 22.0, wt_BL: 22.0, wt_TH: null, wt_SW: null },
      { nps: "10",    dn: 250, A: 273.0, X: 318, Y_WN: 48,  Y_SO: 76, B2: 277.4, T: 41, r: 13, wt_WN: 32.0, wt_SO: 32.0, wt_BL: 32.0, wt_TH: null, wt_SW: null },
      { nps: "12",    dn: 300, A: 323.9, X: 375, Y_WN: 51,  Y_SO: 83, B2: 328.2, T: 44, r: 13, wt_WN: 45.0, wt_SO: 45.0, wt_BL: 45.0, wt_TH: null, wt_SW: null },
      { nps: "14",    dn: 350, A: 355.6, X: 413, Y_WN: 56,  Y_SO: 87, B2: 360.2, T: 48, r: 13, wt_WN: 55.0, wt_SO: 55.0, wt_BL: null, wt_TH: null, wt_SW: null },
      { nps: "16",    dn: 400, A: 406.4, X: 470, Y_WN: 60,  Y_SO: 92, B2: 411.2, T: 51, r: 13, wt_WN: 73.0, wt_SO: 73.0, wt_BL: null, wt_TH: null, wt_SW: null },
      { nps: "18",    dn: 450, A: 457.0, X: 533, Y_WN: 60,  Y_SO: 95, B2: 462.3, T: 54, r: 13, wt_WN: 100.0,wt_SO: 100.0,wt_BL: null, wt_TH: null, wt_SW: null },
      { nps: "20",    dn: 500, A: 508.0, X: 584, Y_WN: 60,  Y_SO: 98, B2: 514.4, T: 57, r: 13, wt_WN: 122.0,wt_SO: 122.0,wt_BL: null, wt_TH: null, wt_SW: null },
      { nps: "24",    dn: 600, A: 610.0, X: 692, Y_WN: 68,  Y_SO: 108,B2: 616.0, T: 60, r: 13, wt_WN: 173.0,wt_SO: 173.0,wt_BL: null, wt_TH: null, wt_SW: null },
    ],
  },

  class300: {
    standard: "ASME B16.5-1996",
    raisedFaceHeight_mm: 1.6,
    sizes: [
      { nps: "1/2",   dn: 15,  A: 21.3,  X: 54,  Y_WN: 62,  B2: 22.9,  T: 18, r: 3,  wt_WN: 2.0,  wt_SO: 1.4,  wt_BL: 1.4,  wt_TH: 1.4  },
      { nps: "3/4",   dn: 20,  A: 26.7,  X: 57,  Y_WN: 63,  B2: 28.2,  T: 19, r: 3,  wt_WN: 2.3,  wt_SO: 1.6,  wt_BL: 1.6,  wt_TH: 1.6  },
      { nps: "1",     dn: 25,  A: 33.5,  X: 54,  Y_WN: 62,  B2: 35.0,  T: 18, r: 3,  wt_WN: 2.0,  wt_SO: 1.4,  wt_BL: 1.4,  wt_TH: 1.4  },
      { nps: "1-1/4", dn: 32,  A: 42.2,  X: 64,  Y_WN: 65,  B2: 43.7,  T: 21, r: 3,  wt_WN: 2.5,  wt_SO: 1.8,  wt_BL: 1.8,  wt_TH: 1.8  },
      { nps: "1-1/2", dn: 40,  A: 48.3,  X: 70,  Y_WN: 68,  B2: 50.0,  T: 22, r: 5,  wt_WN: 3.5,  wt_SO: 2.5,  wt_BL: 2.5,  wt_TH: 2.5  },
      { nps: "2",     dn: 50,  A: 60.3,  X: 84,  Y_WN: 70,  B2: 62.5,  T: 29, r: 6,  wt_WN: 4.0,  wt_SO: 3.0,  wt_BL: 3.0,  wt_TH: 3.0  },
      { nps: "2-1/2", dn: 65,  A: 73.0,  X: 100, Y_WN: 76,  B2: 75.4,  T: 32, r: 8,  wt_WN: 5.0,  wt_SO: 4.5,  wt_BL: 4.5,  wt_TH: 4.5  },
      { nps: "3",     dn: 80,  A: 88.9,  X: 118, Y_WN: 79,  B2: 91.4,  T: 32, r: 8,  wt_WN: 7.0,  wt_SO: 6.0,  wt_BL: 6.0,  wt_TH: 6.0  },
      { nps: "4",     dn: 100, A: 114.3, X: 152, Y_WN: 86,  B2: 116.8, T: 37, r: 10, wt_WN: 11.0, wt_SO: 10.1, wt_BL: null },
      { nps: "5",     dn: 125, A: 141.3, X: 189, Y_WN: 98,  B2: 144.5, T: 43, r: 10, wt_WN: 14.0, wt_SO: 12.5, wt_BL: null },
      { nps: "6",     dn: 150, A: 168.3, X: 222, Y_WN: 98,  B2: 171.4, T: 46, r: 11, wt_WN: 19.0, wt_SO: 17.5, wt_BL: null },
      { nps: "8",     dn: 200, A: 219.1, X: 273, Y_WN: 111, B2: 222.2, T: 51, r: 11, wt_WN: 30.0, wt_SO: 26.0, wt_BL: null },
      { nps: "10",    dn: 250, A: 273.0, X: 343, Y_WN: 117, B2: 277.4, T: 56, r: 13, wt_WN: 41.0, wt_SO: 38.0, wt_BL: null },
      { nps: "12",    dn: 300, A: 323.9, X: 400, Y_WN: 130, B2: 328.2, T: 61, r: 13, wt_WN: 62.0, wt_SO: 52.0, wt_BL: null },
      { nps: "14",    dn: 350, A: 355.6, X: 432, Y_WN: 143, B2: 360.2, T: 64, r: 13, wt_WN: 84.0, wt_SO: 74.0, wt_BL: null },
      { nps: "16",    dn: 400, A: 406.4, X: 495, Y_WN: 146, B2: 411.2, T: 68, r: 13, wt_WN: 111.0,wt_SO: 100.0,wt_BL: null },
      { nps: "18",    dn: 450, A: 457.0, X: 546, Y_WN: 159, B2: 462.3, T: 70, r: 13, wt_WN: 138.0,wt_SO: 127.0,wt_BL: null },
      { nps: "20",    dn: 500, A: 508.0, X: 610, Y_WN: 162, B2: 514.4, T: 73, r: 13, wt_WN: 171.0,wt_SO: 147.0,wt_BL: null },
      { nps: "24",    dn: 600, A: 610.0, X: 718, Y_WN: 168, B2: 616.0, T: 83, r: 13, wt_WN: 247.0,wt_SO: 208.0,wt_BL: null },
    ],
  },

  class600: {
    standard: "ASME B16.5-1996",
    raisedFaceHeight_mm: 6.4,
    sizes: [
      { nps: "1/2",   dn: 15,  A: 21.3,  X: 38,  Y_WN: 52,  B2: 22.9,  T: 16, r: 3,  wt_WN: 1.4,  wt_SO: 1.3, wt_BL: 1.4  },
      { nps: "3/4",   dn: 20,  A: 26.7,  X: 48,  Y_WN: 57,  B2: 28.2,  T: 16, r: 3,  wt_WN: 1.6,  wt_SO: 1.4, wt_BL: 1.6  },
      { nps: "1",     dn: 25,  A: 33.4,  X: 54,  Y_WN: 62,  B2: 35.0,  T: 18, r: 3,  wt_WN: 2.1,  wt_SO: 1.8, wt_BL: 2.1  },
      { nps: "1-1/4", dn: 32,  A: 42.2,  X: 64,  Y_WN: 67,  B2: 43.7,  T: 21, r: 3,  wt_WN: 2.6,  wt_SO: 2.1, wt_BL: 2.6  },
      { nps: "1-1/2", dn: 40,  A: 48.3,  X: 70,  Y_WN: 70,  B2: 50.0,  T: 22, r: 5,  wt_WN: 3.3,  wt_SO: 3.1, wt_BL: 3.3  },
      { nps: "2",     dn: 50,  A: 60.3,  X: 84,  Y_WN: 73,  B2: 62.5,  T: 29, r: 6,  wt_WN: 4.4,  wt_SO: 4.0, wt_BL: 4.4  },
      { nps: "2-1/2", dn: 65,  A: 73.0,  X: 100, Y_WN: 79,  B2: 75.4,  T: 35, r: 8,  wt_WN: 6.0,  wt_SO: 5.4, wt_BL: 6.0  },
      { nps: "3",     dn: 80,  A: 88.9,  X: 118, Y_WN: 83,  B2: 91.4,  T: 40, r: 8,  wt_WN: 7.4,  wt_SO: 7.0, wt_BL: 7.4  },
      { nps: "4",     dn: 100, A: 114.3, X: 152, Y_WN: 102, B2: 116.8, T: 48, r: 10, wt_WN: 17.0, wt_SO: 16.0,wt_BL: 17.0 },
      { nps: "6",     dn: 150, A: 168.3, X: 222, Y_WN: 117, B2: 171.4, T: 57, r: 11, wt_WN: 30.0, wt_SO: 30.0,wt_BL: 32.0 },
      { nps: "8",     dn: 200, A: 219.1, X: 273, Y_WN: 127, B2: 222.2, T: 63, r: 11, wt_WN: 43.0, wt_SO: 43.0,wt_BL: 46.0 },
      { nps: "10",    dn: 250, A: 273.0, X: 343, Y_WN: 140, B2: 277.4, T: 70, r: 13, wt_WN: 70.0, wt_SO: 70.0,wt_BL: 74.0 },
      { nps: "12",    dn: 300, A: 323.9, X: 400, Y_WN: 152, B2: 328.2, T: 78, r: 13, wt_WN: 86.0, wt_SO: 86.0,wt_BL: 90.0 },
      { nps: "16",    dn: 400, A: 406.4, X: 495, Y_WN: 165, B2: 411.2, T: 84, r: 13, wt_WN: 142.0,wt_SO: 142.0,wt_BL: 150.0},
      { nps: "20",    dn: 500, A: 508.0, X: 610, Y_WN: 184, B2: 514.4, T: 94, r: 13, wt_WN: 221.0,wt_SO: 221.0,wt_BL: 230.0},
      { nps: "24",    dn: 600, A: 610.0, X: 718, Y_WN: 190, B2: 616.0, T: 114,r: 13, wt_WN: 315.0,wt_SO: 315.0,wt_BL: 325.0},
    ],
  },

  class900: {
    standard: "ASME B16.5-1996",
    raisedFaceHeight_mm: 6.4,
    note: "NPS 1/2 to 2-1/2: use class 1500 dimensions",
    sizes: [
      { nps: "3",  dn: 80,  A: 88.9,  X: 127, Y_WN: 102, B2: 91.4,  T: 41,  wt_WN: 14.5,  wt_BL: 11.9  },
      { nps: "4",  dn: 100, A: 114.3, X: 159, Y_WN: 114, B2: 116.8, T: 48,  wt_WN: 23.0,  wt_BL: 20.0  },
      { nps: "6",  dn: 150, A: 168.3, X: 235, Y_WN: 140, B2: 171.4, T: 63,  wt_WN: 50.0,  wt_BL: 42.0  },
      { nps: "8",  dn: 200, A: 219.1, X: 298, Y_WN: 162, B2: 222.2, T: 71,  wt_WN: 85.0,  wt_BL: 72.0  },
      { nps: "10", dn: 250, A: 273.0, X: 368, Y_WN: 184, B2: 277.4, T: 83,  wt_WN: 118.0, wt_BL: 101.0 },
      { nps: "12", dn: 300, A: 323.9, X: 419, Y_WN: 200, B2: 328.2, T: 86,  wt_WN: 163.0, wt_BL: 134.0 },
      { nps: "16", dn: 400, A: 406.4, X: 508, Y_WN: 216, B2: 411.2, T: 102, wt_WN: 224.0, wt_BL: 186.0 },
      { nps: "20", dn: 500, A: 508.0, X: 622, Y_WN: 248, B2: 514.4, T: 127, wt_WN: 373.0, wt_BL: 320.0 },
      { nps: "24", dn: 600, A: 610.0, X: 749, Y_WN: 292, B2: 616.0, T: 152, wt_WN: 680.0, wt_BL: 611.0 },
    ],
  },

  class1500: {
    standard: "ASME B16.5-1996",
    raisedFaceHeight_mm: 6.4,
    sizes: [
      { nps: "1/2",   dn: 15,  Y_WN: 47,  X: 38,  wt_WN: 1.8   },
      { nps: "3/4",   dn: 20,  Y_WN: 52,  X: 44,  wt_WN: 2.4   },
      { nps: "1",     dn: 25,  Y_WN: 50,  X: 50,  wt_WN: 3.5   },
      { nps: "2",     dn: 50,  Y_WN: 44,  X: 84,  wt_WN: 10.0  },
      { nps: "3",     dn: 80,  Y_WN: 63,  X: 133, wt_WN: 22.0, wt_BL: 21.3 },
      { nps: "4",     dn: 100, Y_WN: 70,  X: 162, wt_WN: 30.0, wt_BL: 30.0 },
      { nps: "6",     dn: 150, Y_WN: 124, X: 229, wt_WN: 60.0, wt_BL: 58.0 },
      { nps: "8",     dn: 200, Y_WN: 133, X: 292, wt_WN: 70.0, wt_BL: 72.0 },
      { nps: "12",    dn: 300, Y_WN: 197, X: 451, wt_WN: 204.0 },
      { nps: "16",    dn: 400, Y_WN: 241, X: 552, wt_WN: 426.0 },
      { nps: "20",    dn: 500, Y_WN: 276, X: 641, wt_WN: 737.0 },
      { nps: "24",    dn: 600, Y_WN: 292, X: 762, wt_WN: 930.0 },
    ],
  },

  class2500: {
    standard: "ASME B16.5-1996",
    raisedFaceHeight_mm: 6.4,
    npsRange: "NPS 1/2 to 12",
    sizes: [
      { nps: "1/2",   dn: 15,  A: 21.3,  X: 73,  Y_WN: 79,  B2: 22.9,  T: 40,  wt_WN: 3.3,  wt_BL: 3.6  },
      { nps: "3/4",   dn: 20,  A: 26.7,  X: 79,  Y_WN: 79,  B2: 28.2,  T: 43,  wt_WN: 3.9,  wt_BL: 4.0  },
      { nps: "1",     dn: 25,  A: 33.4,  X: 89,  Y_WN: 89,  B2: 35.0,  T: 48,  wt_WN: 5.0,  wt_BL: 6.0  },
      { nps: "1-1/2", dn: 40,  A: 48.3,  X: 111, Y_WN: 111, B2: 50.0,  T: 60,  wt_WN: 11.5, wt_BL: 13.0 },
      { nps: "2",     dn: 50,  A: 60.3,  X: 127, Y_WN: 127, B2: 62.5,  T: 70,  wt_WN: 17.6, wt_BL: 19.0 },
      { nps: "3",     dn: 80,  A: 88.9,  X: 168, Y_WN: 168, B2: 91.4,  T: 92,  wt_WN: 39.0, wt_BL: 43.0 },
      { nps: "4",     dn: 100, A: 114.3, X: 190, Y_WN: 190, B2: 116.8, T: 108, wt_WN: 60.0, wt_BL: 66.0 },
      { nps: "6",     dn: 150, A: 168.3, X: 254, Y_WN: 254, B2: 171.4, T: 140, wt_WN: 126.0,wt_BL: 138.0},
      { nps: "8",     dn: 200, A: 219.1, X: 318, Y_WN: 318, B2: 222.2, T: 175, wt_WN: 217.0,wt_BL: 235.0},
      { nps: "10",    dn: 250, A: 273.0, X: 394, Y_WN: 394, B2: 277.4, T: 216, wt_WN: 367.0,wt_BL: 400.0},
      { nps: "12",    dn: 300, A: 323.9, X: 457, Y_WN: 457, B2: 328.2, T: 254, wt_WN: 533.0,wt_BL: 580.0},
    ],
  },
};

// ─────────────────────────────────────────────────────────────────
// GASKETS (selected samples)
// ─────────────────────────────────────────────────────────────────

export const gaskets = {
  flatGaskets: {
    standard: "ASME B16.21-1992",
    class150_RF_samples: [
      { nps: "1/2", ID_mm: 21.3,  OD_mm: 50.8  },
      { nps: "1",   ID_mm: 27.0,  OD_mm: 57.2  },
      { nps: "2",   ID_mm: 35.1,  OD_mm: 76.2  },
      { nps: "4",   ID_mm: 60.5,  OD_mm: 114.3 },
      { nps: "6",   ID_mm: 73.2,  OD_mm: 149.2 },
      { nps: "8",   ID_mm: 92.2,  OD_mm: 190.5 },
      { nps: "12",  ID_mm: 128.6, OD_mm: 269.9 },
      { nps: "16",  ID_mm: 168.4, OD_mm: 342.9 },
      { nps: "20",  ID_mm: 209.6, OD_mm: 419.1 },
      { nps: "24",  ID_mm: 247.7, OD_mm: 508.0 },
    ] as GasketSample[],
  },
  spiralWoundGaskets: {
    standard: "ASME B16.20-1998",
    class150_RF_samples: [
      { nps: "1/2", d2: 19.1, d3: 47.8  },
      { nps: "1",   d2: 25.4, d3: 57.2  },
      { nps: "2",   d2: 31.8, d3: 69.9  },
      { nps: "4",   d2: 58.7, d3: 92.2  },
      { nps: "6",   d2: 73.2, d3: 117.6 },
      { nps: "8",   d2: 92.2, d3: 143.0 },
      { nps: "12",  d2: 120.7,d3: 174.8 },
      { nps: "16",  d2: 168.4,d3: 222.3 },
      { nps: "20",  d2: 209.6,d3: 269.0 },
      { nps: "24",  d2: 247.7,d3: 317.5 },
    ] as GasketSample[],
  },
};

// ─────────────────────────────────────────────────────────────────
// SPECTACLE BLINDS (Class 300 samples)
// ─────────────────────────────────────────────────────────────────

export const spectacleBlindSamples: SpectacleBlindSample[] = [
  { nps: "1/2", B: 51,  d: 16.0,  C: 67,  E: 30, b1: 6.5,  b2: 4  },
  { nps: "1",   B: 63,  d: 22.0,  C: 83,  E: 35, b1: 6.5,  b2: 4  },
  { nps: "2",   B: 79,  d: 41.5,  C: 98,  E: 40, b1: 6.5,  b2: 6  },
  { nps: "4",   B: 108, d: 54.0,  C: 127, E: 45, b1: 9.5,  b2: 8  },
  { nps: "6",   B: 146, d: 79.5,  C: 168, E: 55, b1: 12.5, b2: 10 },
  { nps: "8",   B: 184, d: 105.0, C: 200, E: 55, b1: 16.0, b2: 14 },
  { nps: "12",  B: 257, d: 155.5, C: 270, E: 55, b1: 19.0, b2: 18 },
  { nps: "16",  B: 336, d: 203.0, C: 387, E: 55, b1: 28.5, b2: 24 },
  { nps: "20",  B: 438, d: 257.0, C: 489, E: 60, b1: 41.5, b2: 40 },
  { nps: "24",  B: 540, d: 305.0, C: 590, E: 60, b1: 44.5, b2: 60 },
];
