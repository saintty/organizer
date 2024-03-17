import { ChangeEvent, FC, HTMLInputTypeAttribute } from "react";
import cx from "classnames";

import s from "./Input.module.scss";

interface InputProps {
  className?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  name?: string;
}

const Input: FC<InputProps> = ({
  className,
  value,
  onChange,
  placeholder = "",
  type,
  name,
}) => {
  return (
    <input
      className={cx(s.root, className)}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      type={type}
      name={name}
    />
  );
};

export default Input;
