import { useWishList } from "../../hooks";
import { ToastMsg } from "../";
import styles from "./WishListButton.module.css";
import { RedHeartSvg } from "./RedHeartSvg";
import { BlackHeartSvg } from "./BlackHeartSvg";

export const WishListButton = ({ _id }) => {
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
          isAlreadyInWishList(_id)
            ? removeFromWishList(_id)
            : addToWishList(_id);
        }}
        disabled={isLoading ? true : false}
      >
        <div className="icon">
          {isAlreadyInWishList(_id) ? <RedHeartSvg /> : <BlackHeartSvg />}
        </div>
      </button>
      {isLoading && <ToastMsg msg={"Updating wishlist..."} />}
    </>
  );
};
