import Image from "next/image";
import ProductCardLayout from "./ProductCardLayout";
import NutritionGrade from "./NutritionGrade";

export default function ProductCardSkeleton({ className }: { className?: string }) {
    return (
        <ProductCardLayout className={`${className || ''}`} slots={{
            // image: <img src="/placeholder.jpg" alt="Placeholder" />,
            image: <Image src="/placeholder.jpg" alt="Placeholder" width={300} height={300} className="w-full rounded h-full aspect-square object-cover animate-pulse" />,
            title: <div className="animate-pulse h-10 bg-gray-200 rounded w-2/3 m-auto mb-2" />,
            category: <div className="animate-pulse h-full bg-gray-200 rounded w-1/3 mb-2" />,
            grade: <div className="animate-pulse"><NutritionGrade grade={undefined} /></div>
        }} />
    );
}