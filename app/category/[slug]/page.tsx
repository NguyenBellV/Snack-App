"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Filter, Grid, List, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import Header from "@/components/header"
import ProductCard from "@/components/product-card"

// Mock data for different categories
const categoryData = {
  "banh-keo": {
    name: "Bánh kẹo",
    description: "Các loại bánh kẹo ngon, chất lượng cao từ các thương hiệu nổi tiếng",
    products: [
      {
        id: 1,
        name: "Bánh Oreo Original 137g",
        price: 25000,
        originalPrice: 30000,
        image: "/oreo.png?height=300&width=300&text=Chocopie",
        rating: 4.8,
        reviewCount: 124,
        category: "Bánh kẹo",
        inStock: true,
        slug: "banh-oreo-original-137g",
      },
      {
        id: 7,
        name: "Bánh Chocopie Orion 12 cái",
        price: 45000,
        originalPrice: 50000,
        image: "/chocopie.png?height=300&width=300&text=Chocopie",
        rating: 4.9,
        reviewCount: 234,
        category: "Bánh kẹo",
        inStock: true,
        slug: "banh-chocopie-orion-12-cai",
      },
      {
        id: 11,
        name: "Bánh quy Cosy Marie 168g",
        price: 35000,
        originalPrice: 40000,
        image: "/cosymarie.png?height=300&width=300&text=Chocopie",
        rating: 4.4,
        reviewCount: 78,
        category: "Bánh kẹo",
        inStock: true,
        slug: "banh-quy-cosy-marie-168g",
      },
      {
        id: 12,
        name: "Bánh Pocky Chocolate",
        price: 28000,
        originalPrice: 32000,
        image: "/pocky.png?height=300&width=300&text=Chocopie",
        rating: 4.6,
        reviewCount: 156,
        category: "Bánh kẹo",
        inStock: true,
        slug: "banh-pocky-chocolate",
      },
      {
        id: 13,
        name: "Bánh Wafer Loacker",
        price: 42000,
        originalPrice: 48000,
        image: "/waferloacker.png?height=300&width=300&text=Chocopie",
        rating: 4.7,
        reviewCount: 89,
        category: "Bánh kẹo",
        inStock: false,
        slug: "banh-wafer-loacker",
      },
      {
        id: 14,
        name: "Bánh Biscotti Galbusera",
        price: 55000,
        originalPrice: 62000,
        image: "/biscotti.png?height=300&width=300&text=Chocopie",
        rating: 4.5,
        reviewCount: 67,
        category: "Bánh kẹo",
        inStock: true,
        slug: "banh-biscotti-galbusera",
      },
    ],
  },
  snack: {
    name: "Snack",
    description: "Đa dạng các loại snack giòn tan, thơm ngon từ khắp nơi trên thế giới",
    products: [
      {
        id: 3,
        name: "Snack Oishi Bí Đỏ 42g",
        price: 8000,
        originalPrice: 10000,
        image: "/oshibido.png?height=300&width=300&text=Chocopie",
        rating: 4.5,
        reviewCount: 67,
        category: "Snack",
        inStock: true,
        slug: "snack-oishi-bi-do-42g",
      },
      {
        id: 9,
        name: "Snack Lay's Khoai tây vị tự nhiên",
        price: 22000,
        originalPrice: 25000,
        image: "/lays.png?height=300&width=300&text=Chocopie",
        rating: 4.6,
        reviewCount: 145,
        category: "Snack",
        inStock: true,
        slug: "snack-lays-khoai-tay-vi-tu-nhien",
      },
      {
        id: 15,
        name: "Snack Pringles Original",
        price: 45000,
        originalPrice: 52000,
        image: "/pringles.png?height=300&width=300&text=Chocopie",
        rating: 4.8,
        reviewCount: 198,
        category: "Snack",
        inStock: true,
        slug: "snack-pringles-original",
      },
      {
        id: 16,
        name: "Snack Doritos Nacho Cheese",
        price: 38000,
        originalPrice: 42000,
        image: "/doritos.png?height=300&width=300&text=Chocopie",
        rating: 4.7,
        reviewCount: 134,
        category: "Snack",
        inStock: true,
        slug: "snack-doritos-nacho-cheese",
      },
    ],
  },
  chocolate: {
    name: "Chocolate",
    description: "Chocolate cao cấp từ các thương hiệu nổi tiếng thế giới",
    products: [
      {
        id: 4,
        name: "Chocolate Kitkat 4 Fingers",
        price: 18000,
        originalPrice: 22000,
        image: "/kitkat.png?height=300&width=300&text=Chocopie",
        rating: 4.7,
        reviewCount: 156,
        category: "Chocolate",
        inStock: true,
        slug: "chocolate-kitkat-4-fingers",
      },
      {
        id: 10,
        name: "Chocolate Snickers 50g",
        price: 20000,
        originalPrice: 24000,
        image: "/chocosnickers.png?height=300&width=300&text=Chocopie",
        rating: 4.8,
        reviewCount: 198,
        category: "Chocolate",
        inStock: true,
        slug: "chocolate-snickers-50g",
      },
      {
        id: 17,
        name: "Chocolate Ferrero Rocher",
        price: 85000,
        originalPrice: 95000,
        image: "/chocoferrero.png?height=300&width=300&text=Chocopie",
        rating: 4.9,
        reviewCount: 267,
        category: "Chocolate",
        inStock: true,
        slug: "chocolate-ferrero-rocher",
      },
      {
        id: 18,
        name: "Chocolate Lindt Excellence",
        price: 120000,
        originalPrice: 135000,
        image: "/chocolindt.png?height=300&width=300&text=Chocopie",
        rating: 4.8,
        reviewCount: 89,
        category: "Chocolate",
        inStock: false,
        slug: "chocolate-lindt-excellence",
      },
    ],
  },
}

