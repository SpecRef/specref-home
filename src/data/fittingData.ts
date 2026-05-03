/**
 * SpecRef Fittings Database
 * Standard: ASME B16.9 — Factory-Made Wrought Buttwelding Fittings
 * Dimensions: mm | Weights: kg (approximate)
 * ** = not independently listed; same as the corresponding SCH40 or STD value
 * null = combination not tabulated in the standard
 */

export interface FittingSize {
  nps: string;        // e.g. "1/2", "3/4", "1 1/4"
  od_mm: number;      // outside diameter mm
  length_mm: number;  // through-length (tangent-to-tangent) mm
}

export type ScheduleKey =
  | "STD" | "XS" | "XXS"
  | "SCH10" | "SCH20" | "SCH30" | "SCH40"
  | "SCH60" | "SCH80" | "SCH100" | "SCH120"
  | "SCH140" | "SCH160";

export type ScheduleRecord = Record<ScheduleKey, number | null>;

export interface FittingType {
  label: string;            // human-readable name
  standard: string;
  sizes: Record<string, FittingSize>;           // keyed by decimal NPS string
  wallThickness_mm: Record<string, ScheduleRecord>;
  weight_kg: Record<string, ScheduleRecord>;
}

export const SCHEDULES: ScheduleKey[] = [
  "STD", "XS", "XXS",
  "SCH10", "SCH20", "SCH30", "SCH40",
  "SCH60", "SCH80", "SCH100", "SCH120",
  "SCH140", "SCH160",
];

// ─────────────────────────────────────────────────────────────────────────────
// 45° LONG RADIUS BENDS
// ─────────────────────────────────────────────────────────────────────────────

const bend45_sizes: Record<string, FittingSize> = {
  "0.5":  { nps: "1/2",   od_mm: 21,   length_mm: 30.338   },
  "0.75": { nps: "3/4",   od_mm: 27,   length_mm: 36.026   },
  "1":    { nps: "1",     od_mm: 33,   length_mm: 41.715   },
  "1.25": { nps: "1 1/4", od_mm: 42,   length_mm: 47.403   },
  "1.5":  { nps: "1 1/2", od_mm: 48,   length_mm: 54.987   },
  "2":    { nps: "2",     od_mm: 60,   length_mm: 66.364   },
  "2.5":  { nps: "2 1/2", od_mm: 73,   length_mm: 83.429   },
  "3":    { nps: "3",     od_mm: 89,   length_mm: 96.702   },
  "3.5":  { nps: "3 1/2", od_mm: 102,  length_mm: 108.079  },
  "4":    { nps: "4",     od_mm: 114,  length_mm: 121.352  },
  "5":    { nps: "5",     od_mm: 141,  length_mm: 149.793  },
  "6":    { nps: "6",     od_mm: 168,  length_mm: 180.131  },
  "8":    { nps: "8",     od_mm: 219,  length_mm: 240.807  },
  "10":   { nps: "10",    od_mm: 273,  length_mm: 301.483  },
  "12":   { nps: "12",    od_mm: 324,  length_mm: 360.263  },
  "14":   { nps: "14",    od_mm: 356,  length_mm: 420.938  },
  "16":   { nps: "16",    od_mm: 406,  length_mm: 481.614  },
  "18":   { nps: "18",    od_mm: 457,  length_mm: 542.290  },
  "20":   { nps: "20",    od_mm: 508,  length_mm: 602.966  },
  "22":   { nps: "22",    od_mm: 559,  length_mm: 650.369  },
  "24":   { nps: "24",    od_mm: 610,  length_mm: 722.421  },
  "26":   { nps: "26",    od_mm: 660,  length_mm: 769.824  },
  "28":   { nps: "28",    od_mm: 711,  length_mm: 830.500  },
  "30":   { nps: "30",    od_mm: 762,  length_mm: 891.176  },
  "32":   { nps: "32",    od_mm: 813,  length_mm: 951.852  },
  "34":   { nps: "34",    od_mm: 864,  length_mm: 1010.631 },
  "36":   { nps: "36",    od_mm: 914,  length_mm: 1071.307 },
  "38":   { nps: "38",    od_mm: 965,  length_mm: 1137.671 },
  "40":   { nps: "40",    od_mm: 1016, length_mm: 1198.347 },
  "42":   { nps: "42",    od_mm: 1067, length_mm: 1251.438 },
  "44":   { nps: "44",    od_mm: 1118, length_mm: 1317.803 },
  "46":   { nps: "46",    od_mm: 1168, length_mm: 1378.478 },
  "48":   { nps: "48",    od_mm: 1219, length_mm: 1439.154 },
};

