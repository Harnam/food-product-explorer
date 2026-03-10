"use client";

import ProductDetailsComponent from "@/components/ProductDetails";
import ProductDetailSkeleton from "@/components/ProductDetailSkeleton";
import { getProductByBarcode } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function ProductPage() {
  const params = useParams()
  const barcode = params.barcode as string

  const { data, isLoading, isError } = useQuery({
    queryKey: ["product", barcode],
    queryFn: () => getProductByBarcode(barcode),
    enabled: !!barcode
  })

  if (isLoading) return <ProductDetailSkeleton />

  if (isError || !data) return <div>Product not found</div>

  return <ProductDetailsComponent product={data} />
}