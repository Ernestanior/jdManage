import dataStore from "@/store/dateBase";
import { IUserInfo } from "../network/account/interface";

//localStorage 存储 Token
// export const getToken = () => {
//   return dataStore.getValue("jd-token");
// };

// export const saveToken = (token: string) => {
//   return dataStore.save("jd-token", token);
// };

// export const deleteToken = () => {
//   return dataStore.delete("jd-token");
// };

//localStorage 存储 User
export const getUser = () => {
  return dataStore.getValue("jd-user");
};

export const saveUser = (user: IUserInfo) => {
  return dataStore.save("jd-user", user);
};

export const deleteUser = () => {
  return dataStore.delete("jd-user");
};
