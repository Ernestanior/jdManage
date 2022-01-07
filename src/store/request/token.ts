import dataStore from "@/store/dateBase";

export const getUser = () => {
  return dataStore.getValue("edgejoint-new");
};

export const saveUser = (user: string) => {
  return dataStore.save("edgejoint-new", user);
};

export const deleteUser = () => {
  return dataStore.delete("edgejoint-new");
};
