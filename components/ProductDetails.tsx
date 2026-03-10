"use client"

import Image from "next/image"
import NutritionGrade from "@/components/NutritionGrade"
import AddToCartButton from "@/components/AddToCartButton"
import { ProductDetail } from "@/types/products"
import { useCart } from "@/providers/CartProvider"

type Props = {
  product: ProductDetail
}

export default function ProductDetailsComponent({ product }: Props) {

  const { dispatch } = useCart();

  return (
    <div className="mx-auto container">

      <div className="grid md:grid-cols-2 gap-8">

        {/* Product Image */}
        <div className="w-full aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={400}
            className="object-contain w-full aspect-square"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-4">

          <h1 className="text-2xl font-semibold">
            {product.name}
          </h1>

          <p className="text-black">
            {product.category ?? "Uncategorized"}
          </p>

          <div className="flex items-center gap-3">
            <NutritionGrade grade={product.nutritionGrade} />
          </div>

          <div className="mt-3">
            <AddToCartButton onClick={() => dispatch({type: "ADD", item: product})} />
          </div>

          {/* Divider */}
          <hr className="my-3" />

          {/* Nutritional info */}
          <div className="space-y-2 text-sm">

            {product.nutriments &&
                Object.entries(product.nutriments).map(([key, value]) => (
                    <p key={key}>
                        <span className="font-medium">
                            {key.charAt(0).toUpperCase() + key.slice(1)}:
                        </span>{" "}
                        {value}{(key === "energy")?"kcal":"g"}
                    </p>
                ))
            }

            {product.ingredients && (
              <p>
                <span className="font-medium">Ingredients:</span>{" "}
                {product.ingredients}
              </p>
            )}

          </div>

        </div>

      </div>

    </div>
  )
}