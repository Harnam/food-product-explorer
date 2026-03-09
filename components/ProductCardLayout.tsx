type Props = {
  slots: {
    image?: React.ReactNode
    title?: React.ReactNode
    category?: React.ReactNode
    grade?: React.ReactNode
  },
  className?: string
}

export default function ProductCardLayout({ slots, className }: Props) {
  return (
    <div className={`border-[#ffc8dd] border-2 h-full rounded-lg p-4 shadow-md flex flex-col items-center gap-2 bg-[#bde0fe] text-black ${className || ''}`}>
      <div className="w-full">{slots.image}</div>
      <div className="w-full">{slots.title}</div>
      <div className="flex flex-row items-center justify-between gap-2 mt-auto w-full">
        {slots.category}
        <div className="shrink-0">{slots.grade}</div>
      </div>
    </div>
  )
}