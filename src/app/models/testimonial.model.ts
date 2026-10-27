export interface Testimonial {
  id: string;
  text: string;
  authorName: string;
  date: string;
  rating?: number;
  occasion?: string;
  location?: string;
}