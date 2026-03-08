// src/types/product.ts

type BaseProduct = {
  id: string
  name: string
  image: string
  category?: string
  nutritionGrade?: "A" | "B" | "C" | "D" | "E"
  brands?: string
}

export type ProductCard = BaseProduct

export type Nutriments = {
  energy?: number
  fat?: number
  carbohydrates?: number
  proteins?: number
  salt?: number
  sugars?: number
}

export type ProductDetail = BaseProduct & {
  ingredients?: string
  nutriments?: Nutriments
  labels?: string[]
}