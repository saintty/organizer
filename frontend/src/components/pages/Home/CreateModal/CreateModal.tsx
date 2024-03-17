import { ChangeEvent, FC, useCallback, useState } from "react";
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

import s from "./CreateModal.module.scss";

interface CreateModalProps {
  className?: string;
}

const CreateModal: FC<CreateModalProps> = ({ className }) => {
  const { isCreateOpen, setIsCreateOpen } =
    useApplicationContext() as IApplicationContext;
  const [newEvent, setNewEvent] = useState<Omit<IEvent, "id">>({
    title: "",
    description: "",
    startTime: "",
    endTime: "",
    priority: EPriority.medium,
  });

  const handleChangeField = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const changedValue: string =
        e.target.type === "datetime-local"
          ? e.target.value + ":00Z"
          : e.target.value;

      setNewEvent((prev) => ({ ...prev, [e.target.name]: changedValue }));
    },
    [setNewEvent]
  );

  const handleToggleRadio = useCallback(
    (value: EPriority) => setNewEvent((prev) => ({ ...prev, priority: value })),
    []
  );

  const handleCreate = () => {
    console.log(newEvent);
  };

  return (
    <Modal
      className={cx(s.root, className)}
      isVisible={isCreateOpen}
      onClose={() => setIsCreateOpen(false)}
    >
      <div className={s.content}>
        <Input
          value={newEvent.title}
          onChange={handleChangeField}
          name="title"
        />
        <Textarea
          value={newEvent.description}
          onChange={handleChangeField}
          name="description"
        />
        <div className={s.dates}>
          <div className={s.date}>
            <span className={s.label}>Start: </span>
            <Input
              className={s.dateField}
              value={newEvent.startTime.substring(0, 16)}
              onChange={handleChangeField}
              type="datetime-local"
              name="startTime"
            />
          </div>
          <div className={s.date}>
            <span className={s.label}>End: </span>
            <Input
              className={s.dateField}
              value={newEvent.endTime.substring(0, 16)}
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
              value={EPriority.low}
              onChange={handleChangeField}
              onClick={handleToggleRadio}
              name="priority"
              label="Low"
              checked={newEvent.priority === EPriority.low}
            />
            <Radio
              id="medium"
              onChange={handleChangeField}
              onClick={handleToggleRadio}
              value={EPriority.medium}
              name="priority"
              label="Medium"
              checked={newEvent.priority === EPriority.medium}
            />
            <Radio
              id="high"
              onChange={handleChangeField}
              onClick={handleToggleRadio}
              value={EPriority.high}
              name="priority"
              label="High"
              checked={newEvent.priority === EPriority.high}
            />
          </div>
        </div>
      </div>
      <div className={s.button}>
        <Button label="Edit" onClick={handleCreate} />
      </div>
    </Modal>
  );
};

export default CreateModal;
