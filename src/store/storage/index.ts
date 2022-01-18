import dataStore from "@/store/dateBase";

//localStorage 存储 Token
export const getToken = () => {
  return dataStore.getValue("edge-token");
};

export const saveToken = (token: string) => {
  return dataStore.save("edge-token", token);
};

export const deleteToken = () => {
  return dataStore.delete("edge-token");
};

//localStorage 存储 User
// export const getUser = () => {
//   return dataStore.getValue("edge-user");
// };

// export const saveUser = (user: any) => {
//   return dataStore.save("edge-user", user);
// };

// export const deleteUser = () => {
//   return dataStore.delete("edge-user");
// };
