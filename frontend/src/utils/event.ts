import { ApiEvent, IEvent } from "@type/event";

export const normalize = (event: ApiEvent): IEvent => {
  return {
    title: event.title,
    description: event.description,
    startTime: event.start_time,
    endTime: event.end_time,
    priority: event.priority,
    id: event.id,
  };
};
