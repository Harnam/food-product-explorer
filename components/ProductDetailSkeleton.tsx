export default function ProductDetailSkeleton() {
  return (
    <div className="mx-auto container animate-pulse">

      <div className="grid md:grid-cols-2 gap-8">

        {/* Image skeleton */}
        <div className="w-full aspect-square bg-gray-200 rounded-lg" />

        {/* Details */}
        <div className="flex flex-col gap-4">

          {/* Title */}
          <div className="h-8 w-3/4 bg-gray-200 rounded" />

          {/* Category */}
          <div className="h-5 w-1/3 bg-gray-200 rounded" />

          {/* Nutrition grade */}
          <div className="h-8 w-12 bg-gray-200 rounded" />

          {/* Add to cart button */}
          <div className="h-9 w-32 bg-gray-200 rounded mt-2" />

          <hr className="my-3" />

          {/* Nutriments */}
          <div className="space-y-2">

            <div className="h-4 w-1/2 bg-gray-200 rounded" />
            <div className="h-4 w-2/5 bg-gray-200 rounded" />
            <div className="h-4 w-1/3 bg-gray-200 rounded" />
            <div className="h-4 w-2/5 bg-gray-200 rounded" />

          </div>

          {/* Ingredients */}
          <div className="space-y-2 mt-2">
            <div className="h-4 w-1/4 bg-gray-200 rounded" />
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-5/6 bg-gray-200 rounded" />
          </div>

        </div>

      </div>

    </div>
  )
}