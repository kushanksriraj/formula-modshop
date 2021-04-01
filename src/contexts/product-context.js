import { createContext, useState } from "react";
export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [productList, setProductList] = useState([]);

  return (
    <ProductContext.Provider
      value={{
        productList,
        setProductList
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
