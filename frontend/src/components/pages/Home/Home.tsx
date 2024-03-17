import { FC, useCallback, useMemo, useState } from "react";
import cx from "classnames";

import { IEvent, TEventMap } from "@type/event";

import { createDateKey, eventsByDate } from "@utils/calendar";

import Container from "@components/Container";
import Events from "./Events";
import Calendar from "./Calendar";

import { events } from "@stub/events";

import s from "./Home.module.scss";
import EditModal from "./EditModal";

interface HomeProps {
  className?: string;
}

const Home: FC<HomeProps> = ({ className }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleChooseDate = useCallback(
    (date: Date) => setSelectedDate(date),
    []
  );

  const eventsList = useMemo<TEventMap>(() => eventsByDate(events), []);
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
      <EditModal event={events[0]} />
    </main>
  );
};

export default Home;
