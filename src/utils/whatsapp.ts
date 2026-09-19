import { businessConfig } from "../config/business";

/**
 * Builds the href for a WhatsApp CTA. Until a real WhatsApp number is
 * configured, every CTA falls back to the on-page #contato section instead
 * of a wa.me link — the button always works, and no placeholder digits are
 * ever shown in the UI. See docs §13.
 */
export function whatsappHref(message?: string): string {
  const { whatsappNumber } = businessConfig;
  if (!whatsappNumber) return "#contato";
  const base = `https://wa.me/${whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function isWhatsappConfigured(): boolean {
  return Boolean(businessConfig.whatsappNumber);
}

export function telHref(): string | null {
  const { phone } = businessConfig;
  if (!phone) return null;
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}
