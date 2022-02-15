import useBehaviorSubject from "@/hooks/useBehaviorSubject";
import platformManage from "./service";

export const usePlatformManage = ()=>{
    return useBehaviorSubject<any>(platformManage.platformManageSupplierList$);  
};

export const useSupplierInfo =  ()=>{
    return useBehaviorSubject<any>(platformManage.platformManangeSupplierInfo$);
}