import { FC, MutableRefObject, useCallback, useRef, useState } from "react";
import cx from "classnames";

import { TCalendarWithEvents, TWeek } from "@type/date";
import { TEventMap } from "@type/event";

import { joinCalendarWithEvents, withHightPriority } from "@utils/calendar";

import Button from "@components/Button";

import s from "./Calendar.module.scss";
import {
  IApplicationContext,
  useApplicationContext,
} from "@context/ApplicationContext";

interface CalendarProps {
  className?: string;
  events: TEventMap;
  onClick: (date: Date) => void;
}

const Calendar: FC<CalendarProps> = ({ className, onClick, events }) => {
  const { setIsCreateOpen } = useApplicationContext() as IApplicationContext;

  const yearNow: MutableRefObject<number> = useRef<number>(
    new Date().getFullYear()
  );
  const [monthShift, setMonthShift] = useState(new Date().getMonth());

  const calendar: TCalendarWithEvents = joinCalendarWithEvents(
    yearNow.current,
    monthShift,
    events
  );

  const renderWeek = useCallback(
    (week: TWeek, idx: number) => {
      return (
        <ul key={idx} className={s.week}>
          {week.map((day, idx) => (
            <li
              className={cx(s.day, { [s.empty]: !day })}
              onClick={day ? () => onClick(day.date) : undefined}
              key={idx}
            >
              {day && (
                <div className={s.cell}>
                  <p className={s.dayNum}>{day.date.getDate()}</p>
                  <div className={s.info}>
                    <p className={s.planned}>
                      <span className={s.hide}>Planned: </span>
                      {day.events.length}
                    </p>
                    <p className={s.withHigh}>
                      <span className={s.hide}>High priority: </span>
                      {withHightPriority(day.events)}
                    </p>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      );
    },
    [onClick]
  );

  const handleNext = useCallback(() => setMonthShift((prev) => prev + 1), []);
  const handlePrev = useCallback(() => setMonthShift((prev) => prev - 1), []);
  const handleNew = useCallback(() => setIsCreateOpen(true), [setIsCreateOpen]);

  return (
    <div className={cx(s.root, className)}>
      <div className={s.buttons}>
        <Button className={s.toggleMonth} label="Prev" onClick={handlePrev} />
        <p className={s.month}>
          {new Date(yearNow.current, monthShift + 1, 0).toLocaleDateString(
            "en",
            {
              year: "numeric",
              month: "long",
            }
          )}
        </p>
        <Button className={s.toggleMonth} label="Next" onClick={handleNext} />
      </div>
      <ul className={s.calendar}>{calendar.map(renderWeek)}</ul>
      <Button className={s.button} label="New event" onClick={handleNew} />
    </div>
  );
};

export default Calendar;
