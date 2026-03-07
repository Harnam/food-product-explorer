"use client";

import { getProductByBarcode } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export default function ProductPage({ params }: { params: { barcode: string } }) {
    const { data, error, isLoading, isError } = useQuery({
        queryKey: ["product", params.barcode],
        queryFn: () => getProductByBarcode(params.barcode),
    });
    return (
        <>
            Product page for barcode: {params.barcode}
            {isLoading && <p>Loading...</p>}
            {isError && <p>Error: {error.message}</p>}
            {data && <p>Product: {data.product_name}</p>}
        </>
    );
}