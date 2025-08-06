import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"

export function BookingDatePicker() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">Select a date:</h2>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
    </div>
  )
}
