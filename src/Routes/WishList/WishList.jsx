import { useControl, useWishList } from "../../hooks";
import { ProductPage } from "../../Routes/";
import { ProductCard } from "../../Components";
import styles from "./Wishlist.module.css";

export const WishList = () => {
  const { wishList, totalItemsInWishList } = useWishList();
  const { isProductSelected } = useControl();

  return (
    <>
      {isProductSelected ? (
        <ProductPage />
      ) : (
        <>
          {totalItemsInWishList() > 0 ? (
            <div>
              <div className={styles.title}>
                Wishlist : {totalItemsInWishList()}
              </div>
              <div className={styles.homeWrapper}>
                {wishList.map(({ id, image, name, price }) => {
                  return (
                    <ProductCard
                      key={id}
                      id={id}
                      image={image}
                      name={name}
                      price={price}
                    />
                  );
                })}
              </div>
            </div>
          ) : (
            <div className={styles.wishListEmptyPrompt}>
             Your wishlist is empty!
            </div>
          )}
        </>
      )}
    </>
  );
};
