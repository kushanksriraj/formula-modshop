import { ProductContext } from "../contexts";
import { useContext } from "react";

export const useProduct = () => {
  const { productList, setProductList } = useContext(ProductContext);

  const getSortedProductList = (productList, sortBy) => {
    switch (sortBy) {
      case "LOW_TO_HIGH":
        return [...productList].sort((a, b) => a.price - b.price);

      case "HIGH_TO_LOW":
        return [...productList].sort((a, b) => b.price - a.price);

      case "DEFAULT":
        return productList;

      default:
        throw new Error(
          "[useProduct()]:Incorrect sort type passed as payload!"
        );
    }
  };

  const getFilteredProductList = (
    sortedProductList,
    { showAllInventory, showFastDeliveryOnly }
  ) => {
    return sortedProductList
      .filter(({ inStock }) => (showAllInventory ? true : inStock))
      .filter(({ fastDelivery }) =>
        showFastDeliveryOnly ? fastDelivery : true
      );
  };

  const getSearchedProductList = (filteredProductList, search) => {
    const searchLength = search.length;
    return searchLength > 0
      ? filteredProductList.filter((product) => {
          const productWords = product.name.split(" ");
          return (
            productWords.filter(
              (name) =>
                name.substring(0, searchLength).toUpperCase() ===
                search.toUpperCase()
            ).length > 0
          );
        })
      : filteredProductList;
  };

  const getSelectedProduct = (productId) => {
    return productList.filter((product) => product.productId === productId)[0];
  };

  const isInStock = (productId) => {
    return productList.filter((product) => product.productId === productId)[0].inStock;
  };

  return {
    setProductList,
    productList,
    isInStock,
    getSortedProductList,
    getFilteredProductList,
    getSearchedProductList,
    getSelectedProduct
  };
};
