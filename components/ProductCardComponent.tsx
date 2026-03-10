import { ProductCard } from "@/types/products";
import ProductCardLayout from "./ProductCardLayout";

import Image from "next/image";
import Link from "next/link";
import NutritionGrade from "./NutritionGrade";
import AddToCartButton from "./AddToCartButton";
import { useCart } from "@/providers/CartProvider";

export default function ProductCardComponent({ product }: { product: ProductCard }) {

    const { dispatch } = useCart();

    return (
        <Link className="block h-full hover:scale-105 transition-transform duration-200 hover:cursor-pointer hover:shadow-[0_0_12px_#ffc8dd]" key={product.id} href={`/product/${product.id}`}>
            <ProductCardLayout slots={{
                image: <div className="relative">
                    <AddToCartButton onClick={() => dispatch({type: "ADD", item: product})}/>
                    <Image placeholder="blur" blurDataURL="/placeholder.jpg" unoptimized src={product.image} alt={product.name} width={300} height={300} className="w-full h-full rounded aspect-square object-cover" />
                </div>,
                title: <h3 className="text-lg font-bold text-center">{product.name}</h3>,
                category: <p className="leading-snug flex-1 min-w-0">{product.category || "Uncategorized"}</p>,
                grade: <NutritionGrade grade={product.nutritionGrade} />
            }} />
        </Link>
    );
}