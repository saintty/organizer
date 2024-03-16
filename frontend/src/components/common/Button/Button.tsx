import { FC } from "react";
import cx from "classnames";

import s from "./Button.module.scss";

interface ButtonProps {
  className?: string;
  label: string;
  onClick: () => void;
}

const Button: FC<ButtonProps> = ({ className, label, onClick }) => {
  return (
    <button className={cx(s.root, className)} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
