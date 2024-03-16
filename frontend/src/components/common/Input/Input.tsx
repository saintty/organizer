import { ChangeEvent, FC } from "react";
import cx from "classnames";

import s from "./Input.module.scss";

interface InputProps {
  className?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const Input: FC<InputProps> = ({ className, value, onChange, placeholder }) => {
  return (
    <input
      className={cx(s.root, className)}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
