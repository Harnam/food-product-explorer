"use client"

type Props = {
  open: boolean
  setOpen: (v: boolean) => void
  children: React.ReactNode
}

export default function OverlayComponent({ open, setOpen, children }: Props) {
  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="relative bg-white w-96 max-w-[90vw] rounded-xl shadow-lg p-5">

        {/* Close button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-lg"
        >
          ✕
        </button>

        { children }

      </div>
    </div>
  )
}