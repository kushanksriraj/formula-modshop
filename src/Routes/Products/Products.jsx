import styles from "./Home.module.css";
import {
  SortButton,
  FilterButton,
  ProductCard,
  ToastMsg
} from "../../Components";
import { useProduct, useControl } from "../../hooks";

export const Products = ({ search, isLoading }) => {
  const {
    productList,
    getSortedProductList,
    getFilteredProductList,
    getSearchedProductList
  } = useProduct();

  const { sortBy, filters } = useControl();

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
    <div className={styles.productWrapper}>
      <div className={styles.optionsWrapper}>
        <SortButton />
        <FilterButton />
      </div>

      <div className={styles.homeWrapper}>
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
      {isLoading && <ToastMsg msg={"Loading data..."} />}
    </div>
  );
};
