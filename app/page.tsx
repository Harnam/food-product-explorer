"use client";

import OverlayComponent from "@/components/OverlayComponent";
import ProductCardComponent from "@/components/ProductCardComponent";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import SortDropdown from "@/components/SortDropdown";
import { searchProducts } from "@/lib/api";
import { ProductCard } from "@/types/products";
import { useInfiniteQuery } from "@tanstack/react-query";
import { SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Home() {

  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  console.log("Search query:", searchQuery);

  const [sort, setSort] = useState<"default" | "name" | "grade">("default");
  const [category, setCategory] = useState("All");

  const [openFilters, setOpenFilters] = useState(false);

  const categories = [
    "All",
    "Snacks",
    "Beverages",
    "Dairy",
    "Breakfast",
    "Sweets",
    "Bakery",
    "Fruits & Vegetables",
  ]

  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["search", searchQuery, category],
    queryFn: ({ pageParam = 1 }) => searchProducts({search: searchQuery, category: (category == "All")?"":category}, pageParam),
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

  const products = data?.pages.flat().toSorted((a,b) => {
    if(sort == "grade")
      return (a.nutritionGrade || "").localeCompare((b.nutritionGrade || ""))
    else if (sort == "name")
      return (a.name || "").localeCompare((b.name || ""))
    else
      return 0;
  })

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
      <div className="container p-4 w-full flex flex-row gap-4 m-auto">
        <OverlayComponent open={openFilters} setOpen={setOpenFilters}>
            <p className="mt-2 font-bold mb-2">Sort By: </p>
            <SortDropdown value={sort} onChange={(val) => { window.scrollTo({top: 0, behavior: "smooth"}); setSort(val); }} />
            <p className="mt-2 font-bold mb-2">Categories: </p>
            {categories.map((cat) => (
              <div
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded-md text-sm border transition my-0.5
                  ${
                    category === cat
                      ? "bg-[#ffc8dd] text-white border-[#cdb4db]"
                      : "bg-white hover:bg-gray-100"
                  }`}
              >
                {cat}
              </div>
            ))}
        </OverlayComponent>

        <div className="flex-1">
          <div className="flex flex-row items-center justify-between">
            <h3 className="text-2xl">{searchQuery ? `Search results for "${searchQuery}":` : "All Products"}</h3>
            <button
              onClick={() => setOpenFilters(true)}
              className="flex items-center gap-2 px-3 py-2 border rounded-md text-sm font-medium
              bg-white hover:bg-gray-100 transition"
            >
              <SlidersHorizontal size={16} />
              Filters
            </button>
          </div>

          <hr className="my-4"></hr>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-stretch">
            {products?.map((product: ProductCard) => (
                <ProductCardComponent key={product.id} product={product} />
            ))}
            {(isLoading || isFetchingNextPage) && 
            <>
              <ProductCardSkeleton />
              <ProductCardSkeleton className="hidden sm:flex" />
              <ProductCardSkeleton className="hidden md:flex" />
              <ProductCardSkeleton className="hidden lg:flex" />
            </>}
          </div>

          {!products?.length && !isLoading && <p>No products found.</p>}
          <div ref={loadMoreRef} className="h-10" />
        </div>
      </div>
    </>
  );
}
