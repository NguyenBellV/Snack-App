"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Star, ShoppingCart, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/cart-context"
import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useEffect } from "react"
import { Product } from "@/types/products"


interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault() // Prevent navigation if card is wrapped in Link
    setIsAdding(true)

    try {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        inStock: product.inStock ?? true,
        category: product.category,
      })

      // Show success feedback
      setTimeout(() => setIsAdding(false), 500)
    } catch (error) {
      console.error("Error adding to cart:", error)
      setIsAdding(false)
    }
  }

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-200 relative overflow-hidden">
      {/* Discount badge */}
      {discountPercent > 0 && (
        <Badge className="absolute top-2 left-2 z-10 bg-red-500 hover:bg-red-600">-{discountPercent}%</Badge>
      )}

      {/* Wishlist button */}
      <Button
        variant="ghost"
        size="sm"
        className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Heart className="h-4 w-4" />
      </Button>

      <Link href={`/product/${product.slug || product.id}`}>
        <div className="aspect-square relative overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
          />
        </div>
      </Link>

      <CardContent className="p-4">
        <Link href={`/product/${product.slug || product.id}`}>
          <h3 className="font-medium text-sm mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-red-600 font-bold">{product.price.toLocaleString("vi-VN")}đ</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-gray-400 line-through text-sm ml-2">
                {product.originalPrice.toLocaleString("vi-VN")}đ
              </span>
            )}
          </div>
        </div>

        {/* Add to cart button */}
        <Button
          onClick={handleAddToCart}
          disabled={isAdding || !(product.inStock ?? true)}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
          size="sm"
        >
          {isAdding ? (
            "Đang thêm..."
          ) : !(product.inStock ?? true) ? (
            "Hết hàng"
          ) : (
            <>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Thêm vào giỏ
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}


export function ProductList() {
  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from("products").select("*")
      if (error) console.error(error)
      else setProducts(data || [])
    }
    fetchProducts()
  }, [])

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Danh sách sản phẩm</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  )
}