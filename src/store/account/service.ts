import { BehaviorSubject, from } from "rxjs";
import { IAccountInfo } from "./interface";
import request from "@/store/request";
import { authApi } from "@/store/api";
import { deleteUser, getUser, saveUser } from "@/store/request/token";

/**
 * 登录账户
 */
class Account {
    readonly info$ = new BehaviorSubject<any | null>(null);
    constructor() {
        const token = getUser();
        // console.log(token);
        if (token) {
            this.info$.next(token);
        }
    }
    login(username: string, password: string) {
        // 登录成功之后将数据设置到info就可以触发登录信息的更新
        from(
            request(
                authApi.Login(
                    {},
                    {
                        username,
                        password,
                    }
                )
            )
        ).subscribe((data) => {
            if (data) {
                // token存储
                const {result}=data
                // if (result.token) {
                //     saveToken(result.token);
                // }
                saveUser(result);
                this.info$.next(result);
            }
        });
    }
    logout() {
        this.info$.next(null);
        if (getUser()) {
            deleteUser();
        }
    }
}

const accountService = new Account();

export default accountService;
