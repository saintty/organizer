import { getId, getToken } from "@utils/token";
import { instance } from "./instance";
import { ApiEvent, EPriority } from "@type/event";

export type EventsResponse = {
  events: [];
};
export const getEvents = () => {
  return instance.get<ApiEvent[]>("event/", {
    headers: {
      Authorization: `Token ${getToken()}`,
    },
  });
};

export type CreateEventData = {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  priority: EPriority;
};
export const createEvent = ({
  title,
  description,
  priority,
  startTime,
  endTime,
}: CreateEventData) => {
  return instance.post(
    "event/",
    {
      title,
      description,
      priority,
      start_time: startTime,
      end_time: endTime,
      user: Number(getId()),
    },
    {
      headers: {
        Authorization: `Token ${getToken()}`,
      },
    }
  );
};

export type EditEventData = {
  id: number;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  priority: EPriority;
};
export const editEvent = ({
  id,
  title,
  description,
  priority,
  startTime,
  endTime,
}: EditEventData) => {
  return instance.put(
    `event/${id}/`,
    {
      title,
      description,
      priority,
      start_time: startTime,
      end_time: endTime,
      user: Number(getId()),
    },
    {
      headers: {
        Authorization: `Token ${getToken()}`,
      },
    }
  );
};

export const deleteEvent = (id: number) => {
  return instance.delete(`event/${id}/`, {
    headers: { Authorization: `Token ${getToken()}` },
  });
};
