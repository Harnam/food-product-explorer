"use client"

import { useCart } from "@/providers/CartProvider"
import NutritionGrade from "@/components/NutritionGrade"
import OverlayComponent from "./OverlayComponent"

type Props = {
  open: boolean
  setOpen: (v: boolean) => void
}

export default function CartOverlay({ open, setOpen }: Props) {
  const { state, dispatch } = useCart()

  if (!open) return null

  return (
    <OverlayComponent open={open} setOpen={setOpen}>
        <h2 className="text-lg font-semibold mb-4">Your Cart</h2>

        {state.items.length === 0 && (
          <p className="text-gray-500 text-sm">Your cart is empty</p>
        )}

        <div className="space-y-3 max-h-[60vh] overflow-y-auto">

          {state.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 border rounded-lg p-3 hover:bg-gray-50"
            >

              {/* Product image */}
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 object-contain"
              />

              {/* Product details */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {item.name}
                </p>

                <div className="mt-1">
                  <NutritionGrade grade={item.nutritionGrade} />
                </div>
              </div>

              {/* Delete button */}
              <button
                onClick={() =>
                  dispatch({ type: "REMOVE", id: item.id })
                }
                className="text-red-500 hover:text-red-700 text-sm font-medium"
              >
                Remove
              </button>

            </div>
          ))}

        </div>
    </OverlayComponent>
  )
}