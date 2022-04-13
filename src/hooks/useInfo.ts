import accountService from "@/store/network/account/service";
import { useEffect, useState } from "react";

/** 用户类型 */
export enum IUserType {
  CUSTOMER = "customer",
  ADMIN = "admin",
  AGENT = "agent",
  SUPPORT = "supporter",
  SALE = "sales",
  SALE_MANAGER = "sales_manager",
  OPERATION = "operation",
}
/** 子账号系统类型 */
export enum IUserSubType {
  SUPERADMIN = "superadmin",
  ADMIN = "admin",
  EDITOR = "operator",
  VIWER = "viewer",
}
/**
 * 获取用户信息
 */
const useLoginInfo = () => {
  const [info, setInfo] = useState(accountService.userInfo$.value);
  useEffect(() => {
    const sub = accountService.userInfo$.subscribe((_info: any) => {
      setInfo(_info);
    });
    return () => sub.unsubscribe();
  }, []);

  return info;
};

export default useLoginInfo;
