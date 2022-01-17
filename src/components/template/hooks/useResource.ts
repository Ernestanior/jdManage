import { ITrigger } from "../interface";
import messageService from "../store/messages";
import EInfoType from "../store/messages/infoType";
import { useEffect } from "react";

/**
 * 使用资源
 */
const useResource = (id: number, trigger: ITrigger) => {
  useEffect(() => {
    const sub = messageService
      .createSubscibe(EInfoType.create_resource)
      .subscribe((info) => {
        if (info.value === id) {
          trigger();
        }
      });
    return () => sub.unsubscribe();
  }, [id, trigger]);
};

export default useResource;
