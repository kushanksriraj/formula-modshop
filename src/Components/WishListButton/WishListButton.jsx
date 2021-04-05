import { useWishList } from "../../hooks";
import { ToastMsg } from "../";
import styles from "./WishListButton.module.css";
import { RedHeartSvg } from "./RedHeartSvg";
import { BlackHeartSvg } from "./BlackHeartSvg";

export const WishListButton = ({ productId }) => {
  const {
    isLoading,
    isAlreadyInWishList,
    addToWishList,
    removeFromWishList
  } = useWishList();

  return (
    <>
      <button
        className={styles.likeBtn}
        onClick={() => {
          isAlreadyInWishList(productId)
            ? removeFromWishList(productId)
            : addToWishList(productId);
        }}
        disabled={isLoading ? true : false}
      >
        <div className="icon">
          {isAlreadyInWishList(productId) ? <RedHeartSvg /> : <BlackHeartSvg />}
        </div>
      </button>
      {isLoading && <ToastMsg msg={"Updating wishlist..."} />}
    </>
  );
};
