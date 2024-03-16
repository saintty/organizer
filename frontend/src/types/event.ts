export enum EPriority {
  high = "High",
  medium = "Medium",
  low = "Low",
}

export interface IEvent {
  id: number;
  title: string;
  description: string;
  priority: EPriority;
  startTime: string;
  endTime: string;
}
