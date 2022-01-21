import { BehaviorSubject, from } from "rxjs";
import request from "@/store/request";
import { userApi } from "@/store/api";
import { ISearchPage, IUserList, ICreateUserParams } from "./interface";


/**
 * 用户相关功能
 */
class User {
    readonly userList$ = new BehaviorSubject<IUserList | null>(null);
    readonly userInfo$ = new BehaviorSubject<any>(null);
    

    findUser(keyWord: string, searchPage: ISearchPage) {
        from(request(userApi.FindUser({}, {
            keyWord,
            searchPage
        }))
        ).subscribe(data => {
            if (data) {
                this.userList$.next(data)
            }
            console.log(data, 'user list')
        }
        )
    }
    findUserInfo() {
        from(request(userApi.FindUserInfo()))
        .subscribe(data => {
            if (data) {
                this.userInfo$.next(data)
            }
            console.log(data)
        }
        )
    }
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