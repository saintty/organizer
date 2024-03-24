import {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import cx from "classnames";

import { EPriority } from "@type/event";

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
import { SubmitHandler, useForm } from "react-hook-form";
import { editEvent } from "@api/event";

interface EditModalProps {
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

const EditModal: FC<EditModalProps> = ({ className, setNeedFetch }) => {
  const { editedEvent, isEditOpen, setIsEditOpen } =
    useApplicationContext() as IApplicationContext;

  const [message, setMessage] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    setValue("title", editedEvent.title);
    setValue("description", editedEvent.description);
    setValue("priority", editedEvent.priority);
    setValue("startTime", editedEvent.startTime.substring(0, 16));
    setValue("endTime", editedEvent.endTime.substring(0, 16));
  }, [editedEvent, setValue]);

  const onSubmit: SubmitHandler<Inputs> = useCallback(
    async (data) => {
      setIsDisabled(true);

      try {
        await editEvent({ ...data, id: editedEvent.id });
        setMessage("Success edit");
        setIsError(false);
        setNeedFetch(true);

        setTimeout(() => {
          setIsEditOpen(false);
          setIsDisabled(false);
          setMessage("");
        }, 1500);
      } catch (e) {
        setMessage("Something went wrong");
        setIsError(true);
      }
    },
    [setIsEditOpen, setNeedFetch, editedEvent]
  );

  return (
    <Modal
      className={cx(s.root, className)}
      isVisible={isEditOpen}
      onClose={() => setIsEditOpen(false)}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={s.content}>
          <Input
            name="title"
            register={register}
            rules={{ required: "Required field" }}
            errors={errors}
            placeholder="Event title"
          />
          <Textarea
            name="description"
            register={register}
            rules={{ required: "Required field" }}
            errors={errors}
            placeholder="Event title"
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
                rules={{ required: "Required field" }}
              />
            </div>
          </div>
          <div className={s.priority}>
            <p className={s.priorityTitle}>Priority</p>
            <div className={s.radio}>
              <Radio
                id="ed-low"
                name="priority"
                label="Low"
                errors={errors}
                register={register}
                rules={{ required: "Required field" }}
                value={EPriority.low}
              />
              <Radio
                id="ed-medium"
                name="priority"
                label="Medium"
                errors={errors}
                register={register}
                rules={{ required: "Required field" }}
                value={EPriority.medium}
              />
              <Radio
                id="ed-high"
                name="priority"
                label="High"
                errors={errors}
                register={register}
                rules={{ required: "Required field" }}
                value={EPriority.high}
              />
            </div>
          </div>
        </div>
        {message && (
          <p className={cx(s.message, { [s.error]: isError })}>{message}</p>
        )}
        <div className={s.button}>
          <Button label="Edit event" type="submit" disabled={isDisabled} />
        </div>
      </form>
    </Modal>
  );
};

export default EditModal;
