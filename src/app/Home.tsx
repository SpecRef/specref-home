import { Link } from "react-router-dom";

const cards = [
  {
    to: "/piping",
    accent: "blue",
    title: "Piping",
    description: "Specifications, dimensions, and material grades for industrial piping systems.",
    icon: (
      <svg className="size-9" viewBox="0 0 64 64" fill="none" strokeWidth="1.5">
        <rect x="12" y="26" width="40" height="12" stroke="#60a5fa" fill="none" />
        <line x1="12" y1="29" x2="52" y2="29" stroke="#60a5fa" strokeDasharray="2 2" opacity="0.5" />
        <line x1="12" y1="35" x2="52" y2="35" stroke="#60a5fa" strokeDasharray="2 2" opacity="0.5" />
        <line x1="12" y1="32" x2="52" y2="32" stroke="#60a5fa" opacity="0.3" />
        <circle cx="20" cy="32" r="1.5" fill="#60a5fa" />
        <circle cx="32" cy="32" r="1.5" fill="#60a5fa" />
        <circle cx="44" cy="32" r="1.5" fill="#60a5fa" />
        <text x="32" y="22" fill="#60a5fa" fontSize="4" textAnchor="middle" opacity="0.6">NPS</text>
      </svg>
    ),
    iconBg: "bg-blue-950/50 ring-blue-400/30",
    glowBg: "bg-blue-500/10",
    cardHover: "hover:border-blue-400/30",
    linkColor: "text-blue-400",
  },
  {
    to: "/pipe-fittings",
    accent: "amber",
    title: "Pipe Fittings",
    description: "Complete catalog of fittings, reducers, elbows, and connection components.",
    icon: (
      <svg className="size-9" viewBox="0 0 64 64" fill="none" strokeWidth="1.5">
        <path d="M 12 38 L 26 38 Q 38 38 38 26 L 38 12" stroke="#fbbf24" fill="none" />
        <path d="M 12 32 L 26 32 Q 32 32 32 26 L 32 12" stroke="#fbbf24" fill="none" />
        <line x1="12" y1="35" x2="24" y2="35" stroke="#fbbf24" strokeDasharray="2 2" opacity="0.4" />
        <line x1="35" y1="12" x2="35" y2="24" stroke="#fbbf24" strokeDasharray="2 2" opacity="0.4" />
        <circle cx="26" cy="26" r="1.5" fill="#fbbf24" />
        <circle cx="18" cy="35" r="1.5" fill="#fbbf24" />
        <circle cx="35" cy="18" r="1.5" fill="#fbbf24" />
        <text x="44" y="28" fill="#fbbf24" fontSize="4" textAnchor="start" opacity="0.6">90°</text>
      </svg>
    ),
    iconBg: "bg-amber-950/50 ring-amber-400/30",
    glowBg: "bg-amber-500/10",
    cardHover: "hover:border-amber-400/30",
    linkColor: "text-amber-400",
  },
  {
    to: "/structural-steel",
    accent: "slate",
    title: "Structural Steel",
    description: "Beam sections, columns, plates, and structural steel specifications.",
    icon: (
      <svg className="size-9" viewBox="0 0 64 64" fill="none" strokeWidth="1.5">
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
    ),
    iconBg: "bg-slate-950/50 ring-slate-400/30",
    glowBg: "bg-slate-500/10",
    cardHover: "hover:border-slate-400/30",
    linkColor: "text-slate-400",
  },
  {
    to: "/flanges",
    accent: "emerald",
    title: "Flanges",
    description: "ASME B16.5 & B16.47 flange dimensions, pressure classes, and facing types.",
    icon: (
      <svg className="size-9" viewBox="0 0 64 64" fill="none" strokeWidth="1.5">
        {/* Outer flange ring */}
        <circle cx="32" cy="32" r="18" stroke="#34d399" fill="none" />
        {/* Bolt holes */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          const x = 32 + 14 * Math.cos(rad);
          const y = 32 + 14 * Math.sin(rad);
          return <circle key={i} cx={x} cy={y} r="1.8" stroke="#34d399" fill="none" opacity="0.7" />;
        })}
        {/* Raised face */}
        <circle cx="32" cy="32" r="10" stroke="#34d399" fill="none" opacity="0.5" />
        {/* Bore */}
        <circle cx="32" cy="32" r="6" stroke="#34d399" fill="none" opacity="0.3" />
        <text x="32" y="58" fill="#34d399" fontSize="3.5" textAnchor="middle" opacity="0.6">RF</text>
      </svg>
    ),
    iconBg: "bg-emerald-950/50 ring-emerald-400/30",
    glowBg: "bg-emerald-500/10",
    cardHover: "hover:border-emerald-400/30",
    linkColor: "text-emerald-400",
  },
  {
    to: "/valves",
    accent: "rose",
    title: "Valves",
    description: "Gate, globe, check, ball and butterfly valve specifications and dimensions.",
    icon: (
      <svg className="size-9" viewBox="0 0 64 64" fill="none" strokeWidth="1.5">
        {/* Pipe stubs */}
        <rect x="8"  y="29" width="14" height="6" stroke="#fb7185" fill="none" />
        <rect x="42" y="29" width="14" height="6" stroke="#fb7185" fill="none" />
        {/* Valve body */}
        <path d="M22 24 L42 24 L42 40 L22 40 Z" stroke="#fb7185" fill="none" />
        {/* Gate / wedge */}
        <path d="M28 24 L36 24 L34 34 L30 34 Z" stroke="#fb7185" fill="none" opacity="0.6" />
        {/* Stem */}
        <line x1="32" y1="14" x2="32" y2="24" stroke="#fb7185" />
        {/* Handwheel */}
        <ellipse cx="32" cy="12" rx="7" ry="2.5" stroke="#fb7185" fill="none" opacity="0.7" />
        <line x1="25" y1="12" x2="39" y2="12" stroke="#fb7185" opacity="0.5" />
        <line x1="32" y1="9.5" x2="32" y2="14.5" stroke="#fb7185" opacity="0.5" />
      </svg>
    ),
    iconBg: "bg-rose-950/50 ring-rose-400/30",
    glowBg: "bg-rose-500/10",
    cardHover: "hover:border-rose-400/30",
    linkColor: "text-rose-400",
    comingSoon: true,
  },
];

