import styles from "./Wishlist.module.css";
import { useWishList, useAxios } from "../../hooks";
import { ProductCard, ToastMsg } from "../../Components";
import { useState, useEffect } from "react";

export const ListWishListProducts = () => {
  const { wishList, totalItemsInWishList } = useWishList();
  const [populatedWishList, setPopulatedWishList] = useState([]);
  const { apiCall, response, isLoading } = useAxios();

  useEffect(() => {
    apiCall({
      type: "get",
      url: "https://modshop.kushanksriraj.repl.co/wish-list",
    });
  }, [wishList]);

  useEffect(() => {
    if (response && response.status === 200) {
      setPopulatedWishList(response.data.wishlist);
    }
  }, [response]);

  return (
    <div>
      <div className={styles.title}>Wishlist : {totalItemsInWishList()}</div>
      <div className={styles.homeWrapper}>
        {populatedWishList.map(({ product }) => {
          return (
            <ProductCard
              key={product._id}
              _id={product._id}
              imageUrl={product.imageUrl}
              name={product.name}
              price={product.price}
            />
          );
        })}
      </div>
      {isLoading && <ToastMsg msg={"Loading wishlist..."} />}
    </div>
  );
};
