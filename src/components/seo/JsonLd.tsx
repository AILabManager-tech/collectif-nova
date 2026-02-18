interface JsonLdProps {
  data: Record<string, unknown>;
}

/**
 * Renders a JSON-LD structured data script tag for SEO.
 *
 * @component
 * @param {JsonLdProps} props - The structured data object to serialize.
 * @example
 * <JsonLd data={localBusinessSchema} />
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  additionalType: "CreativeAgency",
  name: "Collectif Nova",
  description:
    "Agence créative spécialisée en branding, design web, stratégie social media et motion design à Montréal.",
  url: "https://collectif-nova.vercel.app",
  telephone: "(514) 555-0300",
  email: "hello@collectif-nova.ca",
  address: {
    "@type": "PostalAddress",
    streetAddress: "4020, rue Saint-Ambroise, bureau 350",
    addressLocality: "Montréal",
    addressRegion: "QC",
    postalCode: "H4C 2C7",
    addressCountry: "CA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 45.4731,
    longitude: -73.5835,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  areaServed: {
    "@type": "City",
    name: "Montréal",
  },
  priceRange: "$$$",
  serviceType: [
    "Branding",
    "Web Design",
    "Social Media Strategy",
    "Motion Design",
  ],
  knowsLanguage: ["fr", "en"],
};

export function buildServiceSchema(locale: string) {
  const isFr = locale === "fr";
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    provider: {
      "@type": "ProfessionalService",
      name: "Collectif Nova",
      url: "https://collectif-nova.vercel.app",
    },
    serviceType: isFr ? "Services créatifs" : "Creative Services",
    areaServed: {
      "@type": "City",
      name: "Montréal, Québec, Canada",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: isFr ? "Services créatifs" : "Creative Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: isFr ? "Branding & Identité" : "Branding & Identity",
            description: isFr
              ? "Création de marques distinctives : logo, univers visuel, guidelines et positionnement stratégique."
              : "Distinctive brand creation: logo, visual universe, guidelines and strategic positioning.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: isFr
              ? "Design & Développement Web"
              : "Web Design & Development",
            description: isFr
              ? "Sites web sur mesure, rapides et accessibles. Du design UX/UI au développement front-end."
              : "Custom websites, fast and accessible. From UX/UI design to front-end development.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: isFr
              ? "Stratégie Social Media"
              : "Social Media Strategy",
            description: isFr
              ? "Planification de contenu, gestion de communauté et campagnes ciblées pour une présence sociale engageante."
              : "Content planning, community management and targeted campaigns for an engaging social presence.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: isFr ? "Motion Design & Vidéo" : "Motion Design & Video",
            description: isFr
              ? "Animations, vidéos promotionnelles et contenu visuel dynamique qui capte l'attention."
              : "Animations, promotional videos and dynamic visual content that capture attention.",
          },
        },
      ],
    },
  };
}

export function buildFaqSchema(
  items: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
