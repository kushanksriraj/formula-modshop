import { createContext, useReducer } from "react";
import { wishListReducer } from "../reducers";

export const WishListContext = createContext();

export const WishListProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishListReducer, {
    wishList: []
  });

  return (
    <WishListContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      {children}
    </WishListContext.Provider>
  );
};
