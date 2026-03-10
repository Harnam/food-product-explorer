"use client"

import { ProductCard } from "@/types/products"
import { createContext, useContext, useReducer, ReactNode } from "react"

type CartState = {
  items: ProductCard[]
}

type Action =
  | { type: "ADD"; item: ProductCard }
  | { type: "REMOVE"; id: string }

const CartContext = createContext<{
  state: CartState
  dispatch: React.Dispatch<Action>
} | null>(null)

function cartReducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "ADD":
      return { items: [...state.items, action.item] }

    case "REMOVE":
      return { items: state.items.filter(i => i.id !== action.id) }

    default:
      return state
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used inside CartProvider")
  return ctx
}