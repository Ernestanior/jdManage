import useBehaviorSubject from "@/hooks/useBehaviorSubject";
import userService from "./service";

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
