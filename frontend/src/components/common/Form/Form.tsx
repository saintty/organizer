import { FC, PropsWithChildren } from "react";
import cx from "classnames";

import s from "./Form.module.scss";

interface FormProps {
  className?: string;
  title: string;
  subtitle: string;
}

const Form: FC<PropsWithChildren<FormProps>> = ({
  className,
  title,
  subtitle,
  children,
}) => {
  return (
    <form
      className={cx(s.root, className)}
      onSubmit={(e) => e.preventDefault()}
    >
      <h1 className={s.title}>{title}</h1>
      <h2 className={s.subtitle}>{subtitle}</h2>
      {children}
    </form>
  );
};

export default Form;
