import { FC, useCallback, useState } from "react";
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

import { createEvent } from "@api/event";

import s from "./CreateModal.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";

interface CreateModalProps {
  className?: string;
}

const emptyEvent: Omit<IEvent, "id"> = {
  title: "",
  description: "",
  startTime: "",
  endTime: "",
  priority: EPriority.medium,
};

type Inputs = {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  priority: EPriority;
};

const CreateModal: FC<CreateModalProps> = ({ className }) => {
  const { isCreateOpen, setIsCreateOpen } =
    useApplicationContext() as IApplicationContext;
  const [newEvent, setNewEvent] = useState<Omit<IEvent, "id">>({
    ...emptyEvent,
  });
  const [message, setMessage] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = useCallback(
    async (data) => {
      try {
        await createEvent(data);
        setMessage("Something went wrong");
        setIsError(false);

        setTimeout(() => {
          setNewEvent({ ...emptyEvent });
          setIsCreateOpen(false);
        }, 1500);
      } catch (e) {
        setMessage("Something went wrong");
        setIsError(true);
      } finally {
        setIsDisabled(false);
      }
    },
    [setIsCreateOpen]
  );

  return (
    <Modal
      className={cx(s.root, className)}
      isVisible={isCreateOpen}
      onClose={() => {
        setIsCreateOpen(false);
        clearErrors();
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={s.content}>
          <Input
            name="title"
            errors={errors}
            placeholder="New event title"
            register={register}
            rules={{ required: "Required field" }}
          />
          <Textarea
            name="description"
            register={register}
            errors={errors}
            rules={{
              required: "Required field",
            }}
            placeholder="New event description"
          />
          <div className={s.dates}>
            <div className={s.date}>
              <span className={s.label}>Start: </span>
              <Input
                className={s.dateField}
                type="datetime-local"
                name="startTime"
                register={register}
                errors={errors}
                rules={{ required: "Required field" }}
              />
            </div>
            <div className={s.date}>
              <span className={s.label}>End: </span>
              <Input
                className={s.dateField}
                type="datetime-local"
                name="endTime"
                register={register}
                errors={errors}
                rules={{ required: "Required field" }}
              />
            </div>
          </div>
          <div className={s.priority}>
            <p className={s.priorityTitle}>Priority</p>
            <div className={s.radio}>
              <Radio
                id="low"
                name="priority"
                label="Low"
                errors={errors}
                register={register}
                rules={{ required: "Required field" }}
                value={EPriority.low}
              />
              <Radio
                id="medium"
                name="priority"
                label="Medium"
                errors={errors}
                register={register}
                rules={{ required: "Required field" }}
                value={EPriority.medium}
              />
              <Radio
                id="high"
                name="priority"
                label="High"
                errors={errors}
                register={register}
                rules={{ required: "Required field" }}
                value={EPriority.high}
              />
              {errors.priority?.message && (
                <p className={s.error}>{errors.priority.message}</p>
              )}
            </div>
          </div>
        </div>
        {message && (
          <p className={cx(s.message, { [s.error]: isError })}>{message}</p>
        )}
        <div className={s.button}>
          <Button label="Create event" type="submit" disabled={isDisabled} />
        </div>
      </form>
    </Modal>
  );
};

export default CreateModal;
