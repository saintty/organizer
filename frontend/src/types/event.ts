export enum EPriority {
  high = "HIGH",
  medium = "MEDIUM",
  low = "LOW",
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
