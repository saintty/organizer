import { TEmptyCalendar, TCalendarCell } from "@type/date";
import { EPriority, IEvent, TEventMap } from "@type/event";

export const getCalendarByMonth = (
  currentYear: number,
  currentMonthShift: number
): TEmptyCalendar => {
  const calendar: TEmptyCalendar = [];
  const resultDate = new Date(currentYear, currentMonthShift, 1);

  const firstDay: number =
    new Date(resultDate.getFullYear(), resultDate.getMonth(), 1).getDay() - 1;
  const lastDay: number = new Date(
    resultDate.getFullYear(),
    resultDate.getMonth() + 1,
    0
  ).getDate();

  let idx: number = 1;
  let week: Date[] = [];

  while (idx <= lastDay) {
    week.push(new Date(resultDate.getFullYear(), resultDate.getMonth(), idx));

    if ((idx + firstDay) % 7 === 0) {
      calendar.push(week);
      week = [];
    }

    idx += 1;
  }

  if (week.length) calendar.push(week);

  const expand = (arr: (Date | null)[], toStart: boolean = false): void => {
    while (arr.length !== 7) {
      if (toStart) {
        arr.unshift(null);
      } else {
        arr.push(null);
      }
    }
  };

  expand(calendar[0], true);
  expand(calendar[calendar.length - 1]);
  return calendar;
};

export const createDateKey = (time: string): string => {
  const date = new Date(time);

  const keyOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return date.toLocaleDateString("en", keyOptions);
};

export const eventsByDate = (events: IEvent[]): TEventMap =>
  events.reduce((map: TEventMap, event: IEvent): TEventMap => {
    const startKey = createDateKey(event.startTime);
    const endKey = createDateKey(event.startTime);

    if (map[startKey]) map[startKey].push(event);
    else map[startKey] = [event];

    if (startKey === endKey) return map;

    if (map[endKey]) map[endKey].push(event);
    else map[endKey] = [event];

    return map;
  }, {});

export const joinCalendarWithEvents = (
  currentYear: number,
  currentMonthShift: number,
  eventsMap: TEventMap
): TCalendarCell[][] => {
  const calendar: TEmptyCalendar = getCalendarByMonth(
    currentYear,
    currentMonthShift
  );
  const resultCalendar: TCalendarCell[][] = [];

  for (let i = 0; i < calendar.length; ++i) {
    resultCalendar.push([]);

    for (let j = 0; j < calendar[0].length; ++j) {
      if (!calendar[i][j]) {
        resultCalendar[i][j] = null;
        continue;
      }

      const calendarDateKey = createDateKey(calendar[i][j]!.toISOString());
      resultCalendar[i][j] = {
        date: calendar[i][j]!,
        events: [],
      };

      if (eventsMap[calendarDateKey]?.length) {
        resultCalendar[i][j]!.events = eventsMap[calendarDateKey];
      }
    }
  }

  return resultCalendar;
};

export const withHightPriority = (events: IEvent[] = []): number =>
  events.filter((event: IEvent) => event.priority === EPriority.high).length;
