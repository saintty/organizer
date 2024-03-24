import { FC, useCallback, useEffect, useMemo, useState } from "react";
import cx from "classnames";

import { IEvent, TEventMap } from "@type/event";

import { createDateKey, eventsByDate } from "@utils/calendar";

import Container from "@components/Container";
import Events from "./Events";
import Calendar from "./Calendar";
import EditModal from "./EditModal";
import CreateModal from "./CreateModal";

import s from "./Home.module.scss";
import {
  IApplicationContext,
  useApplicationContext,
} from "@context/ApplicationContext";
import ConfirmModal from "./ConfirmModal/ConfirmModal";
import { getEvents } from "@api/event";
import { clearUserData } from "@utils/token";
import { useNavigate } from "react-router-dom";

interface HomeProps {
  className?: string;
}

const Home: FC<HomeProps> = ({ className }) => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { deleteLabel, setIsDeleteOpen } =
    useApplicationContext() as IApplicationContext;
  const navigate = useNavigate();

  const handleChooseDate = useCallback(
    (date: Date) => setSelectedDate(date),
    []
  );

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await getEvents();

        setEvents(response.data);
      } catch (e) {
        const errorMessage = e.response.data.detail;

        if (
          errorMessage === "Authentication error. The token cannot be decoded"
        ) {
          clearUserData();
          navigate("/");
        }
      }
    };

    fetchEvent();
  }, [navigate]);
  console.log(events);

  const eventsList = useMemo<TEventMap>(() => eventsByDate(events), [events]);
  const eventListByDate = useMemo<IEvent[]>(() => {
    if (!selectedDate) return [];

    return eventsList[createDateKey(selectedDate.toISOString())] || [];
  }, [selectedDate, eventsList]);

  return (
    <main className={cx(s.root, className)}>
      <Container className={s.container}>
        <h1 className={s.title}>Organizer</h1>
        <Calendar onClick={handleChooseDate} events={eventsByDate(events)} />
        <Events
          date={selectedDate}
          items={eventListByDate}
          className={s.events}
        />
      </Container>
      <CreateModal />
      {/* <EditModal event={events[0]} />
      <ConfirmModal
        label={deleteLabel.current}
        acceptLabel="Remove"
        cancelLabel="Cancel"
        onAccept={() => console.log("accept")}
        onCancel={() => setIsDeleteOpen(false)}
      /> */}
    </main>
  );
};

export default Home;
