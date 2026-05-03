import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SPECREF_DB } from "../../data/pipingData";

type Result = {
  nps: string;
  od_mm: number;
  wallThickness_mm: number;
  id_mm: number;
  weight_kg_per_m: number;
} | null;

type HistoryEntry = { std: string; size: string; sch: string };

export default function PipingPage() {
  const standards = Object.keys(SPECREF_DB.pipe.standards);
  const [selectedStd, setSelectedStd] = useState(standards[0]);
  const [selectedSize, setSelectedSize] = useState("0.5");
  const [selectedSch, setSelectedSch] = useState("");
  const [result, setResult] = useState<Result>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [noData, setNoData] = useState(false);

  const availableSchedules = SPECREF_DB.pipe.standards[selectedStd]?.schedules ?? [];

  useEffect(() => {
    setSelectedSch(availableSchedules[0] ?? "");
    setResult(null);
    setNoData(false);
  }, [selectedStd]);

  useEffect(() => {
    setResult(null);
    setNoData(false);
  }, [selectedSize, selectedSch]);

  function runQuery() {
    const data = SPECREF_DB.pipe.calculate(selectedSize, selectedSch);
    if (!data) {
      setResult(null);
      setNoData(true);
    } else {
      setResult(data);
      setNoData(false);
      setHistory(prev => {
        const filtered = prev.filter(
          h => !(h.std === selectedStd && h.size === selectedSize && h.sch === selectedSch)
        );
        return [{ std: selectedStd, size: selectedSize, sch: selectedSch }, ...filtered].slice(0, 5);
      });
    }
  }

  function restoreFromHistory(entry: HistoryEntry) {
    setSelectedStd(entry.std);
    setSelectedSize(entry.size);
    setSelectedSch(entry.sch);
    const data = SPECREF_DB.pipe.calculate(entry.size, entry.sch);
    setResult(data);
    setNoData(!data);
  }

  const stdInfo = SPECREF_DB.pipe.standards[selectedStd];

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
              <Link to="/" className="flex items-center gap-3 group">
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
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
                <span>/</span>
                <span className="text-blue-300">Piping</span>
              </nav>
            </div>
          </div>
        </header>

        {/* Page Title */}
        <section className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex items-center gap-4 mb-2">
            <div className="flex size-14 items-center justify-center rounded-xl bg-blue-950/50 ring-1 ring-blue-400/30">
              <svg className="size-9" viewBox="0 0 64 64" fill="none" strokeWidth="1.5">
                <rect x="12" y="26" width="40" height="12" stroke="#60a5fa" fill="none" />
                <line x1="12" y1="29" x2="52" y2="29" stroke="#60a5fa" strokeDasharray="2 2" opacity="0.5" />
                <line x1="12" y1="35" x2="52" y2="35" stroke="#60a5fa" strokeDasharray="2 2" opacity="0.5" />
                <circle cx="20" cy="32" r="1.5" fill="#60a5fa" />
                <circle cx="32" cy="32" r="1.5" fill="#60a5fa" />
                <circle cx="44" cy="32" r="1.5" fill="#60a5fa" />
              </svg>
            </div>
            <div>
              <h2 className="text-3xl text-white">Piping</h2>
              <p className="text-slate-300">ASME B36.10M · ASME B36.19M</p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="mx-auto max-w-7xl px-6 pb-24 grid gap-6 lg:grid-cols-3">

          {/* Left: Controls */}
          <div className="lg:col-span-1 space-y-4">

            {/* Filter Card */}
            <div className="rounded-2xl border border-white/10 bg-slate-800/40 backdrop-blur-md p-6">
              <h3 className="text-white mb-5">Select Parameters</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1 uppercase tracking-wider">Standard</label>
                  <select
                    value={selectedStd}
                    onChange={e => setSelectedStd(e.target.value)}
                    className="w-full rounded-lg bg-slate-700/60 border border-white/10 text-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400/50"
                  >
                    {standards.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1 uppercase tracking-wider">Size (NPS)</label>
                  <select
                    value={selectedSize}
                    onChange={e => setSelectedSize(e.target.value)}
                    className="w-full rounded-lg bg-slate-700/60 border border-white/10 text-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400/50"
                  >
                    {Object.entries(SPECREF_DB.pipe.sizes).map(([key, val]) => (
                      <option key={key} value={key}>NPS {val.nps}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1 uppercase tracking-wider">Schedule</label>
                  <select
                    value={selectedSch}
                    onChange={e => setSelectedSch(e.target.value)}
                    className="w-full rounded-lg bg-slate-700/60 border border-white/10 text-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400/50"
                  >
                    {availableSchedules.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={runQuery}
                  className="w-full rounded-lg bg-blue-500 hover:bg-blue-400 text-white font-medium py-2.5 text-sm transition-colors"
                >
                  Get Data
                </button>
              </div>
            </div>

            {/* Standard Info Card */}
            <div className="rounded-2xl border border-white/10 bg-slate-800/40 backdrop-blur-md p-6">
              <h3 className="text-white mb-3 text-sm uppercase tracking-wider">Standard Info</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Standard</span>
                  <span className="text-white">{selectedStd}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Material</span>
                  <span className="text-white">{stdInfo?.material}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Schedules</span>
                  <span className="text-blue-300">{availableSchedules.length} available</span>
                </div>
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
                        className="w-full text-left text-sm text-slate-300 hover:text-blue-300 transition-colors py-1"
                      >
                        {h.std} · NPS {SPECREF_DB.pipe.sizes[h.size]?.nps} · Sch {h.sch}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right: Results */}
          <div className="lg:col-span-2">
            {!result && !noData && (
              <div className="rounded-2xl border border-white/10 bg-slate-800/25 backdrop-blur-md p-12 flex flex-col items-center justify-center text-center min-h-64">
                <div className="size-16 rounded-full bg-blue-500/10 ring-1 ring-blue-400/20 flex items-center justify-center mb-4">
                  <svg className="size-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-slate-300 mb-1">Select parameters and click <span className="text-blue-300">Get Data</span></p>
                <p className="text-slate-500 text-sm">Results will appear here</p>
              </div>
            )}

            {noData && (
              <div className="rounded-2xl border border-amber-400/20 bg-amber-500/5 backdrop-blur-md p-8 flex items-center gap-4">
                <div className="size-10 rounded-full bg-amber-500/10 ring-1 ring-amber-400/30 flex items-center justify-center shrink-0">
                  <svg className="size-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-amber-300 font-medium">No data for this combination</p>
                  <p className="text-slate-400 text-sm mt-0.5">This NPS / schedule combination is not tabulated in the standard.</p>
                </div>
              </div>
            )}

            {result && (
              <div className="space-y-4">
                {/* Result Header */}
                <div className="rounded-2xl border border-blue-400/20 bg-blue-500/5 backdrop-blur-md p-6">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-white">NPS {result.nps} — Schedule {selectedSch}</h3>
                    <span className="text-xs text-blue-300 bg-blue-500/10 border border-blue-400/20 rounded-full px-3 py-1">{selectedStd}</span>
                  </div>
                  <p className="text-slate-400 text-sm">{stdInfo?.material}</p>
                </div>

                {/* Data Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Outside Diameter", value: `${result.od_mm} mm`, sub: `${(result.od_mm / 25.4).toFixed(3)}"` },
                    { label: "Wall Thickness", value: `${result.wallThickness_mm} mm`, sub: `${(result.wallThickness_mm / 25.4).toFixed(3)}"` },
                    { label: "Inside Diameter", value: `${result.id_mm} mm`, sub: `${(result.id_mm / 25.4).toFixed(3)}"` },
                    { label: "Unit Weight", value: `${result.weight_kg_per_m} kg/m`, sub: `${(result.weight_kg_per_m * 0.6720).toFixed(2)} lb/ft` },
                  ].map(item => (
                    <div key={item.label} className="rounded-xl border border-white/10 bg-slate-800/40 backdrop-blur-md p-5">
                      <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">{item.label}</p>
                      <p className="text-2xl text-white font-light">{item.value}</p>
                      <p className="text-sm text-slate-400 mt-1">{item.sub}</p>
                    </div>
                  ))}
                </div>

                {/* Disclaimer */}
                <div className="rounded-xl border border-white/5 bg-slate-800/20 px-5 py-3">
                  <p className="text-xs text-slate-500">⚠ Reference only. Verify all data against official standards before use in design or procurement.</p>
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