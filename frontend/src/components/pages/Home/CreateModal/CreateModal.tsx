import {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import cx from "classnames";
import { SubmitHandler, useForm } from "react-hook-form";

import { ApiEvent, EPriority, IEvent } from "@type/event";

import {
  IApplicationContext,
  useApplicationContext,
} from "@context/ApplicationContext";

import { createEvent } from "@api/event";

import Modal from "@components/Modal";
import Input from "@components/Input";
import Button from "@components/Button";
import Textarea from "@components/Textarea";
import Radio from "@components/Radio";

import s from "./CreateModal.module.scss";
import axios from "axios";
import { normalize } from "@utils/event";
import Conflicts from "../Conflicts";

interface CreateModalProps {
  className?: string;
  setNeedFetch: Dispatch<SetStateAction<boolean>>;
}

type Inputs = {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  priority: EPriority;
};

const CreateModal: FC<CreateModalProps> = ({ className, setNeedFetch }) => {
  const { isCreateOpen, setIsCreateOpen } =
    useApplicationContext() as IApplicationContext;
  const [message, setMessage] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [conflicts, setConflicts] = useState<IEvent[]>([]);

  const {
    register,
    handleSubmit,
    clearErrors,
    watch,
    setError,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    if (!isCreateOpen) {
      reset();
      setConflicts([]);
      setIsError(false);
      setMessage("");
    }
  }, [isCreateOpen, reset]);

  const onSubmit: SubmitHandler<Inputs> = useCallback(
    async (data) => {
      setIsDisabled(true);
      if (data.startTime === data.endTime) {
        setError("startTime", {
          type: "value",
          message: "Can`t be equal",
        });
        setError("endTime", {
          type: "value",
          message: "Can`t be equal",
        });

        setIsDisabled(false);
        setIsError(false);
        setMessage("");
        return;
      }

      try {
        await createEvent(data);
        setMessage("Success create");
        setIsError(false);
        setNeedFetch(true);

        setTimeout(() => {
          setIsCreateOpen(false);
          setIsDisabled(false);

          setMessage("");
        }, 1500);
      } catch (e) {
        setIsDisabled(false);

        if (axios.isAxiosError(e)) {
          const data = e.response?.data;

          setIsError(true);
          setMessage(data.error);
          setConflicts(data.events.map((item: ApiEvent) => normalize(item)));
        } else {
          setMessage("Something went wrong");
          setIsError(true);
        }
      }
    },
    [setIsCreateOpen, setNeedFetch, setError]
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
                rules={{
                  required: "Required field",
                  max: {
                    value: watch("endTime"),
                    message: "Should be less then end-time",
                  },
                }}
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
                rules={{
                  required: "Required field",
                }}
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
        <Conflicts items={conflicts} />
      </form>
    </Modal>
  );
};

export default CreateModal;
