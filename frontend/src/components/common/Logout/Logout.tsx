import cx from "classnames";
import { FC, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { clearUserData } from "@utils/token";

import { MdOutlineLogout } from "react-icons/md";

import s from "./Logout.module.scss";

interface LogoutProps {
  className?: string;
}

const Logout: FC<LogoutProps> = ({ className }) => {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    clearUserData();
    navigate("/auth");
  }, [navigate]);

  return (
    <div className={cx(s.root, className)} onClick={handleClick}>
      <p className={s.label}>Exit</p>
      <button className={s.button}>
        <MdOutlineLogout />
      </button>
    </div>
  );
};

export default Logout;
