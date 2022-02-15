import useBehaviorSubject from "@/hooks/useBehaviorSubject";
import userManage from "./service";

export const useUserManage = ()=>{
    return useBehaviorSubject<any>(userManage.userManageCustomerList$);  
};