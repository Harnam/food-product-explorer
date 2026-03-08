type Props = {
  slots: {
    image?: React.ReactNode
    title?: React.ReactNode
    category?: React.ReactNode
    grade?: React.ReactNode
  }
}

export default function ProductCardLayout({ slots }: Props) {
  return (
    <div className="border rounded-lg p-4 shadow-md flex flex-col items-center gap-2">
      <div className="">{slots.image}</div>
      <div className="">{slots.title}</div>
      <div className="">{slots.category}</div>
      <div className="">{slots.grade}</div>
    </div>
  )
}