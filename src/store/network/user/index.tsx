import useBehaviorSubject from "@/hooks/useBehaviorSubject";
import { BehaviorSubject } from "rxjs";
import { IUserList } from "./interface";
import userService from "./service";

export const useUserInfo = () => {
  return useBehaviorSubject<IUserList>(userService.userList$);
};
export const useCodeList = () => {
    return useBehaviorSubject<any>(userService.userWorkLogCodeList$);
  };
  export const useEventList = () => {
    return useBehaviorSubject<any>(userService.userWorkLogEventList$);
  };

export const useNewUserInfo = () => {
  return useBehaviorSubject<any>(userService.userInfo$);
};
//export const newUserInfoStream = new BehaviorSubject<any>(null);
