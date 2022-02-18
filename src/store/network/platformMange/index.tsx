import useBehaviorSubject from "@/hooks/useBehaviorSubject";
import { platformManageApi } from "@/store/api";
import platformManage from "./service";

export const usePlatformManage = ()=>{
    return useBehaviorSubject<any>(platformManage.platformManageSupplierList$);  
};

export const useSupplierInfo =  ()=>{
    return useBehaviorSubject<any>(platformManage.platformManangeSupplierInfo$);
}

export const useViewSupplierAccount = ()=>{
    return useBehaviorSubject<any>(platformManage.platformManageSupplierAccountView$);
}