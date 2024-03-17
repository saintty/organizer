import { ChangeEvent, FC } from "react";
import cx from "classnames";

import s from "./Radio.module.scss";

interface RadioProps {
  className?: string;
  id: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  label: string;
}

const Radio: FC<RadioProps> = ({
  id,
  className,
  value,
  onChange,
  name,
  label,
}) => {
  return (
    <div className={cx(s.root, className)}>
      <input
        id={id}
        className={s.input}
        value={value}
        onChange={onChange}
        type="radio"
        name={name}
      />
      <label className={s.label} htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

export default Radio;
