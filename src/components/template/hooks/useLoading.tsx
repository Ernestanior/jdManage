import { useCallback, useState } from "react";
import { ITrigger } from "../interface";

const useUILoading = () => {
  const [loading, setLoading] = useState(false);

  const open = useCallback(() => {
    setLoading(true);
  }, []);

  const close = useCallback(() => {
    setLoading(false);
  }, []);

  return [loading, open, close] as [boolean, ITrigger, ITrigger];
};

export default useUILoading;
