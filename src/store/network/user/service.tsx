import { BehaviorSubject, from, interval, of } from "rxjs";
import { catchError, debounce, map } from "rxjs/operators";
import request from "@/store/request";
import { userApi } from "@/store/api";
import { ISearchPage, IUserList, ICreateUserParams } from "./interface";
import { GeteventList } from "@/store/api/user";
import { notification, Result } from "antd";
import { loading } from "@/components/loading";

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
  findUser(keyWord: string, searchPage: ISearchPage) {
    from(
      request(
        userApi.FindUser(
          {},
          {
            keyWord,
            searchPage,
          }
        )
      )
    ).subscribe((data) => {
      if (data) {
        this.userList$.next(data);
      }
      console.log(data, "user list");
    });
  }

  UserInfo() {
    from(request(userApi.UserInfo())).subscribe((data) => {
      if (data) {
        this.userInfo$.next(data);
      }
    });
  }

  UserChangeLanguage(params: {}, data: any) {
    from(request(userApi.UserChangeLanguage(params, data))).subscribe(
      (data) => {
        if (data) {
          this.userChangeLanguage$.next(data);
        }
      }
    );
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
          console.log(data, "data");
          this.userWorkLogEventList$.next(data);
        }
      }
    );
  }

  UserServiceLogDetail(eventId: string | null) {
    if (eventId !== null) {
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
          this.UserServiceWorkLogEventList(data);
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
        console.log(data, "accountview");
      }
    });
  }

  UserChangePassword(password: any) {
    from(request(userApi.UserChangePassword(password), true)).subscribe(
      (data) => {
        if (data) {
          this.userChangePassword$.next(data);
          console.log(data, "changepassword");
        }
      }
    );
  }
  UserAccessLog(data: any) {
    from(request(userApi.UserAccessLog(data))).subscribe((data) => {
      if (data) {
        console.log(data, "accesslog");
        this.userAccessLog$.next(data);
      }
    });
  }

  UserAccessWhiteList(data: any) {
    from(request(userApi.UserWhiteList(data))).subscribe((data) => {
      if (data) {
        console.log(data, "whilist");
        this.userAccessWhiteList$.next(data);
      }
    });
  }
}

const userService = new User();

export default userService;
