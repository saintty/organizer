import { ChangeEvent, FC } from "react";
import cx from "classnames";

import s from "./Textarea.module.scss";

interface TextareaProps {
  className?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  name?: string;
}

const Textarea: FC<TextareaProps> = ({
  className,
  value,
  onChange,
  placeholder = "",
  name,
}) => {
  return (
    <textarea
      className={cx(s.root, className)}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
    />
  );
};

export default Textarea;
