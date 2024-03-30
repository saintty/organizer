const secondsUntilDayEnds = (date: Date): number => {
  return 86400000 - (date.getTime() % 86400000);
};

export const convertDayToDayTime = (
  date: Date,
  multiday: boolean = false,
  isStartDate: boolean = false
): string => {
  const expand = (num: number): string => num.toString().padStart(2, "0");

  const globalDate: string = date.toLocaleString("en", {
    month: "long",
    day: "numeric",
  });
  const withMonth: string =
    (isStartDate ? "(" : " (") + globalDate + (isStartDate ? ") " : ")");

  const common: string = `${expand(date.getUTCHours())}:${expand(
    date.getUTCMinutes()
  )}`;

  if (!multiday) return common;

  return isStartDate ? withMonth + common : common + withMonth;
};

export const convertPeriodToDayPart = (
  timeStart: string,
  timeEnd: string
): string => {
  const dateStart: Date = new Date(timeStart);
  const dateEnd: Date = new Date(timeEnd);
  const multiday: boolean =
    secondsUntilDayEnds(dateStart) < dateEnd.getTime() - dateStart.getTime();

  return `${convertDayToDayTime(
    dateStart,
    multiday,
    true
  )} - ${convertDayToDayTime(dateEnd, multiday)}`;
};

export const convertTimeMonthPart = (date: Date): string => {
  return `${date.toLocaleString("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })}`;
};
