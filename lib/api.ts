import { SearchParams } from "@/types/searchParams";
import { DEFAULT_PAGE_SIZE, PRODUCT_CARD_FIELDS, PRODUCT_DETAIL_FIELDS, PRODUCT_ENDPOINT, SEARCH_ENDPOINT } from "./constants";


const buildSearchUrl = (params: SearchParams, page: number) => {
    const { search, category, pageSize } = params;
    const url = new URL(SEARCH_ENDPOINT);
    url.searchParams.append("search_terms", search || "");
    url.searchParams.append("search_simple", "1");
    url.searchParams.append("action", "process");
    url.searchParams.append("json", "true");
    url.searchParams.append("page", String(page));
    url.searchParams.append("page_size", String(pageSize || DEFAULT_PAGE_SIZE));
    url.searchParams.append("fields", PRODUCT_CARD_FIELDS);
    if (category) {
        url.searchParams.append("categories", category);
    }
    return url.toString();
};

const buildProductUrl = (barcode: string) => `${PRODUCT_ENDPOINT}/${barcode}.json?fields=${PRODUCT_DETAIL_FIELDS}`;


export async function getProductByBarcode(barcode: string) {
    const res = await fetch(buildProductUrl(barcode));
    const data = await res.json();
    if (data.status === 0) {
        throw new Error(`Product with barcode ${barcode} not found`);
    }
    return data;
}

export async function searchProducts(params: SearchParams, page: number = 1) {
    const res = await fetch(buildSearchUrl(params, page));
    const data = await res.json();
    return data;
}
