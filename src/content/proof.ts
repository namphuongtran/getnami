// Real adopters and quotes only, with permission. While these are empty the site shows an
// "early adopters wanted" call to action instead of a social proof section.
export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  organization: string;
}

export const testimonials: Testimonial[] = [];

export const adopters: { name: string; url: string }[] = [];