const bend45_wallThickness: Record<string, ScheduleRecord> = {
  "0.5":  { STD: 2.77,  XS: 3.73,  XXS: 7.47,  SCH10: null, SCH20: null, SCH30: 2.41, SCH40: 2.77, SCH60: null, SCH80: 2.77,  SCH100: null,  SCH120: null,  SCH140: null,  SCH160: 4.78  },
  "0.75": { STD: 2.87,  XS: 3.91,  XXS: 7.82,  SCH10: null, SCH20: null, SCH30: 2.41, SCH40: 2.87, SCH60: null, SCH80: 2.87,  SCH100: null,  SCH120: null,  SCH140: null,  SCH160: 5.56  },
  "1":    { STD: 3.38,  XS: 4.55,  XXS: 9.09,  SCH10: null, SCH20: null, SCH30: 2.90, SCH40: 3.38, SCH60: null, SCH80: 3.38,  SCH100: null,  SCH120: null,  SCH140: null,  SCH160: 6.35  },
  "1.25": { STD: 3.56,  XS: 4.85,  XXS: 9.70,  SCH10: null, SCH20: null, SCH30: 2.97, SCH40: 3.56, SCH60: null, SCH80: 3.56,  SCH100: null,  SCH120: null,  SCH140: null,  SCH160: 6.35  },
  "1.5":  { STD: 3.68,  XS: 5.08,  XXS: 10.16, SCH10: null, SCH20: null, SCH30: 3.18, SCH40: 3.68, SCH60: null, SCH80: 3.68,  SCH100: null,  SCH120: null,  SCH140: null,  SCH160: 7.13  },
  "2":    { STD: 3.91,  XS: 5.54,  XXS: 11.07, SCH10: null, SCH20: null, SCH30: 3.18, SCH40: 3.91, SCH60: null, SCH80: 3.91,  SCH100: null,  SCH120: null,  SCH140: null,  SCH160: 8.74  },
  "2.5":  { STD: 5.16,  XS: 7.01,  XXS: 14.02, SCH10: null, SCH20: null, SCH30: 4.78, SCH40: 5.16, SCH60: null, SCH80: 5.16,  SCH100: null,  SCH120: null,  SCH140: null,  SCH160: 9.52  },
  "3":    { STD: 5.49,  XS: 7.62,  XXS: 15.24, SCH10: null, SCH20: null, SCH30: 4.78, SCH40: 5.49, SCH60: null, SCH80: 5.49,  SCH100: null,  SCH120: null,  SCH140: null,  SCH160: 11.13 },
  "3.5":  { STD: 5.74,  XS: 8.08,  XXS: null,  SCH10: null, SCH20: null, SCH30: 4.78, SCH40: 5.74, SCH60: null, SCH80: 5.74,  SCH100: null,  SCH120: null,  SCH140: null,  SCH160: null  },
  "4":    { STD: 6.02,  XS: 8.56,  XXS: 17.12, SCH10: null, SCH20: null, SCH30: 4.78, SCH40: 6.02, SCH60: null, SCH80: 6.02,  SCH100: null,  SCH120: 11.13, SCH140: null,  SCH160: 13.50 },
  "5":    { STD: 6.55,  XS: 9.52,  XXS: 19.05, SCH10: null, SCH20: null, SCH30: null, SCH40: 6.55, SCH60: null, SCH80: 6.55,  SCH100: null,  SCH120: 12.70, SCH140: null,  SCH160: 15.87 },
  "6":    { STD: 7.11,  XS: 10.97, XXS: 21.95, SCH10: null, SCH20: null, SCH30: null, SCH40: 7.11, SCH60: null, SCH80: 7.11,  SCH100: null,  SCH120: 14.27, SCH140: null,  SCH160: 18.26 },
  "8":    { STD: 8.18,  XS: 12.70, XXS: 22.23, SCH10: null, SCH20: 6.35, SCH30: 7.03, SCH40: 8.18, SCH60: 10.31, SCH80: 8.18, SCH100: 15.09, SCH120: 18.26, SCH140: 20.62, SCH160: 23.01 },
  "10":   { STD: 9.27,  XS: 12.70, XXS: 25.40, SCH10: null, SCH20: 6.35, SCH30: 7.80, SCH40: 9.27, SCH60: 12.70, SCH80: 15.09, SCH100: 18.26, SCH120: 21.44, SCH140: 25.40, SCH160: 28.57 },
  "12":   { STD: 9.52,  XS: 12.70, XXS: 25.40, SCH10: null, SCH20: 6.35, SCH30: 8.38, SCH40: 10.31, SCH60: 14.27, SCH80: 17.48, SCH100: 21.44, SCH120: 25.40, SCH140: 28.57, SCH160: 33.32 },
  "14":   { STD: 9.52,  XS: 12.70, XXS: null,  SCH10: 6.35, SCH20: 7.92, SCH30: 9.52, SCH40: 11.13, SCH60: 15.09, SCH80: 19.05, SCH100: 23.83, SCH120: 27.79, SCH140: 31.75, SCH160: 35.71 },
  "16":   { STD: 9.52,  XS: 12.70, XXS: null,  SCH10: 6.35, SCH20: 7.92, SCH30: 9.52, SCH40: 12.70, SCH60: 16.66, SCH80: 21.44, SCH100: 26.19, SCH120: 30.96, SCH140: 36.53, SCH160: 40.49 },
  "18":   { STD: 9.52,  XS: 12.70, XXS: null,  SCH10: 6.35, SCH20: 7.92, SCH30: 11.13, SCH40: 14.27, SCH60: 19.05, SCH80: 23.83, SCH100: 29.36, SCH120: 34.93, SCH140: 39.67, SCH160: 45.24 },
  "20":   { STD: 9.52,  XS: 12.70, XXS: null,  SCH10: 6.35, SCH20: 9.52, SCH30: 12.70, SCH40: 15.09, SCH60: 20.62, SCH80: 26.18, SCH100: 32.54, SCH120: 38.10, SCH140: 44.45, SCH160: 50.01 },
  "22":   { STD: 9.52,  XS: 12.70, XXS: null,  SCH10: 6.35, SCH20: 9.52, SCH30: 12.70, SCH40: null, SCH60: 22.22, SCH80: 28.58, SCH100: 34.92, SCH120: 41.27, SCH140: 47.62, SCH160: 53.97 },
  "24":   { STD: 9.52,  XS: 12.70, XXS: null,  SCH10: 6.35, SCH20: 9.52, SCH30: 14.27, SCH40: 17.48, SCH60: 24.61, SCH80: 30.96, SCH100: 38.89, SCH120: 46.02, SCH140: 52.37, SCH160: 59.54 },
  "26":   { STD: 9.52,  XS: 12.70, XXS: null,  SCH10: 7.92, SCH20: 12.70, SCH30: null, SCH40: null, SCH60: null, SCH80: null, SCH100: null, SCH120: null, SCH140: null, SCH160: null },
  "28":   { STD: 9.52,  XS: 12.70, XXS: null,  SCH10: 7.92, SCH20: 12.70, SCH30: 15.88, SCH40: null, SCH60: null, SCH80: null, SCH100: null, SCH120: null, SCH140: null, SCH160: null },
  "30":   { STD: 9.52,  XS: 12.70, XXS: null,  SCH10: 7.92, SCH20: 12.70, SCH30: 15.88, SCH40: null, SCH60: null, SCH80: null, SCH100: null, SCH120: null, SCH140: null, SCH160: null },
  "32":   { STD: 9.52,  XS: 12.70, XXS: null,  SCH10: 7.92, SCH20: 12.70, SCH30: 15.88, SCH40: 17.48, SCH60: null, SCH80: null, SCH100: null, SCH120: null, SCH140: null, SCH160: null },
  "34":   { STD: 9.52,  XS: 12.70, XXS: null,  SCH10: 7.92, SCH20: 12.70, SCH30: 15.88, SCH40: 17.48, SCH60: null, SCH80: null, SCH100: null, SCH120: null, SCH140: null, SCH160: null },
  "36":   { STD: 9.52,  XS: 12.70, XXS: null,  SCH10: 7.92, SCH20: 12.70, SCH30: 15.88, SCH40: 19.05, SCH60: null, SCH80: null, SCH100: null, SCH120: null, SCH140: null, SCH160: null },
  "38":   { STD: 9.52,  XS: 12.70, XXS: null,  SCH10: null, SCH20: null, SCH30: null, SCH40: null, SCH60: null, SCH80: null, SCH100: null, SCH120: null, SCH140: null, SCH160: null },
  "40":   { STD: 9.52,  XS: 12.70, XXS: null,  SCH10: null, SCH20: null, SCH30: null, SCH40: null, SCH60: null, SCH80: null, SCH100: null, SCH120: null, SCH140: null, SCH160: null },
  "42":   { STD: 9.52,  XS: 12.70, XXS: null,  SCH10: null, SCH20: null, SCH30: null, SCH40: null, SCH60: null, SCH80: null, SCH100: null, SCH120: null, SCH140: null, SCH160: null },
  "44":   { STD: 9.52,  XS: 12.70, XXS: null,  SCH10: null, SCH20: null, SCH30: null, SCH40: null, SCH60: null, SCH80: null, SCH100: null, SCH120: null, SCH140: null, SCH160: null },
  "46":   { STD: 9.52,  XS: 12.70, XXS: null,  SCH10: null, SCH20: null, SCH30: null, SCH40: null, SCH60: null, SCH80: null, SCH100: null, SCH120: null, SCH140: null, SCH160: null },
  "48":   { STD: 9.52,  XS: 12.70, XXS: null,  SCH10: null, SCH20: null, SCH30: null, SCH40: null, SCH60: null, SCH80: null, SCH100: null, SCH120: null, SCH140: null, SCH160: null },
};

