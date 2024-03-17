import { FC, PropsWithChildren } from "react";
import cx from "classnames";

import s from "./Container.module.scss";

interface ContainerProps {
  className?: string;
}

const Container: FC<PropsWithChildren<ContainerProps>> = ({
  className,
  children,
}) => {
  return <div className={cx(s.root, className)}>{children}</div>;
};

export default Container;