export default function Home() {
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

        {/* Navigation Cards — 5 cards: 1 col → 2 col → 3 col → 5 col */}
        <section className="mx-auto max-w-7xl px-6 pb-24">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {cards.map((card) => {
              const inner = (
                <>
                  <div className={`absolute right-0 top-0 size-28 translate-x-8 -translate-y-8 rounded-full ${card.glowBg}`}></div>
                  <div className="relative">
                    <div className={`mb-4 flex size-14 items-center justify-center rounded-xl ring-1 ${card.iconBg}`}>
                      {card.icon}
                    </div>
                    <h3 className="mb-2 text-white text-base">{card.title}</h3>
                    {card.comingSoon && (
                      <span className="inline-block mb-2 text-xs rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-slate-400">
                        Coming soon
                      </span>
                    )}
                    <p className="mb-4 text-slate-300 text-sm leading-relaxed">{card.description}</p>
                    <div className={`flex items-center gap-2 text-sm ${card.linkColor}`}>
                      <span>{card.comingSoon ? "In progress" : "View Data"}</span>
                      {!card.comingSoon && (
                        <svg className="size-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                </>
              );

              const sharedClass = `group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-800/25 p-6 backdrop-blur-md shadow-xl transition-all ${card.cardHover}`;

              return card.comingSoon ? (
                <div key={card.to} className={`${sharedClass} opacity-60 cursor-default`}>
                  {inner}
                </div>
              ) : (
                <Link key={card.to} to={card.to} className={`${sharedClass} hover:bg-slate-800/60`}>
                  {inner}
                </Link>
              );
            })}
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
