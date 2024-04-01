import { FC, PropsWithChildren, useEffect } from "react";
import cx from "classnames";

import useModal from "@hooks/useModal";

import { MdOutlineClose } from "react-icons/md";
import Container from "@components/Container";

import s from "./Modal.module.scss";

interface ModalProps {
  className?: string;
  isVisible: boolean;
  onClose: () => void;
}

const Modal: FC<PropsWithChildren<ModalProps>> = ({
  className,
  isVisible,
  onClose,
  children,
}) => {
  const { enableScroll, disableScroll } = useModal();

  useEffect(() => {
    if (isVisible) {
      disableScroll();
    } else {
      enableScroll();
    }
  }, [enableScroll, disableScroll, isVisible]);

  return (
    <div className={cx(s.root, className, { [s.visible]: isVisible })}>
      <Container>
        <div className={s.modal}>
          <div className={s.header}>
            <button className={s.close} onClick={onClose}>
              <MdOutlineClose size={30} />
            </button>
          </div>
          <div className={s.content}>{children}</div>
        </div>
      </Container>
    </div>
  );
};

export default Modal;
