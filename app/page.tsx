"use client";

import ProductCardComponent from "@/components/ProductCardComponent";
import { searchProducts } from "@/lib/api";
import { ProductCard } from "@/types/products";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

export default function Home() {

  const { data, fetchNextPage, hasNextPage, status, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["search", ""],
    queryFn: ({ pageParam = 1 }) => searchProducts({}, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.length) return undefined
      return pages.length + 1
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false
  })

  const products = data?.pages.flat()

  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        console.log("Loading more products...");
        fetchNextPage();
      }
    }, {
      rootMargin: "200px",
    });

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [fetchNextPage, hasNextPage]);

  return (
    <>
      {products && (
        <ul>
          {products.map((product: ProductCard) => (
            <ProductCardComponent key={product.id} product={product} />
          ))}
        </ul>
      )}
      {status === "pending" && <p>Loading...</p>}
      <div ref={loadMoreRef} className="h-10" />
    </>
  );
}
