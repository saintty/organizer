import { ChangeEvent, FC } from "react";
import cx from "classnames";

import s from "./Radio.module.scss";
import { EPriority } from "@type/event";

interface RadioProps {
  className?: string;
  id: string;
  value: EPriority;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick: (value: EPriority) => void;
  name?: string;
  label: string;
  checked?: boolean;
  defaultChecked?: boolean;
}

const Radio: FC<RadioProps> = ({
  id,
  className,
  value,
  onChange,
  onClick,
  name,
  label,
  checked,
}) => {
  return (
    <div className={cx(s.root, className)}>
      <input
        id={id}
        className={s.input}
        value={value}
        type="radio"
        name={name}
        onChange={onChange}
        checked={checked}
      />
      <label
        className={s.label}
        htmlFor={id}
        onClick={() => {
          onClick(value);
        }}
      >
        {label}
      </label>
    </div>
  );
};

export default Radio;
