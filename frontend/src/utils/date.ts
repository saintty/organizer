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
