import { UserDataContext } from "../contexts";
import { useContext } from "react";

export const useUserData = () => {
  const { userData, userDispatch } = useContext(UserDataContext);

  return { userData, userDispatch };
};
