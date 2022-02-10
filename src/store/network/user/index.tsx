import useBehaviorSubject from "@/hooks/useBehaviorSubject";
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

export const useWorkLog = () => {
  return useBehaviorSubject<any>(userService.userLogDetail$);
};

export const useNewUserInfo = () => {
  return useBehaviorSubject<any>(userService.userInfo$);
};

export const useNewDeleteWorklog = () => {
  return useBehaviorSubject<any>(userService.userDeleteWorkLog$);
};

export const useNewAccountView = () => {
  return useBehaviorSubject<any>(userService.userAccountView$);
};
export const useNewChangePassword = () => {
  return useBehaviorSubject<any>(userService.userChangePassword$);
};

export const useNewUserAccessLog = () => {
  return useBehaviorSubject<any>(userService.userAccessLog$);
};
export const useNewUserWhiteList = () => {
  return useBehaviorSubject<any>(userService.userAccessWhiteList$);
};

//export const newUserInfoStream = new BehaviorSubject<any>(null);
