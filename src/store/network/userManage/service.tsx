import { userManageApi } from "@/store/api";
import UserManageAPI from "@/store/api/userManage";
import request from "@/store/request";
import { BehaviorSubject, from } from "rxjs";

class UserManage {
  readonly userManageCustomerList$ = new BehaviorSubject<any>(null);

  CustomerList(data: any) {
    from(request(userManageApi.UserManageCustomerList({}, data))).subscribe(
      (data) => {
        if (data) {
          console.log(data, "data");
          this.userManageCustomerList$.next(data);
        }
      }
    );
  }
}

const userManage = new UserManage();
export default userManage;
