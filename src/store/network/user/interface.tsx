/** delete的请求参数*/
export interface IDeleteParams {
  id: number;
}

/** findUser的请求参数*/
export interface IFindUserParams {
  keyword: string; //user name
  searchPage: ISearchPage;
}

export interface ISearchPage {
  desc?: number;
  page: number;
  pageSize: number;
  sort?: string;
}

/** modifyUser的请求参数*/
export interface IModifyUserParams {
  email: string; //user name after modify
  id: number; //user ID
  locale: string;
  loginId: string; //same as user name
  name: string; //same as user name
  plainPassword: string; //password after modify
  timezone: string;
  type: string;
}

/** createUser的请求参数*/
export interface ICreateUserParams {
  email: string; //user email
  loginId: string; //same as email
  name: string; //same as email
  plainPassword: string; //user password
  comfirmPasword: string;
  type: "admin" | "normal"; //user type "admin" / "normal"
}
