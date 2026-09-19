/**
 * Centralized business configuration.
 *
 * Every fact about the business used anywhere on the site (Header, Hero CTA,
 * Contact, Footer, JSON-LD structured data, derived FAQ answers) reads from
 * this single file. Nothing else in the codebase should hardcode a phone
 * number, city, or hour — update it here and it propagates everywhere.
 *
 * Fields are `null` until the business confirms them. A `null` field is
 * omitted from the rendered page and from structured data — it never
 * renders as "TBD" or a fake value. See docs §18/§20 for the reasoning.
 */

export interface BusinessHours {
  day: "Seg" | "Ter" | "Qua" | "Qui" | "Sex" | "Sáb" | "Dom";
  opens: string; // "08:00"
  closes: string; // "18:00"
}

export interface Address {
  street?: string;
  number?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  /**
   * Defaults to false. Many independent painters work at clients' homes
   * rather than a public storefront, so publishing a home address can be a
   * real privacy/safety concern, not just an SEO nicety. Only flip this to
   * true once the business explicitly confirms they want a street address
   * shown publicly.
   */
  showPublicly: boolean;
}

export interface SocialLinks {
  instagram?: string;
  facebook?: string;
}

export interface BusinessConfig {
  businessName: string;
  /** The Hero headline — see docs §13 for the headline exploration/selection. */
  tagline: string;
  /** Click-to-call number, e.g. "+55 51 99999-9999". Null hides the phone CTA entirely. */
  phone: string | null;
  /**
   * WhatsApp number in international format with no punctuation, e.g. "5551999999999".
   * Until this is set, every WhatsApp CTA on the site falls back to linking to the
   * on-page #contato section instead of a wa.me link — see docs §13. It never
   * shows a fake number.
   */
  whatsappNumber: string | null;
  email: string | null;
  address: Address;
  /** Used in copy and metadata even when the full street address stays private. */
  city: string | null;
  /** The confirmed service-area list. Empty until confirmed — never invented. */
  neighborhoods: string[];
  /** Null hides the hours block entirely rather than showing "a confirmar". */
  businessHours: BusinessHours[] | null;
  /** Powers the review-link CTA once a real profile exists. */
  googleBusinessProfileUrl: string | null;
  /** Empty object until real profiles exist — no icons linking nowhere. */
  socialLinks: SocialLinks;
  /**
   * A short founder/company story in Reginaldo's own words. Reserved for a
   * future "Sobre" section (see CONTENT_GUIDE.md) — no section currently
   * renders this field, so filling it in has no visible effect yet on its
   * own. Left here so the content model has a defined home for it as soon
   * as that section gets built.
   */
  story: string | null;
  logo: {
    src: string | null;
    alt: string;
  };
  /** Custom Google Maps embed URL (e.g. My Maps) */
  googleMapsEmbedUrl?: string | null;
  /** Direct link to view the map externally */
  googleMapsViewUrl?: string | null;
  /** Set true only once the business has confirmed they offer a touch-up guarantee. */
  guarantee: {
    offered: boolean;
    description?: string;
  };
}

export const businessConfig: BusinessConfig = {
  businessName: "Reginaldo Pinturas Residenciais",
  tagline: "Pintura que transforma o ambiente da sua casa.",

  phone: "(48) 98481-9526",
  whatsappNumber: "5548984819526",
  email: null,

  address: {
    showPublicly: false,
    city: "São José",
    state: "SC",
  },

  // Base city/region for metadata and copy
  city: "São José e Região",
  // Confirmed cities/regions served
  neighborhoods: [
    "São José",
    "Florianópolis",
    "Palhoça",
    "Biguaçu",
  ],

  googleMapsEmbedUrl: "https://www.google.com/maps/d/embed?mid=1ml9efDRtBo4SUpt3yO_uiM26FPqJPcM",
  googleMapsViewUrl: "https://www.google.com/maps/d/viewer?mid=1ml9efDRtBo4SUpt3yO_uiM26FPqJPcM&usp=sharing",

  // CONFIGURE — e.g. [{ day: "Seg", opens: "08:00", closes: "18:00" }, ...]
  businessHours: null,

  googleBusinessProfileUrl: null,

  socialLinks: {},

  // CONFIGURE — optional. No section renders this yet; see the field comment above.
  story: null,

  logo: {
    src: "/images/logo/logo.png",
    alt: "Reginaldo Pinturas Residenciais",
  },

  guarantee: {
    offered: false,
  },
};
