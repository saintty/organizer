import { FC, useCallback } from "react";
import cx from "classnames";

import s from "./Calendar.module.scss";
import { TCalendar, TWeek } from "@type/date";
import { getCurrentMonthCalendar } from "@utils/date";

interface CalendarProps {
  className?: string;
  onClick: (date: Date) => void;
}

const Calendar: FC<CalendarProps> = ({ className, onClick }) => {
  const calendar: TCalendar = getCurrentMonthCalendar();

  const renderWeek = useCallback(
    (week: TWeek, idx: number) => {
      return (
        <ul key={idx} className={s.week}>
          {week.map((day) => (
            <li
              className={cx(s.day, { [s.empty]: !day })}
              onClick={day ? () => onClick(day) : undefined}
            >
              {day?.getDate()}
            </li>
          ))}
        </ul>
      );
    },
    [onClick]
  );

  return (
    <div className={cx(s.root, className)}>
      <ul className={s.calendar}>{calendar.map(renderWeek)}</ul>
    </div>
  );
};

export default Calendar;
