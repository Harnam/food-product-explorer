const BASE_URL = "https://world.openfoodfacts.org";

export const SEARCH_ENDPOINT = `${BASE_URL}/cgi/search.pl`;
export const PRODUCT_ENDPOINT = `${BASE_URL}/api/v0/product`;

export const DEFAULT_PAGE_SIZE = 20;

export const PRODUCT_CARD_FIELDS = "code,product_name,image_url,categories,nutrition_grade_fr,brands";
export const PRODUCT_DETAIL_FIELDS = "code,product_name,image_url,categories,nutrition_grade_fr,brands,ingredients_text,labels_tags,nutriments";