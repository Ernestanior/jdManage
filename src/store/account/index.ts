import useBehaviorSubject from "@/hooks/useBehaviorSubject"
import accountService from "./service";
import {IAccountInfo} from "./interface";

const useAccountInfo = () => {
    return useBehaviorSubject<IAccountInfo>(accountService.info$);
}

export default useAccountInfo;
