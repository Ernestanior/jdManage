import { AxiosRequestConfig } from "axios";

class NoteAPI {
  FindNote = (pageNum: number, pageSize: number) => {
    const config: AxiosRequestConfig = {
      url: `/admin/allNotes/1/${pageNum}/${pageSize}`,
      method: "GET",
    };
    config.headers = {};
    return config;
  };
  CreateNote = (data: INoteAdd) => {
    const config: AxiosRequestConfig = {
      url: `/admin/note/new`,
      method: "POST",
      data,
    };
    config.headers = {};
    return config;
  };
  UploadPic = (nid: number, data: FormData) => {
    const config: AxiosRequestConfig = {
      url: `/note/savePics/${nid}`,
      method: "POST",
      data,
    };
    config.headers = {};
    return config;
  };
  DeleteNote = (nid: number) => {
    const config: AxiosRequestConfig = {
      url: `/admin/super/note/del/${nid}`,
      method: "DELETE",
    };
    config.headers = {};
    return config;
  };
  DetailNote = (nid: number) => {
    const config: AxiosRequestConfig = {
      url: `/note/${nid}`,
      method: "GET",
    };
    config.headers = {};
    return config;
  };
}

export default NoteAPI;
