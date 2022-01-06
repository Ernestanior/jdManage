import dataStore from "@/store/dateBase";

export const getToken = () => {
  return dataStore.getValue("edgejoint-new");
};

export const saveToken = (token: string) => {
  return dataStore.save("edgejoint-new", token);
};

export const deleteToken = () => {
  return dataStore.delete("edgejoint-new");
};
