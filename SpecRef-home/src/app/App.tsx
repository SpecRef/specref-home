export default function App() {
  return (
    <div className="min-h-screen bg-slate-900 relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1660446718081-d2ac1e7985ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxwZXRyb2NoZW1pY2FsJTIwcmVmaW5lcnklMjB0d2lsaWdodCUyMHBpcGVzJTIwdG93ZXJzfGVufDF8fHx8MTc3NjcwNzE3NHww&ixlib=rb-4.1.0&q=80&w=1080)',
          backgroundPosition: 'center 70%'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/80 to-slate-900/95"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-white/10 bg-slate-900/50 backdrop-blur-md">
          <div className="mx-auto max-w-7xl px-6 py-6">
            <div className="flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-lg bg-blue-500/20 ring-1 ring-blue-400/30">
                <svg className="size-7 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-white">SpecRef</h1>
                <p className="text-sm text-slate-300">For Quantity Surveyors & Estimators</p>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 mb-6 backdrop-blur-sm">
              <span className="size-2 rounded-full bg-blue-400"></span>
              <span className="text-sm text-blue-200">Technical Database</span>
            </div>
            <h2 className="mb-4 text-4xl text-white">Engineering Material Specifications</h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-300">
              Comprehensive technical data and specifications for industrial materials.
              Select a category below to access detailed information.
            </p>
          </div>
        </section>

        {/* Main Navigation Cards */}
        <section className="mx-auto max-w-7xl px-6 pb-24">
          <div className="grid gap-6 md:grid-cols-3">
            {/* Piping Card */}
            <a
              href="/piping"
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-800/25 p-8 backdrop-blur-md shadow-xl transition-all hover:bg-slate-800/60 hover:border-blue-400/30"
            >
              <div className="absolute right-0 top-0 size-32 translate-x-8 -translate-y-8 rounded-full bg-blue-500/10"></div>
              <div className="relative">
                <div className="mb-4 flex size-16 items-center justify-center rounded-xl bg-blue-950/50 ring-1 ring-blue-400/30">
                  <svg className="size-10" viewBox="0 0 64 64" fill="none" strokeWidth="1.5">
                    <rect x="12" y="26" width="40" height="12" stroke="#60a5fa" fill="none" />
                    <line x1="12" y1="29" x2="52" y2="29" stroke="#60a5fa" strokeDasharray="2 2" opacity="0.5" />
                    <line x1="12" y1="35" x2="52" y2="35" stroke="#60a5fa" strokeDasharray="2 2" opacity="0.5" />
                    <line x1="12" y1="32" x2="52" y2="32" stroke="#60a5fa" opacity="0.3" />
                    <circle cx="20" cy="32" r="1.5" fill="#60a5fa" />
                    <circle cx="32" cy="32" r="1.5" fill="#60a5fa" />
                    <circle cx="44" cy="32" r="1.5" fill="#60a5fa" />
                    <text x="32" y="22" fill="#60a5fa" fontSize="4" textAnchor="middle" opacity="0.6">NPS</text>
                  </svg>
                </div>
                <h3 className="mb-2 text-white">Piping</h3>
                <p className="mb-4 text-slate-300">
                  Specifications, dimensions, and material grades for industrial piping systems.
                </p>
                <div className="flex items-center gap-2 text-blue-400">
                  <span>View Data</span>
                  <svg className="size-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </a>

            {/* Pipe Fittings Card */}
            <a
              href="/pipe-fittings"
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-800/25 p-8 backdrop-blur-md shadow-xl transition-all hover:bg-slate-800/60 hover:border-amber-400/30"
            >
              <div className="absolute right-0 top-0 size-32 translate-x-8 -translate-y-8 rounded-full bg-amber-500/10"></div>
              <div className="relative">
                <div className="mb-4 flex size-16 items-center justify-center rounded-xl bg-amber-950/50 ring-1 ring-amber-400/30">
                  <svg className="size-10" viewBox="0 0 64 64" fill="none" strokeWidth="1.5">
                    <path d="M 12 38 L 26 38 Q 38 38 38 26 L 38 12" stroke="#fbbf24" fill="none" />
                    <path d="M 12 32 L 26 32 Q 32 32 32 26 L 32 12" stroke="#fbbf24" fill="none" />
                    <line x1="12" y1="35" x2="24" y2="35" stroke="#fbbf24" strokeDasharray="2 2" opacity="0.4" />
                    <line x1="35" y1="12" x2="35" y2="24" stroke="#fbbf24" strokeDasharray="2 2" opacity="0.4" />
                    <circle cx="26" cy="26" r="1.5" fill="#fbbf24" />
                    <circle cx="18" cy="35" r="1.5" fill="#fbbf24" />
                    <circle cx="35" cy="18" r="1.5" fill="#fbbf24" />
                    <text x="44" y="28" fill="#fbbf24" fontSize="4" textAnchor="start" opacity="0.6">90</text>
                  </svg>
                </div>
                <h3 className="mb-2 text-white">Pipe Fittings</h3>
                <p className="mb-4 text-slate-300">
                  Complete catalog of fittings, flanges, valves, and connection components.
                </p>
                <div className="flex items-center gap-2 text-amber-400">
                  <span>View Data</span>
                  <svg className="size-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </a>

            {/* Structural Steel Card */}
            <a
              href="/structural-steel"
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-800/25 p-8 backdrop-blur-md shadow-xl transition-all hover:bg-slate-800/60 hover:border-slate-400/30"
            >
              <div className="absolute right-0 top-0 size-32 translate-x-8 -translate-y-8 rounded-full bg-slate-500/10"></div>
              <div className="relative">
                <div className="mb-4 flex size-16 items-center justify-center rounded-xl bg-slate-950/50 ring-1 ring-slate-400/30">
                  <svg className="size-10" viewBox="0 0 64 64" fill="none" strokeWidth="1.5">
                    <rect x="20" y="14" width="24" height="4" stroke="#94a3b8" fill="none" />
                    <line x1="20" y1="16" x2="44" y2="16" stroke="#94a3b8" opacity="0.3" />
                    <rect x="30" y="18" width="4" height="28" stroke="#94a3b8" fill="none" />
                    <line x1="32" y1="18" x2="32" y2="46" stroke="#94a3b8" strokeDasharray="2 3" opacity="0.4" />
                    <rect x="20" y="46" width="24" height="4" stroke="#94a3b8" fill="none" />
                    <line x1="20" y1="48" x2="44" y2="48" stroke="#94a3b8" opacity="0.3" />
                    <circle cx="32" cy="16" r="1" fill="#94a3b8" />
                    <circle cx="32" cy="32" r="1" fill="#94a3b8" />
                    <circle cx="32" cy="48" r="1" fill="#94a3b8" />
                    <text x="48" y="34" fill="#94a3b8" fontSize="4" textAnchor="start" opacity="0.6">H</text>
                  </svg>
                </div>
                <h3 className="mb-2 text-white">Structural Steel</h3>
                <p className="mb-4 text-slate-300">
                  Beam sections, columns, plates, and structural steel specifications.
                </p>
                <div className="flex items-center gap-2 text-slate-400">
                  <span>View Data</span>
                  <svg className="size-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </a>
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
