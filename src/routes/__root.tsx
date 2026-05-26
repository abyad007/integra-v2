import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import motionCss from "../styles/motion.css?url";
import faviconSvg from "@/assets/favicon.svg?url";
import appleTouchIcon from "@/assets/apple-touch-icon.svg?url";
import ogImage from "@/assets/og-integra.webp?url";
import { useEffect } from "react";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CookieBanner } from "@/components/site/CookieBanner";
import { MagneticCursor } from "@/components/site/MagneticCursor";
import { ArrowRight, AlertTriangle } from "lucide-react";
import { initAnalytics } from "@/lib/analytics";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground antialiased">
      <Header />
      <main className="flex-1 flex items-center justify-center px-5 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-[0.25] pointer-events-none [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)]" />
        <div className="max-w-md text-center relative z-10">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-emerald mb-4 block">Erreur 404</span>
          <h1 className="font-display text-6xl sm:text-7xl tracking-tight text-foreground mb-4 leading-none">Page<br/><span className="text-gradient-emerald">introuvable.</span></h1>
          <p className="text-muted-foreground text-base sm:text-lg mb-8 leading-relaxed">
            Il semble que la page que vous cherchez n'existe plus ou a été déplacée.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-soft hover:shadow-premium hover:-translate-y-0.5 transition-all"
          >
            Retour à l'accueil
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground antialiased">
      <Header />
      <main className="flex-1 flex items-center justify-center px-5 py-20 relative overflow-hidden">
        <div className="max-w-md text-center relative z-10">
          <div className="grid h-16 w-16 mx-auto place-items-center rounded-full bg-destructive/10 text-destructive mb-6">
            <AlertTriangle className="h-8 w-8" />
          </div>
          <h1 className="font-display text-4xl tracking-tight text-foreground mb-4">Erreur inattendue</h1>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Un problème technique est survenu. Notre équipe a été notifiée.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button onClick={() => { router.invalidate(); reset(); }} className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-soft hover:shadow-premium transition-all">
              Réessayer
            </button>
            <Link to="/" className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-sm font-medium hover:bg-accent transition-all">
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#0A2C4A" },
      { title: "Integra CC — Courtier en assurance" },
      { name: "description", content: "Integra CC : Courtier en assurance indépendant pour auto, moto, habitation, santé. Devis gratuit en 2 minutes." },
      { name: "author", content: "Integra CC" },
      { property: "og:site_name", content: "Integra CC" },
      { property: "og:title", content: "Integra CC — La protection juste, au juste prix." },
      { property: "og:description", content: "40+ assureurs comparés. Devis gratuit en 2 minutes." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://integracc.fr" },
      { property: "og:locale", content: "fr_FR" },
      { property: "og:image", content: ogImage },
      { property: "og:image:width", content: "2752" },
      { property: "og:image:height", content: "1536" },
      { property: "og:image:alt", content: "Integra Assurance — La protection juste, au juste prix." },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@IntegraCC" },
      { name: "twitter:title", content: "Integra CC — La protection juste, au juste prix." },
      { name: "twitter:description", content: "40+ assureurs comparés. Devis gratuit en 2 minutes." },
      { name: "twitter:image", content: ogImage },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: faviconSvg },
      { rel: "apple-touch-icon", href: appleTouchIcon },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "stylesheet",
        href: motionCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  // Consent-gated analytics — no-op until VITE_PLAUSIBLE_DOMAIN is set
  useEffect(() => {
    initAnalytics();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SmoothScroll />
      <MagneticCursor />
      <Outlet />
      <CookieBanner />
    </QueryClientProvider>
  );
}
