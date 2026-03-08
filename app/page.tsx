"use client";

import ProductCardComponent from "@/components/ProductCardComponent";
import { searchProducts } from "@/lib/api";
import { ProductCard } from "@/types/products";
import { useQuery } from "@tanstack/react-query";

export default function Home() {

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["search", {}],
    queryFn: () => searchProducts({}),
  });

  return (
    <>
      hello world
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {error.message}</p>}
      {data && (
        <ul>
          {data.map((product: ProductCard) => (
            <ProductCardComponent key={product.id} product={product} />
          ))}
        </ul>
      )}
    </>
  );
}
