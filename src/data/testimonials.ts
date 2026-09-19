/**
 * Testimonials — see docs §11.9 / §18.
 *
 * Empty by design. Unlike Portfolio, an empty testimonials array does not
 * get category shells — the Testimonials component either omits itself
 * entirely or shows one honest "estamos começando a reunir avaliações"
 * invitation, never a hollow quote carousel. Toggle `showInvitation` to
 * choose between the two while the array is empty.
 */

export interface Testimonial {
  id: string;
  quote: string;
  authorFirstName: string;
  neighborhood: string | null;
  source: "direto" | "google";
  date: string | null;
}

export const testimonials: Testimonial[] = [];

/**
 * true  -> show the small honest "collecting reviews" invitation module
 * false -> omit the Testimonials section from the page entirely
 * Recommended default per docs §11.9: true, so the site shows visible
 * momentum rather than a silent gap in navigation.
 */
export const showTestimonialInvitation = true;

// CONFIGURE once a Google Business Profile exists and has real reviews.
export const googleRating: { value: number; count: number } | null = null;
