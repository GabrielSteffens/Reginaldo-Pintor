import { businessConfig, type BusinessHours } from "../config/business";

// schema.org's dayOfWeek expects "Monday".."Sunday" (or their full URLs),
// not the Portuguese abbreviations businessHours.day uses for the on-page
// display — this maps one to the other so the JSON-LD stays valid.
const DAY_MAP: Record<BusinessHours["day"], string> = {
  Seg: "Monday",
  Ter: "Tuesday",
  Qua: "Wednesday",
  Qui: "Thursday",
  Sex: "Friday",
  Sáb: "Saturday",
  Dom: "Sunday",
};

/**
 * Builds LocalBusiness/HomeAndConstructionBusiness JSON-LD entirely from
 * businessConfig. Fabricated structured data is worse than none — it's a
 * machine-readable claim, not just page copy a visitor might discount — so
 * every field here is omitted (not null-filled) when unconfirmed. See
 * docs §20.
 */
export function buildLocalBusinessJsonLd(siteUrl: string) {
  const { businessName, phone, address, city, neighborhoods, businessHours } =
    businessConfig;

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: businessName,
    url: siteUrl,
  };

  if (phone) jsonLd.telephone = phone;

  if (neighborhoods.length > 0) {
    jsonLd.areaServed = neighborhoods;
  } else if (city) {
    jsonLd.areaServed = city;
  }

  if (address.showPublicly && (address.street || city)) {
    jsonLd.address = {
      "@type": "PostalAddress",
      streetAddress: [address.street, address.number].filter(Boolean).join(", ") || undefined,
      addressLocality: address.city ?? city ?? undefined,
      addressRegion: address.state ?? undefined,
      postalCode: address.postalCode ?? undefined,
      addressCountry: "BR",
    };
  }

  if (businessHours && businessHours.length > 0) {
    jsonLd.openingHoursSpecification = businessHours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: DAY_MAP[h.day],
      opens: h.opens,
      closes: h.closes,
    }));
  }

  return jsonLd;
}
