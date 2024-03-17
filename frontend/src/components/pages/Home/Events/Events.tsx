import { FC } from "react";
import cx from "classnames";

import { IEvent } from "@type/event";

import { convertPeriodToDayPart, convertTimeMonthPart } from "@utils/date";

import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";

import s from "./Events.module.scss";

interface EventsProps {
  className?: string;
  date: Date | null;
  items: IEvent[];
}

const Events: FC<EventsProps> = ({ className, date, items }) => {
  return (
    date && (
      <section className={cx(s.root, className)}>
        <h2 className={s.title}>{date && convertTimeMonthPart(date)}</h2>
        {items.length > 0 ? (
          <ul className={s.list}>
            {items.map((item: IEvent) => (
              <li className={s.event} key={item.id}>
                <div className={s.top}>
                  <div className={s.left}>
                    <h3 className={s.eventTitle}>
                      {item.title}
                      <span className={s.priority}>
                        Priority: {item.priority}
                      </span>
                    </h3>
                    <div className={s.time}>
                      Time:{" "}
                      {convertPeriodToDayPart(item.startTime, item.endTime)}
                    </div>
                  </div>
                  <div className={s.right}>
                    <button className={s.button} onClick={() => {}}>
                      <MdOutlineEdit size={25} />
                    </button>
                    <button className={s.button}>
                      <MdDeleteOutline size={25} />
                    </button>
                  </div>
                </div>
                <p className={s.description}>{item.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <h2 className={s.empty}> Empty Date</h2>
        )}
      </section>
    )
  );
};

export default Events;
