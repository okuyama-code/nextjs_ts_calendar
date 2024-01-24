import React, { useState, useMemo, FormEvent } from "react";
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

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
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

  const WEEK = ["日", "月", "火", "水", "木", "金", "土"]


  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <h2 className="text-center">
          {format(currentDate, currentView === 'month' ? "MMMM yyyy" : "'Week'")}
        </h2>
      <div className="flex mb-2"></div>
        <button
          onClick={openModal}
          className="px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          イベントを追加する
        </button>
        <button
          className={clsx("mr-2", "px-4 py-2", currentView === 'month' && 'font-bold')}
          onClick={() => setCurrentView('month')}
        >
          月表示
        </button>
        <button
          className={clsx("px-4 py-2", currentView === 'week' && 'font-bold')}
          onClick={() => setCurrentView('week')}
        >
          週表示
        </button>
      </div>

      <div className="flex mb-2">
        <button
          onClick={handlePrevMonth}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md focus:outline-none focus:shadow-outline-gray active:bg-gray-500"
        >
          一か月前へ
        </button>
        <button
          onClick={handleNextMonth}
          className="px-4 py-2 ml-2 bg-gray-300 text-gray-700 rounded-md focus:outline-none focus:shadow-outline-gray active:bg-gray-500"
        >
          一か月後へ
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {WEEK.map((day) => (
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
              className={clsx(
                "border rounded-md pb-14 text-center",
                {
                  "bg-gray-200": isToday(day),
                  "text-gray-900": isToday(day),
                },
                "relative"
              )}
            >
              {format(day, "d")}
              {todaysEvents.map((event) => (
                <div
                  key={event.title}
                  className="bg-green-500 rounded-md text-gray-900 relative"
                >
                  {event.title}
                  <div className="absolute top-6 r left-1 mt-2 ">
                    <button
                      onClick={() => handleEditEvent(event)}
                      className="px-1 bg-blue-500 text-white rounded-md focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                    >
                      編集
                    </button>
                    {/* Delete Button */}
                    <button
                      onClick={() => handleDeleteEvent(event)}
                      className="px-1 ml-2 bg-red-500 text-white rounded-md focus:outline-none focus:shadow-outline-red active:bg-red-800"
                    >
                      削除
                    </button>
                  </div>
                </div>
              ))}
            </div>

          );
        })}

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
