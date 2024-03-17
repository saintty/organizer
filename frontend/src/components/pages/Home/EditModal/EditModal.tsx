import { ChangeEvent, FC, useCallback, useState } from "react";
import cx from "classnames";

import { EPriority, IEvent } from "@type/event";

import Modal from "@components/Modal";
import Input from "@components/Input";
import Button from "@components/Button";

import s from "./EditModal.module.scss";
import Textarea from "@components/Textarea";
import Radio from "@components/Radio";

interface EditModalProps {
  className?: string;
  event: IEvent;
}

const EditModal: FC<EditModalProps> = ({ className, event }) => {
  const [edited, setEdited] = useState<IEvent>({ ...event });

  const handleChangeField = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const changedValue: string =
        e.target.type === "datetime-local"
          ? e.target.value + ":00Z"
          : e.target.value;

      setEdited((prev) => ({ ...prev, [e.target.name]: changedValue }));
    },
    []
  );

  return (
    <Modal
      className={cx(s.root, className)}
      isVisible={true}
      onClose={() => {
        event.id;
      }}
    >
      <div className={s.content}>
        <Input value={edited.title} onChange={handleChangeField} name="title" />
        <Textarea
          value={edited.description}
          onChange={handleChangeField}
          name="description"
        />
        <div className={s.dates}>
          <div className={s.date}>
            <span className={s.label}>Start: </span>
            <Input
              className={s.dateField}
              value={edited.startTime.substring(0, 16)}
              onChange={handleChangeField}
              type="datetime-local"
              name="startTime"
            />
          </div>
          <div className={s.date}>
            <span className={s.label}>End: </span>
            <Input
              className={s.dateField}
              value={edited.endTime.substring(0, 16)}
              onChange={handleChangeField}
              type="datetime-local"
              name="endTime"
            />
          </div>
        </div>
        <div className={s.priority}>
          <p className={s.priorityTitle}>Priority</p>
          <div className={s.radio}>
            <Radio
              id="low"
              onChange={handleChangeField}
              value={EPriority.low}
              name="priority"
              label="Low"
            />
            <Radio
              id="medium"
              onChange={handleChangeField}
              value={EPriority.medium}
              name="priority"
              label="Medium"
            />
            <Radio
              id="high"
              onChange={handleChangeField}
              value={EPriority.high}
              name="priority"
              label="High"
            />
          </div>
        </div>
      </div>
      <div className={s.button}>
        <Button label="Edit" onClick={() => console.log(edited)} />
      </div>
    </Modal>
  );
};

export default EditModal;
