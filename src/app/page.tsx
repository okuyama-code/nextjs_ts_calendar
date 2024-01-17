import Calendar from '@/calendar/Calendar'
import CalendarHeader from '@/calendar/CalendarHeader'
import Sidebar from '@/components/Sidebar'

export default function Home() {
  return (
    <>
      <div className="h-screen flex flex-col">
        <CalendarHeader />
        <div className="flex flex-1">
          <Sidebar />
          <Calendar />
        </div>
      </div>
    </>
  )
}
