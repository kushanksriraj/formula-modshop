import { useContext } from "react";
import { ProductDataContext } from "../contexts";

export const useProductData = () => {
  const { productList, productDispatch } = useContext(ProductDataContext);

  return { productList, productDispatch };
};
