export async function getProductByBarcode(barcode: string) {
    const res = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
    const data = await res.json();
    if (data.status === 0) {
        throw new Error(`Product with barcode ${barcode} not found`);
    }
    return data;
}

export async function searchProducts(query: string) {
    const url = `https://world.openfoodfacts.org//cgi/search.pl?search_terms=${query}&search_simple=1&action=process&json=true&page=1&page_size=20&fields=code,product_name,image_url,categories,nutrition_grade_fr`;
    console.log("search url", url);
    const res = await fetch(url);
    const data = await res.json();
    return data;
}