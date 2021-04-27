import { createContext, useReducer } from "react";
import { userReducer } from "../reducers";

export const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const [userData, userDispatch] = useReducer(userReducer, {});

  return (
    <UserDataContext.Provider value={{ userData, userDispatch }}>
      {children}
    </UserDataContext.Provider>
  );
};