const bend45_weight: Record<string, ScheduleRecord> = {
  "0.5":  { STD: 0.04,   XS: 0.08,   XXS: null,   SCH10: null, SCH20: null, SCH30: null, SCH40: 0.04,  SCH60: null, SCH80: 0.04,  SCH100: null,  SCH120: null,  SCH140: null,  SCH160: 0.12  },
  "0.75": { STD: 0.04,   XS: 0.08,   XXS: null,   SCH10: null, SCH20: null, SCH30: null, SCH40: 0.04,  SCH60: null, SCH80: 0.04,  SCH100: null,  SCH120: null,  SCH140: null,  SCH160: 0.12  },
  "1":    { STD: 0.08,   XS: 0.10,   XXS: 0.19,   SCH10: null, SCH20: null, SCH30: null, SCH40: 0.08,  SCH60: null, SCH80: 0.08,  SCH100: null,  SCH120: null,  SCH140: null,  SCH160: 0.14  },
  "1.25": { STD: 0.12,   XS: 0.18,   XXS: 0.30,   SCH10: null, SCH20: null, SCH30: null, SCH40: 0.12,  SCH60: null, SCH80: 0.12,  SCH100: null,  SCH120: null,  SCH140: null,  SCH160: 0.22  },
  "1.5":  { STD: 0.18,   XS: 0.25,   XXS: 0.45,   SCH10: null, SCH20: null, SCH30: null, SCH40: 0.18,  SCH60: null, SCH80: 0.18,  SCH100: null,  SCH120: null,  SCH140: null,  SCH160: 0.33  },
  "2":    { STD: 0.32,   XS: 0.47,   XXS: 0.84,   SCH10: null, SCH20: null, SCH30: null, SCH40: 0.32,  SCH60: null, SCH80: 0.32,  SCH100: null,  SCH120: null,  SCH140: null,  SCH160: 0.70  },
  "2.5":  { STD: 0.64,   XS: 0.85,   XXS: 1.60,   SCH10: null, SCH20: null, SCH30: null, SCH40: 0.64,  SCH60: null, SCH80: 0.64,  SCH100: null,  SCH120: null,  SCH140: null,  SCH160: 1.20  },
  "3":    { STD: 1.02,   XS: 1.37,   XXS: 2.60,   SCH10: null, SCH20: null, SCH30: null, SCH40: 1.02,  SCH60: null, SCH80: 1.02,  SCH100: null,  SCH120: null,  SCH140: null,  SCH160: 2.00  },
  "3.5":  { STD: 1.43,   XS: 1.97,   XXS: null,   SCH10: null, SCH20: null, SCH30: null, SCH40: 1.43,  SCH60: null, SCH80: 1.43,  SCH100: null,  SCH120: null,  SCH140: null,  SCH160: null  },
  "4":    { STD: 1.95,   XS: 2.70,   XXS: 5.20,   SCH10: null, SCH20: null, SCH30: null, SCH40: 1.95,  SCH60: null, SCH80: 1.95,  SCH100: null,  SCH120: 3.47,  SCH140: null,  SCH160: 4.00  },
  "5":    { STD: 3.25,   XS: 4.42,   XXS: 9.08,   SCH10: null, SCH20: null, SCH30: null, SCH40: 3.25,  SCH60: null, SCH80: 3.25,  SCH100: null,  SCH120: 6.31,  SCH140: null,  SCH160: 7.50  },
  "6":    { STD: 5.10,   XS: 7.67,   XXS: 15.00,  SCH10: null, SCH20: null, SCH30: null, SCH40: 5.10,  SCH60: null, SCH80: 5.10,  SCH100: null,  SCH120: 9.81,  SCH140: null,  SCH160: 14.00 },
  "8":    { STD: 11.15,  XS: 14.95,  XXS: 27.00,  SCH10: null, SCH20: 9.00, SCH30: 10.35, SCH40: 11.15, SCH60: 13.34, SCH80: 11.15, SCH100: 19.07, SCH120: 21.59, SCH140: 26.00, SCH160: 29.00 },
  "10":   { STD: 20.50,  XS: 24.30,  XXS: 48.50,  SCH10: null, SCH20: 18.50, SCH30: 19.65, SCH40: 20.50, SCH60: 24.30, SCH80: 30.00, SCH100: 37.55, SCH120: 41.77, SCH140: 48.50, SCH160: 61.00 },
  "12":   { STD: 27.00,  XS: 35.00,  XXS: 70.80,  SCH10: null, SCH20: 24.75, SCH30: 26.03, SCH40: 29.57, SCH60: 41.31, SCH80: 49.94, SCH100: 61.50, SCH120: 70.82, SCH140: 79.00, SCH160: 90.34 },
  "14":   { STD: 34.00,  XS: 47.17,  XXS: null,   SCH10: 25.00, SCH20: 32.00, SCH30: 34.00, SCH40: 39.98, SCH60: 55.84, SCH80: 69.92, SCH100: 94.00, SCH120: 95.00, SCH140: 112.00, SCH160: 123.94 },
  "16":   { STD: 48.00,  XS: 62.37,  XXS: null,   SCH10: 32.00, SCH20: 46.50, SCH30: 48.00, SCH40: 62.37, SCH60: 80.81, SCH80: 102.15, SCH100: 130.00, SCH120: 137.00, SCH140: 161.50, SCH160: 183.00 },
  "18":   { STD: 60.00,  XS: 79.00,  XXS: null,   SCH10: 41.00, SCH20: 56.00, SCH30: 69.91, SCH40: 88.53, SCH60: 115.77, SCH80: 143.92, SCH100: 195.00, SCH120: 202.50, SCH140: 211.00, SCH160: 272.00 },
  "20":   { STD: 71.20,  XS: 97.16,  XXS: null,   SCH10: 50.00, SCH20: 71.20, SCH30: 97.16, SCH40: 114.00, SCH60: 155.72, SCH80: 195.67, SCH100: 238.00, SCH120: 254.00, SCH140: 303.50, SCH160: 385.00 },
  "22":   { STD: 89.00,  XS: 118.00, XXS: null,   SCH10: 60.00, SCH20: 89.00, SCH30: 128.10, SCH40: null, SCH60: 205.35, SCH80: 256.70, SCH100: 329.00, SCH120: 365.00, SCH140: 425.00, SCH160: 510.00 },
  "24":   { STD: 102.95, XS: 141.20, XXS: null,   SCH10: 73.00, SCH20: 102.95, SCH30: 159.35, SCH40: 192.04, SCH60: 266.95, SCH80: 333.70, SCH100: 410.00, SCH120: 477.00, SCH140: 545.00, SCH160: 635.00 },
  "26":   { STD: 124.90, XS: 165.71, XXS: null,   SCH10: 104.00, SCH20: 165.71, SCH30: null, SCH40: null, SCH60: null, SCH80: null, SCH100: null, SCH120: null, SCH140: null, SCH160: null },
  "28":   { STD: 150.00, XS: 202.00, XXS: null,   SCH10: 121.00, SCH20: 202.00, SCH30: 239.00, SCH40: null, SCH60: null, SCH80: null, SCH100: null, SCH120: null, SCH140: null, SCH160: null },
  "30":   { STD: 167.00, XS: 220.00, XXS: null,   SCH10: 139.00, SCH20: 220.00, SCH30: 275.00, SCH40: null, SCH60: null, SCH80: null, SCH100: null, SCH120: null, SCH140: null, SCH160: null },
  "32":   { STD: 193.00, XS: 255.00, XXS: null,   SCH10: 158.00, SCH20: 255.00, SCH30: 313.00, SCH40: 344.00, SCH60: null, SCH80: null, SCH100: null, SCH120: null, SCH140: null, SCH160: null },
  "34":   { STD: 215.00, XS: 280.00, XXS: null,   SCH10: 178.00, SCH20: 280.00, SCH30: 354.00, SCH40: 389.00, SCH60: null, SCH80: null, SCH100: null, SCH120: null, SCH140: null, SCH160: null },
  "36":   { STD: 241.00, XS: 312.00, XXS: null,   SCH10: 200.00, SCH20: 312.00, SCH30: 398.00, SCH40: 476.00, SCH60: null, SCH80: null, SCH100: null, SCH120: null, SCH140: null, SCH160: null },
  "38":   { STD: 272.00, XS: 354.00, XXS: null,   SCH10: null, SCH20: null, SCH30: null, SCH40: null, SCH60: null, SCH80: null, SCH100: null, SCH120: null, SCH140: null, SCH160: null },
  "40":   { STD: 290.00, XS: 372.00, XXS: null,   SCH10: null, SCH20: null, SCH30: null, SCH40: null, SCH60: null, SCH80: null, SCH100: null, SCH120: null, SCH140: null, SCH160: null },
  "42":   { STD: 327.00, XS: 420.00, XXS: null,   SCH10: null, SCH20: null, SCH30: null, SCH40: null, SCH60: null, SCH80: null, SCH100: null, SCH120: null, SCH140: null, SCH160: null },
  "44":   { STD: 363.00, XS: 488.00, XXS: null,   SCH10: null, SCH20: null, SCH30: null, SCH40: null, SCH60: null, SCH80: null, SCH100: null, SCH120: null, SCH140: null, SCH160: null },
  "46":   { STD: 408.00, XS: 530.00, XXS: null,   SCH10: null, SCH20: null, SCH30: null, SCH40: null, SCH60: null, SCH80: null, SCH100: null, SCH120: null, SCH140: null, SCH160: null },
  "48":   { STD: 443.00, XS: 567.00, XXS: null,   SCH10: null, SCH20: null, SCH30: null, SCH40: null, SCH60: null, SCH80: null, SCH100: null, SCH120: null, SCH140: null, SCH160: null },
};

