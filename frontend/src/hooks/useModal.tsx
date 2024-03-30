import { useCallback } from "react";

const useModal = () => {
  const paddingOffset: string =
    window.innerWidth - document.body.offsetWidth + "px";

  const enableScroll = useCallback(() => {
    document.body.style.overflowY = "";
    document.body.style.paddingRight = "";
  }, []);

  const disableScroll = useCallback(() => {
    document.body.style.overflowY = "hidden";
    document.body.style.paddingRight = paddingOffset;
  }, [paddingOffset]);

  return {
    enableScroll,
    disableScroll,
  };
};

export default useModal;
