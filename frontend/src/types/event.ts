export enum EPriority {
  high = "HIGH",
  medium = "MEDIUM",
  low = "LOWER",
}

export interface IEvent {
  id: number;
  title: string;
  description: string;
  priority: EPriority;
  startTime: string;
  endTime: string;
}

export type TEventMap = {
  [key: string]: IEvent[];
};

export type ApiEvent = {
  id: number;
  title: string;
  description: string;
  priority: EPriority;
  start_time: string;
  end_time: string;
  user: number;
};
