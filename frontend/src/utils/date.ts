import { TCalendar } from "@type/date";

const convertDayToDayTime = (date: Date): string => {
  const expand = (num: number): string => num.toString().padStart(2, "0");

  return `${expand(date.getHours())}:${expand(date.getMinutes())}`;
};

export const convertPeriodToDayPart = (
  timeStart: string,
  timeEnd: string
): string => {
  const dateStart: Date = new Date(timeStart);
  const dateEnd: Date = new Date(timeEnd);

  return `${convertDayToDayTime(dateStart)} - ${convertDayToDayTime(dateEnd)}`;
};

export const convertTimeMonthPart = (date: Date): string => {
  return `${date.toLocaleString("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })}`;
};

export const getCurrentMonthCalendar = (): TCalendar => {
  const calendar: TCalendar = [];
  const currentDate = new Date();

  const firstDay: number =
    new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay() - 1;
  const lastDay: number = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  let idx: number = 1;
  let week: Date[] = [];

  while (idx <= lastDay) {
    week.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), idx));

    if ((idx + firstDay) % 7 === 0) {
      calendar.push(week);
      week = [];
    }

    idx += 1;
  }

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
