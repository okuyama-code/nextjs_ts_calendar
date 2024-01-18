import {
  add,
  differenceInDays,
  endOfMonth,
  format,
  setDate,
  startOfMonth,
  sub,
} from "date-fns";
import Cell from "./Cell";
import Button from "@/components/Button";
import { useState } from "react";

const weeks = ["日", "月", "火", "水", "木", "金", "土"];



const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());


  const startDate = startOfMonth(currentDate);
  const endDate = endOfMonth(currentDate);
  const numDays = differenceInDays(endDate, startDate) + 1;

  const prefixDays = startDate.getDay();
  const suffixDays = 6 - endDate.getDay();

  const prevMonth = () => setCurrentDate(sub(currentDate, { months: 1 }));
  const nextMonth = () => setCurrentDate(add(currentDate, { months: 1 }));

  const handleClickDate = (index: number) => {
    const date = setDate(currentDate, index);
    setCurrentDate(date);
  };

  const handleSetToday = () => setCurrentDate(new Date());



  return (
    <div className="flex flex-col w-full">
        <div className="text-center p-3">
          <button onClick={prevMonth}>{"<"}</button>
          <button className="inline-block w-40">{format(currentDate, "LLLL yyyy")}</button>
          <button className="mr-5" onClick={nextMonth}>{">"}</button>
          <Button onClick={handleSetToday}>Today</Button>
        </div>
      <div className="w-full border-t border-l">
        <div className="grid grid-cols-7 items-center justify-center text-center">

          {weeks.map((week) => (
            <Cell key={week} week={week} className="text-xs font-bold uppercase"></Cell>
          ))}

          {Array.from({ length: prefixDays }).map((_, index) => (
            <Cell key={index} />
          ))}

            {/* TODO　ここに予定のtitleを入れる */}
          {Array.from({ length: numDays }).map((_, index) => {
            const date = index + 1;
            const isCurrentDate = date === currentDate.getDate();

            return (
              <Cell
                key={date}
                date={date}
                isActive={isCurrentDate}
                onClick={() => handleClickDate(date)}
              >
              </Cell>
            );
          })}

          {Array.from({ length: suffixDays }).map((_, index) => (
            <Cell key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
