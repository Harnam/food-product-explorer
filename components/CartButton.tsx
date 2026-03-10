"use client"

import { useCart } from "@/providers/CartProvider"

export default function CartButton({ setCartOpen }: { setCartOpen(v: boolean): void }) {
  const { state } = useCart()

  const count = state.items.length

  return (
    <div className="cursor-pointer relative flex items-center justify-center p-2" onClick={() => setCartOpen(true)}>
      <span className="text-xl">🛒</span>

      {count > 0 && (
        <span className="absolute -top-1 -right-1 text-xs bg-red-500 text-white rounded-full px-1.5">
          {count}
        </span>
      )}
    </div>
  )
}