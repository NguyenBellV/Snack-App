"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, TrendingUp, Gift, Truck, Shield, Headphones } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Header from "@/components/header"
import ProductCard from "@/components/product-card"

const categories = [
  {
    id: 1,
    name: "Bánh kẹo",
    slug: "banh-keo",
    image: "banhkeo.png",
    count: 156,
  },
  {
    id: 2,
    name: "Snack",
    slug: "snack",
    image: "snack.png",
    count: 89,
  },
  {
    id: 3,
    name: "Chocolate",
    slug: "chocolate",
    image: "chocolate.png",
    count: 67,
  },
  {
    id: 4,
    name: "Đồ uống",
    slug: "do-uong",
    image: "drinks.png",
    count: 134,
  },
  {
    id: 5,
    name: "Bánh quy",
    slug: "banh-quy",
    image: "banhquy.png",
    count: 78,
  },
  {
    id: 6,
    name: "Kẹo cao su",
    slug: "keo-cao-su",
    image: "keocaosu.png",
    count: 0,
  },
]

const featuredProducts = [
  {
    id: 1,
    name: "Bánh Oreo Original 137g",
    price: 25000,
    originalPrice: 30000,
    image: "oreo.png",
    rating: 4.8,
    reviewCount: 124,
    category: "Bánh kẹo",
    inStock: true,
    slug: "banh-oreo-original-137g",
  },
  {
    id: 2,
    name: "Coca Cola 330ml",
    price: 12000,
    originalPrice: 15000,
    image: "cocacola.png",
    rating: 4.6,
    reviewCount: 89,
    category: "Đồ uống",
    inStock: true,
    slug: "coca-cola-330ml",
  },
  {
    id: 3,
    name: "Snack Oishi Bí Đỏ 42g",
    price: 8000,
    originalPrice: 10000,
    image: "oshibido.png",
    rating: 4.5,
    reviewCount: 67,
    category: "Snack",
    inStock: true,
    slug: "snack-oishi-bi-do-42g",
  },
  {
    id: 4,
    name: "Chocolate Kitkat 4 Fingers",
    price: 18000,
    originalPrice: 22000,
    image: "kitkat.png",
    rating: 4.7,
    reviewCount: 156,
    category: "Chocolate",
    inStock: true,
    slug: "chocolate-kitkat-4-fingers",
  },
  {
    id: 5,
    name: "Bánh quy Cosy Marie 168g",
    price: 35000,
    originalPrice: 40000,
    image: "cosymarie.png",
    rating: 4.4,
    reviewCount: 78,
    category: "Bánh quy",
    inStock: true,
    slug: "banh-quy-cosy-marie-168g",
  },
  {
    id: 6,
    name: "Kẹo cao su Lotte Xylitol",
    price: 15000,
    originalPrice: 18000,
    image: "xylitol.png",
    rating: 4.3,
    reviewCount: 92,
    category: "Kẹo cao su",
    inStock: false,
    slug: "keo-cao-su-lotte-xylitol",
  },
]

