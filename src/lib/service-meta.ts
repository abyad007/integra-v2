/**
 * Helper to build the TanStack Router `head()` for a service page,
 * including SEO meta + Schema.org Service JSON-LD.
 */
export function buildServiceHead(opts: {
  /** Canonical path slug, e.g. "/service/assurance-auto" */
  slug: string;
  /** <title> tag content */
  title: string;
  /** <meta name="description"> content */
  description: string;
  /** Schema.org Service name, e.g. "Assurance Auto" */
  name: string;
  /** Optional Schema.org Service category (e.g. "Vehicle insurance") */
  serviceType?: string;
}) {
  const url = `https://integracc.fr${opts.slug}`;

  return {
    meta: [
      { title: opts.title },
      { name: "description", content: opts.description },
      { property: "og:title", content: opts.title },
      { property: "og:description", content: opts.description },
      { property: "og:url", content: url },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: opts.name,
          description: opts.description,
          url,
          serviceType: opts.serviceType ?? "Insurance",
          provider: {
            "@type": "InsuranceAgency",
            name: "Integra CC",
            url: "https://integracc.fr",
            telephone: "+33187663942",
            address: {
              "@type": "PostalAddress",
              streetAddress: "60 Rue François 1er",
              addressLocality: "Paris",
              postalCode: "75008",
              addressCountry: "FR",
            },
            identifier: {
              "@type": "PropertyValue",
              propertyID: "ORIAS",
              value: "25002890",
            },
          },
          areaServed: { "@type": "Country", name: "France" },
        }),
      },
    ],
  };
}
