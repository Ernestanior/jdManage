import { AxiosRequestConfig } from "axios";

class CityAPI {
  FindCity = () => {
    const config: AxiosRequestConfig = {
      url: `/city/all`,
      method: "GET",
    };
    config.headers = {};
    return config;
  };

  CreateCity = (params: ICity) => {
    const config: AxiosRequestConfig = {
      url: "/admin/newCity",
      method: "POST",
      params,
    };
    config.headers = {};
    return config;
  };

  DeleteCity = (cid: number) => {
    const config: AxiosRequestConfig = {
      url: `/admin/deleteCity/${cid}`,
      method: "DELETE",
    };
    config.headers = {};
    return config;
  };
  // UpdateAdmin = (data: IAdminUpdate) => {
  //   const config: AxiosRequestConfig = {
  //     url: "/admin/super/modifyPwd",
  //     method: "PUT",
  //     data,
  //   };
  //   config.headers = {};
  //   return config;
  // };
}
export default CityAPI;

export interface ICity {
  city: string;
}
