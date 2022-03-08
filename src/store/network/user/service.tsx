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
  readonly userList$ = new BehaviorSubject<IUserList | null>(null);
  readonly userInfo$ = new BehaviorSubject<any>(null);
  readonly userWorkLogCodeList$ = new BehaviorSubject<any>(null);
  readonly userWorkLogEventList$ = new BehaviorSubject<any>(null);
  readonly userLogDetail$ = new BehaviorSubject<any>(null);
  readonly userDeleteWorkLog$ = new BehaviorSubject<string[] | null>(null);
  readonly userAccountView$ = new BehaviorSubject<any | null>(null);
  readonly userChangePassword$ = new BehaviorSubject<any>(null);
  readonly userAccessLog$ = new BehaviorSubject<any>(null);
  readonly userAccessWhiteList$ = new BehaviorSubject<any>(null);
  readonly userChangeLanguage$ = new BehaviorSubject<any>(null);
  readonly userLogin$ = new BehaviorSubject<any>(null);
  findUser(keyword: string, searchPage: ISearchPage) {
    from(
      request(
        userApi.FindUser(
          {},
          {
            keyword,
            searchPage,
          }
        )
      )
    ).subscribe((data) => {
      if (data) {
        this.userList$.next(data);
      }
    });
  }

  UserInfo() {
    from(request(userApi.UserInfo())).subscribe((data) => {
      if (data) {
        this.userInfo$.next(data);
      }
    });
  }

  UserServiceWorkLogCodeList() {
    from(request(userApi.UserAPIWorklogCodeList())).subscribe((data) => {
      if (data) {
        this.userWorkLogCodeList$.next(data);
      }
    });
  }

  UserServiceWorkLogEventList(data: any) {
    from(request(userApi.UserAPIWorklogEventList({}, data))).subscribe(
      (data) => {
        if (data) {
          this.userWorkLogEventList$.next(data);
        }
      }
    );
  }

  UserServiceLogDetail(eventId: string | "") {
    if (eventId !== "") {
      from(request(userApi.UserAPILogDetail({ eventId }))).subscribe((data) => {
        if (data) {
          this.userLogDetail$.next(data);
        }
        return "";
      });
    }
  }

  UserDeleteWorkLog(eventId: string[] | null) {
    if (eventId !== null) {
      from(request(userApi.UserDeleteWorkLog(eventId))).subscribe((data) => {
        if (data) {
          this.userDeleteWorkLog$.next(data);
        }
      });
    }
  }

  create(params: ICreateUserParams) {
    from(
      request(
        userApi.CreateUser(
          {},
          {
            ...params,
          }
        )
      )
    ).subscribe((data) => {
      if (data) {
        this.userList$.next(data);
      }
    });
  }

  UserAccountView() {
    from(request(userApi.UserAccountView())).subscribe((data) => {
      if (data) {
        this.userAccountView$.next(data);
      }
    });
  }

  UserChangePassword(password: any) {
    from(request(userApi.UserChangePassword(password), true)).subscribe(
      (data) => {
        if (data) {
          this.userChangePassword$.next(data);
        }
      }
    );
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
