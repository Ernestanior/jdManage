import { BehaviorSubject} from "rxjs";
import {IAccountInfo} from "./interface";

/**
 * 登录账户
 */
class Account{
    readonly info$ = new BehaviorSubject<IAccountInfo | null>(null);

    login(userName: string, pwd:string){
        // 登录成功之后将数据设置到info就可以触发登录信息的更新
        this.info$.next({
            userName
        })
    }
}


const accountService = new Account();

export default accountService;
