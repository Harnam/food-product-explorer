type Props = {
  grade?: "A" | "B" | "C" | "D" | "E"
}

export default function NutritionGrade({ grade }: Props) {
  const colors: Record<string, string> = {
    A: "bg-green-600",
    B: "bg-lime-500",
    C: "bg-yellow-400",
    D: "bg-orange-500",
    E: "bg-red-600"
  }

  return (
    <span
      className={`inline-flex items-center justify-center w-8 h-8 text-xs font-bold text-white rounded ${
        grade ? colors[grade] : "bg-gray-300 text-gray-600"
      }`}
    >
      {grade ?? "--"}
    </span>
  )
}