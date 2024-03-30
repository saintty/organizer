import { BaseSyntheticEvent, FC, PropsWithChildren } from "react";
import cx from "classnames";

import s from "./Form.module.scss";

interface FormProps {
  className?: string;
  title: string;
  subtitle: string;
  onSubmit: (e: BaseSyntheticEvent) => Promise<void>;
}

const Form: FC<PropsWithChildren<FormProps>> = ({
  className,
  title,
  subtitle,
  onSubmit,
  children,
}) => {
  return (
    <form className={cx(s.root, className)} onSubmit={onSubmit}>
      <h1 className={s.title}>{title}</h1>
      <h2 className={s.subtitle}>{subtitle}</h2>
      {children}
    </form>
  );
};

export default Form;