const bestSellers = [
  {
    id: 7,
    name: "Bánh Chocopie Orion 12 cái",
    price: 45000,
    originalPrice: 50000,
    image: "chocopie.png",
    rating: 4.9,
    reviewCount: 234,
    category: "Bánh kẹo",
    inStock: true,
    slug: "banh-chocopie-orion-12-cai",
  },
  {
    id: 8,
    name: "Coca Cola 330ml",
    price: 11000,
    originalPrice: 14000,
    image: "cocacola.png",
    rating: 4.5,
    reviewCount: 167,
    category: "Đồ uống",
    inStock: true,
    slug: "pepsi-cola-330ml",
  },
  {
    id: 9,
    name: "Snack Lay's Khoai tây vị tự nhiên",
    price: 22000,
    originalPrice: 25000,
    image: "lays.png",
    rating: 4.6,
    reviewCount: 145,
    category: "Snack",
    inStock: true,
    slug: "snack-lays-khoai-tay-vi-tu-nhien",
  },
  {
    id: 10,
    name: "Chocolate Snickers 50g",
    price: 20000,
    originalPrice: 24000,
    image: "chocosnickers.png",
    rating: 4.8,
    reviewCount: 198,
    category: "Chocolate",
    inStock: true,
    slug: "chocolate-snickers-50g",
  },
]

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const banners = [
    {
      id: 1,
      title: "Giảm giá 50% cho tất cả bánh kẹo",
      subtitle: "Chương trình khuyến mãi lớn nhất trong năm",
      image: "banner1.jpg",
      cta: "Mua ngay",
      link: "/category/banh-keo",
    },
    {
      id: 2,
      title: "Miễn phí vận chuyển",
      subtitle: "Cho đơn hàng từ 200.000đ",
      image: "banner2.jpg",
      cta: "Khám phá",
      link: "/",
    },
    {
      id: 3,
      title: "Snack nhập khẩu chính hãng",
      subtitle: "Đa dạng hương vị từ khắp thế giới",
      image: "banner3.jpg",
      cta: "Xem thêm",
      link: "/category/snack",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [banners.length])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Banner */}
      <section className="relative h-96 overflow-hidden">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
              index === currentSlide ? "translate-x-0" : "translate-x-full"
            }`}
            style={{
              transform: `translateX(${(index - currentSlide) * 100}%)`,
            }}
          >
            <div className="relative h-full">
              <Image src={banner.image || "/placeholder.svg"} alt={banner.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-40" />
              <div className="absolute inset-0 flex items-center justify-center text-center text-white">
                <div>
                  <h1 className="text-4xl md:text-6xl font-bold mb-4">{banner.title}</h1>
                  <p className="text-xl md:text-2xl mb-8">{banner.subtitle}</p>
                  <Link href={banner.link}>
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                      {banner.cta}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slide indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? "bg-white" : "bg-white bg-opacity-50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Miễn phí vận chuyển</h3>
              <p className="text-gray-600 text-sm">Cho đơn hàng từ 200.000đ</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Đảm bảo chất lượng</h3>
              <p className="text-gray-600 text-sm">Sản phẩm chính hãng 100%</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="font-semibold mb-2">Ưu đãi hấp dẫn</h3>
              <p className="text-gray-600 text-sm">Khuyến mãi thường xuyên</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Hỗ trợ 24/7</h3>
              <p className="text-gray-600 text-sm">Tư vấn nhiệt tình</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Danh mục sản phẩm</h2>
            <Link href="/categories" className="text-blue-600 hover:text-blue-700 flex items-center">
              Xem tất cả
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <Link key={category.id} href={`/category/${category.slug}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <div className="aspect-square relative mb-4 overflow-hidden rounded-lg">
                      <Image
                        src={category.image || "/placeholder.svg"}
                        alt={category.name}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <h3 className="font-medium mb-1">{category.name}</h3>
                    <p className="text-sm text-gray-500">{category.count} sản phẩm</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Sản phẩm nổi bật</h2>
            <Link href="/products" className="text-blue-600 hover:text-blue-700 flex items-center">
              Xem tất cả
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <TrendingUp className="h-6 w-6 text-red-500 mr-2" />
              <h2 className="text-2xl font-bold">Bán chạy nhất</h2>
            </div>
            <Link href="/best-sellers" className="text-blue-600 hover:text-blue-700 flex items-center">
              Xem tất cả
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-12 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Đăng ký nhận tin khuyến mãi</h2>
          <p className="mb-8">Nhận thông báo về các chương trình ưu đãi mới nhất</p>
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Nhập email của bạn"
              className="flex-1 px-4 py-2 rounded-l-lg text-gray-900"
            />
            <Button className="bg-white text-blue-600 hover:bg-gray-100 rounded-l-none">Đăng ký</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">SnackMart</h3>
              <p className="text-gray-400 mb-4">Cửa hàng bánh kẹo online uy tín, chất lượng cao với giá cả hợp lý.</p>
              <div className="text-gray-400">
                <p>📍 123 Đường ABC, Quận 9, TP.HCM</p>
                <p>📞 1900-1234</p>
                <p>✉️ info@snackmart.vn</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Danh mục</h4>
              <ul className="space-y-2 text-gray-400">
                {categories.slice(0, 4).map((category) => (
                  <li key={category.id}>
                    <Link href={`/category/${category.slug}`} className="hover:text-white">
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Hỗ trợ</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Liên hệ
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="hover:text-white">
                    Chính sách vận chuyển
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="hover:text-white">
                    Đổi trả
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-white">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Theo dõi chúng tôi</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  Facebook
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  Instagram
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  YouTube
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 SnackMart. Tất cả quyền được bảo lưu bởi Rikka.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
