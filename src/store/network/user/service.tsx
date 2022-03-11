import { BehaviorSubject, from } from "rxjs";
import request from "@/store/request";
import { userApi } from "@/store/api";
import { ISearchPage, IUserList, ICreateUserParams } from "./interface";

import { saveToken } from "@/store/storage";

//import { newUserInfoStream } from ".";

/**
 * 用户相关功能
 */
class User {
  readonly userInfo$ = new BehaviorSubject<any>(null);
  readonly userAccessLog$ = new BehaviorSubject<any>(null);
  readonly userAccessWhiteList$ = new BehaviorSubject<any>(null);
  readonly userLogin$ = new BehaviorSubject<any>(null);

  UserInfo() {
    from(request(userApi.UserInfo())).subscribe((data) => {
      if (data) {
        this.userInfo$.next(data);
      }
    });
  }

  UserAccessLog(data: any) {
    from(request(userApi.UserAccessLog(data))).subscribe((data) => {
      if (data) {
        this.userAccessLog$.next(data);
      }
    });
  }

  UserAccessWhiteList(data: any) {
    from(request(userApi.UserWhiteList(data))).subscribe((data) => {
      if (data) {
        this.userAccessWhiteList$.next(data);
      }
    });
  }

  UserLogin(data: any) {
    from(request(userApi.UserLogin(data))).subscribe((data) => {
      if (data) {
        saveToken(data.token);
        this.userLogin$.next(data);
      }
    });
  }
}

const userService = new User();

export default userService;
