import { FC, useCallback, useEffect, useMemo, useState } from "react";
import cx from "classnames";
import { useNavigate } from "react-router-dom";

import { IEvent, TEventMap } from "@type/event";

import { deleteEvent, getEvents } from "@api/event";
import { createDateKey, eventsByDate } from "@utils/calendar";
import { clearUserData } from "@utils/token";
import { normalize } from "@utils/event";

import {
  IApplicationContext,
  useApplicationContext,
} from "@context/ApplicationContext";

import Container from "@components/Container";
import Events from "./Events";
import Calendar from "./Calendar";
import EditModal from "./EditModal";
import CreateModal from "./CreateModal";
import ConfirmModal from "./ConfirmModal";
import Logout from "@components/Logout";

import s from "./Home.module.scss";
import { AxiosError } from "axios";

interface HomeProps {
  className?: string;
}

const Home: FC<HomeProps> = ({ className }) => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [needFetch, setNeedFetch] = useState<boolean>(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [message, setMessage] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const { deleteLabel, setIsDeleteOpen, deleteId } =
    useApplicationContext() as IApplicationContext;

  const navigate = useNavigate();

  const handleChooseDate = useCallback(
    (date: Date) => setSelectedDate(date),
    []
  );

  useEffect(() => {
    if (needFetch) {
      const fetchEvent = async () => {
        try {
          const response = await getEvents();

          setEvents(response.data.map(normalize));
          setNeedFetch(false);
        } catch (e: unknown) {
          if (e instanceof AxiosError) {
            const errorMessage = e.response?.data.detail;

            if (
              errorMessage ===
              "Authentication error. The token cannot be decoded"
            ) {
              clearUserData();
              navigate("/");
            }
          }
        }
      };

      fetchEvent();
    }
  }, [navigate, needFetch, setNeedFetch]);

  const eventsList = useMemo<TEventMap>(() => eventsByDate(events), [events]);
  const eventListByDate = useMemo<IEvent[]>(() => {
    if (!selectedDate) return [];

    return eventsList[createDateKey(selectedDate)] || [];
  }, [selectedDate, eventsList]);

  const handleDelete = useCallback(async () => {
    setIsDisabled(true);
    try {
      await deleteEvent(deleteId);

      setMessage("Success delete");
      setIsError(false);
      setNeedFetch(true);

      setTimeout(() => {
        setIsDeleteOpen(false);
        setIsDisabled(false);

        setMessage("");
      }, 1500);
    } catch (e) {
      setMessage("Something went wrong");
      setIsError(true);
    }
  }, [deleteId, setIsDeleteOpen]);

  return (
    <main className={cx(s.root, className)}>
      <Logout />
      <Container className={s.container}>
        <h1 className={s.title}>Organizer</h1>
        <Calendar onClick={handleChooseDate} events={eventsByDate(events)} />
        <Events
          date={selectedDate}
          items={eventListByDate}
          className={s.events}
        />
      </Container>
      <CreateModal setNeedFetch={setNeedFetch} />
      <EditModal setNeedFetch={setNeedFetch} />

      <ConfirmModal
        label={deleteLabel.current}
        acceptLabel="Remove"
        cancelLabel="Cancel"
        onAccept={handleDelete}
        onCancel={() => setIsDeleteOpen(false)}
        isDisabled={isDisabled}
        message={message}
        isError={isError}
      />
    </main>
  );
};

export default Home;
