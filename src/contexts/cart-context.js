import { createContext, useReducer } from "react";
import { cartReducer } from "../reducers";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    cartList: []
  });

  return (
    <CartContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
