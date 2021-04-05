import { useWishList } from "../../hooks";
import styles from "./Wishlist.module.css";
import { ListWishListProducts } from "./ListWishListProducts";

export const WishList = () => {
  const { totalItemsInWishList } = useWishList();

  return (
    <>
      {totalItemsInWishList() < 1 ? (
        <div className={styles.wishListEmptyPrompt}>
          Your wishlist is empty!
        </div>
      ) : (
        <ListWishListProducts />
      )}
    </>
  );
};
