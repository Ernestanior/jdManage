import useLoginInfo, { IUserType } from "@/hooks/useInfo";
import { useCallback } from "react";

const useRole = () => {
  const info = useLoginInfo();

  const auth = useCallback(
    (el: any, authList?: IUserType[]) => {
      if (!authList) {
        return el;
      }
      if (!info) {
        return null;
      }
      // 如果当前客户为admin，开放所有操作权限
      if (info.userType === IUserType.ADMIN) {
        return el;
      }
      return authList.includes(info.userType) ? el : null;
    },
    [info]
  );

  return auth;
};

export default useRole;
