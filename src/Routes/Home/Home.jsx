import styles from "./Home.module.css";
import { SortButton, FilterButton, ProductCard, ToastMsg } from "../../Components";
import { ProductPage } from "../../Routes";
import { useProduct, useControl } from "../../hooks";
import { Outlet } from "react-router-dom";

export const Home = ({ search, isLoading }) => {
  const {
    productList,
    getSortedProductList,
    getFilteredProductList,
    getSearchedProductList
  } = useProduct();

  const { sortBy, filters, isProductSelected } = useControl();

  const sortedProductList = getSortedProductList(productList, sortBy);
  const filteredProductList = getFilteredProductList(
    sortedProductList,
    filters
  );
  const searchedProductList = getSearchedProductList(
    filteredProductList,
    search
  );

  return (
    <>
      {isProductSelected ? (
        <ProductPage />
        ) : (
          <div className={styles.productWrapper}>
          <div className={styles.optionsWrapper}>
            <SortButton />
            <FilterButton />
          </div>

          <div className={styles.homeWrapper}>
          <Outlet/>
            {searchedProductList.map(({ productId, image, name, price }) => {
              return (
                <ProductCard
                  key={productId}
                  productId={productId}
                  image={image}
                  name={name}
                  price={price}
                />
              );
            })}
          </div>
        </div>
      )}
      {isLoading && <ToastMsg msg={"Loading data..."}/>}
    </>
  );
};
