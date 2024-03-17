import { ChangeEvent, FC, useCallback, useEffect } from "react";
import cx from "classnames";

import { EPriority, IEvent } from "@type/event";

import {
  IApplicationContext,
  useApplicationContext,
} from "@context/ApplicationContext";

import Modal from "@components/Modal";
import Input from "@components/Input";
import Button from "@components/Button";
import Textarea from "@components/Textarea";
import Radio from "@components/Radio";

import s from "./EditModal.module.scss";

interface EditModalProps {
  className?: string;
  event: IEvent;
}

const EditModal: FC<EditModalProps> = ({ className, event }) => {
  const { editedEvent, setEditedEvent, isEditOpen, setIsEditOpen } =
    useApplicationContext() as IApplicationContext;

  useEffect(() => setEditedEvent({ ...event }), [event, setEditedEvent]);

  const handleChangeField = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const changedValue: string =
        e.target.type === "datetime-local"
          ? e.target.value + ":00Z"
          : e.target.value;

      setEditedEvent((prev) => ({ ...prev, [e.target.name]: changedValue }));
    },
    [setEditedEvent]
  );

  return (
    <Modal
      className={cx(s.root, className)}
      isVisible={isEditOpen}
      onClose={() => setIsEditOpen(false)}
    >
      <div className={s.content}>
        <Input
          value={editedEvent.title}
          onChange={handleChangeField}
          name="title"
        />
        <Textarea
          value={editedEvent.description}
          onChange={handleChangeField}
          name="description"
        />
        <div className={s.dates}>
          <div className={s.date}>
            <span className={s.label}>Start: </span>
            <Input
              className={s.dateField}
              value={editedEvent.startTime.substring(0, 16)}
              onChange={handleChangeField}
              type="datetime-local"
              name="startTime"
            />
          </div>
          <div className={s.date}>
            <span className={s.label}>End: </span>
            <Input
              className={s.dateField}
              value={editedEvent.endTime.substring(0, 16)}
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
              checked={editedEvent.priority === EPriority.low}
            />
            <Radio
              id="medium"
              onChange={handleChangeField}
              value={EPriority.medium}
              name="priority"
              label="Medium"
              checked={editedEvent.priority === EPriority.medium}
            />
            <Radio
              id="high"
              onChange={handleChangeField}
              value={EPriority.high}
              name="priority"
              label="High"
              checked={editedEvent.priority === EPriority.high}
            />
          </div>
        </div>
      </div>
      <div className={s.button}>
        <Button label="Edit" onClick={() => console.log(editedEvent)} />
      </div>
    </Modal>
  );
};

export default EditModal;
