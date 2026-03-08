"use client";

import ProductCardComponent from "@/components/ProductCardComponent";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import { searchProducts } from "@/lib/api";
import { ProductCard } from "@/types/products";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

export default function Home() {

  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  console.log("Search query:", searchQuery);

  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["search", searchQuery],
    queryFn: ({ pageParam = 1 }) => searchProducts({search: searchQuery}, pageParam),
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
      <div>
        <h3 className="text-2xl mb-4">{searchQuery ? `Search results for "${searchQuery}":` : "All Products"}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products?.map((product: ProductCard) => (
            <ProductCardComponent key={product.id} product={product} />
          ))}
          {(isLoading || isFetchingNextPage) && 
          <>
            <ProductCardSkeleton />
            <ProductCardSkeleton className="hidden sm:block" />
            <ProductCardSkeleton className="hidden md:block" />
            <ProductCardSkeleton className="hidden lg:block" />
          </>}
        </div>

        {!products?.length && !isLoading && <p>No products found.</p>}
        
      </div>
      <div ref={loadMoreRef} className="h-10" />
    </>
  );
}
