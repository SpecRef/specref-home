import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  UNEQUAL_FITTINGS_DB,
  UNEQUAL_FITTING_KEYS,
} from "../../data/unequalfittingData";
// ─── Types ────────────────────────────────────────────────────────────────────
interface LookupResult {
  nps: string;
  od_main_mm: number;
  od_outlet_mm: number;
  length_mm: number;
  schedule: ScheduleKey;
  mainWallThickness_mm: number | null;
  branchWallThickness_mm: number | null;
  weight_kg: number | null;
  fittingKey: string;
  fittingLabel: string;
  standard: string;
}
type HistoryEntry = {
  fittingKey: string;
  npsKey: string;
  schedule: ScheduleKey;
};
// ─── Helpers ──────────────────────────────────────────────────────────────────
/** Schedules that have at least one non-null value for this fitting × NPS */
function availableSchedules(
  fittingKey: string,
  npsKey: string
): ScheduleKey[] {
  const fitting = UNEQUAL_FITTINGS_DB[fittingKey];
  if (!fitting) return [];
  return SCHEDULES.filter(
    s =>
      fitting.mainWallThickness_mm[npsKey]?.[s] != null ||
      fitting.branchWallThickness_mm[npsKey]?.[s] != null ||
      fitting.weight_kg[npsKey]?.[s] != null
  );
}
function runLookup(
  fittingKey: string,
  npsKey: string,
  schedule: ScheduleKey
): LookupResult | null {
  const fitting = UNEQUAL_FITTINGS_DB[fittingKey];
  if (!fitting) return null;
  const size = fitting.sizes[npsKey];
  if (!size) return null;
  const mainWT =
    fitting.mainWallThickness_mm[npsKey]?.[schedule] ?? null;
  const branchWT =
    fitting.branchWallThickness_mm[npsKey]?.[schedule] ?? null;
  const wkg = fitting.weight_kg[npsKey]?.[schedule] ?? null;
  return {
    nps: size.nps,
    od_mm: size.od_mm,
    length_mm: size.length_mm,
    schedule,
    mainWallThickness_mm: mainWT,
    branchWallThickness_mm: branchWT,
    weight_kg: wkg,
    fittingKey,
    fittingLabel: fitting.label,
    standard: fitting.standard,
  };
}
// ─── Component ────────────────────────────────────────────────────────────────
export default function UnequalFittingsPage() {
  const fittingKeys = UNEQUAL_FITTING_KEYS;
  const [selectedFitting, setSelectedFitting] = useState(
    fittingKeys[0] ?? ""
  );
  const [selectedNPS, setSelectedNPS] = useState("4");
  const [selectedSch, setSelectedSch] =
    useState<ScheduleKey>("STD");
  const [result, setResult] = useState<LookupResult | null>(null);
  const [noData, setNoData] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const npsKeys = Object.keys(
    UNEQUAL_FITTINGS_DB[selectedFitting]?.sizes ?? {}
  ).sort((a, b) => parseFloat(a) - parseFloat(b));
  const schedules = availableSchedules(selectedFitting, selectedNPS);
  // When fitting changes, reset NPS selection
  useEffect(() => {
    const first = Object.keys(
      UNEQUAL_FITTINGS_DB[selectedFitting]?.sizes ?? {}
    ).sort((a, b) => parseFloat(a) - parseFloat(b))[0] ?? "4";
    setSelectedNPS(first);
    setResult(null);
    setNoData(false);
  }, [selectedFitting]);
  // When NPS changes, reset schedule to first available
  useEffect(() => {
    const first =
      availableSchedules(selectedFitting, selectedNPS)[0] ?? "STD";
    setSelectedSch(first);
    setResult(null);
    setNoData(false);
  }, [selectedNPS, selectedFitting]);
  useEffect(() => {
    setResult(null);
    setNoData(false);
  }, [selectedSch]);
  function runQuery() {
    const data = runLookup(
      selectedFitting,
      selectedNPS,
      selectedSch
    );
    const valid =
      data &&
      (
        data.mainWallThickness_mm != null ||
        data.branchWallThickness_mm != null ||
        data.weight_kg != null
      );
    if (!valid) {
      setResult(null);
      setNoData(true);
      return;
    }
    setResult(data);
    setNoData(false);
    setHistory(prev => {
      const filtered = prev.filter(
        h =>
          !(
            h.fittingKey === selectedFitting &&
            h.npsKey === selectedNPS &&
            h.schedule === selectedSch
          )
      );
      return [
        {
          fittingKey: selectedFitting,
          npsKey: selectedNPS,
          schedule: selectedSch,
        },
        ...filtered,
      ].slice(0, 5);
    });
  }
  function restoreFromHistory(entry: HistoryEntry) {
    setSelectedFitting(entry.fittingKey);
    setSelectedNPS(entry.npsKey);
    setSelectedSch(entry.schedule);
    const data = runLookup(
      entry.fittingKey,
      entry.npsKey,
      entry.schedule
    );
    const valid =
      data &&
      (
        data.mainWallThickness_mm != null ||
        data.branchWallThickness_mm != null ||
        data.weight_kg != null
      );
    setResult(valid ? data : null);
    setNoData(!valid);
  }
  const currentFitting = UNEQUAL_FITTINGS_DB[selectedFitting];
  const currentSize = currentFitting?.sizes[selectedNPS];
  return (
    <div className="min-h-screen bg-slate-900 relative">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-no-repeat"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1660446718081-d2ac1e7985ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxwZXRyb2NoZW1pY2FsJTIwcmVmaW5lcnklMjB0d2lsaWdodCUyMHBpcGVzJTIwdG93ZXJzfGVufDF8fHx8MTc3NjcwNzE3NHww&ixlib=rb-4.1.0&q=80&w=1080)',
          backgroundPosition: 'center 70%',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/80 to-slate-900/95"></div>
      </div>
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-white/10 bg-slate-900/50 backdrop-blur-md">
          <div className="mx-auto max-w-7xl px-6 py-6">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="flex size-12 items-center justify-center rounded-lg bg-blue-500/20 ring-1 ring-blue-400/30">
                  <svg
                    className="size-7 text-blue-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h1 className="text-white group-hover:text-blue-300 transition-colors">
                    SpecRef
                  </h1>
                  <p className="text-sm text-slate-300">
                    For Quantity Surveyors & Estimators
                  </p>
                </div>
              </Link>
              <nav className="flex items-center gap-2 text-sm text-slate-400">
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
                <span>/</span>
                <span className="text-amber-300">Unequal Pipe Fittings</span>
              </nav>
            </div>
          </div>
        </header>
        {/* Page Title */}
        <section className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex items-center gap-4 mb-2">
            <div className="flex size-14 items-center justify-center rounded-xl bg-amber-950/50 ring-1 ring-amber-400/30">
              <svg className="size-9" viewBox="0 0 64 64" fill="none" strokeWidth="1.5">
                <path d="M 12 38 L 26 38 Q 38 38 38 26 L 38 12" stroke="#fbbf24" fill="none" />
                <path d="M 12 32 L 26 32 Q 32 32 32 26 L 32 12" stroke="#fbbf24" fill="none" />
                <line x1="12" y1="35" x2="24" y2="35" stroke="#fbbf24" strokeDasharray="2 2" opacity="0.4" />
                <line x1="35" y1="12" x2="35" y2="24" stroke="#fbbf24" strokeDasharray="2 2" opacity="0.4" />
                <circle cx="26" cy="26" r="1.5" fill="#fbbf24" />
              </svg>
            </div>
            <div>
              <h2 className="text-3xl text-white">Unequal Pipe Fittings</h2>
              <p className="text-slate-300">
                ASME B16.9 1993 — Factory-Made Wrought Buttwelding Fittings
              </p>
            </div>
          </div>
        </section>
        {/* Main Content */}
        <section className="mx-auto max-w-7xl px-6 pb-24 grid gap-6 lg:grid-cols-3">
          {/* Left */}
          <div className="lg:col-span-1 space-y-4">
            {/* Filter Card */}
            <div className="rounded-2xl border border-white/10 bg-slate-800/40 backdrop-blur-md p-6">
              <h3 className="text-white mb-5">Select Parameters</h3>
              <div className="space-y-4">
                {/* Fitting Type */}
                <div>
                  <label className="block text-xs text-slate-400 mb-1 uppercase tracking-wider">
                    Fitting Type
                  </label>
                  <select
                    value={selectedFitting}
                    onChange={e => setSelectedFitting(e.target.value)}
                    className="w-full rounded-lg bg-slate-700/60 border border-white/10 text-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-amber-400/50"
                  >
                    {fittingKeys.map(k => (
                      <option key={k} value={k}>
                        {UNEQUAL_FITTINGS_DB[k].label}
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
                    className="w-full rounded-lg bg-slate-700/60 border border-white/10 text-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-amber-400/50"
                  >
                    {npsKeys.map(k => (
                      <option key={k} value={k}>
                        NPS {UNEQUAL_FITTINGS_DB[selectedFitting].sizes[k].nps}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Schedule */}
                <div>
                  <label className="block text-xs text-slate-400 mb-1 uppercase tracking-wider">
                    Schedule / Wall
                  </label>
                  <select
                    value={selectedSch}
                    onChange={e =>
                      setSelectedSch(e.target.value as ScheduleKey)
                    }
                    disabled={schedules.length === 0}
                    className="w-full rounded-lg bg-slate-700/60 border border-white/10 text-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-amber-400/50 disabled:opacity-40"
                  >
                    {schedules.map(s => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={runQuery}
                  disabled={schedules.length === 0}
                  className="w-full rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-white font-medium py-2.5 text-sm transition-colors"
                >
                  Get Data
                </button>
              </div>
            </div>
            {/* Info Card */}
            <div className="rounded-2xl border border-white/10 bg-slate-800/40 backdrop-blur-md p-6">
              <h3 className="text-white mb-3 text-sm uppercase tracking-wider">
                Fitting Info
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Standard</span>
                  <span className="text-white">{currentFitting?.standard}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Type</span>
                  <span className="text-white">{currentFitting?.label}</span>
                </div>
                {currentSize && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-slate-400">O.D.</span>
                      <span className="text-white">
                        {currentSize.od_mm} mm
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Schedules</span>
                      <span className="text-amber-300">
                        {schedules.length} available
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
            {/* History */}
            {history.length > 0 && (
              <div className="rounded-2xl border border-white/10 bg-slate-800/40 backdrop-blur-md p-6">
                <h3 className="text-white mb-3 text-sm uppercase tracking-wider">
                  Recent Queries
                </h3>
                <ul className="space-y-2">
                  {history.map((h, i) => (
                    <li key={i}>
                      <button
                        onClick={() => restoreFromHistory(h)}
                        className="w-full text-left text-sm text-slate-300 hover:text-amber-300 transition-colors py-1"
                      >
                        {UNEQUAL_FITTINGS_DB[h.fittingKey]?.label} · NPS {UNEQUAL_FITTINGS_DB[h.fittingKey]?.sizes[h.npsKey]?.nps} · {h.schedule}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {/* Right */}
          <div className="lg:col-span-2">
            {!result && !noData && (
              <div className="rounded-2xl border border-white/10 bg-slate-800/25 backdrop-blur-md p-12 flex flex-col items-center justify-center text-center min-h-64">
                <div className="size-16 rounded-full bg-amber-500/10 ring-1 ring-amber-400/20 flex items-center justify-center mb-4">
                  <svg
                    className="size-8 text-amber-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <p className="text-slate-300 mb-1">
                  Select parameters and click
                  <span className="text-amber-300"> Get Data</span>
                </p>
                <p className="text-slate-500 text-sm">
                  Results will appear here
                </p>
              </div>
            )}
            {/* No Data */}
            {noData && (
              <div className="rounded-2xl border border-amber-400/20 bg-amber-500/5 backdrop-blur-md p-8 flex items-center gap-4">
                <div className="size-10 rounded-full bg-amber-500/10 ring-1 ring-amber-400/30 flex items-center justify-center shrink-0">
                  <svg
                    className="size-5 text-amber-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-amber-300 font-medium">
                    No data for this combination
                  </p>
                  <p className="text-slate-400 text-sm mt-0.5">
                    This fitting type / NPS / schedule combination is not tabulated in the standard.
                  </p>
                </div>
              </div>
            )}
            {/* Results */}
            {result && (
              <div className="space-y-4">
                {/* Header */}
                <div className="rounded-2xl border border-amber-400/20 bg-amber-500/5 backdrop-blur-md p-6">
                  <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
                    <h3 className="text-white">
                      NPS {result.nps}
                      <span className="text-slate-400 text-base ml-2">
                        — {result.fittingLabel}
                      </span>
                    </h3>
                    <div className="flex gap-2 flex-wrap">
                      <span className="text-xs text-amber-300 bg-amber-500/10 border border-amber-400/20 rounded-full px-3 py-1">
                        {result.schedule}
                      </span>
                      <span className="text-xs text-slate-300 bg-slate-500/10 border border-slate-400/20 rounded-full px-3 py-1">
                        {result.standard}
                      </span>
                    </div>
                  </div>
                </div>
                {/* Data Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {/* OD */}
                  <div className="rounded-xl border border-white/10 bg-slate-800/40 backdrop-blur-md p-5">
                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">
                      Outside Diameter
                    </p>
                    <p className="text-2xl text-white font-light">
                      {result.od_mm} mm
                    </p>
                    <p className="text-sm text-slate-400 mt-1">
                      {(result.od_mm / 25.4).toFixed(3)}"
                    </p>
                  </div>
                  {/* Through Length */}
                  <div className="rounded-xl border border-white/10 bg-slate-800/40 backdrop-blur-md p-5">
                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">
                      Through Length
                    </p>
                    <p className="text-2xl text-white font-light">
                      {result.length_mm} mm
                    </p>
                    <p className="text-sm text-slate-400 mt-1">
                      {(result.length_mm / 25.4).toFixed(3)}"
                    </p>
                  </div>
                  {/* Main WT */}
                  <div className="rounded-xl border border-white/10 bg-slate-800/40 backdrop-blur-md p-5">
                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">
                      Main Wall Thickness
                    </p>
                    <p className="text-2xl text-white font-light">
                      {result.mainWallThickness_mm != null
                        ? `${result.mainWallThickness_mm} mm`
                        : "—"}
                    </p>
                    <p className="text-sm text-slate-400 mt-1">
                      {result.mainWallThickness_mm != null
                        ? `${(
                            result.mainWallThickness_mm / 25.4
                          ).toFixed(4)}"`
                        : "Not tabulated"}
                    </p>
                  </div>
                  {/* Branch WT */}
                  <div className="rounded-xl border border-white/10 bg-slate-800/40 backdrop-blur-md p-5">
                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">
                      Branch Wall Thickness
                    </p>
                    <p className="text-2xl text-white font-light">
                      {result.branchWallThickness_mm != null
                        ? `${result.branchWallThickness_mm} mm`
                        : "—"}
                    </p>
                    <p className="text-sm text-slate-400 mt-1">
                      {result.branchWallThickness_mm != null
                        ? `${(
                            result.branchWallThickness_mm / 25.4
                          ).toFixed(4)}"`
                        : "Not tabulated"}
                    </p>
                  </div>
                  {/* Weight */}
                  <div className="rounded-xl border border-amber-400/10 bg-amber-500/5 backdrop-blur-md p-5 col-span-2">
                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">
                      Approx. Weight
                    </p>
                    <p className="text-3xl text-amber-300 font-light">
                      {result.weight_kg != null
                        ? `${result.weight_kg} kg`
                        : "—"}
                    </p>
                    <p className="text-sm text-slate-400 mt-1">
                      {result.weight_kg != null
                        ? `${(result.weight_kg * 2.20462).toFixed(2)} lb`
                        : "Not tabulated"}
                    </p>
                  </div>
                </div>
                {/* Disclaimer */}
                <div className="rounded-xl border border-white/5 bg-slate-800/20 px-5 py-3">
                  <p className="text-xs text-slate-500">
                    ⚠ Reference only — ASME B16.9. Weights are approximate.
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
              <p className="text-sm text-slate-400">
                SpecRef © {new Date().getFullYear()}
              </p>
              <p className="text-sm text-slate-400">
                Professional Engineering Data
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}