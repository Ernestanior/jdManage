import { BehaviorSubject, from } from "rxjs";
import { IUserInfo } from "./interface";
import request from "@/store/request";
import { authApi } from "@/store/api";
import { deleteUser, getUser, saveUser } from "@/store/storage";

/**
 * 登录账户
 */
class Account {
  // readonly info$ = new BehaviorSubject<IAccountInfo | null>(null);
  readonly userInfo$ = new BehaviorSubject<IUserInfo | null>(null);

  constructor() {
    const userInfo: IUserInfo = getUser();
    if (userInfo && userInfo.token) {
      this.userInfo$.next(userInfo);
    }
  }
  login(username: string, password: string) {
    // 登录成功之后将数据设置到info就可以触发登录信息的更新
    from(request(authApi.Login({ username, password }))).subscribe((res) => {
      // token存储
      if (res && res.code === 200) {
        saveUser(res.data);
        // this.info$.next(res.data);
        this.userInfo$.next(res.data);
      }
    });
  }
  logout() {
    // from(request(authApi.Logout(data))).subscribe((data) => {
    //   if (data) {
    //     this.userInfo$.next(null);
    //     if (getUser()) {
    //       deleteUser();
    //     }
    //   }
    // });
    this.userInfo$.next(null);
    if (getUser()) {
      deleteUser();
    }
  }

  // UserInfo() {
  //   // 登录成功之后将数据设置到info就可以触发登录信息的更新
  //   from(request(authApi.User({}, {}))).subscribe((data) => {
  //     this.userInfo$.next(data);
  //   });
  // }
}

const accountService = new Account();

export default accountService;
