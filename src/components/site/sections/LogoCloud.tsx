import useEmblaCarousel from "embla-carousel-react";

/**
 * Partner logos — auto-discovered from src/assets/partners/*.svg.
 *
 * To add or replace a partner logo:
 *   1. Drop the official SVG into src/assets/partners/ (filename = slug, e.g. axa.svg)
 *   2. Add an entry below in PARTNERS with the matching slug and display name
 *   3. Vite picks it up at build time — no further code change needed
 *
 * When an SVG file is missing, the component falls back to a clean Plus Jakarta
 * Sans wordmark (no broken image, no legal risk).
 */

// Vite glob: import URLs of every SVG in src/assets/partners/ at build time.
const SVG_URLS = import.meta.glob("@/assets/partners/*.svg", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const logoUrlBySlug: Record<string, string | undefined> = {};
for (const [path, url] of Object.entries(SVG_URLS)) {
  const slug = path.split("/").pop()?.replace(/\.svg$/, "");
  if (slug) logoUrlBySlug[slug] = url;
}

const PARTNERS: Array<{ slug: string; name: string }> = [
  { slug: "allianz", name: "Allianz" },
  { slug: "axa", name: "AXA" },
  { slug: "generali", name: "Generali" },
  { slug: "april", name: "April" },
  { slug: "groupama", name: "Groupama" },
  { slug: "xenassur", name: "Xenassur" },
  { slug: "netvox", name: "Netvox" },
  { slug: "ami3f", name: "Ami 3F" },
  { slug: "plus-simple", name: "+Simple" },
];

export function LogoCloud() {
  const row = [...PARTNERS, ...PARTNERS]; // duplicate for seamless marquee loop
  const [emblaRef] = useEmblaCarousel({ loop: true, dragFree: true, align: "start" });

  return (
    <section className="border-y border-border bg-surface/70 relative overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-50" />
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-10 lg:py-14 grid lg:grid-cols-12 items-center gap-8 relative">
        <div className="lg:col-span-3 flex lg:flex-col items-center lg:items-start gap-4 lg:gap-3">
          <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-emerald">— Partenaires</span>
          <div className="flex items-baseline gap-3">
            <span className="font-display text-5xl lg:text-6xl tracking-[-0.04em] leading-none text-foreground tabular-nums">
              40+
            </span>
            <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground leading-tight max-w-[8rem]">
              compagnies
              <br />
              référencées
            </span>
          </div>
        </div>

        <div
          className="lg:col-span-9 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] lg:border-l lg:border-border/60 lg:pl-10"
          ref={emblaRef}
        >
          <div className="flex items-center gap-12 lg:gap-16 cursor-grab active:cursor-grabbing touch-pan-y">
            {row.map((p, i) => {
              const url = logoUrlBySlug[p.slug];
              return (
                <div
                  key={`${p.slug}-${i}`}
                  className="flex-[0_0_auto] inline-flex items-center gap-12 lg:gap-16 h-12 lg:h-14"
                  title={p.name}
                >
                  {url ? (
                    // Real SVG logo
                    <img
                      src={url}
                      alt={`${p.name} — partenaire Integra Assurance`}
                      loading="lazy"
                      decoding="async"
                      className="h-full max-w-[140px] lg:max-w-[180px] w-auto object-contain opacity-55 hover:opacity-95 transition-opacity duration-500 grayscale hover:grayscale-0"
                    />
                  ) : (
                    // Fallback wordmark
                    <span className="font-display text-2xl lg:text-[1.75rem] font-semibold text-foreground/35 hover:text-foreground/80 transition-colors duration-500 tracking-[-0.02em] select-none whitespace-nowrap">
                      {p.name}
                    </span>
                  )}
                  <span className="h-1 w-1 rounded-full bg-border flex-shrink-0" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
