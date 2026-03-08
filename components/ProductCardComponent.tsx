import { ProductCard } from "@/types/products";
import ProductCardLayout from "./ProductCardLayout";

export default function ProductCardComponent({ product }: { product: ProductCard }) {
    return (
        <ProductCardLayout slots={{
            image: <img src={product.image} alt={product.name} />,
            title: <h3>{product.name}</h3>,
            category: <p>{product.category}</p>,
            grade: <span>{product.nutritionGrade}</span>
        }} />
    );
}