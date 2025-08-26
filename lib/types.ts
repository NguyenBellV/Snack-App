export interface Product {
  id: string
  name: string
  slug: string
  description: string | null
  short_description: string
  price: number
  original_price: number
  category_id: string
  brand: string
  origin: string
  weight: string
  expiry_months: number
  stock_quantity: number
  sold_count: number
  rating: number
  review_count: number
  is_active: boolean
  featured: boolean
  created_at: string
  updated_at: string
  category?: Category
  images?: ProductImage[]
  features?: ProductFeature[]
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  image_url: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface ProductImage {
  id: number
  product_id: number
  image_url: string
  alt_text: string
  sort_order: number
  is_primary: boolean
  created_at: string
}

export interface ProductFeature {
  id: number
  product_id: number
  feature: string
  created_at: string
}

export interface CartItem {
  id: string
  cart_id: number
  product_id: string
  quantity: number
  price: number
  created_at: string
  updated_at: string
  product?: Product
}

export interface Cart {
  id: number
  user_id: string
  session_id: string
  created_at: string
  updated_at: string
  items?: CartItem[]
}

export interface Order {
  id: string
  user_id: string
  order_number: string
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled"
  payment_status: "pending" | "completed" | "failed" | "refunded"
  subtotal: number
  shipping_fee: number
  discount_amount: number
  total_amount: number
  shipping_name: string
  shipping_phone: string
  shipping_address: string
  shipping_city: string
  shipping_district: string
  shipping_ward: string
  payment_method: string
  payment_id: string
  notes: string | null
  created_at: string
  updated_at: string
  items?: OrderItem[]
  profile?: Profile
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  product_name: string
  product_image: string
  quantity: number
  price: number
  total: number
  created_at: string
  product?: Product
}

export interface Profile {
  id: string
  full_name: string | null
  phone: string | null
  avatar_url: string | null
  address: string
  city: string
  district: string
  ward: string
  role: "customer" | "admin" | "super_admin"
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  email: string
  profile?: Profile
}

export interface Coupon {
  id: string
  code: string
  discount_type: "percentage" | "fixed"
  discount_value: number
  min_order_amount: number | null
  max_uses: number | null
  used_count: number
  expires_at: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}
