import styles from "./Wishlist.module.css";
import { useWishList } from "../../hooks";
import { ProductCard } from "../../Components";

export const ListWishListProducts = () => {
  const { wishList, totalItemsInWishList } = useWishList();

  return (
    <div>
      <div className={styles.title}>Wishlist : {totalItemsInWishList()}</div>
      <div className={styles.homeWrapper}>
        {wishList.map(({ productId, image, name, price }) => {
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
  );
};
