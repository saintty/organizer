import { ChangeEvent, FC, useCallback, useState } from "react";
import cx from "classnames";

import Button from "@components/Button";
import Input from "@components/Input";
import Form from "@components/Form";

import s from "./Authorization.module.scss";
import { Link } from "react-router-dom";

interface AuthorizationPageProps {
  className?: string;
}

const AuthorizationPage: FC<AuthorizationPageProps> = ({ className }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleEmailChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value),
    []
  );

  const handlePasswordChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value),
    []
  );

  return (
    <section className={cx(s.root, className)}>
      <Form title="Organizer" subtitle="Authorization">
        <Input
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter your email"
        />
        <Input
          value={password}
          onChange={handlePasswordChange}
          placeholder="Enter your password"
        />
        <div className={s.buttons}>
          <Button
            label="Login"
            onClick={() => console.log(email, password)}
            className={s.button}
          />
          <Link to="/register">
            <Button
              label="Register"
              onClick={() => console.log(email, password)}
              className={s.button}
            />
          </Link>
        </div>
      </Form>
    </section>
  );
};

export default AuthorizationPage;
