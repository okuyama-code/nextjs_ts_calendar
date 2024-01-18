"use client"

import Calendar from '@/calendar/Calendar'
import CalendarHeader from '@/calendar/CalendarHeader'
import Button from '@/components/Button';
import Sidebar from '@/components/Sidebar'
import { useState } from 'react';


export default function Home() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleSetToday = () => setCurrentDate(new Date());
  return (
    <>
      <div className="h-screen flex flex-col">
        <CalendarHeader />
        <Button onClick={handleSetToday}>Today</Button>
        <div className="flex flex-1">
          <Sidebar />
          <Calendar value={currentDate} onChange={setCurrentDate}  />
        </div>
      </div>
    </>
  )
}
