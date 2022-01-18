import { useState } from "react";

let globalId = 1;

/**
 * 构建全局唯一事件id
 */
const useEventId = () => {
  const [id] = useState(globalId + 1);
  const [update, setUpdate] = useState(false);
  if (!update) {
    globalId++;
    setUpdate(true);
  }
  return id;
};

/**
 * 不是hook，可以保证不会重新渲染
 */
export const getEventId = () => {
  const res = globalId + 1;
  globalId++;
  return res;
};

export default useEventId;