export default function CategoryPage() {
  const params = useParams()
  const slug = params.slug as string
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("popular")
  const [priceRange, setPriceRange] = useState([0, 200000])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [inStockOnly, setInStockOnly] = useState(false)

  const category = categoryData[slug as keyof typeof categoryData]

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Danh mục không tồn tại</h1>
          <p className="text-gray-600">Danh mục bạn tìm kiếm không có trong hệ thống.</p>
        </div>
      </div>
    )
  }

  const brands = ["Orion", "Oishi", "Lay's", "KitKat", "Snickers", "Ferrero", "Lindt", "Pringles"]

  const filteredProducts = category.products.filter((product) => {
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
    const matchesStock = !inStockOnly || product.inStock
    const matchesBrand =
      selectedBrands.length === 0 ||
      selectedBrands.some((brand) => product.name.toLowerCase().includes(brand.toLowerCase()))
    return matchesPrice && matchesStock && matchesBrand
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "newest":
        return new Date(b.created_at || "2024-01-01").getTime() - new Date(a.created_at || "2024-01-01").getTime()
      default:
        return b.reviewCount - a.reviewCount
    }
  })

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brand])
    } else {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <span className="text-gray-500">Trang chủ</span>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900">{category.name}</span>
        </nav>

        {/* Category Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
          <p className="text-gray-600">{category.description}</p>
          <p className="text-sm text-gray-500 mt-2">Hiển thị {sortedProducts.length} sản phẩm</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 space-y-6">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4 flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Bộ lọc
                </h3>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Khoảng giá</h4>
                  <Slider value={priceRange} onValueChange={setPriceRange} max={200000} step={5000} className="mb-2" />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{priceRange[0].toLocaleString("vi-VN")}đ</span>
                    <span>{priceRange[1].toLocaleString("vi-VN")}đ</span>
                  </div>
                </div>

                {/* Brands */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Thương hiệu</h4>
                  <div className="space-y-2">
                    {brands.map((brand) => (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox
                          id={brand}
                          checked={selectedBrands.includes(brand)}
                          onCheckedChange={(checked) => handleBrandChange(brand, checked as boolean)}
                        />
                        <label htmlFor={brand} className="text-sm cursor-pointer">
                          {brand}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stock Status */}
                <div className="mb-6">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="inStock" checked={inStockOnly} onCheckedChange={setInStockOnly} />
                    <label htmlFor="inStock" className="text-sm cursor-pointer">
                      Chỉ hiển thị sản phẩm còn hàng
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Products */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center bg-transparent">
                      Sắp xếp theo
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setSortBy("popular")}>Phổ biến nhất</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("newest")}>Mới nhất</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("price-low")}>Giá thấp đến cao</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("price-high")}>Giá cao đến thấp</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("rating")}>Đánh giá cao nhất</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Products Grid */}
            {sortedProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-500 mb-4">Không tìm thấy sản phẩm nào phù hợp với bộ lọc</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setPriceRange([0, 200000])
                    setSelectedBrands([])
                    setInStockOnly(false)
                  }}
                >
                  Xóa bộ lọc
                </Button>
              </div>
            ) : (
              <div
                className={viewMode === "grid" ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" : "space-y-4"}
              >
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {sortedProducts.length > 0 && (
              <div className="flex justify-center mt-12">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" disabled>
                    Trước
                  </Button>
                  <Button variant="default">1</Button>
                  <Button variant="outline">2</Button>
                  <Button variant="outline">3</Button>
                  <Button variant="outline">Sau</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
