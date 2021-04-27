import { createContext, useReducer } from "react";
import { productReducer } from "../reducers";

export const ProductDataContext = createContext();

export const ProductDataProvider = ({ children }) => {
  const [productList, productDispatch] = useReducer(productReducer, []);

  return (
    <ProductDataContext.Provider value={{ productList, productDispatch }}>
      {children}
    </ProductDataContext.Provider>
  );
};
