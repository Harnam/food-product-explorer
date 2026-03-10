import { ProductDetail } from "@/types/products";

export function sanitizeSearchData(data: any): ProductDetail[] {
    if (!data || !data.products) {
        return [];
    }
    return data.products.map((product: any) => ({
        id: product.code,
        name: product.product_name || "Unknown Product",
        image: product.image_small_url ?? product.image_url ?? "/placeholder.jpg",
        category: product.categories?.split(",")[0]?.trim(),
        nutritionGrade: /^[a-e]$/i.test(product.nutrition_grade_fr ?? "") ? product.nutrition_grade_fr.toUpperCase() : undefined,
        brands: product.brands || undefined,
    }));
}

export function sanitizeProductDetailData(data: any) : ProductDetail | null {
    if (!data || !data.product) {
        return null;
    }
    const product = data.product;
    return {
        id: product.code,
        name: product.product_name || "Unknown Product",
        image: product.image_small_url ?? product.image_url ?? "/placeholder.jpg",
        category: product.categories?.split(",")[0]?.trim(),
        nutritionGrade: /^[a-e]$/i.test(product.nutrition_grade_fr ?? "") ? product.nutrition_grade_fr.toUpperCase() : undefined,
        brands: product.brands || undefined,
        ingredients: product.ingredients_text || undefined,
        labels: product.labels_tags || undefined,
        nutriments: {
            energy: product.nutriments?.energy_100g,
            fat: product.nutriments?.fat_100g,
            carbohydrates: product.nutriments?.carbohydrates_100g,
            proteins: product.nutriments?.proteins_100g,
            salt: product.nutriments?.salt_100g,
            sugars: product.nutriments?.sugars_100g,
        },
    };
}