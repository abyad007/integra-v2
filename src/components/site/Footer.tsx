/** Dispatches a CustomEvent the CookieBanner listens for, to re-open the banner */
function openCookieSettings() {
  if (typeof window === "undefined") return;
  // Clear stored consent so the banner shows again
  try {
    localStorage.removeItem("integra_consent_v1");
  } catch {
    // Storage unavailable — ignore
  }
  // Hard reload simplest way to re-show the banner with current state
  window.location.reload();
}

export function Footer() {
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-14 sm:py-16 lg:py-20 pb-28 lg:pb-20">
        <div className="grid gap-10 sm:gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2 max-w-md">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-cream text-primary">
                <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z" />
                </svg>
              </span>
              <span className="font-display text-2xl">Integra Assurance</span>
            </div>
            <p className="mt-5 text-sm text-primary-foreground/70 leading-relaxed">
              Courtier en assurance indépendant inscrit à l'ORIAS sous le n° 25 002 890.
              Sous la supervision de l'ACPR. Noté 4.8/5 sur Trustpilot.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="tel:+33187663942" className="inline-flex items-center rounded-full bg-cream text-primary px-5 py-2.5 text-sm font-medium hover:opacity-90">
                01 87 66 39 42
              </a>
              <a href="https://wa.me/33755533466" className="inline-flex items-center rounded-full border border-primary-foreground/30 px-5 py-2.5 text-sm font-medium hover:bg-primary-foreground/10">
                WhatsApp
              </a>
            </div>
          </div>

          <FooterCol title="Assurances" links={[
            ["Auto", "/service/assurance-auto/"],
            ["Moto", "/service/assurance-moto/"],
            ["Habitation", "/service/assurance-habitation/"],
            ["Santé", "/service/assurance-sante/"],
            ["Prévoyance", "/service/assurance-prevoyance/"],
            ["RC Pro & Décennale", "/service/assurance-pro/"],
            ["VTC", "/service/assurance-vtc/"],
          ]} />

          <FooterCol title="Société" links={[
            ["Blog", "/blog"],
            ["Calculateur bonus-malus", "/calculateur-bonus-malus/"],
            ["Code de la route", "/code-de-la-route/"],
            ["Mentions légales", "/mentions-legales/"],
            ["Politique de confidentialité", "/politique-de-confidentialite/"],
            ["Politique cookies", "/politique-cookies/"],
            ["CGU", "/conditions-generales/"],
          ]} />
        </div>

        <div className="mt-14 pt-8 border-t border-primary-foreground/15 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between text-xs text-primary-foreground/60">
          <p>© {new Date().getFullYear()} Integra CC — Tous droits réservés.</p>
          <div className="flex items-center gap-4 flex-wrap">
            <button
              type="button"
              onClick={openCookieSettings}
              className="text-primary-foreground/70 hover:text-primary-foreground underline-offset-4 hover:underline transition-colors"
            >
              Gérer mes cookies
            </button>
            <span className="hidden md:inline opacity-40">·</span>
            <p>ORIAS n°25 002 890 · ACPR · Lun–Sam 8h30 – 20h30</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h4 className="text-xs uppercase tracking-[0.18em] text-primary-foreground/60">{title}</h4>
      <ul className="mt-5 space-y-3 text-sm">
        {links.map(([label, href]) => (
          <li key={label}>
            <a href={href} className="text-primary-foreground/85 hover:text-primary-foreground">
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
