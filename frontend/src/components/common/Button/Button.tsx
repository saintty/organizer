import { ButtonHTMLAttributes, FC } from "react";
import cx from "classnames";

import s from "./Button.module.scss";

interface ButtonProps {
  className?: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({
  className,
  label,
  onClick,
  type,
  disabled,
}) => {
  return (
    <button
      className={cx(s.root, className)}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
