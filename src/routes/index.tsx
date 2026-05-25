import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { MethodPinned } from "@/components/site/MethodPinned";
import { Hero } from "@/components/site/Hero";
import { LogoCloud } from "@/components/site/sections/LogoCloud";
import { Services } from "@/components/site/sections/Services";
import { Pillars } from "@/components/site/sections/Pillars";
import { Trust } from "@/components/site/sections/Trust";
import { FAQ } from "@/components/site/sections/FAQ";
import { CTA } from "@/components/site/sections/CTA";
import { LatestPosts } from "@/components/site/sections/LatestPosts";
import { fetchPosts } from "@/lib/wp-api";

export const Route = createFileRoute("/")({
  loader: async () => {
    // Best-effort fetch — if WP is down, render the home without latest posts
    try {
      const { posts } = await fetchPosts({ perPage: 3 });
      return { latestPosts: posts };
    } catch {
      return { latestPosts: [] };
    }
  },
  head: () => ({
    script: [{
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "InsuranceAgency",
        "name": "Integra CC",
        "url": "https://integracc.fr",
        "telephone": "+33187663942",
        "priceRange": "€",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "FR",
          "streetAddress": "60 Rue François 1er",
          "addressLocality": "Paris",
          "postalCode": "75008"
        },
        "description": "Courtier en assurance indépendant spécialisé dans les profils résiliés, malussés et professionnels. Nous comparons plus de 40 compagnies pour trouver la meilleure offre.",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://integracc.fr/devis?type={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      })
    }],
    meta: [
      { title: "Integra CC — Courtier auto, moto, habitation · Devis gratuit en 2 min" },
      {
        name: "description",
        content:
          "Courtier en assurance indépendant ORIAS n°25 002 890. 40+ assureurs comparés. Auto, moto, habitation, santé, RC Pro, décennale, VTC. Devis gratuit en 2 minutes.",
      },
      { property: "og:title", content: "Integra CC — La protection juste au juste prix" },
      { property: "og:description", content: "40+ assureurs comparés. Devis gratuit en 2 minutes. Réponse sous 24 h." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { latestPosts } = Route.useLoaderData();
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <ScrollProgress />
      <Header />
      <main className="pb-20 lg:pb-0">
        <Hero />
        <LogoCloud />
        <Services />
        <Pillars />
        <MethodPinned />
        <Trust />
        <LatestPosts posts={latestPosts} />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
