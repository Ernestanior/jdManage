import { useCallback, useEffect, useMemo } from "react";
import { Subject } from "rxjs";
import { throttleTime } from "rxjs/operators";
import { ITrigger } from "../interface";

/**
 * 防止重复点击的hook，每秒最多调用一次
 * @param submit
 */
const useSubmitEvent = (submit?: ITrigger) => {
  const event$ = useMemo(() => new Subject(), []);

  useEffect(() => {
    const sub = event$.pipe(throttleTime(1000)).subscribe(() => {
      submit && submit();
    });
    return () => sub.unsubscribe();
  }, [submit, event$]);

  return useCallback(() => {
    event$.next(true);
  }, [event$]);
};

export default useSubmitEvent;
