export interface Product {
  id: string;
  name: string;
  subtitle: string | null;

  description: string | null;
  images: string[] | null;
  category: string | null;
  is_featured: boolean | null;
  created_at: string | null;
  material?: string;
  size?: string;
  priceValue: number;
  formattedPrice: string;
  badge?: string;
}