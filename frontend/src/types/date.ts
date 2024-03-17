import { IEvent } from "./event";

export type TEmptyCalendar = (Date | null)[][];
export type TEmptyWeek = (Date | null)[];

export type TCalendarCell = {
  date: Date;
  events: IEvent[];
} | null;

export type TWeek = TCalendarCell[];
export type TCalendarWithEvents = TWeek[];
