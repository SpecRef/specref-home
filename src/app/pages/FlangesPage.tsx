import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  flangeDimensions,
  flangeTypes,
  pressureClassMap,
  flangeStandards,
  type FlangeSize,
} from "../../data/flangeData";

// ─── Types ────────────────────────────────────────────────────────────────────

type ClassKey = keyof typeof flangeDimensions;

interface LookupResult {
  nps: string;
  dn: number | null | undefined;
  classKey: ClassKey;
  flangeTypeCode: string;
  // Geometry
  X: number | undefined;   // Flange OD
  Y: number | undefined;   // Length (WN or SO depending on type)
  B2: number | undefined;  // Bore
  T: number | undefined;   // Min thickness
  // Weight
  wt: number | null | undefined;
  // Extra
  raisedFaceHeight: number | undefined;
  standard: string;
  note: string | undefined;
}

type HistoryEntry = { classKey: ClassKey; nps: string; typeCode: string };

// ─── Helpers ──────────────────────────────────────────────────────────────────

const CLASS_KEYS: ClassKey[] = [
  "class150", "class300", "class400", "class600",
  "class900", "class1500", "class2500",
];

const CLASS_LABELS: Record<ClassKey, string> = {
  class150:  "Class 150",
  class300:  "Class 300",
  class400:  "Class 400",
  class600:  "Class 600",
  class900:  "Class 900",
  class1500: "Class 1500",
  class2500: "Class 2500",
};

/** Flange types that have their own weight/length column in the DB */
const QUERYABLE_TYPES = flangeTypes.filter(t =>
  ["WN", "SO", "BL", "TH", "SW"].includes(t.code)
);

/** Weight key on a FlangeSize record for a given type code */
function weightKey(typeCode: string): keyof FlangeSize {
  const map: Record<string, keyof FlangeSize> = {
    WN: "wt_WN", SO: "wt_SO", BL: "wt_BL", TH: "wt_TH", SW: "wt_SW",
  };
  return map[typeCode] ?? "wt_WN";
}

/** Length key — WN uses Y_WN, SO uses Y_SO, everything else uses Y_WN */
function lengthKey(typeCode: string): keyof FlangeSize {
  return typeCode === "SO" ? "Y_SO" : "Y_WN";
}

/** ASME → ISO PN lookup */
function isoPn(classKey: ClassKey): number | undefined {
  const asmeNum = parseInt(classKey.replace("class", ""));
  return pressureClassMap.find(p => p.asme === asmeNum)?.isoPn;
}

/** Sizes available for a class × type combination (filter out sizes
 *  where the weight for that type is null/undefined) */
function availableSizes(classKey: ClassKey, typeCode: string): FlangeSize[] {
  const sizes = flangeDimensions[classKey]?.sizes ?? [];
  const wk = weightKey(typeCode);
  return sizes.filter(s => s[wk] != null);
}

