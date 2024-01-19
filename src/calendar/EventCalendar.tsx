import React, { useState, useMemo } from "react";
import clsx from "clsx";
import {
  eachDayOfInterval,
  endOfWeek,
  endOfMonth,
  format,
  getDay,
  isToday,
  startOfWeek,
  startOfMonth,
  addMonths,
  subMonths,
} from "date-fns";

import EventFormModal from '@/components/EventFormModal'

interface Event {
  date: Date;
  title: string;
}

interface EventCalendarProps {
  events: Event[];
}

const EventCalendar = ({ events }: EventCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState<'month' | 'week'>('month');
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  // 月の場合は月初から月末、週の場合は週の初めから週の終わりまでの日付を取得
  const startDate = currentView === 'month' ? startOfMonth(currentDate) : startOfWeek(currentDate);
  const endDate = currentView === 'month' ? endOfMonth(currentDate) : endOfWeek(currentDate);

  const daysInInterval = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const startingDayIndex = getDay(startDate);

  const [newEventDate, setNewEventDate] = useState("");
  const [newEventTitle, setNewEventTitle] = useState("");
  const [eventList, setEventList] = useState<Event[]>(events);

  const eventsByDate = useMemo(() => {
    return eventList.reduce((acc: { [key: string]: Event[] }, event) => {
      const dateKey = format(event.date, "yyyy-MM-dd");
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(event);
      return acc;
    }, {});
  }, [eventList]);

  const handleFormSubmit = (e: any) => {
    e.preventDefault();

    if (editingEvent) {
      // 編集モードの場合は既存のイベントを更新
      const updatedEventList = eventList.map((event) =>
        event === editingEvent ? { ...event, title: newEventTitle } : event
      );
      setEventList(updatedEventList);
      setEditingEvent(null); // 編集モード終了
      setIsModalOpen(false);
    } else {
      // 新しいイベントを追加
      const newEvent: Event = {
        date: new Date(newEventDate),
        title: newEventTitle,
      };
      setEventList([...eventList, newEvent]);
      setIsModalOpen(false);

    }

    setNewEventDate("");
    setNewEventTitle("");
  };

  const handleEditEvent = (event: Event) => {
    // 編集モードに入る
    setIsModalOpen(true);
    setEditingEvent(event);
    setNewEventDate(format(event.date, "yyyy-MM-dd"));
    setNewEventTitle(event.title);
  };

  const handleDeleteEvent = (event: Event) => {
    // イベントを削除
    const updatedEventList = eventList.filter((e) => e !== event);
    setEventList(updatedEventList);
  };

  const handlePrevMonth = () => {
    setCurrentDate((prevDate) => subMonths(prevDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate((prevDate) => addMonths(prevDate, 1));
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <h2 className="text-center">
          {format(currentDate, currentView === 'month' ? "MMMM yyyy" : "'Week'")}
        </h2>
      </div>
      <div className="flex mb-2">
        <button onClick={openModal}>Open Modal</button>
        <button
          className={clsx("mr-2", currentView === 'month' && 'font-bold')}
          onClick={() => setCurrentView('month')}
        >
          Month
        </button>
        <button
          className={clsx(currentView === 'week' && 'font-bold')}
          onClick={() => setCurrentView('week')}
        >
          Week
        </button>
      </div>
      <div className="flex mb-2">
        <button onClick={handlePrevMonth}>Prev Month</button>
        <button onClick={handleNextMonth}>Next Month</button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="font-bold text-center">
            {day}
          </div>
        ))}
        {Array.from({ length: startingDayIndex }).map((_, index) => (
          <div
            key={`empty-${index}`}
            className="border rounded-md p-2 text-center"
          />
        ))}
        {daysInInterval.map((day, index) => {
          const dateKey = format(day, "yyyy-MM-dd");
          const todaysEvents = eventsByDate[dateKey] || [];
          return (
            <div
              key={index}
              className={clsx("border rounded-md p-2 text-center", {
                "bg-gray-200": isToday(day),
                "text-gray-900": isToday(day),
              })}
            >
              {format(day, "d")}
              {todaysEvents.map((event) => (
                <div
                  key={event.title}
                  className="bg-green-500 rounded-md text-gray-900"
                >
                  {event.title}
                  <button onClick={() => handleEditEvent(event)}>Edit</button>
                  <button onClick={() => handleDeleteEvent(event)}>Delete</button>
                </div>
              ))}
            </div>
          );
        })}
        {/* イベント追加用のフォーム */}
        {/* <form onSubmit={handleFormSubmit}>
          <input
            type="date"
            value={newEventDate}
            onChange={(e) => setNewEventDate(e.target.value)}
          />
          <input
            type="text"
            placeholder="Event Title"
            value={newEventTitle}
            onChange={(e) => setNewEventTitle(e.target.value)}
          />
          <button type="submit">{editingEvent ? "Edit Event" : "Add Event"}</button>
        </form> */}
        <EventFormModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        editingEvent={editingEvent}
        newEventDate={newEventDate}
        newEventTitle={newEventTitle}
        onDateChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewEventDate(e.target.value)}
        onTitleChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewEventTitle(e.target.value)}
        closeModal={closeModal}
        onSubmit={handleFormSubmit}
      />
      </div>
    </div>
  );
};

export default EventCalendar;
