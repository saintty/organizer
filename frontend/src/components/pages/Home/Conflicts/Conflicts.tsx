import { IEvent } from "@type/event";
import { FC } from "react";

import s from "./Conflicts.module.scss";
import { convertDayToDayTime } from "@utils/date";

interface ConflictsProps {
  items: IEvent[];
}
const Conflicts: FC<ConflictsProps> = ({ items }) => {
  return items.length === 0 ? null : (
    <div className={s.root}>
      <div className={s.header}>
        <span className={s.title}>Title</span>
        <span className={s.priority}>Priority</span>
        <span className={s.time}>Time</span>
      </div>
      <ul className={s.list}>
        {items.map((item) => (
          <li className={s.item}>
            <span className={s.title}>{item.title}</span>
            <span className={s.priority}>{item.priority}</span>
            <span className={s.time}>{`${convertDayToDayTime(
              new Date(item.startTime),
              true,
              true
            )} - ${convertDayToDayTime(new Date(item.endTime), true)}`}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Conflicts;