function runLookup(
  classKey: ClassKey,
  nps: string,
  typeCode: string
): LookupResult | null {
  const dimClass = flangeDimensions[classKey];
  if (!dimClass) return null;

  const size = dimClass.sizes.find(s => s.nps === nps);
  if (!size) return null;

  const wk = weightKey(typeCode);
  const lk = lengthKey(typeCode);

  const wt = size[wk] as number | null | undefined;
  // Allow LWN/OR etc but warn; only return null if this is a hard lookup fail
  if (wt === undefined) return null;

  return {
    nps: size.nps,
    dn: size.dn,
    classKey,
    flangeTypeCode: typeCode,
    X:  size.X,
    Y:  size[lk] as number | undefined,
    B2: size.B2,
    T:  size.T,
    wt,
    raisedFaceHeight: dimClass.raisedFaceHeight_mm,
    standard: dimClass.standard,
    note: dimClass.note,
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function FlangesPage() {
  const [selectedClass, setSelectedClass] = useState<ClassKey>("class150");
  const [selectedType,  setSelectedType]  = useState("WN");
  const [selectedNPS,   setSelectedNPS]   = useState("");
  const [result,        setResult]        = useState<LookupResult | null>(null);
  const [noData,        setNoData]        = useState(false);
  const [history,       setHistory]       = useState<HistoryEntry[]>([]);

  // Recompute available sizes when class or type changes
  const sizes = availableSizes(selectedClass, selectedType);

  useEffect(() => {
    const first = sizes[0]?.nps ?? "";
    setSelectedNPS(first);
    setResult(null);
    setNoData(false);
  }, [selectedClass, selectedType]);

  useEffect(() => {
    setResult(null);
    setNoData(false);
  }, [selectedNPS]);

  function runQuery() {
    const data = runLookup(selectedClass, selectedNPS, selectedType);
    if (!data || data.wt == null) {
      setResult(null);
      setNoData(true);
    } else {
      setResult(data);
      setNoData(false);
      setHistory(prev => {
        const filtered = prev.filter(
          h => !(h.classKey === selectedClass && h.nps === selectedNPS && h.typeCode === selectedType)
        );
        return [
          { classKey: selectedClass, nps: selectedNPS, typeCode: selectedType },
          ...filtered,
        ].slice(0, 5);
      });
    }
  }

  function restoreFromHistory(entry: HistoryEntry) {
    setSelectedClass(entry.classKey);
    setSelectedType(entry.typeCode);
    setSelectedNPS(entry.nps);
    const data = runLookup(entry.classKey, entry.nps, entry.typeCode);
    setResult(data?.wt != null ? data : null);
    setNoData(!data || data.wt == null);
  }

  const currentStandard = flangeStandards.find(s => s.id === "ASME_B16_5");
  const pn = isoPn(selectedClass);
  const typeLabel = QUERYABLE_TYPES.find(t => t.code === selectedType);

  return (
    <div className="min-h-screen bg-slate-900 relative">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1660446718081-d2ac1e7985ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxwZXRyb2NoZW1pY2FsJTIwcmVmaW5lcnklMjB0d2lsaWdodCUyMHBpcGVzJTIwdG93ZXJzfGVufDF8fHx8MTc3NjcwNzE3NHww&ixlib=rb-4.1.0&q=80&w=1080)',
          backgroundPosition: 'center 70%'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/80 to-slate-900/95"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-white/10 bg-slate-900/50 backdrop-blur-md">
          <div className="mx-auto max-w-7xl px-6 py-6">
            <div className="flex items-center justify-between">
              <Link to="/specref-home/" className="flex items-center gap-3 group">
                <div className="flex size-12 items-center justify-center rounded-lg bg-blue-500/20 ring-1 ring-blue-400/30">
                  <svg className="size-7 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-white group-hover:text-blue-300 transition-colors">SpecRef</h1>
                  <p className="text-sm text-slate-300">For Quantity Surveyors & Estimators</p>
                </div>
              </Link>
              <nav className="flex items-center gap-2 text-sm text-slate-400">
                <Link to="/specref-home/" className="hover:text-white transition-colors">Home</Link>
                <span>/</span>
                <span className="text-emerald-300">Flanges</span>
              </nav>
            </div>
          </div>
        </header>

        {/* Page Title */}
        <section className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex items-center gap-4 mb-2">
            <div className="flex size-14 items-center justify-center rounded-xl bg-emerald-950/50 ring-1 ring-emerald-400/30">
              <svg className="size-9" viewBox="0 0 64 64" fill="none" strokeWidth="1.5">
                <circle cx="32" cy="32" r="18" stroke="#34d399" fill="none" />
                {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
                  const rad = (deg * Math.PI) / 180;
                  const x = 32 + 14 * Math.cos(rad);
                  const y = 32 + 14 * Math.sin(rad);
                  return <circle key={i} cx={x} cy={y} r="1.8" stroke="#34d399" fill="none" opacity="0.7" />;
                })}
                <circle cx="32" cy="32" r="10" stroke="#34d399" fill="none" opacity="0.5" />
                <circle cx="32" cy="32" r="6"  stroke="#34d399" fill="none" opacity="0.3" />
              </svg>
            </div>
            <div>
              <h2 className="text-3xl text-white">Flanges</h2>
              <p className="text-slate-300">ASME B16.5 · ASME B16.47 · API 6A</p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="mx-auto max-w-7xl px-6 pb-24 grid gap-6 lg:grid-cols-3">

          {/* ── Left: Controls ──────────────────────────────────────── */}
          <div className="lg:col-span-1 space-y-4">

            {/* Filter Card */}
            <div className="rounded-2xl border border-white/10 bg-slate-800/40 backdrop-blur-md p-6">
              <h3 className="text-white mb-5">Select Parameters</h3>

              <div className="space-y-4">
                {/* Pressure Class */}
                <div>
                  <label className="block text-xs text-slate-400 mb-1 uppercase tracking-wider">
                    Pressure Class
                  </label>
                  <select
                    value={selectedClass}
                    onChange={e => setSelectedClass(e.target.value as ClassKey)}
                    className="w-full rounded-lg bg-slate-700/60 border border-white/10 text-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-400/50"
                  >
                    {CLASS_KEYS.map(k => (
                      <option key={k} value={k}>{CLASS_LABELS[k]}</option>
                    ))}
                  </select>
                </div>

                {/* Flange Type */}
                <div>
                  <label className="block text-xs text-slate-400 mb-1 uppercase tracking-wider">
                    Flange Type
                  </label>
                  <select
                    value={selectedType}
                    onChange={e => setSelectedType(e.target.value)}
                    className="w-full rounded-lg bg-slate-700/60 border border-white/10 text-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-400/50"
                  >
                    {QUERYABLE_TYPES.map(t => (
                      <option key={t.code} value={t.code}>
                        {t.code} — {t.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* NPS */}
                <div>
                  <label className="block text-xs text-slate-400 mb-1 uppercase tracking-wider">
                    Size (NPS)
                  </label>
                  <select
                    value={selectedNPS}
                    onChange={e => setSelectedNPS(e.target.value)}
                    disabled={sizes.length === 0}
                    className="w-full rounded-lg bg-slate-700/60 border border-white/10 text-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-400/50 disabled:opacity-40"
                  >
                    {sizes.map(s => (
                      <option key={s.nps} value={s.nps}>NPS {s.nps}</option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={runQuery}
                  disabled={!selectedNPS}
                  className="w-full rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-medium py-2.5 text-sm transition-colors"
                >
                  Get Data
                </button>
              </div>
            </div>

            {/* Class Info Card */}
            <div className="rounded-2xl border border-white/10 bg-slate-800/40 backdrop-blur-md p-6">
              <h3 className="text-white mb-3 text-sm uppercase tracking-wider">Class Info</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Standard</span>
                  <span className="text-white">{flangeDimensions[selectedClass]?.standard}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Pressure class</span>
                  <span className="text-white">{CLASS_LABELS[selectedClass]}</span>
                </div>
                {pn && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">ISO PN equiv.</span>
                    <span className="text-emerald-300">PN {pn}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-400">RF height</span>
                  <span className="text-white">
                    {flangeDimensions[selectedClass]?.raisedFaceHeight_mm ?? "—"} mm
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Sizes available</span>
                  <span className="text-emerald-300">{sizes.length} NPS</span>
                </div>
                {flangeDimensions[selectedClass]?.note && (
                  <p className="text-xs text-amber-300/80 pt-1 border-t border-white/5">
                    ⚠ {flangeDimensions[selectedClass].note}
                  </p>
                )}
              </div>
            </div>

            {/* History Card */}
            {history.length > 0 && (
              <div className="rounded-2xl border border-white/10 bg-slate-800/40 backdrop-blur-md p-6">
                <h3 className="text-white mb-3 text-sm uppercase tracking-wider">Recent Queries</h3>
                <ul className="space-y-2">
                  {history.map((h, i) => (
                    <li key={i}>
                      <button
                        onClick={() => restoreFromHistory(h)}
                        className="w-full text-left text-sm text-slate-300 hover:text-emerald-300 transition-colors py-1"
                      >
                        {CLASS_LABELS[h.classKey]} · NPS {h.nps} · {h.typeCode}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* ── Right: Results ───────────────────────────────────────── */}
          <div className="lg:col-span-2">

            {/* Empty state */}
            {!result && !noData && (
              <div className="rounded-2xl border border-white/10 bg-slate-800/25 backdrop-blur-md p-12 flex flex-col items-center justify-center text-center min-h-64">
                <div className="size-16 rounded-full bg-emerald-500/10 ring-1 ring-emerald-400/20 flex items-center justify-center mb-4">
                  <svg className="size-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-slate-300 mb-1">Select parameters and click <span className="text-emerald-300">Get Data</span></p>
                <p className="text-slate-500 text-sm">Results will appear here</p>
              </div>
            )}

            {/* No data warning */}
            {noData && (
              <div className="rounded-2xl border border-amber-400/20 bg-amber-500/5 backdrop-blur-md p-8 flex items-center gap-4">
                <div className="size-10 rounded-full bg-amber-500/10 ring-1 ring-amber-400/30 flex items-center justify-center shrink-0">
                  <svg className="size-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-amber-300 font-medium">No data for this combination</p>
                  <p className="text-slate-400 text-sm mt-0.5">
                    This class / type / NPS combination is not tabulated in the standard.
                    Try a different flange type or pressure class.
                  </p>
                </div>
              </div>
            )}

            {/* Result */}
            {result && (
              <div className="space-y-4">
                {/* Result Header */}
                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/5 backdrop-blur-md p-6">
                  <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
                    <h3 className="text-white">
                      NPS {result.nps}
                      {result.dn ? <span className="text-slate-400 text-base ml-2">(DN {result.dn})</span> : null}
                      <span className="text-slate-400 text-base ml-2">— {typeLabel?.name ?? result.flangeTypeCode}</span>
                    </h3>
                    <div className="flex gap-2 flex-wrap">
                      <span className="text-xs text-emerald-300 bg-emerald-500/10 border border-emerald-400/20 rounded-full px-3 py-1">
                        {CLASS_LABELS[result.classKey]}
                      </span>
                      {pn && (
                        <span className="text-xs text-slate-300 bg-slate-500/10 border border-slate-400/20 rounded-full px-3 py-1">
                          PN {pn}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-slate-400 text-sm">{result.standard}</p>
                  {result.note && (
                    <p className="text-xs text-amber-300/70 mt-1">⚠ {result.note}</p>
                  )}
                </div>

                {/* Data Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Flange OD */}
                  <div className="rounded-xl border border-white/10 bg-slate-800/40 backdrop-blur-md p-5">
                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">Flange O.D. (X)</p>
                    <p className="text-2xl text-white font-light">
                      {result.X != null ? `${result.X} mm` : "—"}
                    </p>
                    <p className="text-sm text-slate-400 mt-1">
                      {result.X != null ? `${(result.X / 25.4).toFixed(2)}"` : ""}
                    </p>
                  </div>

                  {/* Length / Height */}
                  <div className="rounded-xl border border-white/10 bg-slate-800/40 backdrop-blur-md p-5">
                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">
                      {result.flangeTypeCode === "SO" ? "Overall Length (SO)" : "Overall Length (WN)"}
                    </p>
                    <p className="text-2xl text-white font-light">
                      {result.Y != null ? `${result.Y} mm` : "—"}
                    </p>
                    <p className="text-sm text-slate-400 mt-1">
                      {result.Y != null ? `${(result.Y / 25.4).toFixed(2)}"` : ""}
                    </p>
                  </div>

                  {/* Bore */}
                  <div className="rounded-xl border border-white/10 bg-slate-800/40 backdrop-blur-md p-5">
                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">Bore (B2)</p>
                    <p className="text-2xl text-white font-light">
                      {result.B2 != null ? `${result.B2} mm` : "—"}
                    </p>
                    <p className="text-sm text-slate-400 mt-1">
                      {result.B2 != null ? `${(result.B2 / 25.4).toFixed(3)}"` : ""}
                    </p>
                  </div>

                  {/* Min thickness */}
                  <div className="rounded-xl border border-white/10 bg-slate-800/40 backdrop-blur-md p-5">
                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">Min Thickness (T)</p>
                    <p className="text-2xl text-white font-light">
                      {result.T != null ? `${result.T} mm` : "—"}
                    </p>
                    <p className="text-sm text-slate-400 mt-1">
                      {result.T != null ? `${(result.T / 25.4).toFixed(3)}"` : ""}
                    </p>
                  </div>

                  {/* Weight — full width */}
                  <div className="col-span-2 rounded-xl border border-emerald-400/10 bg-emerald-500/5 backdrop-blur-md p-5">
                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">
                      Approx. Weight ({typeLabel?.name ?? result.flangeTypeCode})
                    </p>
                    <p className="text-3xl text-emerald-300 font-light">
                      {result.wt != null ? `${result.wt} kg` : "—"}
                    </p>
                    <p className="text-sm text-slate-400 mt-1">
                      {result.wt != null ? `${(result.wt * 2.20462).toFixed(1)} lb` : ""}
                    </p>
                    {result.raisedFaceHeight != null && (
                      <p className="text-xs text-slate-500 mt-2">
                        Raised face: {result.raisedFaceHeight} mm
                        {result.raisedFaceHeight === 1.6
                          ? " (included in Y dimension)"
                          : " (not included in Y dimension)"}
                      </p>
                    )}
                  </div>
                </div>

                {/* Disclaimer */}
                <div className="rounded-xl border border-white/5 bg-slate-800/20 px-5 py-3">
                  <p className="text-xs text-slate-500">
                    ⚠ Reference only — source: Trouvay & Cauvin 2001, Chapter 3.
                    Verify all data against current official standards before use in design or procurement.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 bg-slate-900/50 backdrop-blur-md">
          <div className="mx-auto max-w-7xl px-6 py-8">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">SpecRef © {new Date().getFullYear()}</p>
              <p className="text-sm text-slate-400">Professional Engineering Data</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
