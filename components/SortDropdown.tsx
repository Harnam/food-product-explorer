"use client"

import { useState } from "react"

type SortType = "default" | "name" | "grade"

type Props = {
  value: SortType
  onChange: (value: SortType) => void
}

const options: { value: SortType; label: string }[] = [
  { value: "default", label: "Default" },
  { value: "name", label: "Name" },
  { value: "grade", label: "Nutrition Grade" }
]

export default function SortDropdown({ value, onChange }: Props) {
  const [open, setOpen] = useState(false)

  const selected = options.find(o => o.value === value)?.label

  return (
    <div className="relative w-48">

      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-2 border rounded-md bg-[#bde0fe] hover:bg-[#cdb4db]"
      >
        <span className="text-sm">{selected}</span>
        <span className="text-gray-500">▾</span>
      </button>

      {open && (
        <div className="absolute mt-1 w-full bg-[#bde0fe] border rounded-md shadow-lg z-20">
          {options.map(opt => (
            <button
              key={opt.value}
              onClick={() => {
                onChange(opt.value)
                setOpen(false)
              }}
              className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-[#ffc8dd]"
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}

    </div>
  )
}