import { useContext } from "react";
import { ProductDataContext } from "../contexts";

export const useProductData = () => {
  const { productList, setProductList } = useContext(ProductDataContext);

  return { productList, setProductList };
};
