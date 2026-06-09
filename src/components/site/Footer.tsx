/** Dispatches a CustomEvent the CookieBanner listens for, to re-open the banner */
function openCookieSettings() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem("integra_consent_v1");
  } catch {
    // Storage unavailable — ignore
  }
  window.location.reload();
}

export function Footer() {
  return (
    <footer className="bg-navy text-white relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.04] pointer-events-none bg-grid-dark"
      />
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-14 sm:py-16 lg:py-20 pb-28 lg:pb-20 relative">
        <div className="grid gap-10 sm:gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2 max-w-md">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 text-white">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z" />
                </svg>
              </span>
              <span className="font-display text-2xl font-medium tracking-[-0.02em]">Integra Assurance</span>
            </div>
            <p className="mt-5 text-sm text-white/60 leading-relaxed">
              Courtier indépendant ORIAS n° 25 002 890, supervisé par l'ACPR.
              Noté 4.8/5 sur Trustpilot.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="tel:+33187663942"
                className="inline-flex items-center rounded-full bg-emerald text-white px-5 py-2.5 text-sm font-semibold hover:bg-emerald/90 transition-colors"
              >
                01 87 66 39 42
              </a>
              <a
                href="https://wa.me/33755533466"
                className="inline-flex items-center rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium hover:bg-white/5 transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>

          <FooterCol
            title="Assurances"
            links={[
              ["Auto", "/service/assurance-auto/"],
              ["Moto", "/service/assurance-moto/"],
              ["Habitation", "/service/assurance-habitation/"],
              ["Santé", "/service/assurance-sante/"],
              ["Prévoyance", "/service/assurance-prevoyance/"],
              ["RC Pro & Décennale", "/service/assurance-pro/"],
              ["VTC", "/service/assurance-vtc/"],
            ]}
          />

          <FooterCol
            title="Société"
            links={[
              ["Blog", "/blog"],
              ["Calculateur bonus-malus", "/calculateur-bonus-malus/"],
              ["Code de la route", "/code-de-la-route/"],
              ["Mentions légales", "/mentions-legales/"],
              ["Politique de confidentialité", "/politique-de-confidentialite/"],
              ["Politique cookies", "/politique-cookies/"],
              ["CGU", "/conditions-generales/"],
            ]}
          />
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between text-xs text-white/45">
          <p>© {new Date().getFullYear()} Integra CC — Tous droits réservés.</p>
          <div className="flex items-center gap-4 flex-wrap">
            <button
              type="button"
              onClick={openCookieSettings}
              className="text-white/55 hover:text-white underline-offset-4 hover:underline transition-colors"
            >
              Gérer mes cookies
            </button>
            <span className="hidden md:inline opacity-30">·</span>
            <p>ORIAS n°25 002 890 · Lun–Sam 8h30 – 20h30</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h4 className="text-[11px] uppercase tracking-[0.16em] text-white/40 font-semibold">{title}</h4>
      <ul className="mt-5 space-y-2.5 text-sm">
        {links.map(([label, href]) => (
          <li key={label}>
            <a href={href} className="text-white/70 hover:text-white transition-colors">
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
