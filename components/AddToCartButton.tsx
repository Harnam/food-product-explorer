type Props = {
  onClick: () => void
}

export default function AddToCartButton({ onClick }: Props) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
      className="absolute right-1 top-1 flex items-center justify-center w-8 h-8 rounded-md bg-blue-100 border-blue-400 border-4 text-white hover:bg-blue-300 active:scale-95 transition"
      aria-label="Add to cart"
    >
      🛒
    </button>
  )
}