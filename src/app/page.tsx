"use client"

import Calendar from '@/calendar/Calendar'
import EventModal from '@/components/EventModal'



export default function Home() {
  return (
    <>
      {/* <EventModal /> */}
      <div className="h-screen flex flex-col">
        <Calendar />
      </div>
    </>
  )
}
