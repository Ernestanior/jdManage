/**
 * 用户相关功能
 */
class Admin {
  // readonly adminList$ = new BehaviorSubject<ICompanyList | null>(null);
  // findCompany(pageNum: number, pageSize: number) {
  //   from(request(companyApi.FindCompany(pageNum, pageSize))).subscribe(
  //     (res) => {
  //       this.companyList$.next(res);
  //     }
  //   );
  // }
}

const adminService = new Admin();

export default adminService;
