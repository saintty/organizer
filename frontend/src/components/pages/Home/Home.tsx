import { FC, useCallback, useState } from "react";
import cx from "classnames";

import Container from "@components/Container";
import Events from "./Events";

import { events } from "@stub/events";

import s from "./Home.module.scss";
import Calendar from "./Calendar";

interface HomeProps {
  className?: string;
}

const Home: FC<HomeProps> = ({ className }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleChooseDate = useCallback(
    (date: Date) => setSelectedDate(date),
    []
  );
  return (
    <main className={cx(s.root, className)}>
      <Container className={s.container}>
        <h1 className={s.title}>Organizer</h1>
        <Calendar onClick={handleChooseDate} />
        <Events date={selectedDate} items={events} className={s.events} />
      </Container>
    </main>
  );
};

export default Home;
