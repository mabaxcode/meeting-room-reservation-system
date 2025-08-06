import React from 'react'
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import { enUS } from 'date-fns/locale/en-US'

const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

export default function Calendar({ reservations }) {

    // console.log(reservations)

    
  const events = reservations
    .filter(event => event.title)
    .map(event => ({
        title: event.title,
        start: new Date(event.start_time.replace(' ', 'T')),
        end: new Date(event.end_time.replace(' ', 'T')),
    }))


 

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Meeting Room Calendar</h1>
      <div className="h-[700px]">
        <BigCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
        />
      </div>
    </div>
  )
}
