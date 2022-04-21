import { AxiosRequestConfig } from "axios";
import { ISearchPage } from "./common.interface";

class NoteAPI {
  FindNote = (params: ISearchPage) => {
    const config: AxiosRequestConfig = {
      url: "/admin/allNotes/1",
      method: "get",
      params,
    };
    config.headers = {};
    return config;
  };
  CreateNote = (data: IJdForm) => {
    const config: AxiosRequestConfig = {
      url: `/admin/note/upload/1/`,
      method: "post",
      data,
    };
    config.headers = {};
    return config;
  };
}
interface IJdForm {
  city: string;
  company: number;
  desc: string;
  ind: string;
  pay: string;
  roleName: string;
  type: number;
  edu?: string;
  email?: string;
  tags?: string;
  wechatId?: string;
}
export default NoteAPI;
