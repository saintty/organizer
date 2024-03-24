import { FC, useCallback, useState } from "react";
import cx from "classnames";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

import { authUser } from "@api/user";
import { setToken } from "@utils/token";

import Button from "@components/Button";
import Input from "@components/Input";
import Form from "@components/Form";

import s from "./Authorization.module.scss";

interface AuthorizationPageProps {
  className?: string;
}

type Inputs = {
  email: string;
  password: string;
};

const AuthorizationPage: FC<AuthorizationPageProps> = ({ className }) => {
  const [requestResultMessage, setRequestResultMessage] = useState<string>("");
  const [isRequestOk, setIsRequestOk] = useState<boolean>(false);
  const [isDisable, setIsDisable] = useState<boolean>(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = useCallback(
    async (data) => {
      setIsDisable(true);

      try {
        const response = await authUser({
          password: data.password,
          email: data.email,
        });
        setToken(response.data.user.token);

        setIsRequestOk(true);
        setRequestResultMessage("Welcome!");
        setTimeout(() => {
          navigate("/");
          setIsDisable(false);
        }, 1500);
      } catch (e) {
        setIsRequestOk(false);
        setIsDisable(false);
        setRequestResultMessage(
          "Something wen`t wrong, check your credentials and try again"
        );
      }
    },
    [navigate]
  );

  return (
    <section className={cx(s.root, className)}>
      <Form
        title="Organizer"
        subtitle="Authorization"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          name="email"
          placeholder="Enter your email"
          register={register}
          rules={{
            required: "Required field",
            pattern: {
              value: /^[A-Z0-9._]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i,
              message: "Incorrect email format",
            },
          }}
          errors={errors}
        />
        <Input
          name="password"
          type="password"
          placeholder="Enter your password"
          register={register}
          rules={{
            required: "Required field",
            minLength: {
              value: 8,
              message: "The minimum password length is 8 characters",
            },
          }}
          errors={errors}
        />
        <div className={s.buttons}>
          <Button
            label="Login"
            type="submit"
            className={s.button}
            disabled={isDisable}
          />
          <Link to="/register">
            <Button
              label="To Register"
              className={s.button}
              disabled={isDisable}
            />
          </Link>
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

export default AuthorizationPage;
