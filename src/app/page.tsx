"use client"

import EventCalendar from '@/calendar/EventCalendar'

import { addDays, subDays } from 'date-fns'



export default function Home() {
  return (
    <>
      <div >
        <EventCalendar
          events={[
            { date: subDays(new Date(), 6), title: "Post video" },
            { date: subDays(new Date(), 1), title: "Edit video" },
            { date: addDays(new Date(), 3), title: "Code" },
          ]}
         />
      </div>
    </>
  )
}
