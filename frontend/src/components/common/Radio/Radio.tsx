import cx from "classnames";

import s from "./Radio.module.scss";
import {
  DeepMap,
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import { EPriority } from "@type/event";

interface RadioProps<T extends FieldValues> {
  className?: string;
  id: string;
  label: string;
  value: EPriority;
  name: Path<T>;
  rules?: RegisterOptions;
  register?: UseFormRegister<T>;
  errors?: Partial<DeepMap<T, FieldError>>;
}

const Radio = <T extends FieldValues>({
  id,
  className,
  name,
  value,
  label,
  errors,
  register,
  rules,
}: RadioProps<T>) => {
  return (
    <div className={cx(s.root, className)}>
      <input
        id={id}
        className={s.input}
        type="radio"
        value={value}
        {...(register && register(name, rules))}
      />
      <label
        className={cx(s.label, {
          [s.invalid]: errors && errors[name]?.message,
        })}
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};

export default Radio;
