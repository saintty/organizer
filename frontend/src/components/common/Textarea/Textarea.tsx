import cx from "classnames";
import {
  DeepMap,
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

import s from "./Textarea.module.scss";

interface TextareaProps<T extends FieldValues> {
  className?: string;
  placeholder?: string;
  name: Path<T>;
  rules?: RegisterOptions;
  register?: UseFormRegister<T>;
  errors?: Partial<DeepMap<T, FieldError>>;
}

const Textarea = <T extends FieldValues>({
  className,
  placeholder,
  name,
  errors,
  register,
  rules,
}: TextareaProps<T>) => {
  return (
    <div className={s.wrapper}>
      <textarea
        {...(register && register(name, rules))}
        className={cx(s.root, className, {
          [s.invalid]: errors && errors[name]?.message,
        })}
        placeholder={placeholder}
        name={name}
      />
      {errors && errors[name]?.message && (
        <span className={s.error}>{errors[name]?.message}</span>
      )}
    </div>
  );
};

export default Textarea;
