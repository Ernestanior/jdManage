import { BehaviorSubject, from } from "rxjs";
import request from "@/store/request";
import { userApi } from "@/store/api";
import { ISearchPage, IUserList, ICreateUserParams } from "./interface";

//import { newUserInfoStream } from ".";

/**
 * 用户相关功能
 */
class User {
  readonly userList$ = new BehaviorSubject<IUserList | null>(null);
  readonly userInfo$ = new BehaviorSubject<any>(null);
  readonly userWorkLogCodeList$ = new BehaviorSubject<any>(null);
  readonly userWorkLogEventList$ = new BehaviorSubject<any>(null);

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
  UserServiceWorkLogCodeList() {
    from(request(userApi.UserAPIWorklogCodeList())).subscribe((data) => {
      if (data) {
        this.userWorkLogCodeList$.next(data);
      }
      console.log(data, "data");
    });
  }

  UserServiceWorkLogEventList(data: any) {
    from(
      request(
        userApi.UserAPIWorklogEventList(
          {},
          {
            data,
          }
        )
      )
    ).subscribe((data) => {
      if (data) {
        const content = data.content;
        this.userWorkLogEventList$.next(content);
      }
    });
  }

  //   getData() {
  //     return this.userInfo$
  //   }
  // create(params: ICreateUserParams) {
  //     from(request(userApi.CreateUser({
  //         ...params
  //     }, {}))
  //     ).subscribe(data => {
  //         if (data) {
  //             this.userList$.next(data)
  //         }
  //     }
  //     )
  // }
}

const userService = new User();

export default userService;
