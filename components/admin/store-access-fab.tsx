"use client"

import { useState } from "react"
import Link from "next/link"
import { Home, ExternalLink, X, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function StoreAccessFAB() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {isExpanded && (
        <Card className="mb-4 shadow-lg">
          <CardContent className="p-3">
            <div className="space-y-2 min-w-[200px]">
              <Link href="/" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" className="w-full justify-start text-sm bg-transparent">
                  <Home className="mr-2 h-4 w-4" />
                  Trang chủ cửa hàng
                  <ExternalLink className="ml-auto h-3 w-3" />
                </Button>
              </Link>
              <Link href="/cart" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" className="w-full justify-start text-sm bg-transparent">
                  <Home className="mr-2 h-4 w-4" />
                  Giỏ hàng
                  <ExternalLink className="ml-auto h-3 w-3" />
                </Button>
              </Link>
              <Link href="/auth" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" className="w-full justify-start text-sm bg-transparent">
                  <Home className="mr-2 h-4 w-4" />
                  Đăng nhập khách hàng
                  <ExternalLink className="ml-auto h-3 w-3" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        className="h-14 w-14 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700"
        size="sm"
      >
        {isExpanded ? (
          <X className="h-6 w-6" />
        ) : (
          <div className="flex flex-col items-center">
            <Home className="h-5 w-5" />
            <ChevronUp className="h-3 w-3 -mt-1" />
          </div>
        )}
      </Button>
    </div>
  )
}
