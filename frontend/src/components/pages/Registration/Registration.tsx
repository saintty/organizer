import { ChangeEvent, FC, useCallback, useState } from "react";
import cx from "classnames";

import Button from "@components/Button";
import Input from "@components/Input";
import Form from "@components/Form";

import s from "./Registration.module.scss";

interface RegistrationPageProps {
  className?: string;
}

const RegistrationPage: FC<RegistrationPageProps> = ({ className }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");

  const handleEmailChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value),
    []
  );

  const handlePasswordChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value),
    []
  );

  const handlePasswordConfirmationChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      setPasswordConfirmation(e.target.value),
    []
  );

  return (
    <section className={cx(s.root, className)}>
      <Form title="Organizer" subtitle="Registration">
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
        <Input
          value={passwordConfirmation}
          onChange={handlePasswordConfirmationChange}
          placeholder="Enter your password again"
        />
        <Button
          label="Register"
          onClick={() => console.log(email, password, passwordConfirmation)}
        />
      </Form>
    </section>
  );
};

export default RegistrationPage;
