import type { Profile } from "./types"

const API_BASE = "/api"

// Products API
export const productsApi = {
  getAll: async (params?: {
    page?: number
    limit?: number
    category?: string
    search?: string
    featured?: boolean
    sort?: string
    order?: "asc" | "desc"
  }) => {
    const searchParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString())
        }
      })
    }

    const response = await fetch(`${API_BASE}/products?${searchParams}`)
    return response.json()
  },

  getById: async (id: number) => {
    const response = await fetch(`${API_BASE}/products/${id}`)
    return response.json()
  },
}

// Categories API
export const categoriesApi = {
  getAll: async () => {
    const response = await fetch(`${API_BASE}/categories`)
    return response.json()
  },
}

// Cart API
export const cartApi = {
  get: async (userId?: string, sessionId?: string) => {
    const params = new URLSearchParams()
    if (userId) params.append("userId", userId)
    if (sessionId) params.append("sessionId", sessionId)

    const response = await fetch(`${API_BASE}/cart?${params}`)
    return response.json()
  },

  addItem: async (data: {
    userId?: string
    sessionId?: string
    productId: number
    quantity: number
  }) => {
    const response = await fetch(`${API_BASE}/cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    return response.json()
  },
}

// Orders API
export const ordersApi = {
  create: async (data: {
    userId: string
    cartId: number
    shippingInfo: any
    paymentMethod: string
    notes?: string
  }) => {
    const response = await fetch(`${API_BASE}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    return response.json()
  },

  getByUser: async (userId: string) => {
    const response = await fetch(`${API_BASE}/orders?userId=${userId}`)
    return response.json()
  },
}

// Profile API
export const profileApi = {
  get: async (userId: string) => {
    const response = await fetch(`${API_BASE}/auth/profile?userId=${userId}`)
    return response.json()
  },

  update: async (userId: string, data: Partial<Profile>) => {
    const response = await fetch(`${API_BASE}/auth/profile`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, ...data }),
    })
    return response.json()
  },
}