// ─────────────────────────────────────────────────────────────────────────────
// 90° LONG RADIUS BENDS
// ─────────────────────────────────────────────────────────────────────────────

const bend90_sizes: Record<string, FittingSize> = {
  "0.5":  { nps: "1/2",   od_mm: 21,   length_mm: 59.69    },
  "0.75": { nps: "3/4",   od_mm: 27,   length_mm: 59.69    },
  "1":    { nps: "1",     od_mm: 33,   length_mm: 59.69    },
  "1.25": { nps: "1 1/4", od_mm: 42,   length_mm: 75.398   },
  "1.5":  { nps: "1 1/2", od_mm: 48,   length_mm: 89.535   },
  "2":    { nps: "2",     od_mm: 60,   length_mm: 119.381  },
  "2.5":  { nps: "2 1/2", od_mm: 73,   length_mm: 149.226  },
  "3":    { nps: "3",     od_mm: 89,   length_mm: 179.071  },
  "3.5":  { nps: "3 1/2", od_mm: 102,  length_mm: 208.916  },
  "4":    { nps: "4",     od_mm: 114,  length_mm: 238.761  },
  "5":    { nps: "5",     od_mm: 141,  length_mm: 298.451  },
  "6":    { nps: "6",     od_mm: 168,  length_mm: 359.712  },
  "8":    { nps: "8",     od_mm: 219,  length_mm: 479.093  },
  "10":   { nps: "10",    od_mm: 273,  length_mm: 598.473  },
  "12":   { nps: "12",    od_mm: 324,  length_mm: 717.854  },
  "14":   { nps: "14",    od_mm: 356,  length_mm: 837.234  },
  "16":   { nps: "16",    od_mm: 406,  length_mm: 958.186  },
  "18":   { nps: "18",    od_mm: 457,  length_mm: 1077.566 },
  "20":   { nps: "20",    od_mm: 508,  length_mm: 1196.947 },
  "22":   { nps: "22",    od_mm: 559,  length_mm: 1316.327 },
  "24":   { nps: "24",    od_mm: 610,  length_mm: 1435.708 },
  "26":   { nps: "26",    od_mm: 660,  length_mm: 1556.659 },
  "28":   { nps: "28",    od_mm: 711,  length_mm: 1676.040 },
  "30":   { nps: "30",    od_mm: 762,  length_mm: 1795.420 },
  "32":   { nps: "32",    od_mm: 813,  length_mm: 1914.801 },
  "34":   { nps: "34",    od_mm: 864,  length_mm: 2034.181 },
  "36":   { nps: "36",    od_mm: 914,  length_mm: 2155.133 },
  "38":   { nps: "38",    od_mm: 965,  length_mm: 2274.513 },
  "40":   { nps: "40",    od_mm: 1016, length_mm: 2393.894 },
  "42":   { nps: "42",    od_mm: 1067, length_mm: 2513.274 },
  "44":   { nps: "44",    od_mm: 1118, length_mm: 2632.655 },
  "46":   { nps: "46",    od_mm: 1168, length_mm: 2753.606 },
  "48":   { nps: "48",    od_mm: 1219, length_mm: 2872.986 },
};

