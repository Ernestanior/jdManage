import { ITrigger } from "../interface";
import { useCallback, useState } from "react";

const useVisible = () => {
  const [visible, setVisible] = useState(false);

  const switchEvent = useCallback(() => {
    setVisible((vi) => !vi);
  }, []);

  return [visible, switchEvent] as [boolean, ITrigger];
};

export default useVisible;
