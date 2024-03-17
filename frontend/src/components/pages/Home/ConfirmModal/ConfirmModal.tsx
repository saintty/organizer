import { FC } from "react";
import cx from "classnames";

import {
  IApplicationContext,
  useApplicationContext,
} from "@context/ApplicationContext";

import Modal from "@components/Modal";
import Button from "@components/Button";

import s from "./ConfirmModal.module.scss";

interface ConfirmModalProps {
  className?: string;
  label: string;
  acceptLabel: string;
  cancelLabel: string;
  onAccept: () => void;
  onCancel: () => void;
}

const ConfirmModal: FC<ConfirmModalProps> = ({
  className,
  label,
  onAccept,
  onCancel,
  acceptLabel,
  cancelLabel,
}) => {
  const { isDeleteOpen } = useApplicationContext() as IApplicationContext;

  return (
    <Modal
      className={cx(s.root, className)}
      isVisible={isDeleteOpen}
      onClose={onCancel}
    >
      <div className={s.content}>
        <h3 className={s.label}>{label}</h3>
        <div className={s.buttons}>
          <Button label={acceptLabel} onClick={onAccept} />
          <Button label={cancelLabel} onClick={onCancel} />
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
