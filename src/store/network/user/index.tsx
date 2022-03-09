import useBehaviorSubject from "@/hooks/useBehaviorSubject";
import userService from "./service";


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

export const useNewUserAccessLog = () => {
  return useBehaviorSubject<any>(userService.userAccessLog$);
};
export const useNewUserWhiteList = () => {
  return useBehaviorSubject<any>(userService.userAccessWhiteList$);
};

export const useNewUserLogin = () => {
  return useBehaviorSubject<any>(userService.userLogin$);
};

