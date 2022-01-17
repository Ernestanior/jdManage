import { ICallback, ITrigger } from "../interface";
import messageService from "../store/messages";
import EInfoType from "../store/messages/infoType";
import tool from "../store/tools";
import { useEffect } from "react";
import { filter } from "rxjs/operators";

const log = tool.createDebug(false, "订阅模块");
/**
 * 特定事件上订阅模块的消息[id即模块的消息]
 */
const useResourceData = (
  type: EInfoType,
  id: number,
  trigger: ITrigger | ICallback<any>
) => {
  useEffect(() => {
    log(`模块${id}开启订阅`);
    const sub = messageService
      .createSubscibe(type)
      .pipe(
        filter((info) => {
          log("分发订阅", id, info.value);
          if (info.value) {
            const ids: number | number[] = info.value.id;
            if (Array.isArray(ids)) {
              return ids.includes(id);
            }
            return ids === id;
          }
          return false;
        })
      )
      .subscribe((info) => {
        if (info.value) {
          trigger(info.value.data);
        }
      });
    return () => sub.unsubscribe();
  }, [type, id, trigger]);
};

export default useResourceData;
