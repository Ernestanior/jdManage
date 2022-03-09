import { BehaviorSubject, from } from "rxjs";
import { IAccountInfo, IUserInfo } from "./interface";
import request from "@/store/request";
import { authApi } from "@/store/api";
import { deleteToken, getToken, saveToken } from "@/store/storage";

/**
 * 登录账户
 */
class Account {
  readonly info$ = new BehaviorSubject<IAccountInfo | null>(null);
  readonly userInfo$ = new BehaviorSubject<IUserInfo | null>(null);

  constructor() {
    const token = getToken();
    if (token) {
      this.info$.next(token);
    }
  }
  login(username: string, password: string) {
    // 登录成功之后将数据设置到info就可以触发登录信息的更新
    from(request(authApi.Login({ username, password }), true)).subscribe(
      (data) => {
        // token存储
        if (data && data.response === "success") {
          if (data.result) {
            saveToken(data.result.token);
            this.info$.next(data.result);
          }
        }
      }
    );
  }
  logout(data: {}) {
    from(request(authApi.Logout(data))).subscribe((data) => {
      if (data) {
        this.info$.next(null);
        if (getToken()) {
          deleteToken();
        }
      }
    });
  }

  UserInfo() {
    // 登录成功之后将数据设置到info就可以触发登录信息的更新
    from(request(authApi.User({}, {}))).subscribe((data) => {
      this.userInfo$.next(data);
    });
  }
}

const accountService = new Account();

export default accountService;
