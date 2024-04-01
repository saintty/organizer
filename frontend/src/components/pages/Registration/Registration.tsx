import { FC, useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import cx from "classnames";
import { useForm, SubmitHandler } from "react-hook-form";

import { regUser } from "@api/user";

import Button from "@components/Button";
import Input from "@components/Input";
import Form from "@components/Form";

import s from "./Registration.module.scss";

interface RegistrationPageProps {
  className?: string;
}

type Inputs = {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

const RegistrationPage: FC<RegistrationPageProps> = ({ className }) => {
  const [requestResultMessage, setRequestResultMessage] = useState<string>("");
  const [isRequestOk, setIsRequestOk] = useState<boolean>(false);
  const [isDisable, setIsDisable] = useState<boolean>(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = useCallback(
    async (data) => {
      if (data.password !== data.passwordConfirmation) {
        setError("passwordConfirmation", {
          type: "value",
          message: "Should be the same with previous field",
        });
      } else {
        setIsDisable(true);
        try {
          await regUser({
            username: data.username,
            password: data.password,
            email: data.email,
          });

          setIsRequestOk(true);
          setRequestResultMessage("Success register");
          setTimeout(() => {
            navigate("/"), setIsDisable(false);
          }, 1500);
        } catch (e) {
          setIsRequestOk(false);
          setIsDisable(false);
          setRequestResultMessage(
            "Something wen`t wrong, check your data and try again"
          );
        }
      }
    },
    [setError, navigate]
  );

  return (
    <section className={cx(s.root, className)}>
      <Form
        title="Organizer"
        subtitle="Registration"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          placeholder="Enter your username"
          errors={errors}
          name="username"
          register={register}
          rules={{
            required: "Required field",
          }}
        />
        <Input
          placeholder="Enter your email"
          type="email"
          errors={errors}
          name="email"
          register={register}
          rules={{
            required: "Required field",
            pattern: {
              value: /^[A-Z0-9._]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i,
              message: "Incorrect email format",
            },
          }}
        />
        <Input
          placeholder="Enter your password"
          type="password"
          errors={errors}
          name="password"
          register={register}
          rules={{
            required: "Required field",
            minLength: {
              value: 8,
              message: "The minimum password length is 8 characters",
            },
          }}
        />
        <Input
          placeholder="Enter your password again"
          type="password"
          errors={errors}
          name="passwordConfirmation"
          register={register}
          rules={{
            required: "Required field",
          }}
        />
        <div className={s.buttons}>
          <Link to="/auth">
            <Button
              label="To Login"
              className={s.button}
              disabled={isDisable}
            />
          </Link>
          <Button
            label="Register"
            type="submit"
            className={s.link}
            disabled={isDisable}
          />
        </div>
        {requestResultMessage && (
          <p className={cx(s.message, { [s.error]: !isRequestOk })}>
            {requestResultMessage}
          </p>
        )}
      </Form>
    </section>
  );
};

export default RegistrationPage;
