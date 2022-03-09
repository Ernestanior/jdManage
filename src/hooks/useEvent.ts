import { useCallback, useRef } from "react";
import { Subject } from "rxjs";

const useEvent = () => {
  const { current: data$ } = useRef(new Subject<IEvent>());

  const sendMessage = useCallback(
    (type: string) => {
      data$.next({
        type,
      });
    },
    [data$]
  );

  return [data$, sendMessage] as [Subject<IEvent>, (type: string) => void];
};

export interface IEvent {
  type: string;
}

export default useEvent;