// Wall thickness identical to 45° LR bends (same pipe OD / schedule)
const bend90_wallThickness = bend45_wallThickness;

const bend90_weight: Record<string, ScheduleRecord> = {
  "0.5":  { STD: 0.29,   XS: 0.35,   XXS: 0.58,   SCH10: null, SCH20: null, SCH30: null,  SCH40: 0.29,  SCH60: null, SCH80: 0.35,  SCH100: null,  SCH120: null,  SCH140: null,  SCH160: 0.45   },
  "0.75": { STD: 0.29,   XS: 0.35,   XXS: 0.58,   SCH10: null, SCH20: null, SCH30: null,  SCH40: 0.29,  SCH60: null, SCH80: 0.35,  SCH100: null,  SCH120: null,  SCH140: null,  SCH160: 0.45   },
  "1":    { STD: 0.29,   XS: 0.35,   XXS: 0.58,   SCH10: null, SCH20: null, SCH30: null,  SCH40: 0.29,  SCH60: null, SCH80: 0.35,  SCH100: null,  SCH120: null,  SCH140: null,  SCH160: 0.45   },
  "1.25": { STD: 0.53,   XS: 0.65,   XXS: 1.05,   SCH10: null, SCH20: null, SCH30: null,  SCH40: 0.53,  SCH60: null, SCH80: 0.65,  SCH100: null,  SCH120: null,  SCH140: null,  SCH160: 0.77   },
  "1.5":  { STD: 0.77,   XS: 0.96,   XXS: 1.56,   SCH10: null, SCH20: null, SCH30: null,  SCH40: 0.77,  SCH60: null, SCH80: 0.96,  SCH100: null,  SCH120: null,  SCH140: null,  SCH160: 1.21   },
  "2":    { STD: 1.88,   XS: 1.90,   XXS: 2.69,   SCH10: null, SCH20: null, SCH30: null,  SCH40: 1.88,  SCH60: null, SCH80: 1.90,  SCH100: null,  SCH120: null,  SCH140: null,  SCH160: 2.25   },
  "2.5":  { STD: 2.69,   XS: 3.07,   XXS: 4.54,   SCH10: null, SCH20: null, SCH30: null,  SCH40: 2.69,  SCH60: null, SCH80: 3.07,  SCH100: null,  SCH120: null,  SCH140: null,  SCH160: 3.42   },
  "3":    { STD: 3.82,   XS: 4.50,   XXS: 7.63,   SCH10: null, SCH20: null, SCH30: null,  SCH40: 3.82,  SCH60: null, SCH80: 4.50,  SCH100: null,  SCH120: null,  SCH140: null,  SCH160: 6.21   },
  "3.5":  { STD: 5.18,   XS: 6.17,   XXS: null,   SCH10: null, SCH20: null, SCH30: null,  SCH40: 5.18,  SCH60: null, SCH80: 6.17,  SCH100: null,  SCH120: null,  SCH140: null,  SCH160: null   },
  "4":    { STD: 6.00,   XS: 8.44,   XXS: 17.00,  SCH10: null, SCH20: null, SCH30: null,  SCH40: 6.00,  SCH60: null, SCH80: 8.44,  SCH100: null,  SCH120: 9.00,  SCH140: null,  SCH160: 15.53  },
  "5":    { STD: 9.94,   XS: 12.94,  XXS: 25.00,  SCH10: null, SCH20: null, SCH30: null,  SCH40: 9.94,  SCH60: null, SCH80: 12.94, SCH100: null,  SCH120: 18.00, SCH140: null,  SCH160: 23.93  },
  "6":    { STD: 16.48,  XS: 19.30,  XXS: 39.00,  SCH10: null, SCH20: null, SCH30: null,  SCH40: 16.48, SCH60: null, SCH80: 19.30, SCH100: null,  SCH120: 24.00, SCH140: null,  SCH160: 38.59  },
  "8":    { STD: 33.00,  XS: 34.50,  XXS: 69.00,  SCH10: null, SCH20: 29.00, SCH30: 31.00, SCH40: 33.00, SCH60: 34.50, SCH80: 34.50, SCH100: 43.65, SCH120: 50.00, SCH140: 54.00, SCH160: 71.00 },
  "10":   { STD: 49.35,  XS: 58.57,  XXS: 98.00,  SCH10: null, SCH20: 34.70, SCH30: 36.77, SCH40: 49.35, SCH60: 58.57, SCH80: 68.00, SCH100: 74.00, SCH120: 93.00, SCH140: 99.00, SCH160: 120.00 },
  "12":   { STD: 65.00,  XS: 84.90,  XXS: 150.00, SCH10: null, SCH20: 59.00, SCH30: 61.74, SCH40: 70.50, SCH60: 102.60, SCH80: 115.00, SCH100: 136.00, SCH120: 150.00, SCH140: 177.00, SCH160: 184.00 },
  "14":   { STD: 93.00,  XS: 127.12, XXS: null,   SCH10: 87.16, SCH20: 90.00, SCH30: 93.00, SCH40: 114.41, SCH60: 141.20, SCH80: 165.00, SCH100: 206.00, SCH120: 240.00, SCH140: 275.00, SCH160: 300.00 },
  "16":   { STD: 115.00, XS: 167.52, XXS: null,   SCH10: 90.80, SCH20: 100.00, SCH30: 115.00, SCH40: 167.52, SCH60: 207.93, SCH80: 249.00, SCH100: 305.00, SCH120: 330.00, SCH140: 385.00, SCH160: 425.00 },
  "18":   { STD: 135.00, XS: 190.00, XXS: null,   SCH10: 94.50, SCH20: 127.12, SCH30: 181.14, SCH40: 238.35, SCH60: 277.85, SCH80: 322.00, SCH100: 380.00, SCH120: 450.00, SCH140: 500.00, SCH160: 590.00 },
  "20":   { STD: 168.00, XS: 245.00, XXS: null,   SCH10: 120.00, SCH20: 168.00, SCH30: 265.00, SCH40: 320.52, SCH60: 378.64, SCH80: 459.05, SCH100: 540.00, SCH120: 590.00, SCH140: 720.00, SCH160: 790.00 },
  "22":   { STD: 200.00, XS: 280.00, XXS: null,   SCH10: 143.00, SCH20: 200.00, SCH30: 355.00, SCH40: null, SCH60: 510.00, SCH80: 600.00, SCH100: 725.00, SCH120: 840.00, SCH140: 950.00, SCH160: 1100.00 },
  "24":   { STD: 240.00, XS: 350.00, XXS: null,   SCH10: 170.00, SCH20: 240.00, SCH30: 443.55, SCH40: 570.68, SCH60: 656.48, SCH80: 748.00, SCH100: 910.00, SCH120: 1100.00, SCH140: 1180.00, SCH160: 1310.00 },
  "26":   { STD: 288.00, XS: 360.50, XXS: null,   SCH10: 240.00, SCH20: 360.50, SCH30: null, SCH40: null, SCH60: null, SCH80: null, SCH100: null, SCH120: null, SCH140: null, SCH160: null },
  "28":   { STD: 337.00, XS: 421.00, XXS: null,   SCH10: 280.00, SCH20: 421.00, SCH30: 526.00, SCH40: null, SCH60: null, SCH80: null, SCH100: null, SCH120: null, SCH140: null, SCH160: null },
  "30":   { STD: 388.50, XS: 483.50, XXS: null,   SCH10: 322.00, SCH20: 483.50, SCH30: 604.00, SCH40: null, SCH60: null, SCH80: null, SCH100: null, SCH120: null, SCH140: null, SCH160: null },
  "32":   { STD: 451.00, XS: 559.00, XXS: null,   SCH10: 375.00, SCH20: 559.00, SCH30: 699.00, SCH40: 769.00, SCH60: null, SCH80: null, SCH100: null, SCH120: null, SCH140: null, SCH160: null },
  "34":   { STD: 516.00, XS: 645.00, XXS: null,   SCH10: 429.00, SCH20: 645.00, SCH30: 805.00, SCH40: 886.00, SCH60: null, SCH80: null, SCH100: null, SCH120: null, SCH140: null, SCH160: null },
  "36":   { STD: 587.50, XS: 731.00, XXS: null,   SCH10: 488.00, SCH20: 731.00, SCH30: 913.00, SCH40: 1004.00, SCH60: null, SCH80: null, SCH100: null, SCH120: null, SCH140: null, SCH160: null },
  "38":   { STD: 638.00, XS: 812.00, XXS: null,   SCH10: null, SCH20: null, SCH30: null, SCH40: null, SCH60: null, SCH80: null, SCH100: null, SCH120: null, SCH140: null, SCH160: null },
  "40":   { STD: 690.00, XS: 894.50, XXS: null,   SCH10: null, SCH20: null, SCH30: null, SCH40: null, SCH60: null, SCH80: null, SCH100: null, SCH120: null, SCH140: null, SCH160: null },
  "42":   { STD: 831.00, XS: 1045.00, XXS: null,  SCH10: null, SCH20: null, SCH30: null, SCH40: null, SCH60: null, SCH80: null, SCH100: null, SCH120: null, SCH140: null, SCH160: null },
  "44":   { STD: 899.00, XS: 1194.00, XXS: null,  SCH10: null, SCH20: null, SCH30: null, SCH40: null, SCH60: null, SCH80: null, SCH100: null, SCH120: null, SCH140: null, SCH160: null },
  "46":   { STD: 1007.00,XS: 1346.00, XXS: null,  SCH10: null, SCH20: null, SCH30: null, SCH40: null, SCH60: null, SCH80: null, SCH100: null, SCH120: null, SCH140: null, SCH160: null },
  "48":   { STD: 1112.50,XS: 1498.50, XXS: null,  SCH10: null, SCH20: null, SCH30: null, SCH40: null, SCH60: null, SCH80: null, SCH100: null, SCH120: null, SCH140: null, SCH160: null },
};

// ─────────────────────────────────────────────────────────────────────────────
// EXPORTED DATABASE
// ─────────────────────────────────────────────────────────────────────────────

export const FITTINGS_DB: Record<string, FittingType> = {
  bend45LR: {
    label: "45° LR Elbow",
    standard: "ASME B16.9",
    sizes: bend45_sizes,
    wallThickness_mm: bend45_wallThickness,
    weight_kg: bend45_weight,
  },
  bend90LR: {
    label: "90° LR Elbow",
    standard: "ASME B16.9",
    sizes: bend90_sizes,
    wallThickness_mm: bend90_wallThickness,
    weight_kg: bend90_weight,
  },
};

export const FITTING_KEYS = Object.keys(FITTINGS_DB) as (keyof typeof FITTINGS_DB)[];
