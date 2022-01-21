import useBehaviorSubject from "@/hooks/useBehaviorSubject"
import { IUserInfo, IUserList } from "./interface";
import userService from "./service";

const useUserInfo = () => {
    return useBehaviorSubject<IUserList>(userService.userList$);
}
export const useNewUserInfo = () => {
    return useBehaviorSubject<IUserList>(userService.userInfo$);
}
export default useUserInfo;