import { ITrigger } from "../interface";
import { useCallback, useState } from "react";

const useOpen = () => {
  const [visible, setVisible] = useState(false);

  const open = useCallback(() => {
    setVisible(true);
  }, []);

  const close = useCallback(() => {
    setVisible(false);
  }, []);

  return [visible, open, close] as [boolean, ITrigger, ITrigger];
};

export default useOpen;
