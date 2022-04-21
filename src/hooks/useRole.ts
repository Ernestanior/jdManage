import useUserInfo from "@/hooks/useInfo";
import { useCallback } from "react";

const useRole = () => {
  const info = useUserInfo();

  const auth = useCallback(
    (el: any, authList?: number[]) => {
      if (!authList) {
        return el;
      }
      if (!info) {
        return null;
      }
      // 如果当前客户为admin，开放所有操作权限
      if (info.level === 1) {
        return el;
      }
      return authList.includes(info.level) ? el : null;
    },
    [info]
  );

  return auth;
};

export default useRole;
