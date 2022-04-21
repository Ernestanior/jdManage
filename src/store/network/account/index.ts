import useBehaviorSubject from "@/hooks/useBehaviorSubject";
import accountService from "./service";
import { IUserInfo } from "./interface";

// export const useAccountInfo = () => {
//   return useBehaviorSubject<IAccountInfo>(accountService.info$);
// };
export const useUserInfo = () => {
  return useBehaviorSubject<IUserInfo>(accountService.userInfo$);
};
