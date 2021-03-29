import styles from "./Home.module.css";
import { useProduct } from "../../Components/Helper/context";
import { SortButton } from "../../Components/SortButton/SortButton";
import { CartIcon } from "../../Components/CartIcon/CartIcon";
import { ProductCard } from "../../Components/ProductCard/ProductCard";
import { FilterButton } from "../../Components/FilterButton/FilterButton";
import { useState } from "react";

export const Home = () => {
  const { state } = useProduct();
  const [search, setSearch] = useState("");

  const getSortedData = (productList, sortBy) => {
    switch (sortBy) {
      case "LOW_TO_HIGH":
        return [...productList].sort((a, b) => a.price - b.price);

      case "HIGH_TO_LOW":
        return [...productList].sort((a, b) => b.price - a.price);

      case "DEFAULT":
        return productList;

      default:
        throw new Error("Incorrect sort type passed as payload!");
    }
  };

  const getFilteredData = (
    sortedData,
    { showAllInventory, showFastDeliveryOnly }
  ) => {
    return sortedData
      .filter(({ inStock }) => (showAllInventory ? true : inStock))
      .filter(({ fastDelivery }) =>
        showFastDeliveryOnly ? fastDelivery : true
      );
  };

  const getSearchedProducts = (productList, search) => {
    const searchLength = search.length;
    return searchLength > 0
      ? productList.filter((product) => {
          const productWords = product.name.split(" ");
          return (
            productWords.filter(
              (name) =>
                name.substring(0, searchLength).toUpperCase() ===
                search.toUpperCase()
            ).length > 0
          );
        })
      : productList;
  };

  const sortedData = getSortedData(state.productList, state.sortBy);
  const filteredData = getFilteredData(sortedData, state.filters);
  const searchedProducts = getSearchedProducts(filteredData, search);

  return (
    <div className={styles.homeWrapper}>
      <div role="search">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Start typing to search"
        />
        <button onClick={() => setSearch("")}>Clear</button>
      </div>

      <CartIcon />
      <SortButton />
      <FilterButton />
      {searchedProducts.map((product) => {
        return (
          <ProductCard
            key={product.id}
            id={product.id}
            image={product.image}
            name={product.name}
            price={product.price}
          />
        );
      })}
    </div>
  );
};
