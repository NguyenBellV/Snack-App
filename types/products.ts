export interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number | null
  image?: string | null
  rating?: number | null
  reviewCount?: number | null
  discount?: number | null
  category?: string | null
  inStock?: boolean | null
  slug?: string | null
}
