"use client"

import Calendar from '@/calendar/Calendar'
import EventCalendar from '@/calendar/EventCalendar'
import EventCalendar2 from '@/calendar/EventCalendar2'
import EventCalendar3 from '@/calendar/EventCalendar3'
import EventModal from '@/components/EventModal'
import { addDays, subDays } from 'date-fns'



export default function Home() {
  return (
    <>
      {/* <EventModal /> */}
      <div >
        <EventCalendar3
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
