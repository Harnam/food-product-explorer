import ProductCardLayout from "./ProductCardLayout";

export default function ProductCardSkeleton({ className }: { className?: string }) {
    return (
        <ProductCardLayout className={className} slots={{
            image: <img src="/public/placeholder.png" alt="Placeholder" />,
            title: <h3>Loading...</h3>,
            category: <p>Loading...</p>,
            grade: <span>Loading...</span>
        }} />
    );
}