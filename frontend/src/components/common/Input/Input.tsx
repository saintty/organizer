import { HTMLInputTypeAttribute } from "react";
import cx from "classnames";
import {
  DeepMap,
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

import s from "./Input.module.scss";

interface InputProps<T extends FieldValues> {
  className?: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  name: Path<T>;
  rules?: RegisterOptions;
  register?: UseFormRegister<T>;
  errors?: Partial<DeepMap<T, FieldError>>;
}

const Input = <T extends FieldValues>({
  className,
  placeholder = "",
  type,
  name,
  errors,
  register,
  rules,
}: InputProps<T>) => {
  return (
    <div className={s.wrapper}>
      <input
        {...(register && register(name, rules))}
        className={cx(s.root, className, {
          [s.invalid]: errors && errors[name]?.message,
        })}
        placeholder={placeholder}
        type={type}
      />
      {errors && errors[name]?.message && (
        <span className={s.error}>{errors[name]?.message}</span>
      )}
    </div>
  );
};

export default Input;
