"use client";

import { searchProducts } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export default function Home() {

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["search", ""],
    queryFn: () => searchProducts(""),
  });

  return (
    <>
      hello world
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {error.message}</p>}
      {data && (
        <ul>
          {data.products.map((product: any) => (
            <li key={product.code}>{product.product_name}</li>
          ))}
        </ul>
      )}
    </>
  );
}
