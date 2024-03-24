const secondsUntilDayEnds = (date: Date): number => {
  return 86400000 - (date.getTime() % 86400000);
};

const convertDayToDayTime = (date: Date, multiday: boolean = false): string => {
  const expand = (num: number): string => num.toString().padStart(2, "0");

  return `${expand(date.getUTCHours())}:${expand(date.getUTCMinutes())}${
    multiday
      ? " (" +
        date.toLocaleString("en", {
          month: "long",
          day: "numeric",
        }) +
        ")"
      : ""
  }`;
};

export const convertPeriodToDayPart = (
  timeStart: string,
  timeEnd: string
): string => {
  const dateStart: Date = new Date(timeStart);
  const dateEnd: Date = new Date(timeEnd);
  const multiday: boolean =
    secondsUntilDayEnds(dateStart) < dateEnd.getTime() - dateStart.getTime();

  return `${convertDayToDayTime(dateStart)} - ${convertDayToDayTime(
    dateEnd,
    multiday
  )}`;
};

export const convertTimeMonthPart = (date: Date): string => {
  return `${date.toLocaleString("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })}`;
};
